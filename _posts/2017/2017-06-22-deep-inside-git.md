---
layout: post
title: "Deep inside Git"
description: ""
category: development
tags: [git]
---
{% include JB/setup %}

## Git init

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

## Git add

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

9 directories, 16 files
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
