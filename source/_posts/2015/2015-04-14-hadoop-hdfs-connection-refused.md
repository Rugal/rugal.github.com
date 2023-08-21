---
layout: post
title: "Hadoop HDFS Connection Refused"
description: ""
category: operation
tags: [hadoop, linux]
date: 2015-04-14
---

Today I encounter a problem about connection refused by HDFS, not because of the firewall or something, but because of the `/etc/hosts` configuration in ubuntu.  
By default, the there will have an entry  

    127.0.1.1   domain.name

It is this entry that direct access back to `127.0.1.1`, so the network setup only for local access.  
Just removing this entry or replacing the `127.0.1.1` with your ip address could tackle this problem.  
More diagnostic, please refer to [apache](https://wiki.apache.org/hadoop/ConnectionRefused).
