---
layout: post
title: "convenient usage while using ssh config"
description: ""
category: operation
tags: [ssh]
---
{% include JB/setup %}
It is boring to prompt always `ssh -p port user@host` while facing frequently `SSH` request, in this kind of situation, `ssh config` file could be a better assistance.  
{%highlight bash%}
host      master    #host for short indication, this name is used in prompt
hostname  192.168.1.100   #hostname for real connection, it can be ip address or domain name
user      rugal     #user name for logging
port      3306      #port in logging
identityfile  ~/.ssh/identity   #private key file in logging procedure
{%endhighlight%}
after this configuration, you can just ssh request as  `ssh master`  
To connect like `ssh -p3306 -i ~/.ssh/identity  rugal@192.168.1.100`  
Don't you think that is a better way?
