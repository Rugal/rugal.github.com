---
layout: post
title: "HDFS Permission denied"
description: ""
category: operation
tags: [hadoop]
---
{% include JB/setup %}

While developing hadoop or using HDFS, I want to access HDFS without permission problem for convenience.  
So we could add one property in `conf/hdfs-site.xml` file.  

{%highlight xml%}
<property>
    <name>dfs.permissions</name>
    <value>false</value>
</property>
{%endhighlight%}

So that any access will not be block, but you need to disable this feature in product enviornment!
