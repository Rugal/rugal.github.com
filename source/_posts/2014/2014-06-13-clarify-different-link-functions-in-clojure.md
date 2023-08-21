---
layout: post
title: "clarify different link functions in clojure"
description: ""
category: development
tags: [clojure]
date: 2014-06-13
---
A great useful [tutorial](http://blog.8thlight.com/colin-jones/2010/12/05/clojure-libs-and-namespaces-require-use-import-and-ns.html) and I am there to make this summary.

## refer
refer takes a symbol argument and maps all the public symbols from that namespace into the current namespace.   
The symbols are still mapped to the values in their original namespace. By calling refer in the example, you created a namespace mapping from the symbol `greetings/println` to the Var `#'clojure.core/println`.  

```clojure
(clojure.core/refer 'clojure.core)
(refer 'clojure.core :exclude '(map set))
(refer 'clojure.core :only '(println prn))
```


## require
To link another class/function with our namespace, but its own namespace kept.  Needs canonical namespace to invoke. 
Loads libs, skipping any that are already loaded. Each argument is either a libspec that identifies a lib, a prefix list that identifies multiple libs whose names share a common prefix, or a flag that modifies how all the identified libs are loaded. Use :require in the ns macro in preference to calling this directly.   


```clojure
user=> (require 'clojure.string 'clojure.test :verbose :reload) ;separately
user=> (require '[clojure.string :as string]) ;use alias
user=> (require '(clojure string test)) ;import NS of same root
user=> (require '(clojure [string :as string] test)) ; combination
user=> (require '[clojure.data.json :refer :all]) ; this :refer is the most encouraged method

user=> (clojure.string/join [1 2 3])  ;use ns/fn to invoke
user=> (string/join [1 2 3])  ;use alias to shorten if alias exists
```
As you need to use `namespace/function` to refer to target function.


## use
To import another class/function into our namespace, hence target namespace just like `merged` into your namespace.  
This function combined `require` and `refer`.  But for recent version, they tend to deprecated `use` by using `(require '[clojure.data.json :refer :all])`.  
```clojure
user=> (use 'clojure.string)
user=> (use '[clojure.string :only [split]])
user=> (use '[clojure.string :exclude [replace reverse]]) ; To import all except those
;since USE will merge target ns into current ns
; [:only] option makes it possible to merge partially.
user=> (split "a,b,c" #",") ;split is a function defined in [string] ns
```
You just need to use `function` to refer to target function directly without referring namespace.
    
## import
To import `Java` class into namespace and shorten the invock name.

```clojure
(java.util.Date.) ;you could invoke this class by its canonical  name
(import 'java.util.Date)
(Date.) ;now just calling class name
```
You could shorten the canonical name and just need to use simple name of a `class` to refer to target class



## namespace declare
To simply those kinds of link function, use `(ns)` function to bring them all together.  

```clojure
(ns my-great-project.core
    "This namespace is CRAZY!"
    (:use [clojure.string :only [split join]] :reload)
    (:require clojure.stacktrace
        [clojure.test :as test]
        (clojure template walk) 
        :verbose
    )
    (:import (java.util Date GregorianCalendar))
)
```
You could use random quantity of any `:use` `:require` and `:import` in this function.


## example
An original innovated prime number function:  
```clojure
(ns rugal.core
    "This namespace is belong to Rugal Bernstein!")
(defn aliquot? "To  determine if a could be aliquoted by b"
    [a b]
    (= 0 (mod a b)))
(defn smallest-divisor
    "Get smallest divisor of a given number"
    [n]
    (if (even? n)
        2
        (loop [i 3]
        (if (aliquot? n i)
        i
        (recur (+ i 2))
        ))))
(defn prime? "To determine if given number is prime"
    [n]
    (if (= n (smallest-divisor n))
        true
        false
    ))
```
