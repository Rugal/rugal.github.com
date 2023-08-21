---
layout: post
title: "Latex block positioning"
description: ""
category: study
tags: [latex]
date: 2015-09-29
---

There are some positioning parameters for text block like table or image to place in a page.  
```latex
\begin{figure}[h]
\end{figure}
\begin{table}[ht]
\end{table}
```

Those characters in the square brackets are parameters to position.  

Parameter |	Position
:---|:---
h |	Place the float here, i.e., approximately at the same point it occurs in the source text (however, not exactly at the spot)
t	| Position at the top of the page.
b	| Position at the bottom of the page.
p	| Put on a special page for floats only.
!	| Override internal parameters LaTeX uses for determining "good" float positions.
H	| Places the float at precisely the location in the LATEX code. Requires the float package. This is somewhat equivalent to h!.
