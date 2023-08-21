---
layout: post
title: "ubuntu restart network interfaces"
description: ""
category: operation
tags: [network]
date: 2015-08-17
---
You need to restart network service if you update your network configuration.  

```shell
ifdown [interface]
ifup   [interface]
```
