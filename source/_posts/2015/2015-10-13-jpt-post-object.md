---
layout: post
title: "JPT Post object"
description: ""
category: development
tags: [jpt]
date: 2015-10-13
---

# Introdution
`Post` is a table that store records about posts and published torrent, information like `info_hash` and `bencode` are stored in corresponding row.  
The idea behind this is that, any post must be accompanied by a related torrent file, of couse its `info_hash` and `bencode` will be stored together with the post for storage convenience.  

# Table structure

Postgresql provides byte array type `bytea`, thus I could store the bencoded torrent file into a line.  
The `info_hash` column is for searching by.  

Column||Type
:--|--|:--
pid      | | integer               
 uid     |  | integer               
 title    | | character varying(50) 
 content  | | text                  
 post_time| | bigint                
 size      || integer               
 enabled   || boolean               
 min_level || integer               
 info_hash || character varying(50) 
 bencode   || bytea       
 
# Class

```java
public class Post extends BaseObject<Post>
{

    @Basic(optional = false)
    @Column(nullable = false)
    @Expose
    private Integer pid;
    //primary key

    @Expose
    @Column(length = 50)
    private String title;
    //the title of the post showing in summary page

    @Expose
    @Column(length = 2147483647)
    private String content;
    //Postgresql provides text type for unlimited content
    //We will store user post content in markdown

    @Expose
    @Column(length = 50, name = "info_hash")
    private String infoHash;
    //The info hash for searching

    @Expose
    @Column(name = "post_time")
    private Long postTime;

    @Column(length = 2147483647)
    private byte[] bencode;
    //the original uploaded bencoded torrent file

    @Column
    @Expose
    private Integer size;
    //size of total file storage to be downloaded

    @Column
    @Expose
    private Boolean enabled;
    //set if current post is visible by all

    @JoinColumn(name = "min_level", referencedColumnName = "lid")
    @ManyToOne
    @Expose
    private UserLevel minLevel;
    //the minimum user level that could access this post.

    @Transient
    @Expose
    private float rate;
    //average rate for this post

    @JoinColumn(name = "uid", referencedColumnName = "uid")
    @ManyToOne
    @Expose
    private User uid;
    //user who upload this post

    @OneToMany(mappedBy = "pid")
    private List<PostTags> postTagsList;

    @OneToMany(mappedBy = "pid")
    private List<Thread> threadList;

    @OneToMany(mappedBy = "pid")
    private List<ClientAnnounce> clientAnnounceList;
//...
```

The `rate` field will be dynamically computed when evaluatinng.

# JSON
An example post object in json format is shown as below:  

```json
{
  "pid":1094,"title":"Test title","content":"TEST","postTime":1444791559704,
  "infoHash":"7036CA4C717C0D9FEABB26F9A60C63DD887F8FCC","size":100,
  "minLevel":{"lid":1895,"minimum":2147483647,"name":"Test"},
  "rate":0.0,"enabled":true,
  "uid":{"uid":2031,"password":"test123","username":"tenjin",
         "email":"testhappy@128.com","uploadByte":0,"downloadByte":0,
         "credit":0,"registerTime":1444791559685,"status":"VALID"}
 }
```
