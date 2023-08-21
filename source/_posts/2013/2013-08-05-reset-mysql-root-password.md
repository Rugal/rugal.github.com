---
layout: post
title: "reset mysql root password"
description: ""
category: operation
tags: [mysql]
date: 2013-08-05
---


[reference](https://devanswers.co/how-to-reset-mysql-root-password-ubuntu/)

You may forget root password of your mysql database, follow instruction below to reset it.  

+ Add a entry in `my.cnf`:  

```
[mysqld]
skip-grant-tables
```

+ then restart mysql server, now you can login as root without prompting password.
+ execute as below:  

```
use mysql;
update user set password=password("123456") where user='root';
flush privileges;
```

+ Do not forget to delete the entry you have added in step `1` after this command:
