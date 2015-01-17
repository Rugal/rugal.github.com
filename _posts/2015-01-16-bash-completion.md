---
layout: post
title: "bash completion"
description: ""
category: operation
tags: [bash, linux]
---
{% include JB/setup %}

Nowadays it is unimaginable using shell without `auto completion`, yum and apt-get tool is different from each other.  

when using yum:  

{%highlight bash%}
yum install bash_completion
echo "source /etc/bash_completion" >>/etc/bashrc
{%endhighlight%}

------

when using apt-get

{%highlight bash%}
sudo apt-get install bash_completion
vim /etc/bash.rc
{%endhighlight%}
go to the `bash_completion` line and remove the comment notation there.
