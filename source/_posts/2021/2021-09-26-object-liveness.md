---
layout: post
title: "Object Liveness"
description: ""
category:  development
tags: [java,jvm,gc]
date: 2021-09-26
---


为了确定一个对象是否可以进行内存回收,我们有以下几种判定方法

## 引用计数法

引用计数法是非常经典也非常简单容易实现的判定方法.
基本原理就是每当有一个引用挂在对象上,这个对象上的引用计数器就`+1`.
若对象上的引用计数器归0了则判定这个对象可以被回收.
这个算法非常好理解,也非常好实现,很多语言例如Python都是用这种方式.

但这个方法有一个严重的问题,就是如果两个对象互相引用对方,而没有其他引用指向这两个对象的话,我们可以认为这两个对象形成了一个孤岛,而外部没有任何方法能访问到这两个对象.
这种情况下这两个对象的引用计数器不为0,而显然这两个对象应该被遗弃清理掉.
因此引用计数法虽然简单易懂,但存在这个漏洞会导致内存泄漏. #correctgc 

![counter](https://github.com/gaoxingliang/goodutils/blob/master/res/gcbook/reference-cyclic.png?raw=false)

## GC Root可达

另外一种更靠谱的方法就是去计算一个对象的可达性.
我们可以将对象之间的引用关系理解成一个图,如果从一个节点出发,以某个路径抵达目标对象,我们就说这两个对象是联通的.
在我们的 #gcroot 可达性分析中,会有一个概念叫做 GC Root,从这个Root出发,如果能以某种路径访问到目标对象,则我们认为这个目标对象是可达的,因此该对象应该被保留下来.

![gcroot](https://github.com/gaoxingliang/goodutils/blob/master/res/gcbook/reference-count-1.png?raw=true)


那么如何定义GC Root呢? JVM Specification中定义了以下的几种变量:

- 局部变量
- 静态变量
- 常量
- 由Java Native Interface所引用的
