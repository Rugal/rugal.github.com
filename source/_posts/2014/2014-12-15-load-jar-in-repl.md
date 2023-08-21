---
layout: post
title: "load jar in repl"
description: ""
category: development
tags: [clojure]
date: 2014-12-15
---
I have been studying `clojure` for a few days, but I need to write test code in files before using `lein run` to test it, which is definitely productiveless.   
One way to load a jar in `repl`    

```clojure
(require '[clojure.data.json :as json])
```
New version of clojure deprecated the `use`  to make it more consistant to import a package.   
Since loading all functions into current namespace will result into a bunch of confliction problems.  
So it is recommended to use `require`.  

By using `require` with `:refer` and `:all` options, you could achieve the same work in a more flexible and consistant way.  

----

```clojure
;Also write some tips for loading `.clj` files manully.
;; file located at src/address_book/core.clj
(load "address_book/core") ;just need class name with slash
(load-file "src/address_book/core.clj");need canonical name and full clj extention
;remove namespace from current one
(remove-ns 'my-new-namespace)
```
