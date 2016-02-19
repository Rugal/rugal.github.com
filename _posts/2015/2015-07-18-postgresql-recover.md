---
layout: post
title: "postgresql recover"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

##edit postgresql.conf
{%highlight bash%}
echo "wal_level= hot_standby" > postgresql.conf
echo "archive_mode=on" > postgresql.conf
echo "archive_command='test ! -f /opt/archive/%f  && cp %p /opt/archive/%f' " > postgresql.conf
echo "max_wal_senders=3" > postgresql.conf
echo "log_destination='stderr'" > postgresql.conf
{%endhighlight%}


##some data
{%highlight sql%}
create table test1(id int4 primary key, name varchar(20));
--CREATE TABLE
--This table will be included in base backup.
{%endhighlight%}


##backup
{%highlight bash%}
pg_basebackup -U postgres -h 127.0.0.1 --format=tar -xzP  -D backup
{%endhighlight%}
Use this command to create a base backup tar file. Recovery work will start from the last check point of this base backup file.  
For other backup method, please refer tho my [post]({%post_url 2015-07-15-postgresql-backup %}).  

##more data

{%highlight sql%}
create table test2(id int4 primary key, name varchar(20));
--CREATE TABLE
insert into test2 values (1, 'Rugal'), (2, 'Bernstein'), (3, 'Tenjin'), (4, 'Descend');
--INSERT 0 4
select pg_switch_xlog(); -- force xlog switch to simulate normal log shift
--test2 table will be included in archived xlog
create table test3(id int4 primary key, name varchar(20));
--CREATE TABLE
--test3 table is in current xlog, so this table will not be recovered if current xlog is not backuped
{%endhighlight%}
##crash
You can use any method to make this happens. Like shutdown your server by power off.  

>kill postgresql

If you can get recent `xlog`, do not hesitate to back them up.   
{%highlight bash%}
cp -r $PGDATA/pg_xlog $HOME
{%endhighlight%}

simulate data files loss.  
{%highlight bash%}
rm -r $PGDATA  
{%endhighlight%}


--------
Now it is time to restore database.  

##restore base file
What we need to do is just unzip and move all files into `$PGDATA` folder.  
{%highlight bash%}
tar -zxf base.tar.gz
mv * $PGDATA
{%endhighlight%}

Now if you start postgresql, you will find the data before backup all restored. But now we need to recovery data after backup.

##recover by WAL
{%highlight bash%}
echo "restore_command = 'cp /opt/archive/%f %p'" > recovery.conf
mv recovery.conf $PGDATA
{%endhighlight%}

Now that you specified archived WAL in path, if you start postgresql, data will recover to the `last` segment that was `archived` by postgresql.  

But if you want to recover to the last moment, that maybe the latest segment has not yet been archived, you need to copy all `pg_xlog` files in original `$PGDATA` folder, that is why I said it is better to backup `$PGDATA/pg_xlog` even with you enabled `archive_mode`
{%highlight bash%}
cp  -r $HOME/pg_xlog $PGDATA
{%endhighlight%}

If recovery is finished, the `recovery.conf` file will be renamed to `recovery.done` to avoid further recovery.  

Go and see if your data comes back.  
Cheers!
