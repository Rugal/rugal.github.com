---
layout: post
title: "Java Reference Types"
description: ""
category: development
tags: [java]
date: 2016-04-04
---

To reimburse different needs for references, Java provisioned different level of references type since `1.2`.    
It actually meets some application requirement like caches.  

### Strong
The normal reference, unable to GC until no reference exists.  

```java
Object o = new Object();
```
	
### Soft
When memory about to overflow, good for saving memory when space sensitive.  

```java
SoftReference soft = new SoftReference(bean);
```

### Weak
Will be collected at next GC cycle. Designed for objects that have short life.
```java
WeakReference soft = new WeakReference(bean);
```

### Phantom
weakest reference.  As if there is no reference.   
Phantom references are most often used for scheduling pre-mortem cleanup actions in a more flexible way than is possible with the Java finalization mechanism.  
```java
PhantomReference soft = new PhantomReference(bean);
```
