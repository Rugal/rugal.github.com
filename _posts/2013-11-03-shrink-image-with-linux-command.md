---
layout: post
title: "shrink image with linux command"
description: ""
category: operation
tags: [bash]
---
{% include JB/setup %}
install imagemagick with command: `sudo apt-get install imagemagick`  

After that execute command below
{%highlight bash%}
$  convert $FILE  \
    -resize  500x500  \
    -pointsize 16   \
    -fill white  -stroke black  -strokewidth 5  -annotate  +20+25 'Rugal Bernstein'  \
    to $OUTPUTFILE
{%endhighlight%}
This command will resize the picture and make a annotation on it named `Rugal Bernstein`
