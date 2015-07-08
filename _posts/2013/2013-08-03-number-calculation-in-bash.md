---
layout: post
title: "number calculation in bash"
description: ""
category: operation
tags: [bash]
---
{% include JB/setup %}

computation efficiency rank:  
`(()) == let > expr > bc `

1.`(())` and `let` is bash buildin command, which can execute efficiently  
2.`expr` and `bc` is system command, drain memory and low efficiency.  
3.`(())` `let` and `expr` can only do integer computation.  
4.`bc` can do float computation.  

`(())`
{%highlight bash%}
value=$((3*(5+2)))
((value++))
{%endhighlight%}


`let`
{%highlight bash%}
let "value=3*(5+2)"
let value++
{%endhighlight%}


`expr`
{%highlight bash%}
value=`expr 3 \* \( 5 + 2\)`
value=`expr $value+1`
{%endhighlight%}


`bc`
{%highlight bash%}
value=`echo "3*(5+2)" | bc`
value=`echo "$value+1" | bc `
{%endhighlight%}
