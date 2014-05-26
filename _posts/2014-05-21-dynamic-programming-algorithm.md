---
layout: post
title: "dynamic programming algorithm"
description: ""
category: development
tags: [algorithm]
---
{% include JB/setup %}

Following are the two main properties of a problem that suggest that the given problem can be solved using Dynamic programming.

##Overlapping Subproblems: Divide and Conquer
1. `Useful` when solutions of same subproblems are needed again and again. like `Fibonacci Numbers`
2. `Not useful` when there are no common (overlapping) subproblems because there is no point storing the solutions if they are not needed again. For example, `Binary Search` doesn’t have common subproblems


There are two ways to store values so that these values can be reused:  


`Memoization (Top Down)`: try to touch from top to bottom, calculate and store value whenever this value is not found in our, otherwise just use it.

{%highlight c%}
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
{%endhighlight%}

`Tabulation (Bottom Up)`: try to touch from bottom to top, calculate, calculate and store value.

{%highlight c%}
int fib(int n)
{
    int f[n+1];
    int i;
    f[0] = 0;   f[1] = 1;
    for (i = 2; i <= n; i++)
        f[i] = f[i-1] + f[i-2];
    return f[n];
}
{%endhighlight%}
Both `tabulated` and `Memoized` store the solutions of subproblems. In Memoized version, table is filled on demand while in tabulated version, starting from the first entry, all entries are filled one by one. Unlike the tabulated version, all entries of the lookup table are not necessarily filled in memoized version. For example, memoized solution of `LCS` problem doesn’t necessarily fill all entries

##Optimal Substructure
if optimal solution of the given problem can be obtained by using optimal solutions of its subproblems.  
For example the shortest path problem has following optimal substructure property: If a node x lies in the shortest path from a source node u to destination node v then the shortest path from u to v is combination of shortest path from u to x and shortest path from x to v. The standard All Pair Shortest Path algorithms like Floyd–Warshall and Bellman–Ford are typical examples of Dynamic Programming.  

example: count minimal coin number for specified money number:  

status transit function: `d(i)=min{ d(i-vj)+1 }`

{%highlight java%}

public DynamicProgramming(int[] coins) {
    this.coins = coins;
    solution[0] = 0;

    for (int value = 1; value < LENGTH; value++) {
        solution[value] = populate(value);
    }
}

/**
 * To populate solution number on index.
 *
 * @param value The index to be populated
 */
private int populate(int value) {
    if ((0 == value) || (0 != value && 0 != solution[value])) {
        return solution[value];
    }
    int minimal = 100000;
    for (int i = 0; i < coins.length && value >= coins[i]; i++) {
        int coin = 1;
        coin += populate(value - coins[i]);
        if (minimal > coin) {
            minimal = coin;
        }
    }
    return minimal;
}
{%endhighlight%}
