---
layout: post
title: "postgresql lock introduction"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

For official documentation, please refer to [Postgresql](http://www.postgresql.org/docs/9.4/static/explicit-locking.html).  

##Table level
Once acquired, a lock is normally held till end of transaction.   
But if a lock is acquired after establishing a savepoint, the lock is released immediately if the savepoint is rolled back to.   
This is consistent with the principle that ROLLBACK cancels all effects of the commands since the savepoint.   
The same holds for locks acquired within a PL/pgSQL exception block: an error escape from the block releases locks acquired within it.  

1. ACCESS SHARE  
Conflicts with the `ACCESS EXCLUSIVE` lock mode only.  
The `SELECT` command acquires a lock of this mode on referenced tables.  
In general, any query that only reads a table and does not modify it will acquire this lock mode.

2. ROW SHARE  
Conflicts with the `EXCLUSIVE` and `ACCESS EXCLUSIVE` lock modes.  
The `SELECT FOR UPDATE` and `SELECT FOR SHARE` commands acquire a lock of this mode on the target table(s) (in addition to `ACCESS SHARE` locks on any other tables that are referenced but not selected `FOR UPDATE`/`FOR SHARE`).

3. ROW EXCLUSIVE  
Conflicts with the `SHARE`, `SHARE ROW EXCLUSIVE`, `EXCLUSIVE`, and `ACCESS EXCLUSIVE` lock modes.  
The commands `UPDATE`, `DELETE`, and `INSERT` acquire this lock mode on the target table (in addition to `ACCESS SHARE` locks on any other referenced tables).   
In general, this lock mode will be acquired by any command that modifies data in a table.

4. SHARE UPDATE EXCLUSIVE  
Conflicts with the `SHARE UPDATE EXCLUSIVE`, `SHARE`, `SHARE ROW EXCLUSIVE`, `EXCLUSIVE`, and `ACCESS EXCLUSIVE` lock modes.   
This mode protects a table against concurrent schema changes and `VACUUM` runs.  
Acquired by `VACUUM` (without FULL), `ANALYZE`, `CREATE INDEX CONCURRENTLY`, and `ALTER TABLE VALIDATE` and other `ALTER TABLE` variants (for full details see [ALTER TABLE](http://www.postgresql.org/docs/9.4/static/sql-altertable.html)).

5. SHARE  
Conflicts with the `ROW EXCLUSIVE`, `SHARE UPDATE EXCLUSIVE`, `SHARE ROW EXCLUSIVE`, `EXCLUSIVE`, and `ACCESS EXCLUSIVE` lock modes.   
This mode protects a table against concurrent data changes.  
Acquired by `CREATE INDEX` (without `CONCURRENTLY`).

6. SHARE ROW EXCLUSIVE  
Conflicts with the `ROW EXCLUSIVE`, `SHARE UPDATE EXCLUSIVE`, `SHARE`, `SHARE ROW EXCLUSIVE`, `EXCLUSIVE`, and `ACCESS EXCLUSIVE` lock modes.   
This mode protects a table against concurrent data changes, and is self-exclusive so that only one session can hold it at a time.  
This lock mode is not automatically acquired by any PostgreSQL command.

7. EXCLUSIVE  
Conflicts with the `ROW SHARE`, `ROW EXCLUSIVE`, `SHARE UPDATE EXCLUSIVE`, `SHARE`, `SHARE ROW EXCLUSIVE`, `EXCLUSIVE`, and `ACCESS EXCLUSIVE` lock modes.   
This mode allows only concurrent `ACCESS SHARE` locks, i.e., only reads from the table can proceed in parallel with a transaction holding this lock mode.  
Acquired by `REFRESH MATERIALIZED VIEW CONCURRENTLY`.

8. ACCESS EXCLUSIVE  
Conflicts with locks of all modes (`ACCESS SHARE`, `ROW SHARE`, `ROW EXCLUSIVE`, `SHARE UPDATE EXCLUSIVE`, `SHARE`, `SHARE ROW EXCLUSIVE`, `EXCLUSIVE`, and `ACCESS EXCLUSIVE`).   
This mode guarantees that the holder is the only transaction accessing the table in any way.  
Acquired by the `DROP TABLE`, `TRUNCATE`, `REINDEX`, `CLUSTER`, and `VACUUM FULL` commands.   
Many forms of `ALTER TABLE` also acquire a lock at this level (see [ALTER TABLE](http://www.postgresql.org/docs/9.4/static/sql-altertable.html)).   
This is also the default lock mode for `LOCK TABLE` statements that do not specify a mode explicitly.



##Row level

##Page level

##Deadlock

##Advisory
