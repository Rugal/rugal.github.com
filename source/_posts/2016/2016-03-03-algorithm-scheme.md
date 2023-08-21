---
layout: post
title: "Algorithm Scheme"
description: ""
category: study
tags: [algorithm]
date: 2016-03-03
---

condition|method
:--|--:
Each phase has only one state|递推
Optimal state of each phase comes from phase right before|贪心
Optimal state of each phase comes from combination of state of overall phase before|搜索
Optimal state of each phase comes from some states or phases before|DP


------

>每个阶段的最优状态可以从之前某个阶段的某个或某些状态直接得到 

这个性质叫做最优子结构  

>而不管之前这个状态是如何得到的

这个性质叫做无后效性。
