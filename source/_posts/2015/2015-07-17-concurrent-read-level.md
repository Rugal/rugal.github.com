---
layout: post
title: "concurrent read level"
description: ""
category: operation
tags: [postgresql, database]
date: 2015-07-17
---
Assume we have 2 transactions execute concurrently.  

# possible problem
## dirty read
Transaction 1 reads uncommitted data from transaction 2. Uncommitted means these data could be removed or changed somehow, that results into read inconsistency.  


-|A|B
---|---|---
1|begin|begin
2|read|
3||update
4|commit|
5||rollback

Session A unnecessarily read data from B.  


## Non-repeatable reads
Read operation within one single transaction must stay same even if another transaction is updating data.  
Transaction 1 reads different data from rows as transaction 2 updates and commits those rows before.  

-|A|B
---|---|---
1|begin|
2|read|
3||update
4|read|
5|commit|

Session A read 2 times, each read different data within same transaction.  


## Phantom reads
Transaction 1 reads different number of row because transaction 2 inserts or deletes on this table

-|A|B
---|---|---
1|begin|
2|read|
3||insert
4|read|
5|commit|

Session A read 2 times in a transaction, but get different number of row in result


# method to deal

Isolation Level	|Dirty Read |	Nonrepeatable Read	| Phantom Read	|Serialization Anomaly
--- | --- | --- | --- | ---
Read uncommitted	|Allowed, but not in PG|	Possible	| Possible|	Possible
Read committed	|Not possible	| Possible	|Possible	|Possible
Repeatable read	|Not possible	|Not possible	|Allowed, but not in PG	|Possible
Serializable	|Not possible	|Not possible|	Not possible	|Not possible
