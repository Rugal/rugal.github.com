---
layout: post
title: "Java Reference Type"
description: ""
category:  development
tags: [java]
date: 2021-09-26
---


从Java 1.2版本开始引入了`java.lang.ref`这个包,里面定义了总共三种引用类型
 
 1. 虚引用
 1. 弱引用
 1. 软引用


接下来我们把Java中所有的引用可能性都来讲解一遍.顺序是从最弱到最强.


## 无引用
如字面意思,就是说这个对象,完全没有任何引用能访问到它,因此该对象可以被GC.

```java
// 分配内存
var o = new Object();
// 从此开始该对象就不再有引用可以访问到它
o = null;
//在此后的某个时刻,GC应当能找到判断这个对象已经无法再访问,并释放它
```

## 虚引用

所谓`虚引用`,是一个和`无引用`几乎一样的引用类型.它的主要作用是

1. 用来做GC调试,
2. 提供更灵活的`finalize`处理机制

为了方便起见,可以将虚引用直接理解成无引用,因为在虚引用之后,在调用`get`方法后永远会返回`null`.
虚引用的主要用法是要结合`ReferenceQueue`来检查GC机制.

```java
var ref = new PhantomReference<Object>(new Object());
```

## 弱引用

弱引用是一个比虚引用略微强一点点的引用类型.
当一个对象只有弱引用的话,它一定会在下次GC的时候会清理掉.

```java
var ref = new WeakReference<Object>(new Object());
```

## 软引用

软引用是比弱引用更强一点点的引用类型.
当一个对象只有软引用的话,GC会视内存稀缺情况来进行下一步操作.
如果内存充沛,那么该对象还可以保留,反之该对象就会被回收.

```java
var ref = new SoftReference<Object>(new Object());
```


## 强引用
强引用是最实在的引用,我们正常创建出来的引用对象默认就是强引用类型.
只要一个对象还有 #gcroot 可达的强引用,这个对象就不会被回收

```java
var o = new Object();
```
