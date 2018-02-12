---
layout: post
title: "Read Quoted Parameters in Bash"
description: ""
category: operation
tags: [bash]
---
{% include JB/setup %}

[Reading parameters]({% post_url 2013-11-03-bash-arguments-introduction %}) is easy, but how to read parameters with spaces?  
We usually wrap them with parenthesis right? But actually how?  

```bash
#!/bin/bash

whitespace="[[:space:]]"
for i in "$@"
do
    if [[ $i =~ $whitespace ]]
    then
        i=\"$i\"
    fi
    echo $i
done
```
