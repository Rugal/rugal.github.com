---
layout: post
title: "convert GBK to UTF8 for SQL in Linux"
description: ""
category: operation
tags: [charset,bash]
---
{% include JB/setup %}

1. Dump sql file from windows server.  
2. Create database as utf-8 charset or configure global charset in mysql.  
3. Create a bash as following, be noticing to make change on $DB to ensure the right configuration.
{%highlight bash%}
DB='name'  
sed 's/gbk/utf8/g' db_gbk.sql | iconv -f gb18030 -t utf-8 > $DB.sql  
mysql -uroot --default-character-set=utf8 $DB < $DB.sql
{%endhighlight%}  
