---
layout: post
title: "X11 forward, Xorg is C/S based"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
It has been a very long time that I came into such feeling: `How could that be???`.   
Yes, You may encounter such situation that you need to invoke an application than needs `Xorg` or desktop support connecting from remote server, but you are just using terminal emulator such like `putty`, how to do that?  
Well long before I realize this thing, I know Xorg is actually a `C/S` architecture software, the remote server is `S`, which provide all applications you need; your local implementation is client, such as 'Xming' in windows.  

First of all you need to install `Xming` if you are using `Win`, do not forget to launch it.  
Now configure the `putty` in session configuration window followed by `Connection->SSH->X11`, under that tab, check on `enable B11 forwarding` and mark the forwarding location(Which I will explain later).  

If you do not know the display location, you could just by trying to launch an desktop application, say, in my situation, first I let the `location` blanked because I do not know its address, but checked the `enable`:  

    $ matlab
    Warning: Unable to open display 'localhost:10.0'.  You will not be able to display graphics on the screen.
    
    
Nice, now you get the display address, just fill it in that blank and reconnect.  

Magical right? Have a good day!
