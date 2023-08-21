---
layout: post
title: "JVM internal and classloader"
description: ""
category: development
tags: [jvm]
date: 2014-06-24
---


## classloader category
1. `BootStrap Class Loader`: Is responsible for loading all java class in `rt.jar` file, which means all Java core classes is loaded by this `classloader`. implemented by `C++` in `Sun JDK`. No any reflection could get their reference.
2. `Extension Class Loader`: Loading some functional extensible jar.
3. `System Class Loader`: Responsible for loading class that specified in bootstrap parameter `classpath`. In general, all classes written by ourselves are loaded by this classloader.
4. `User Defined Class Loader`: Developer could define load strategy and manually control load procedure.



-------

## ClassLoader working principle
Class loading procedure divided into three phases:  

### 1. Load  
Loading class through Class's `canonical name`: load specific `.class` file into `JVM`. After load completion, identify the classloader as `CanonicalName+ClassLoader`.  
Classloader instance and Class instance live in heap, their class properties and information located in method area.  
Loading procedure adapt `Parent delegation model`, when classloader plan to load class, it will request its parent classloader, while its parent classloader will move on to forward loading request to upper classloader until `bootstrap classloader`. Classload would load lass only if its parent unable load specific class.  
`Parent delegation model` is the first security guard line, it ensured safely class loading. Actually it rely on classloader separation principle: different classloader could not interactive directly while loading classes, even loading identical class, different classloader could not sense the other one. Thus inimical class that disguised as core jar, such like `java.lang`, have no impact to JVM as they could not loaded by `bootstrap classloader`  
Beware, developer must ensure loading security if they define their own classloader.

### 2. Linkage

Linkage is to merge binary class information into JVM runtime state.   
Linkage task separate into three steps:   

1. verification: ensure validity of .class file, ensure this file obey specification and also suitable for current JVM.
2. preparation: allocation memory for class, meanwhile initialize static variable with default value.
3. Resolve(optional): resolve class token constant pool into direct reference, but actually it could postponed while referring it in usage.

### 3. Initialization

Initialize static variable in class, and execute static code and constructor defined in class.   
`JVM` specification strictly defined when to do initialization.:   

1. Instantiate object while: key word `new`, reflection, clone, deserialization.
2. Invoking class static method.
3. Do assignment to static field of class.
4. Invoking method through reflection.
5. Initialize its sub-class.(But its base class must guarantee initialized)
6. Tagged as bootstrap class while JVM startup.(Simply treated as `public static void main(String[]args)` method)
