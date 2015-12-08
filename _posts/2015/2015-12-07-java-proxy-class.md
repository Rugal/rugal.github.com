---
layout: post
title: "Java Proxy Class"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

Java has 2 kinds of proxy, `static` and `dynamic`.  
`Static proxy` means to build the proxy before runtime, so static proxy class needs to be compiled for usage. In addition, static proxy needs to implement all involved proxyed methods, which is really painful.  
Whereas `Dynamic proxy` means to proxy methods during runtime. Dynamic proxy need to setup only one method for encapsulating. But for the convenience, performance is sacrificed. Dynamic proxy takes 100 times slower than static one.  
{%highlight java%}
{%endhighlight%}

##Static Proxy

{%highlight java%}
{%endhighlight%}


{%highlight java%}
{%endhighlight%}

##Dynamic Proxy
{%highlight java%}
{%endhighlight%}


{%highlight java%}
{%endhighlight%}
