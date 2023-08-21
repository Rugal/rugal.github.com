---
layout: post
title: "easy using update alternatives"
description: ""
category: operation
tags: [linux]
date: 2014-05-11
---
While it is still very annoying in Linux to switch between different environment like JDK6 and JDK7, even though this is much easier than in Windows.  
Now `update-alternatives` gives us a solution.  

## switch between different environements
Any installed kit and environment by `apt-get` will automatically registered in `update-alternatives`, which is in the folder of `/etc/alternatives`, you could see it has so many symbolic links, different links point to that `bin` command in real.  
The strategy above ensured the flexibility to switch between different software and environment, you just need to use  

    sudo update-alternatives --config <name>
    
or  

    sudo update-alternatives --set <name> <bin_path>

to specify and switch to a new environment.  

Notice `--config` is an interactive command hence is very user friendly, whilst `--set` have no prompt as to make it feasible to write script.  


## install or append new command

    sudo update-alternatives --install <link> <name> <path> <priority>

where `link` is the path where your `$PATH` will included in, like `/usr/bin/java`.  

`name` is the name registered in alternatives, where it shown in `/etc/alternatives/<name>`, like `java`.  

`path` is the real command path where you can use this path to execute target command, like `/usr/lib/jvm/java-8.0.5-oracle-amd64/bin/javac`  

`priority` will affect default choice of this command, you could browse others by `update-alternatives --config <name>` to have a comparison. with higher value means higher priority.  

example:  
    
    sudo update-alternatives --install /usr/bin/javac    java /usr/lib/jvm/java-8.0.5-oracle-amd64/jre/bin/java   1000
