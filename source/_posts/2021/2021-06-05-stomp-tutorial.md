---
layout: post
title: "STOMP tutorial"
description: ""
category:  development
tags: [network, spring, java]
date: 2021-06-05
---
# connection explanation

  

## upgrade HTTP to Websocket

  

```

ws://localhost:port/{stomp endpoint}/{serverid}/{sessionid}/websocket

```

  

### stomp endpoint

  

To define the path prefix to upgrade websocket. This can be done in following spring configuration.

  

```java
@Override
public  void  registerStompEndpoints(final  StompEndpointRegistry registry) {
  registry.addEndpoint("/chat");
  registry.addEndpoint("/chat").withSockJS();
}
```
  

### serverid


A required but useless id in spring-websocket


### sessionid

Probably the most important `id` in this protocol, used to communicate back to current user.


## subscribe


```

"SUBSCRIBE\nid:{subscriptionid}\ndestination:{path}\n\n\u0000"

```

  

### subscriptionid

A unique id to indicate single subscription. Mostly useless.

  

### path

  

Extremely important for usage of listening backward communication.

In spring-websocket, it is by default prefix as `/user`. In order to allow this prefix to pass the path validation, we should configure the simple broker path in spring configuration as following.


```java
@Override
public  void  configureMessageBroker(final  MessageBrokerRegistry config) {
  config.enableSimpleBroker("/user");
}
```


So by using the following code, the entire path will be `/user/to-userid/queue`.

```java
this.template.convertAndSendToUser("to-userid", "/queue", "message content");
```

  

This is why it is so important, that by listening to this path, this single user would get message that is specific to it

  
  

## send

  

```
"SEND\nfrom:{from-userid}\ndestination:/{prefix}/{destination}/{to-userid}\ncontent-length:29\n\n{\"message\":\"message content\"}\u0000"
```

  

### from-userid

  

to indicate send message from whom. We may have better to do it in future, but for now, just put it here.

  

### prefix

```java
@Override
public  void  configureMessageBroker(final  MessageBrokerRegistry config) {
  config.setApplicationDestinationPrefixes("/websocket");
}
```

  

### destination

This destination can be configured using the following annotation, this annotation is important to indicate the method below is a handler to deal with message that matches the path format in `ant` syntax.

The following example defines the destination as `user`

```java
@MessageMapping("/user/{to-userid}")
```

  

### to-userid

  

Extremely important to indicate whom to receive this message.

  

By using the same annotation.

```java

@MessageMapping("/user/{to-userid}")

```


# command

Some useful log to indicate different command.
  
  

## disconnect

  

```

2021-06-04 15:45:49.465 DEBUG 15378 --- [boundChannel-26] org.springframework.web.SimpLogging : Processing DISCONNECT session=58oec3gc

2021-06-04 15:45:49.465 DEBUG 15378 --- [nio-8080-exec-5] s.w.s.h.LoggingWebSocketHandlerDecorator : WebSocketServerSockJsSession[id=58oec3gc] closed with CloseStatus[code=1000, reason=null]

2021-06-04 15:45:49.465 DEBUG 15378 --- [nio-8080-exec-5] o.s.w.s.m.SubProtocolWebSocketHandler : Clearing session 58oec3gc

2021-06-04 15:45:49.465 DEBUG 15378 --- [tboundChannel-8] o.s.w.s.m.SubProtocolWebSocketHandler : No session for GenericMessage [payload=byte[0], headers={simpMessageType=DISCONNECT_ACK, simpDisconnectMessage=GenericMessage [payload=byte[0], headers={simpMessageType=DISCONNECT, stompCommand=DISCONNECT, simpSessionAttributes={}, simpHeartbeat=[J@1e9284c7, simpSessionId=58oec3gc}], simpSessionId=58oec3gc}]

2021-06-04 15:45:49.466 DEBUG 15378 --- [boundChannel-29] org.springframework.web.SimpLogging : Processing DISCONNECT session=58oec3gc

2021-06-04 15:45:49.467 DEBUG 15378 --- [tboundChannel-9] o.s.w.s.m.SubProtocolWebSocketHandler : No session for GenericMessage [payload=byte[0], headers={simpMessageType=DISCONNECT_ACK, simpDisconnectMessage=GenericMessage [payload=byte[0], headers={simpMessageType=DISCONNECT, stompCommand=DISCONNECT, simpSessionAttributes={org.springframework.messaging.simp.SimpAttributes.COMPLETED=true}, simpSessionId=58oec3gc}], simpSessionId=58oec3gc}]

2021-06-04 15:45:56.194 DEBUG 15378 --- [MessageBroker-8] o.s.w.s.s.t.h.DefaultSockJsService : Closed 1 sessions: [58oec3gc]

```

  
  
  

