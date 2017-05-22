---
layout: post
title: "Ubuntu close lid without suspension"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}

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
