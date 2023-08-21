---
layout: post
title: "Vim plugins for Clojure"
description: ""
category: development
tags: [clojure, vim]
date: 2015-12-21
---

## [vim-salve](https://github.com/tpope/vim-salve)

>:Console   
command to start a REPL or focus an existing instance if already running using dispatch.vim  
>:Console!  
command to start a REPL or focus an existing instance if already running using dispatch.vim  

## [vim-dispatch](https://github.com/tpope/vim-dispatch)

### Foreground build

>:Make  
Using under `tmux` will horizontally split current vim window to initial a lein session; Make use of the `make` in vim  
>:Dispatch  
Using under `tmux` will horizontally split current vim window to initial a lein session  

### Background build

>:Make!  
>Using under `tmux` will create a new tmux window and exit if building finished; make use of the `make` in vim  
>:Dispatch!  
>Using under `tmux` will create a new tmux window and exit if building finished  

### Spawning interactive processes
>:Start lein repl  

## [vim-fireplace](https://github.com/tpope/vim-fireplace)

### Navigating and Comprehending

`:Source`, `:Doc`, and `:FindDoc`, which map to the underlying clojure.repl macro (with tab complete, of course).  
`K` is mapped to look up the symbol under the cursor with doc.  
`[d` is mapped to look up the symbol under the cursor with source.  
`[<C-D>` jumps to the definition of a symbol (even if it's inside a jar file).  
`gf`, everybody's favorite "go to file" command, works on namespaces.  

### Evaluating from the buffer

`cqq` prepopulates the command-line window with the expression under the cursor.   
`cqc` gives you a blank line in insert mode.   
`cp` operator that evaluates a given motion    
`cpp` for the innermost form under the cursor.   
`cm` and `c1m` are similar, but they only run `clojure.walk/macroexpand-all` and `macroexpand-1` instead of evaluating the form entirely
