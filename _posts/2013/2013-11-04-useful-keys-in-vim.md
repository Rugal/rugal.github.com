---
layout: post
title: "useful keys in Vim"
description: ""
category: operation
tags: [vim]
---
{% include JB/setup %}
{%highlight vim%}
w     next word's first character      

e     next word's last character

b      last word's first character

x      delete the current character

X     delete the character before current one

0      back to the number 1 column of this line

$      move to the last column of this line

^      move the the first character of this line(not blank character)

[       move to the last paragraph (divided by some new line characters)

]       move to the next paragraph (divided by some new line characters)

G     to the last line of this passage

gg    to the first line of this passage

dd    delete the whole current line

D     delete a string from current character to the end of this line

i      change into insert mode and the cursor stay in original place

I      change into insert mode and cursor move to the first character of this line (not blank char)

f      find the next character provided

F     find last character provided

a    change into insert mode and cursor move to the next place

A    change into insert mode and cursor move to the end column of this line

o     change into insert mode the cursor create a new line under current line

O    change into insert mode the cursor create a new line above current line

y     copy the character

n CTRL-w <|>|+|-   move current window for n length

:vertical resize 40       "resize the window
{%endhighlight%}
