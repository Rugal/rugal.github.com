---
layout: post
title: "linux sort usage"
description: ""
category: operation
tags: [bash]
---
{% include JB/setup %}
I found it is great useful to enroll sort as my bash tool:
{%highlight bash%}
sort [options] [files]
options:
-u          #unique
-r          #use reverse order
-o          #output into a file
-n          #numberic comparison
-t ?        #treat ? as delimiter
-k n        #order by column n, start from 1
-f          #ignore case
-b          #ignore all blank line in the head
{%endhighlight%}
