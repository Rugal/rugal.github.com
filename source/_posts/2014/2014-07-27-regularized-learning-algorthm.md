---
layout: post
title: "regularized learning algorthm"
description: ""
category: development
tags: [machine learning]
date: 2014-07-27
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

There will have many problems when training machine learning algorithm.  

1. `under fitting problem`
    Feature Polynomial too low for fitting target training set, unable to meet training set's performance, let alone future data.  
2. `overfitting problem`
    Feature polynomial too high for fitting target training set, means fit training set's performance too well, but unable to predict future data.  


Regularization could ameliorate or to reduce over-fitting problem.  

### premise
1. $m$ is the number of training set records.
2. $n$ is the number of features
3. $\lambda$ is penality value for reducing high polynomial features' effect, with larger this value is, smaller the effect is, but learning algorithm turn out to under fitting if $\lambda$ too high.



--------

## regularized Linear regression

>Cost function

$$
J(\theta)=\frac{1}{2m}\left[ \sum^{m}_{i=1} (h_{\theta}(x^{(i)})-y^{(i)})^2 + \lambda \sum^{n}_{j=1} \theta^2_j  \right]
$$

>Gradient descend

$$
\begin{aligned}
\theta_0 &:=\theta_0-\alpha \frac{1}{m}\sum^{m}_{i=1}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_0 \\
\theta_j &:=\theta_j-\alpha \left[\frac{1}{m}\sum^{m}_{i=1}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_j + \frac{\lambda}{m}\theta_j \right] \quad \text{(j=1,2,3...,n)}
\end{aligned}
$$

## regularized logistic regression



>Cost function

$$
J(\theta)=-\left[ \frac{1}{m} \sum^{m}_{i=1} y^{(i)}  \log h_\theta(x^{(i)})+(1-y^{(i)}) \log(1-h_\theta(x^{(i)})) \right] + \frac{\lambda}{2m}\sum^{n}_{j=1} \theta^2_j
$$


>Gradient descend

$$
\begin{aligned}
\theta_0 &:=\theta_0-\alpha \frac{1}{m}\sum^{m}_{i=1}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_0 \\
\theta_j &:=\theta_j-\alpha \left[\frac{1}{m}\sum^{m}_{i=1}(h_{\theta}(x^{(i)})-y^{(i)})x^{(i)}_j + \frac{\lambda}{m}\theta_j \right] \quad \text{(j=1,2,3...,n)} \\
\end{aligned} \\
h_{\theta}(x)=\frac{1}{1+e^{-\theta^{T}x}}
$$
