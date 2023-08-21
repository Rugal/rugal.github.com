---
layout: post
title: "keep configuration file untracked in git"
description: ""
category: operation
tags: [git]
date: 2014-06-10
---
It recently came to bother me when I trying to keep configuration file such as `log4j` and `jdbc` in project while avoiding versioning by git automatically.  
For synchronization aspect, different coder and application need basic file content to tackle with; Whilst various coder and production environment will definitely have disparate configuration.  
So I need git to control those configuration file while cloning with default configuration, but to keep them untracked if individual coder changed the content in it.  

Try this after commit your last version:
```shell
git update-index --assume-unchanged path/to/those/file
```

Command below set `assume unchanged` bit on, which enable what we want in the future.   
Now you will not have change stage information for those files. What a great!  

But be careful if you want to deliberately `git add path/to/those/file` as git policy unable to track them. One need to reset `assume unchanged` bit by   
```shell
git update-index --no-assume-unchanged path/to/those/file
```
So as to enable file system tracking.
