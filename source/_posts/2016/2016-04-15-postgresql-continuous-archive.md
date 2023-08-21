---
layout: post
title: "PostgreSQL Continuous Archive"
description: ""
category: operation
tags: [postgresql]
date: 2016-04-15
---


## Basic setting
```shell
PGDATA=/var/lib/postgresql/9.3/main  
PGCONF=/etc/postgresql/9.3/main      
ARCHIVE_PATH=/opt/archive
```


## Enable archive mode

Set `wal_level` to at least `archive`, please refer to [Official Document](http://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-WAL-LEVEL) for details.   
Set `archive_mode` to at least `on`, please refer to [Official Document](http://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-ARCHIVE-MODE) for details.  

```shell
echo "wal_level = archive" >> $PGCONF/postgresql.conf
echo "archive_mode = on" >> $PGCONF/postgresql.conf
#You should set this command on your need
echo "archive_command = 'test ! -f $ARCHIVE_PATH/%f && cp %p $ARCHIVE_PATH/%f'" >> $PGCONF/postgresql.conf
```

## Create archive folder 

Now let us create the archive folder for postgres user in operating system.  
```shell
sudo mkdir -p $ARCHIVE_PATH
sudo chown postgres\: $ARCHIVE_PATH
```

## Launch database server
After launching database server, you could notice there is a new process very self-explanatory

	postgres: archiver process


## Test archive

### Add some data

For xlog purpose, we need to add some data like creating a new table, or DML.  
```sql
create table test();
```

### Force xlog switch

Now this function take effect.  
```sql
select pg_switch_xlog();
```

### Archive result

From `archive_status` folder inside `$PGDATA` we could found the updated status of archiving. 

	> ls $PGDATA/archive_status
	00000001000000000000004A.done

From `$ARCHIVE_PATH` side of view, we could see that specific xlog has been archived to our archive folder.  

	> ls $ARCHIVE_PATH
	00000001000000000000004A

## Notice
Because WAL is significantly useful for recovery, it is better to back them up by archive. But sometimes it is still not enough, we could use `rsync` to send those WAL to some other place so that they will be preserved for longer term.  I am not going to the details of it. 

## Conclusion

This tutorial is to tell you how to setup archive functionality for PostgreSQL with minimum configuration.  
Backuping or Archiving xlog is to enable High Availability for our system.   
With continuous archiving, we enabled [Point-in-Time Recovery (PITR)](http://www.postgresql.org/docs/current/static/continuous-archiving.html), my tutorial is at [PITR]({% post_url 2015-07-18-postgresql-recovery %}).
