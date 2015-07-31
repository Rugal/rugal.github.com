---
layout: post
title: "archetype for springmvc spring mongoDB"
description: ""
category: development
tags: [java, maven]
---
{% include JB/setup %}
SpringMVC Spring MongoDB
==============

{%highlight bash%}
mvn archetype:generate  -DarchetypeGroupId=ml.rugal.archetype       \
                        -DarchetypeArtifactId=springmvc-spring-mongodb  \
                        -DarchetypeVersion=0.1          \
                        -DgroupId=your.group.id         \
                        -DartifactId=your.artifact.id   \
                        -Dversion=your.version
{%endhighlight%}


An excellent skeleton code for JavaEE application based on:  

1. Springmvc
2. Spring
3. Spring-data-mongo
4. MongoDB
5. Spring-test


Please modify configuration files under `config` package.  

1. `ServletContainerInitializer.java`: Container support java only configuration since Servlet 3.0. As long as you specify this file, container will use this class as configuration file.
2. `ApplicationContext.java`: specify entity scanning, data source configuration and transaction.
3. `SpringMVCApplicationContext.java`: specify web SpringMVC related configuration such like argument resolution, message converter, view resolution etc.,
4. Some properties files such like `log4j` in `resources` folder.


------------------
This is my second archetype in maven.  
A good archetype, please refer to [github](https://github.com/Rugal/springmvc-spring-mongodb) for real code.  
After releasing my first [archetype]({%post_url 2014/2014-07-06-my-archetype-in-maven %}), I decided to use Java based configuration only, even in my future release.  


#version log
###0.1
Java base configuration only.  
Remove `web.xml`.  
Use `ssh-common` 0.3  
