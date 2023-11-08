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
# or use genpkey
openssl genpkey -algorithm RSA -quiet -aes-256-cbc -pass pass:1
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

Certificate Request:
    Data:
        Version: 1 (0x0)
        Subject: emailAddress = "this@rug.al, CN=Rugal Bernstein, C=CA"
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:b3:3c:0c:85:26:2b:41:24:cb:9c:39:ee:29:88:
                    61:71:9e:b2:97:16:f9:b6:e3:4a:99:35:a7:11:8e:
                    7d:c5:74:77:da:99:fa:3f:37:f4:7b:15:6e:64:2d:
                    9a:59:86:15:e0:d6:de:ae:ca:1d:20:d8:34:d9:2f:
                    01:cf:1d:a5:da:ee:f6:b9:1d:8a:59:02:44:02:79:
                    c6:20:cb:a3:7a:47:2d:1b:25:8b:31:a7:cf:ec:5f:
                    eb:69:25:e8:50:72:73:41:a8:30:53:a1:c8:a6:44:
                    c0:80:72:7d:6f:df:44:69:a3:88:65:c1:af:0b:5d:
                    1d:89:48:3e:96:34:16:cb:8d:06:18:02:9b:e2:29:
                    4b:e7:5f:37:9e:e0:f9:62:56:b7:d4:49:20:33:59:
                    8d:1f:88:21:5c:ec:0b:eb:d9:e9:8c:2e:4f:5f:34:
                    14:55:40:65:50:40:3a:84:62:ba:45:c6:20:2a:82:
                    8f:6a:34:9a:fb:1a:18:3e:ec:05:5f:49:3a:36:7c:
                    6c:ef:98:e9:a4:da:6d:ea:37:f8:64:14:ef:c5:1c:
                    54:cf:bf:76:1a:ef:52:e7:b5:51:2e:35:f0:20:fb:
                    82:85:c5:67:08:33:24:b2:f3:d3:aa:93:ec:39:8f:
                    24:fb:ea:c0:31:30:63:52:6c:c1:20:0c:39:05:98:
                    fd:b9
                Exponent: 65537 (0x10001)
        Attributes:
            (none)
            Requested Extensions:
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        4c:d9:d4:07:ef:0d:16:af:b3:63:7d:26:ff:4f:f2:65:a3:09:
        42:a9:9f:4c:b8:b6:3f:bf:8b:55:20:3f:b0:26:db:cd:6d:97:
        b7:c1:d0:0a:64:e4:6d:f0:d1:09:d0:2f:53:e9:27:0f:28:57:
        30:7b:fc:0e:bc:95:33:68:95:cb:23:45:b7:61:2c:ce:47:64:
        50:c7:3a:34:b3:90:20:c0:90:ad:a5:2a:16:0a:15:0f:6b:15:
        e0:84:17:dd:d9:fc:48:2f:03:ad:cc:d4:be:be:cc:58:70:96:
        65:c0:d5:e1:04:2b:d2:ea:02:80:73:89:27:50:e1:b4:e7:e5:
        cc:f9:48:77:2e:2e:49:48:00:b7:48:c7:52:f7:2f:05:fa:cf:
        8f:d0:37:f0:65:09:6e:dc:7c:ad:47:c9:62:5e:dd:ec:44:5c:
        45:d7:14:e1:90:cc:42:16:b4:54:19:00:3a:3c:1a:14:1a:bc:
        94:2f:28:3d:87:df:ad:09:0b:d8:2c:a5:c8:a4:86:5c:47:46:
        2a:a1:68:89:0d:90:00:de:87:a4:2f:1c:be:f6:66:a3:9d:55:
        d8:63:30:de:51:da:05:f3:8b:40:88:74:04:c0:60:47:f4:90:
        e5:a9:91:ab:fe:46:5f:9f:72:93:47:15:7c:97:7b:6a:83:14:
        e2:d2:1f:60
-----BEGIN CERTIFICATE REQUEST-----
MIICezCCAWMCAQAwNjE0MDIGCSqGSIb3DQEJARYldGhpc0BydWcuYWwsIENOPVJ1
Z2FsIEJlcm5zdGVpbiwgQz1DQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBALM8DIUmK0Eky5w57imIYXGespcW+bbjSpk1pxGOfcV0d9qZ+j839HsVbmQt
mlmGFeDW3q7KHSDYNNkvAc8dpdru9rkdilkCRAJ5xiDLo3pHLRslizGnz+xf62kl
6FByc0GoMFOhyKZEwIByfW/fRGmjiGXBrwtdHYlIPpY0FsuNBhgCm+IpS+dfN57g
+WJWt9RJIDNZjR+IIVzsC+vZ6YwuT180FFVAZVBAOoRiukXGICqCj2o0mvsaGD7s
BV9JOjZ8bO+Y6aTabeo3+GQU78UcVM+/dhrvUue1US418CD7goXFZwgzJLLz06qT
7DmPJPvqwDEwY1JswSAMOQWY/bkCAwEAAaAAMA0GCSqGSIb3DQEBCwUAA4IBAQBM
2dQH7w0Wr7NjfSb/T/JlowlCqZ9MuLY/v4tVID+wJtvNbZe3wdAKZORt8NEJ0C9T
6ScPKFcwe/wOvJUzaJXLI0W3YSzOR2RQxzo0s5AgwJCtpSoWChUPaxXghBfd2fxI
LwOtzNS+vsxYcJZlwNXhBCvS6gKAc4knUOG05+XM+Uh3Li5JSAC3SMdS9y8F+s+P
0DfwZQlu3HytR8liXt3sRFxF1xThkMxCFrRUGQA6PBoUGryULyg9h9+tCQvYLKXI
pIZcR0YqoWiJDZAA3oekLxy+9majnVXYYzDeUdoF84tAiHQEwGBH9JDlqZGr/kZf
n3KTRxV8l3tqgxTi0h9g
-----END CERTIFICATE REQUEST-----
```

3. create certificate

We can create certificate from certificate service request like `2`
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

Or just create certificate directly.  


```shell
openssl req -new -key private.pem -subj "/emailAddress=this@rug.al, CN=Rugal Bernstein, C=CA" -x509 -out rugal.crt
```
