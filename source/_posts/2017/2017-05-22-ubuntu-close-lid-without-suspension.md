---
layout: post
title: "Ubuntu close lid without suspension"
description: ""
category: operation
tags: [linux]
date: 2017-05-22
---

# Edit systemd file

```
sudo vi /etc/systemd/logind.conf
```


# Find and set

```
HandleLidSwitch=ignore
```


# Restart

```
systemctl restart systemd-logind.service
```

 Or simply restart your entire system
