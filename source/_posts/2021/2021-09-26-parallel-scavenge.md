---
layout: post
title: "Parallel Scavenge algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

#scavenge 

本收集器主要是针对 #新生代 的 #分代收集器,运行的算法主要是 #mark-copy ,只不过是由多个线程 #并行 (parallel)的进行垃圾收集,而每个线程所执行的算法也只是简简单单的 [[Serial]],因此该过程需要 #STW .由于本身使用了多线程进行并行处理,整个垃圾清除过程会比[[Serial]]快一些.
当然也由于并行的存在,使得线程调度和实现过程变得略微复杂一些.

```bash
java -XX:+UseParallelGC -jar Main.java
```

由于本收集器只针对新生代,老生代会使用[[Parallel Old]]
本收集器无法和[[CMS]]一起使用, 一旦启用了`UseParallelGC`参数,[[Parallel Scavenge]]和[[Parallel Old]]就会同时使用起来.
