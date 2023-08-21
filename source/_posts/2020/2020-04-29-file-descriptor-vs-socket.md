---
layout: post
title: "File Descriptor VS Socket"
description: ""
category:  development
tags: [linux, c]
date: 2020-04-29
---

## file descriptor

FD is the ultimate abstraction of any sort of resources in Linux system.
This is to generalize all operations to all kinds device/file etc.,

With it, regular device, file, socket, pipe etc., can all be treated equally. So that we don't have to have type specific interface to deal each type respectively.

Process can interact with fd, read/write to fd. So we can think of FD is a tray, or a book to contain data.


## socket

Socket is interface to communicate with another process, either locally or remotely. socket is like a telephone or pipe, through which both process can talk to each other.  

The network communication has to go through socket and a binded port.  
A binded port is required for remote process to locate on network. 
The actual read and write still have to go through FD, this means we need to bind FD with socket as well. That is why socket has to be created with FD by `socket` system call.

So in all, the actual data still go through fd, but this fd is binded with socket, and socket is binded with port, so that the data can transmitted to network through read/write to fd.
