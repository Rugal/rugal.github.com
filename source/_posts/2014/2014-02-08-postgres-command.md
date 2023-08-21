---
layout: post
title: "postgres command"
description: ""
category: operation
tags: [postgresql]
date: 2014-02-08
---
Postgres is a super excellent RDBMS and object database which integreted with various number of functionalities exceed current average level of other database productions.  
Rugal also become a member of developer in pg-hacker. Here I want to introduce some basic usage in Postgres command line prompt:  

```shell
S = show system objects
+ = additional detail
\d[S+]                  list tables, views, and sequences
\d[S+]  NAME            describe table, view, sequence, or index
\db[+]  [PATTERN]       list tablespaces
\ddp    [PATTERN]       list default privileges
\dD[S]  [PATTERN]       list domains
\dg[+]  [PATTERN]       list roles
\di[S+] [PATTERN]       list indexes
\dn[S+] [PATTERN]       list schemas
\do[S]  [PATTERN]       list operators
\dp     [PATTERN]       list table, view, and sequence access privileges
\ds[S+] [PATTERN]       list sequences
\dt[S+] [PATTERN]       list tables
\du[+]  [PATTERN]       list roles
\dv[S+] [PATTERN]       list views
\l[+]                   list all databases
\sf[+] FUNCNAME         show a function's definition
\z      [PATTERN]       same as \dp
```

When thinking about postgres's data organization, I made a conclusion below:  

    datafile -> tablespace -> database ->schema -> table

But I did not get detailed knowledge like `segment/extent` in Oracle.  
I think Postgres is awesome, high performance and well organized.  Good resource to study and backended as DBMS.
