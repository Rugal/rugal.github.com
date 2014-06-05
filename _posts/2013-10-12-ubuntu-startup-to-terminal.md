---
layout: post
title: "ubuntu startup to terminal"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
In ubuntu,the way the the startup to terminal is different from fedora/redhat  

1. open grub configuration file `vim /etc/default/grub`
2. change the line into `GRUB_CMDLINE_LINUX_DEFAULT="quite splash text"`
3. update grub binary by `update-grub` in shell
