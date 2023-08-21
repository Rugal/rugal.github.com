---
layout: post
title: "Ubuntu Wireless setup"
description: ""
category: operation
tags: [linux]
date: 2017-05-22
---

# Find your interface name

```
chili@T440p:~$ iwconfig
enp0s25   no wireless extensions.

lo        no wireless extensions.

wlp3s0    IEEE 802.11bgn  ESSID:"GBR1"  
          Mode:Managed  Frequency:2.462 GHz  Access Point: XX:2B:B0:DC:45:XX 
          Bit Rate=72.2 Mb/s   Tx-Power=22 dBm   
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
          Link Quality=55/70  Signal level=-55 dBm  
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:109   Missed beacon:0

```

It will be `wlxxx` something rather than wlan0 any more as it is 16.04 anyway.

# Edit interface file
```
sudo vim /etc/network/interfaces
```

>auto wlan0  
iface wlan0 inet dhcp  
wpa-ssid `your_access_point`  
wpa-psk `your_wpa_key`


# restart interface

```
sudo ifup -v wlxxx
```
