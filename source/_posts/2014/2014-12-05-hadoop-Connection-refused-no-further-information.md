---
layout: post
title: "hadoop Connection refused no further information"
description: ""
category: operation
tags: [hadoop]
date: 2014-12-05
---
When using eclipse on window to connect to remote hadoop server in Linux.  
But when add a new location: `Cannot connect to the Map/Reduce location: `  

    Call to 172.18.3.198/172.18.3.198:9001 failed on connection exception: 
    java.net.ConnectException: Connection refused: no further information.



-----


### Solution
Modify the `core-site.xml`, `mapred-site.xml` files for their localhost into the server IP ! Everything is good bless.
