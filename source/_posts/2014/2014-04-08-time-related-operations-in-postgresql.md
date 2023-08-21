---
layout: post
title: "time related operations in postgresql"
description: ""
category: operation
tags: [postgresql]
date: 2014-04-08
---

I am keen on using UNIX epoch to represent date and time data.  
Without too much dependency on disparate database, it's also very good at date representation in Java.

```sql
--convert from timestamp to epoch seconds
SELECT EXTRACT(EPOCH FROM TIMESTAMP '2011-05-17 10:40:28');

--convert from epoch seconds to timestamp
select to_timestamp(1284352323);

--Convert a given Timestamp into another time zone, before using new date format.
select to_char(timezone('UTC', to_timestamp(1372204800)), 'DD-Mon-YY');
```
