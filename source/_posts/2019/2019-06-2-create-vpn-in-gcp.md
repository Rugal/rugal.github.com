---
layout: post
title: "Create VPN in GCP"
description: ""
category:  operation
tags: [docker, gcp, vpn, network]
date: 2019-06-02
---

Given that we have a GCP account, now let's start creating VPN in GCP.  

## Create Project

![create-project](https://i.postimg.cc/SssS4KQ4/create-project.png)

## Create VM in Compute Engine

![create-vm](https://i.postimg.cc/FFwLTMGz/create-vm.png)  
![vm-specification](https://i.postimg.cc/SKtsJ9vR/vm-specification.png)  

Because VPN doesn't require too much hardware, the machine should just use the very basic one. So as to make it cheaper.      

## Create ShadowSocksR Server

```bash
# run this command
curl -O https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh | sudo bash
```

Then you should have parameters for configuring the shadow socks R.  
Eventually you will get: 

```
Congratulations, ShadowsocksR server install completed!
Your Server IP        :  xx.xxx.xxx.xx 
Your Server Port      :  12180 
Your Password         :  PASSWORD 
Your Protocol         :  auth_chain_a 
Your obfs             :  plain 
Your Encryption Method:  aes-256-cfb 

Your QR Code: (For ShadowsocksR Windows, Android clients only)
 ssr://MzUuMjI5LjMxLjE0OjEyMTgwOmF1dGhfY2hhaWabcTphZXMtMjU2LWNmYjpwbGFpbjpVblZuWVd4emMzSXJNWE0vP29iZnNwYXJhbT0= 
Your QR Code has been saved as a PNG file path:
 /home/gcp/shadowsocks_r_qr.png 
```

## Create firewall rule

![firewall-rule](https://i.postimg.cc/c4M5ZBvR/firewall-rule.png)

To allow traffic to shadow socks server, we should open the firewall for the server port.  
Here,  you should have the port comes from shadow socks configuration to TCP protocol.  

![allowall](https://i.postimg.cc/s21nYFwm/allowall.png)  


# Test

Then import the server configuration by copying the ssr URL, you should be able to use that now!  
