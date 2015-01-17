---
layout: post
title: "execute and import python in python shell"
description: ""
category: development
tags: [python]
---
{% include JB/setup %}

##import
{%highlight python%}
>>>import moduleName
{%endhighlight%}

##from
{%highlight python%}
>>>from moduleName import function/*
{%endhighlight%}

##build in command
{%highlight python%}
>>>exec(open('filename.py').read())
>>>execfile('filename.py')
{%endhighlight%}
