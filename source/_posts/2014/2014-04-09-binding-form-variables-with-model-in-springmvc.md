---
layout: post
title: "binding form variables with Model in springmvc"
description: ""
category: development
tags: [java]
date: 2014-04-09
---
Even if `springmvc` provides `@ModelAttribute`, it could only bind name that not start with root variable name, for instance:  

### Model: 
```java
class OrderLog
{
    private Client client;
    private Restaurant restaurant;
}
class Client
{
    private Integer cid;
}
class Restaurant
{
    private Integer rid;
}
```

### Action class:
```java
@Controller
@RequestMapping(value = "/order")
public class OrderAction
{

    private static final Logger LOG = LoggerFactory.getLogger(OrderAction.class.getName());

    @Autowired
    private OrderLogService orderLogService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private RestaurantService restaurantService;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Object create(@FormModel("orderLog") OrderLog orderLog)
    {
        orderLog.setClient(clientService.findById(orderLog.getClient().getCid()));
        orderLog.setRestaurant(restaurantService.findById(orderLog.getRestaurant().getRid()));
        orderLogService.save(orderLog);
        return new Message("SUCCESS", "Ordered");
    }
}
```

Without any specified assistance, one could only bind variables below onto `OrderLog` object.  
`curl -d"restaurant.rid=1&client.cid=2" "localhost:8080/order"`  
It did not includes root name: `orderLog`, makes it not easy and cosy enough to be binded onto a specified model, at the meantime, makes it harder for maintemance.  



-------

## solution
After Googling, I found a great [solution](http://jinnianshilongnian.iteye.com/blog/1717180) and [assist](http://www.java-allandsundry.com/2013/01/spring-mvc-customizing.html).  
By adding `@formModel` annotation and related resolving methods, springmvc now could tackle with it with great convenience.  
While in integration, you need to register the customized arguments resolver into springmvc framework by add them in `springmvc-servlet.xml` to prevent potential risks.  


```xml
<mvc:annotation-driven  content-negotiation-manager="contentNegotiationManager">
    <mvc:argument-resolvers>
        <bean class="rugal.common.springmvc.method.annotation.RequestJsonParamMethodArgumentResolver"/>
        <bean class="rugal.common.springmvc.method.annotation.FormModelMethodArgumentResolver"/>
    </mvc:argument-resolvers>
</mvc:annotation-driven>
```

Now let us use:  
`curl -d"orderLog.restaurant.rid=1&orderLog.client.cid=2" "localhost:8080/order"`  

Everything runs smoothly! great!
