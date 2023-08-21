---
layout: post
title: "JPT Pagination object"
description: ""
category: development
tags: [jpt]
date: 2015-09-28
---

# Introduction
`Pagination` is a wrapper for encapsulate a list of same object in a page. This class will only do wraping work, such like indicating current page number and size of this page.   
Common senario of using `Pagination` class is like list searching.  

# Format
This class inherit from `ml.rugal.sshcommon.page.SimplePage`, hence its fields structure is like below:  
```java
public class Pagination extends SimplePage implements Serializable, Paginable
{
    protected int totalCount;
    protected int pageSize;
    protected int pageNo;
    private List<?> list;
//...
}
```

So when do searching, server will return a page of object, to indicate current page and page size.  

```json
{
"status":"SUCCESS","message":"MESSAGE","data":{
  "list":[...],
  "totalCount":1,
  "pageSize":1,
  "pageNo":1}
}
```
As you can see the pagination is nested inside a `Message` object as the data field.  Inside the pagination object, there is a `list` field telling the real object retrieved from server; a `totalCount` indicate number of object inside th list; `pageSize` and `pageNo` represent size of each page and numebr of current page respectively.  


# Example
Below is an instance of result of getting a list af threads  
```json
{
"status":"SUCCESS","message":"Get thread","data":{
  "list":[{
    "tid":171, "content":"TEST CONTENT", "postTime":1443469243751, 
    "pid":{"pid":803,"title":"Test title","content":"TEST","rate":0.0,
           "infoHash":"7036CA4C717C0D9FEABB26F9A60C63DD887F8FCC",
           "postTime":1443469243741,"size":100,"enabled":true,
           "minLevel":{"lid":1347,"minimum":2147483647,"name":"Test"},
           "uid":{"uid":1391,"password":"test123","username":"tenjin",
                  "email":"testhappy@128.com","uploadByte":0,"downloadByte":0,
                  "registerTime":1443469243596,"status":"VALID","credit":0}
          },
    "uid":{"uid":1391,"password":"test123","username":"tenjin",
           "email":"testhappy@128.com","uploadByte":0,"downloadByte":0,"credit":0,
           "registerTime":1443469243596,"status":"VALID"}
         }],
  "totalCount":1,
  "pageSize":1,
  "pageNo":1}
}
```

Because there is only one object in list, the `totalCount` field is 1, which is very intuitive.  
