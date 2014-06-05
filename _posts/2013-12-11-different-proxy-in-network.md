---
layout: post
title: "different proxy in network"
description: ""
category: operation
tags: [network]
---
{% include JB/setup %}
It might be confusing to tell `Forward Proxy` `Reverse Proxy` `transparent proxy`, let me clarify these:  

##forward proxy
This kind of proxy is used manually by user or software itself, which means user or software itself aware the existance of proxy  
For instance, `goagent` is a breaking GFW proxy that used in chrome and firefox, while configure with `goagent`.  
you need to specify the address and port of it, instruct browser to use proxy manually in this way.  
then browser will send request or receive response from this configuration. which named `forward`  

##reverse proxy
In this proxy, client do not aware the existance of proxy, but this proxy is configured by developer or system administrator.  
When client visit a web page using browser, this request will be sent to proxy host even with identical URL.  
Then this request will be dealt by proxy and it might be deliver to the real host or not determined by program logic.  
For example:  
I can configure domain name `rugal.ml` on my DNS server provider and point to `proxy.rugal.ml` (VPS),  
and in `proxy.rugal.ml` dealing logic, I will pass this request to `rugal.github.io` for real delivery  
At the view of client or browser, it seems like got this whole site from `rugal.ml`.  
but actually, it is only I know that my real blog site and stored place is `rugal.github.io`  
In addition,  the `url` on browser will not change if use this proxy  

##transparent proxy
Very similar to `reverse proxy`, the `transparent proxy` working without the notification of final user.  
It is configured by network administrator for upgrading network security in some Companies.  
http request are delivered normally through network, but in some network auditing facilities, they will check validation of request.  
But differentiate with `reverse proxy`, this kind of proxy will filter all requests rather than configured some.
