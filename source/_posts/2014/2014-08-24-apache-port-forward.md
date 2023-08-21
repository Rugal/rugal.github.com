---
layout: post
title: "apache port forward"
description: ""
category: operation
tags: [linux, apache]
date: 2014-08-24
---
You have to use `http://localhost:port` to visit `http://localhost`, to help you omit the `port` part, now let us learn to configure `apache2`.  

First to install apache2.  

    sudo apt-get install apache2


Then to add some modules that are used.   

    a2enmod proxy
    a2enmod proxy_http

So now apache2 could proxy HTTP request.  

Enter `$APACHE_HOME/sites-available` folder, create a file with content below:  

```nginx
# This is to capture all :80 port to here
<VirtualHost *:80>
    #This means to capture this domain name
    ServerName your.domain.name
    ProxyRequests Off
    ProxyPreserveHost On
    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>
    #This is to enable forward and backward proxy
    #First line is to proxy all request from http://domain/ onto http://domain:port/
    #ProxyPass /example http://yet.another.domain.name:port/other-example
    ProxyPass / http://yet.another.domain.name:port/  
    ProxyPassReverse / http://yet.another.domain.name:port/
    <Location /webapp>
        Order allow,deny
        Allow from all
    </Location>
    ErrorLog  /var/log/apache2/myapp.err
    CustomLog /var/log/apache2/myapp.log  common
</VirtualHost>
```

Well seems we have done a lot, now you need to symbolic link this file to `$APACHE_HOME/sites-enabled`  

    cd $APACHE_HOME/sites-enabled
    sudo ln -s ../sites-availables .

Now just reload apache by:  

    sudo service apache2 reload

To see if it works!  
Cong if you got it done, along integrated with [`tomcat folder mapping`](/operation/2014/08/24/tomcat-domain-name-to-folder-mapping/), now we could use `http://domain.name` to visit our application which originally needs `http://localhost:port/appname/`
