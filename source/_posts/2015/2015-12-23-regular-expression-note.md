---
layout: post
title: "Regular Expression Note"
description: ""
category: development
tags: [regexp]
date: 2015-12-23
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

symbol|description
---|---
.|$x=1$
?|$x==1\shortmid x==0$
+|$x\geq 1$
*|$x\geq 0$
{n}|$x=n$
{min,}|$x\geq min$
{min,max}|$min<x<max$
$[ ]$|Match a single character in
$[\text{^}  ]$|Match a single character not in
