---
layout: post
title: "mysql java connector"
description: ""
category: development
tags: [java,mysql]
---
{% include JB/setup %}

{%highlight xml%}
<property name="url" value="jdbc:mysql://localhost:3306/DBName"/>
<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
<prop key="hibernate.dialect">org.hibernate.dialect.MySQLDialect</prop>
{%endhighlight%}
