---
layout: post
title: "Linux Symbolic Link vs Hard Link"
description: ""
category:  operation
tags: [linux]
date: 2022-10-28
---
Behind the what we can see in shell, what actually stores the file `metadata` is what so called `inode` in each file system in Linux.  The file content is stored in `block` that is pointed and managed
Once the related `inode` is deleted, the data `block` remains the same, but since there is no pointer to these blocks, we won't be able to read them then.   
So what we call to create a file is done in 2 steps:

1. create inode(s) that contains given data
2. create a `hard` link that points to the head of inode

This way, when dealing with hard link, it actually looks up the pointed `inode` from file system.  So renaming, moving hard link has nothing to do with the file content at all. No matter when you put the hard link as or move the hard link to, it always points to the underlying `inode` via pointer.  
You can create multiple hark link to single `inode`, all of them behave the same as the original file. Moving or renaming them will not affect the data underneath it.  
When deleting hard link, Linux will check how many hard link are there left on the `inode`. It will only clean the `inode` if there is no hard link points to it anymore. That means, if you have many hard link to one file, you may avoid deleting the file content by mistake.  

`Symbolic` link or `soft` link, on the other hand, does not point to `inode` anymore, instead, it is nothing but a `path` to the original file.  
That means renaming or moving the original file does affect symbolic link as it is not able to find the original file by the same `path` anymore.  
Also, deleting the symbolic link affects nothing to the `inode` as well.  

![alt](https://i.postimg.cc/bwtPZ0wG/comparison-link-drawio.png)
