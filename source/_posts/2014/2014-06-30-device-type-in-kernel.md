---
layout: post
title: "device type in kernel"
description: ""
category: development
tags: [linux]
date: 2014-06-30
---
The road towards linux kernel is tough, some terminology also intuitive, here is some conclusion for devices, that treated differently in kernel.  


### Character devices

1. unbuffered, direct access to the hardware device 
2. character device for a hard disk, require that all reads and writes are aligned to block boundaries and most certainly will not let you read a single byte
3. They do not necessarily allowed to read or write single characters at a time, that is up to the device in question


### Block devices

1. buffered access to the hardware
2. block devices will always allow you to read or write any sized block you wish (including single characters/bytes) and are not subject to alignment restrictions
3. The downside is that because block devices are buffered, you do not know how long it will take before a write is pushed to the actual device itself; additionally, if the same hardware exposes both character and block devices, there is a risk of data corruption due to the clients using the character device being unaware of changes made in the buffers of the block device
