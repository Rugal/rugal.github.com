---
layout: post
title: "Monad comprehensive tutorial"
description: ""
category: development
tags: [math, clojure]
date: 2023-02-03
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    displayMath: [['$$','$$'], ['\[','\]']],
    processEscapes: true,
    processEnvironments: true,
    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
    TeX: { equationNumbers: { autoNumber: "AMS" },
         extensions: ["AMSmath.js", "AMSsymbols.js"] }
  }});
</script>

# what is monad

## functor

`functor` can be interpreted as `A container that is mappable between categories`.  
`endofunctor` is a functor that mappable inside single category.  
First of all, by saying container, it would definitely hold something inside, whether it is a single value or a set of value or nothing at all.  
Another important property is mappable, which means the data inside the container can be transformed into another by a `map` function.  

This is how we do the work:  

1. grab the data from inside the container
2. use a mapping logic to transform all the data
3. put the transformed them into a new container

```javascript
// we define a simplest class here
class Wrapper {
  // it does nothing but just hold the value and no else
  constructor (value) {
    this.value = value
  }
  // it provisions a function named "map", where the parameter f is a function
  map (f) {
    // f could transform the value to another one, before putting into another wrapper
    return new Wrapper(f(this.value))
  }
}
```

The usage can be as follow:

```javascript
const a = Wrapper(1);
const f = (x) -> x + 3;
const b = a.map(f)
```

So we call `Wrapper` is a functor, we can place data into it and use `map` function to do data transformation.

## function

function is basically a map between 2 objects

Mathematically speaking
$$
f(x) = y
$$

where $f, x, y$ is called `symbol`
$f$ is the `mapping logic` between input and output.
$x$ is the input and $y$ is the output, we do not care about the type of these 2 symbols, they can be `concrete` value and can also be `mapping logic(function)`

This formation can be written into another one  

$$
f: x \rightarrow y
$$

Because $x, y$ can be `function` themselves, then it is called `high-order function`

### curry

For function with multiple input, can use a technique named `partial apply` to reduct it into single input function, this is called `curry`, for instance:  
Say we have an expression `(+ a b)` where both a and b are input, we can transform it into 2 partial function, and can be executed one by one in order to align with the original expression.

In clojure we can use `partial` function to currify the multi-input function

```clojure
; use partial function separately
(def p (partial + a)) ;only use 1 input here to form a new function
(p b)                 ;provide the rest input to complete the invocation

; or combine into single expression
((partial + a) b)
```

`curry` is essentially the transformation of below:  

$$
(a, b) \rightarrow c \equiv a \rightarrow (b \rightarrow c)
$$
This transform multi-input function into a single input function, which returns another function that is single input as well.

By mathematical convention in `lambda calculus`,  the right arrow would associate first, so the formation above would become:

$$
 a \rightarrow (b \rightarrow c) \equiv  a \rightarrow b \rightarrow c
$$

If we rewrite the formation above in `clojure`, in order to guarantee `associativity`:

```clojure
(defn compose
  [a, b]
  (fn [p] (a (b p))))

; the expression below has associativity
(=
  (compose (compose a b) c)
  (compose a (compose b c)))
```

Let's see a concrete example:  

```clojure
; define basic function
(defn add [x] (+ x 1))
(defn minus [x] (- x 2))
(defn multiply [x] (* x 3))

; define different association
(def p (compose (compose add minus) multiply))
(def q (compose add (compose minus multiply)))

; these 2 expressions should be exactly same
(=
  (p 1)
  (q 1))
```

In Clojure or Javascript, `p` and `q` are different functions, but they mathematically are exactly the same.

## example

We will provide 2 examples to illustrate how and where `monad` comes from:  

### future

Given 2 functions as below that could do single work:  

```clojure
(defn get-user-by-id [id] (future ...id...))             ; str -> future<User>
(defn get-department-by-user [user] (future ...user...)) ; User -> future<Department>
```

These 2 functions are in this form:  

$$
a \rightarrow \text{Future}\space b\quad \text{or} \quad a \rightarrow \text{C}\space b
$$

It is the container `Future` that hold the data.  

```clojure
(defn compose [f g]
  (fn [x] (future (f @(g x)))))

(def get-department-by-user-id
  (compose get-department-by-user get-user-by-id))

(get-department-by-user-id 123)
```

Now the `compose` function is of type:  

```text
(User->Department)->(str->User)->(str->Department)
```

### List

Given 2 functions like below:  

```clojure
(defn duplicate [x] [x x])
(defn positive [x] (if (pos? x) [x] []))
```

These 2 functions are in this form, $a \rightarrow [b]$.  
If we rewrite the list symbol as another type, we have:  

$$
a \rightarrow \text{List}\space b\quad \text{or}\quad a \rightarrow \text{C}\space b
$$

where List is the `container` and `b` is the value inside.  

```clojure
(defn compose [f g]
  ; notice we use mapcat function to flat & map
  (fn [x] (->> x (g) (mapcat f)))) ; execute from right to left

(def p (compose duplicate positive))

(->> [-1 1 3] (mapcat p))
```

## monad

We observe that not only `asynchronous future` but also `list` follow the same pattern:  

$$
a \rightarrow \text{C}\space b
$$

Where `C` is the mappable container, this is the `functor` that we mentioned above.  
We can also try to use function composition, such as:  

$$
(a \rightarrow C\ b) \rightarrow (x \rightarrow C\ a) \rightarrow (x \rightarrow C\ b)
$$

When we replace `C` with `future` we get asynchronous invocation function; when replace with `list`, we get list transformation function. If we use `identity` as `C`, then it is the regular function.  

$$
\begin{aligned}
\because&\ \text{Identity}\ a \equiv a\\
\therefore&\ (a \rightarrow \text{Identity}\ b) \equiv (a \rightarrow b)
\end{aligned}
$$

Then we want to define `identity unit`, because of associativity, the `identity` is as below:  

```clojure
(=
  (compose f identity)
  (compose identity f)
  (f))
; compose(f, unit) == f
```

We can see `compose` function is of type:  

```text
(a -> C b) -> (a -> C a) -> (a -> C b)
```

We can determine the type of `identity`: `(a -> C a)`  

For `future` the identity is:  

```clojure
(defn identity [x] (future x))
```

For `list` the identity is:  

```clojure
(defn identity [x] [x])
```

We observe that both `future` and `list` has `identity unit`. Is this always the case?  
The answer is true if we go with `monad`, as the definition of it is:  

```text
monad is a monoid in the category of endofunctors
```

monoid would of course has `identity` according to its definition, and it maps objects in one category.  
Now let's define function `bind`:  

```clojure
; bind :: m a -> (a -> m b) -> m b
(defn bind [ma f]
  (compose f (fn [_] ma)))
```
