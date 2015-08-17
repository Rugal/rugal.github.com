---
layout: post
title: "ubuntu restart network interfaces"
description: ""
category: operation
tags: [network]
---
{% include JB/setup %}
You need to restart network service if you update your network configuration.  
{%highlight bash%}
ifdown [interface]
ifup   [interface]
{%endhighlight%}
