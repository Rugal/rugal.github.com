---
layout: post
title: "postgresql High Availability solutions summary"
description: ""
category: operation
tags: [postgresql]
date: 2015-08-02
---

## Shared Disk Failover
Only one copy of the database on shared file system.

1. No data loss if failover happens.
2. If the shared disk array fails or becomes corrupt, all database servers are nonfunctional. 
3. Another issue is that the standby server should never access the shared storage while the primary server is running.
4. `NAS` could be the solution.

## File System Replication
Upgraded version of `Shared Disk Failover` solution. File system are mirrored to a file system residing on another computer.

1. Writes to the standby must be done in the same order as those on the master.
2. `DRBD` is a popular file system replication solution for Linux

## Transaction Log Shipping
Keep current by reading a stream of WAL records. 

1. If the main server fails, the standby contains `almost` all of the data of the main server, and can be quickly made the new master database server.
2. This can be synchronous or asynchronous and can only be done for the entire database server.
3. A standby server can also be used for read-only queries, in which case it is called a Hot Standby server

### File-based log shipping

1. Transferring WAL records one file (WAL segment) at a time. 
2. The bandwidth required for this technique varies according to the transaction rate of the primary server. 
3. Log shipping is `asynchronous`, i.e., the WAL records are shipped after transaction commit. As a result, there is a window for data loss should the primary server suffer a catastrophic failure; transactions not yet shipped will be lost. The size of the data loss window in file-based log shipping can be limited by use of the `archive_timeout` parameter, which can be set as low as a few seconds. 
4. However such a low setting will substantially increase the bandwidth required for file shipping.

### Streaming replication

1. Streaming replication allows a standby server to stay more up-to-date than is possible with file-based log shipping. 
2. The standby connects to the primary, which streams WAL records to the standby as they are generated, without waiting for the WAL file to be filled.
1. Streams WAL changes incrementally over a network connection.
2. Record-based log shipping is more granular.
3. Streaming replication is `asynchronous` by `default`, in which case there is a small delay between committing a transaction in the primary and the changes becoming visible in the standby.
4. This delay is however much smaller than with file-based log shipping, typically under one second.
5. With streaming replication, `archive_timeout` is not required to reduce the data loss window

## Trigger-Based Master-Standby Replication
Master-standby replication setup sends all data modification queries to the master server.

1. The master server `asynchronously` sends data changes to the standby server.
2. The standby can answer read-only queries while the master server is running. 
3. The standby server is ideal for data warehouse queries.
4. `Slony-I` is an example of this type of replication.
5. Because it updates the standby server asynchronously (in batches), there is possible data loss during failover.

## Statement-Based Replication Middleware
With statement-based replication middleware, a program intercepts every SQL query and sends it to one or all servers.

1. Each server operates independently. 
2. Read-write queries must be sent to all servers, so that every server receives any changes. 
3. But read-only queries can be sent to just one server, allowing the read workload to be distributed among them.
4. If query encounter situation such as `RANDOM()` which each server will generate different results, this might cause problem. Either the `middleware` or the application must query such values from a single server and then use those values in write queries. Another option is to use this replication option with a traditional master-standby setup.
5. Care must also be taken that all transactions either commit or abort on all servers, perhaps using two-phase commit.
6. `Pgpool-II` and Continuent Tungsten are examples of this type of replication.


## Asynchronous Multimaster Replication

1. Each server works independently, and periodically communicates with the other servers to identify conflicting transactions. 
2. The conflicts can be resolved by users or conflict resolution rules. 
3. `Bucardo` is an example of this type of replication.


## Synchronous Multimaster Replication

1. Each server can accept write requests, and modified data is transmitted from the original server to every other server before each transaction commits. 
2. Heavy write activity can cause excessive locking, leading to poor performance, often worse than that of a single server.
3. Read requests can be sent to any server.
4. Synchronous multimaster replication is best for mostly read workloads.
5. though its big advantage is that any server can accept write requests — there is no need to partition workloads between master and standby servers.
6. Because the data changes are sent from one server to another, there is no problem with non-deterministic functions like random().
7. PostgreSQL does not offer this type of replication, though PostgreSQL two-phase commit (PREPARE TRANSACTION and COMMIT PREPARED) can be used to implement this in application code or middleware.

## Data Partitioning
1. Data partitioning splits tables into data sets. 
2. Each set can be modified by only one server.
3. If queries combining data from different servers are necessary, an application can query both servers, or master/standby replication can be used to keep a read-only copy of the other data of server on each server.


## Multiple-Server Parallel Query Execution
This solution allows multiple servers to work concurrently on a single query.

1. It is usually accomplished by splitting the data among servers and having each server execute its part of the query and return results to a central server where they are combined and returned to the user. 
2. `Pgpool-II` has this capability. 
3. Also, this can be implemented using the `PL/Proxy` tool set.
