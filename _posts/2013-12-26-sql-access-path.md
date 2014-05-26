---
layout: post
title: "sql access path"
description: ""
category: operation
tags: [oracle]
---
{% include JB/setup %}
1. ROWID  
fastest way to locate a row but using single block i/o harmful when scanning big table  
2. INDEX ACCESS  

    1. index unique scan  
    if unique index has been built , faster  way to locate a row,using `single block i/o`

    2. index range scan  
    if unequal operator has been used or not unique index exists, fast way to locate a row, but not very well if the records exccess 10% of total table's records, using `single block i/o`

    3. index full scan  
    sorted as index order. single block i/o.  
    IFS according to leaf node chain. start from root, once find first data block of leaf node chain, then scan along with leaf node chain.  
    because leaf node chain is sorted by indexed key, hence the data scanned is sorted itself, and do not needs sort again.  
    This scan method have much more cost compared with index fast full scan. what cost the most is walk along with leaf node chain to scan all the index. a lot of `db file sequential read wait` will occur.

    4. index fast full scan  
    multiblock i/o. parallel read.  not sorted. fast than index full scan  
    IFFS will scan index by extent, with multiblock read, thus have performance enhancement compared with IFS, but the data itself is not sorted. It will trigger `db file scattered read wait`.  

    5. index skip scan  
    happens when there exists a combined index and not using leading column, this will fire `block scatterd read` and is harmful to performence.

3. TABLE ACCESS FULL  
multiblock i/o in some kind of situation will enhance oracle performence in big scale reading.
