---
layout: post
title: "Git Branching"
description: ""
category: development
tags: [git]
date: 2016-10-02
---

Git branch is actually a commit node tree.  
[![git_branch.png](https://i.postimg.cc/LXR4hCcT/git_branch.png)](https://i.postimg.cc/LXR4hCcT/git_branch.png)  


# Let's make a vivid visualization

After finishing the commit, that newly created commit will be placed on the `HEAD`.  
[![git_branch_1.png](https://i.postimg.cc/qR0n0Gjf/git_branch_1.png)](https://postimg.cc/d7HDjrbn)  

You could create a new branch based on a existing branch.  

    git checkout -b Development

[![git_branch_2.png](https://i.postimg.cc/DZFCDLG0/git_branch_2.png)](https://postimg.cc/Jy6cHyPC)  

Now you can commit on the `Development` branch  
[![git_branch_3.png](https://i.postimg.cc/FRN4Zfsg/git_branch_3.png)](https://postimg.cc/06WF5ySb)  

We can go back to the `master` branch and continue commiting on `master` branch  

    git checkout master

[![git_branch_5.png](https://i.postimg.cc/qR4N3MPW/git_branch_5.png)](https://postimg.cc/XZ1NM37g)  


We can create another branch  

    git checkout -b other

[![git_branch_6.png](https://i.postimg.cc/Twfc3xC3/git_branch_6.png)](https://postimg.cc/CZr8cW33)  


And still checkout the `master` branch again  

    git checkout master

[![git_branch_7.png](https://i.postimg.cc/63tDJDZd/git_branch_7.png)](https://postimg.cc/WDY90YX3)  

As you can see `HEAD` pointer is a special branch name that always point to the current branch or commit that we are working on.
