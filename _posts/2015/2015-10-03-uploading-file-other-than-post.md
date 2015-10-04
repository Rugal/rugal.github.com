---
layout: post
title: "Uploading file other than post"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

Restful style of API designing broaden my horizon by standardizing the rule for API.  

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

-------------------

##MultipartResovler
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

##Springmvc configuration
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

##JAR
Because we introduced `CommonsMultipartResolver`, which uses 2 apache jars, we also need to import them in pom file:  
{%highlight xml%}
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.4</version>
</dependency>
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
{%endhighlight%}

##Unit test
Now seems all configuration are done, time to start coding for unit test:  

{%highlight java%}
@Test
public void testUpdateOperation() throws Exception
{
    System.out.println("update operation");
    FileInputStream fis = new FileInputStream(file);
    MockMultipartFile multipartFile = new MockMultipartFile("file", fis);
    Map<String, String> contentTypeParams = new HashMap<>();
    //The boundary parameter is important!
    contentTypeParams.put("boundary", "RugalBernstein");
    MediaType mediaType = new MediaType("multipart", "form-data", contentTypeParams);
    MvcResult result = this.mockMvc.perform(put("/tag/" + db.getTid())
        .header(SystemDefaultProperties.ID, user.getUid())
        .header(SystemDefaultProperties.CREDENTIAL, user.getPassword())
        .param("name", db.getName() + "Updated")
        .content(multipartFile.getBytes())
        .contentType(mediaType)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andDo(print())
        .andReturn();
}
{%endhighlight%}  
This should be pretty satisfying, because we not only stick to the Restful style, but also upload file successfully  

-----------------

Notice the `boundary` parameter in content type is mandatory.  

Hope this post could help someone!
