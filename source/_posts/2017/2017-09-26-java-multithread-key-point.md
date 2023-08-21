---
layout: post
title: "Java Multithread key points"
description: ""
category: development
tags: [java]
date: 2017-09-26
---

## volatile

`volatile` is an important keyword in multi-thread programming.  
Whenever multi-threads read or write one variable or reference, each thread runs on its own CPU.  
As each CPU has its own cache, there might have some chances that one thread writes the value to its CPU cache and another thread reads it. But writing to the cache of one CPU doesn't the value in main memory also get updated. Therefore the time gap between writing to CPU cache and flushing to main memory creates discrepancy in multi-thread.  


[![image.png](https://i.postimg.cc/J7gysDcJ/image.png)](https://i.postimg.cc/J7gysDcJ/image.png)  


`volatile` makes sure that JVM won't reorder the bytecode operations and enforces the value in CPU cache to be flushed out to memory, so that other threads can always get the latest value.  

[![image.png](https://i.postimg.cc/5yZjTTNp/image.png)](https://i.postimg.cc/5yZjTTNp/image.png)  

But this is not good enough for multi-thread programming if we need to update value based on previous value.  
This is when `synchronized` comes in.  


## synchronized

To enforce that only thread could access the `critical area`, that is, if there is one thread already in the `critical area`, others will be blocked.  

## wait
`wait` method give up the object monitor to others. Can only be used in `synchronized` block.  


## notify(All)
These methods tell other threads to wake up. Can only be used in `synchronized` block.  

## join
Ask current thread to wait the exit of the calling thread, e.g.  

```java
public static void main(String[] args) {
	Thread a = new Thread();
	a.start();
	a.join();
}
```

By calling `join`, the daemon thread will not exit the main method until thread `a` exits.
