---
layout: post
title: "bash completion"
description: ""
category: operation
tags: [bash, linux]
date: 2015-01-16
---
Nowadays it is unimaginable using shell without `auto completion`, yum and apt-get tool is different from each other.  

when using yum:  

```shell
yum install bash_completion
echo "source /etc/bash_completion" >>/etc/bashrc
```

------

when using apt-get

```shell
sudo apt-get install bash_completion
vim /etc/bash.rc
```
go to the `bash_completion` line and remove the comment notation there.
