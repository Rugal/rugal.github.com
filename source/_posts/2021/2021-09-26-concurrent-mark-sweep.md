---
layout: post
title: "Concurrent Mark Sweep algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

CMS是一个针对 #老生代 的  #并发 #分代收集器
从这一收集器开始,我们迈入了 #并发 时代,就是说,某些时刻用户线程和GC线程可以一起运行.
本收集器可以和 [[Parallel New]]一起使用
 
```shell
java -XX:+UseConcMarkSweepGC -jar Main.java
```


收集器是以获取最少的 #STW ，它在垃圾收集时使得用户线程和 GC 线程并发执行，因此在垃圾收集过程中用户也不会感到明显的卡顿。


### 处理流程
1. 初始标记: #STW, 仅使用一条初始标记线程对所有与 #gcroot 直接关联的对象进行标记。
2. 并发标记: 使用**多条**标记线程，与用户线程并发执行。此过程进行可达性分析，标记出所有废弃对象。速度很慢。
3. 重新标记: #STW, 使用多条标记线程并发执行，将刚才并发标记过程中新出现的废弃对象标记出来。
4. 并发清除: 只使用一条 GC 线程，与用户线程并发执行，清除刚才标记的对象。这个过程非常耗时。

并发标记与并发清除过程耗时最长，且可以与用户线程一起工作，因此，**总体上说**，CMS 收集器的内存回收过程是与用户线程**一起并发执行**的。


![](https://cdn.jsdelivr.net/gh/doocs/jvm@main/images/cms.png)


### 缺陷
-   吞吐量低
-   无法处理浮动垃圾，导致频繁 Full GC
-   使用“标记-清除”算法产生碎片空间
