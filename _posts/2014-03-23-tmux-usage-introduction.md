---
layout: post
title: "tmux usage introduction"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}

Replacement installation:
{%highlight bash%}
#To install 1.8 version of tmux
sudo add-apt-repository ppa:pi-rho/dev
sudo apt-get update
sudo apt-get install tmux
{%endhighlight%}

Usage:
{%highlight bash%}

CTRL+B % #vertically split
CTRL+B " #horizontally split

CTRL+B <ANY ARROW> #Move focus to window

CTRL+B  z #toggle current panel as full screen

CTRL+B c #create new window

CTRL+B <window number>  #switch between windows

CTRL+B d  #detach window

tmux ls #list tmux windows

tmux attach -t 0 #reattach window

tmux kill-session -t 0  #kill a session

{%endhighlight%}
