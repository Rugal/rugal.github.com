---
layout: post
title: "miracle tool: javap"
description: ""
category: development
tags: [java]
date: 2014-01-11
---
It has been disturbing  me for a very long time that how Java byte-code are executed and the organization of heap/stack in JVM:  
Now I have a tutorial over steps towards [JVM Internals](http://blog.jamesdbloom.com/JVMInternals.html)   
Today I will introduce the code dissamble tool: `javap`, which could be great helpfull when dive into JVM  
```shell
javap  [options]  [classes]
options:
-v          #to print additional information
-l          #print line number and local variable tables
-c          #dissamble method code as opcode
-s          #print internal type signatures
-private -p #print all level of fields and methods
-package    #print package/protected/public classes and methods
-protected  #print protected/public classes and members
-public     #print public classes and members only
-sysinfo    #print system information
-constants  #print static final constants
```

In default, `-public` will be set.  
So, if you want to print all information of a `.class` file, you need to execute:  
`javap -v -s -p name.class`
