---
layout: post
title: "Recovery procedure of Postgresql"
description: ""
category: operation
tags: [postgresql]
date: 2015-08-02
---

Any operation is from the view of `standby` server.    


## 1 
Execute `restore_command` to restore xlog to `pg_xlog` folder from archive folder.     
If either streaming replication disabled, disconnected or recovery failed, go to `4`.     

## 2 
If `xlog` found,try to restore any available WAL in `pg_xlog` folder since current last valid record until last available data consistent point int WAL.    
Otherwise go to `3`.    

## 3
If streaming enabled, Standby will try to connect to primary and start streaming WAL and recovery since last valid record found in  `pg_xlog` folder.     
Otherwise go to `1`  

## 4 
If the above procedure repeated for several times or `trigger` file is created, recovery cancelled.    
