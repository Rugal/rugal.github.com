---
layout: post
title: "Ubuntu install wired network driver"
description: ""
category: operation
tags: [linux,network]
date: 2014-09-01
---
Since at the installation at I chose to use wireless network, seems Ubuntu did not install driver for my wired network card.  
Here I would like to introduce a simplest way to install some general wired network card driver, just by:  

    sudo apt-get install linux-firmware-nonfree

I assume this package could tackle with some other hardware problems.
