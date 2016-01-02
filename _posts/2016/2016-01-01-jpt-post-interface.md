---
layout: post
title: "JPT Post interface"
description: ""
category: development
tags: [jpt]
---
{% include JB/setup %}



#Introduction

`PostAction` is associated with all post and partly thread related jobs.  
All interfaces of this controller is placed under `/user` path.   
All interfaces require [authentication fields]({%post_url 2015/2015-09-14-introduction-to-javapt %}).    


-----------------

#API

##Add Post
To add a new post. Use this interface to create post metadata without uploading the torrent file.  
{%highlight http%}
POST /post HTTP/1.1
Accept: application/json
Content-Type: application/json
id: {uid}
credential: {credential}

{
  "title":"Test title", "enabled":true, "minLevel":{"lid":1}, 
  "content":"This could be a very long content..."
}
{%endhighlight%}
The `post` object is exactly as [specification]({%post_url 2015/2015-10-13-jpt-post-object%}), but user could not specify the id of post to be persisted as well as some of other fields like `postTime`, `infoHash`, `rate`.   
Note that the `minLevel` is to set the minimum required level of user to download. User could not `create` a level without proper permission. Ideally, user should choose a level from list.  

##Update Post meta and content
Use this interface to update the meta data and content of a post.  
Only author and administrators could update a post.  
{%highlight http%}
PUT /post/{pid} HTTP/1.1
Accept: application/json
Content-Type: application/json
id: {uid}
credential: {credential}

{
  "title":"Test title", "enabled":true, "minLevel":{"lid":1}, 
  "content":"This could be a very long content..."
}
{%endhighlight%}

This interface has the same restriction as `Add post`.   
The target post to be updated will be and only be the `{pid}` specified in URL.  

##Get Post metadata and content
{%highlight http%}
GET /post/{pid} HTTP/1.1
Accept: application/json
Content-Type: application/json
id: {uid}
credential: {credential}
{%endhighlight%}

##Delete Post
{%highlight http%}

{%endhighlight%}

##Add Thread for a Post
{%highlight http%}

{%endhighlight%}

##Get Thread page for a Post
{%highlight http%}

{%endhighlight%}

##Upload torrent file of a Post
{%highlight http%}

{%endhighlight%}

##Download torrent file of a Post
{%highlight http%}

{%endhighlight%}
