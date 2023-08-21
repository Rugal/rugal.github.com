---
layout: post
title: "Mark Sweep algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

1. 首先需要 #STW 从 #gcroot 出发遍历所有对象,将不可达的对象标记上
2. 然后将标记过的对象全都进行回收

![ms](https://github.com/gaoxingliang/goodutils/blob/master/res/gcbook/free-list-sweep.png?raw=true)

#mark-sweep 法作为最最基础的算法是非常符合直觉的,也非常容易实现.但非常明显的一个问题就是,容易造成内存碎片化,到最后明明内存有的是,但由于每个内存之间不连续,无法一次性分配出足量的连续内存,导致系统崩溃
