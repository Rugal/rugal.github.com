---
layout: post
title: "Java NIO Asynchronous"
description: ""
category:  development
tags: [java, nio]
date: 2020-03-08
---


NIO also provisions asynchronous channel as well.

```java
Path path = Paths.get("README.md");
// this will create asynchronous enabled channel
// other channel like Socket also has this feature
AsynchronousFileChannel c = AsynchronousFileChannel.open(path, StandardOpenOption.READ);
```

## Future

```java
// we read and write data like this, but they return Future object instead
Future<Integer> operation = fileChannel.read(buffer, 0);
Future<Integer> operation = fileChannel.write(buffer, position);
// then we poke around to see if this operation is completed
while(!operation.isDone());
```

## CompletionHandler

Same usage as `comparator`, simply use `CompletionHandler` to deal with read and write operation.
Upon read/write completion, the `completed` method will be invoked.

```java
//
// read
//
c.read(buffer, position, buffer, new CompletionHandler<Integer, ByteBuffer>() {
  @Override
  public void completed(Integer result, ByteBuffer attachment) {
    System.out.println("result = " + result);
     attachment.flip();
     byte[] data = new byte[attachment.limit()];
     attachment.get(data);
     System.out.println(new String(data));
     attachment.clear();
  }

  @Override
  public void failed(Throwable exc, ByteBuffer attachment) {}
});
//
// write
//
c.write(buffer, position, buffer, new CompletionHandler<Integer, ByteBuffer>() {
  @Override
  public void completed(Integer result, ByteBuffer attachment) {
    System.out.println("bytes written: " + result);
  }

  @Override
  public void failed(Throwable exc, ByteBuffer attachment) {
    System.out.println("Write failed");
    exc.printStackTrace();
  }
});
```
