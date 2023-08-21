---
layout: post
title: "Verification for C variable pointer"
description: ""
category: development
tags: [c]
date: 2015-05-06
---
Well, since the first time I got in touch with pointer in C, this guy has confused me a little bit. About three years ago I made a experiment to clarify its properties, but in another blog.  
I am gonna rewrite a better version in here.  

## int
```c
# include<stdio.h>
# include<stdbool.h>
# include<stdlib.h>
int main()
{
    //This test is quite straight forward
    int data=123;
    int* p=&data;
    printf("Content of variable: %d\n",data);
    printf("Address of variable: %p\n",&data);
    printf("Content of pointer:  %p\n",p);
    printf("Derefer of pointer:  %d\n",*p);
    printf("Address of pointer:  %p\n",&data);
    return 0;
}
```
>Content of variable: 123  
Address of variable: 0x7fffa0916f64  
Content of pointer:  0x7fffa0916f64  
Derefer of pointer:  123  
Address of pointer:  0x7fffa0916f64


## array[]
```c
# include<stdio.h>
# include<stdbool.h>
# include<stdlib.h>
```


```c
int main()
{
    //You can see from this test
    //The address of first element is the address of variable
    //The distance between elements is determined by the type of element.
    //So 4 for int, 1 for char
    int data[]={98,33,10};
    int* p=data;
    printf("Derefer of pointer:  %d\n",*p);
    printf("Derefer of pointer:  %d\n",*(p+0));
    printf("Derefer of pointer:  %d\n",*(p+1));
    printf("Address of variable: %p\n",&data);
    printf("Address of variable: %p\n",&data[0]);
    printf("Address of variable: %p\n",&data[1]);
    printf("Content of pointer:  %p\n",p);
    printf("Content of pointer:  %p\n",(p+0));
    printf("Content of pointer:  %p\n",(p+1));
    printf("Address of pointer:  %p\n",&p);
    return 0;
}
```
>Derefer of pointer:  98  
Derefer of pointer:  98  
Derefer of pointer:  33  
Address of variable: 0x7fffba6fa500  
Address of variable: 0x7fffba6fa500  
Address of variable: 0x7fffba6fa504  
Content of pointer:  0x7fffba6fa500  
Content of pointer:  0x7fffba6fa500  
Content of pointer:  0x7fffba6fa504  
Address of pointer:  0x7fffba6fa4f8

## char*
```c
# include<stdio.h>
# include<stdbool.h>
# include<stdlib.h>
int main()
{
    //You can imagine there is a type called string
    //string data="rugal";
    //then every thing feels like them same as what have mentioned above
    char* p="rugal";
    //the %s option is different from others, it auto-derefer the data
    printf("Content of string : %s\n",p);
    printf("Derefer of pointer: %c\n",*p);
    printf("Derefer of pointer: %c\n",*(p+0));
    printf("Derefer of pointer: %c\n",*(p+1));
    printf("Content of pointer: %p\n",p);
    printf("Content of pointer: %p\n",(p+0));
    printf("Content of pointer: %p\n",(p+1));
    printf("Address of pointer: %p\n",&p);

    return 0;
}
```
>Content of string : rugal  
Derefer of pointer: r  
Derefer of pointer: r  
Derefer of pointer: u  
Content of pointer: 0x400904  
Content of pointer: 0x400904  
Content of pointer: 0x400905  
Address of pointer: 0x7ffff11f1eb8


## function*

```c
# include<stdio.h>
# include<stdbool.h>
# include<stdlib.h>
void t1(int data)
{
    printf("T1 %d\n",data);
}
void t2(int data)
{
    printf("T2 %d\n",data);
}
void (*function)(int);
int main()
{
    function=&t1;
    function(6);
    function=&t2;
    function(232);
    printf("Content of t1     :%p\n",t1);
    printf("Content of t2     :%p\n",t2);
    printf("Address of t1     :%p\n",&t1);
    printf("Address of t2     :%p\n",&t2);

    printf("Content of pointer:%p\n",function);
    printf("Address of pointer:%p\n",&function);
    return 0;
}
```

>T1 6  
T2 232  
Content of t1     :0x4007fd  
Content of t2     :0x40081e  
Address of t1     :0x4007fd   
Address of t2     :0x40081e  
Content of pointer:0x40081e  
Address of pointer:0x601048
