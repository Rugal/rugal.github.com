---
layout: post
title: "Postgresql allows any connection"
description: ""
category: operation
tags: [postgresql]
date: 2014-12-12
---
For development usage, I would rather allow any connection to postgresql:  

First you need to add one line in `pg_hba.conf`

    host    all             all             0.0.0.0/0            md5


Which means allow any connection from any IP using password.

Next is to make sure the `listen_addresses` in `postgresql.conf` listening to any incoming connections as well:

    listen_addresses = '*'


After the changes you have to reload the configuration (as a superuser):
    
    SELECT pg_reload_conf();
    
Or you could restart postgres server .
