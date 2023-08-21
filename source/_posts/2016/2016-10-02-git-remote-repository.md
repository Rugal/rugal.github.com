---
layout: post
title: "Git remote repository"
description: ""
category: development
tags: [git]
date: 2016-10-02
---

Let's make a practise.  

## Init local repository
Initialize a local repository.  

```shell
mkdir learn-git ; cd learn-git
git init
git remote add origin https://github.com/Rugal/learn-git.git
```

## First commit

### Create file

```shell
echo "Rugal Bernstein first commit  " >> README.md
git status
```


    On branch master

    Initial commit

    Untracked files: 
    (use “git add …” to include in what will be committed)

        README.md
        nothing added to commit but untracked files present (use “git add” to track)


### Staging file

```shell
git add README.md
git status
```


    On branch master

    Initial commit

    Changes to be committed: 
    (use “git rm –cached …” to unstage)

        new file:   README.md

### Commit file
```shell
git commit -m"first commit"
```

    [master (root-commit) 3e9292a] first commit
    1 file changed, 1 insertion(+)
    create mode 100644 README.md

    git status

    On branch master
    nothing to commit, working directory clean


## First push

### Create Github repository
We usually use `Github` as our code host.  
[![create_github.png](https://i.postimg.cc/mDRz2B5c/create_github.png)](https://i.postimg.cc/mDRz2B5c/create_github.png)  

### Push your code
Synchronize you local repository to remote host.  

```shell
git remote add origin https://github.com/Rugal/learn-git.git
git push origin master
```

    Counting objects: 3, done.
    Writing objects: 100% (3/3), 252 bytes | 0 bytes/s, done.
    Total 3 (delta 0), reused 0 (delta 0)
    To https://github.com/Rugal/learn-git.git
    * [new branch] master -> master



### Track remote repository
This is set to track the remote status, so that Git could compare the difference between local and remote repo.

```shell
git branch -u origin/master; git status
```

    Branch master set up to track remote branch master from origin.

    On branch master
    Your branch is up-to-date with ‘origin/master’.
    nothing to commit, working directory clean

[![first_push.png](https://i.postimg.cc/9MVb53Pb/first_push.png)](https://i.postimg.cc/9MVb53Pb/first_push.png)  


The tricky point is that, `origin/master` is not special. It is a local cache of the remote branch.  But you can't change this `origin/master` branch unless by `git fetch/push`.  
So basically each time you do `git fetch/push`, the `origin/master` branch will be synced with real remote `master`.  Then you will know the differences between your local development branch and real remote branch by comparing the local `master` with the local `origin/master`.  
