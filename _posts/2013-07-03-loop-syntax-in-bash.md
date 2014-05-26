---
layout: post
title: "loop syntax in Bash"
description: ""
category: operation
tags: [bash]
---
{% include JB/setup %}
if you wanna loop through from number to another number ,then bash loop may not be the best choice for you ,cause it has lot of differences from the original "for" loop as you might think of.  
{%highlight bash linenos=table%}
for i in $(seq $from $to )
do
    echo $i
done
{%endhighlight%}
where "seq" is a special function that generate a array.
