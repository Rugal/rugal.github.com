---
layout: post
title: "vim text width and line wrap"
description: ""
category: operation
tags: [vim]
---
{% include JB/setup %}
I have found my Vim always wrap my line while I am doing my coding procedure, it is really uncosy behavior when I want to fix the format of what it looks like.  
Here is the solution:  
`set textwidth=n` or `set tw=n` to set the width of text to trigger wrap.  
Also, you could disable this funcionality with `set textwidth=0`  

##apply line wrap in specific line
Bring the cursor at the beginning of the text you want to format and type `gq` and press `$` to format a large line.  
vim will wrap it automatically at your assigned textwidth.  
This option may be useful in some situations, but probably is not what you are looking for.  

##hard and soft wrap
The above methods will do a "hard" wrap of your text, by inserting newline characters. An alternative method is a "soft" wrap which does not change the text but simply displays it on multiple lines.  
This can be achieved with:  
`set wrap linebreak nolist`  
Note that this may lead to a bunch of screen lines being taken up by only a single "real" line, so commands like j and k which move on real lines will skip over a lot of screen lines. You can use gj and gk to move by screen lines.
