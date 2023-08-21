---
layout: post
title: "complexity level problem"
description: ""
category: study
tags: [math, algorithm]
date: 2015-07-17
---

[Geeks for Geeks](http://www.geeksforgeeks.org/np-completeness-set-1/)  

# P
Such like `Negtive weight cycle detection` problem.  
Exists a polynomial algorithm to solve this problem.   
is set of problems that can be solved by a [deterministic Turing machine]({%post_url 2016-01-04-turing-machine %}) in Polynomial time.  

# NP
Such as `Tetrics` problem.  
Exists a polynomial algorithm to verify this problem.  
is set of decision problems that can be solved by a [Non-deterministic Turing Machine]({%post_url 2016-01-04-turing-machine %}) in Polynomial time.  
Informally, NP is set of decision problems which can be solved by a polynomial time via a “Lucky Algorithm”, a magical algorithm that always makes a right guess among the given set of choices.  
Hence NP is the super set of P.  

# NP-Complete
Such like `SAT`, `Mine sweep`, `Sudoku`, `Travel sales path` problem.  

1. Is an NP problem.
2. any NP problem could be reduced to this problem.

# NP-hard
Such as `Tetrics` problem.  

1. any NP problem could be reduced to this problem.  

Hence NP-Hard is the super set of NP-Complete.  


# EXP
Such as `Chess` problem.  
Means could solve a problem in exponetial time.  
Apparantly EXP is the super set of NP.  

# R
The problem is recursive problem, which means it could be solved in finite time.  
But unfortunately most of problems are not in R, for example `halting` problem is not in R.  
Apparantly R is the super set of EXP.  
