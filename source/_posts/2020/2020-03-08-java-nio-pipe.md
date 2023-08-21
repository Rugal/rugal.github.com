---
layout: post
title: "Java NIO Pipe"
description: ""
category:  development
tags: [java, nio]
date: 2020-03-08
---

Pipe is another channel used for communicate between threads.
It has 2 ends, `source` for read only, and `sink` for write only.


## Create

Simply use `open`

```java
Pipe pipe = Pipe.open();
```

## Write

```java
// get the sink/write end of pipe
Pipe.SinkChannel sink = pipe.sink();
String newData = "Rugal Bernstein:" + System.currentTimeMillis();

ByteBuffer buf = ByteBuffer.allocate(48);
buf.clear();
buf.put(newData.getBytes());
buf.flip();

while (buf.hasRemaining()) {
  // same as other channel, just write to it
  sink.write(buf);
}
```

## Read

```java
// get source/read end of pipe
Pipe.SourceChannel source = pipe.source();
buf.clear();
// same as other channel, simply read it into byte buffer
source.read(buf);
System.out.println(new String(buf.array()));
```
