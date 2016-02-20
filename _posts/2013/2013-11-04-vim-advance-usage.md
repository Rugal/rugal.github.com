---
layout: post
title: "Vim advance usage"
description: ""
category: operation
tags: [vim]
---
{% include JB/setup %}
## increase or decrease number:  
input a number, then ESC to enter normal mode, and press `C-a` or `C-x` to increase
or decrease respectively by 1.  

## find character in current line:  
{%highlight vim%}
<number>f<character>
{%endhighlight%}
where `character` is the character  
`f` is fixed  
`number` is the appeared number of c  
hence this
command will find and stay at the n time appearance of c in current line if has
that times,  
or it will stay at the last position if not.  
![position](http://githubpage.u.qiniudn.com/line_moves.jpg)


## area action
{%highlight vim%}
<action><range><object>
{%endhighlight%}
`action` includes y d v, just like their own job  
`object` includes:  w=word   s=sentence  p=paragraph  
        ()  ""  ''  []  {}   means the content in them  
`range` is a or i which means all and inside respectively. this will make
significance when object is parentheses

![position](http://githubpage.u.qiniudn.com/textobjects.png)

## block operation
{%highlight vim%}
<C-v><spread area><your action>ESC
{%endhighlight%}
`C-v` to start block operation  
`spread area` means you can move by hjkl to spread the block operation
affecting area  
`your action` is any action that you want to do all these lin, but if input
something, you need to type I as input signal  
`ESC` you have to type ESC to make it execute to each line you spreaded  

for the instance below the command is `C-v jjj I-- ESC`  
![position](http://githubpage.u.qiniudn.com/rectangular-blocks.gif)


## macro record
{%highlight vim%}
q<cache><any operation>q "to record this operation
<times>@<cache>   "to play this operation
{%endhighlight%}
`cache`  can be any key, even q itself, which means you store this macro in
this key.  
`times` is how many times you want to replay this operation, with no input of
times means just 1 times.   

the example below is start from normal mode:  
`i1 ESC q21yyp C-a q`  and  `@2` and  ` 100@@ `   
`q2` is store all operation in cache named 2;  
`@2` can read and execute operation store in cache 2;  
`100@@` means to execute last played macro for 100 times  
  
![position](http://githubpage.u.qiniudn.com/macros.gif)

