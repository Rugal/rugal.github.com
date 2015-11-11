---
layout: post
title: "Oracle glossary"
description: ""
category: operation
tags: [oracle]
---
{% include JB/setup %}

[serverfault](http://serverfault.com/a/51304/240955)

##Database Name
The identifier or name for a specific database. For example, `db`.

##Database Domain
Usually use as your domain name. Like, `rugal.ga`.

##Global Database Name
combine Database name with domain name. In our example, it is `db.rugal.ga`.

##SID
Means `System Identidier`, the most cricial name or identifier to an `Instance`. It is possible to have multiple instances for a database.  
Say if you have 2 instance to connect to a database, usually SID will be `database name + instance number`, that is `db1` and `db2`.  

##Instance Name
It is the same with `SID`.

##Service Name
A "connector" to one or more instances.   
It is often useful to create additional service names in a RAC environment since the service can be modified to use particular SIDs as primary or secondary connections, or to not use certain SIDs at all.


##Service Alias
An alias to the service name (just like a CNAME, etc).   
Say you make your service name something meaningful to the dba, but perhaps it's a bit esoteric.   
Create a service alias and name it something that will be meaningful to the user.
