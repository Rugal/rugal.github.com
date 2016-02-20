---
layout: post
title: "springmvc interceptor"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
In the developement of Java web or JavaEE application, that `interceptors` or something like `filters` is of great use!  

With useful proxy method before execute handler method, to secure the prerequisite or do some cleanup work, I am keen on interceptor while developing with springmvc  

Even many articles on website introduced the details of sequence or conception of interceptor, after googling and reading [javadoc]( http://docs.spring.io/spring/docs/3.2.4.RELEASE/javadoc-api/ ), I found something new beyond them.  



## handler
handler is the real method that deal with request, which in springmvc is the methods that have `@RequestMapping` on it.  
handler will be executed only if all interceptors' preHandler method return true  


## execution chain
a chain that contain all the interceptors that need to execute, way and order are defined manually  


## preHandler
1. execution sequence:  
  the execution order comply to execution chain.
2. execution position:  
  execute after HandlerMapping determined an appropriate handler but just before invoking handler method
3. result:  
  if return true in this method, next interceptor in execution chain or the handler if no other interceptors after it will be invoked.  
  if return false or throw exception in this method, `DispatcherServlet` assumes this interceptor has already taken care of the response itself.  


## postHandler
1. execution sequence:  
execution order in a invert order to execution chain.  
2. execution position:  
  this method will be executed after handler actually invoked, and before `DispatcherServlet` render the view.  
3. significance:  
  this method is to do some modification or surviliance the `ModelAndView` object.  


## afterCompletion
1. execution sequence:  
execution order is invert with execution chain, thus first interceptor will be the last one to execute.  
2. execution position:  
this method will only be called if this preHandler method is successfully executed and return true, which means throwing exception or returning false will not intended to enter this method.  
Will be invoked after view was rendered by `DispatcherServlet`  
3. significance:  
This method is designed to do some cleanup work.  
