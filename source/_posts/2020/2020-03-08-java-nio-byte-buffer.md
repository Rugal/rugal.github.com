---
layout: post
title: "Java NIO Byte Buffer"
description: ""
category:  development
tags: [java, nio]
date: 2020-03-08
---

Buffer is an encapsulation for array of bytes. This class provisions some useful methods to read/write data, and switch between read and write.

## indicators
The Buffer class has a `byte[]` inside to store actual data in byte format. There are several indices used to indicate possible read/write position. In all there are 4 variables, `mark`, `position`, `limit` and `capacity`
The relative relationship between them are:
> 0 <= mark <= position <= limit <= capacity

### capacity
It is the length of byte array, unchangeable at all.

### limit
It is soft length of byte array. Meaning it is the length of byte that can read/write. Any data that beyond this limit is not readable/writeable.

### position
It is the current location of data to read/write

### mark
Just an interesting point where you may want to revisit after.

## Usage
The basic usage is to instantiate a buffer by
```java
final ByteBuffer b = ByteBuffer.allocate(64);
```

### write into buffer

```java
// this will reset `position` to 0 and limit to capacity
// so as to allow write as many as the capacity is
b.clear();
// this will write so many byte array into the buffer b
b.put("Rugal Bernstein".getBytes());
```

### read from buffer
```java
// once done writing, we have to switch into read mode
// by simply using `flip` method
// it will reset the `position` as 0
b.flip();
// ask how many byte we still have between `position` and `limit`
while(b.hasRemaining()){
  // the `position` increment every time we use `get`
  System.out.print((char) b.get());
  // the loop exits when last byte is `got` from 
}
//> Rugal Bernstein
```


That is the usage of buffer, remember you must switch between `read` and `write` mode by using `flip` method, otherwise you will not be able to get what you want. 
