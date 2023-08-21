---
layout: post
title: "Git at first glance"
description: ""
category: development
tags: [git]
date: 2016-10-02
---

As a distributed source version control system, Git is a quite complicated.  
There are several components you will usually get touch with while using Git.  

Following is the very basic architecture of components you will use:  
[![git_architecture.png](https://i.postimg.cc/xCndKgYq/git_architecture.png)](https://postimg.cc/XZ13Wfr0)

----------------------

# Local Machine
Pretty self-explanatory, local machine means the `local` machine than you are directly coding on or using.  For example if you are coding in a remote server through SSH, that `remote server` is also called local machine, as that is the computer that you use to do the work directly.  

Several components exist in local machine:  

## Working directory
Working directory, is the most trivial conception of coding. Why? say, you modify a file `README.md` with `vim`, then save it by `:x`, now this `README.md` file definitely in Working directory.  
Files in working directory have 2 state:  

### Untracked
Files that are newly created and have never been versioned by Git.  
A fresh created file should be an untracked file, and the way to ask Git to take care of this file is 

    git add FILE_NAME

This command tells Git, `Go to take care of that guy...`  
Once ever the file is traced by `git add`, git started to aware of the content change of this file.  

### Tracked
Files that have been versioned by Git.  
Git will monitor which file is modified, deleted and renamed.  
Add untracked files or modify tracked files would trigger this mechanism, use `git status` to see the changes you made since last commit.

## Staging area

If you want to use Git to save files, you need to first store the current state in an area called `Staging` area.  There are several way to achieve this:  

1. Use `git add FILE_NAME` to add files that already exist  
2. Use `git rm FILE_NAME` to delete a file that is being tracked  
3. Use `git mv ORIGIN_NAME  DEST_NAME` to move or rename a file. This usage is exactly same with the Linux command `mv`  

You need to place any file that you want to commit into this area, including files that you want to delete and move.  

## Stash area

This area will not be used very often, only when you want to do some operations about original commits without affecting files in working directory.  
We usually use this area when we `switch branch`, `pull commit`. Operations like these will probably mess up you working directory.  
To avoid this, you can store working directory temporarily in stash.  

    git stash

After finishing your operation, you want to resume your work,

    git stash pop

## Local repository
Now you want to save the changes `permanently`, let's do the commit

    git commit -m"COMMIT_MESSAGE"

All files in staging area will be saved permanently after commiting.  
You can find the local commit log by using:

    git log

And you can have better printing and format by:

    git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --

## Remote ref
This is the local references of remote host.  
This is to compare the relative relationship between real remote repository and you local repository.  
This ref will be synchronized whenever `fetch` and `pull`.  

    git fetch

# Remote repository
A remote repository is a git repository where you will not do the code directly on it.  
The purpose of this repository is to store you local commit in a distributed fashion.  
Technically speaking, after commiting locall, your local machine still has the risk of disk failure.  
To avoid this tragedy, we need a remote repository to save our code.  

```shell
git push # push your code to remote repository
git pull # pull the code from remote repository to local repository
```
