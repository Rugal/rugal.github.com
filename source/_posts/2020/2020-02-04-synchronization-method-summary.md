---
layout: post
title: "Synchronization Method Summary"
description: ""
category:  development
tags: [linux, c]
date: 2020-02-04
---

I would like to write this document to sort and clarify some misunderstanding of synchronization method of me.  
Throughout the development of computer science and engineering, synchronization is an extremely important way to control the behavior for multi-thread or multi-process program.
But there are too many confusing exist:

1. different blog use slightly different terminology to describe the same object
2. different terminology used also in various of environment in order to depict some object as well

From all the different definition, here I pick 4 names in for clarification purpose. 

## mutex
`mutex` is short name for `mutual exclusive`.   
From the name, mutex prevents more than one access(process/thread) to a resource at the same time.  
One must obtain the mutex in order to enter the critical section, and free the mutex after exiting the critical section. Any other access to the mutex will be blocked right before the critical section and keep waiting there until mutex is freed from the owner.
Once the mutex is freed, it will be allocated to a random access which is queued right defore critical section.

The classic usage for `mutex` is to limit access to a counter variable so that, amongst all accesses, only one access can update the value of this counter.

## semaphore
semaphore stands for `signal`, similar to `mutex`, semaphore also used to control the access to a shared resource.  
But semaphore allows N access to enter critical section simutanously. You may think of semaphore as N `mutex` as a whole. 
While accessing resource, we use operation `p` to try to get 1 semaphore, we may get the access right away if there is enough signal, otherwise we will be blocked just like `mutex`. Once we got the access and enter critical section, the number of N will decrease by 1. All subsequence accesses will be blocked if N is less than 1.  
When done with the resource, we need to use operation `v` to release/free it, and the number of N will increase by 1.

A classic scenario of `semaphore` is `philosopher chopsticks problem`, while multiple accesses consume fixed number of shared resources. This may cause deadlock problem if we do not design the solution properly even if we use `semaphore`. Some good strategies do exist with `semaphore` are there to prevent deadlock with the sacrifice of performance.

## monitor
`monitor` is quite different from the 2 methods above, sometimes also called `condition variable`.
monitor method usually has 2 operations, `wait` and `signal`.
`wait` operation blocks current access.
`signal` operation wakes up one access in the waiting queue to enter critical section.

monitor is suitable for collaberative scenario, like consumer and producer, where some producer create resources for consumers if there is not enough resource, and consumer destroy the resources if there is enough.

## lock
Amongst all synchronization methods here, the above 3 methods are pretty low leveled, mostly in system programing in C/C++ with process or thread level operations.  I did not mention anything like operating system and language because I do not want to be stucked in particular environment and scenario. But still, I need to emphasis that `lock` is relatively high level operation.

When you see `lock` it sometimes represents `synchronization method` in general, including `mutex` `semaphore` and `monitor`.  
But here I use `lock` to represent a specific conception, which is mostly used to limit the access to resource as well. Sounds very similar to the `mutex` right? But `lock` is used mostly in database for instance, like read/write lock, so that only a limited number of access will get read/write database table.  

Various databases have different implementation and granularity for `lock`, but overall, most databases have read and write lock for table respectively.
Read lock does not prevent other read only access, but stop write operation. So with read lock, multiple access can read only same table/resource at the same time.
Write lock will block any other read and write operation to the table/resource until it is done, very much like a `mutex`.  

These locks are to ensure the integrity of table data.  
