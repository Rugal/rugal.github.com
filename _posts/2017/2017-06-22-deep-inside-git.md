---
layout: post
title: "Deep inside Git"
description: ""
category: development
tags: [git]
---
{% include JB/setup %}

## Init

### Init repository

```
[ryao@macpro-gn07 deep-inside-git]> git init
Initialized empty Git repository in /Users/ryao/Workspaces/deep-inside-git/.git/
```

### .git

```
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

```
[ryao@macpro-gn07 deep-inside-git]> cat .git/HEAD
ref: refs/heads/master
[ryao@macpro-gn07 deep-inside-git]> ll .git/refs/heads/master
ls: .git/refs/heads/master: No such file or directory
```

### hash-object

```
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' | git hash-object --stdin
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
[ryao@macpro-gn07 deep-inside-git]> echo 'Rugal' > README.md
[ryao@macpro-gn07 deep-inside-git]> cat README.md | git hash-object --stdin
2fb811a4ca96b3d0ac9b4fb8aa3d96e6a809509a
```
