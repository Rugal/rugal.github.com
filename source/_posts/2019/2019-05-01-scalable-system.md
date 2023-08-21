---
layout: post
title: "Scalable System"
description: ""
category:  development
tags: [system]
date: 2019-05-01
---

## [Clone](https://www.lecloud.net/post/7295452622/scalability-for-dummies-part-1-clones)
Use load balance to distribute user request.

Every server contains exactly the same codebase and does not store any user-related data, like sessions or profile pictures, on local disc or memory.

Sessions need to be stored in a centralized data store which is accessible to all your application servers, like Redis.

Also requires a great way to clone the deployment to different server. Nowadays we can use Openshift `deployment`.


## [Database](https://www.lecloud.net/post/7994751381/scalability-for-dummies-part-2-database)

### Centralize and Normalize Data with RDBMS
Use Master-Slaver to separate the read and write operations. keep adding more memory into server. Unscalable, 

### Decentralize, Denormalize and Sharding with NoSQL/RDBMS
Scalable because of asking your app do the dataset-joins. 
But database requests will again be slower and slower.


## [Cache](https://www.lecloud.net/post/9246290032/scalability-for-dummies-part-3-cache)

With “cache” I always mean in-memory caches like Memcached or Redis. 
Please never do file-based caching, it makes cloning and auto-scaling of your servers just a pain. 


### Cache Database Query Result
Basically store the query result into cache with hashed SQL text as key. 			


It is hard to delete a cached result when you cache a complex query (who has not?). 
When one piece of data changes (for example a table cell) you need to delete all cached queries who may include that table cell.


### Cache Object
Let your class assemble a dataset from your database and then store the complete instance of the class or the assembled dataset in the cache.

It makes asynchronous processing possible.



## [Asynchronism](https://www.lecloud.net/post/9699762917/scalability-for-dummies-part-4-asynchronism)

### Proactive
Prepare the content and cache them ahead of time so that the service is more performant. Handle them over to cloud would make them even super responsive.

### Process & Notify
Request be processed at backend when not keeping customer waiting. Service will notify customer once the process is done.
Incorporating queuing and messaging technology benefit this process more smoothly. Basically all jobs/tasks are put in the queue waiting for the processor to pick them up. Once the process is done, the result will be placed into messaging queue and notify customer about it.

