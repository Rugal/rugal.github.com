---
layout: post
title: "encrypy and hide windows folder"
description: ""
category: operation
tags: [batch]
date: 2013-08-01
---


`foldername` is the name before encrypted.  
`targetname` name theone after that.  
`password` variable is the key to unlock the folder.


```shell
set foldername=god
set targetname="rugal"
set password="123456"

cls
@ECHO OFF
title Folder %foldername%
if EXIST %targetname% goto UNLOCK
if NOT EXIST %foldername% goto MDLOCKER

:CONFIRM
echo Are you sure you want to lock the folder(Y/N)
set/p "cho=>"
if %cho%==Y goto LOCK
if %cho%==y goto LOCK
if %cho%==n goto END
if %cho%==N goto END
echo Invalid choice.
goto CONFIRM

:LOCK
ren %foldername% %targetname%
attrib +h +s %targetname%
echo Folder locked
goto End

:UNLOCK
echo Enter password to unlock folder
set/p "pass=>"
if NOT %pass%==%password% goto FAIL
attrib -h -s %targetname%
ren %targetname% %foldername%
echo Folder Unlocked successfully
goto End

:FAIL
echo Invalid password
goto end

:MDLOCKER
md %foldername%
echo %foldername% created successfully
goto End
:End
```
