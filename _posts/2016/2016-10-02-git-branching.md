---
layout: post
title: "Git Branching"
description: ""
category: development
tags: [git]
---
{% include JB/setup %}


Git branch is actually a commit node tree.  
[![git_branch.png](https://s25.postimg.org/wn64wx127/git_branch.png)](https://postimg.org/image/t3k773ycb/)  


# Let's make a vivid visualization

After finishing the commit, that newly created commit will be placed on the `HEAD`.  
[![git_branch_1.png](https://s25.postimg.org/wbook5km7/git_branch_1.png)](https://postimg.org/image/xqq98vlp7/)  

You could create a new branch based on a existing branch.  

    git checkout -b Development

[![git_branch_2.png](https://s25.postimg.org/l0m0vsdr3/git_branch_2.png)](https://postimg.org/image/knumplvh7/)  

Now you can commit on the `Development` branch  
[![git_branch_3.png](https://s25.postimg.org/w1h60t5zz/git_branch_3.png)](https://postimg.org/image/65xfhm463/)  

We can go back to the `master` branch and continue commiting on `master` branch  

    git checkout master

[![git_branch_5.png](https://s25.postimg.org/b5uvpk9sv/git_branch_5.png)](https://postimg.org/image/9e1wunqfv/)  


We can create another branch  

    git checkout -b other

[![git_branch_6.png](https://s25.postimg.org/s7nprnonz/git_branch_6.png)](https://postimg.org/image/qsm52xnkr/)  


And still checkout the `master` branch again  

    git checkout master

[![git_branch_7.png](https://s25.postimg.org/nn1jcq4yn/git_branch_7.png)](https://postimg.org/image/x7l5zluaj/)  

As you can see `HEAD` pointer is a special branch name that always point to the current branch or commit that we are working on.
