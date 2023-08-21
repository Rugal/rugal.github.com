---
layout: post
title: "Springmvc parameter IllegalArgumentException"
description: ""
category: development
tags: [java]
date: 2015-10-03
---

I encounter the same problem as this [page](https://objectpartners.com/2010/08/12/spring-pathvariable-head-slapper/) claimed.   
The actual problem is that, turning javac target’s debug attribute to `on` will enable JVM to detect parameter name during runtime.   
Otherwise, we need to specify the name of the parameter in 

```java
//change this
@RequestParam String name
//to this
@RequestParam(value = "name") String name
```

to enable the runtime detection whatever debug attribute is on or not.
