---
layout: post
title: "bash read line from file"
description: ""
category: operation
tags: [bash]
---
{% include JB/setup %}
Sometimes the `readline` functionality is required and `bash` could tackle it.  
Seems it needs redirect or pipe to provide data.  
{%highlight bash%}
# !/bin/bash

# using pipe
cat txt | \
while read line
do
    echo $line
done

# using redirect
while read line
do
    echo $line
done < `cat txt`
{%endhighlight%}
