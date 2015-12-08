---
layout: post
title: "Java Proxy Class"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

Java has 2 kinds of proxy, `static` and `dynamic`.  
I will introduce them one by one. But for demonstrating usage, I need to declare several java bean here.  
{%highlight java%}
public interface Work
{
    void print();
}
public class WorkImpl implements Work
{
    @Override
    public void print()
    {
        System.out.println("Invoking print in WorkImpl class");
    }
}
{%endhighlight%}
These 2 classes are common ones for later tests.

##Static Proxy
`Static proxy` means to build the proxy before runtime, so static proxy class needs to be compiled for usage. In addition, static proxy needs to implement all involved proxyed methods, which is really painful.  
{%highlight java%}
public class WorkProxy implements Work
{
    private final Work proxyedWork;

    public WorkProxy(Work real)
    {
        this.proxyedWork = real;
    }

    @Override
    public void print()
    {
        System.out.println("Before");
        this.proxyedWork.print();
        System.out.println("After");
    }
}
{%endhighlight%}
Quite straight forward, static proxy is a simple wrapper that implement the same interface.  
But be aware, you need to implement all method for wrapping one class. This is reall tedious, especially if all wrapping functions are the same.  

{%highlight java%}
//Test code
public class StaticWorkTest
{
    @Test
    public void testWork()
    {
        Work work = new WorkImpl();
        WorkProxy proxy = new WorkProxy(work);
        proxy.print();
    }
}
{%endhighlight%}

##Dynamic Proxy
`Dynamic proxy` means to proxy methods during runtime. Dynamic proxy need to setup only one method for encapsulating. But for the convenience, performance is sacrificed. Dynamic proxy is 100 times slower than static one.   
Actually there are two dynamic proxies: one is the Java supported interface way, another is CGlib based. I will showcase them later on.   

###InvocationHandler
{%highlight java%}
{%endhighlight%}

{%highlight java%}
{%endhighlight%}

###CGLIB
{%highlight java%}
{%endhighlight%}
