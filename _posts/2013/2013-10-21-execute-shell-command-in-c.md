---
layout: post
title: "execute shell command in C"
description: ""
category: development
tags: [c,linux]
---
{% include JB/setup %}

{%highlight c linenos=table%}
# incluide<stdio.h>
int main()
{
    FILE* in=popen("your command","r"); //mode=r/w just like open a file
    if(NULL==in)  exit(1);
    char buffer[1024];
    while(fgets(buffer,sizeof(buffer),in)!=NULL)
        printf("%s",buffer);
    //print command output here
    return 0;
}
{%endhighlight%}
