---
layout: post
title: "Java Proxy Class"
description: ""
category: development
tags: [java]
date: 2015-12-07
---

# Introduction

Java has 2 kinds of proxy, `static` and `dynamic`.  
I will introduce them one by one. But for demonstrating usage, I need to declare several java bean here.  
```java
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
```
These 2 classes are common ones for later tests.

# Static Proxy
`Static proxy` means to build the proxy before runtime, so static proxy class needs to be compiled for usage. In addition, static proxy needs to implement all involved proxyed methods, which is really painful.  
```java
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
```
Quite straight forward, static proxy is a simple wrapper that implements the same interface.  
But be aware, you need to implement all method for wrapping one class. This is reall tedious, especially if all wrapping functions are the same.  

```java
public class StaticWorkTest
{//Test code
    @Test
    public void testWork()
    {
        Work work = new WorkImpl();
        WorkProxy proxy = new WorkProxy(work);
        proxy.print();
    }
}
```

# Dynamic Proxy
`Dynamic proxy` means to proxy methods during runtime. Dynamic proxy need to setup only one method for encapsulating. But for the convenience, performance is sacrificed. Dynamic proxy is 100 times slower than static one.   
Actually there are two dynamic proxies: one is the Java supported interface way, another is CGlib based. I will showcase them later on.   

>One thing I need to emphasis here is, even though I wrote subsection name with `Java Reflection` and `Code Generation`, they both utimately achieve proxy function by byte code generation. 

Still, Different way of dynamic proxying has different restriction, choose the best one to fit your project.  

## Java Reflection
In Java reflection supported dynamic proxy solution, the proxyed class has to implement one interface named `InvocationHandler`.   
```java
public class WorkProxy implements InvocationHandler
{
    private final Object object;

    private WorkProxy(Object object)
    {
        this.object = object;
    }

    public static Object bind(Object obj)
    {
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(),
                                      obj.getClass().getInterfaces(),
                                      new WorkProxy(obj));
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable
    {
        System.out.println("Before Reflection");
        Object result = method.invoke(object, args);
        System.out.println("After Reflection");
        return result;
    }
}
```
As you can see, class want to be proxied has to implement `InvocationHandler` interface. This is the only restriction of Java Reflection supported dynamic proxy.  
```java
public class WorkTest
{//Test class
    @Test
    public void testWork()
    {
        Work proxyedWork = (Work) WorkProxy.bind(new WorkImpl());
        proxyedWork.print();
    }
}
```
But because we could only proxy interface implemented classes, we are unable to make use of this method in some cases.  


## Code Generation
So to solve this problem, [CGLib](http://search.maven.org/#artifactdetails%7Ccglib%7Ccglib%7C3.2.0%7Cjar) provisioned another way to proxy dynamically.  
By generating `subclass` of the target, this dynamic proxy method now could proxy any class except those with `final` ones.  

```java
public class WorkProxy implements MethodInterceptor
{
    public static Object getInstance(Object target)
    {
        Enhancer enhancer = new Enhancer();
        // call back
        enhancer.setCallback(new WorkProxy());
        enhancer.setSuperclass(target.getClass());
        // create proxy object
        return enhancer.create();
    }

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable
    {
        System.out.println("Before CG");
        method.invoke(proxy, args);
        Object result = proxy.invokeSuper(obj, args);
        System.out.println("After CG");
        return result;
    }
}
```
In this instance we build a class that implements a CGLib interface `MethodInterceptor`, but now we could proxy any `not final` classes by using this proxy class.  
```java
public class WorkTest
{//Test code
    @Test
    public void testWork()
    {
        Work proxyedWork = (Work) WorkProxy.getInstance(new WorkImpl());
        proxyedWork.print();
    }
}
```
