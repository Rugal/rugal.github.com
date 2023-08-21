---
layout: post
title: "oracle lock mode"
description: ""
category: operation
tags: [oracle]
date: 2015-01-16
---

By `v$lock`, we could have a look at lock in every session. Lock have a lot of mode:  

mode|name||desc
--|--||--
0|none|
1|null|
2|Row-S||row sharing lock: share row
3|Row-X||row exclusive lock: for modify row
4|Share||share lock: block other DML
5|S/Row-X ||shared row exclusive lock: block other transaction
6|exclusive||exclusive lock: independently access and use


------

lock type:

* TM lock for parallel accessing table
* TX transaction lock or row lock for parallel accessing row
* MR media recover lock means database online
* ST space transaction lock means due to bad file structure, some segments in database in increase or shrink `SMON` or merging free space nearby.
