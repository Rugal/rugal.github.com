---
layout: post
title: "tomcat domain name to folder mapping"
description: ""
category: operation
tags: [linux, tomcat]
date: 2014-08-24
---
If not set domain name mapping, we could only use `localhost:port/appbase/path` to access our web application.  
Here the domain name is mapped onto path, which is the root folder of our application.  



You need to add a `Host` tag just in the same level of the `localhost` one, or you could add an extra `Service` tag to use another port.  

```xml
<Host name="you.domain.name"  appBase="the/path/to/app" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
    <!--the appBase here is relative path, it use $CATALINA_HOME by default-->
    <Context path="" docBase="."/>
    <!--deliberately use empty path to set specified folder as root rather than ROOT folder-->
    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
        prefix="access_log." suffix=".log"
        pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
```

After this, deploy your application just right at the `appBase` attribution indicated, for instance, I deploy my application `rugal` under `$CATALINA_HOME/webapps`, hence the appBase is `webapps/rugal`

Now make sure everything on the go then restart tomcat.  
Here, of course you have to point the A record of you domain name to specific IP, I mean, the machine you have just configured.  
See if `you.domain.name:port/path` could get the right app?  It is domain name mapping that help you implicitly map onto `the/path/to/app` so you could omit the `app` in original URL.  

But this still need to specify the `port`, to address it, you could either configure `port` attribution of `Service` tag with `80` if not occupied already, or with some [port forward]({%post_url 2014-08-24-apache-port-forward %}) .
