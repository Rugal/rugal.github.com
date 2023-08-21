---
layout: post
title: "using winmanager and nerdtree"
description: ""
category: operation
tags: [vim]
date: 2014-03-18
---
`winmanager` is a windows manager used in VIM to tackle with multiple windows.  
As for `nerdTree`, an delicate VIM plugin for tree view browsing throughout folder tree.  
But when integrating these two plugins together, One might find it always have an extra window opened.  
In this situation, you need to make some code modification in `winmanager.vim` file.  

At line `1059`:  
```vim
" toggle showing the explorer plugins.
function! <SID>ToggleWindowsManager()
	if IsWinManagerVisible()
		call s:CloseWindowsManager()
	else
		call s:StartWindowsManager()
		exec 'q'   "Just add this line
	end
endfunction
```

Now, `winmanager` and `nerdTree` collaberating well!
