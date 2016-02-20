---
layout: post
title: "logistic regression"
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

## premise
1. $X$ is a `matrix` which has `m` rows and `n` columns, that means it is a $m \times n$ matrix, represents for training set.
2. $\theta$ is a $1 \times n$ `vector`, stands for hypothesis parameter.
3. $y$ is a $m \times 1$ `vector`, stands for real value of training set.
4. $\alpha$ named `learning rate` for defining learning or descending speed.



-------


# 1. Hypothesis

>Draw hypothesis of a pattern.  
>Since classification problem range from 0 to 1  
>We need to make use of this `sigmoid` function  

$$
h_{\theta}(X) = g(X \times \theta^T)  \\
g(z) = \frac{1}{1 + e^{-z}}
$$

# 2. Cost

>Calculate the Cost for single training point.

$$
Cost(X,y) = \left\{
  \begin{array}{l l}
    -log(h_\theta (X)) & \quad \text{if $y = 1$  } \\
    -log(1-h_\theta (X))   &\quad \text{if $y = 0$ } \\
  \end{array} \right.   \\
$$

$$
\text{simplified as below for any $y$} \\
Cost(X,y) =-[y \times log(h_\theta(X))+(1-y) \times log(1-h_\theta(X))]
$$  


# 3. Cost function

>Draw cost function for iterating whole training set.

$$
\begin{aligned}
J(\theta) &=(\frac{1}{m})\sum_{i=1}^m Cost(X^{(i)},y^{(i)})    \\
&= \frac{-1}{m}\sum_{i=1}^m[y^{(i)}log(h_\theta(X^{(i)}))+(1-y^{(i)})log(1-h_\theta(X^{(i)}))]
\end{aligned}
$$


# 4. Get optimized parameter

>Learn from training set to get optimized parameter for proposed algorithm.

### Gradient Descend###

$$
\begin{aligned}
grad(j) &= \frac{\partial}{\partial \theta_j} J(\theta)  \\
        &= \frac{1}{m}\sum_{i=1}^m[(h_\theta(X^{(i)}) - y^{(i)}) \times X^{(i)}_j] \\
\end{aligned}
$$

$$
\begin{aligned}
\theta_j &:= \theta_j - \alpha \times grad(j) \quad \text{Repeat many times}  \\
          &:= \theta_j - \alpha \sum_{i=1}^m[(h_\theta(X^{(i)}) - y^{(i)}) \times X^{(i)}_j] 
\end{aligned}
$$



###  Others ###

1. Conjugate gradient
2. BFGS
3. L-BFGS
