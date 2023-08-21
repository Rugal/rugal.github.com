---
layout: post
title: "tr command tutorial"
description: ""
category:  operation
tags: [bash, linux]
date: 2019-04-07
---

```bash
tr [OPTION] SET1 [SET2]
```
## replace
```bash
cat content | tr “[:lower:]” “[:upper:]”
```


## -c
complements the set of characters in string.i.e., operations apply to characters not in the given set  
```bash
echo "my ID is 73535" | tr -cd [:digit:]
```

Output:
```
73535
```

## -d
delete characters in the first set from the output.  
```bash
echo "Welcome To GeeksforGeeks" | tr -d 'w'
```
Output:
```
elcome To GeeksforGeeks
```

## -s
replaces repeated characters listed in the set1 with single occurrence  
```bash
echo "Welcome    To    GeeksforGeeks" | tr -s [:space:] ' '
```
Output:
```
Welcome To GeeksforGeeks
```
## -t
first truncates set1 to the length of set2, then do replacement
```bash
echo 'the cellar is the safest place' | tr -t abcdefghijklmn 123
```

output
```
the 3ell1r is the s1fest pl13e
```

without `-t`, character in `set1` that is after set2 will repeat the last character in `set1`
```
t33 33331r 3s t33 s133st p3133
```
