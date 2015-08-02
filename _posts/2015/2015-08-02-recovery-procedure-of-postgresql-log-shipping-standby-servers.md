---
layout: post
title: "recovery procedure of postgresql Log Shipping Standby Servers"
description: ""
category: operation
tags: [postgresql]
---
{% include JB/setup %}

Any operation is from the view of standby server.  

1. Execute `restore_command` to move any archive log to `pg_xlog` folder.  
2. Try to restore any available WAL in `pg_xlog` folder from current last valid record until last available data consistent point int WAL.  
    If this fails, goto `3`.  
3. (If streaming enabled) Standby tries to connect to primary and start streaming WAL from last valid record found in archive or `pg_xlog` folder.  
    If fails or streaming replication disconnected or no streaming replication disabled, goto `1`.  
4. If the above procedure repeated for several times or `trigger` file is called, recovery cancelled.  
