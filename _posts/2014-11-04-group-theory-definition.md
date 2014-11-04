---
layout: post
title: "group theory definition"
description: ""
category: math
tags: []
---
{% include JB/setup %}
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
##group(G,•)
consists of a set of elements together with an operation * such that:  

1. `Closure`:  
For all $a, b \in G$, the result of the operation $a • b \in G$ holds.
2. `Association:`  
For all $a, b, c \in G$, the equation $(a • b) • c = a • (b • c)$ holds.
3. `Identity element`:  
There exists an element $e \in G$, such that for all elements $a \in G$, the equation $e • a = a • e = a$ holds.
4. `Inverse element`:  
For each $a \in G$, there exists an element $b \in G$ such that $a • b = b • a = e$, where e is the identity element. We use $a^{-1}$ to represent its inverse element.


##abelian group (A, •)
Abelian group is a `group`, but also have one additional property:

1. `Commutative`  
For all $a, b \in A$, $a • b = b • a$.
