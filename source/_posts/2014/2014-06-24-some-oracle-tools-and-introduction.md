---
layout: post
title: "some oracle tools and introduction"
description: ""
category: operation
tags: [oracle]
date: 2014-06-24
---

## ASH
active session history  
recording trace and performance for each SQL in different grade:  
instance/database/session/service/...  

### recording single SQL

## AWR
automatic workload repository  
monitoring database's performance includes I/O, CPU, latch, lock, log file, buffer usage log, redo log size, (soft/hard)parse  

### snapshot the whole database performance  

## ADDM
automatic database diagnostic monitor  
ADDM is a self diagnostic engine designed from the experience of Oracle’s best tuning experts  
Analyzes AWR data automatically after an AWR snapshot  

### automatically generate diagnostic report after analyse AWR  


------

## v$fixed_table
This view displays all dynamic performance tables, views, and derived tables in the database.   
Some `V$tables` (for example, `V$ROLLNAME`) refer to real tables and are therefore not listed.  


## DICTIONARY
`DICTIONARY` contains descriptions of data dictionary tables and views.  
