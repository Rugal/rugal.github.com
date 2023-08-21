---
layout: post
title: "mutex vs. semaphore"
description: ""
category: development
tags: [linux]
date: 2014-06-30
---
You might have seen these two terminologies for a very long time, since university class called `operating system`, but can you help clarify this?  
 As depict below, they are totally different, although seems identical in mechanism.  


## mutex
Strictly speaking, a mutex is `locking mechanism` used to synchronize access to a resource.   
Only one task (can be a thread or process based on OS abstraction) can acquire the mutex. It means there will be ownership associated with mutex, and only the owner can release the lock (mutex).  


## semaphore
Semaphore is `signaling mechanism` (“I am done, you can carry on” kind of signal).    
For example, if you are listening songs (assume it as one task) on your mobile and at the same time your friend called you, an interrupt will be triggered upon which an interrupt service routine (ISR) will signal the call processing task to wakeup.  



----


Hence use `semaphore` to coordinate through various system of identities that share the same resource.   
But in the locking section in the detailed semaphored queue towards an object that we try to locking this resources from being accessed or modified by other processes, we need to use `mutex`.  
