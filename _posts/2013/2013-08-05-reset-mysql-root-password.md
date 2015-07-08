---
layout: post
title: "reset mysql root password"
description: ""
category: operation
tags: [mysql]
---
{% include JB/setup %}
You may forget root password of your mysql database, follow instruction below to reset it.  

+ Add a entry in `my.cnf`:  
{%highlight mysql%}
mysqld_safe --skip-grant-table&
{%endhighlight%}
+ then restart mysql server, now you can login as root without prompting password.
+ execute as below:  
{%highlight mysql%}
use mysql;
update user set password=password("123456") where user='root';
flush privileges;
{%endhighlight%}
+ Do not forget to delete the entry you have added in step `1` after this command:
