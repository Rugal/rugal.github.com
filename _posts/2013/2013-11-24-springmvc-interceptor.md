---
layout: post
title: "springmvc interceptor"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
`Interceptor` is very useful in SpringMVC based Java Web application development. 
It is especially helpful when comes to authentication and authorization.  We can centralize permision management by using interceptor.  

Many documents online introduce the detail of execution order and conception of interceptor.  After reading [javadoc]( http://docs.spring.io/spring/docs/3.2.4.RELEASE/javadoc-api/ ), I found something new beyond them.  



# Handler
Handlers are the actual method that deal with requests. Methods that are annotated with `@RequestMapping` are handlers.   
Handlers will be invoked only if all `preHandler` methods return `true`.    


# Execution chain

Execution chain are a chain that contains all the interceptors that need to execute. The order of execution depends on MVC configuration, so you can always reorder them if you want.   


# preHandler

### execution sequence  
The execution order complies to the execution chain.

### execution position
Executed after `HandlerMapping` determines an appropriate handler, but just before invoking handler method.

### result
If this method returns true, the next interceptor in execution chain, or the handler if no more interceptors after, it will be invoked.    
If this method returns false or throws an exception, `DispatcherServlet` assumes this interceptor has already taken care of the response itself.    

When throwing an exception, the servlet container or a controller advisor will handle the exception for you.   
When returning false, Spring will reply with the `HttpResponse` in the method parameter. You can either fill something necessary into the response object or redirect to somewhere else.  


# postHandler

### execution sequence
Execution order is inverse to that of the execution chain.  

### execution position
This method will be executed after invocation of the handler, but right before `DispatcherServlet` renders the view.  

### significance  
This method is to do some modification or surviliance to the response object.  


# afterCompletion

### execution sequence  
Execution order is inverse to that of the execution chain; thus first registered interceptor will be the last one to execute.  

### execution position:  
This method will only be invoked if the preHandler method returns `true`. This means that throwing an exception or returning false will not enter this method.    
This method will be invoked after the view was rendered by `DispatcherServlet`  

### significance:  
This method is designed to do some cleanup work.  
