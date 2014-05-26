---
layout: post
title: "cmdline maven integreted with eclim"
description: ""
category: operation
tags: [vim,java,maven]
---
{% include JB/setup %}
1.Install JDK into your linux.

2.Download [eclim.jar](http://eclim.org/install.html#download "download eclim") in your home path for convenient, for me, it is `/home/rugal/eclim.2.2.6.jar`  

3.To configure headless or no GUI eclipse server, you have to use xvfb to imitate GUI.  
`$  sudo apt-get install xvfb build-essential`  

4.Download and extract [eclipse](http://www.eclipse.org/downloads/ "download eclipse") into your favourate path, just standard eclipse can also meet requirements, as for me I extracted eclipse to `/usr/local`, hence the elipse home path is `/usr/local/eclipse`  

5. Our next step is to install the eclim with headless environment:  
{%highlight bash%}
   $   java   
        -Dvim.files=$PATH_OF_.VIM_FOLDER   
        -Declipse.home=$PATH_OF_ECLIPSE_HOME   
        -jar $PATH_OF_eclim.jar install  
{%endhighlight%}

6.After got your eclim installed in eclipse home path, now your eclim can
control eclipse as server, what we do next is to start the imitated GUI up:  
`$  Xvfb :1 -screen 0 1024x768x24 & ; DISPLAY=:1 $PATH_OF_ECLIPSE/eclimd start`

7.The procedures above have already successfully deployed all the eclim server on your system, and started the headless server up, now let try eclipse in vim with maven on:  
  1.`cd` into the root position of your maven project where `pom.xml` is.  
  2.generate eclipse's classpath file in this directory with `mvn eclipse:eclipse`  
  3.open your pom.xml file with vim, then type `:MvnRepo`  in vim to set the correct local maven repository into this project with maven  
  4.execute `:ProjectImport .` in vim to import current project into eclipse.  

8.Enjoy eclipse integrated with maven programming in Vim
