---
layout: post
title: "group theory definition"
description: ""
category: study
tags: [math]
date: 2014-11-04
---
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    displayMath: [['$$','$$'], ['\[','\]']],
    processEscapes: true,
    processEnvironments: true,
    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
    TeX: { equationNumbers: { autoNumber: "AMS" },
         extensions: ["AMSmath.js", "AMSsymbols.js"] }
  }});
</script>

## properties
Before introduce group definition, let me list those properties mentioned.  

1. `Closure`:  
For all $a, b \in G$, the relation $a \bullet b \in G$ holds.
2. `associative:`  
For all $a, b, c \in G$, the equation $(a \bullet b) \bullet c = a \bullet (b \bullet c)$ holds.
3. `Commutative`  
For all $a, b \in G$, $a \bullet b = b \bullet a$.
4. `Identity element`:  
There exists an element $e \in G$, such that for all elements $a \in G$, the equation $e \bullet a = a$ holds.
5. `Inversible`:  
For each $a \in G$, there exists an element $a^{-1} \in G$ such that $a \bullet a^{-1} = e$, where $e$ is the identity element. 
6. `Distributive`:  
For all $a, b, c \in G$, the equation $(a+b) \bullet c=a \bullet c+b \bullet c$ holds.



----------

## group(G,•)
consists of a set of elements together with an operation $\bullet$ such that:  

property||$\bullet$
---|---|---:
clojure||$\checkmark$
associative||$\checkmark$
identity||$\checkmark$
inversible||$\checkmark$
commutative||$\times$
distributive||$\times$




----------

## abelian group (A, •)
Abelian group is a `group`, but also have one additional property:


property||$\bullet$
---|---|---:
clojure||$\checkmark$
associative||$\checkmark$
identity||$\checkmark$
inversible||$\checkmark$
commutative||$\checkmark$
distributive||$\times$


-----------



## rings
A commutative ring with unity $(R,+,*)$ is an algebraic structure consisting of a set of elements R together with two binary operations denoted `+` and `*` which satisfy the follow properties for all elements in `R`:  

property|$+$|$*$
---|---:|---:
clojure|$\checkmark$|$\checkmark$
associative|$\checkmark$|$\checkmark$
commutative|$\checkmark$|$\checkmark$
identity|$\checkmark$|$\checkmark$
inversible|$\checkmark$|N/A
distributive|$\times$|$\checkmark$


-----------

## ideal ring
Let $(R,+,*)$ be a ring; A non-empty subset $I$ of $R$ called a `ideal` of the ring if:

1. $(I,+)$ is a group.
2. $i*r \in I$ for all $i \in I$ and $r \in R$.

property||$+$
---|---|---:
clojure||$\checkmark$
associative||$\checkmark$
identity||$\checkmark$
inversible||$\checkmark$
commutative||$\times$
distributive||$\times$

---------

## field 
field is a set of elements which is closed under two binary operations, which we denote by $+$ and $\times$.


property|$+$|$\times$
---|---:|---:
clojure|$\checkmark$|$\checkmark$
associative|$\checkmark$|$\checkmark$
commutative|$\checkmark$|$\checkmark$
identity|0|1
inversible|$\checkmark$|!0
distributive|$\times$|$\checkmark$
