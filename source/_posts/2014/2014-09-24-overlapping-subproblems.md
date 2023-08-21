---
layout: post
title: "Overlapping Subproblems"
description: ""
category: development
tags: [algorithm]
date: 2014-09-24
---
# Divide and Conquer
1. `Useful` when solutions of same subproblems are needed again and again, Like Divide and Conquer, Dynamic Programming combines solutions to sub-problems. like `Fibonacci Numbers`
2. `Not useful` when there are no common (overlapping) subproblems because there is no point storing the solutions if they are not needed again. For example, `Binary Search` doesn’t have common subproblems

--------------

There are two ways to store values so that these values can be reused and I will also show two instances of dynamic programming by `Fibonacci`:


##  Memoization (Top Down)
try to touch from top to bottom, calculate and store value whenever this value is not found in our, otherwise just use it.  
```c
//Memoization
int fib(int n)
{
   if(lookup[n] == NIL)
   {
    if ( n <= 1 )
      lookup[n] = n;
    else
      lookup[n] = fib(n-1) + fib(n-2);
   }
   return lookup[n];
}
```

In Memoized version, table is filled on demand, unlike the tabulated version, all entries of the lookup table are not necessarily filled in memoized version.  

##  Tabulation (Bottom Up)
try to touch from bottom to top, calculate, calculate and store value.  

```c
//Tabulation
int fib(int n)
{
  int f[n+1];
  int i;
  f[0] = 0;   f[1] = 1; 
  for (i = 2; i <= n; i++)
      f[i] = f[i-1] + f[i-2];
  return f[n];
}
```
While in tabulated version, starting from the first entry, all entries are filled one by one.   


---------

Both `tabulated` and `Memoized` store the solutions of subproblems.   
For example, memoized solution of `LCS` problem doesn’t necessarily fill all entries.
