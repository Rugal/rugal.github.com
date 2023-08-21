---
layout: post
title: "linear regression"
description: ""
category: development
tags: [machine learning]
date: 2014-07-15
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


## premise
1. $X$ is a `matrix` which has `m` rows and `n` columns, that means it is a $m \times n$ matrix, represents for training set.
2. $\theta$ is a $1 \times n$ `vector`, stands for hypothesis parameter.
3. $y$ is a $m \times 1$ `vector`, stands for real value of training set.
4. $\alpha$ named `learning rate` for defining learning or descending speed.
5. $S(X_j)$ means to get standard deviation of the j feature from training set.



------

# 1. Hypothesis

>Draw hypothesis of a pattern.

$$
h_{\theta}(X) = X \times \theta^T
$$

# 2. Cost

>Calculate the Cost for single training point.

$$Cost(X^{(i)},y^{(i)})=[h_{\theta}(X^{(i)}) - y^{(i)}]^2$$

# 3. Cost function

>Draw cost function for iterating whole training set.

$$
\begin{aligned}
J(\theta) &=\left(\frac{1}{2m}\right)\sum_{i=1}^m Cost(X^{(i)},y^{(i)})    \\
          &=\left(\frac{1}{2m}\right)\sum_{i=1}^m[h_{\theta}(X^{(i)}) - y^{(i)}]^2
\end{aligned}
$$


# 4. Get optimized parameter

>Learn from training set to get optimized parameter for proposed algorithm.

### Gradient Descend###

>Complicate to implement.  
>suitable for any senario.  

$$
\begin{aligned}
grad(j) &= \frac{\partial}{\partial \theta_j} J(\theta)  \\
        &= \frac{1}{m}\sum_{i=1}^m[(h_{\theta}(X^{(i)}) - y^{(i)}) X_{j}^{(i)}]
\end{aligned}
$$

$$\theta_j := \theta_j - \alpha \times grad(j) \quad \text{Repeat many times}  $$  

###  Normal equation###

>Convenient, but performance bad while `m` grow large than 100000.  
>Unable to conquer non-invertable matrix.  

$$
\theta = (X^{T}X)^{\prime}X^{T}y
$$



## Feature scaling
>Use feature scaling to optimize training set.  
>Make gradient descend converge much faster.

$$X_j=\frac{X_j - \mu}{a}$$


$$
\begin{aligned}
a &= max(X_j)-min(X_j) \\
  &  or \\
  &= S(X_j)
\end{aligned}
$$
