---
layout: post
title: "Create OpenSSL RSA keypair"
description: ""
category:  operation
tags: [security]
date: 2022-09-06
---

## Create OpenSSL key pair

### create RSA key pair

```shell
openssl genrsa -out keypair.pem 1024
```

### extract public key in x.509

```shell
openssl rsa -in keypair.pem -pubout -out publickey.crt
```

### extract private key in pkcs8

```shell
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out pkcs8.key
```
