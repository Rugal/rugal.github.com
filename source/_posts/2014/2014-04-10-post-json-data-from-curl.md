---
layout: post
title: "post JSON data from Curl"
description: ""
category: operation
tags: [curl]
date: 2014-04-10
---
Really very useful tip.  
To post JSON format data in `CURL` from termial, you need to specify header parameter  
`-H "Content-Type: application/json"`.  
Springmvc would reject this request body if `JSON` header not specified.

```shell
curl -H "Content-Type: application/json" \
    -d '{"username":"xyz","password":"xyz"}'  \
    http://localhost:8080/api/login
```
Also note that, you could use `-X GET` option to indicate using `GET` method at the meantime of using `-d` option, which might originally treat as a way of `POST` data.  
Actually `-d` option just indicate the data within it need to be treat as `request body`.
