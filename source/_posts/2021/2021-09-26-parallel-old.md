---
layout: post
title: "Parallel Old algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

本收集器是针对 #老生代 的 #并行 #分代收集器. 
在收集的过程中,会启动多个线程进行并行收集,每个线程都会使用 #mark-compact 

由于本收集器只针对老生代,新生代会使用[[Parallel Scavenge]]

```shell
java -XX:+UseParallelGC -jar Main.java
```

一旦启用了`UseParallelGC`参数,两种收集器就会同时使用起来.
