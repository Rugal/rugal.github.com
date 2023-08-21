---
layout: post
title: "number calculation in bash"
description: ""
category: operation
tags: [bash]
date: 2013-08-03
---

computation efficiency rank:  
`(()) == let > expr > bc `

1.`(())` and `let` is bash buildin command, which can execute efficiently  
2.`expr` and `bc` is system command, drain memory and low efficiency.  
3.`(())` `let` and `expr` can only do integer computation.  
4.`bc` can do float computation.  

### (())
```shell
value=$((3*(5+2)))
((value++))
```

### let
```shell
let "value=3*(5+2)"
let value++
```

### expr
```shell
value=`expr 3 \* \( 5 + 2\)`
value=`expr $value+1`
```

### bc
```shell
value=`echo "3*(5+2)" | bc`
value=`echo "$value+1" | bc `
```
