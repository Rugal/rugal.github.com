---
layout: post
title: "install KVM on ubuntu"
description: ""
category: operation
tags: [virtualization, linux]
date: 2014-02-13
---

First of all you need to check your PC have the capability to use the kernel based virtualization.  
Checking by using command below:  
`sudo egrep '(vmx|svm)' --color=always /proc/cpuinfo`  
```shell
flags       : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm ida arat epb xsaveopt pln pts dtherm tpr_shadow vnmi flexpriority ept vpid
```
If you found this command output nothing, just switch to another virtualization software as your PC does not support KVM.  

Then to install KVM component:  
`sudo apt-get install qemu-kvm kvm-ipxe ikvm ubuntu-vm-builder libvirt-bin bridge-utils`  

After installation, the virtual network card is created by default, so just start virtual network card process:  
`sudo service libvirt-bin start`  

Before making use of the `virsh` command to operate VM in real, you need to grant permission to operate them by adding into group:  
`sudo adduser rugal libvirtd`  
`sudo adduser rugal kvm`  
Just replace `rugal` with your own user name.  


Now just check if you have the right command and permission to execute below:  
`virsh --connect qemu:///system list --all`  
Our installation procedure proven sucessful as output below:  

```shell
Id    Name                           State
----------------------------------------------------
```
