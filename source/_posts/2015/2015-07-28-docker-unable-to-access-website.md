---
layout: post
title: "docker unable to access website"
description: ""
category: operation
tags: [linux, network, docker]
date: 2015-07-28
---

After came to my girlfriend's home, I find my docker unable to access website.  
I could not ping by domain name, I thought it is the problem of my gf's router.  
Any ping could only return `unknown host XXXXXX`, this seems not the problem of network connection but something else.  

Today I find the problem is in domain name resolution.  A similar [issue](https://github.com/docker/docker/issues/541) on github.  
Accroding to this page, I modified `/etc/resolv.conf` as my host machine's, then DNS problem solved.  

The reason of this problem is that, I created this docker container in my home, which has different DNS from my gf home's.  But docker container unable to detect the change after I came here.  

Thanks to [lz](http://ilz.me), his idea of examing DNS reminds me.  
