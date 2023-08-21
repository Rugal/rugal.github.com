---
layout: post
title: "JPT User object"
description: ""
category: development
tags: [jpt]
date: 2015-09-18
---
# Introduction
`User` is a table that record all user profile information, like user ID, password referee etc.,  More importantly, upload and download bytes also recorded in this table.  
I use bigint in database to store `date` for all `time` related fields.  
For upload and download bytes, I use bigint in postgresql.  

# Table structure

Column     |    |      Type
--------------|-|------------------------
 uid          | | integer
 password     | | character varying(100) 
 username      || character varying(100)
 email        | | character varying(100)
 upload_byte   || bigint
 download_byte || bigint
 credit        || integer
 referee       || integer
 register_time || bigint
 status        || integer


# Class
Note that the `UserLevel level` field is annotated as `@Transient`, since server will calculate the score of user when requested, hence user level is dynamic.  Thisconsistantified database representation and relation.  
Class below is just a simplified version of this class, for details, please refer to [github](https://github.com/Rugal/JavaPT/blob/master/src/main/java/ga/rugal/jpt/core/entity/User.java).  

```java
public class User
{

    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    @Expose
    private Integer uid;
    //user Id, primary key

    @Expose
    @Column(length = 100)
    private String password;

    @Expose
    @Column(length = 100)
    private String username;
    //user name, unique

    @Expose
    @Column(length = 100)
    private String email;
    //unique, useful when forget password

    @Expose
    @Column(name = "upload_byte")
    private Long uploadByte = 0l;
    //field indicate the number of byte uploaded

    @Expose
    @Column(name = "download_byte")
    private Long downloadByte = 0l;
    //field indicate the number of byte downloaded

    @Expose
    @Column
    private Integer credit = 0;
    //some extra credit awarded by administrator or other mechanism
    //could be used to do a lot of gameing thing

    @Expose
    @Column(name = "register_time")
    private Long registerTime;

    @Expose
    @Transient
    private UserLevel level;
    //user level corresponding to related download and upload

    @Expose
    @Column
    private Status status;
    //User status, like banned from login or something else

    @JoinColumn(name = "referee", referencedColumnName = "uid")
    @ManyToOne
    private User referee;
    //...
```
Because `password` is a sensitive field, currently this field could be serialized by GSON when creating response. But it is really easy to stop from doing that by removing `@Expose` annotation from this field.  

# JSON

```json
{
  "uid":1349, "password":"test123", "username":"tenjin",
  "status":"VALID", "credit":0, "registerTime":1442471051470,
  "email":"testhappy@128.com", "uploadByte":0, "downloadByte":0
}
```
As you can see, JSON that serialized by GSON will have content like above.  
Sometimes there is no `level` field as it is not mandetory. But from my design, torrent poster could specify the minimum required level of a torrent, which could narrowing the target user to serve.  
