---
layout: post
title: "apt advanced usage"
description: ""
category: operation
tags: [apt-get]
---
{% include JB/setup %}

`apt-cache showpkg name` show package information  
`apt-cache dumpavail` show available list  
`apt-cache pkgnames` list each package in this system  
`dpkg -S file` to find packages that contain this file  
`dpkg -L package` to list files in this package  
`apt-file search file`  find file from package installed as well as not installed that contain it.  
