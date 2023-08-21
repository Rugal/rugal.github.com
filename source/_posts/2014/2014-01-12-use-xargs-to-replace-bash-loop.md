---
layout: post
title: "use xargs to replace bash loop"
description: ""
category: operation
tags: [bash]
date: 2014-01-12
---
I have no solution toward multi-options dealing command, When I come across this, I will have a bash script to achieve it.  
But now, I find a ancient but marvel tool in linux called `xargs`.  

By using `xargs`, I could skip the loop in bash for many situations.  

```shell
for file in `ls`
do
    #some processes or modifications to the $file.
    #here I just use echo as an example!
    echo $file" rugal"
done
```

The bash script shown above is what I used to do when I need to batchly dealing with folder files. But now, I could do it with only one line command:  

```shell
ls | xargs -I% echo "% rugal"
# it use % to represent string from previous command
# execute the command after it one by one!
```
Wow, how briliant is it, which save a lot of time and energy on writing and meditating bash structure.  
But actually there can be more usefulness by ultilizing `xargs`, for instance in `find` command, you can implement complex command in just one line, instead of using bash looping.  

```shell
find . -name "*.back" |xargs rm
# to remove files that suffixed as .back

find . -name "*.back" |xargs -I% mv % old_folder
# to move back files into old folder for cleaning
```
More usage about the `xargs`, please refer to `man xargs`.  
