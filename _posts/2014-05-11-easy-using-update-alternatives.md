---
layout: post
title: "easy using update alternatives"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
While it is still very annoying in Linux to switch between different environment like JDK6 and JDK7, even though this is much easier than in Windows.  
Now `update-alternatives` gives us a solution.  

Any installed kit and environment by `apt-get` will automatically registered in `update-alternatives`, which is in the folder of `/etc/alternatives`, you could see it has so many symbolic links, different links point to that `bin` command in real.  
The strategy above ensured the flexibility to switch between different software and environment, you just need to use  
`sudo update-alternatives --config <name>`   or  
`sudo update-alternatives --set <name> <bin_path>`   
to specify and switch to a new environment.  

Notice `--config` is an interactive command hence is very user friendly, whilst `--set` have no prompt as to make it feasible to write script.
