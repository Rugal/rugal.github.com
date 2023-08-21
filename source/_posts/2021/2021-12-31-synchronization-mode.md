---
layout: post
title: "Synchronization Mode"
description: ""
category:  development
tags: [java,asynchronization]
date: 2021-12-31
---

`同步模型` 是一种最基本的传统计算模型.
基本特征就是,主线程必须要停下来,等待外部调用返回,然后才能继续执行主线程的代码.

![alt](sync.svg)

```java
public class Main {

  private static String externalService() throws InterruptedException {
    Thread.sleep(5000);
    return "Rugal";
  }

  public static void main(String[] args) throws InterruptedException {
    System.out.println("Do other work");
    String value = externalService();
    System.out.println(value);
    System.out.println("Do other work");
  }
}
```

显然 `同步模型` 有很大的资源浪费的问题,因为主线程在这一期间只能等待,卡在调用点上无法动弹.
