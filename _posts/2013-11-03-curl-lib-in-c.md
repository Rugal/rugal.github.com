---
layout: post
title: "curl lib in C"
description: ""
category: development
tags: [c]
---
{% include JB/setup %}

Firstly you need to install libcurl in your system:  
`sudo apt-get install curl libcurl3`  

Next is create a C program file with content below:  

{%highlight c linenos=table%}
#include<curl/curl.h>
#include<curl/types.h>
#include<curl/easy.h>
#include<unistd.h>
#include<stdio.h>
int main(int argc,char* argv[])
{
    printf("%s\n",curl_version());
    CURL* curl=curl_easy_init();
    //init curl request insntance
    CURLcode result;
    //create curlcode instance for getting result
    if(NULL==curl)
        return;
    curl_easy_setopt(curl,CURLOPT_URL,argv[1]);
    //setup request url in 
    result=curl_easy_perform(curl);
    //perform http request
    curl_easy_cleanup(curl);
    //clean curl environment
    printf("%d\n",result);
    //print feedback result
    printf("Now I can send HTTP request in C\n");
    return 0;
}
{% endhighlight%}

To make this program, I use cmake as my makefile generator and this have to link libcurl.so into object file, hence there needs some changes in `CMakeLists.txt`  
{% highlight cmake%}
SET(LIBRARIES libcurl.so)
TARGET_LINK_LIBRARIES(BINARY_NAME ${LIBRARIES})
{% endhighlight%}
Then just make it and execute `$  ./binary www.google.com` to make request.
