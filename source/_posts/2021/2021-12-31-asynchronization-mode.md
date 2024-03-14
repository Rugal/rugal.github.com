---
layout: post
title: "Asynchronization Mode"
description: ""
category:  development
tags: [java,asynchronization]
date: 2021-12-31
---

`异步模型` 引入了另一个线程,专门用来做等待的工作,这样就把主线程解放了出来.

而根据这个异步线程是否要处理主线程的逻辑,又可以将异步模型分为两种不同的模型
我讲这两个模型称为 `代理模型` 与 `非代理模型`

## 异步非代理模型 

![alt](non-delegate.svg)
在该模型中,主线程向异步线程提交任务后就可以继续做自己的事情去了,这个异步线程会返回一个引用到最终结果的对象,在Java中叫做`Future`,在Javascript中被称为`Promise`.  
主线程可以通过查询这个引用对象来查看查询进度和返回结果.

该模型的一个明显的问题就是,主线程如果要对返回结果进行处理,仍然需要等待`Future`对象返回结果.
尽管在等待期间主线程可以去做其他事情,但主线程仍然需要不断地查询`Future`对象才能真正得到数据.


## 异步代理模型


![alt](delegate.svg)
针对上一个异步模型存在的问题,我们可以将数据处理逻辑代理给异步线程.主线程在提交任务后可以完全忘掉这件事情,大大提高了任务吞吐率.
任务提交给异步线程后,异步线程会等待数据返回并将主线程委托给自己的处理逻辑施加在返回的数据上,因此完全不需要主线程的介入.
而且一般来说针对异步模型,大部分语言都会创建一个线程池,以此提高线程利用率,降低CPU负载.
在Java中,可以使用`CompletableFuture`或`ListenableFuture`来完成这个任务.

`CompletableFuture`和`ListenableFuture`的用法不同.前者可以使用链式语法来编写处理逻辑链条,是一种 `反应式编程`,而后者需要使用所谓的 `回调函数` (callback function),在Java中使用的是匿名内部类或`Lambda`.

这两种方式中,后者很可能导致可读性极差的代码,因此前者是相对更推荐的方法
