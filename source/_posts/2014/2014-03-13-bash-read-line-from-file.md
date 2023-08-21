---
layout: post
title: "bash read line from file"
description: ""
category: operation
tags: [bash]
date: 2014-03-13
---
Sometimes the `readline` functionality is required and `bash` could tackle it.  
Seems it needs redirect or pipe to provide data.  

```shell
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
```
