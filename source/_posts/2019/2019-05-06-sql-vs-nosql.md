---
layout: post
title: "SQL vs NoSQL"
description: ""
category:  development
tags: [database]
date: 2019-05-06
---

[origin](https://www.sitepoint.com/sql-vs-nosql-differences/)

## Schema
### SQL

Has to define schema before using it.

1. Primary Key
2. Relation
3. Index
4. Trigger
5. Store Procedure
6. Constrain


This makes the SQL very stable but not easy to change. Whenever you change, you need to incorporate with other data.


### NoSQL
There is no specific schema has to define before hand. You can change it at any time.
This make NoSQL very flexible but the structure might vary. Don't expect all object are the same.



## Normalization
### SQL
Always normalize the table so as to avoid redundancy and inconsistency.


### NoSQL

You can do normalization as well, but this is not very practical. Most time just store the entire complete object into NoSQL.


## Join
### SQL
Very powerful and flexible join clause to enable complex query against many tables

### NoSQL
There is no such thing as join. Developer needs to get all data of one collection, and search for their specific predicate to get another collection.

## Data Integrity
### SQL
Can control or refrain developer from mistakenly operating the data by imposing constrains & checks.

### NoSQL
Not available


## Transaction
### SQL
Use `transaction` to ensure many SQL statements to be executed or failed as one entity to ensure consistency.

### NoSQL

Generally not available, but some can provide transaction-like operation, but still not as good as SQL, must be done by ourselves.

## Syntax
### SQL
T-SQL standardized

### NoSQL
No standardization yet. Different NoSQL has different syntax, but most of them are very intuitive.		

## Performance
### SQL
Has to consider constrains and relationships, usually not good enough, but not always the case. Depending on the schema design.

### NoSQL
Does not have to consider so many rules, just process the data by object. Usually performant


## Scalability
### SQL
Not easy, because of the distribution of related data. Many databases are not designed that way at the first place. But recent evolution makes it possible to do clustering, even this is not easy.

### NoSQL
Most of NoSQL can do scalability in easy way as they are design in this way at the first place.


# Ideality

### SQL
-   logical related discrete data requirements which can be identified up-front
-   data integrity is essential
-   standards-based proven technology with good developer experience and support.


### NoSQL

-   unrelated, indeterminate or evolving data requirements
-   simpler or looser project objectives, able to start coding immediately
-   speed and scalability is imperative.

