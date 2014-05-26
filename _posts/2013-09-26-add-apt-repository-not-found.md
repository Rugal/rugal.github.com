---
layout: post
title: "add apt repository not found"
description: ""
category: operation
tags: [apt-get]
---
{% include JB/setup %}
Well I have to admit that it really spent me too much time on configuring the
Bumblebee which is said can better manage double video cards situation
[Bumblebee](http://www.cnblogs.com/congbo/archive/2012/09/12/2682105.html).  
But I can not make a good use of this software because I can not find the
command named 'add-apt-repository'  
This time I got to know that this command is accompanied by python software
properties, and finally I have these answer from
[stackoverflow](http://stackoverflow.com/questions/13018626/add-apt-repository-not-found)
 
It introduced two ways of installing this tool. Of which version below
12.10(exclusively),  
`sudo apt-get install python-software-properties`  
But as for those version above 12.10(inclusively),  
`sudo apt-get install software-properties-common`  
And now I am going to configuration procedure of double video cards!
