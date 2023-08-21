---
layout: post
title: "clojure core data structure"
description: ""
category: development
tags: [clojure]
date: 2014-06-25
---


### clojure build-in types

name |example|underlying java interface
:--|--:|--:
Number|100|`java.lang.Number`
String|"Rugal"|`java.lang.String`
Boolean|true, false|`java.lang.Boolean`
Character|\R|`java.lang.Character`
Keyword |:key| `clojure.lang.Keyword`
List|  '(1 2 3), (list 1 2 3)|`nil`
Vector |[1 2 3]|`nil`
Map | {:key val :key val}| `java.util.Map`
Set | #{1 2 3}| `java.util.Set`



-----

## primitive type

### Number

```clojure
1. (+)
2. (-)
3. (*)
4. (/)
5. (inc)
6. (dec)
7. (quot);aliquot
8. (rem) ;remain
9. (min)
10. (max)
```

### Strings

```clojure
1. (str)
2. (subs string from end)   
    ;from:inclusive, start from 0
    ;end: exclusive
3. (string? "test")
```

### Regular Expression Functions

```clojure
1. (re-pattern "[a-z]")
2. (re-matches #"[a-zA-Z]* " "test")
```


### Boolean

```clojure
1. (not)
2. (and)
3. (or)
```


### Characters
```clojure
1. (char ASCII/Unicode)
```


### Keywords

```clojure
1. (keyword string)
2. (keyword?)
```

--------


## collection

### Lists

List is a linked list, which is convenient in insertion and deletion, but not perform good in traverse and random indexing.  
So for a list, modification, appending and conjunction is happened on the top/head of a list.


```clojure
1. '(1 2 3)    ; (list) are the same
2. (peek '(1 2 3))   ;get first element of list;
3. (pop '(1 2 3))    ;returns a new list with the first item removed.
4. (conj '(1 2 3) 4)  ;conjunct last parameter into mid parameter represented list
```


### vector

Vector is like an array, hence perform good in traverse, data appending and  random selection, but disappointing in insertion and deletion.  
So for a vector, modification, append and conjunction is happened on the tail of a vector.

```clojure
1. (vector 1 2 3) ;convert all elements into a vector
2. (get ["first" "second" "third"] 1) ;get data of a vector by index, start from 0
3. (peek [1 2 3])  ; get data of a list by the tail
4. (conj [1 2 3] 4 5)  ; conjunct other parameter into second parameter represented vector
5. (assoc [1 2 3] 1 "new value") ;return vector that replace target index with last parameter
6. (pop [1 2 3])  ;remove the last element of given vector
7. (subvec [1 2 3 4 5] start end) ;substract target vector from `start` to `end`
```

### map

very similar to an Object in OOP:  
```clojure
1. (def my-map {:a 1 :b 2 :c 3}) ;map definition
2. (my-map :a)  ;normal map get
3. (defstruct person :first-name :last-name) ;define struct for frequently used map structure
4. (def person1 (struct-map person :first-name "Luke" :last-name "VanderHart")) ;create instance
5. (def get-first-name (accessor person :first-name)) ;define accessor for performance
6. (get-first-name person1)  ;use accessor to access field
7. (assoc {:a 1 :b 2} :c 3 :d 4) ; add or replace indexed element with parameters
8. (dissoc {:a 1 :b 2 :c 3 :d 4} :a :c);remove indexed elements with target parameters
9. (merge {:a 1 :b 2} {:c 3 :d 4});merge two maps together
10. (merge-with + {:a 1 :b 2} {:b 2 :c 4});merge maps with operation
11. (keys {:a 1 :b 2 :c 3}) ;get all keys
12. (vals {:a 1 :b 2 :c 3}) ;get all values
```

### set

```clojure
1. (def languages #{:java :lisp :c++})
2. (clojure.set/union #{:a :b} #{:c :d})
3. (clojure.set/intersection #{:a :b :c :d} #{:c :d :f :g})
4. (clojure.set/difference #{:a :b :c :d} #{:c :d})
```
