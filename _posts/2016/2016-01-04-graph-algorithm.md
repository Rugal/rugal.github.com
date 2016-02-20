---
layout: post
title: "Graph Algorithm"
description: ""
category: study
tags: [math, algorithm]
---
{% include JB/setup %}

[Geeks for Geeks](http://www.geeksforgeeks.org/greedy-algorithms-set-1-activity-selection-problem/)

## Kruskal

`Minimum Spanning Tree`  
In Kruskal’s algorithm, we create a MST by picking edges one by one.   
The Greedy Choice is to pick the smallest weight edge that doesn’t cause a cycle in the MST constructed so far.


## Prim
`Minimum Spanning Tree`   
In Prim’s algorithm also, we create a MST by picking edges one by one.    
We maintain two sets: 

1. set of the vertices already included in MST. 
2. set of the vertices not yet included. 

The Greedy Choice is to pick the smallest weight edge that connects the two sets.

## Dijkstra
`Shortest Path`  
The Dijkstra’s algorithm is very similar to Prim’s algorithm. The shortest path tree is built up, edge by edge.   
We maintain two sets: 

1. set of the vertices already included in the tree. 
2. set of the vertices not yet included. 

The Greedy Choice is to pick the edge that connects the two sets and is on the smallest weight path from source to the set that contains not yet included vertices.
