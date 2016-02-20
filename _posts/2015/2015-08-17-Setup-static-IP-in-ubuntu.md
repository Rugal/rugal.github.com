---
layout: post
title: "Setup static IP in ubuntu"
description: ""
category: operation
tags: [network]
---
{% include JB/setup %}
Under certain circumstance you need to specify a static IP address.  There are 2 different ways you can achieve this.  

## Command

{%highlight bash%}
ifconfig eth0 [the.ip.you.want]
{%endhighlight%}
This command effect is temporary so the change will be swiped after ubuntu reboot or restart of network.

## Interface file

In Ubuntu OS, what you need to do is to modify `/etc/network/interfaces`:  

    auto lo
    iface lo inet loopback
    auto eth0
    iface eth0 inet static
    address [the ip you want]
    netmask [real net mask]
    network [network]
    gateway [gateway]
    
Change the interface name `eth0` if you wish to modify other interfaces.  
After edition, you need to restart your network.  
You can simply reboot ubuntu or use [network restart]({%post_url 2015-08-17-ubuntu-restart-network-interfaces %}).
Notice by editing interface file, the change are permanent and will also be effective after reboot.
