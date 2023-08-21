---
layout: post
title: "javascript first nip"
description: ""
category: development
tags: [javascript]
date: 2014-02-25
---
I told myself that I do not like javascript, actually it is just a joke, you never know when there is a requirement to use it.  
Honestly, Javascript is very powerful. Now, I learn JS not for further deeping, but for slightly using its async-functionality in AJAX.  

## load JS in html
```html
<script src="js/jquery.js"></script>
```
it's alright to put it in any position for my level of JS. Actually I hear about the position and sequence of loading JS will have some influence on rendering performance and some logic.  


## navigation
Navigating through HTML is a tough work, but a JS library called `jQuery` could achieve this without too much burden.  

```javascript
var rows = $("tr", "#bodystart");
//Matching tag by id:bodystart first, then filter all <tr> tag inside this context
for (var i = 0; i < rows.length; i++)
{
    //matching a input tag with specified attribute. Using single row as context.
    if (!$("input[type='checkbox']", rows[i])[0].checked)
        continue;
    console.log("R");
}
```
The `context` means searching action will happen only in given scope, which shrink our filter base and easier for targeting a specified tag.  

Well I do not want to further into this, Javascript code is bullshit. It just makes JS developer feel like achieving great compare with C/C++/Java developer whose work are not directly revealed.  
But actually it's not that much, please be modest JS developers.  
I'd rather pay more attention on `C`, `Java`.
