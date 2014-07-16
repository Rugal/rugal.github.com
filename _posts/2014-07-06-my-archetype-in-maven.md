---
layout: post
title: "my archetype in maven"
description: ""
category: development
tags: [java,maven]
---
{% include JB/setup %}

###20140716
` important release update`:  
switch XML based configuration into Java based style.  


--------

Welcome to my [archetype](https://github.com/Rugal/springmvc-spring-hibernate) that integrate `springmvc/spring/hibernate` together.  

maven repository:  

Create archetype from command line using maven:  
{%highlight bash%}
mvn archetype:generate  -DarchetypeGroupId=ml.rugal.archetype       \
                        -DarchetypeArtifactId=springmvc-spring-hibernate  \
                        -DarchetypeVersion=0.2          \
                        -DgroupId=your.group.id         \
                        -DartifactId=your.artifact.id   \
                        -Dversion=your.version
{%endhighlight%}




---------

###Specification
1. Springmvc
2. Spring
3. Hibernate
4. BoneCP

My archetype aimed to provide `Restful` web service, but it could also provide regular view resolvation.
