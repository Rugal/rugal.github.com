---
layout: post
title: "Java NIO Selector"
description: ""
category:  development
tags: [java, nio]
date: 2020-03-08
---


Selector is a mutiplexer.
Basically aggregate multiple channel into one bundle so we don't have to switch between different thread. By doing so, we can use one thread to handle multiple channel.

## create

Seems like there is only one way to create selector.
```java
final Selector selector = Selector.open();
```

## register channel

Each channel must register to selector is order to subscribe to coming event.

```java
// channel must be configured as unblocking
// thus FileChannel can not be registered is selector
channel.configureBlocking(false);
channel.register(selector, SelectionKey.OP_ACCEPT);
```

The second parameter is `interest operations`, which is a list of operations that this channel is interested in.

1. `SelectionKey.OP_CONNECT`
As a client, waiting for server to accept my connection request
2. `SelectionKey.OP_ACCEPT`
As a server, waiting for client connection request
3. `SelectionKey.OP_READ`
Waiting for data reading
4. `SelectionKey.OP_WRITE`
Waiting for data writing

These `interest operations` are just integer number, so they can be combined using bitwise operator like `A|B`, to indicate multiple interests for single channel.

## listen

Now that we have channel registered, let us waiting for incoming request.

```java
// this will block current thread until at least one channel is ready
// it return an integer to indicate the number of channel that is ready
// `select` will only return those that are ready between last and this `select` call
int n = selector.select();
```

## get inbound

Then we need to know which exact channel get ready.

```java
// `selectedKeys` to get a list of ready channel, we call it `selectedKey`
for (SelectionKey key : selector.selectedKeys()) {
// `selectedKey` contains a lot of objects inside.
// including, the corresponding channel, selector and its interest operations
  if (key.isAcceptable()) {
    // process channel that listen to SelectionKey.OP_ACCEPT
    // which is incoming client connection request
  }
  if (key.isReadable()) {
    // process channel that listen to SelectionKey.OP_READ
    // which is incoming request to read
  }
  // ...
}
```

## close channel

When want to close channel connection, we may use `cancel` or `close`
This will deregister itself from channel as well.

```java
key.cancel();
//or
final SocketChannel client = (SocketChannel) key.channel();
client.close();
```


## close selector

Shutdown entire selector by closing it.

```java
selector.close();
```
