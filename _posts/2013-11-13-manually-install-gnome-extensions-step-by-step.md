---
layout: post
title: "manually install gnome extensions step by step"
description: ""
category: operation
tags: [gnome]
---
{% include JB/setup %}
With the usefulness and interesting functions of gnome extensions be, although it is so easy to install or uninstall an extensions through `extensions.gnome.org`, actually this problem puzzled me for a very long time that how to install or delete gnome extension manually.  
Today I spared a lot of time on this things, and I finally to figure that!  
with no any assistance from javascript of `extensions.gnome.org` you have to do it yourself, let's do this:  

##choose a extensions 
browse extensions from `extensions.gnome.org`, and in this time, let's say the [netspeed](https://extensions.gnome.org/extension/104/netspeed/)  
and now we can not use the buttons aside this extensions to install, then have you notice the [Extension Homepage](https://github.com/hedayaty/NetSpeed) which indicat this extensions is from github.

##clone extension to local
browse into this github site and simply git clone it  
`git@github.com:hedayaty/NetSpeed.git`  
and now we can see a folder named `NetSpeed` cloned just from this github  

##rename extensions name
cd into this folder and open `metadata.json`, find the key named `uuid`, in this time the value is `netspeed@hedayaty.gmail.com`  
then just rename the root folder `NetSpeed` into `netspeed@hedayaty.gmail.com` 


##deploy into gnome-shell
after the procedure above, just copy the whole folder into `~/.local/share/gnome-shell/extensions`  
But there will have no any changes, you need to restart the `gnome-shell`  
press `ALT` `F2`  to call the gnome-shell command window up, and input `r` which represent restart and press `enter`  
after a little bit of time, your gnome-shell's restart progress is finished.

##enable your extensions
this time is easy to do with that, just use `gnome-shell-extensions-pref` or `gnome-tweak-tool` to enable that extension.  
Enjoy your gnome-extensions!!!


##version confliction
sometimes there will be a miss match of version that used in gnome-shell. For instance with gnome-shell version 3.8 but NetSpeed version 3.10.  
So you need to revert the version of NetSpeed code, is that possible? of course it is `git`  
first you need to see what version you can revert and properly can with `git log`  
in this time I found the 1f17b3ce08c40f347e5659bcd8d01ddf79381de2  version is just fit for my need, then I use  
`git reset --hard 1f17b3ce08c40f347e5659bcd8d01ddf79381de2`  
for detailed introduction of [git reset](/linux/2013/11/13/git-rollback-to-commit) .  
so as to revert the version, and now I could use that extensions.  
just repeat the procedures above untill all your extensions were installed.  
Never forget to full copy with all your extensions after successfully installed, it is a tought assignment!
