---
layout: post
title: "Uploading file other than post"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

Restful style of API design broaden my horizon by standardizing the rule for API.  

###POST
must be something `new` into server, which means creating a new resource. 

###PUT
Must be `updating` existing resources in server.

###DELETE
Must `delete` a exist resource in server, if not so, ignore its operation.

###GET
Obviously, it is read only operation.

But most of the uploading APIs are designed to use POST, even in springmvc's `org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload`, it use `POST` method only. I think this is not a good practise, especially for a person who want to insist on using Restful style.  

Other than using `POST`, what we could do to achieve this is like below, idea is part from [SOF](http://stackoverflow.com/a/10041789/1242236):  

Extends `CommonsMultipartResolver` to enable multipart resolvation other than `POST`.  
{%highlight java%}
public class ExtendedMultipartResolver extends CommonsMultipartResolver
{
    private static final String MULTIPART = "multipart";
    private boolean isMultipartContent(HttpServletRequest request)
    {
        String httpMethod = request.getMethod().toLowerCase();
        // test for allowed methods here...
        String contentType = request.getContentType();
        return (contentType != null && contentType.toLowerCase().startsWith(MULTIPART));
    }

    @Override
    public boolean isMultipart(HttpServletRequest request)
    {
        return (request != null && isMultipartContent(request));
    }
}
{%endhighlight%}


In springmvc application context file, add the last class we created:
{%highlight java%}
@Bean
//bean name must be exactly "multipartResolver"
public MultipartResolver multipartResolver()
{
    ExtendedMultipartResolver emr = new ExtendedMultipartResolver();
    //notice this parameter is also important to configure
    cmr.setMaxUploadSize(9999999);
    return emr;
}
{%endhighlight%}
