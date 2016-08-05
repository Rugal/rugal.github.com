---
layout: post
title: "springmvc interceptor"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
`interceptors` is very useful in SpringMVC based Java Web application development. 
It is especially helpful when comes to authentication and authorization.  We can centralize permision management by using interceptor.  

Many documents online introduced the detailes of execution order and conception of interceptor.  After reading [javadoc]( http://docs.spring.io/spring/docs/3.2.4.RELEASE/javadoc-api/ ), I found something new beyond them.  



# Handler
Handler is the real method that deals with requests. Method that annotated with `@RequestMapping` is handler.   
Handler will be invoked only if all interceptors' `preHandler` method return `true`.    


# Execution chain
A chain that contains all the interceptors that need to execute, the order of execution depends on MVC configuration, so you can always reorder them if you want.   


# PreHandler

### execution sequence  
The execution order complys to execution chain.

### execution position
Execute after HandlerMapping determines an appropriate handler but just before invoking handler method

### result
If returns true in this method, next interceptor in execution chain or the handler if no more interceptor after it will be invoked.   
If returns false or throw exception in this method, `DispatcherServlet` assumes this interceptor has already taken care of the response itself.    

When throwing exception, servlet contain or controller advisor will handle the exception for you.   
When returning false, Spring will reply with the `HttpResponse` in method parameter. You can either fill something necessary in response object or redirect to somewhere else.  



# postHandler

### execution sequence:  
execution order in a invert order to execution chain.  

### execution position:  
  this method will be executed after handler actually invoked, and before `DispatcherServlet` render the view.  
### significance:  
  this method is to do some modification or surviliance the `ModelAndView` object.  


# afterCompletion

### execution sequence:  
execution order is invert with execution chain, thus first interceptor will be the last one to execute.  

### execution position:  
this method will only be called if this preHandler method is successfully executed and return true, which means throwing exception or returning false will not intended to enter this method.  
Will be invoked after view was rendered by `DispatcherServlet`  

### significance:  
This method is designed to do some cleanup work.  
