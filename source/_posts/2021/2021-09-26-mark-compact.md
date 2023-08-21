---
layout: post
title: "Mark Compact algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

1. 和 #mark-sweep 一样 首先需要 #STW 从 #gcroot 出发遍历所有对象,将不可达的对象标记上
2. 然后将标记过的对象全都进行回收
3. #STW 将剩下的存活对象整理好并排布在内存的前端


![sc](https://github.com/gaoxingliang/goodutils/blob/master/res/gcbook/mark-sweep-compact.png?raw=true)


#mark-compact 的特点就是可以消除内存碎片问题,大幅提高内存完整度,但也正因为这个整理的操作,该算法需要更多 #STW 来整理内存,并将原来的引用指向新的对象地址
