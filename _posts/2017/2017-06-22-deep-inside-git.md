---
layout: post
title: "Deep inside Git"
description: ""
category: development
tags: [git]
---
{% include JB/setup %}

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

### HEAD content

```bash
[ryao@macpro-gn07 deep-inside-git]> cat .git/HEAD
ref: refs/heads/master
[ryao@macpro-gn07 deep-inside-git]> ll .git/refs/heads/master
ls: .git/refs/heads/master: No such file or directory
```

### hash-object

```bash
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' | git hash-object --stdin
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' > README.md
[ryao@macpro-gn07 deep-inside-git]> cat README.md | git hash-object --stdin
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
```

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


# Git commit

### Commit

```bash
[ryao@macpro-gn07 deep-inside-git]> git commit -m"Initial commit"
[master (root-commit) f73a6ae] Initial commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md

[ryao@macpro-gn07 deep-inside-git]> cat .git/refs/heads/master
f73a6ae93b095b899fbdb3b2485f5829b9f460cf
```

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


## Git commit Objects

### Commit information
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t f73a6ae93b095b899fbdb3b2485f5829b9f460cf
commit
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p f73a6ae93b095b899fbdb3b2485f5829b9f460cf
tree 362032c56bddec6ad5b639e16eeb594f92886516
author Rugal Bernstein <ryao@peakcontact.com> 1498230956 -0400
committer Rugal Bernstein <ryao@peakcontact.com> 1498230956 -0400
```
### Commit tree
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t 362032c56bddec6ad5b639e16eeb594f92886516
tree
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 362032c56bddec6ad5b639e16eeb594f92886516
100644 blob 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a    README.md
```


### Commit object content

```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -t 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
blob
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
Rugal
```


# Second Commit
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


```bash
[ryao@macpro-gn07 deep-inside-git]> cat .git/refs/heads/master
800d7b9974fd1d4ad26791dfcf4bb0478c51c4da
```

## Git commit Objects

### Commit information
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 800d7b9974fd1d4ad26791dfcf4bb0478c51c4da
tree c6919ff8ab7ff578ebb6995121d501aa645d0797
parent f73a6ae93b095b899fbdb3b2485f5829b9f460cf
author Rugal Bernstein <ryao@peakcontact.com> 1498231664 -0400
committer Rugal Bernstein <ryao@peakcontact.com> 1498231664 -0400

Add INSTALL.md file
```
### Commit tree
```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p c6919ff8ab7ff578ebb6995121d501aa645d0797
100644 blob 56757e169d62beeb6371e7f5d3bd6bd507edd2f6    INSTALL.md
100644 blob 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a    README.md
```

### Commit object content

```bash
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 56757e169d62beeb6371e7f5d3bd6bd507edd2f6
Bernstein
[ryao@macpro-gn07 deep-inside-git]> git cat-file -p 2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
Rugal
```
