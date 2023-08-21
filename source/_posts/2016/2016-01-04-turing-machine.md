---
layout: post
title: "Turing Machine"
description: ""
category: study
tags: [math]
date: 2016-01-01
---

[Turing Machine](http://www.douban.com/note/493554475/)  

##  Deterministic Turing machine
The set of rules prescribes one action to be performed for any given situation.  

A deterministic Turing machine (DTM) has a transition function that, for a given state and symbol under the tape head, specifies three things:

* the symbol to be written to the tape,
* the direction (left, right or neither) in which the head should move, and
* the subsequent state of the finite control.

>For example:
>An X on the tape in state 3 might make the DTM write a Y on the tape, move the head one position to the right, and switch to state 5.


##  Non-deterministic Turing machine
May have a set of rules that prescribes more than one action for a given situation.  

A non-deterministic Turing machine (NTM) differs in that the state and tape symbol no longer uniquely specify these things; rather, many different actions may apply for the same combination of state and symbol. 

>For example:
>An X on the tape in state 3 might now allow the NTM to write a Y, move right, and switch to state 5, or to write an X, move left, and stay in state 3.
