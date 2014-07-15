---
layout: post
title: "linear regression"
description: ""
category: development
tags: [machine learning]
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


###premise
1. $X$ is a `matrix` which has `m` rows and `n` columns, that means it is a $m \times n$ matrix, represents for training set.
2. $\theta$ is a $1 \times n$ `vector`, stands for hypothesis parameter.
3. $y$ is a $m \times 1$ `vector`, stands for real value of training set.
4. $\alpha$ named `learning rate` for defining learning or descending speed.



##Hypothesis

$$
h_{\theta}(X) = X \times \theta^T
$$

##Cost function

$$
J(\theta)=\left(\frac{1}{2m}\right)\sum_{i=1}^m[h_{\theta}(X^{(i)}) - y^{(i)}]^2
$$

##Gradient Descend

$$
\begin{aligned}
grad(j) &= \frac{\partial}{\partial \theta_j} J(\theta)  \\
        &= \frac{1}{m}\sum_{i=1}^m[(h_{\theta}(X^{(i)}) - y^{(i)}) X_{j}^{(i)}]
\end{aligned}
$$


##Gradient Descend for Linear Regression

$$
\theta_j=\theta_j - \alpha \times grad(j)
$$
