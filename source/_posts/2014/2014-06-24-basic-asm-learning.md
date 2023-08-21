---
layout: post
title: "basic asm learning"
description: ""
category: development
tags: [asm]
date: 2014-06-24
---
Well, I have to say learn some `ASM` is mandatory while inspecting linux kernel code, hence I give a sample of simply write an `asm` code.   

There are six registers that are used for the arguments that the system call takes.   
The first argument goes in EBX, the second in ECX, then EDX, ESI, EDI, and finally EBP.  

```asm
mov	eax,1       ; The exit syscall number
mov	ebx,0       ; Have an exit code of 0
int	80h         ; Interrupt 80h, the thing that pokes the kernel and says, "Yo, do this"
```

------

#### Hello world sample
	
```asm
section .data
hello:     db 'Hello world!',10    ; 'Hello world!' plus a linefeed character
helloLen:  equ $-hello             ; Length of the 'Hello world!' string
                                   ; (I'll explain soon)
section .text
	global _start

_start:
	mov eax,4         ; The system call for write (sys_write)
	mov ebx,1         ; File descriptor 1 - standard output
	mov ecx,hello     ; Put the offset of hello in ecx
	mov edx,helloLen  ; helloLen is a constant, so we don't need to say
	                  ; mov edx,[helloLen] to get it's actual value
	int 80h           ; Call the kernel
	mov eax,1         ; The system call for exit (sys_exit)
	mov ebx,0         ; Exit with return code of 0 (no error)
	int 80h
```
