---
layout: post
title: "@Transient and transient in java"
description: ""
category: development
tags: [java]
date: 2015-08-17
---
When I was doing some coding with GSon, I found there are you kinds of `transient`. One is from Java key words, another is JPA annotation as explained in [SF](http://stackoverflow.com/questions/2154622/why-does-jpa-have-a-transient-annotation).  

## Java key word

`transient `is to prevent member field from being serialized, so that those fields will not appear in JSON format if you use `Gson` to serialize them.  
This feature is very important if you have nested class member or collection field members.  

## JPA Annotation
This annotation is in JPA specification to indicate that there is no need to persist this field to database.
