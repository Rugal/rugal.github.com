---
layout: post
title: "java scanner chinese character"
description: ""
category: development
tags: [java]
date: 2014-12-05
---

I just find it is difficult to scan Chinese character in Java.  
For reading `UTF-8` chinese character by `Scanner`, you need to identify the char-set.  

```java
Scanner sc = new Scanner(file, "utf-8");
```

Or `sc,hasNext()` will end inaccidently.
