---
layout: post
title: "setup mysql char set in UTF8"
description: ""
category: operation
tags: [mysql,charset]
---
{% include JB/setup %}
All we have to change in my.cnf file, adding content below:  
{%highlight mysql%}
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
[mysqld]
character-set-server=utf8
init-connect='SET NAMES utf8'
{%endhighlight%}

After configuring those parameters, restart your mysql database and now:  
`show variables like '%char%';`  
will give you a satisfactory feedback!
