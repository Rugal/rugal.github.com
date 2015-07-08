---
layout: post
title: "compile vim with python interceptor"
description: ""
category: operation
tags: [vim, python]
---
{% include JB/setup %}

1. Download Vim from Mercurial repository:  
`hg clone https://vim.googlecode.com/hg/ vim;hg pull;hg update`  

2. install python develope package   
`sudo apt-get install python2.7-dev`  
`sudo apt-get build-dep vim`  

3. install Vim with python configure directory:
{%highlight bash%}
./configure --enable-gui=auto \
            --with-x=yes \
            --enable-multibyte \
            --enable-pythoninterp \
            --with-features=huge \
            --with-python-config-dir=/usr/lib/python2.7/config \   
            --enable-cscope 
make && sudo make install
{%endhighlight%}

Beware of the `with-python-config-dir` is different according to your system, check the python configure directory by your own.
