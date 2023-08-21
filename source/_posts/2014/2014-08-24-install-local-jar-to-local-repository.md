---
layout: post
title: "install local jar to local repository"
description: ""
category: development
tags: [maven, java]
date: 2014-08-24
---

Well it sometimes useful to install jar files that create or download directly to local maven repository.  

```shell
mvn install:install-file \
        -Dfile=<path-to-file> \
        -DgroupId=<group-id> \
        -DartifactId=<artifact-id> \
        -Dversion=<version> \
        -Dpackaging=<packaging> \
        -DgeneratePom=true
```
