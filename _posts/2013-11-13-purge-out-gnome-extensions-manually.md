---
layout: post
title: "purge out gnome extensions manually"
description: ""
category: operation
tags: [gnome]
---
{% include JB/setup %}
I have encountered a very annoying problem that I can not delete some of the gnome-extensions clearly, which caused my gnome software abnormally performed.

some articles will tell you to use `gnome-tweak-tool` to remove or configure gnome-extensions, I agree with this in a half that this tool can only remove plugins that are performing normally.  
The extensions can be seem on `gnome-tweak-tool` but shows `ERROR`, can not either remove or enable.
While there is no other tool to remove extensions, this article is to tell you a little trick to remove all abnormal extensions from you system.

after googling for a very long time, I got to know that to cope with the
situation of abnormally running plugins, you have to use `gsettings`  

`gsettings get org.gnome.shell enabled-extensions`  #to get all enabled extensions  

`gsettings set org.gnome.shell enabled-extensions []`  #to clear all enabled extensions  

after this command you can reinstall all your gnome-extensions.

