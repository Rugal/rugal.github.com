---
layout: post
title: "set ubuntu screen saver idle time"
description: ""
category: operation
tags: [gnome]
---
{% include JB/setup %}
After searching for a very long time, I got some answer at last:  

first method is to use `gsettings`  
{%highlight bash%}
gsettings set org.gnome.settings-daemon.plugins.power sleep-display-ac 600
gsettings set org.gnome.settings-daemon.plugins.power sleep-display-battery 600
gsettings set org.gnome.desktop.session idle-delay 600
gsettings set org.gnome.desktop.screensaver idle-activation-enabled 'true'
gsettings set org.gnome.desktop.screensaver lock-enabled 'true'
gsettings set org.gnome.desktop.screensaver lock-delay 900
{%endhighlight%}


another way is:  

`vim ~/.gconf/desktop/gnome/%gconf.xml`  
{%highlight xml%}
<?xml version="1.0"?>
<gconf>
    <entry name="idle_delay" mtime="1282047258" type="int" value="2"/>
</gconf>
{%endhighlight%}
which indicate default idle time is `2` minutes. Interesting!
