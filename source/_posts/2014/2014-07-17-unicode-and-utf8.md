---
layout: post
title: "Unicode and UTF-8"
description: ""
category: development
tags: [charset]
date: 2014-07-17
---

There are many discrepancy towards `unicode` and `UTF=8`, for very long time I did tno figure out what the difference between thiese two things.  



------

# character set
Also known as `char set`, defined some specific word or character on this world into sequential number.  
There ever have some sort of `char set` in this world:  

* `Universal Character Set`(UCS)
    Which is obsoleted
* `Unicode`
    This is currently prominent
* `ASCII`
    Ancient but still affect current `charset`

But what on Earth is the word `char set`?  
Just as I have mentioned at the begining of this chapter, `char set` is just to define a map in which sequential number and any word or character in this world.  

### ASCII
At ancient time, [`ASCII`](http://en.wikipedia.org/wiki/ASCII) was first introduced on the meeting of the American Standards Association's (ASA) X3.2 subcommittee, to include all alphabetic character and digit character, as well as some other control characters. `ASCII` unified the character set at that time, even today, `ASCII` still affecting our new generation character set like `Unicode`.   
ASCII use `7` bits to represent `128` characters.  



#### sample `ASCII` character set table

Binary |	Oct| 	Dec| 	Hex| 	Glyph
--|--|--|--|--
010 0100| 	044| 	36| 	24| 	$
100 0000 |	100| 	64| 	40| 	@
100 0001| 	101| 	65| 	41| 	A
110 0001| 	141| 	97| 	61| 	a
011 0000| 	060| 	48| 	30| 	0




But as you can also image, ASCII character set can not fit current requirement for much larger words and characters, thus we have to emplify and fill more character into a new generation character set.  

### UNICODE
[Unicode](http://en.wikipedia.org/wiki/Unicode) is a prominent and new generation character set for today, it try alot hard to include almost all characters and words in this world, since its versatile representation capability, more companies and organization keen on it as their main character set.  

Just like `ASCII`, `Unicode` not only provide all ASCII character set with its original position for better compatibility with legacy charset, but also extends many more characters like Chinese, Japanese, Indian and others.   
Unicode use `24` bits to represent, that is almost 3 bytes.

#### sample `UNICODE` character set table

Dec| Hex | Glyph
--|--|--
36|U+0024|$
163|U+00A2|¢ 
8364|U+20AC|€ 



-----------

# character encoding
In this chapter I just want to talk about `encoding` with `Unicode` for simplicity.  

After defining all those available characters as a set, what I do in information transmission?  Of course you can throw those 3 three bytes onto network or hard disk, but there could have a better project.  
You may find that alphabets and digits are used much more frequently than other rare characters, since `Huffman Coding` already give us a great practice, we can reduce cost or transmission burden by shorten encoding of different character for disparate length.  
For instance, since `A` is used so frequently than `Chinese` character, we could encoding `A` in one byte or 8 bits, but encoding `Chinese` in 4 bytes.  

That is how and why character encoding works:  


## UTF-8
[UTF-8](http://en.wikipedia.org/wiki/UTF-8) is a `variable-width` encoding that can represent every character in the Unicode character set.  
For original `ASCII` character, `UTF-8` obey its originality, use only one byte to shorten encoding.  
While spend more byte for unicode's larger and less frequently used character.   

Bits of code point| First code point| Last code point| Bytes in sequence| Byte 1| Byte 2| Byte 3| Byte 4| Byte 5| Byte 6
--|--|--|--|--|--|--|--|--|--
 7 |	U+0000| 	U+007F| 	1| 	0xxxxxxx
11| 	U+0080| 	U+07FF| 	2| 	110xxxxx| 	10xxxxxx
16 	|U+0800| 	U+FFFF| 	3 |	1110xxxx| 	10xxxxxx |	10xxxxxx
21| 	U+10000| 	U+1FFFFF| 	4 	|11110xxx| 	10xxxxxx| 	10xxxxxx| 	10xxxxxx
26| 	U+200000| 	U+3FFFFFF| 	5| 	111110xx 	|10xxxxxx| 	10xxxxxx| 	10xxxxxx| 	10xxxxxx
31 |	U+4000000| 	U+7FFFFFFF| 	6| 	1111110x 	|10xxxxxx| 	10xxxxxx| 	10xxxxxx| 	10xxxxxx| 	10xxxxxx


So use this binary code point table along with Unicode character set, we can now have better performed encoding system:  

#### sample `UTF-8`  mapping table 

Glyph| unicode 	|Binary code point |	Binary UTF-8| 	Hexadecimal UTF-8
--|--|--|--|--
$ |	U+0024| 	0100100 	|00100100| 	24
¢ |	U+00A2| 	000 10100010| 	11000010| 10100010| 	C2 A2
€ | U+20AC| 	00100000 10101100| 	11100010 10000010 10101100| 	E2 82 AC

#### Some languages

Language | Range
---|---
Chinese | u4e00-u9fa5
Korean | x3130-x318F
Korean | xAC00-xD7A3
Japaness | u0800-u4e00



## UTF-16
UTF-16 is a fix-width encoding, any character set from Unicode is literally copied onto UTF-16 mapping table.   
I will skip this paragraph since this is much simpler than `UTF-8`.  


### Now
`Do you understand what the disparity between Unicode and UTF-8?`  
You need to ask yourself, what about the other `charset` and `encoding`?
