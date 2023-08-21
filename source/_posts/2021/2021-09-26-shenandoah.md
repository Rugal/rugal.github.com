---
layout: post
title: "Shenandoah algorithm"
description: ""
category:  development
tags: [jvm,gc]
date: 2021-09-26
---

#分区收集器
#并行
 
 [source code](https://hg.openjdk.java.net/shenandoah)
 
 
![alt](http://cr.openjdk.java.net/~shade/shenandoah/shenandoah-gc-cycle.svg)
 
 ## 处理流程
 
1. 初始标记
	做下一阶段的准备活动
	扫描 #gcroot 并 #STW 
1. #并发 标记
	检查整个堆以分析对象可达性
1. 最终标记
	完结并发标记阶段,等待所有更新队列中未完成的标记任务结束,然后重新扫描一遍 #gcroot 
	根据扫描所得的结果集启动copy流程,对某些 #gcroot 进行初步复制,并准备进入下一阶段
	触发 #STW 
1. #并发 清理
	分析结果集,将并发标记后找到的垃圾区域(指没有任何存活对象的区)进行回收
1. #并发 复制
	将结果集中的对象并发复制到其他区中
1. 初始化更新引用
	#STW 
	本阶段用来检查保证所有线程都已经完成复制工作,以确保下一阶段的工作能正常进行
1. #并发 更新引用
	遍历整个堆,更新那些在并发复制过程中被移动过的老引用
	扫描过程是线性的,而不是扫描对象关系树
1. 最终更新引用
	#STW 
	完结引用更新阶段,并重新更新 #gcroot 
	回收结果集中的区,因为清理过后结果集中的对象已经没有引用指向它们了
1. #并发 清理
    回收结果集区
