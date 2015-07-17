---
layout: post
title: "concurrent read level"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}
Assume we have 2 transactions execute concurrently.  

##dirty read
Transaction 1 reads uncommitted data from transaction 2.

##Non-repeatable reads
Transaction 1 reads different data from rows as transaction 2 updates and commits those rows before.

##Phantom reads
Transaction 1 reads different number of row because transaction 2 inserts or deletes on this table


To simulate such situation, please use different isolation levels.
