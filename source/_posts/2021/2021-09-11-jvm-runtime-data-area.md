---
layout: post
title: "JVM runtime data area"
description: ""
category:  development
tags: [java, jvm]
date: 2021-09-11
---

Runtime data is living in execution of application.
Some of data area are JVM-wise, means they create upon JVM startup and destroy when JVM shutdown.
Other data are thread specific, means their lifecycle is binded with thread lifecyclej

![runtime-data-area](https://www.programcreek.com/wp-content/uploads/2013/04/JVM-runtime-data-area.jpg)


# PC register(thread)

Each JVM thread has its own `pc`.

1. The value will be the `address of JVM instruction` + `return address` of currently thread
2. `undefined` if the current method is `native`

# JVM stack(thread)

Each thread has its own stack.
Similar to the stack in `C`.
Does not have to be contiguous.

1. `StackOverflowError` if wants to have larger stack than permitted, larger in turns of the number frame
2. `OutOfMemoryError` if wants to have more memory space than permitted


# Heap

Heap is shared amongst all JVM threads.
Heap storage is managed by GC.
Heap can be fixed, expandable and shrinkable.
The memory does not need to be contiguous.

1. `OutOfMemoryError` if wants to have more memory space than permitted

# Method area

Shared amongst all JVM threads
It is the `text` segement in ASM.
Can be fixed, expandable and shrinkable.
The memory does not need to be contiguous.
This area does not have to GC

* `OutOfMemoryError` if wants to have more memory space than permitted

Contains class structure:

1. runtime constant pool
2. field data
3. method data
4. method code & constructor
5. static block/method


# native method stack(thread)

A `C stack` will be created for all `native` method
Allocated per thread.
Can be fixed, expandable and shrinkable.


1. `StackOverflowError` if wants to have larger stack than permitted, larger in turns of the number frame
2. `OutOfMemoryError` if wants to have more memory space than permitted