## subscribe

  

```

2021-06-04 15:46:48.714 DEBUG 15378 --- [nio-8080-exec-6] o.s.web.servlet.DispatcherServlet : GET "/chat/info", parameters={}

2021-06-04 15:46:48.714 DEBUG 15378 --- [nio-8080-exec-6] o.s.w.s.s.s.WebSocketHandlerMapping : Mapped to org.springframework.web.socket.sockjs.support.SockJsHttpRequestHandler@625d9132

2021-06-04 15:46:48.714 DEBUG 15378 --- [nio-8080-exec-6] o.s.w.s.s.t.h.DefaultSockJsService : Processing transport request: GET http://localhost:8080/chat/info

2021-06-04 15:46:48.714 DEBUG 15378 --- [nio-8080-exec-6] o.s.web.servlet.DispatcherServlet : Completed 200 OK

2021-06-04 15:46:48.791 DEBUG 15378 --- [nio-8080-exec-7] o.s.web.servlet.DispatcherServlet : GET "/chat/080/bw6hxi0f/websocket", parameters={}

2021-06-04 15:46:48.791 DEBUG 15378 --- [nio-8080-exec-7] o.s.w.s.s.s.WebSocketHandlerMapping : Mapped to org.springframework.web.socket.sockjs.support.SockJsHttpRequestHandler@625d9132

2021-06-04 15:46:48.791 DEBUG 15378 --- [nio-8080-exec-7] o.s.w.s.s.t.h.DefaultSockJsService : Processing transport request: GET http://localhost:8080/chat/080/bw6hxi0f/websocket

2021-06-04 15:46:48.793 DEBUG 15378 --- [nio-8080-exec-7] o.s.web.servlet.DispatcherServlet : Completed 101 SWITCHING_PROTOCOLS

2021-06-04 15:46:48.794 DEBUG 15378 --- [nio-8080-exec-7] s.w.s.h.LoggingWebSocketHandlerDecorator : New WebSocketServerSockJsSession[id=bw6hxi0f]

2021-06-04 15:46:48.797 DEBUG 15378 --- [boundChannel-32] org.springframework.web.SimpLogging : Processing CONNECT session=bw6hxi0f

2021-06-04 15:46:48.800 DEBUG 15378 --- [boundChannel-35] org.springframework.web.SimpLogging : Processing SUBSCRIBE /topic/messages id=sub-0 session=bw6hxi0f

```

  
  

## send

  

```

2021-06-04 15:47:57.442 DEBUG 15378 --- [boundChannel-37] .WebSocketAnnotationMethodMessageHandler : Searching methods to handle SEND /app/chat session=bw6hxi0f, lookupDestination='/chat'

2021-06-04 15:47:57.444 DEBUG 15378 --- [boundChannel-37] .WebSocketAnnotationMethodMessageHandler : Invoking ChatController#send[2 args]

simpMessageType : MESSAGE

stompCommand : SEND

nativeHeaders : {destination=[/app/chat], content-length=[26]}

simpSessionAttributes : {}

simpHeartbeat : [J@5b8852c9

lookupDestination : /chat

simpSessionId : bw6hxi0f

simpDestination : /app/chat

From: [a] Content: [aaaa]

  

2021-06-04 16:14:07.627 DEBUG 16527 --- [boundChannel-13] org.springframework.web.SimpLogging : Processing MESSAGE destination=/queue/messages-usertest session=test payload={"from":"a","text":"aaaaa","time":"16:14"}

```

  

## message

  

```

2021-06-04 15:47:57.491 DEBUG 15378 --- [boundChannel-37] org.springframework.web.SimpLogging : Processing MESSAGE destination=/topic/messages session=bw6hxi0f payload={"from":"a","text":"aaaa","time":"15:47"}

2021-06-04 15:47:57.492 DEBUG 15378 --- [boundChannel-37] org.springframework.web.SimpLogging : Broadcasting to 1 sessions.

```
