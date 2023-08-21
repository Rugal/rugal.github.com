---
layout: post
title: "Oracle login script"
description: ""
category: operation
tags: [oracle]
date: 2015-01-16
---
Add edit file `glogin.sql` in `sqlplus` folder.  
Better than nothing:


```sql
define _editor=vim
set serverout on size 100000
set trimspool on
set long 5000
set linesize 100
set pagesize 9999
column plan_plus_exp for a80
column global_name   new_value gname
set termout off
define gname=idle
column global_name new_value gname
select  lower(user)||'@'||substr(global_name,1,decode(dot,0,length(global_name),dot-1))global_name 
from(
    select  global_name, instr(global_name,'.') dot 
    from global_name);
set sqlprompt '&gname> '
set termout on
set autotrace traceonly
set timing on
```
