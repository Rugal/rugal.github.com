---
layout: post
title: "Algorithm Scheme"
description: ""
category: study
tags: [algorithm]
---
{% include JB/setup %}

condition|method
--|--
每个阶段只有一个状态|递推
每个阶段的最优状态都是由上一个阶段的最优状态得到的|贪心
每个阶段的最优状态是由之前所有阶段的状态的组合得到的|搜索
每个阶段的最优状态可以从之前某个阶段的某个或某些状态直接得到而不管之前这个状态是如何得到的|DP


>每个阶段的最优状态可以从之前某个阶段的某个或某些状态直接得到 

这个性质叫做最优子结构；
>而不管之前这个状态是如何得到的

这个性质叫做无后效性。
