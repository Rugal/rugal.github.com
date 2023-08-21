---
layout: post
title: "Functional Interface"
description: ""
category: development
tags: [java]
date: 2018-07-26
---

## Predicate
For filter
```java
@FunctionalInterface
public interface Predicate<T> {
  boolean test(T t);
}

Predicate<Integer> p = a -> a == 1;
```


## Function
Covert `A` to `B`

```java
@FunctionalInterface
public interface Function<T, R> {
// The T is the input argument while R is the return result
  R apply(T t);
}

Function<String, Integer> f = Integer::parseInt;
```

Or accept 2 parameter and output

```java
@FunctionalInterface
public interface BiFunction<T, U, R> {
  R apply(T t, U u);
}

BiFunction<Integer, Integer, String> bf = (a, b) -> "" + a + b;
```



## Supplier
Get configuration etc.,
```java
@FunctionalInterface
public interface Supplier<T> {
  T get();
}

Supplier<Integer> s = () -> 1;
```


## Consumer
Terminator, do process that doesn't return
```java
@FunctionalInterface
public interface Consumer<T> {
  void accept(T t);
}

Consumer<Integer> c = System.out::println;
```

## Default Method
```java
@FunctionalInterface
interface RugalFunction<FROM, TO> extends Function<FROM, TO> {

  default <OTHER> RugalFunction<OTHER, TO> compose(RugalFunction<? super OTHER, ? extends FROM> before) {
    Objects.requireNonNull(before);
    System.out.println("Do that first and then do this");
    return (OTHER v) -> this.apply(before.apply(v));
  }

  default <OTHER> RugalFunction<FROM, OTHER> andThen(RugalFunction<? super TO, ? extends OTHER> after) {
    Objects.requireNonNull(after);
    System.out.println("Do this and then do that");
    return (FROM f) -> after.apply(this.apply(f));
  }
}


RugalFunction<String, Integer> rf = a -> Integer.parseInt(a);
RugalFunction<String, Float> call = rf.andThen((Integer b) -> b * 1.0F);
System.out.println(call.apply("1"));
/*
--- exec-maven-plugin:1.2.1:exec (default-cli) @ functional ---
Do this and then do that
1.0
*/
```
