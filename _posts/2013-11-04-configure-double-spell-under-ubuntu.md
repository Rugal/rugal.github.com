---
layout: post
title: "configure Double Spell under ubuntu"
description: ""
category: operation
tags: [linux]
---
{% include JB/setup %}
##install fcitx:  
`sudo apt-get install fcitx;sudo reboot`  
##configure paging setting:  
edit `~/.config/fcitx/config` and change properties below:  
{%highlight properties%}
# Hotkey of Going Prev Page
PrevPageKey=PGUP
# Hotkey of Going Next Page
NextPageKey=PGDN
{%endhighlight%}
##setup Double-Spell typing schema
find `/usr/share/fcitx/pinyin/sp.dat` first, and copy this file into
`~/.config/fcitx/pinyin`  
edit this file, here is my schema:  

{%highlight properties%}
[零声母标识]
=o
[声母]
ch=I
sh=U
zh=V
[韵母]
ai=L
an=J
ang=H
ao=K
ei=Z
en=F
eng=G
er=R
ia=W
ian=M
iang=D
iao=C
ie=X
in=N
ing=;
iong=S
iu=Q
ong=S
ou=B
ua=W
uai=Y
uan=R
uang=D
ue=T
ui=V
un=P
uo=O
v=Y
ve=T
{%endhighlight%}
After customized your own schema, what you do next is to configure `~/.config/fcitx/conf/fcitx-pinyin.config`, and change `DefaultShuangpinSchema=User Defined`

##import sougou vocaburary library
download [fcitx-sougou-phrase-full.7z](http://hslinuxextra.googlecode.com/files/fcitx-sougou-phrase-full.7z), extract this file and execute `./run.sh`  
after extraction, copy `pybase.mb` and `pyphrase.mb` into `/usr/share/fcitx/data`  
PS: in ubuntu, you can use `p7zip -d` command to decompress the 7z file.  
PSS: if you got error message of `createPYMB not found` just install
`fcitx-tools` to meet the requirement.  


##setup cloud input
`sudo apt-get install fcitx-module-cloudpinyin`  
select cloudpinyin input method in fcitx configuration diaglog and choose sougou cloud pinyin  


##to setup double spell pinyin as default input method
install `sudo apt-get install fcitx-config-gtk3` or `fcitx-configtool` to better
configure input method, in which, find the double spell pinyin and move that
just below `English Language` to make that as default.



You have to restart or logout session to start input method up.
