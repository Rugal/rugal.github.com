---
layout: post
title: "fetch html file in Java"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}
How to get an html file in Java?  
{%highlight java%}
package rugal;

import java.io.IOException;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;

public class HttpClientSimple {
    public static void main(String[] args){
        HttpClient httpClient = new HttpClient();
        httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(5000);
        //create GET method instance
        String url = "http://www.baidu.com";
        GetMethod getMethod = new GetMethod(url);

        //set GET timeout as  5 sec
        getMethod.getParams().setParameter(HttpMethodParams.SO_TIMEOUT,5000);
        //use default retry strategy
        getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
                        new DefaultHttpMethodRetryHandler());
        try{
            //execute
            int statusCode = httpClient.executeMethod(getMethod);
            if (statusCode != HttpStatus.SC_OK){
                System.err.println("Method failed: "
                     + getMethod.getStatusLine());
            }
            //first method to get file
            byte[] responseBody = getMethod.getResponseBody();
            System.out.println(new String(responseBody));

            //another method
            String newStr = new String(getMethod.getResponseBodyAsString().getBytes()
                            ,"UTF-8");
            System.out.println(newStr);
        }catch(HttpException e){
            System.out.println("Please check your provided http address!");
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }finally{
            getMethod.releaseConnection();
        }
    }
}
{%endhighlight%}
