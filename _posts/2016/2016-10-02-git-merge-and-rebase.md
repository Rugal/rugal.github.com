---
layout: post
title: "Git Merge and Rebase"
description: ""
category: development
tags: [git]
---
{% include JB/setup %}


There are two ways you can join branches.  
For showing with example, here is the base commit tree.  
[![branch_tree.png](https://s25.postimg.org/3kcnf7jbz/branch_tree.png)](https://postimg.org/image/ankiutorf/)  
Here you can see, there are two branches, `master` and `development`.  

# Merge
`Merge` is a very straight forward method to join branches.  
When `merge` command is issued, git will compare current branch with the target branch and aggregate commits that are different from the diverge point, here is `[3 4 5]`.  
Then git will place the the aggregated commit `[7]` on top of the `master`.  Also, conflicts is also placed in this commit.  
[![branch_merge.png](https://s25.postimg.org/np1m6xnrz/branch_merge.png)](https://postimg.org/image/vujo53c0r/)  
As you can see, this method retains branch structure so reverting to old branch structure is possible.  


# Rebase

Different from `Merge`, `Rebase` does not retain branch structure.  
The different commits will be replayed on top of the `master` branch, as if you commit them on `master` at the first place.  
Commits will be replayed one by one. Conflict needs to be resolved on each commit.  
[![branch_rebase.png](https://s25.postimg.org/zffjobgkf/branch_rebase.png)](https://postimg.org/image/eijbjnijf/)  
As you can see, the branch structure is aligned as a straight line.  So revertng directly to old branch structure is not easy.  
