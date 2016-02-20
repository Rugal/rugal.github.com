---
layout: post
title: "convert integer into character in C"
description: ""
category: development
tags: [c]
---
{% include JB/setup %}

Sometimes it is useful to convert int variables int char type.  
standard lib has already provided some functions to deal with that.
{%highlight c%}
# include<stdlib.h>
itoa(origin_int , target_buffer , hex);
sprintf(target_buffer , format , origin_number);
{%endhighlight%}
