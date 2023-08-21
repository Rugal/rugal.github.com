---
layout: post
title: "PostgreSQL Query Cost"
description: ""
category: operation
tags: [postgresql]
date: 2016-04-13
---

# Attributes in Execution plan

## cost=0.00..290.45
The first cost is the start-up cost of this node. The value here determines how much work is estimated to be done before the node produces its first row of output. Here, the value is zero because a Seq Scan node instantly produces rows.   
The second estimated cost is the cost of running the entire node until it completes.

## rows=3616
The number of rows to output if the node runs to completion.  

## width=26
This value provides an estimate of the average number of bytes each row output for the node will contain.


# Forcing a plan

* enable_seqscan
* enable_indexscan
* enable_sort
* enable_nestloop
* enable_hashjoin
* enable_mergejoin
* enable_tidscan
* enable_hasagg


# Operation Cost

## Sort operator

	select oid from pg_proc order by oid;

1.  Explicit: ORDER BY clause
2.  Implicit: Unique and other operators
3.  Has startup cosy: cannot return right away

## Index Scan

	select oid from pg_proc where oid=1;
	
Lower cost usually makes it preferred, especially on large tables.  
Get one tuple pointer from index and get corresponding row from table.  

## BitMap Scan
A bitmap scan works in two phase. 

1. Scan the index to get all matched tuples to form a bitmap in memory before sort it, called bitmap index scan.
2. Get row by pointers from tables before doing a index recheck, called bitmap heap scan

For the first phase, if the bitmap is too big(greater than `work_mem`) to fit into memory, PostgreSQL will work in a so called `lossy` mode to build a bitmap that contains only pages that cover those tuple pointers. When get tuple for case like this, PostgreSQL just fetch those matched pages instead of tuples. But this could involve some tuples that do not meet criterion. That is why `Index Recheck` will be used here.  
But for query that is not `lossy`, the `Index Recheck` will appear even though there is no actual work for it.
The `Index Recheck` is always appear even though the the bitmap is not `lossy`, and there is no actual work for it.




## Result Operator

	select oid from pg_proc where 1+1=3;

1. Non­table queries
2. Inside a WHERE clause ('true' vs. 'false')


## Unique Operator

	select distinct oid from pg_proc;

1. Removes duplicate values from the input set
2. Does not change ordering, simply fails to pass on duplicate rows
3. Incoming set must be ordered (will force a Sort if needed)
4. Two “cpu operations” per tuple cost
5. Used with DISTINCT and UNION


## Limit Operator

	select oid from pg_proc limit 5;

1. Rows will be equal to number specified
2. Can return first row immediately
3. Also handles offsets, with a small additional startup cost

## Aggregate Operator

	select count(*) from pg_proc;

1. Used with count, sum, min, max, avg, sttdev, variance
2. You may see differences when GROUP BY is used

## GroupAggregate Operator

	select count(*) from pg_bigtable group by oid;

Used with GROUP BY and some aggregates on larger result sets


## Append Operator

	select oid from pg_proc union all select oid from pg_proc;

1. Triggered by UNION (ALL), inheritence
2. No startup cost
3. Cost is simply the sum of all inputs

## Nested Loop Operator
	
	select * 
	from pg_bigtable inner join pg_namespace
	on (pg_bigtable.pronamespace=pg_namespace.oid);

1.  Joins two tables (two input sets)
2. USED with INNER JOIN and LEFT OUTER JOIN
3. Scans 'outer' table, finds matches in 'inner' table
4. No startup cost
5. Can lead to slow queries, especially when functions are in the select clause


##  Merge Joins

	select relname,nspname 
	from pg_class left join pg_namespace 
	on (pg_class.relnamespace = pg_namespace.oid);

1. Joins two sets: outer and an inner
2. Merge Right Joins, Merge In Joins
3. Sets must be pre­ordered (sorts), walk through both simultaneously


##  Hash & Hash Join

	select relname, nspname 
	from pg_class join pg_namespace 
	on (pg_class.relnamespace=pg_namespace.oid);

1. Compares two input sets by building hash tables
2. Used with INNER JOIN
3. Creating a hash incurs startup cost
4. Generally more efficient than Nested Loop


## Hash & Hash Left Join

	select relname, nspname 
	from pg_class left join pg_namespace 
	on (pg_class.relnamespace=pg_namespace.oid);

1. Similar to HASH / HASH JOIN
2. Incurs a startup cost
3. Used with LEFT JOIN

## Subquery Scan

	select oid from pg_proc union all select oid from pg_proc;

1. Used with unions
2. Generally not a significant problem


## ctid Scan

	select oid from pg_proc where ctid = '(0,1)';

1. Column tuple ID
2. Only used when “ctid=” appears in your query
3. Very rare, very fast

## Materialize Operator

	
The planner/optimizer may decide that it is less expensive to materialize a `subselect` once than to repeat the work for each top-level row.
The Materialize operator is used for some `subselect` operations. 
Materialize will also be used for some `merge-join` operations. In particular, if the inner input set of a Merge Join operator is not produced by a Seq Scan, an Index Scan, a Sort, or a Materialize operator, the planner/optimizer will insert a Materialize operator into the plan.


## Function Scan

	 select * from foo(12);

1. Seen when a function is gathering data
2. Somewhat mysterious for troubleshooting
3. Run explain on queries used inside function

## SetOp Operators

	select oid from pg_proc INTERSECT select oid from pg_proc;

Used (obviously) for INTERSECT, INTERSECT ALL, EXCEPT, EXCEPT ALL
