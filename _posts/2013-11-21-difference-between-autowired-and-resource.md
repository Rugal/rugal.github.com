---
layout: post
title: "difference between @Autowired and @Resource"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
Even if using these two annotation for a while, I still forget the difference between @autowired and @resource:  
{%highlight java%}
//this annotation is belong to spring,
//assembled by type in default then name
@Autowired
private BaseDao baseDao;

//this annotation is belong to JavaEE
//assembled by name in default then type
@Resource
private BaseDao baseDao;
{%endhighlight%}
