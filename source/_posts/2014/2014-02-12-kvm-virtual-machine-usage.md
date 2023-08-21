---
layout: post
title: "kvm virtual machine usage"
description: ""
category: operation
tags: [virtualization, linux]
date: 2014-02-12
---
I have successfully installed KVM virtual machine for a very long time, but I did not do some actual jobs on it yet.  
Today I am started to do some developing jobs towards Hadoop eco-system, which needs virtual machines for a better and clean workspace.  

## create VM
Operate according to this [doc](http://www.havetheknowhow.com/Configure-the-server/Configure-KVM.html), which is already detailed to fully create a KVM machine. I rewrite the [build-vm](http://githubpage.u.qiniudn.com/build-vm) script for creating VM.  
During the installation, I encountered some problems. I just wanna share them online.  
Notice that `--dest` is the parameter that VM file will be stored, you need to create the folder name yourself, or KVM will have error stack at the final stage! killing time.  

If you found it rather slow to initially create a VM, this might caused by the slow network between you and source provider, in my experiment, I use 163 as source provider, be aware of this connection speed between you and source server.  

After fetching bin files from source server, maybe it will have a error that shows `Could not found libvirt`, whenever this happens, please startup `libvirt` by:  
`sudo service libvirt start`  

After a around  15 mins, the automatical installation procedure already finished and it will deploy to the folder that you specified in `build-vm` script.  

## clone VM
It also very simple and easy to clone a VM rather than recreate a VM from network again!  
For more details, please refer to [clone](http://www.havetheknowhow.com/Configure-the-server/Configure-KVM.html)  
`> virt-clone --connect=qemu:///system -o oldVM -n newVM -f /home/rugal/VM/new/NewVM.gcow2`  

## step into VM
Now its time to startup our VM, how exciting!  
Use `list` command:  

```shell
> virsh --connect qemu:///system list --all
 Id    Name                           State
 ----------------------------------------------------
  -     master               shut off
```

Use `start` to startup VM named `master`  
`> virsh --connect qemu:///system start master`  

After installation, the first thing you might to do is use SSH to connect into VM, but actually you do not know about the DHCP allocated IP adress, here I found a method to get IP for your new created VM.  

First use `virsh` command to find out MAC address of your VM.  
```shell
> virsh domiflist master.
Interface  Type       Source     Model       MAC
-------------------------------------------------------
vnet0      bridge     virbr0     virtio      52:54:00:9b:9f:d2
```

Then use ARP scan to determine the allocated IP.  
```shell
> arp -a
? (192.168.122.50) at 52:54:00:9b:9f:d2 [ether] on virbr0
? (192.168.1.1) at d8:5d:4c:29:b1:f8 [ether] on wlan0
```
Now just try on this with `ssh 192.168.122.50`


```shell
> ssh 192.168.122.50
rugal@192.168.122.50's password: 
Welcome to Ubuntu 12.04.4 LTS (GNU/Linux 3.2.0-58-virtual x86_64)

 * Documentation:  https://help.ubuntu.com/
 Last login: Wed Feb 12 15:51:55 2014 from 192.168.122.1
 To run a command as administrator (user "root"), use "sudo <command>".
 See "man sudo_root" for details.

 rugal@master:~$ 
```
Wow it works!

## close VM
It also very easy to do the reverse action to shutdown VM, just as command below:  
`> virsh --connect qemu:///system shutdown master`  

## drop VM
I wrote a [script](http://githubpage.u.qiniudn.com/vmdelete) to delete a VM in one command, you will find it rather easy!
