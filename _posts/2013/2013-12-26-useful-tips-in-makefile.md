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

```makefile
# 
CC=gcc -g3 -w -o $@		#make some optimization here
HEADER=.
COMPILE=-I ${HEADER} -c $<      #compile most left .c file into intermediate
INTERMEDIATE=main.o my_string.o
EXECUTABLE=a.out      		#the binary file that can be executed

${EXECUTABLE}: ${INTERMEDIATE}
	${CC} $^
%.o: %.c
	${CC} ${COMPILE}

clean:
	rm -rf *.so
	rm -rf *.o
	rm -rf ${EXECUTABLE}

```

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
