---
layout: post
title: "CSS position"
description: ""
category: development
tags: [css]
date: 2015-09-05
---

## static
HTML elements are positioned static by default.  
Static positioned elements are not affected by the top, bottom, left, and right properties.  
An element with `position: static;` is not positioned in any special way; it is always positioned according to the normal flow of the page.  

## relative
An element with `position: relative;` is positioned relative to its normal position.  
Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element.  

## fixed
An element with `position: fixed;` is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to position the element.  
A fixed element does not leave a gap in the page where it would normally have been located.  
Notice the fixed element in the lower-right corner of the page.  

## absolute
An element with `position: absolute;` is positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like fixed).  
However; if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.  
Note: A "positioned" element is one whose position is anything except static.  

## Overlapping
When elements are positioned, they can overlap other elements.
The z-index property specifies the stack order of an element (which element should be placed in front of, or behind, the others).  
An element can have a positive or negative stack order.  
```css
img 
{
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
}
```
