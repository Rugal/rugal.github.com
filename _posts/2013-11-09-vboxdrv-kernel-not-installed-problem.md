---
layout: post
title: "vboxdrv Kernel not installed problem"
description: ""
category: operation
tags: [virtualization]
---
{% include JB/setup %}
##problem information
The VirtualBox Linux kernel driver (vboxdrv) is either not loaded or there is a permission problem with /dev/vboxdrv. Please reinstall the kernel module by executing  
`'/etc/init.d/vboxdrv setup'`  
as root. Users of Ubuntu, Fedora or Mandriva should install the DKMS package first. This package keeps track of Linux kernel changes and recompiles the vboxdrv kernel module if necessary.  


##solution
This is an annoying messages that  affect my emotion, when I execute `'/etc/init.d/vboxdrv setup'` in consonle, which tells that this command not found, how can I deal with that?  

After a little bit of search, I finally got the solution:  
`sudo modprobe vboxdrv`  
after this command you can open a session for virtual machine, but after that, I got another error message that said: 
"can not create bridge network because of kernel not enable", then I execute the command below:  
`sudo modprobe vboxnetflt`  
seems everything is ok, now lets play virtualbox


