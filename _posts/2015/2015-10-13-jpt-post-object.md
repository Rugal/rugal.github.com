---
layout: post
title: "JPT Post object"
description: ""
category: development
tags: [jpt]
---
{% include JB/setup %}

#Introdution
`Post` is a table that store records about posts and published torrent, information like `info_hash` and `bencode` are stored in corresponding row.  
The idea behind this is that, any post must be accompanied by a related torrent file, of couse its `info_hash` and `bencode` will be stored together with the post for storage convenience.  

#Table structure

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
 
#Class

#JSON
