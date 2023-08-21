---
layout: post
title: "Object Generational Assumption"
description: ""
category:  development
tags: [java,jvm,gc]
date: 2021-09-26
---


根据统计显示,绝大部分创建出来的对象都符合如下图般的规律.
 大部分对象的存活时间都非常短,刚创建出来一会儿就不再有引用了.例如在做计算的过程中所创建出来的对象,在一个计算公式结束后计算过程中所有的中间临时变量都不再有用了.
 而另外,有一小半对象的存活时间会非常长,甚至是一直存在于进程之中的.例如系统配置变量等需要全局引用的对象等.
 剩下的那些存活时间不长也不短的对象,则仅仅占据了非常小的比例.
 
 根据这个统计,我们很自然的想到按照对象存活的时间进行分开管理.
 
 
 1. 将寿命非常短的那一类对象归为新生代,young
 2. 将永久存在的部分称为永久代permanent,Java8之后称为元空间.注意该区域主要存放的是类信息以及字符串`intern`的信息,并且该空间也是可以被GC的
 3. 剩下的中间部分我们称为老生代old/tenure

![generational](https://github.com/gaoxingliang/goodutils/blob/master/res/gcbook/objects-age.png?raw=false)

值得注意的是,新创建出来的对象我们一般的都会放在新生代中.而如果一个对象在新生代中存活了一定时间,超过一个阈值,我们则会把它移动到老生代中去.这是我们对对象存活时间延长的一个操作.

此外,一般的垃圾收集器还会在新生代中继续分区,一般分为 #eden 和 #survivor 区
