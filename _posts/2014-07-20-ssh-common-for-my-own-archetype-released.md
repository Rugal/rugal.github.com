---
layout: post
title: "ssh common for my own archetype released"
description: ""
category: development
tags: [java,maven]
---
{% include JB/setup %}

It is a better separation to use `ssh-common` in your project integrated with my `springmvc-spring-hibernate` archetype.  
Extract the original `rugal.common` package out to make it independently deployed in central maven repository. I try the best of me to keep this artifact fresh and well documented.  


Contribution is welcomed!  
{%highlight xml%}
<groupId>ml.rugal</groupId>
<artifactId>ssh-common</artifactId>
<version>0.1</version>
{%endhighlight%}
