---
layout: post
title: "linux curl command usage"
description: ""
category: operation
tags: [curl]
---
{% include JB/setup %}
Recently I found it is very useful to execute `curl` command  
While testing my JavaEE application, it is too annoying to always use any other browsers. At this time, `curl` become a very great tool to cope with this  
Here I list some great useful options:  
{%highlight bash%}
curl [options] [URL...]

-A agentinfo    #using any browser agence :
 #-A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4"

-b cookiefile|name=value    #load cookie file or from input while requesting

-c cookiefile   #save cookie data into a file for reusing

-C -    #continue and resume download action automatically just like THUNDER and FLASHGET

-d name=value...  #send data with post method

-D dumpfile     #save header data into a file for analyse

-e referencedpage #disguised as forwarded from referenced page  :  -e "mail.rugal.com"

-F name=value   #upload file as post method.
                #do not forget @ if upload a file: name=@path_of_file

-o filename     #output buffer content into a file

-O              #similar as -o option, but automatically save file name as server

-r start-stop   #download a file with seperate download process in byte unit.
                #can combine them again with cat * > wholefile: 
        #-stop  specifies the last number  bytes;
        #start- specifies bytes from this number and forward;
        #0-0,-1 specifies the first and last byte only

-x ip:port      #use proxy   :   -x   127.0.0.1:8

-#              #show progress bar
{%endhighlight%}
