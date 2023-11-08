---
layout: post
title: "Cryptographical Cheatsheet"
description: ""
category:  operation
tags: [security, openssl]
date: 2021-03-06
---

[reference](https://www.cryptosys.net/pki/rsakeyformats.html)
[SOF](https://serverfault.com/questions/9708/what-is-a-pem-file-and-how-does-it-differ-from-other-openssl-generated-key-file)




## ASN.1
An abstract notion language that can be used to describe protocols. For instance, the code below is simplest sample to define a protocol called Foo
We use ASN.1 language to do protocol definition as it provide enough abstraction over different protocols. 

```
FooProtocol DEFINITIONS ::= BEGIN

    FooQuestion ::= SEQUENCE {
        trackingNumber INTEGER,
        question       IA5String
    }

    FooAnswer ::= SEQUENCE {
        questionNumber INTEGER,
        answer         BOOLEAN
    }

END
```


## encoding rule

Nothing but just to define how the actual data is encoded. It is super easy to understand when refer to JSON or XML format in the context of HTTP.   
Similar to that, BER is the binary way of encoding, but it extract the field name into octlet, very similar to `gRPC` .

1. Binary  
  1. BER  
  2. DER  
  3. CER  
2. Text  
  1. XER  
  2. ASCII  
  3. JSON
  4. PEM 

### Public key formats supported

-   PKCS#1 RSAPublicKey* (PEM header:  `BEGIN RSA PUBLIC KEY`)
-   X.509 SubjectPublicKeyInfo** (PEM header:  `BEGIN PUBLIC KEY`)
-   XML  `<RSAKeyValue>`

### Encrypted private key formats supported

-   PKCS#8 EncryptedPrivateKeyInfo** (PEM header:  `BEGIN ENCRYPTED PRIVATE KEY`)
-   PKCS#12 (PFX) with PKCS-8ShroudedKeyBag

### Private key formats supported (unencrypted)

-   PKCS#1 RSAPrivateKey** (PEM header:  `BEGIN RSA PRIVATE KEY`)
-   PKCS#8 PrivateKeyInfo* (PEM header:  `BEGIN PRIVATE KEY`)
-   XML  `<RSAKeyPair>`  and  `<RSAKeyValue>`
-   JSON Web Key (JWK) Plaintext RSA Private Key  `"kty":"RSA"`

  

## PKCS
Is a group of public key cryptography standard by RSA Security LLC. Its full name is `public key cryptography standards`  

document | explain | note
--- | --- | ---
1 | 1	Define mathematical property and format of RSA key pair in ASN.1text. Basic algorithm and encoding methods for RSA encryption/decryption.	 | 
2 | RSA encryption for message digest | merge to #1 
3 | Protocol for 2 sides to establish shared secret key over insecured channel without knowing each other ahead of time |  Diffie–Hellman Key Agreement Standard
4 | RSA key syntax | merge to #1	
5 | password based encryption standard |
6 | obsolete |
7 | sign & encrypt message through PKI. Also to spread certificate | 
8 | private certificate key pair, both encrypt or unencrypt | 
9 | define selected attribute types in 6, 7, 8, 10 | 
10 | request certificate for a public key from CA | 
11 | cryptographic token interface | 
12 | private key with pubic key certificate, protected by password encrypted by symmetric key | 
13 | Elliptic-curve cryptography Standard  | 
14 | Pseudo-random Number Generation	|
15 |  allow bearer of cryptographic token to identify themselves |
