---
layout: post
title: "SSL Certificate"
description: ""
category:  operation
tags: [security]
date: 2022-09-06
---

# RSA

## x.509

Format of public key certificate standard. Contains public key along with other information depicting the issuer etc.,

## DER

Binary encoding format to store data, not only `x.509` but also `PKCS8` in file.  The result can not be viewed in text editor as it is binary

## PKCS8, PKCS12

Standard syntax for persisting private key information.  
It is typically exchanged by using `PEM` encoding format

## PEM

Base encoding of DER certificate, can also encode others like private and public key etc.,

```text
-----BEGIN PUBLIC KEY-----
...Base64 encoding of the DER encoded certificate...
-----END PUBLIC KEY-----
```


Usually begin with `-----BEGIN` and end with `-----END`
