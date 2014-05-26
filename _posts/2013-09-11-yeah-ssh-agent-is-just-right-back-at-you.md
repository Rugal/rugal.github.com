---
layout: post
title: "yeah~ ssh agent is just right back at you"
description: ""
category: operation
tags: [ssh]
---
{% include JB/setup %}
Feel tired of retyping your passphrase again and again over endless git push and pull?  

Fell exhausted when taking care of security issue while so fussy to remember or copy password in ssh connection?  

please just try on this "ssh-agent"  

With just some few command makes it efficiency to work with ssh tunnel!  
`ssh-agent`  
which startup a agent for you in ssh connection  
`ssh-add $YOUR_PRIVATE_KEY`  
this command will automatically scan default private key files named id_rsa or
id_dsa some sorts, you can also put your own private key file name here. Then it will ask you to type just once passphrase once for each private key.  

After that, you will not being asked to type that anymore. Actually, this
passphrase is stored in memory to ensure the access speed and passphrase
security.Hence every time logon to your Linux will be required to retype once
only.  

Remember its high efficiency! Only after using it will you got to know that!
##In some situation 
It will occur `Could not open a connection to your authentication agent`, this is because the ssh-add tool can not recognize the right PID that declared by ssh-agent  
By execute `` eval `ssh-agent` ``  
After register the pid of ssh-agent, make it available to connect with ssh-daemon.  
