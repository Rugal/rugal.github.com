---
layout: post
title: "install extensions in postgresql"
description: ""
category: operation
tags: [postgresql]
date: 2014-02-26
---
## way to get extensions in ubuntu
`sudo apt-get install postgresql-contrib`  

1. libossp-uuid16:amd64 (1.6.2-1.3, automatic)
2. postgresql-contrib-9.1:amd64 (9.1.12-0ubuntu0.13.10, automatic)
3. postgresql-contrib:amd64 (9.3+146really9.1+148)

Action above will download all control file into Postgresql software folder.  
Like `/usr/share/postgresql/9.1/extension`  

available extensions list:  

    adminpack               autoinc
    btree_gin               btree_gist
    chkpass                 citext
    cube                    dblink
    dict_int                dict_xsyn
    earthdistance           fuzzystrmatch
    hstore                  insert_username
    int_aggregate           isn
    lo                      ltree
    moddatetime             pageinspect
    pg_buffercache          pgcrypto
    pg_freespacemap         pgrowlocks
    pg_stat_statements      pgstattuple
    pg_trgm                 pgxml
    refint                  seg
    sslinfo                 tablefunc
    test_parser             timetravel
    tsearch2                uuid-ossp


## 1. Version before 9.1  
You need to manually install them by `psql` command:  
`psql -U user_name -d database_name -f module_name.sql`  

For example, if your administrative user was named `postgres` and your database was also named `postgres` and the module you wanted was tablefunc, you would type:  
`psql -U postgres -d postgres -f tablefunc.sql`  

or use `\i` command in psql:  
`\i /usr/share/postgresql/9.1/extension/tablefunc--1.0.sql`  


## 2. Version after 9.1 included  
After 9.1(included) version, postgresql provide new command to install extensions.  
`CREATE EXTENSION "tablefunc";`  
That is much easier!  
