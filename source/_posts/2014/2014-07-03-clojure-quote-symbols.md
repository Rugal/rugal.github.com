---
layout: post
title: "clojure quote symbols"
description: ""
category: development
tags: [clojure]
date: 2014-07-03
---
Well, quote and its related symbols is too confusing for a clojure newbie.  
Thanks to this excellent [article](http://blog.8thlight.com/colin-jones/2012/05/22/quoting-without-confusion.html).  


## 1. '
The symbol `'`, the single quote symbol near the `Enter` button in your keyboard.  Can turn off evaluation functionality for the following expression, its functionality is totally equivalent to `(quote)`.   
Functionality of `quote` is simple and dedicate, which means the expression after this symbol will be treated just as literal, nothing more.  

Let's take some examples:   

```clojure
user=> '()                   ;()
user=> '[]                   ;[]
user=> '(1 2 3)              ;(1 2 3)
user=> '(list 1 2 3)         ;(list 1 2 3)
user=> (eval '(list 1 2 3))  ;(1 2 3)
```

As you can see the `(eval)` can evaluate the quoted or unevaluated(literal) expression and unveil its original ability.  

## 2. `
This is a confusing symbol just because it looks like `'`. But actually this symbol called `back-quote`, located above the `Tab` button in your keyboard.   
Clojure call it `syntax-quote`.     
Very similar to `quote`, this `syntax-quote `, will left expression behind it unevaluated, but it has some more functionalities.  

1. `syntax-quote` will try to find out the corresponding namespace of following symbols.   
2. `syntax-quote` could combine use with some other special characters such like `~`, whereas `quote` could not.   

let us have some examples:  

```clojure
user=> `[name]      ;[clojure.core/name]
user=> `[`name]     ;[(quote clojure.core/name)]
user=> `['name]     ;[(quote clojure.core/name)]
```

You may notice the `(syntax-quote)` and `(quote)` have identical name in clojure, called `quote`.  
You could use `'` as short for `quote`, but there have no short hand for `syntax-quote`.   

## 3. ~
This is a magic symbol to unquote expression within the effect area of `syntax-quote`, you could only use it in the scope of a `syntax-quote`, it named `unquote`.    
By unquoting, the expression affected by `~` now can be evaluated again even if it in domain of a `syntax-quote`.  

Examples below:  

```clojure
user=> `[~(quote name)]   ;[name], same as `[~'name]
user=> `[~(quote (name))] ;[(name)], equivalent to `[ ~'(name)]
user=> `[~'name]     ;[name], same as ['name]
user=> `[`~name]     ;[clojure.core/name], same as `[name]
user=> `['~name]     ;[(quote #<core$name clojure.core$name@d75415>)]
```

## 4. ~@
  
If you have seen my post of [state management]({%post_url 2014-06-26-clojure-state-management-introduction%}), you will know the `@` is about to derefer the `ref/atom/Agent`.   
But here this symbol again have another behavior that is `~` alike.  
`@` symbol must combined use with `~`, which finally becomes `~@`, called `unquote-splicing` symbol.   
It could extract the inner elementns from the quoted `list`.   
 
sample code:  

```clojure
user=> `(max @(shuffle (range 10)))  ; have no effect without ~ as prefix
;(clojure.core/max (clojure.core/deref (clojure.core/shuffle (clojure.core/range 10))))

user=> `(max ~(shuffle (range 10)))  ; just behaves as what syntax-quote could do
;(clojure.core/max [8 2 6 7 3 9 5 1 0 4]) ;There is an square parenthesis there

user=> `(max ~@(shuffle (range 10))) ; ~@ extract list without parenthesis.
;(clojure.core/max 0 4 7 5 1 2 6 3 9 8)
```
    
## 5. let's confusing    
You will graduately get accustom to it.  
`syntax-quote` will affect items one by one in it follow scope, while encounter `~` then temporary disabled `syntax-quote`'s ability in this the scope of `~`.   

Try to learn more by yourself.  


```clojure
user=> `{:a 1 :b '~(+ 1 2)} ;{:a 1, :b (quote 3)}
user=> `[:a ~(+ 1 1) c]     ;[:a 2 user/c]
user=> `[:a ~(+ 1 1) ~`c]   ;[:a 2 user/c]
user=> `[:a ~(+ 1 1) ~'c]   ;[:a 2 c]
user=> `[:a ~(+ 1 1) 'c]    ;[:a 2 (quote user/c)]
user=> `[:a ~(+ 1 1) '~'c]  ;[:a 2 (quote c)]

user=> `{:a 1 :b '~@(list 1 2)}  ;{:a 1, :b (quote 1 2)}

user=> `(1 `(2 3) 4)
;(1 (clojure.core/seq (clojure.core/concat (clojure.core/list 2) (clojure.core/list 3))) 4)
user=> `(list 1 `(2 ~(- 9 6)) 4)
;(clojure.core/list 1 (clojure.core/seq (clojure.core/concat (clojure.core/list 2) (clojure.core/list (clojure.core/- 9 6)))) 4)
user=> `(list 1 `(2 ~~(- 9 6)) 4)
;(clojure.core/list 1 (clojure.core/seq (clojure.core/concat (clojure.core/list 2) (clojure.core/list 3))) 4)
user=> (eval `(list 1 `(2 ~~(- 9 6)) 4))   ;(1 (2 3) 4)
```

### Congratulation
You finally complete this article, what have you learnt about the `quote` and `unquote` symbol in clojure?
