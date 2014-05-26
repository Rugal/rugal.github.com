---
layout: post
title: "awk in practise"
description: ""
category: operation
tags: [bash,awk]
---
{% include JB/setup %}
I recently made a contribution to my friend's affair that need to batchly vote on a java website  
Hence I write a bash script to deal with this, at the meantime, I have learnt a lot of things about `bash`. 
{%highlight bash%}
function getParameter()
{
    if [ $1 == "" ]
    then
        exit
    fi 
    DATA=$(cat $DATA_FILE)
    PATTERN=$1
    pos=$(echo | awk -v "DATA=$DATA" -v "PATTERN=$PATTERN" '{print index(DATA,PATTERN)}')
    #find JSON parameter name
    subed=$(echo ${DATA:$pos-1+${#PATTERN}+3})
    #positionize
    pos=$(echo | awk -v "DATA=$subed" -v "PATTERN=\"" '{print index(DATA,PATTERN)}')
    #positionize first " in JSON
    value=$(echo ${subed:0:$pos-1})
    #subtract JSON parameter value
    echo $value
}
{%endhighlight%}
