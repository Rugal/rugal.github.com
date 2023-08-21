---
layout: post
title: "postgresql backup"
description: ""
category: operation
tags: [postgresql]
date: 2015-07-15
---

# logical backup
Logical backup extract metadata(with SQL) from postgresql.  
Its advantages includes human readable text and better transplantability.  

## pg_dump
Dump objects or single `database` into file. 

>pg_dump [connection-option...] [option...] [dbname]  

### plain format
Just in one file, long if database becomes big.  

>backup: `pg_dump -U postgres -h 127.0.0.1 -t test > test.sql`  
>restore: `psql -U postgres -h 127.0.0.1  -f test.sql`  

### non-plain format
Directory organized, data and table separated, cleaner and easier to manage.  
Might use more storage. Transplantability not as good as plain format.  

>backup: `pg_dump -U postgres -h 127.0.0.1 --format=tar -t test > test.tar`  
>restore: `pg_restore -U postgres -h 127.0.0.1 --dbname=postgres test.tar`  

## pg_dumpall
Dump whole postgresql `cluster` into file.  
This command actually calling `pg_dump` and dump each database in this cluster one by one.  

>backup: `pg_dump -U postgres -h 127.0.0.1> pg.sql`  
>restore: `psql -U postgres -h 127.0.0.1  -f pg.sql`  


# physical backup
Physical backup somehow copies files that related with database directly.   
Only physical backup could use `PITR` technique. If you need to use `PITR`, please enable `WAL` and `archive log`. For this part, please refer to my [post]({%post_url 2015-07-18-postgresql-recovery %});  

## pg_basebackup
This command will copy files under `$PGDATA` as well as tablespace files that outside this folder.  
Beware this not includes `archived WAL` files. You need to backup them up manually.  

>backup: `pg_basebackup -U postgres -h 127.0.0.1 --format=tar -xz  -P  -D backup`  
>restore: Just copy and unzip required tar files to specific path.  

You can also use system commands like `cp` to manually copy and compress files. But if you do so, you need to stop postgresql cluster first to ensure data consistency in database.
