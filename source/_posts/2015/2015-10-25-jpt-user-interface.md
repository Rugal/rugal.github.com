---
layout: post
title: "JPT User interface"
description: ""
category: development
tags: [jpt]
date: 2015-10-25
---

# Introduction
`UserAction` mostly deal with normal user related jobs. Such like registration, deregistration, user profile updating and user searching.  
Although the class is Action, I plan to change it to `*Controller`.  
All interfaces of this controller are under `/user` path.  
In this controller, all interfaces except `User Registration` does not require authentication fields.  
Authentication fields are `id` and `credential` fields in header.  Corresponding to the information of user who currently log in client.  

-----------------

# API

## User Registration
Use this API to register an user with an invitation code and its corresponding referee.  
The json string contains required fields for registration.  Fields that must be filled are `email` and `username`.  
Service will send a email to specified address to initialize password.  
Make sure `username` is unique in server, no conflict username is allowed.  

```http
POST /user?referee={refereeUID}&code={invitation-code} HTTP/1.1
Accept: application/json
Content-Type: application/json

{"password":"unencrypted-password", "username":"name","email":"email@email.com"}
```

## User Profile retrieve
Get user profile. Target user is represented as `{uid}`. Basically, any user could view any user in server.  
But authentication fields are still required.

```http
GET /user/{uid} HTTP/1.1
Accept: application/json
id: {uid}
credential: {credential}
```

## Check email availibility
Check if the email is available for registration.  
Return Message object, `SUCCESS` means available and `FAIL` corresponding to `unavailable`.  

```http
GET /user?email={email} HTTP/1.1
Accept: application/json
```

## Check username availibility
Check if the username is available for registration.  
Return Message object, `SUCCESS` means available and `FAIL` corresponding to `unavailable`.  

```http
GET /user?username={username} HTTP/1.1
Accept: application/json
```

## Update User Profile
Update user profile. Basically including all field except `username`, `uid`, `email`.  
`email` could only be modified by specific interface, whereas `username` and `uid` are readonly.  
Current version has not many fields to fill, please wait for future release.  

`uid` in JSON in request body will be ignored. Only `uid` in URL path will be updated as the content in request body.  
That means `uid` in request body can do nothing.  
Normal user that without administrator permission could not updat others, thus, authentication fields must corresponding to the updated user.  
For administrator usage, they have the permission to modify other users, thus they need to identify themselves by the authentication fields.  
After getting authority, still, only user with `uid` in URL path will be updated.  

```http
PUT /user/{uid} HTTP/1.1
Accept: application/json
Content-Type: application/json
id: {uid}
credential: {credential}

{"password":"unencrypted-password"}
```


## Deregister User
Usually deregistration will not delete user in database, but set their status as unloggable.  
Just like updating user, only `uid` in URL will be operated, authentication fields are just for user identity ensurance.  

```http
DELETE /user/{uid} HTTP/1.1
Accept: application/json
id: {uid}
credential: {credential}
```

---------------------
