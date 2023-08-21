---
layout: post
title: "clojure lazy sequence"
description: ""
category: development
tags: [clojure]
date: 2014-09-04
---
I asked a question in `SO` some months ago, to get a explaination towards [lazy sequence](http://stackoverflow.com/questions/24523488/how-lazy-sequence-run-in-this-code):  
```clojure
(def fib-seq (lazy-cat [0 1]  (map + (rest fib-seq) fib-seq )))
```

------

Thanks `@omiel` provide many useful information, but still did not touch the most sensitive point, after thinking a while, I figure out what happened in the generation of lazy sequence.  
May clojure sage in SO please correct me if I am actually wrong.   

What I mean step by step actually foci on the generation of lazy-sequence item one by one, I already know some of the logic of clojure language.  

As we know the `fib-seq` is defined as a `lazy-seq` and its first two items is 0 and 1, the rest of its items still left unevaluated, which is the most interesting feature of clojure.  
While it is rather easy to understand that accessing the first two item just means to touch those two things, and they are in memory or cached, thus they could be directly return and print out.  

As `fib-seq` do not have third item for now, it need to generate it when thread need to accessing the 3rd item, here is where my assumption start:  


# stem
Since `(map + (rest fib-seq) fib-seq )` is a `lazy-seq` itself, it contain no item in it currently and waiting for calling `more` command on it.   
Here calling the 3rd item of `fib-seq` means calling the first item of lazy sequence `(map...)`, hence it need to generate and real execute the code.  
By simply replace variable name with list, the code of map seems like this:  


```clojure
(map + (rest [0 1 ..]) [0 1 ..] ); the '..' means it is a lazy sequence
```
then this code is become below after `rest` executed:  

```clojure
(map + [1 ..] [0 1 ..] )
```

As `map` generate lazy sequence, it is instructed to generate the first item of it, so by `map` these two lists, we got an item `1=(+ 1 0)` which is the result of both the first item of these two lists add together.  
Then the `map` stop generate item as it have no instruction to do so.  Now after generate the new item `1` and concatenate it with `[0 1]`, our `fib-seq` now look like this:  

```clojure
[0 1 1 ..]
```

Pretty good. Now let's touch the 4th item of `fib-seq` by `(nth fib-seq 4)`.  
fib-seq find it contain no item with index `4`, but it found the third is cached so it will generate the `4th` item from `3rd` one.

Now thread move to `(map ...)` function and instruct map to hand out the second item of it.  
map found it did not have No.2 item so it have to generate it.  and replace  `fib-seq` with real lazy seq:  
 
```clojure
(map + (rest [0 1 1..]) [0 1 1..] )
```
Then of course `rest` get the rest of seq:  

```clojure
(map + [1 1..] [0 1 1..] )
```
Here the most tricky thing happened I think.  
`Map` add both the second rather than the first item of these lists:  

    (map + [1 1..] [0 1 1..] )
              ^       ^
              | ----- |
                  |
                  +
                  2

So the map could return `2` as its 2nd item so as to complete the instruction.  

The `lazy-seq` follow the same strategy in the follow item while instructed, and cache every generated item in memory for faster accessibility.


For this `Fibonacci number generator`, it just shift two list and add them one by one and recursively to generate required Fibonacci number like below:  

    0 1 1 2 3 5 ..   
    1 1 2 3 5 ..
Which of course is a very deft way to generate `Fibo`.  


# summary
To sum up, from human's view, lazy seq will generate item always from its last status/position rather than starting from its initial state.

Please correct me if I am wrong, I am a newbie in `clojure` and I am eagerly to learn it well.  
