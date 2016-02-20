---
layout: post
title: "wildcard and template in Java"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
I have been confused by Java wildcard and template for a very long time, because I assume what inhertance can do any thing wildcard can.  
But actually, they are thoroughly distinctive thing:  


## template
{%highlight java%}
public class Container<T>
{
    //template T type need to initialize in declare stage
    private T data;
    Container(T data)
    {
        this.data = data;
    }
    //
    //example usage:
    //
    Container<Integer> ci=new Container<Integer>();
    Container<Integer> ci=new Container<>();//Can use diamond infer in JDK7.0
}
{%endhighlight%}
Template make it possible to use a uniform type name to represent various kinds of type, rather than do repeating work in coding for different kind of type.  
Template can be dynamically create, once template type is declared, developer can not dynamically change it.  

## wildcard

{%highlight java%}
//pre-condition
class Base{}
class Sub extends Base{}
class Inherit extends Sub{}A
{%endhighlight%}

{%highlight java%}
//basic usage:
Sub sub = new Sub();
Base base = sub;
//OK! this is basic usage when base refer to a subsidiary instance
{%endhighlight%}

{%highlight java%}
Vector<Sub> vs = new Vector<Sub>();
Vector<Base> vb = vs; //error: incompatible type
//Nevertheless Sub is inherited from Base, Vector<Sub> is not subtype of Vector<Base>
{%endhighlight%}

{%highlight java%}
Vector<Sub> vs = new Vector<Sub>();
Vector<? extends Base> vb = vs;
//OK. List<Sub> is a subtype of List<? extends Base>
//regardless of interface or class, the key word extends means ? should be subtype of Base or itself
{%endhighlight%}
![wildcard](http://githubpage.u.qiniudn.com/generics-listParent.gif)  

{%highlight java%}
Vector<Base> vb=new Vector<Base>();
Vector<? super Inherit> vi=vb;
// the key word super can restrict ? as supertype from Inherit or just it self
{%endhighlight%}
![wildcard-relation](http://githubpage.u.qiniudn.com/generics-wildcardSubtyping.gif)  

But wildcard should be determined in run time.  
Our Java code can be shorten with assistance of wildcard.  

{%highlight java%}
class Base<T>{}
class Sub<T> extends Base<T>
{
    public void addNumber(List<? extends T> list){}
}
//Java code above could omit large quantities of repeating work
{%endhighlight%}
