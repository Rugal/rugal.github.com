---
layout: post
title: "some study about DNS"
description: ""
category: operation
tags: [network]
---
{% include JB/setup %}
###A record
A record means mapping with a ip address which binded with a host  
This record is elementary configuration for http request  

###NS record
NS record is to let another nameserver to resolve this domain name  
used for DNS resolvation only.  

###MX
MX is used when a client send a email which contain `XXX@name.com`, then it will search the `name.com` in MX record to identify which host it resolve to .  
used for mail address resolvation only.  

###CNAME
CNAME just like a nick name for a already defined A record host.  
using CNAME can enhance resolve capability while pointing to identical host.  
for instance: there is a define A record `rugal.ml`, and I want to make `www.rugal.ml` as well as `blog.rugal.ml` point to the host.  
as I can achieve it by  making double CNAME record which point to the `rugal.ml`.  

###TXT
TXT have no other usefulness but to tell client about comments on of a named site  
