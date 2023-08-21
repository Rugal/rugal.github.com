---
layout: post
title: "Java NIO Channel"
description: ""
category:  development
tags: [java, nio]
date: 2020-03-08
---

`Channel` is a `stream` kind of representation in `NIO`. It is a representation of hardware, file, network device or other program.

There are several different channel that loads data differently.

-   FileChannel
-   DatagramChannel
-   SocketChannel
-   ServerSocketChannel


Unlike stream object, which can only input or output one at a time.   A single Channel object can do both read and write simutanously.


```java
try (RandomAccessFile file = new RandomAccessFile("data.md", "rw");
     FileChannel c = file.getChannel()) {
  final ByteBuffer b = ByteBuffer.allocate(64);
  b.clear();
  System.out.println("Read " + c.read(b));
  b.flip();
  System.out.println("Write " + c.write(b));
}
```

From the snippet above, we can tell that a single channel object can do both read and write.
