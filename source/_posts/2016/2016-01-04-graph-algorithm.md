---
layout: post
title: "Graph Algorithm"
description: ""
category: study
tags: [math, algorithm]
date: 2016-01-01
---

[Geeks for Geeks](http://www.geeksforgeeks.org/greedy-algorithms-set-1-activity-selection-problem/)

##  Kruskal

`Minimum Spanning Tree`  
In Kruskal’s algorithm, we create a MST by picking edges one by one.   
The Greedy Choice is to pick the smallest weight edge that doesn’t cause a cycle in the MST constructed so far.

1. Sort all edges
2. Pick up smallest edge that does not cause cycle, till all vertices are connected


##  Prim
`Minimum Spanning Tree`   
In Prim’s algorithm also, we create a MST by picking edges one by one.    
We maintain a set:  

1. set of the vertices already included in MST. 

The procedure is:  

1. Start from any vertices
2. Pick a reachable edge that has minimum weight and not causing cycle
3. Repeat step 2 until all vertices are connected

##  Dijkstra
`Shortest Path`  
The Dijkstra’s algorithm is very similar to Prim’s algorithm. The shortest path tree is built up, edge by edge.   
This algorithm is to find the shortest path between two vertices
We maintain a set: 

1. set of the vertices already included in the tree. 

The Greedy Choice is to pick the edge that connects the two sets and is on the smallest weight path from source to the set that contains not yet included vertices.

1. Start from the vertice, preset all other vertices with value infinity.
2. Pick the smallest edge that from this vertice
3. Update the value in all reachable vertices with the smallest calculated value
3. Repeat the same work for the vertice that is connected by previous one, till all vertices are connected.
