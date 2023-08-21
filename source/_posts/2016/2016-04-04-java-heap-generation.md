---
layout: post
title: "Java Heap Generation"
description: ""
category: development
tags: [jvm]
date: 2016-04-04
---

Credit to [this](https://plumbr.eu/blog/garbage-collection/minor-gc-vs-major-gc-vs-full-gc) article.  

## Young Generation

### Eden 
All objects will be created in this area.  
This area actually divided into some `Thread Local Allocation Buffer(TLAB)` for non-synchronizing buffer allocation.  
If one obejct is unable to allocate in a TLAB due to insufficient space, JVM will try to create it in a `common area` located also in Eden.  
If it still unable to created in `common area`, a minor GC will be triggered to cleanup some space for it. If this object is too big to fit in Eden that even after minor GC, JVM will create it in `Tenure`.   

### survivor
There will have 2 area namely `from` and `to`.   
After a minor GC, all living objects will be moved to one of the two survivor area.   
One of these two areas is always empty to allow `mark-copy` algorithm works efficiently.    
So the name from and to will sometimes switchable internally.  

## Old Generation/Tenure
If objects exist more than a threshold, they will be promoted into Tenure area.

    XX:+MaxTenuringThreshold



## Permanent Generation

This is where the metadata such as classes would go.   
Also, some additional things like internalized strings were kept in Permgen.
