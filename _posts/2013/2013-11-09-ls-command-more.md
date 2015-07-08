---
layout: post
title: "ls command more"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
ls is a useful command but most of us can just obey the fundamental rule
created by whom post online. After read the man for a while, I got to write
something down good!  
{%highlight bash%}
-a      show all file includes hide file . and ..
-A      show all file includes hide file but not . and ..

-C -x   display by line
-l      list entries in a table as detailed information displayed
-G      like -l and no group information
-g      like -l but no owner information
-o      like -l but no group information

-F      append file type indicator after file name
-p      append / after folder
-h      human readable megabyte  gigabyte etc.,
-L      show referenced file rather than link itself

-R      recursively list file
-s      print allocated size for each file

-S      sort by file size
-t      sort by time last modification=ctime
-c      with -cl is soft by name and show time as ctime; with -clt is sort by and show ctime

--color=auto/never/always   distinguish different type of file in disparate colors
--hide=PATTERN  hide files by matching PATTERN
--author show author of this file
--time=WORD show time as indicated "access  atime use ctime status" 
            rather than modification time
--sort=WORD sort entries as indicated "none extension  size time version" 
            rather than name in default
--time-style=TYPE format time as "full-iso long-iso iso locale"
{%endhighlight%}
and now my alias for ls is  
`ls --color=auto --sort=time --time-style=iso --time=ctime -lhpF`
