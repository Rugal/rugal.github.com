---
layout: post
title: "mysql date convertion and column renaming"
description: ""
category: operation
tags: [mysql]
---
{% include JB/setup %}

{%highlight sql%}
select curtime(); select current_time();  --current time; hour:min:sec
select current_timestamp();  --show current time stamp:year month date hour:min:sec
select unix_timestamp();   --convert time stamp into unix time: internal of milies second from 1970 year
select from_unixtime();    --convert unix time into time stamp


alter table name change @original  @new type; -- change column name
{%endhighlight%}
