---
layout: post
title: "JPT Thread object"
description: ""
category: development
tags: [jpt]
date: 2015-10-14
---

# Introduction
`Thread` object is the reply or comments of other user to post.  
The real `rate` data is accumulated from this table.  

# Table Structure

Column  || Type   
--|--|--
 tid      | | integer 
 pid       || integer 
 uid       || integer 
 content   || text    
 post_time || bigint  
 rate   || integer


# Class
```java
public class Thread
{
    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    @Expose
    private Integer tid;
    //primary key

    @Column(length = 2147483647)
    @Expose
    private String content;
    //the comment of this thread

    @Column(name = "post_time")
    @Expose
    private Long postTime;

    @Column(name = "rate")
    @Expose
    private Integer rate;
    //rate mark given by this user

    @JoinColumn(name = "pid", referencedColumnName = "pid")
    @ManyToOne
    @Expose
    private Post post;
    //the parent post

    @JoinColumn(name = "uid", referencedColumnName = "uid")
    @ManyToOne
    @Expose
    private User user;
    //the user who made this thread
//...
```

# JSON
```json
{
  "tid":284,"content":"TEST CONTENT","postTime":-9223372036854775808,
  "post":
    {"pid":1166,"title":"Test title","content":"TEST","size":100,
     "infoHash":"7036CA4C717C0D9FEABB26F9A60C63DD887F8FCC",
     "enabled":true,"rate":0.0,"postTime":1444797182998,
     "minLevel":{"lid":2010,"minimum":2147483647,"name":"Test"},
     "author":
       {"uid":2171,"password":"test123","username":"tenjin",
        "email":"testhappy@128.com","uploadByte":0,"downloadByte":0,
        "credit":0,"registerTime":1444797182983,"status":"VALID"
       }
     },
   "replyer":
     {"uid":2171,"password":"test123","username":"tenjin",
      "email":"testhappy@128.com","uploadByte":0,"downloadByte":0,
      "credit":0,"registerTime":1444797182983,"status":"VALID"
     },
   "rate":5
}
```
