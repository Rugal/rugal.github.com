---
layout: post
title: "useful tips in Makefile"
description: ""
category: operation
tags: [c]
---
{% include JB/setup %}

This a useful Makefile, although it is not big.  
one can go with it when you want to do some stuff  

{%highlight Makefile%}
# 
CC="gcc -g3 -w -o $@" #make some optimization here
COMPILE="-c $<"       #compile most left .c file into intermediate
EXECUTABLE=Rugal.bin  #the binary file that can be executed
INTERMEDIATE=main.o
VPATH = header        #includes folder that container header file

${EXECUTABLE}:${INTERMEDIATE}
        ${CC} $^
${INTERMEDIATE}:main.c util.h
        ${CC} -I ${VPATH} ${COMPILE}

clean:
        rm -rf *.so
        rm -rf *.o
        rm -rf ${EXECUTABLE}
{%endhighlight%}

tips:  

        $@   target file
        $^   all files in dependency list
        $<   the first file in dependency list
        -E   pre-compiled file
        -S   assemble file
        -c   intermediate file
        -o   output file

## reference problem in multi-folders
all the `.h` need relative path from reference directory.  

`$CC  -I includedir   $COMPILE`  the `includedir` is madatory，it defined search path that used in gcc compilation.
