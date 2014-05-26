---
layout: post
title: "reset mysql root password"
description: ""
category: operation
tags: [mysql]
---
{% include JB/setup %}

1.Add a entry in `my.cnf`:  
`mysqld_safe --skip-grant-table&`  
2.then restart mysql server, now you can login as root.  
3.execute as below, and do not forget to delete the entry you have added in
step 1 after this command:
{%highlight mysql linenos=table%}
use mysql;
update user set password=password("123456") where user='root';
flush privileges;
{%endhighlight%}
