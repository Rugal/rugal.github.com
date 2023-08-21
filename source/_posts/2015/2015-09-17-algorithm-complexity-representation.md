---
layout: post
title: "Algorithm complexity representation"
description: ""
category: development
tags: [algorithm, math]
date: 2015-09-17
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

Notation| bound|notes
----|----|----
$O(n)$|upper bound tight|most common
$\Theta (n)$|upper and lower tight | most accurate
$\Omega(n)$|lower bound tight| 
$o(n)$|upper bound loose|
$\omega(n)$| lower bound loose |
