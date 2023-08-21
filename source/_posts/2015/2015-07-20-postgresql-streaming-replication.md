---
layout: post
title: "postgresql streaming replication"
description: ""
category: operation
tags: [postgresql]
date: 2015-07-20
---


## Base information for both primary and standby
```shell
PGDATA=/var/lib/postgresql/9.3/main
PGCONF=/etc/postgresql/9.3/main    
master=192.168.1.100:5432
standby=192.168.1.101:5432
```

## Primary Server

### Create user dedicate for replication
```shell
--you can specify any user name and password
--the 'replication' privilege is important
create user r replication password '1';
```

### Grant connection accessibility
After creation of user, you need to modify the `$PGCONF/pg_hba.conf` file to explicitly grant connection accessibility for the user `r`

```shell
#You can choose any of the authentication method you like
echo "host    replication    r    $standby_ip/32    md5" >> $PGCONF/pg_hba.conf
```

### WAL setting
According to [Official Document](http://www.postgresql.org/docs/current/static/runtime-config-wal.html), we need to set `wal_level` to `hot_standby` so that PostgreSQL will generate WAL that contains enough information for standby to reconstruct the status of running transactions from the WAL.  
We also need to set `max_wal_senders` to a positive number to accept connection from replicators. This is the number of sender process to send streaming data, so it is better to put a bigger number like 5 or 10.  
```shell
echo "wal_level = hot_standby" >> $PGCONF/postgresql.conf  
echo "max_wal_senders = 3" >> $PGCONF/postgresql.conf  
```

### Restart primary server
To enable streaming function, we need to restart Postgresql server, this will also reload the `pg_hba.conf` so that remote replicator could connect to this server.  
```shell
sudo service postgresql restart
```
Now your primary server is ready to accept streaming replication connection.

### Extra notice
For beginner who does not know about connecting to remote server, please refer to this [article]({%post_url 2014-12-12-postgresql-allows-any-connection %}).

---------------

## Standby Server

### Restore base data files
To achieve this, it is better to use `pg_basebackup` as it is more convenient than scp them manually.
```shell
pg_basebackup -U r -h $master_ip --format=plain -vxP  -D  $PGDATA
```
After a while, you will find the primary server data folder is replicated to standby server.

### Recovery configuration
The most important configuration comes, you need to create a `recovery.conf` file in you `$PGDATA` folder.


```shell
#Notice the single quote around (on)
#This will instruct this server to do standby work
echo "standby_mode = 'on'">>$PGDATA/recovery.conf
#The libpg connection string specified here allows standby connecting to primary
#Hence those information should be consistent with primary
echo "primary_conninfo = 'host=$master_ip port=5432 user=r password=1'">>$PGDATA/recovery.conf
```

Up to now, the standby server could start replication if you restart it. But this standby server is not connectable, which means no connection allowed to this standby server, thus if you try to connect to it, you will get:  

	psql: FATAL:  the database system is starting up
	FATAL:  the database system is starting up

But be easy, even it is not connectable from you, it could replicate content from primary and also dispatch them to slavers depending on your configuration.  

### Hot standby server
So to allow connections to standby server rather than leave it unconnectable, you need to modify or add one configuration in standby server, refer to [Official Document](http://www.postgresql.org/docs/current/static/hot-standby.html): 

```shell
echo "hot_standby = on" >> $PGCONF/postgresql.conf
```
You can find this entry under `standby` section. This attribute means to allow connection and run read-only queries while the server is in archive recovery or standby mode. In our case, in standby mode but accepts read only connection.  
Such configuration could also be used as failover setting, which I will introduce later on.  

-------------------

## Test

Now try to create some tables or do some DML on Primary server and see if they will be synchronized to Standby server.


## Conclusion

Those configuration above are the minimum for launch a streaming replication between primary and standby.   
For more high availability information, please refer to [failover](http://www.postgresql.org/docs/current/static/warm-standby-failover.html), [WAL archive](http://www.postgresql.org/docs/current/static/continuous-archiving.html), [HA]({%post_url 2015-08-02-postgresql-high-availability-solutions-summary %}).   
I will keep posting tutorial. 
