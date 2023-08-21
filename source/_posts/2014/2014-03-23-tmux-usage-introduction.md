---
layout: post
title: "tmux usage introduction"
description: ""
category: operation
tags: [linux]
date: 2014-03-23
---

[cheatsheet](https://tmuxcheatsheet.com)

assume `CONTROL` key is `CTRL + b`

## session

function | command
---|---
create | `$ tmux`
delete | `$ tmux kill-session -t NAME` 
list| `$ tmux ls`, `CONTROL s`
rename| `CONTROL $`
attach | `$ tmux a -t NAME`
detach | `CONTROL d` 

## window

function | command
---|---
create | `CONTROL c`
delete | `CONTROL &`
list| `CONTROL w`
rename| `CONTROL ,`
select | `CONTROL [0...9]`

## pane

function | command
---|---
create| `CONTROL %`, `CONTROL "`
close| `CONTROL x`
show|  `CONTROL q`
move| `CONTROL {`, `CONTROL }`
select| `CONTROL q [0...9]`
zoom| `CONTROL z`
convert | `CONTROL !`


## copy mode

function | command
---|---
enter copy mode | `CONTROL [`
start selection | `SPACE`
copy selection | `ENTER`
paste buffer | `CONTROL ]`
show buffer | `:show-buffer`, `:showb`
browse buffers | `:list-buffers`
delete buffer #1 | `:delete-buffer -b 1`, `:deleteb -b 1`
save buffer to file | `:save-buffer buf.txt`
copy entire pane | `:capture-pane`
