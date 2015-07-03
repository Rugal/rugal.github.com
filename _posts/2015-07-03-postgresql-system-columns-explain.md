---
layout: post
title: "postgresql system columns explain"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

1. xmin   
Transaction ID for insert. For identify different transactions.  
Will changes after new transaction(Whether `Insert`/`Update`) commits.  
2. xmax   
是删除更新的事务标识符，如果该值不为0，则说明该行数据当前还未提交或回滚。比如设置begin事务时可以明显看到该值的变化 
3. cmin   
Command ID for one transaction.  
Identify different commands in one transaction.  Start from 0.  
4. cmax   
删除事务的命令标识符，或者为0 
5. ctid   
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
