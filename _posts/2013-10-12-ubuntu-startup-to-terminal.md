---
layout: post
title: "ubuntu startup to terminal"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
In ubuntu,the way the the startup to terminal is different from fedora/redhat  
2.`vim /etc/default/grub`  
3.change the line into `GRUB_CMDLINE_LINUX_DEFAULT="quite splash text"`  
4.update-grub
