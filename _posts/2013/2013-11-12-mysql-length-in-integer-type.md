---
layout: post
title: "mysql length in integer type"
description: ""
category: operation
tags: [mysql]
---
{% include JB/setup %}
For a very long time not only me but also my friends think that types like
int(1) and tinyint is almost the same. In that way, int(1) has no disparate
with tinyint and int(10) has no difference with bigint.  
is that correct?  

## Actually is not true

As a matter of fact, in mysql database that `number` in `int(number)` represent
only displaying length, which is just to show the length of number of digits in
console when use 'zerofill' function, rather than storage length.  

Hence, the number or another calling bits has no significance in mysql type
definition.  

`TINYINT[(M)] [UNSIGNED] [ZEROFILL]`  
A very small integer. The signed range is -128 to 127. The unsigned range is 0 to 255.  

`INT[(M)] [UNSIGNED] [ZEROFILL]`   
A normal-size integer. The signed range is -2147483648 to 2147483647. The unsigned range is 0 to 4294967295.  

`BIGINT`  
from -2^63 (-9223372036854775808) to 2^63-1 (9223372036854775807) all intege type, the storage space is 8 bytes.
