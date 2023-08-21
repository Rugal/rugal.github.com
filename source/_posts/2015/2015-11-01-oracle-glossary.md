---
layout: post
title: "Oracle glossary"
description: ""
category: operation
tags: [oracle]
date: 2015-11-01
---

[serverfault](http://serverfault.com/a/51304/240955)

## Database Name
The identifier or name for a specific database. For example, `db`.

## Database Domain
Usually use as your domain name. Like, `rugal.ga`.

## Global Database Name
combine Database name with domain name. In our example, it is `db.rugal.ga`.

## SID
Means `System Identidier`, the most cricial name or identifier to an `Instance`. It is possible to have multiple instances for a database.  
Say if you have 2 instance to connect to a database, usually SID will be `database name + instance number`, that is `db1` and `db2`.  

## Instance Name
It is the same with `SID`.

## Service Name
A "connector" to one or more instances.   
It is often useful to create additional service names in a RAC environment since the service can be modified to use particular SIDs as primary or secondary connections, or to not use certain SIDs at all.


## Service Alias
An alias to the service name (just like a CNAME, etc).   
Say you make your service name something meaningful to the dba, but perhaps it's a bit esoteric.   
Create a service alias and name it something that will be meaningful to the user.

-------


## Automatic workload repository
The Automatic Workload Repository ([AWR](https://docs.oracle.com/cd/E11882_01/server.112/e41573/autostat.htm#PFGRF02601)) collects, processes, and maintains performance statistics for problem detection and self-tuning purposes.  
New feature of 10G, similar to `statpack` but even simpler.  Store last 7 days information in `sys` and `sysaux` tablespace.  

## Automatic Database Diagnostic Monitor
The Automatic Database Diagnostic Monitor ([ADDM](https://docs.oracle.com/cd/B19306_01/server.102/b14211/diagnsis.htm#i37241)) provides a holistic tuning solution. ADDM analysis can be performed over any time period defined by a pair of AWR snapshots taken on a particular instance. Analysis is performed top down, first identifying symptoms and then refining them to reach the root causes of performance problems.  
Provision SQL tunning, index creation, gathering of statistics recommendation.  
When comparing a pair of AWR snapshot, it detects workload changes, configuration changes and shows the resource usage for CPU, memory, and I/O in both time periods.  

## Active Session History
To capture a detailed history of database activity, Oracle Database samples active sessions each second with the Active Session History ([ASH](https://docs.oracle.com/cd/E11882_01/server.112/e10822/tdppt_transient.htm#TDPPT065)) sampler. AWR snapshot processing collects the sampled data into memory and writes it to persistent storage. ASH is an integral part of the Oracle Database self-management framework and is extremely useful for diagnosing performance problems.  
Based on `v$session`, sampling ever second.  

-----------------


## sqlnet.ora

1. Specify the client domain to append to unqualified names
2. Prioritize naming methods
3. Enable logging and tracing features
4. Route connections through specific processes
5. Configure parameters for external naming
6. Configure Oracle Advanced Security
7. Use protocol-specific parameters to restrict access to the database

## listener.ora

1. Name of the listener
2. Protocol addresses that the listener is accepting connection requests on
3. Database services
Dynamic service registration, eliminates the need for static configuration of supported services. However, static service configuration is required if you plan to use Oracle Enterprise Manager.
4. Control parameters


## tnsname.ora
The `tnsnames.ora` file is a configuration file that contains network service names mapped to connect descriptors for the local naming method, or net service names mapped to listener protocol addresses.  

A net service name is an alias mapped to a database network address contained in a connect descriptor. A connect descriptor contains the location of the listener through a protocol address and the service name of the database to which to connect. Clients and database servers (that are clients of other database servers) use the net service name when making a connection with an application.

---------------------

## SQL tuning advisor
The [SQL Tuning Advisor](https://docs.oracle.com/cd/B28359_01/server.111/b28274/sql_tune.htm#CHDJDFGE) takes one or more SQL statements as an input and invokes the Automatic Tuning Optimizer to perform SQL tuning on the statements. The output of the SQL Tuning Advisor is in the form of an advice or recommendations, along with a rationale for each recommendation and its expected benefit. The recommendation relates to collection of statistics on objects, creation of new indexes, restructuring of the SQL statement, or creation of a SQL profile. You can choose to accept the recommendation to complete the tuning of the SQL statements.


## SQL access advisor
The SQL Access Advisor helps you achieve your performance goals by recommending the proper set of materialized views, materialized view logs, and indexes for a given workload. Understanding and using these structures is essential when optimizing SQL as they can result in significant performance improvements in data retrieval.


## SQL performance analyzer
[SQL Performance Analyzer](https://oracle-base.com/articles/11g/sql-performance-analyzer-11gr1), which compares the performance of the statements in a tuning set before and after a database change. The database change can be as major or minor as you like.
