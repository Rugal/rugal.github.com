---
layout: post
title: "cyclic code definitions"
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


##cyclic subspace
A subspace $S$ of $V_n(F)$ is a cyclic subspace if whenever  

$$
(a_1a_2a_3a_4...a_n) \in S \text{ then } (a_na_1a_2a_3...a_n-1) \in S
$$  

In other words, $S$ is a subspace and for each vector $a \in S$, every `cyclic shift` of a is also in $S$.


##cyclic code
A linear code $C$ is a cyclic code if $C$ is a cyclic subspace.  
Examples:

1. $S=\{(0000)\} \subseteq V_4(Z_2)$
2. $S=\{(0000),(1111)\} \subseteq V_4(Z_2)$
3. $S=\{(0000),(1111),(1100),(0110),(0011),(1001),(1010),(0101)\} \subseteq V_4(Z_2)$


-----


##rings
A commutative ring with unity $(R,+,*)$ is an algebraic structure consisting of a set of elements R together with two binary operations denoted `+` and `*` which satisfy the follow properties for all elements in `R`:  

1. $(R,+)$ is an abelian group with identity $e$.
2. $(R,*)$ is not a group, but associative, with identity element $1$, commutative.
3. `*` upon `+` is distributive(* prior to +).



##ideal ring
Let $(R,+,*)$ be a ring; A non-empty subset $I$ of $R$ called a `ideal` of the ring if:

1. $(I,+)$ is a group.
2. $i*r \in I$ for all $i \in I$ and $r \in R$.
