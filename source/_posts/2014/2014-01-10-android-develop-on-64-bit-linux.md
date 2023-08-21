---
layout: post
title: "android develop on 64 bit linux"
description: ""
category: development
tags: [java,linux,android]
date: 2014-01-10
---
Sometimes I will feel a little bit of sorrow, that I do not know where to forward.  
Many people call it `at sea`.  

Yesterday night I feel little bit of `at sea`, thus I downloaded `ADT` for my linux.  
and I encountered some problems about the shared library for C++, now I'd like to share the solution to you all:  

Even though I already installed `zlib-dev` and `libstdc++-4.8-dev`, eclipse keep tells me my linux can not find `libz` and `libstdc++`.  
What a stupid!.  

the `ldd` tells me it want to use the lib from below path:  
```shell
[rugal@rugal-TM8473 platform-tools]> ldd /opt/adt-bundle-linux/sdk/platform-tools/adb 
	linux-gate.so.1 =>  (0xf7767000)
	librt.so.1 => /lib/i386-linux-gnu/librt.so.1 (0xf7740000)
	libdl.so.2 => /lib/i386-linux-gnu/libdl.so.2 (0xf773b000)
	libpthread.so.0 => /lib/i386-linux-gnu/libpthread.so.0 (0xf771f000)
	libstdc++.so.6 => /usr/lib/i386-linux-gnu/libstdc++.so.6 (0xf7636000)
	libm.so.6 => /lib/i386-linux-gnu/libm.so.6 (0xf75f3000)
	libgcc_s.so.1 => /lib/i386-linux-gnu/libgcc_s.so.1 (0xf75d6000)
	libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7422000)
```

But my lib was in:  
```shell
[rugal@rugal-TM8473 platform-tools]> dpkg -S  libstdc++.so.6
libstdc++6:amd64: /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.18
libstdc++6:amd64: /usr/lib/x86_64-linux-gnu/libstdc++.so.6
```

Here I got an idea that, seems ADT can only make use of 32-bit of lib...  
what a stupid...  

Hence I installed 32-bit library for `libstdc++` and `libz`  

```shell
sudo apt-get install lib32z1-dev
sudo apt-get install libstdc++6:i386 libgcc1:i386 zlib1g:i386 libncurses5:i386
```

in some release, you need to use  
```shell
sudo apt-get install ia32-libs
```

All things are done! But today, I get back of myself, I still want to deepen my future into `database`.  
So I deleted the `ADT`...that is all I have done yesterday.
