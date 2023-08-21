---
layout: post
title: "Introduction to JavaPT"
description: ""
category: development
tags: [java, maven, jpt]
date: 2015-09-14
---
Nice to see you in this page. I assume you are either a developer or a PT site master who want to find a Java based PT(private tracker).  After several days of development, this project is almost good here.  

I write this post just to clarify all the protocols and interfaces that I used in this project, in case some people need to develop a better frontier or do second development.  

For the part of `interfaces`, I would like to introduce the format of returned data from server. How to process them and how to link them together.  
For `JSON` part, I will list all entities that are involved in the data transmission.  Frontier developers need to know the format and their corresponding meaning.  
For the part of `protocols`, I actually just used and enhanced the  [ttorrent](https://github.com/mpetazzoni/ttorrent) tracker server. I will introduce the [BitTorrent](https://wiki.theory.org/BitTorrentSpecification) implemented in this project, answer some confusing questions about Bit Torrent.  

## Interfaces
One important thing is the `Authentication fields` in request header.  
`Authentication fields` are `id` and `credential` fields in header. Corresponding to the information of user who currently log in client.  
A sample request is shown as below:  
```http
PUT /user/{uid} HTTP/1.1
Accept: application/json
Content-Type: application/json
id: {uid}
credential: {credential}

{"password":"unencrypted-password"}
```

Almost every `POST` `PUT` and `DELETE` request are required to include authentication fields for user identity verification. Some `GET` are also require to do so. This is actually a good way to simplify `Restful`.  
Some special requests are not authetication required. Please strictly follow the sample HTTP request in each specific API.  
Request that should have authetication fields but does not will get:  
```json
{"status":"FAIL","message":"Unmatched combination of username and credential"}
```

1. [User]({%post_url 2015-10-25-jpt-user-interface %})
2. [Post]({%post_url 2016-01-01-jpt-post-interface %})
3. Thread
4. Signin


## JSON
JSON data format are generally used througout this application.  
Listed classes are for demonstration usage.   
If developers want to set up client or front-end, please also follow the same rule of class structure.  

1. [Message]({%post_url 2015-09-14-jpt-message-object %})
2. [Pagination]({%post_url 2015-09-28-jpt-pagination-object %})
3. [User]({%post_url 2015-09-18-jpt-user-object %})
4. [Post]({%post_url 2015-10-13-jpt-post-object %})
5. [Thread]({%post_url 2015-10-14-jpt-thread-object%})
6. [UserLevel]({%post_url 2015-10-25-jpt-user-level-object%})
7. Tag
8. SigninLog
9. PostTags
10. Client
11. Admin

## Protocols
1. BitTorrent
