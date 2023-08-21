---
layout: post
title: "printing under command line"
description: ""
category: operation
tags: [linux]
date: 2015-01-16
---
Long time no see! Today I am going to have a very exciting thing:  
`printing under command line in linux`  
Which is very useful if you need to do the work very fluently!  
First install `cups` and its pdf converter by:  

```shell
sudo apt-get install cups  cups-pdf
```

After this, you should have both `lpstat` and `lp` commands.  
if your computer get right connected with printer(cups will install some printer drivers on your PC).  
Now let us see what printers you can access to.  

```shell
sudo lpstat  -p #show printer with their working status
```


    [rugal@domba-06 mnt]> sudo lpstat  -p
    printer cms is idle.  enabled since Mon 11 Aug 2014 01:59:05 PM CDT
    printer Coral is idle.  enabled since Fri 16 Jan 2015 01:26:41 PM CST
        Data file sent successfully
    printer Diamond is idle.  enabled since Fri 16 Jan 2015 02:01:54 PM CST
        Data file sent successfully
    printer Emerald is idle.  enabled since Fri 16 Jan 2015 02:07:52 PM CST
        Data file sent successfully
    printer Fluorite is idle.  enabled since Wed 23 Sep 2009 05:05:04 PM CDT
    printer Mail is idle.  enabled since Tue 08 Jan 2013 01:24:36 PM CST
    printer Opal is idle.  enabled since Fri 16 Jan 2015 09:58:30 AM CST
        Data file sent successfully
    printer Zircon is idle.  enabled since Thu 15 Jan 2015 12:08:59 PM CST



```shell
sudo lpstat  -s #show printer with URI
```

    no system default destination
    device for cms: socket://130.179.25.7:9100
    device for Coral: pacups-lpd://coral/
    device for Diamond: pacups-lpd://diamond/
    device for Emerald: pacups-lpd://emerald/
    device for Fluorite: pacups-socket://fluorite/
    device for Mail: mailto://cs.umanitoba.ca/application/pdf
    device for Opal: pacups-lpd://opal/
    device for Zircon: pacups-socket://zircon/


Take instance if you want to print something with `Diamond` printer, you need to:  
```shell
lp -d Diamond filename
```

Also in `lp` you could specify a lot of printing options, for instance do `two side` printing if your printer supported:  

```shell
lp -o sides=two-sided-long-edge -d Diamond filename
```

But the bad thing is, you could only print `txt` and `pdf` files, still a long way to go!  
I cannot wait to use it! Have a try!
