---
layout: post
title: "ajax usage"
description: ""
category: development
tags: [javascript]
---
{% include JB/setup %}
I love async feature of AJAX so much. I won't use it if JS could only send request synchroly.  
Also way to use it rather easy enough:  
{%highlight javascript%}
function getXHR()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
{%endhighlight%}

Function above will get an available XML http request object, which is the key component of async-communication.  

{%highlight javascript%}
function send(data)
{
    var xhr = getXHR();
    xhr.open("POST", "TaskServlet", true);
    //xhr.open("GET", "TaskServlet?name=value", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var string = "id=" + data.id + "&task=" + data.task + "&owner=" + data.owner;
    console.log(string);
    xhr.send(string);
    //xhr.send(); use this in GET method
}
{%endhighlight%}
Right? Light weight and easy to handle.  
Notice different parameter passing usage should be taken when in disparate request METHOD.
