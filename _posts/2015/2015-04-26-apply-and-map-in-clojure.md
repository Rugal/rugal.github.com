---
layout: post
title: "apply and map in clojure"
description: ""
category: development
tags: [clojure]
---
{% include JB/setup %}

It is a very confusing comparison between `map` and `apply`.  
{%highlight clojure%}
; data preparation
(def data  [[1,2,3],[1,3,4],[1,5,6]])
{%endhighlight%}

The famous function `map` means to call function provided to each elements in collections once at a time.  
{%highlight clojure%}
(map println data)

;[1 2 3]
;[1 3 4]
;[1 5 6]
;(nil nil nil)
{%endhighlight%}
There are 3 elements in `data`, `map` calls `println` for each element.  

Whereas `appy` just call function once, but extract all elements from collection first.  
{%highlight clojure%}
(apply println data)

;[1 2 3] [1 3 4] [1 5 6]
;nil
{%endhighlight%}
Here only 1 line of printing.  

Some more experiments:  
{%highlight clojure%}
(apply map println data)

;1 1 1
;2 3 5
;3 4 6
;(nil nil nil)
{%endhighlight%}

Obviously apply extract elements from collection.  
{%highlight clojure%}
(eval `(map println ~@data))
;this is equavalent to 
(map println [1,2,3] [1,3,4] [1,5,6])

;1 1 1
;2 3 5
;3 4 6
;(nil nil nil)
{%endhighlight%}
