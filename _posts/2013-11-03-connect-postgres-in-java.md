---
layout: post
title: "connect Postgres in Java"
description: ""
category: development
tags: [java,postgres]
---
{% include JB/setup %}

{%highlight xml%}
<property name="url" value="jdbc:postgresql://host:port/rugaldb"/>
<property name="driverClassName" value="org.postgresql.Driver"/>
<prop key="hibernate.dialect">org.hibernate.dialect.PostgreSQLDialect</prop>
{%endhighlight%}
