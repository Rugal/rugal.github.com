---
layout: post
title: "Machine Learning Notation"
description: ""
category:  development
tags: [machine learnig]
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


Notation | Note
--- | ---
$X^{(i)}$ | No. i training set
$X^{[i]}$ | No. i layer of neuron
$X^{\textbraceleft i \textbraceright}$ | No. i mini batch
$X_{i}$ | No. i feature
