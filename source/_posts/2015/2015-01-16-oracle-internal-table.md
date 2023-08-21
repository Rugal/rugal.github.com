---
layout: post
title: "oracle internal table"
description: ""
category: operation
tags: [oracle]
date: 2015-01-16
---
## internal RDBMS table
>X$ : encrypted, sysdba only, fundation of internal mechanism.  
example: `X$KVIT`  

## Data dictionary(table)
>%$ : for storing database structure and definition, created by `sql.bsp` and `$ORACLE_HOME/rdbms/admin`  
example: `OBJ$`

## static data dictionary(view)
>more stable than DD, based on `X$%` and `%$`.  
>A user have different levels of SDD.  

type||desc||example
--|-|--|-|--
user_%|| objects that belong to user own ||user_tables
all_% || objects that not belong to user but could access to || all_tables
dba_% || all table, only for sysdba role || dba_users 

## dynamic performance view(view)
Including and reflect performance of system, dynamic, based on `X$%`  

type||desc||example
--|-|--|-|--
GV$%||including all instances||GV$METRIC
V$%||local instance only||V$METRIC

----

order of accessing

1. analyse object name
2. the table and view of user own
3. private synonym
4. public synonym
5. throw `ORA-00942`(cannot find object)
