---
layout: post
title: "how to configure transaction manager in spring"
description: ""
category: development
tags: [java]
date: 2014-07-06
---
I notice that many developers whom will encounter some bad exceptions while trying to integrate spring and hiberante.  
Actually I somehow had them because they are very normal situation in progress of integration.   
Here I want to clarify this `transaction` related problem.  

## exception
`org.hibernate.HibernateException: No Session found for current thread`  

This is pretty ambiguous because we think `Spring` will manage session, but there is something hidden in hibernate.   
Hibernate need to explicitly `openSession` first in the `SessionFactory` to gain session and cache it in `CurrentSessionContext`(`ThreadLocal` by default) container. You can use `getCurrentSession` to get session from `ThreadLocal` or other `CurrentSessionContext` if it already created from previous `open` action.   
By my experiment, you will get this `No Session found for current thread` exception when you trying to get session without explicitly `open` it.  

```java
Session session = sessionFactory.openSession();
//...
//You can got the opened session somewhere in this thread
Session session = sessionFactory.getCurrentSession();
```

But you will receive Exception if `getCurrentSession` without invoking create session first.  
```java
Session session = sessionFactory.getCurrentSession();
//Exception here
```

After explaining the exception above, you now may know root cause of this problem so as to better understand its scheme.  

## Now
let's learn to configure transaction manager.  

There are two way of configuring transaction manager in spring integrated with hibernate.  

1. programmatic
2. Declarative

You can easily understand that the programmatic way of configuring transaction manager is to `beginTransaction` and `commit` manually in Java code, which is cumbersome but is actually ease your worries as everything are under your control.  This article will not introduce it at all.    
I will not recommend it to you, because `Declarative` could still have very good control but much higher productivity and better code style by good modularization.   

### 1. Add Spring transaction manager for Hibernate
Add this bean in spring's `applicationContext.xml` configuration file to enable spring delegate transaction manager functionality.  
```xml
<!-- transaction manager -->
<bean id="transactionManager" class="org.springframework.orm.hibernate4.HibernateTransactionManager">
    <property name="sessionFactory" ref="sessionFactory" />
</bean>
```


### 2. Declare transaction points and transaction configure
The declaration for this could have three ways of configuring this step.  
It is recommended to annotate `@Transactional` on `service layer` since service will handle most of business logic and could guarantee the overall business transactional consistency.  
There is another thing to refer, the `propagation` of transaction mean to spread from invoker to invokee, rather passing from bilateral method, see examples:  
```java
//If this method somehow being transactional by inheritence or directly annotated
//if dao.save() and  dao.update() are annotated with @transactional respectively
//the invoked dao.save() then could get transaction that is opened by invoker saveRoot
@Transactional
public Address saveRoot(Address bean)
{
    //The transaction opened by saveRoot will pass to method in it
    //This transaction is exactly the same one with saveRoot one
    //So this transaction is consistent.
    dao.update(bean);
    //So as this method.
    return dao.save(bean);
    //The whole saveRoot method is transactional consistent, and will commit if nothing bad happen, or just rollback automatically if exception thrown
}

//another example for showing
//if dao.save() and  dao.update() are annotated with @transactional respectively
//notice there is no @Transactional on the doSave method
public void doSave(Address bean)
{
    //The transaction opened by the first dao.save method
    dao.save(bean);
    //That transaction will commit here

    //So there is no transactional consistency.
    //transaction will open separately for update
    dao.update(bean);
    //Then update method transaction commited here.
    //Thus operations will commit separately, which result in very bad transaction management
    //like nothing useful
}
```


For more  please visit spring framework [reference](http://docs.spring.io/spring/docs/4.0.5.RELEASE/spring-framework-reference/htmlsingle/#transaction).  

#### 1. AOP based
AOP based transaction is very clear and simple:  
```xml
<!-- transaction manager advisor -->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="find*" propagation="REQUIRED" read-only="true" />
        <tx:method name="get*" propagation="REQUIRED" read-only="true" />
        <tx:method name="count*" propagation="REQUIRED" read-only="true" />
        <tx:method name="*" propagation="REQUIRED" />
    </tx:attributes>
</tx:advice>
<!-- AOP transaction inserter -->
<aop:config>
    <aop:pointcut id="txPointcut" expression="execution(* rugal.sample.core.service.impl..*(..))" />
    <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut" />
</aop:config>
```

The `txAdvice` tells transaction manage how to make transaction propagation or some other transactional related metadata.  
`aop:config` is to create cut point aspect, then delivery this point to transaction manage to make transactional management, after completion of method invocation, AOP will cut a point to let `txManager` to `commit` or `rollback` so as to ensure transactional consistency.  

Beware you must configre AOP at the `implementation` class rather than `interface`.

#### 2. annotation driven
Add snipplet in `applicationContext.xml` to enable annotation driven transaction management.  
```xml
<!-- Enable annotation driven transaction manager -->
<tx:annotation-driven transaction-manager="transactionManager"  />
```
This is all XML that needed for annotation driven configuration, pretty simple.  

Then you can add `@Transactional` annotation on any method in `@Service` implementation class, or just on the service class to enable the whole class to be transactional managed and in same transaction behavior.  
Beware that you must put this annotation on implementation class rather than `interface`.   

Some samples:  


```java
@Transactional
public Address save(Address bean)
{//...
}

@Transactional(readOnly = true)
public Address findById(Integer id)
{//...
}

//Or you can annotate it on class level to enable the any method in class share same transaction behavior.
@Service
@Transactional
public class AddressServiceImpl implements AddressService
{//...
}
```

#### 3. mixed style
You can also mix these two styles together to make it flexible.


## Test
My depiction completed, now have a test, just to throw an `RuntimeException` to test data consistency, you will find hibernate `DEBUG` tells you that it rollback sucessfully.  
Congratulation!
