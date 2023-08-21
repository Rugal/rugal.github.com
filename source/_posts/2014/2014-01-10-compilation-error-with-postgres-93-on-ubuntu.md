---
layout: post
title: "compilation error with postgres 9.3 on ubuntu"
description: ""
category: operation
tags: [c, postgresql, linux]
date: 2014-01-10
---
I start on studying database development with `postgres` recently, and I'm sure I need to start from compilation of the source code, but a compilation problem comes to me.  
The one I coped with is shared below, and I would like to show my linux environment first:  

Compilation Env:
```
Ubuntu 13.10  
Linux rugal-TM8473 3.11.0-15-generic #23-Ubuntu SMP Mon Dec 9 18:17:04 UTC 2013 x86_64 x86_64 x86_64 GNU/Linux  
gcc version 4.8.1 (Ubuntu/Linaro 4.8.1-10ubuntu9)  
bison (GNU Bison) 2.7.12-4996  
```

Error Stack:
```
make -C preproc all
make[4]: Entering directory `/home/rugal/workspace/postgresql/src/interfaces/ecpg/preproc'
gcc -O2 -Wall -Wmissing-prototypes -Wpointer-arith -Wdeclaration-after-statement -Wendif-labels -Wmissing-format-attribute -Wformat-security -fno-strict-aliasing -fwrapv -fexcess-precision=standard -pthread  -D_REENTRANT -D_THREAD_SAFE -D_POSIX_PTHREAD_SEMANTICS -DECPG_COMPILE -I../include -I../../../../src/interfaces/ecpg/include -I. -I. -DMAJOR_VERSION=4 -DMINOR_VERSION=10 -DPATCHLEVEL=0 -I../../../../src/include -D_GNU_SOURCE   -c -o preproc.o preproc.c -MMD -MP -MF .deps/preproc.Po
In file included from preproc.y:15004:0:
pgc.l: In function ‘base_yylex’:
pgc.l:403:24: error: ‘ET_FATAL’ undeclared (first use in this function)
       BEGIN(state_before);
                        ^
pgc.l:403:24: note: each undeclared identifier is reported only once for each function it appears in
In file included from preproc.y:15004:0:
pgc.l: In function ‘parse_include’:
pgc.l:1366:28: error: ‘ET_FATAL’ undeclared (first use in this function)
    if (!yyin)
                            ^
make[4]: *** [preproc.o] Error 1
```

This problem keep bothering even after I used  
`make distclean`  
`./configure --enable-depend && make`  

At first, I found some solution mentioned about the `bison` parser generator,  so I regenerator some syntax file.  
`bison -d -o preproc.c preproc.y`  
But this continue bothering me.  I feel helpless...  

Night after that,  I find a other method to cope with it:  
```
--- a/src/interfaces/ecpg/preproc/type.h
+++ b/src/interfaces/ecpg/preproc/type.h
@@ -186,7 +186,7 @@ struct assignment
 
 enum errortype


 {
-   ET_WARNING, ET_ERROR, ET_FATAL


+   ET_WARNING, ET_ERROR
 };
```

After adding this enum,  `ET_FATAL`, compilation become successful!  
But there still has a strange warning:  
```
preproc.y: In function ‘vmmerror’:
preproc.y:76:2: warning: enumeration value ‘ET_FATAL’ not handled in switch [-Wswitch]
  switch(type)
  ^
```
Which indicating the `enum` I just added is already retired.  What can I do next?  

So I sent my first mail to `psql-hackers` mail group, and I got replied:  

`You have to rebuild the auto-generated pgc.c, preproc.c and preproc.y or simplyremove them to force a rebuild.`  

This directed me.  I deleted `pgc.c` `preproc.c` `preproc.h` `preproc.y`, which I used to treat as important, but turn out to be generated files.  
And this time, I could `make` successfully!  

I have learned it is the reason that the first time I `make`, those `.y` files are generated automatically, but they would not deleted by `make distclean`, which result in the above error.  
Also I got to know, `make maintainer-clean` can clean all unnecessary file, hackers will use this to clean all no-needed files when they coding.  
I have learnt more from this, `compilation principle` is so important that it was a great pity for my school do not have this class!  

## Let's start developing [PostgreSQL](http://wiki.postgresql.org/wiki/Todo)
