---
layout: post
title: "GPG fail to sign"
description: ""
category:  development
tags: [gpg, git]
date: 2020-06-09
---

On Mac, if you use gpg for git signature generation, you will be getting `fail to sign` if you need passphrase.  
This is because git shell does not prompt you to type passphrase, but since gpg needs passphrase, it fails there.  

The solution will be installing `pinentry-mac`

```bash
# Instnall pinentry-mac
brew install pinentry-mac
# Configure git global gpg program
git config --global gpg.program gpg
echo "pinentry-program /usr/local/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf
# Must restart gpg-agent
gpgconf --kill gpg-agent
gpg-agent --daemon
```
