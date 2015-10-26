---
layout: post
title: "JPT User interface"
description: ""
category: development
tags: [jpt]
---
{% include JB/setup %}

#Introduction
`UserAction` mostly deal with normal user related jobs. Such like registration, deregistration, user profile updating and user searching.  
Although the class is Action, I plan to change it to `*Controller`.  
All interfaces of this controller are under `/user` path.  

#API 

###User Registration

{%highlight http%}
POST /user HTTP/1.1
Accept: application/json
Content-Type: application/json

{"password":"test123", "username":"tenjin","email":"testhappy@128.com"}
{%endhighlight%}

