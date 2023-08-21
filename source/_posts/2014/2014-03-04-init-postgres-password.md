---
layout: post
title: "init postgres password"
description: ""
category: operation
tags: [postgresql]
date: 2014-03-04
---
I just reinstalled my Laptop and it now become `Ubuntu 12.04 LTS`, I love this.  
After whole day of installing, finally I got my postgresql installed, it is a good time to record how to initialize password for new installed postgresql.  

```shell
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```
This will set your postgres USER's password into `postgres`.  

Then just use `psql -U postgres -h 127.0.0.1` to logon.  

But if you encountered  
`sql: FATAL:  password authentication failed for user "postgres"`  

then check the file /etc/postgresql/{VERSION}/main/pg_hba.conf:  
There must be a line like this as the first non-comment line:  
`local   all         postgres              ident`  
After this, remember to restart your `postgresql`.  

For newer versions of PostgreSQL `ident` actually might be `peer`. That's OK also.
