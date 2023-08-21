---
layout: post
title: "hex dump tool xxd"
description: ""
category: operation
tags: [linux,vim]
date: 2014-05-07
---
It is rather conveinent to use `UltraEditor` to edit bytecode file of Java or other binary files, but it is rather hard to achieve it in Linux on a glance, now here comes an evangel --- `xxd`.  


```shell
xxd [option] infile  [outfile]
option:
-b  #xxd will use hex dump by default, use -b to enforce binary dump
-r  #revert dump
-i  #use C unsigned char array as output format
-u  #use upper case in HEX dump
```
Thus to dump the hex of a file, just use  
`xxd filename`  

This command also could be invoked in `VIM` enable it to be a hex editor:  

1. First open a file in binary mode with `vim -b filename`, or there will have a `0x0a` append.
2. in command mode type `%!xxd` to dump the whole file into HEX, the same as xxd command in shell.
