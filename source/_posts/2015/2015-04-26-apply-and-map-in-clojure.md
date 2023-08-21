---
layout: post
title: "apply and map in clojure"
description: ""
category: development
tags: [clojure]
date: 2015-04-23
---

It is a very confusing comparison between `map` and `apply`.  
```clojure
; data preparation
(def data  [[1,2,3],[1,3,4],[1,5,6]])
```

The famous function `map` means to call function provided to each element in collection once at a time.  
```clojure
(map println data)

;[1 2 3]
;[1 3 4]
;[1 5 6]
;(nil nil nil)
```
There are 3 elements in `data`, `map` calls `println` for each element.  

Whereas `appy` just call function once, but extract all elements from collection before calling.  
```clojure
(apply println data)

;[1 2 3] [1 3 4] [1 5 6]
;nil
```
Here only has 1 line of printing.  

Some more experiments:  
```clojure
(apply map println data)

;1 1 1
;2 3 5
;3 4 6
;(nil nil nil)
```

Obviously, apply extracts elements from collection.  
```clojure
(eval `(map println ~@data))
;this is equivalent to 
(map println [1,2,3] [1,3,4] [1,5,6])

;1 1 1
;2 3 5
;3 4 6
;(nil nil nil)
```
