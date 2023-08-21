---
layout: post
title: "ubuntu setup default language"
description: ""
category: operation
tags: [linux]
date: 2015-01-16
---

Edit `/etc/default/locale`  file:  

    LANG=”en_US.UTF-8″
    LANGUAGE=”en_US:en”

Then generate locale:  

    $ locale-gen -en_US:en

You need log out to make this language activated.  
