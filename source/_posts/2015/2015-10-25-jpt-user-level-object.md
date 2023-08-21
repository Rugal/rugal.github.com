---
layout: post
title: "JPT User Level object"
description: ""
category: development
tags: [jpt]
date: 2015-10-25
---

# Introduction
`User Level` Class used for represent the level of user, indicating user's loyalty and contribution to our site.  
Commonly, all downloadable torrent will be included with `Post`, each post with has a minimum requirement for allowing user to access or download. From this pespective, `User Level` class doing the job for classifying users.  

# Table Structure
Beware that we use the name of `UserLevel` in Java but it map to `Level` in database for clarifying keyword.  
The data in this table mostly fixed in most of time. So their `lid` will be relatively low and might not changes.  

Column  | Type
---|--------|---------
 lid             |  | integer
 minimum          | | integer
 name             | | character varying(50)
 icon             | | character varying(50)
 min_upload_byte   || bigint
 min_download_byte || bigint

# Class

```java
public class UserLevel
{
    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    @Expose
    private Integer lid;

    @Column
    @Expose
    private Integer minimum;

    @Column(length = 50)
    @Expose
    private String name;

    @Column
    @Expose
    private String icon;

    @Column(name = "min_upload_byte")
    @Expose
    private Long minUploadByte;

    @Column(name = "min_download_byte")
    @Expose
    private Long minDownloadByte;

    @OneToMany(mappedBy = "minLevel")
    private List<Post> postList;
    //...
}
```
# JSON
`UserLevel` usually will not return independently, but nested with `User` or `Post` class.   
A sample format like:  

```json
{"lid":1895,"minimum":100,"name":"Test"}
```
