---
layout: post
title: "postgresql system columns explain"
description: ""
category: operation
tags: [postgresql]
date: 2015-07-03
---

1. `xmin`   
Transaction ID for insertion. For identifying different transactions.    
Will changes after new transaction(Whether `Insert`/`Update`) commits.  
2. `xmax`   
Transaction ID for deletion. Not being 0 means this row is not yet committed or rollbacked.  
3. `cmin`   
Command ID for one transaction.  
Identify different commands in one transaction.  Start from 0.  
4. `cmax`   
Command identifier for deletion transaction. In source code, it is the same with `cmin`.
5. `ctid`   
Similar to Oracle `rowid`, but will this ID will change as transactions on current row take effect. So it is better not always use this column to access rows.  


-------------

## How PG MVCC works

Suppose we have 2 sessions, accessing the same table `test` with some rows.   


1. Session 1 starts transaction
2. Session 1 updates 1 row 
    1. PG allocates an `XID` for this new transaction
    2. PG replicates the original row.  
    Now the origin row named as old version and the new one is called new version
    3. PG sets `xmin` of new row version to the fresh allocated `XID`, say 2 for example
    4. PG sets the `xmax` of old version to the `XID` of new transaction
    5. PG updates that new row version with new value from session 1.
3. Session 2 accesses that row
    1. PG searches row that has max value in `xmax`, indicating latest consistent row version  
    This will get the old version  
4. Session 1 commits
    1.  PG sets the `xmax` of old version to 0
5. Session 2 accesses that row again
    1. Again PG searches row that has max value in `xmax`. But they are all 0.
    2. PG finds there is no transaction operating on this row.
    Fetches the version with max `xmin` value, indicating latest consistent version.  
    This will get the new version  


-------

## Example

```sql
--session 1
CREATE TABLE test (id int, name character varying(10));
BEGIN;
insert into test values(1,'Rugal');
insert into test values(2,'Rugal');
insert into test values(3,'Rugal');
END; --COMMIT
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id | name
-------+------+------+------+-------+----+-------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20775 |    0 |    1 |    1 | (0,2) |  2 | Rugal
 20775 |    0 |    2 |    2 | (0,3) |  3 | Rugal
(3 rows)
```
We can find that these 3 rows share the same `xmin=20775`, this means they are in the same transaction.  
From `cmin` and `cmax` we could find are executed in certain order.    

```sql
--session 1
begin;
update test set name = 'Tenjin' WHERE id = 3;
--do not commit at this time
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20775 |    0 |    1 |    1 | (0,2) |  2 | Rugal
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
```

Notice `xmin` for `id=3` increases, this is because it is involved in another transaction, while its `xmax` does not change.  
Also the `ctid` of this row is set to 0, which means the first command of transaction.   
MVCC of PostgreSQL reserves all rows before vacuum, this row is actually newly inserted.   
The old row version is still kept in table, but its `xmax` is updated to the `XID` of new transaction. By doing so, other sessions that accessing this row will know it is involved in a transaction, so as to ensure transactional consistency.   

The view from another session is different.  
```sql
--session 2
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax  | cmin | cmax | ctid  | id | name
-------+-------+------+------+-------+----+-------
 20775 |     0 |    0 |    0 | (0,1) |  1 | Rugal
 20775 |     0 |    1 |    1 | (0,2) |  2 | Rugal
 20775 | 20776 |    0 |    0 | (0,3) |  3 | Rugal
(3 rows)
```
The `xmax` column indicates this row is involved in transaction 20776.   
This is because PG notice we are query a row that is involved in a transaction, so PG will get the row with old version.   
Because session 1 has not committed, we can not see newer version. In this way, MVCC in PostgreSQL ensures transactional consistency.   

Let's do some more operation in session 1.  
```sql
--session 1
update test set name = 'Adel' WHERE id = 2;
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20776 |    0 |    1 |    1 | (0,5) |  2 | Adel
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
```
As we can see, row `id=2` has added in transaction 20776 and its `cmin` is set to 1 because it is the second command in this transaction.   

Session witnesses the change on row `id=2`.  
```sql
--session 2
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax  | cmin | cmax | ctid  | id | name
-------+-------+------+------+-------+----+-------
 20775 |     0 |    0 |    0 | (0,1) |  1 | Rugal
 20775 | 20776 |    1 |    1 | (0,2) |  2 | Rugal
 20775 | 20776 |    0 |    0 | (0,3) |  3 | Rugal
(3 rows)
```

After commit of session 1, both sessions could see the same version of row.  
```sql
--session 1
END;
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20776 |    0 |    1 |    1 | (0,5) |  2 | Adel
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
```

```sql
--session 2
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20776 |    0 |    1 |    1 | (0,5) |  2 | Adel
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
```
