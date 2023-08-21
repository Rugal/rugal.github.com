---
layout: post
title: "loop syntax in Bash"
description: ""
category: operation
tags: [bash]
date: 2013-07-03
---
if you wanna loop through from number to another number, bash loop may not be the best choice for you, cause it has lot of differences from the original `for` loop as you might think of.  
```bash
for i in $(seq $from $to )
do
    echo $i
done
```
where `seq` is a special function that generate a array, similar with `python`.
