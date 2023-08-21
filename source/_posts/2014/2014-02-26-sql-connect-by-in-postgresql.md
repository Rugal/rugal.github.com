---
layout: post
title: "SQL connect by in postgresql"
description: ""
category: operation
tags: [postgresql]
date: 2014-02-26
---

```sql
CREATE TABLE test(id int primary key,pid int, misc character varying(10));
--simplest structure of a tree table

INSERT INTO test VALUES(1,null,'Boss');
INSERT INTO test VALUES(2,1,'Manager');
INSERT INTO test VALUES(3,1,'CFO');
INSERT INTO test VALUES(4,1,'CTO');
INSERT INTO test VALUES(5,4,'developer');
INSERT INTO test VALUES(6,4,'QA');
INSERT INTO test VALUES(7,4,'support');
INSERT INTO test VALUES(8,2,'PM');
INSERT INTO test VALUES(9,2,'product');
-- as required this is a level tree driven by pid.

WITH RECURSIVE tree(id,pid,misc,depth,path) AS
(
    SELECT id,pid,misc,1,ARRAY[id]
        FROM test
        WHERE id=1
    UNION
    SELECT a.id, a.pid, a.misc, b.depth+1, b.path||a.id
        FROM test a, tree b
        WHERE a.pid=b.id
)-- Using depth first search: order by path
SELECT id,pid,misc,depth,path FROM tree order by path;

 id | pid |   misc    |  path
----+-----+-----------+---------
  1 |     | Boss      | {1}
  2 |   1 | Manager   | {1,2}
  8 |   2 | PM        | {1,2,8}
  9 |   2 | product   | {1,2,9}
  3 |   1 | CFO       | {1,3}
  4 |   1 | CTO       | {1,4}
  5 |   4 | developer | {1,4,5}
  6 |   4 | QA        | {1,4,6}
  7 |   4 | support   | {1,4,7}


-- Using breadth first search: order by path
SELECT id,pid,misc,depth,path FROM tree order by depth;

 id | pid |   misc    | depth |  path   
----+-----+-----------+-------+---------
  1 |     | Boss      |     1 | {1}
  2 |   1 | Manager   |     2 | {1,2}
  3 |   1 | CFO       |     2 | {1,3}
  4 |   1 | CTO       |     2 | {1,4}
  5 |   4 | developer |     3 | {1,4,5}
  6 |   4 | QA        |     3 | {1,4,6}
  7 |   4 | support   |     3 | {1,4,7}
  8 |   2 | PM        |     3 | {1,2,8}
  9 |   2 | product   |     3 | {1,2,9}
```
According to official Document, `WITH` syntax means to use a temporary table to simpify query.  

### 1. define temporary table  
`tree(id,pid,misc,depth,path)` defines columns of temporary table to project in query after this.  
As you could tell that `id` `pid` and `misc` columns are originally existed in main table.  
`depth` and `path` column are defined to adopt to different search strategies.  

### 2. initial row of recursion  
`SELECT` snipplet above `UNION` is defined as initial statement.  
`SELECT id, pid, misc, 1, ARRAY[id] FROM test WHERE id=1`  
This defines the start position of a recursive search, which id is 1, just like the root of a tree.  
All the rest queries are based on this statement.  
`ARRAY[id]` create an array to record hierachy of a spcified rows.

### 3. recursion statement  
The `SELECT` statement under `UNION` is defined as recursive statement, temporary table itself could be referred in this section.  
`SELECT a.id, a.pid, a.misc, b.depth+1, b.path||a.id FROM test a, tree b WHERE a.pid=b.id`  
`projection` must be identical with initial statement, thus makes it possible to recurse.  
This statement join with temporary table and search specified rows that match predication. This is how recursion happened.  
`b.path||a.id` makes pre-defined array to append with newest row.  

### 4. return statement  
A semicolon is used to indicate an end of a SQL.  
`SELECT id,pid,misc,depth,path FROM tree order by path;`  
`order by` syntax will affect different strategies of searching.  
    * DFS: path  
    * BFS: depth


BTW, I found a table function named `connectby` has the same functionality with `WITH RECURSIVE`.  
I assume this function is built base on `WITH RECURSIVE` statement.
