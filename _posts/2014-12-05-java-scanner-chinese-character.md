---
layout: post
title: "java scanner chinese character"
description: ""
category: operation
tags: [java]
---
{% include JB/setup %}



I just find it is difficult to scan Chinese character in Java.  
For reading `UTF-8` chinese character by `Scanner`, you need to identify the char-set.  

{%highlight java%}
Scanner sc = new Scanner(file, "utf-8");
{%endhighlight %}

Or `sc,hasNext()` will end inaccidently.
