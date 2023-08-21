---
layout: post
title: "Concurrency Ability"
description: ""
category: development
tags: [kotlin,nio,javascript]
date: 2023-08-14
---

# concurrency ability

## blockability

>Illustrate behavior of `single` thread.  
>Emphasis on whether this thread is `pause` on execution or not.  

We consider current function is blocking function if any instruction of this function is blocking.  
Otherwise we say this function is non-blocking function.  

### blocking

Current thread is paused on execution, usually due to waiting for resources.  

For instance:

1. `scanf` function in `C` will wait for user keyboard input.  
2. `read` system call to load data from network.  
3. `write` system call to flush data to persistence layer.  
4. current thread waiting for resource lock to release from another thread.  

All the examples illustrate the fact that, while executing blocking function, current thread must wait for other threads or operating system to finish the underlying task before executing next instruction.  

`Blocking` has nothing to do with `user thread`. Just as example `1-3` above, current thread is waiting for OS to finish its job. But as a matter of fact, OS operation is done by system thread, hence it is still deemed as `thread`.  
But `blocking` can wait on another user thread, as shown for case `4`.  

In all, `blocking` emphasis on pause behavior of `single` thread, but it must happen because of another thread, regardless of `system` or `user` thread.  

### non-blocking

Current thread does not wait. It keeps executing instruction without pause.  

## synchronization

>Illustrate behavior between `multiple` threads.  
>Emphasis on whether thread should `coordinate` with other threads or not.  

We consider a function that involves only single thread or does not need to coordinate with other threads at all as non-synchronized.  

```kotlin
fun nonSynchronized(): String {
  println("first")
  val a = "Rugal".also {
    Thread.sleep(3000)
    println("first end")
  }
  println("second")
  val b = "Bernstein".also {
    Thread.sleep(1000)
    println("second end")
  }
  println("result")
  return a + b
}
// async start
// first
// first end
// second
// second end
// result
// RugalBernstein     <- this follows code order
```

One the other hand, a function is synchronized/asynchronized if thread have to coordinate with others.  
In detail:  

### synchronized

A function is synchronized if thread must process communication immediately after sent/receipt. Like answering phone call.  

```kotlin
fun synchronized(): String = runBlocking {
  println("first")
  val a: Deferred<String> = async {
    delay(3000)
    println("first end")
    "Rugal"
  }
  a.await()
  println("second")
  val b: Deferred<String> = async {
    delay(1000)
    println("second end")
    "Bernstein"
  }
  b.await()
  println("result")
  a.getCompleted() + b.getCompleted()
}
// async start
// first
// first end
// second
// second end
// result
// RugalBernstein
```

### asynchronized

A function is asynchronized if thread is able to process communication whenever comfortable. Like email communication.  

```kotlin
fun asynchronized(): String = runBlocking {
  println("first")
  val a: Deferred<String> = async { 
    delay(3000)
    println("first end")
    "Rugal"
  }
  println("second")
  val b: Deferred<String> = async {
    delay(1000)
    println("second end")
    "Bernstein"
  }
  println("result")
  a.await() + b.await()
}
// async start
// first
// second
// result
// second end
// first end
// RugalBernstein     <- order is different than code order
```


## multiplexing

This conception is regarding how a single thread should handle request.  
A function is `not` multiplexing if the single thread is to solely handle the entire request from inbound to outbound. From connection acceptence to read/write and eventually, disconnection etc.,   
Upon completion, this thread is released or terminated.  It is more like a dedicate maid of a client.  

Otherwise, if the single thread will handle across multiple request. The thread will provide service separately.   
For instance it will handle connection establishment of many client, also handle I/O of many client as well. It does not dedicate to specific request.  
This would drastically enhance the performance.  
