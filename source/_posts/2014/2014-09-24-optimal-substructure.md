---
layout: post
title: "Optimal Substructure"
description: ""
category: development 
tags: [algorithm]
date: 2014-09-24
---
## Optimal Substructure
if optimal solution of the given problem can be obtained by using optimal solutions of its subproblems.  
For example the shortest path problem has following optimal substructure property: If a node `x` lies in the shortest path from a source node `u` to destination node `v` then the shortest path from `u` to `v` is combination of shortest path from `u` to `x` and shortest path from `x` to `v`.  

The standard All Pair Shortest Path algorithms like `Floyd–Warshall` and `Bellman–Ford` are typical examples of Dynamic Programming.  

On the other hand the Longest path problem doesn’t have the Optimal Substructure property. Here by Longest Path we mean longest simple path (path without cycle) between two nodes.   
Consider the following unweighted graph given in the `CLRS` book.  
There are two longest paths from `q` to `t`: `q->r->t` and `q ->s->t`. Unlike shortest paths, these longest paths do not have the optimal substructure property.   
![pattern](http://geeksforgeeks.org/wp-content/uploads/LongestPath.gif)  
For example, the longest path `q->r->t` is not a combination of longest path from `q` to `r` and longest path from `r` to `t`, because the longest path from `q` to `r` is `q->s->t->r`.

