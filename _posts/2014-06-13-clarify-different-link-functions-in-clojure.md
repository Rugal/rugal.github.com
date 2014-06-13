---
layout: post
title: "clarify different link functions in clojure"
description: ""
category: development
tags: [clojure]
---
{% include JB/setup %}
A great useful [tutorial](http://blog.8thlight.com/colin-jones/2010/12/05/clojure-libs-and-namespaces-require-use-import-and-ns.html) and I am there to make this summary.

###require
To link another class/function with our namespace, but its own namespace kept  
{%highlight clojure%}
user=> (require 'clojure.string 'clojure.test :verbose :reload) ;separately
user=> (require '[clojure.string :as string]) ;use alias
user=> (require '(clojure string test)) ;import NS of same root
user=> (require '(clojure [string :as string] test)) ; combination

user=> (clojure.string/join [1 2 3])  ;use ns/fn to invoke
user=> (string/join [1 2 3])  ;use alias to shorten if alias exists
{%endhighlight%}
As you need to use `namespace/function` to refer to target function

###use
To import another class/function into our namespace, hence namespace just like `merged` into your namespace
{%highlight clojure%}
user=> (use 'clojure.string)
user=> (use '[clojure.string :only [split]])
;since USE will merge target ns into current ns, :only option makes it possible to merge partially.
user=> (split "a,b,c" #",") ;split is a function defined in [string] ns
{%endhighlight%}        
You just need to use `function` to refer to target function directly without referring namespace
    
###import
To import `Java` class into namespace and shorten the invocktion name
{%highlight clojure%}
(java.util.Date.) ;you could invoke this class by its canonical  name
(import 'java.util.Date)
(Date.) ;now just calling class name
{%endhighlight%}
You could shorten the canonical name and just need to use simple name of a `class` to refer to target class

