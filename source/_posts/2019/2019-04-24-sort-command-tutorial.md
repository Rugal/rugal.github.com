---
layout: post
title: "sort command tutorial"
description: ""
category:  operation
tags: [bash, linux]
date: 2019-04-24
---

```bash
sort [_OPTION_]... [_FILE_]...  
sort [_OPTION_]... _--files0-from=F_
```

## parameter

option | description
---|---
-k | sort by particular column
-b|	Ignores leading blanks.
-d|Considers only blanks and alphanumeric characters.
-f	|Fold lower case to upper case characters.
-g	|Compares according to general numerical value.
-i	|Considers only printable characters.
-M|	Compares (unknown) < 'JAN' < ... < 'DEC'.
-h	|Compare human readable numbers (e.g., 2K 1G).
-n|	Compares according to string numerical value.
-R|	Shuffles, but groups identical keys. See also: [shuf](https://en.wikipedia.org/wiki/Shuf)
-r	|Reverses the result of comparisons.
