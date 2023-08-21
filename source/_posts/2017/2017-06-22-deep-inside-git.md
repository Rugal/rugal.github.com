---
layout: post
title: "Deep inside Git"
description: ""
category: development
tags: [git]
date: 2017-06-22
---

# Git init

### Init repository

```bash
[ryao@macpro-gn07 deep-inside-git]> git init
Initialized empty Git repository in /Users/ryao/Workspaces/deep-inside-git/.git/
```

### .git

```bash
[ryao@macpro-gn07 deep-inside-git]> tree .git/
.git/
├── HEAD
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── pre-receive.sample
│   ├── prepare-commit-msg.sample
│   └── update.sample
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags

8 directories, 14 files
```

This is the structure of `.git` directory. So basically:  

- HEAD: pointing to the current HEAD
- hooks: web hooks that make git host programmable
- logs: this is where `log` read from
- objects: this is where commit information and committed files are stored
- refs: this is where `reflog` read from

### HEAD content

```bash
[ryao@macpro-gn07 deep-inside-git]> cat .git/HEAD
ref: refs/heads/master
[ryao@macpro-gn07 deep-inside-git]> ll .git/refs/heads/master
ls: .git/refs/heads/master: No such file or directory
```

As we don't have any commit yet, the file that referred by `HEAD` is not exist.  

### hash-object

```bash
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' | git hash-object --stdin
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' > README.md
[ryao@macpro-gn07 deep-inside-git]> cat README.md | git hash-object --stdin
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
```

In order to start our tutorial, let me introduce `hash-object` tool.  
This tool is what git uses for computing hash for objects.  
By testing the code above, we can see that the hash of a file is simply the hash of its content.  

# Git add

### Updated objects folder
```bash
[ryao@macpro-gn07 deep-inside-git]> git add -A && git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   README.md

[ryao@macpro-gn07 deep-inside-git]> tree .git/objects
.git/objects/
├── 2f
│   └── b811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
├── info
└── pack
```

By simply add the new file into staging area, we have a new object being added into `.git/objects` folder.  
We notice the folder name along with the file name is `2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a`, which is exactly the same with the hash we calculated above.  
From this section we realize, that once a file is staged, its information, type will be hashed and store into `.git/objects` under the folder/file of the hash.  

### Object content
```bash
#original content
[ryao@macpro-gn07 deep-inside-git]> cat .git/objects/2f/b811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
xKOR0*MOV
#size
[ryao@macpro-gn07 deep-inside-git]> git cat-file -s 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
6
#type
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
blob
#content
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
Rugal
```

Here another interesting tool comes, `cat-file`. We can use this tool to inspect objects information.  
We will use this tool to show information of an object later.  

# Git commit

### Commit

In this section we will commit our first file. Let's monitor what will change.  

```bash
[ryao@macpro-gn07 deep-inside-git]> git commit -m"Initial commit"
[master (root-commit) f73a6ae] Initial commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md

[ryao@macpro-gn07 deep-inside-git]> cat .git/refs/heads/master
f73a6ae93b095b899fbdb3b2485f5829b9f460cf
```

After the first commit, we got a file `master` under `.git/refs/heads`.  
The content of file is the hashcode of the commit.  

### Updated objects folder
```bash
[ryao@macpro-gn07 deep-inside-git]> tree .git/objects
.git/objects
├── objects
├── 2f
│   └── b811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
├── 36
│   └── 2032c56bddec6ad5b639e16eeb594f92886516
├── f7
│   └── 3a6ae93b095b899fbdb3b2485f5829b9f460cf
├── info
└── pack
```


## Git commit objects

Now let's inspect the commit objects.  

### Commit information
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t f73a6ae93b095b899fbdb3b2485f5829b9f460cf
commit
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p f73a6ae93b095b899fbdb3b2485f5829b9f460cf
tree 362032c56bddec6ad5b639e16eeb594f92886516
author Rugal Bernstein <ryao@peakcontact.com> 1498230956 -0400
committer Rugal Bernstein <ryao@peakcontact.com> 1498230956 -0400

Initial commit
```

This object is of `commit` type, which means it contains information of a commit, including:  

- Hash of tree
- author information
- commiter information
- commit message

### Commit tree
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t 362032c56bddec6ad5b639e16eeb594f92886516
tree
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 362032c56bddec6ad5b639e16eeb594f92886516
100644 blob 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a    README.md
```

This object is of `tree` type. It contains the files involved in one commit.  

- File permission
- File type
- File hash
- File name

Notice that file name and content are separate, which means file content can be reused. I can see this in later section.  

### Commit object content

```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
blob
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
Rugal
```

This object is of `blob` type. It contains the original file content.  

# Second Commit
Now let's make another commit that includes difference content and different name from `README.md`.  

```bash
[ryao@macpro-gn07 deep-inside-git]> echo 'Bernstein' > INSTALL.md && git add -A
[ryao@macpro-gn07 deep-inside-git]> cat INSTALL.md  | git hash-object --stdin
56757e169d62beeb6371e7f5d3bd6bd507edd2f6
[ryao@macpro-gn07 deep-inside-git]> tree .git/objects/
.git/objects/
├── 2f
│   └── b811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
├── 36
│   └── 2032c56bddec6ad5b639e16eeb594f92886516
├── 56
│   └── 757e169d62beeb6371e7f5d3bd6bd507edd2f6
├── f7
│   └── 3a6ae93b095b899fbdb3b2485f5829b9f460cf
├── info
└── pack

6 directories, 4 files

[ryao@macpro-gn07 deep-inside-git]> git commit -m"Add INSTALL.md file"
[master 800d7b9] Add INSTALL.md file
 1 file changed, 1 insertion(+)
 create mode 100644 INSTALL.md
[ryao@macpro-gn07 deep-inside-git]> git lg
* 800d7b9 - (HEAD -> master) Add INSTALL.md file (68 seconds ago) <Rugal Bernstein>
* f73a6ae - Initial commit (13 minutes ago) <Rugal Bernstein>
```


