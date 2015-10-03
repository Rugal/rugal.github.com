---
layout: post
title: "Springmvc parameter IllegalArgumentException"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
I encounter the same problem as this [page](https://objectpartners.com/2010/08/12/spring-pathvariable-head-slapper/) claimed.   
The actual problem is that, turning javac target’s debug attribute to `on` will enable JVM to detect parameter name during runtime.   
Otherwise, we need to specify the name of the parameter in 
{%highlight java%}
@RequestParam(value = "name") String name
{%endhighlight%}
to enable the runtime detection whatever debug attribute is on or not.
