---
layout: post
title: "ssh common for my own archetype released"
description: ""
category: development
tags: [java,maven]
---
{% include JB/setup %}

Hello user,  
If you see this post, you might interested in my [ssh archetype]({%post_url 2014/2014-07-06-my-archetype-in-maven%}).  
They will cooperate nicely.  

This artifact is a useful common package for integrating springmvc-spring-hibernate.   

{%highlight xml%}
<groupId>ml.rugal</groupId>
<artifactId>ssh-common</artifactId>
<version>0.1</version>

{%endhighlight%}
I extract `common` package from original `springmvc-spring-hibernate` archetype for better organize. Wish this could better decoupling.  
I extract the original `rugal.common` package out to make it independently deployed in central maven repository.  
I try the best of me to keep this artifact fresh and well documented.  
Contribution is welcomed!  


##version log

0.2: Remove Jackson related class files.  
0.1: Initial commit.  
