---
layout: post
title: "Recover root password for ubuntu"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
If you got lost of your root password in ubuntu, due to its security setting that even if you enter into recovery mode, it can not make change to root password.  
Here is a solution to make it happen.  

1. enter recover mode at GRUB screen.  
![use root mode](http://githubpage.u.qiniudn.com/select-recovery-mode.jpg )

2. select "drop to root shell" option. A shell prompt will be displayed at the bottom of screen with root user, At this time you can not change password of root, you have to do this first:  
`mount -rw -o remount /`  
![use root mode](http://githubpage.u.qiniudn.com/enter-root-mode.jpg )  

3. Then type `passwd root` to make change to your root user as you wish.
