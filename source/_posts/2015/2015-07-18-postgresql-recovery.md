---
layout: post
title: "postgresql Point In Time Recovery"
description: ""
category: operation
tags: [postgresql]
date: 2015-07-18
---

## Enable archive setting

```shell
#Set WAL to either hot_standby or archive
echo "wal_level= hot_standby" > postgresql.conf 
#keep archiving old WAL
echo "archive_mode=on" > postgresql.conf  
#specify archive command to backup old WAL
echo "archive_command='test ! -f /opt/archive/%f  && cp %p /opt/archive/%f' " > postgresql.conf
```


## Origin data
```shell
--This table will be included in base backup.
create table test1(id int4 primary key, name varchar(20));
--CREATE TABLE
```


## Base backup
```shell
pg_basebackup -U postgres -h 127.0.0.1 --format=tar -xzP  -D backup
```
Use this command to create a base backup tar file.   
Recovery work will start from the last check point of this base backup file.  
For more backup methods, please refer to my [post]({%post_url 2015-07-15-postgresql-backup %}).  

## More data after backup

```shell
create table test2(id int4 primary key, name varchar(20));
--CREATE TABLE
insert into test2 values (1, 'Rugal'), (2, 'Bernstein'), (3, 'Tenjin'), (4, 'Descend');
--INSERT 0 4
select pg_switch_xlog(); -- force xlog switch to simulate normal log shift
--test2 table will be included in archived xlog
create table test3(id int4 primary key, name varchar(20));
--CREATE TABLE
--test3 table is in current xlog, so this table will not be recovered if current xlog is not backuped
```

## Emulate server crash
You can use any method to make this happens. Like shutdown your server by power off or `kill`.  

>kill postgresql

Backup latest unarchived `xlog`, if you could.  
```shell
cp -r $PGDATA/pg_xlog $HOME
```

## Emulate data files loss.  
```shell
#Delete all data file 
rm -r $PGDATA  
```


---------

Now it is time to restore database.  

## restore base file
What we need to do is just unzip and move all files into `$PGDATA` folder.   

```shell
tar -zxf base.tar.gz
mv * $PGDATA
```

Now if you start postgresql, you will find data restore to the point of base backup.   
But now we need to recover till to most recent valid archieve state.   

## Setup recovery file
Create a file `recovery.conf` under you `$PGDATA`.  
```shell
echo "restore_command = 'cp /opt/archive/%f %p'" > $PGDATA/recovery.conf
```

Since you have your archived WAL, if you start postgresql, database will recovering process till the `last` valid segment that was `archived`.    
But if you want to recover to the last valid moment right before crash, maybe that latest segment has not yet been archived, so you need to copy all `pg_xlog` files in original `$PGDATA` folder, that is why I said it is better to backup `$PGDATA/pg_xlog` even with you enabled `archive_mode`

```shell
cp  -r $HOME/pg_xlog $PGDATA
```

If recovery is finished, the `recovery.conf` file will be renamed to `recovery.done` to avoid further recovery.   
