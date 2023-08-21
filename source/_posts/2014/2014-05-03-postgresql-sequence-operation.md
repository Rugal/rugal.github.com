---
layout: post
title: "postgresql sequence operation"
description: ""
category: operation
tags: [postgresql]
date: 2014-05-03
---

postgresql use `serial` as sequence type.  
It conveniently generate a sequence named `$tablename_$columnname_seq` by default, which I think is so easy to use.  

### set current value for sequence

    SELECT setval('sequence_name', 21, true);

For which the last parameter `true` is the tag for `first use`; if true, it cannot be used as sequencer.
