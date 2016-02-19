---
layout: post
title: "git restore file from commit"
description: ""
category: operation
tags: [git]
---
{% include JB/setup %}
I have found a very useful command that can restore unintended deleted or modified files that have already commited:  
{%highlight bash%}
git ls-files -d |xargs -i git checkout {}
{%endhighlight%}
this command will restore that last commited version of file that have been deleted in cache.  
For referring basic usage of `xargs`, [here]({%post_url 2014-01-12-use-xargs-to-replace-bash-loop %}) 
