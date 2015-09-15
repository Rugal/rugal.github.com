---
layout: post
title: "Introduction to JavaPT"
description: ""
category: development
tags: [java, maven, jpt]
---
{% include JB/setup %}
Nice to see you in this page. I assume you are either a developer or a PT site master who want to find a Java based PT(private tracker).  After several days of development, this project is almost good here.  

I write this post just to clarify all the protocols and interfaces that I used in this project, in case some people need to develop a better frontier or do second development.  

For the part of `interfaces`, I would like to introduce the format of returned data from server. How to process them and how to link them together.  
For `JSON` part, I will list all entities that are involved in the data transmission.  Frontier developers need to know the format and their corresponding meaning.  
For the part of `protocols`, I actually just used and enhanced the  [ttorrent](https://github.com/mpetazzoni/ttorrent) tracker server. I will introduce the [BitTorrent](https://wiki.theory.org/BitTorrentSpecification) implemented in this project, answer some confusing questions about Bit Torrent.  

##Interfaces
1. User
2. Post
3. Thread
4. Signin


##JSON
1. [Message]({%post_url 2015/2015-09-14-jpt-message-object %})
2. Pagination
3. User
4. Post
5. Thread
6. UserLevel
7. Tag
8. SigninLog
9. PostTags
10. Client
11. Admin

##Protocols
1. BitTorrent
