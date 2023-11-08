---
layout: post
title: "OpenSSL Usage"
description: ""
category:  operation
tags: [security, openssl]
date: 2022-09-06
---

## RSA key pair

1. create private key

This will create RSA key in `PKCS#1` format.  
```shell
openssl genrsa -out private.pem 1024
```

2. get public key from private key

```shell
openssl rsa -in keypair.pem -pubout -out public.pem
```


## x.509 certificate

1. create private key
   
```shell
openssl genrsa -out private.pem 1024

-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKnkfrfPe4N/DWN7
7+gCBLfoIEYRB0AmPTfIoeD5yh+Dfsy5ozuX2/uHZnUaYEqs0ymT8DQknTGhVkAT
5lzbf+ptGle3fGYAm2YYVKK6+0Sl3RiCmNoudGBxJrbhCUEFa5PJj9dU3rQooK6N
wSJRfRympjMLpYjW0nO2WEGy8VGXAgMBAAECgYB+9BVRK8VjfPS3S6z5lVCLUPWV
BjKB2FFUtyNoZ6CHrg5505rL9G3ZZtPEXCJqivz8i+UqQdYJeUNnfLde2lOZ1Pt1
7iELNA2NgiDW9MyTC6ccswgYoPbOb3Apvnrcx21vaMbfvmtHXM/sWC+19/LH0fvU
rMeOdAZBidPBgtROUQJBAN5oAnIS6qC4z/JwJdBf7fBoXN/+r1lF19ONldij/Xme
bKRwkMg3nUSJEEBjSEC7oDAcPgIDJXc+lQpE2enMV/kCQQDDjeNpJCj4Q6Phyd1Q
9g4oLiVbpEi3oRGHlSO8uejIIRxNZceV5QI+DcY/y8sF2lKX0XLPaSGu5N7FY/Js
R/oPAkEA3K+MLbFDi7OW89QAUaG+slx8O++2AvlgzZSiadNfgzyGRS1FHMbCkO0I
aTuayFDlBJghl1GT7Zz1urjTGkEf0QJBAK0V7l4GknjDrc9QlCJv1zH7Pjex3mci
GljuSZZm2sIghGOBHbnv3B8+o+WdpNJGXmpgCYXJoPWjQAZoo47x2kMCQQCa3+4v
mS/EVetiVkIERE9NuVNkY9wOs9NYzfCDTs7Pz5x24a6TnSU1YbhTb3wK23hrQrHE
cVgKLxkUn63UqS/m
-----END PRIVATE KEY-----
```

2. create certificate request

```shell
openssl req -new -key private.pem -out rugal.csr -subj "/emailAddress=this@rug.al, CN=Rugal Bernstein, C=CA"

-----BEGIN CERTIFICATE REQUEST-----
MIIBdTCB3wIBADA2MTQwMgYJKoZIhvcNAQkBFiV0aGlzQHJ1Zy5hbCwgQ049UnVn
YWwgQmVybnN0ZWluLCBDPUNBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp
5H63z3uDfw1je+/oAgS36CBGEQdAJj03yKHg+cofg37MuaM7l9v7h2Z1GmBKrNMp
k/A0JJ0xoVZAE+Zc23/qbRpXt3xmAJtmGFSiuvtEpd0YgpjaLnRgcSa24QlBBWuT
yY/XVN60KKCujcEiUX0cpqYzC6WI1tJztlhBsvFRlwIDAQABoAAwDQYJKoZIhvcN
AQELBQADgYEAILgi47IjzF0rJMGfIRtZZ08jonUF6KX68o3B47+NmIDXoXEib+kc
dm4wEA5PQjMfN/fojvjJm9bA7BdzGlhQxFpVTr3u5PHzG7ZUJ9hVQeLz6kHj5m8D
4tfpRBNjlfWE3A/8B/Sn7CfWxRKkUlQO8cFJTHzw8LSZjbhCXftd1Dc=
-----END CERTIFICATE REQUEST-----
```

3. create certificate

```shell
openssl req -x509 -sha256 -days 365 -key private.pem -in rugal.csr -out certificate.pem

-----BEGIN CERTIFICATE-----
MIICSDCCAbGgAwIBAgIUD3s8d23TqRJjH2eKFuOvz9FdNAYwDQYJKoZIhvcNAQEL
BQAwNjE0MDIGCSqGSIb3DQEJARYldGhpc0BydWcuYWwsIENOPVJ1Z2FsIEJlcm5z
dGVpbiwgQz1DQTAeFw0yMzExMDcxNTE1MTFaFw0yNDExMDYxNTE1MTFaMDYxNDAy
BgkqhkiG9w0BCQEWJXRoaXNAcnVnLmFsLCBDTj1SdWdhbCBCZXJuc3RlaW4sIEM9
Q0EwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAKnkfrfPe4N/DWN77+gCBLfo
IEYRB0AmPTfIoeD5yh+Dfsy5ozuX2/uHZnUaYEqs0ymT8DQknTGhVkAT5lzbf+pt
Gle3fGYAm2YYVKK6+0Sl3RiCmNoudGBxJrbhCUEFa5PJj9dU3rQooK6NwSJRfRym
pjMLpYjW0nO2WEGy8VGXAgMBAAGjUzBRMB0GA1UdDgQWBBTtYn5CvpExxxMRnZgr
HDElpGWb8jAfBgNVHSMEGDAWgBTtYn5CvpExxxMRnZgrHDElpGWb8jAPBgNVHRMB
Af8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4GBAHczhk8XGhc1d66n3drbytNxgJwU
olsE5gjxjw4cNE/0XBy+BgMQLvCP3cQ9vpHHndT49SmYzT4QKDR1omoDp6SJJXlQ
pdFheVbFEMeFmZKpjjO8t+L19tUiAy2oFxFRuhxd0fw7ztjB/yHAbrurwH7uf/w8
JCVHKZaap6ta7DOK
-----END CERTIFICATE-----
```
