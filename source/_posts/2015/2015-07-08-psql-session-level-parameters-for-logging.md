---
layout: post
title: "psql session level parameters for logging"
description: ""
category: operation
tags: [postgresql]
date: 2015-07-08
---
When you open `psql`, the information it provide to you is just for notification of command completion. If you need more idea about how parse tree, execution plan and internal debug log are, you need to turn on those parameters in psql.  

```sql
\set VERBOSITY verbose
--psql parameter
--show real function location in source file

set client_min_messages=log;
--feedback information
--Available values: debug5, debug4, debug3, debug2, debug1, log, notice, warning, error.

set debug_pretty_print = on;
--format parse tree information

set debug_print_parse=on;
--print parse tree

set debug_print_rewritten = on; 
--print rewritten parse tree

set debug_print_plan = on;
--print execution plan

set trace_locks=on;
--print trace for locks

set wal_debug=on;
--log information for WAL
```

You can also put `.psqlrc` file in your home folder to enable user specific psql configuration.  
You can even put this file in `pg_config --sysconfdir` to enable system wide psql configuration.

