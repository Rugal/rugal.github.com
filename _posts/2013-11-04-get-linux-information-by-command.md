---
layout: post
title: "get linux information by command"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}

{%highlight bash%}
#system information
uname -a        #kernel info/OS distribution/cpu info/
cat /etc/issue  #OS release information
hostname        #show computer name
lspci -tv       #list all pci devices
lsusb -tv       #list all use devices
lsmod           #list loaded kernel modes
env             #show envrionment variables
hdparm -i /dev/hda   #show disk parameteres(only suitable for IDE device)
dmesg | grep IDE     #show startuped kernel ring information


#resource
free           #show memry and swap usage
df -h          #show partition information
du -sh <dir>   #show size of <dir>
grep MemTotal /proc/meminfo   #show total memory
grep MemFree /proc/meminfo    #show free memory
cat /proc/loadavg             #show system load
mount | column -t    #show mounted partition information
fdisk -l             #show detail information of each partition
swapon -s            #show swap partition
uptime       #system running time, user login number and load


#network
ifconfig         #show network interfaces information
iptables -L      #show firewall info
route -n         #show router table
netstat -lntp    #all listened ports
netstat -antp    #all connected connection
netstat -s       #show network statistics information


#process
ps -ef           #display all processes
top              #show processes in dynamic
{%endhighlight%}
