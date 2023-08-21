---
layout: post
title: "JPT Message object"
description: ""
category: development
tags: [jpt]
date: 2015-09-14
---

# Introduction
`Message` class is widely used in jpt.  
`Message` object is being used in `all` brower based communication, that means all communications except `tracker annoucement` will all use this class to transmit information between server and client.  
For any client that want to communicate with server, please read this document carefully before implementing your own data receiver.  

# Format
There are only two kinds of messages, either `SUCCESS` or `FAIL`, no more.  
The Java class is like 

```java
public class Message
{
    String status;
    String message;
    Object data;
}
```
I use `GSON` to serialize the object, so the corresponding JSON will be:

```json
{"status":"STATUS","message":"Message Content","data":{...real data content as JSON...}}
```

### On Succeed
For any requests that not only go through the whole procedure without any error, but also achieved what it requested, server will return a message with `status=SUCCESS`.  
```json
{"status":"SUCCESS","message":"Message Content","data":{...real data content as JSON...}}
```
In some cases, a SUCCESS message will not contain data field. But most of the cases will contain data field with specific data object.  
```json
{"status":"SUCCESS","message":"Tracker started"}
```
For instance, a SUCCESSed request for adding a thread will return the persisted target thread content, in which its related beans like user and parent post will also be embeded.  

```json
{
"status":"SUCCESS",
"message":"Get post",
"data":{"pid":778, "title":"Test title", "content":"TEST", "rate":0.0,
        "infoHash":"7036CA4C717C0D9FEABB26F9A60C63DD887F8FCC", 
        "postTime":1442471051490, "size":100, "enabled":true,
        "minLevel":{"lid":1313,"minimum":2147483647,"name":"Test"},
        "uid":{"uid":1349,"password":"test123","username":"tenjin",
               "email":"testhappy@128.com", "uploadByte":0,"downloadByte":0, 
               "credit":0,"registerTime":1442471051470,"status":"VALID"}
       }
}
```

### On Failed
For all other cases, server will return a message with `status=FAIL`.  

```json
{"status":"FAIL","message":"Error message content"}
```

In most of the situation, message with `FAIL` will not contain `data` field.  
For instance a FAILed request for adding a thread will return the reason of failing the request.  

```json
{"status":"FAIL","message":"Tracker not running"}
```

# Caveat

1. If contain data field, there might have nested information embeded in the out-most bean. This is for accelerate the request in case of doing redundant request for directly related bean.  For detailed bean structure, please refer to [entity](placeholder).
2. All request except `Announcement` will get `Message` object. If you get something else, there must be cracker in between client and server.  
