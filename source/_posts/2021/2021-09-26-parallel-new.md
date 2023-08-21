---
layout: post
title: "Parallel New algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

本收集器是一种新型的 #并行 的针对 #新生代 的 #分代收集器 . 和[[Parallel Scavenge]]类似,但性能更好一点, 并且可以和[[CMS]]协同使用.
收集过程中需要 #STW 

```bash
java -XX:+UseParNewGC -jar Main.java
```
使用的是多线程 #并行   #mark-copy 算法.
对老生代来说,可以使用[[CMS]]收集器.


![](https://cdn.jsdelivr.net/gh/doocs/jvm@main/images/parnew.png)
