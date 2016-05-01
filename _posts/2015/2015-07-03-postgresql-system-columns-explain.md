---
layout: post
title: "postgresql system columns explain"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

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
Similar to Oracle `rowid`, but will this ID will change as transactions on current row take effect.


-------
{%highlight sql%}
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
{%endhighlight%}
We can find that these 3 rows share the same `xmin=20775`, this means they are in the same transaction.  
From `cmin` and `cmax` we could find are executed in certain order.    
{%highlight sql%}
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
{%endhighlight%}
Notice `xmin` for `id=3` increases, this is because it is involved in another transaction, while its `xmax` does not change.  
Also the `ctid` of this row is set to 0, which means the first command of transaction.   
MVCC of PostgreSQL reserve all rows before vacuum, this row is actually newly inserted.   
The old row version is still kept in table, but its `xmax` is updated to the `XID` of new transaction. By doing so, other sessions that accessing this row will know it is involved in a transaction, so as to ensure transactional consistency.   

The view from another session is different.  
{%highlight sql%}
--session 2
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax  | cmin | cmax | ctid  | id | name
-------+-------+------+------+-------+----+-------
 20775 |     0 |    0 |    0 | (0,1) |  1 | Rugal
 20775 |     0 |    1 |    1 | (0,2) |  2 | Rugal
 20775 | 20776 |    0 |    0 | (0,3) |  3 | Rugal
(3 rows)
{%endhighlight%}
As we could see from session 2, `xmax` has changed to the value of `xmin` of session 1.    
This is because we have updated that row from session 1 without commit.  
Here our `xmin` and `xmax` columns are used to differentiate transactions.  An nonzero `xmax` value means a transaction is working on this row without commit.  

Because session 1 has not committed, we can not see newer version. In this way, MVCC in PostgreSQL ensures transactional consistency.  

Let's do some more operation in session 1.  
{%highlight sql%}
--session 1
update test set name = 'Adel' WHERE id = 2;
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20776 |    0 |    1 |    1 | (0,5) |  2 | Adel
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
{%endhighlight%}
As we can see, row `id=2` has added in transaction 20776 and its `cmin` is set to 1 because it is the second command in this transaction.   

Session witnesses the change on row `id=2`.  
{%highlight sql%}
--session 2
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax  | cmin | cmax | ctid  | id | name
-------+-------+------+------+-------+----+-------
 20775 |     0 |    0 |    0 | (0,1) |  1 | Rugal
 20775 | 20776 |    1 |    1 | (0,2) |  2 | Rugal
 20775 | 20776 |    0 |    0 | (0,3) |  3 | Rugal
(3 rows)
{%endhighlight%}


After commit of session 1, both sessions could see the same version of row.  
{%highlight sql%}
--session 1
END;
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20776 |    0 |    1 |    1 | (0,5) |  2 | Adel
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
{%endhighlight%}
{%highlight sql%}
--session 2
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test ORDER BY id;
 xmin  | xmax | cmin | cmax | ctid  | id |  name
-------+------+------+------+-------+----+--------
 20775 |    0 |    0 |    0 | (0,1) |  1 | Rugal
 20776 |    0 |    1 |    1 | (0,5) |  2 | Adel
 20776 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
(3 rows)
{%endhighlight%}
