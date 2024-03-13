---
layout: post
title: "Kotlin generics"
description: ""
category: development
tags: [kotlin]
date: 2023-03-13
---


# kotlin generics variance

Similar to what Java provisions, kotlin support generics and also variance, but is easier to understand and use.  

For instance we have a class `Container` that accepts `T` is type parameter.  
```kotlin
class Container<T>
```

The class `Container` itself can have inheritance and everything, but when creating instance, it is not the case.  

```kotlin
val a: Container<String> = Container<String>()
val b: Container<Any> = a // compilation error here
```

Would result into error below:  
>Type mismatch.  
>Required:  Container<Any>  
>Found:  Container<String>

This is because `Container<Any>` is `not` the parent class of `Container<String>`.  

But in reality, there are many situations that we would want our class to behave as a generic container to deal with certain types and its inheritance, there comes the `variance` conception.  

## in

This is to denote the generic type can only be used as input parameter, but can never return.
```kotlin
class Container<in T> {
  fun add(data: T) {}
}

val a = Container<Any>()
a.add("string")
a.add(1 to 2)
```

Here the class `Container` is used as `consumer` of type `T`, thus any type that extends T can be  passed as function parameter, but never as return value.

## out
```kotlin
class Container<out T> {
  fun get(): T {}
}

val a = Container<String>()
val b: String = a.get()
val c: Any = a.get()
```

This time, `Container` class is used as `producer`, it may return any super class of T, hence the return value can be assigned to the variable `b` and `c`.  


