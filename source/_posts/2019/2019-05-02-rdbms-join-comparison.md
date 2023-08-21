---
layout: post
title: "RDBMS Join Comparison"
description: ""
category:  development
tags: [database]
date: 2019-05-02
---

# Inner Join

## `Natural` Join

Automatically join tables by their column name.

```sql
select *
from registration 
	natural join course
```

## Normal Join

manually specify the column name to join

```sql
select *
from registration r
	[inner] join course c
	on  (r.cid = c.cid);
```

```sql
select *
from registration r, course c
where  r.cid = c.cid;
```

# Outer Join

## Left out join

```sql
select *
from student s
	left [outer] join registration r
on  (r.sid = s.sid);
```

## Right out join

```sql
select *
from student s
	right [outer] join registration r
on  (r.sid = s.sid);
```

## Full outer join

```sql
select *
from student s 
	full outer join registration r
	on  r.sid = s.sid;
```
