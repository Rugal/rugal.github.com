---
layout: post
title: "PKI clarification"
description: ""
category:  operation
tags: [security]
date: 2021-03-06
---

[reference](https://www.cryptosys.net/pki/rsakeyformats.html)
[SOF](https://serverfault.com/questions/9708/what-is-a-pem-file-and-how-does-it-differ-from-other-openssl-generated-key-file)

## file encoding

### BER/DER
It is the binary format.  A way to encode ASN.1 syntax in binary.
The first byte in the file should be a `0` character (U+0030)

### PEM
Defined in RFCs  [1421](https://tools.ietf.org/html/rfc1421)  through  [1424](https://tools.ietf.org/html/rfc1424), this is a container format that may include just the public certificate (such as with Apache installs, and CA certificate files  `/etc/ssl/certs`), or may include an entire certificate chain including public key, private key, and root certificates. Confusingly, it may also encode a CSR (e.g. as used  [here](https://jamielinux.com/docs/openssl-certificate-authority/create-the-intermediate-pair.html)) as the PKCS10 format can be translated into PEM. 
The name is from  [Privacy Enhanced Mail (PEM)](https://en.wikipedia.org/wiki/Privacy-enhanced_Electronic_Mail), a failed method for secure email but the container format it used lives on, and is a base64 translation of the x509 ASN.1 keys.

It is like the following container format, where `???` is the actual name of key, for instance `RSA`, `PUBLIC`, `PRIVATE` etc.,

```
-----BEGIN ??? -----
-----END ??? -----
```

### key
This is a PEM formatted file containing just the private-key of a specific certificate and is merely a conventional name and not a standardized one. In Apache installs, this frequently resides in `/etc/ssl/private`. 
The rights on these files are very important, and some programs will refuse to load these certificates if they are set wrong.


### cert, cer, crt
A .pem (or rarely .der) formatted file with a different extension, one that is recognized by Windows Explorer as a certificate, which .pem is not.


## some file recognition
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

  
## Create RSA key pair  
  
You may refer to some [Command](https://rietta.com/blog/openssl-generating-rsa-key-from-command/)  
  
### generate private key  
  
This operation requires a password, this will generate a `traditional` format, which is `PKCS#1`.    
  
```  
openssl genrsa -aes256 -out private.pem 2048  
```  
  
You will need to provide a password, this is required as it is. It will be removed by the following command.       
  
### remove password  
```  
openssl rsa -in private.pem -outform PEM -out private_unencrypted.pem  
```  
  
### get public key from private key  
You can use both encrypted and unencrypted private key to generate public key.    
  
```  
openssl rsa -in private.pem -outform PEM -pubout -out public.pem  
```  
  
### convert pkcs#1 to pkcs#8  
  
The original format is the called `traditional` format, essentially is `PKCS#1`.    
`PKCS#8` is a more stable and standard format, a recommended format.  
  
The command below will convert private key in format `PKCS#1` to `PKCS#8`.    
Please specify `-nocrypt` so no password is required.    
  
```  
openssl pkcs8 -topk8 -nocrypt -in private.pem -out pkcs8.pem  
```
