---
layout: post
title: "Kotlin high order function"
description: ""
category: development
tags: [kotlin]
date: 2023-02-24
---
# Kotlin high order function

name | reference | return | invocation | is extension
--- | --- | --- | ---| ---
with | this | lambda | `kotlin.with {}` | $\times$
run | - | lambda | `kotlin.run {}` | $\times$
run | this | lambda | `input.run {}` | $\checkmark$
let | it | lambda | `input.let {}` | $\checkmark$
also | it | this | `input.also {}` | $\checkmark$
apply | this | this | `input.apply {}` | $\checkmark$

## with

Grouping function calls on an object: `with`

```kotlin
public inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return receiver.block()
}

with(input) {
  this...
}
```

## run

Object configuration and computing the result: run
Running statements where an expression is required: non-extension run

### extension version

```kotlin
public inline fun <T, R> T.run(block: T.() -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}

input.run {
  this...
}
```

### function version

```kotlin
public inline fun <R> run(block: () -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}

kotlin.run {
  //
}
```

## let

Executing a lambda on non-null objects: let
Introducing an expression as a variable in local scope: let

```kotlin
public inline fun <T, R> T.let(block: (T) -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block(this)
}

input.let {
  it...
}
```

## also

Additional effects: also

```kotlin
public inline fun <T> T.also(block: (T) -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block(this)
    return this
}

input.also {
  it...
}
```

## apply

Object configuration: apply

```kotlin
public inline fun <T> T.apply(block: T.() -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block()
    return this
}

input.apply {
  this...
}
```
