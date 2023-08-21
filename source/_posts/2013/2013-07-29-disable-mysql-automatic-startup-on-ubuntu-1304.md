---
layout: post
title: "disable mysql automatic startup on Ubuntu 13.04"
description: ""
category: operation
tags: [mysql, linux]
date: 2013-07-29
---
Ubuntu has abandoned SysV init script approach to booting the server since 10.04.[This link explains](http://www.linuxplanet.com/linuxplanet/tutorials/7033/1)  
So to prevent mysql from starting on boot, you have to switch to a new way as belew:

1. go to the `/etc/init` directory
2. open the `mysql.conf` file
3. comment out the `start on` line near the top of the file, this might be spread across two lines, so it is better to comment out both.
