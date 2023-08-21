---
layout: post
title: "tutorial to use google speech API"
description: ""
category: development
tags: [java]
date: 2015-05-16
---
I spent a long time searching for a good framework or API to do my oral programming work, yesterday I finally find a good way to do that.  
First you need to use [google speech api](https://www.google.com/intl/en/chrome/demos/speech.html), and even before using this, you need to activate speech API privilege and generate a APIkey for youself.  
I disclaim here first that google speech API is `not` an public and official API so it is `not` recommended to use it in product environment. Also, I encourage everyone to obtain your own APIkey in case of harassing other developers' usage quota(who knows when will google starts to restrain it?).

## create api key
For those who want to apply a api-key, please follow [this page](http://www.chromium.org/developers/how-tos/api-keys):  
Following is my personal experience on 2014/05/16. Notice this instruction and google console might change by time, so always keep updated.  

1. Join [chromium](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev) google user group, otherwise you can not see the special API in google console.
2. Go to [google-console](https://console.developers.google.com).
3. use a project or create one if you don't have one.
4. Click on `APIs & auth -> APIs`, search for `speech` and enable this API(make sure you finished step 1 otherwise you are unable to see this entry).
5. Click `APIs & auth -> Credential`, on the right panel you can see there will have a button named `create new key`, click it.
6. Create a `browser key`. The referrers option is up to you.


## quick test API
7. You can download sample audio file from [here](https://github.com/gillesdemey/google-speech-v2) for your convenience.
8. use `API key` to call google speech API use [curl]({% post_url 2013-11-22-linux-curl-command-usage %}) if you are using linux, this will save you a lot of time to see a quick result:  
```shell
curl -X POST --data-binary @./good-morning-google.flac --header 'Content-Type: audio/x-flac; rate=44100;' 'https://www.google.com/speech-api/v2/recognize?output=json&lang=en-us&key=yourkey'
```
After a second two json data will return:  

```shell
{"result":[]}
{"result":[{"alternative":[{"transcript":"good morning Google how are you feeling today","confidence":0.987629}],"final":true}],"result_index":0}
```
A little bit of weird because there are 2 json with the first one is empty.  

### Now just do anything you want!
