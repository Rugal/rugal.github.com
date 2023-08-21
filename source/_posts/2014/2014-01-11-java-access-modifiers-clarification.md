---
layout: post
title: "java access modifiers clarification"
description: ""
category: development
tags: [java]
date: 2014-01-11
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

Modifier| |Class | | Package | | Subclass | | World
---|---|---|---|---|---|---|---|---
public| |$\checkmark$ | |$\checkmark$|| $\checkmark$| |$\checkmark$
protected | |$\checkmark$|| $\checkmark$|| $\checkmark$| |$\times$
No modifier || $\checkmark$|| $\checkmark$|| $\times$| |$\times$
private || $\checkmark$|| $\times$| |$\times$|| $\times$

It is probably worth pointing out that in the case of no modifier, whether or not the subclass can see it's superclass's methods/fields depends on the location of the subclass. If the subclass is in another package, then the answer is it `can't`.   
If the subclass is in the same package then it CAN access the superclass methods/fields.
