---
layout: post
title: "useful tool: CMAKE"
description: ""
category: development
tags: [c]
---
{% include JB/setup %}
I think CMAKE is a much better makefile generator than automake, here is my text procedure:  
listing below is my project catalog view:
{%highlight properties%}
/project-root/-------CMakeLists.txt 
          |
          |----------build/
          |
          |----------src/------main.c
                      |
                      |--------include/------util.h
                      |
                      |--------backend/
{%endhighlight%}
Here I will introduce the usage of these files:  
1.CMakeLists.txt file is the cmake configure file which is the most important file in this project mayby.  
2.src folder is a place where source code in, and I put the main.c file just at the root of src folder. Other files can be easily recognized literally.  
3.build folder is a place where generated source and object file exists, which have no need to stay with source code.  

src/include/util.h   this is a head file which just include some useful macro defines
{%highlight c linenos=table%}
# pragma once
# define TYPE int
# define SWAP(a,b) ((a^=b);(b^=a);(a^=b))
# define NULL 0
# define bool int
# define false 0
# define true 1
{%endhighlight%}
src/main.c
{%highlight c linenos=table%}
# include<stdio.h>
# include"util.h"
int main()
{
        TYPE a=2;
        printf("%d\n",a);
        printf("Rugal Bernstein\n\n");
        return 0;
}
{%endhighlight%}
cmake configuration file
{%highlight cmake%}
cmake_minimum_required(VERSION 2.6) 
# define cmake compiler version
PROJECT(Rugal C)                    
# name of project and programming language
SET(SRC_LIST src/main.c)            
# please list all .c files that need to compile
INCLUDE_DIRECTORIES(src/header)     
# please list all user define include folder and external link head
ADD_EXECUTABLE(Rugal ${SRC_LIST})   
# executable file name, which just compile ${SRC_LIST} into in.
SET(CMAKE_C_FLAGS "-O0 -ggdb -w -std=c99")  
# some flags that needs to set as you wish
SET(LIBRARIES libm.so)              
# also you can set external library in set command
TARGET_LINK_LIBRARIES(Rugal ${LIBRARIES})  
# never forget to link them with executable file
{%endhighlight%}
After this, just cd into build folder and type
    `cmake ..`
which means read `CMakeLists.txt` configuration file from outside the build folder.  
And now you will have a good Makefile for you to `make`  
enjoy your `CMAKE`!
