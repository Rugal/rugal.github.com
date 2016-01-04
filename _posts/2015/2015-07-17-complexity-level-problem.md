---
layout: post
title: "complexity level problem"
description: ""
category: study
tags: [math, algorithm]
---
{% include JB/setup %}

[Geeks for Geeks](http://www.geeksforgeeks.org/np-completeness-set-1/)  

#P
Such like `Negtive weight cycle detection` problem.  
Exists a polynomial algorithm to solve this problem.   
is set of problems that can be solved by a [deterministic Turing machine]({%post_url 2016/2016-01-04-turing-machine %}) in Polynomial time.  

#NP
Exists a polynomial algorithm to verify this problem.  
is set of decision problems that can be solved by a [Non-deterministic Turing Machine]({%post_url 2016/2016-01-04-turing-machine %}) in Polynomial time.  
Informally, NP is set of decision problems which can be solved by a polynomial time via a “Lucky Algorithm”, a magical algorithm that always makes a right guess among the given set of choices.  
Hence NP is the super set of P.  

#NP-Complete
Such like Hamilton problem.  

1. Is an NP problem.
2. any NP problem could be reduced to this problem.

#NP-hard

1. any NP problem could be reduced to this problem.  

Hence NP-Hard is the super set of NP-Complete.  
