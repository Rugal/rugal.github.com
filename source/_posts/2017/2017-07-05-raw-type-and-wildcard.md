---
layout: post
title: "Raw type and Wildcard"
description: ""
category: development
tags: [java]
date: 2017-07-05
---

## Raw type
Raw type means the `type` is unbounded/unspecified.   
The existence of it is for backward compatibility.   
But still, it is not recommend to use this raw type.   


```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List rawList = new ArrayList(2);
        rawList.add(1);
        //warning: [unchecked] unchecked call to add(E) as a member of the raw type List
        rawList.add("Rugal");
        //warning: [unchecked] unchecked call to add(E) as a member of the raw type List
        for (Object elem: rawList)
            System.out.println(elem);
    }
}
```

You will get warning talking about unchecked type.   
Raw type doesn't provide type check, so you can put different type into a single container without getting compilation error.   
But this will cause trouble if you try to cast class that is not compatible.  

Again, Raw type is not recommended.



## [Wildcard](https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html)

### Unbounded wildcard

You can't assign `<A>` to `<B>` even if the A is inherit from B. This is because of type check in compile time.   
In order to assign relevant types to their base type, `wildcard` comes into being.  

### Assignable by any type

Any container can assign to `<?>` . 
```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(2);
        list.add("Bernstein");
        list.add("Rugal");
        List<?> l = list;
        for (Object elem: l)
	        //But ? is only compatible with Object
	        //Refer to following section
            System.out.println(elem);
    }
}
```

You can even assign raw type container to it.  
```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List rawList = new ArrayList(2);
        rawList.add(1);
        rawList.add("Rugal");
        List<?> list = rawList;
        for (Object elem: list)
            System.out.println(elem);
    }
}
```

### Type related operations are not compatible
Any operations that type related, including `add`, `class cast` etc.,  are not allowed in unbounded wildcard.


```java
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
       List<?> list = new ArrayList<String>();
       list.add(1); 
       //Main.java:9: error: no suitable method found for add(int)
       for (Object elem: list)
            System.out.print(elem + " ");
    }
}
```


## Bounded wildcard

For this section, please refer to my [POST]({%post_url 2013-12-10-wildcard-and-template-in-java %})
