---
layout: post
title: "latex on ubuntu"
description: ""
category: study
tags: [latex,linux]
date: 2015-01-19
---

## Development Environment


    sudo apt-get install texlive-latex-base  texlive-latex-extra xzdec



## Package Management
Init `tlmgr` with command:  


    tlmgr init-usertree

Then you can install packages by:  


    tlmgr install <name>

But sometimes you could not find a package by this command, you need to search [here](http://ctan.org/pkg/)  to see the container.  
Yet, the recommend way is to install full package in `apt-get`.  



## Sample Content

```latex
\documentclass[12pt]{article}
\usepackage{fullpage,times,mathptmx,times,url}

\title{Sample}
\author{Due dates: January 8, 2015, 12 Noon \textbf{and} January 22, 2015, 12 Noon}
\date{}

\begin{document}

\maketitle
\thispagestyle{empty}

\textbf{Objective}: Write a survey of Related Work.

\bigskip

\textbf{Detailed Instructions}:

\textbf{Part A}: Outline of related work.

Submit a PDF file \textbf{only} to D2L.  Please name your file \texttt{A4aLastNameFirstName.pdf}
(e.g., I would submit a file called \texttt{A4aBruceNeil.pdf}).   Part A is due on January 8 at 12 Noon.

\pagebreak

\textbf{Part B}: Survey of related work.

Part B is due on January 22 at 12 Noon.

\end{document}
```



## Compile

    latex sample.tex


## PDF Reader
There is `okular` in KDE.

    okular sample.pdf

