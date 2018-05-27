---
layout: post
title: "Convert Putty Key to Openssh Format"
description: ""
category: operation
tags: [ssh]
---
{% include JB/setup %}

If you only have putty key and you want to get openssh format from it, try this one:  

```bash
puttygen your_input_putty_key_file -O private-openssh -o your_output_key_file
```
