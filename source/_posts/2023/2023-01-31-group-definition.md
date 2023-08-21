---
layout: post
title: "Group Definition"
description: ""
category: development
tags: [math]
date: 2023-01-31
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

If we have element `a` and operator `*` that conform the following property.

### group property
1. 封闭性（Closure）

$$
\text{if } a, b \in G \text{ then } a*b \in G
$$


2. 结合律（Associativity）

$$
\text{if } a, b, c \in G \text{ then } (a*b)*c = a*(b*c)
$$


3. 同一/恒等/单位元 （Identity）

$$
\exists e \Rightarrow \forall a, e * a = a * e = a
$$

4. 逆元（Inverse）

$$  
\text{if } a \in G, \exists a^{-1}, \text{then } a * a^{-1} = e
$$  


### different group

* |C | A | ID | IN
--|--|--|--|--
semigroup| $\checkmark$ | $\checkmark$ 
monoid  | $\checkmark$ | $\checkmark$ | $\checkmark$ 
group | $\checkmark$ | $\checkmark$ | $\checkmark$ | $\checkmark$
