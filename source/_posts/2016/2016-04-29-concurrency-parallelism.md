---
layout: post
title: "Concurrency vs. Parallelism"
description: ""
category: development
tags: []
date: 2016-04-29
---

## Concurrency

>Works on many different tasks at the same time.   

Notice different tasks may execute in different program logics.  
For example one `PostgreSQL` instance will spawn many processes to do different work for maintaining database ACID and others.  
During this procedure, data involved might even be the same, but different processes will perform totally different program logic, including `archiving`, `WAL sending`, `checkpoint` etc.,


## Parallelism 
>Works on many subtasks that are splitted from a single task.  

Notice those subtasks would be executed in same logic except possibly data or parameter differences.     
For instance, `Hadoop` will split the original data into several smaller data segments and dispatch them to datanode for detailed computation.   
During this procedure, the computational logic has been compiled in ahead, the only variable are the data.  
