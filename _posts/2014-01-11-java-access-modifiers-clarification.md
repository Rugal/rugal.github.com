---
layout: post
title: "java access modifiers clarification"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

To make java access privilege clarified, I made a table to claim.
{%highlight bash%}
Modifier    | Class | Package | Subclass | World
————————————+———————+—————————+——————————+———————
public      |  ✔    |    ✔    |    ✔     |   ✔
————————————+———————+—————————+——————————+———————
protected   |  ✔    |    ✔    |    ✔     |   ✘
————————————+———————+—————————+——————————+———————
no modifier |  ✔    |    ✔    |    ✘     |   ✘
————————————+———————+—————————+——————————+———————
private     |  ✔    |    ✘    |    ✘     |   ✘
{%endhighlight%}
It is probably worth pointing out that in the case of no modifier, whether or not the subclass can see it's superclass's methods/fields depends on the location of the subclass. If the subclass is in another package, then the answer is it `can't`.   
If the subclass is in the same package then it CAN access the superclass methods/fields.
