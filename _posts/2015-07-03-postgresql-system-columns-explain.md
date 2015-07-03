---
layout: post
title: "postgresql system columns explain"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

1. `xmin`   
Transaction ID for insert. For identify different transactions.  
Will changes after new transaction(Whether `Insert`/`Update`) commits.  
2. `xmax`   
Transaction ID for delete. Not being 0 means this row is not yet committed or rollbacked.  
3. `cmin`   
Command ID for one transaction.  
Identify different commands in one transaction.  Start from 0.  
4. `cmax`   
Command identifier for deletion transaction. In source code, it is the same with `cmin`.
5. `ctid`   
Similar to Oracle `rowid`, but will this ID will change as transactions on current row take effect.


-------
{%highlight sql%}
CREATE TABLE test (id int, name character varying(10));
BEGIN;
insert into test values(1,'Rugal');
insert into test values(2,'Rugal');
insert into test values(3,'Rugal');
END;
--COMMIT
{%endhighlight%}
{%highlight sql%}
postgres=# SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test;
 xmin | xmax | cmin | cmax | ctid  | id | name
------+------+------+------+-------+----+-------
  700 |    0 |    0 |    0 | (0,1) |  2 | Rugal
  700 |    0 |    1 |    1 | (0,2) |  1 | Rugal
  700 |    0 |    2 |    2 | (0,3) |  3 | Rugal
(3 rows)
{%endhighlight%}
Here we can find that these 3 rows share the same `xmin=700`, this means they are/were in one transaction.  
From `cmin` and `cmax` we could find they executed sequentially.    
{%highlight sql%}
begin;
update test set name = 'Tenjin' WHERE id = 3;
update test set name = 'Ryujin' WHERE id = 2;
--do not commit at this time
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test;
 xmin | xmax | cmin | cmax | ctid  | id |  name
------+------+------+------+-------+----+--------
  700 |    0 |    1 |    1 | (0,2) |  1 | Rugal
  701 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
  701 |    0 |    1 |    1 | (0,5) |  2 | Ryujin
(3 rows)
{%endhighlight%}
We could find xmax does not changes while xmin increase from same session.  
But from another session, it is different.  
{%highlight sql%}
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test;
 xmin | xmax | cmin | cmax | ctid  | id | name
------+------+------+------+-------+----+-------
  700 |  701 |    1 |    1 | (0,1) |  2 | Rugal
  700 |    0 |    1 |    1 | (0,2) |  1 | Rugal
  700 |  701 |    0 |    0 | (0,3) |  3 | Rugal
(3 rows)
{%endhighlight%}
As we could see from another session, xmax increase by 1 based on xmin, this is because we have only one transaction one this row. But xmin does not change.  
Because the former session is not yet commit, we can not see updated version except the `xmax` value.  
After former session committed, both sessions will see exactly the same data and system information.  
{%highlight sql%}
end;
--COMMIT
SELECT xmin, xmax, cmin, cmax, ctid,  * FROM test;
 xmin | xmax | cmin | cmax | ctid  | id |  name
------+------+------+------+-------+----+--------
  700 |    0 |    1 |    1 | (0,2) |  1 | Rugal
  701 |    0 |    0 |    0 | (0,4) |  3 | Tenjin
  701 |    0 |    1 |    1 | (0,5) |  2 | Ryujin
(3 rows)
{%endhighlight%}
