---
layout: post
title: "Normal Function"
description: ""
category:  development
tags: [database]
date: 2022-10-10
---

# definition
## column
Simply a single vertical representation of data storage in database table

## functional dependency
Once providing some columns A, the other columns B are implied. This is said to be B functionally depends on A, or `A -> B` 

## key column
The column that comprises key

## key
A set of columns that is minimum, and is able to determine the rest of columns in table

## partial functional dependency
Part of the key its own is able to determine some columns

## full functional dependency
Only the key itself is able to determine some columns, no partial functional dependency available

## transitive functional dependency
some columns `A` functionally depend on another columns `B`, which by its own depends on one another columns `C`.
All the columns mentioned here not necessarily be key or key column at all.

# normal function

## 1NF
Ensure every column is atomic

## 2NF
Ensure key columns have full functional dependency to non-key columns.  
Note that partial dependency between non-key columns is fine 

## 3NF
Ensure no transitive functional dependency between non-key column.  
This means transitive dependency between key column is fine

## BCNF
Ensure no transitive functional dependency between key column
