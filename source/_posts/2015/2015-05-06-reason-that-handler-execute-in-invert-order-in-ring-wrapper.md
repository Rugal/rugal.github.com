---
layout: post
title: "reason that handler execute in invert order in ring wrapper"
description: ""
category: development
tags: [clojure]
date: 2015-05-06
---

the `middleware` in [ring](https://github.com/ring-clojure/ring/wiki/Concepts#middleware) provides another way to understand function that return function.  
Here I am gonno explain a little bit.  
The code below comes from [stackoverflow](http://stackoverflow.com/a/19456920/1242236).
```clojure
(let [post-wrap (fn [handler]
                  (fn [request]
                    (str (handler request) ", post-wrapped")))
;this function will call handler first, then to form string
      pre-wrap  (fn [handler]
                  (fn [request]
                    (handler (str request ", pre-wrapped"))))
;this function will form string first, then to call handler
      around    (fn [handler]
                  (fn [request]
                    (str (handler (str request ", pre-around")) ", post-around")))
;this function will first form a string, then call handler,
;and append another string lastly
      handler   (-> 
                  (pre-wrap identity)
                  post-wrap
                  around) ]
;this can be rewritten as (around (post-wrap (pre-wrap identity)))
     (println (handler "(Rugal Bernstein)")))
```
>(Rugal Bernstein), pre-around, pre-wrapped, post-wrapped, post-around


The most important thing is that each function in code will return a function and wait for one more parameter to activate the inner one.  

So after wrap, the `pre-wrap` function actually looks like this:  

    (fn [request] (str (identity request) ", post-wrapped"))

And `post-wrap` becomes:  

    (fn [request] (str (pre-wrap request) ", post-wrapped"))

So as `around`:  

    (fn [request] (str (post-wrap (str request ", pre-around")) ", post-around"))

After this, when we call `(handler "(Rugal Bernstein)")`, of course it will be a invert order execution.  
This is a good example for non-funtional programmer to think from the perspective of functional programming.  
Try to understand it by yourself, you will learn more than just copying.
