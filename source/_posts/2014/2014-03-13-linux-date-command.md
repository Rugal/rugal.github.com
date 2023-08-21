---
layout: post
title: "linux date command"
description: ""
category: operation
tags: [linux]
date: 2014-03-13
---
I found `date` is rather a useful command to encode or decode timestamp from epoch or human readable date.  
```shell
date [options]   [+format]
--date="TIME"  #use this to input a human readable date
# example: date --date="2014-03-12 15:13:10"
# Notice --date  option could also read seconds-from-epoch
# example: date --date="@1396572606"

--set="TIME"  #set linux date as specified TIME

+%s   #format as secnds from epoch

# example:
date --date="2013-06-01 12:00:05" +%s
# 1370059205
```

But actually, the `-s` option will not change linux time from `CMOS` level, linux time will follow what `CMOS` tick tock.  

There is another command to modify linux time from `CMOS` level.  
`hwclock --set --date="2011-08-14 16:45:05"`  
It will surely set hardware clock as `2011-08-14 16:45:05`
