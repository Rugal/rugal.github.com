---
layout: post
title: "cope with apt key NO_PUBLICKEY"
description: ""
category: operation
tags: [apt-get]
---
{% include JB/setup %}
It is common occur this problem when using a private ppa source, just do like
this:  
`sudo apt-key adv --recv-key --keyserver keyserver.ubuntu.com $THE_KEY`  
this will automatically search download and import private key into your
system, thus make it accessible to use another private repository.
