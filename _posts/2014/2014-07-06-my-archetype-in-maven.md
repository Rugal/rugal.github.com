---
layout: post
title: "my archetype in maven"
description: ""
category: development
tags: [java,maven]
---
{% include JB/setup %}

#Components

This archetype based on:  

1. Springmvc 4
2. Spring 4
3. Hibernate 4

###Important artifacts

1. Connection pool: `HikarCP`
2. JSON mapper:   `Gson`
3. [ssh-common]({%post_url 2014-07-20-ssh-common-for-my-own-archetype-released %})

-------------------

#Usage

Create archetype from command line using maven:  
{%highlight bash%}
mvn archetype:generate  -DarchetypeGroupId=ml.rugal.archetype       \
                        -DarchetypeArtifactId=springmvc-spring-hibernate  \
                        -DarchetypeVersion=0.6          \
                        -DgroupId=your.group.id         \
                        -DartifactId=your.artifact.id   \
                        -Dversion=your.version
{%endhighlight%}

Since `0.6`, I started to use Java based configuration only.  

Please modify configuration files under `conf` package.  

1. `ServletContainerInitializer.java`: Container support java only configuration since Servlet 3.0. As long as you specify this file, container will use this class as configuration file.  
2. `ApplicationContext.java`: specify entity scanning, data source configuration and transaction.  
3. `SpringMVCApplicationContext.java`: specify web SpringMVC related configuration such like argument resolution, message converter, view resolution etc.,  
4. Some properties files such like `log4j` and `jdbc` in `resources` folder.   

-----------------

#version log

###0.6
Replace all XML file with Java based configuration.   
Use ssh-common 0.3 version.  Removed local full coded `ExceptionAction` and `Message` class.  

###0.5
I start to use [HikariCP](https://github.com/brettwooldridge/HikariCP) as connection pool. Replace Jackson with Gson.  

###0.3
I extract basic Hibernate util classes into [ssh-common](https://github.com/Rugal/ssh-common).  

###0.2 
I start to use Java based configuration for application context and web context. But `web.xml` is not included.   


#commit log

###2015/07/30 19:02
Use ssh-common 0.3 to replace local coded Message and ExceptionAction.  

###2015-07-29 1:27
Clean readme up. Move most of content to my [website](http://rugal.ga)

###2015-07-24 15:14
Remove all xml configuration file. Use annotation based configuration only.  
Remove embeded tomcat plugin.  
Use new embeded Jetty plugin to replace the old one.  
Clean Pom file a little bit.  

###2015-02-17
Deprecate Jackson data binding, use Gson instead.  
