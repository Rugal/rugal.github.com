---
layout: post
title: "Linux shell redirect"
description: ""
category: operation
tags: [bash]
date: 2013-07-29
---
In some situation, that we need to hide the output information of a
application, such goagent or some useful manual scripts.Thus redirect into a
blackhole is the best choice you can make.  
Here I will introduce the representation of streams in linux bash programming:

+ 0 :STDIN
+ 1 :STDOUT
+ 2 :STDERR

upon which we could use that number to redirect data or information into
another stream.  
Here is our example:  

```bash
$CommandThatProduceOutputs 1>/dev/null 2>&1
```

As we could see that,through `>`, we could redirect the number represented
stream into another place.  
If you want to redirect one stream into another stream, using `&` to represent.
