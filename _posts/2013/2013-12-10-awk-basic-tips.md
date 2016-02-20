---
layout: post
title: "awk basic tips"
description: ""
category: operation
tags: [bash,awk]
---
{% include JB/setup %}
{%highlight awk%}

FILENAME #current file name
FNR      #record number in current file
FS       #field delimiter
RS       #record delimiter
NF       #field number in current record
NR       #records number till now

awk 'match pattern {action}'
awk '/101/'     #regexp match the line that has 101
awk '$1 == 5'   #match the line that the value of first column equal 5
awk '/$1/'      #match the line that has $1, which is bash parameter passed from above
awk '$1 * $2 >100' #match the line that column 1 multiply column 2 greater than 100
awk '$2>5 && $2<=15' #match line according to its logic

awk '/100/{print $1}' #print column 1 if that line has string of 100

awk -v "DATA=$DATA" -v "PATTERN=$PATTERN" '{print index(DATA,PATTERN)}'
# get index from $DATA to match $PATTERN, start from 1
# $DATA and $PATTERN can pass from bash
{%endhighlight%}
