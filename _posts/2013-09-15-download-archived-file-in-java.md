---
layout: post
title: "download archived file in Java"
description: ""
category: development
tags: [java]
---
{% include JB/setup %}

{% highlight java linenos=table%}
public byte[] request(String urlString)
{
    URL url = null;
    File file = null;
    try {
        url = new URL(urlString);
        URLConnection conn = url.openConnection();
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestProperty("content-type", "binary/data");  // binary/data is key
        InputStream in = conn.getInputStream();  // read InputStream from network
        file = new File("name.zip");
        FileOutputStream out = new FileOutputStream(file); // OutputStream as file
        byte[] b = new byte[2048];
        int count;
        while ((count = in.read(b)) > 0) {
            out.write(b, 0, count);
        }
        out.close();
        in.close();
    }
    catch (IOException e) {
    }
}
{% endhighlight %}
