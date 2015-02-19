---
layout: post
title: "Java is pass by reference and pointer eliminated?"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
In many blogs and documents, people will say, Java is already eliminat pointer, hence what java pass as parameter is value, the `thing` that pass through method parameter list is named `reference`  
Let us review what reference and point like in C/C++, which is the most standard stem of program  
{%highlight c++%}
#include<stdio.h>
int main()
{
    int data=100, example=3;
    int* pointer=&data;
    int& refer=data;
    printf("%d %d %d\n", data,*pointer,refer);
    data=20;
    printf("%d %d %d\n", data,*pointer,refer);
    *pointer=50;
    printf("%d %d %d\n", data,*pointer,refer);
    refer=70;
    printf("%d %d %d\n", data,*pointer,refer);
    pointer=&example;
    printf("%d %d %d\n", data,*pointer,refer);
    refer=example;
    printf("%d %d %d\n", data,*pointer,refer);

	return 0;
}
{%endhighlight%}
print result:  

    100 100 100
    20 20 20
    50 50 50
    70 70 70
    70 3 70
    3 3 3

from this instance, we got to know three things:  

1. variable, pointer and reference have the capability to change the value of variable.  
2. pointer is a kind of method that will affect variable it pointed to, but it can not change value if this pointer is pointing to another variable (sounds like bullshit!).  
3. reference is a kind of alias that also behave like pointer, but what alias mean is the variable and reference are binded together, when reference or variable changed, the other one also varied.  


After review pointer and reference behavior in C++, now let us see what that behave in `Java`  
{%highlight java%}
public class Main
{
   public static void main(String[] args)
    {
        String a = "Rugal";
        System.out.println("outer before "+a);
        change(a);
        System.out.println("outer after "+a);
    }

    public static void change(String original)
    {
        System.out.println("inner before "+original);
        original="Bernstein";
        System.out.println("inner after "+original);
    }
}
{%endhighlight%}
What do you think of the system print are?  
According to definition of `reference`, the result should be:  

    outer before Rugal
    inner before Rugal
    inner after Bernstein
    outer after Bernstein

also, official document said that in java, the thing that passed is called `reference`, which ambiguously confused many java developer.  
pitfally, the actual print is:  

    outer before Rugal
    inner before Rugal
    inner after Bernstein
    outer after Rugal

the `outer after Rugal` means inner `original` ref is not the same thing in outer `a`.  
which is not an alias like `referece` in C++.  
Do you feel puzzled? because they said java is passed by value, and there is no more pointer.
what is wrong with you? what is wrong with me?  

To keep you clarified, Let me explain this to you   

###hint one:  
there is no one to gurrantee `reference` in java is what `reference` like in `C/C++`  

###hint two:  
Don't you think this so called `reference` in java behave just like what pointer do in `C/C++`  


now you got to know that `Java reference` is what pointer behave in `C/C++`  
Even if official documentation demonstrated there is no more pointer in Java, and the thing pass through method is called `reference` is a mendacity, or maybe it is just a conception that result from ambiguity, nobody knows   

Thus let us make a deal, that Java is pass-by-value, because what passed into parameter list is the actual address value of a object.  
But here is a thing, all the so called `reference` in java is not what `reference` behave in C++, it is more likely with `pointer`. nevertheless, this `pointer` do not have the capability to dereference the address of which it point to.  

##conclusion
Java is indeed `pass-by-value` but the reference is just actually a fundamental functionalitied `pointer`.
