---
layout: post
title: "vim long line slowness"
description: ""
category: operation
tags: [vim]
date: 2014-09-04
---
Yes, it is very slow to have a long line copy or move within vim, which mostly due to the `syntax highlight` procedure as [explained](http://superuser.com/questions/302186/vim-scrolls-very-slow-when-a-line-is-to-long)   
Just as mentioned, three enhancement methods are:  

1. Turn off syntax highlighting with `:syntax off`.
2. Limit syntax highlighting with `:set synmaxcol=150` or some other value.
3. Break down your long line in smaller chunks with `:s/\s<a/<C-v><Enter><a`.

Method above could address the long line slowness problem, I tested it already.
