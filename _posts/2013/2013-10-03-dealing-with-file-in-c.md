---
layout: post
title: "dealing with file in C"
description: ""
category: development
tags: [c]
---
{% include JB/setup %}

{%highlight c linenos=table%}
# include<stdio.h>
int main()
{
    FILE * f=fopen("filename",open_mode:);   
    //open_mode:(r|w|a)
    if(f==NULL){exit(1);}
    fscanf(f,read_format,variables...); 
    //just like format in scanf()
    fclose(f);
}
{%endhighlight%}
