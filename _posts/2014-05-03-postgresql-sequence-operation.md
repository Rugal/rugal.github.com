---
layout: post
title: "postgresql sequence operation"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

postgresql use `serial` as sequence type.  
It conveniently generate a sequence named `$tablename_$columnname_seq` by default, which I think is so easy to use.  

1. set `last_value` for `sequence_name`  
`SELECT setval('sequence_name', 21, true);`
