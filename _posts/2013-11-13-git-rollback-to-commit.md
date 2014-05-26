---
layout: post
title: "git rollback to commit"
description: ""
category: operation
tags: [git]
---
{% include JB/setup %}
Sometimes when using `git` and encounter the situation tha has to rollback to a version or commit, here is the git command to reveal this:  
{%highlight bash%}
#remove file from cache
git reset HEAD file  
# will reset the last n times commits as if there have never commited for this.
git reset --hard HEAD~n   
#will rollback to the <commit> version.
git reset --hard <commit> 

#rollback to a version but only rollback commit information, keep source code and index.
git reset --soft  <...>  
#just as git reset, only source code kept, with commit and index information rollbacked.
git reset --mixed <...>  
#thoroughtly rollback to a version, source code as well as index information rollbacked.
git reset --hard  <...> 
{%endhighlight%}
