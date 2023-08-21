---
layout: post
title: "Tomcat hang at start"
description: ""
category: operation
tags: [java, tomcat]
date: 2015-09-09
---

I have spent about 2 days on this issue.  
That is, when I trying to start up tomcat instance in Ubuntu, log tells me start up `done`, and I can see the tomcat process is running, I could also see the port `8080` is announced, but I am unable to connect to the host.  

I find the tomcat log ends at  

    Deploying web application [...]
    
Seems like it is busy deploying the web application, but turned out it has done nothing.  
After search for a while, I find an answer on [SOF](http://serverfault.com/a/655638/240955).  

Actually, it is the random number generating thread that blocking the deployment.  
The solution is to add or append an `JAVA_OPT=-Djava.security.egd=file:/dev/./urandom` in `/etc/default/tomcat7`.
