---
layout: post
title: "load jar in repl"
description: ""
category: development
tags: [clojure]
---
{% include JB/setup %}
I have been studying `clojure` for a few days, but I need to write test code in files then use `lein run` to do the test work, which is definitely productiveless.  
for you want to load a jar in `repl`  
{%highlight clojure%}
(require '[clojure.data.json :as json])
{%endhighlight%}
New version of clojure deprecated the `use` function.  
They trying to propagate `require`.  
Since load all functions into current namespace will result into a banch of problems.  
By using `require` with `:all` ane `:refer` options, you could do the same work in a more flexible way.  

----

{%highlight clojure%}
;Also write some tips for loading `.clj` files manully.
;; file located at src/address_book/core.clj
(load "address_book/core") ;just need class name with slash
(load-file "src/address_book/core.clj");need canonical name and full clj extention
;remove namespace from current one
(remove-ns 'my-new-namespace)
{%endhighlight%}




