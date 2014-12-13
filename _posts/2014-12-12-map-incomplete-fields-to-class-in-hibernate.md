---
layout: post
title: "map incomplete fields to class in hibernate"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

Sometimes you just want to partially use columns or fields in `HQL` but still want to map them into a class by Hibernate.  
Well I also encounter this situation.  
I have a entity class `Word` which has 5 fields:  
{%highlight java%}
@Entity(name = "word")
public class Word
{
    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private String word;

    @Column(length = 10)
    private String pinyin;

    @Column(length = 5)
    private String initial;

    @Column(length = 5)
    private String vowel;

    @Column
    private int count;
    //...
{%endhighlight%}


But my `Criteria` method only has two:  
{%highlight java%}
public List groupByInitial()
{
    Criteria criteria = super.createCriteria();
    criteria.setProjection(Projections.projectionList()
        .add(Projections.sum("count").as("count"))
        .add(Projections.groupProperty("initial").as("initial"))
    );
    criteria.add(Restrictions.neOrIsNotNull("pinyin", ""));
    return criteria.list();
}
{%endhighlight%}

You will surely get a Exception:  

    java.lang.ClassCastException: [Ljava.lang.Object; cannot be cast to rugal.entity.Word
    
To solve this we need a transform class, namely:  
{%highlight java%}
public class StatsWord
{
    private long count;

    private String initial;
    //...
{%endhighlight%}
This could just be a POJO, with the number and same alias in you `Criteria` method.  
Then we need to register it in `Criteria` method, say:

{%highlight java%}
criteria.setResultTransformer(Transformers.aliasToBean(StatsWord.class));
{%endhighlight%}

Now have a try if this is workable or not!