Now we have 3 more git objects.  

```bash

[ryao@macpro-gn07 deep-inside-git]> tree .git/objects/
.git/objects/
├── 2f
│   └── b811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
├── 36
│   └── 2032c56bddec6ad5b639e16eeb594f92886516
├── 56
│   └── 757e169d62beeb6371e7f5d3bd6bd507edd2f6
├── 80
│   └── 0d7b9974fd1d4ad26791dfcf4bb0478c51c4da
├── c6
│   └── 919ff8ab7ff578ebb6995121d501aa645d0797
├── f7
│   └── 3a6ae93b095b899fbdb3b2485f5829b9f460cf
├── info
└── pack

8 directories, 6 files
```

And the master is pointing to the latest commit.  

```bash
[ryao@macpro-gn07 deep-inside-git]> cat .git/refs/heads/master
800d7b9974fd1d4ad26791dfcf4bb0478c51c4da
```

## Git commit objects

### Commit information
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 800d7b9974fd1d4ad26791dfcf4bb0478c51c4da
tree c6919ff8ab7ff578ebb6995121d501aa645d0797
parent f73a6ae93b095b899fbdb3b2485f5829b9f460cf
author Rugal Bernstein <ryao@peakcontact.com> 1498231664 -0400
committer Rugal Bernstein <ryao@peakcontact.com> 1498231664 -0400

Add INSTALL.md file
```

This file not only has the same type of data as before, but also has a `parent` field indicates which commit it follows.  


### Commit tree
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p c6919ff8ab7ff578ebb6995121d501aa645d0797
100644 blob 56757e169d62beeb6371e7f5d3bd6bd507edd2f6    INSTALL.md
100644 blob 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a    README.md
```

We have one more file in `tree`.  

### Commit object content

```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 56757e169d62beeb6371e7f5d3bd6bd507edd2f6
Bernstein
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
Rugal
```

# Override

Finally let's do another commit, where we are going to override `INSTALL.md` file with the same content as `README.md`.  

```bash
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' > INSTALL.md && git commit -am"Override content of INSTALL.md"
[master 95ab7c4] Override content of INSTALL.md
 1 file changed, 1 insertion(+), 1 deletion(-)

[ryao@macpro-gn07 deep-inside-git]> git lg
* 95ab7c4 - (HEAD -> master) Override content of INSTALL.md (7 seconds ago) <Rugal Bernstein>
* 800d7b9 - Add INSTALL.md file (15 minutes ago) <Rugal Bernstein>
* f73a6ae - Initial commit (27 minutes ago) <Rugal Bernstein>
```

### Git object content

### Commit information
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 95ab7c4
tree 2d5cfaf5513d9dc6876124ff683241bb5c61e0ae
parent 800d7b9974fd1d4ad26791dfcf4bb0478c51c4da
author Rugal Bernstein <ryao@peakcontact.com> 1498232582 -0400
committer Rugal Bernstein <ryao@peakcontact.com> 1498232582 -0400

Override content of INSTALL.md
```

Not many difference than previous commit.  

### Commit tree
```

[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 2d5cfaf5513d9dc6876124ff683241bb5c61e0ae
100644 blob 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a    INSTALL.md
100644 blob 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a    README.md
```

Something weird in this file, we can see both files have the same hash content.  
This means git can reuse object to reduce repository size.  

# Git GC
Some more interesting tool.

We can use `gc` to compress objects into one pack/index.  

```bash
[ryao@macpro-gn07 deep-inside-git]> git gc
Counting objects: 8, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (8/8), done.
Total 8 (delta 0), reused 8 (delta 0)
```

```bash
[ryao@macpro-gn07 deep-inside-git]> tree .git/objects/
.git/objects/
├── info
│   └── packs
└── pack
    ├── pack-1ba47dfdc2c98b428c17082e4ee16e8c111c42ac.idx
    └── pack-1ba47dfdc2c98b428c17082e4ee16e8c111c42ac.pack

2 directories, 3 files
```


# Git verify-pack

After compression, we can still see object content by using `verify-pack`.  

```bash
[ryao@macpro-gn07 deep-inside-git]> git verify-pack -v .git/objects/pack/pack-1ba47dfdc2c98b428c17082e4ee16e8c111c42ac.idx
95ab7c4946063d036a84f677081271a8106407ac commit 255 178 12
800d7b9974fd1d4ad26791dfcf4bb0478c51c4da commit 244 172 190
f73a6ae93b095b899fbdb3b2485f5829b9f460cf commit 191 131 362
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a blob   6 15 493
2d5cfaf5513d9dc6876124ff683241bb5c61e0ae tree   75 61 508
c6919ff8ab7ff578ebb6995121d501aa645d0797 tree   75 82 569
56757e169d62beeb6371e7f5d3bd6bd507edd2f6 blob   10 19 651
362032c56bddec6ad5b639e16eeb594f92886516 tree   37 48 670
non delta: 8 objects
.git/objects/pack/pack-1ba47dfdc2c98b428c17082e4ee16e8c111c42ac.pack: ok
```
