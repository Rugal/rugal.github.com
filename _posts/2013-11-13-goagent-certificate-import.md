---
layout: post
title: "goagent certificate import"
description: ""
category: operation
tags: [proxy]
---
{% include JB/setup %}
##problem
Some website will encounter the problem that `SSL website security certificate
is not trusted`, this is the problem that goagent ssl certificate was not
import into chrome brower.  

##solution
`chrome --> settings --> HTTPS/SSL --> Manage certificates: `  
click `Authorities` tab, click `Import...`  
then find certificate file `$GOAGENT/local/CA.crt` and import it.  
after the import just check all `trust` box on which means you have already
trust this certificate while browsing.  
After that, please restart Chrome to activate this certificate and now you can
do further goagent surfering.  


###I assume I will never encounter such situation if I could study abroad!  
#So I need FIGHTING
