---
layout: post
title: "cut command tutorial"
description: ""
category:  operation
tags: [bash, linux]
date: 2019-05-05
---

```bash
cut OPTION... [FILE]...
```

```
$ cat state.txt
Andhra Pradesh
Arunachal Pradesh
Assam
Bihar
Chhattisgarh
```


## -b
extract single character

### one character
```bash
$ cut -b 1,2,3 state.txt
And
Aru
Ass
Bih
Chh
```

### consecutive string
```bash
$ cut -b 1-3,5-7 state.txt
Andra
Aruach
Assm
Bihr
Chhtti
```


## -c
cut by column

### cut by one column

```bash
$ cut -c 2,5,7 state.txt
nr
rah
sm
ir
hti
```

### by consecutive column

```bash
$ cut -c 1-7 state.txt
Andhra
Arunach
Assam
Bihar
Chhatti
```

## -d
cut by delimiter

```bash
$ cut -d " " -f 1 state.txt
Andhra
Arunachal
Assam
Bihar
Chhattisgarh
```

```bash
$ cut -d " " -f 1,2 state.txt --output-delimiter='%'
Andhra%Pradesh
Arunachal%Pradesh
Assam
Bihar
Chhattisgarh
```
