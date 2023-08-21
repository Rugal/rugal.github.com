---
layout: post
title: "java remote invoke"
description: ""
category: development
tags: [java]
date: 2014-07-30
---
Since `IPC` was first mentioned, many methods and protocals that involving `inter-process call` published, like `RPC`, `Web Service` etc.,  
But actually, those are all another format of `IPC`, the difference is the `processes` that will be invoked is remote or local.  
Here I want to make a summary, especially in Java:  


### RPC is a kind of IPC
When program statements that use RPC are compiled into an executable program, a stub is included in the compiled code that acts as the representative of the remote procedure code.   
When the program is run and the procedure call is issued, the stub receives the request and forwards it to a client runtime program in the local computer. The client runtime program has the knowledge of how to address the remote computer and server application and sends the message across the network that requests the remote procedure.    
Similarly, the server includes a runtime program and stub that interface with the remote procedure itself. Results are returned the same way.


### JMI
Java also provide such kind of remote invocation, `JMI` means to invoke a Java method in remote side. This technique are used in `EJB` suite, which ius treated as a very heavy method.  


### Web Service
With the introduction of `Web Service`, developers enable to remotely invoke method in a easy way.  
 
 
### Java Web Service

1. big web service: `JAX-WS` : `javax.xml.ws`
    1. `SOAP` (An XML architecture) based.
    2. Using `JAX-WS` to determine `Java-to-WSDL` Mapping.
    3. Publish `WSDL` as syntactical definition interface.
2. RESTful web service:  `JAX-RS`
    1. HTTP based.
    2. Using `JAX-RS` to easy binding.
    3. Far lightweight and easy integrating.
