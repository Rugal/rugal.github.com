---
layout: post
title: "invoke bash functions in xargs"
description: ""
category: operation
tags: [bash]
date: 2014-03-31
---
As `xargs` could `MapReduce` multiple lines of input into segregated input, Recently I keen to use it to tackle with many situation that need to use a bash loop.  
But I find I could not pass parameters to `xargs` if I want to invoke functions in it.  
This may happen if you need functional programming, but xargs could hardly achieve it at a glance.  
You can not invoke functions that defined in same file with `xargs` command because after retrieving the `$PATH`, `xargs` could not got this function.  
What you need to do is to register this function, or just `export -f` it.   

```shell
# !/bin/bash

# define a function
function tackle()
{
    echo $1
}

# export function: tackle
export -f tackle

# use bash -c to execute function: tackle
xargs -a b -I{}  bash -c "tackle {}"
```

Just as comments explains in script, use `export -f ` to export a bash function.  
Then use `bash -c functionName` to invoke this function in `xargs`.  
I reckon it will be much popular and hacky to use `xargs` in the future.  
Hard to imagine how the ancient `UNIX` engineers figure out it! It is fabulous!
