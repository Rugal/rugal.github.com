---
layout: post
title: "Regular Expression Note"
description: ""
category: development
tags: [regexp]
---
{% include JB/setup %}

symbol|description
---|---
.|$x=1$
?|$x==1|x==0$
+|$x\geq 1$
*|$x\geq 0$
{n}|$x=n$
{min,}|$x\geq min$
{min,max}|$min<x<max$
[]|Match a single character in
[^ ]|Match a single character not in
