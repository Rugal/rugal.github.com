---
layout: post
title: "postgresql streamed replication"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

# definition

    $PGDATA=/var/lib/postgresql/9.3/main
    $PGCONF=/etc/postgresql/9.3/main    
    $master=192.168.1.100:5432
    $standby=192.168.1.101:5432
    $slaver=192.168.1.102:5432    

As you might guess, actually all DML operations must be executed on `master` server. In the setting of this article, `master` will send WAL log to `standby` by streaming copy, then `standby` will also send WAL log to `slaver`.  
This is because when master is synchronizing with standby server, the former server need to wait until WAL log all operation executed completely on standby. So it is so time costing, if master connect directly with a lot of slavers. Postgresql use a intermediate `standby` server, which could not write on data, but could only receive WAL from master and send them to slavers.

# configuration on master

### create user for replication
It is safer to create a sole user just for replication function as replication user unable to log into psql directly.
{%highlight sql%}
create user r login replication password '123456';
{%endhighlight%}

### permission for access
This will allow replication connection from standby server.
{%highlight bash%}
echo "host    replication    r    IP_OF_STANDBY/32    md5" >> $PGCONF/pg_hba.conf
{%endhighlight%}

### master sender config
Parameters below are the minimum requirement for stream standby function on master server.
{%highlight bash%}
echo "listen_addresses = '*'">> $PGCONF/postgresql.conf  
echo "wal_level = hot_standby" >> $PGCONF/postgresql.conf  
echo "max_wal_senders = 3" >> $PGCONF/postgresql.conf  
{%endhighlight%}

### start pg on master
{%highlight bash%}
sudo service postgresql start
{%endhighlight%}

# configuration on standby
First switch to the standby server. Here We of course need a replication user for slaver servers.  
{%highlight sql%}
create user r login replication password '123456';
{%endhighlight%}

### permission for access
This will allow replication connection from standby server.
{%highlight bash%}
echo "host    replication    r    IP_OF_SLAVER/32    md5" >> $PGCONF/pg_hba.conf
{%endhighlight%}

### standby sender config
Parameters below are the minimum requirement for stream standby function on standby server.  
On standby server, we not only need replication but also need send WAL to slavers. So here we set `wal_senders` to be 3 and also enable `hot_standby`.  
{%highlight bash%}
echo "listen_addresses = '*'">> $PGCONF/postgresql.conf  
echo "wal_level = hot_standby" >> $PGCONF/postgresql.conf  
echo "max_wal_senders = 3" >> $PGCONF/postgresql.conf  
echo "hot_standby = on" >> $PGCONF/postgresql.conf  
{%endhighlight%}

### restore data from master
First clean $PGDATA folder, then use `pg_basebackup` to copy a base backup from master server.  
{%highlight bash%}
pg_basebackup -U r -h 192.168.1.100 --format=plain -vxP  -D $PGDATA
{%endhighlight%}

### add recovery.conf file
The same, parameters below are minimum requirement for standby and slaver.  
{%highlight bash%}
echo "standby_mode = 'on'">>$PGDATA/recovery.conf
# Notice the single quote around (on)
echo "primary_conninfo = 'host=192.168.1.100 port=5432 user=r password=123456'">>$PGDATA/recovery.conf
echo "trigger_file = '/var/lib/postgresql/9.3/main/failover'">>$PGDATA/recovery.conf
{%endhighlight%}
This trigger file parameter disables standby server to write on data file, makes it just used for replication.  
Once master server shutdown abnormally, remove the trigger file to make standby server a new master server.  

### start postgresql on standby
{%highlight bash%}
sudo service postgresql start
{%endhighlight%}
Now you could find from postgresql log that it started streaming from master server.  

# configuration on slaver
On slaver servers, almost all the same with standby server except that the `max_wal_senders` parameter need to be set as 0 to disable WAL send.  
But of course, the connection information on slavers need to be set as connect to standby server instead of the master one.  

# test
Now try create a table, you will see this table is also created both on `standby` and `slaver`.  
So as other DML operations.  
But if you try to do so on standby or slaver, postgresql will stop you with `readonly`.  
