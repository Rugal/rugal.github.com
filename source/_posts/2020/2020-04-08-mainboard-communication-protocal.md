---
layout: post
title: "Mainboard Communication Protocal"
description: ""
category:  study
tags: [hardware]
date: 2020-04-08
---

# Interface/Slot

### PATA
![pata slot](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/IDE_Connectors_in_PCChips_M925LR_Pentium_4.jpg/800px-IDE_Connectors_in_PCChips_M925LR_Pentium_4.jpg)

### SATA, mSATA

![sata](https://i.stack.imgur.com/nXAha.jpg)

![SATA](https://4.bp.blogspot.com/-cmuw0ohRNZI/VuFlzzzrM8I/AAAAAAAAb6Q/x-hxGd9ujE8/s1600/sata-slot-motherboard.jpg)
![mSATA](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/MSATA_SSD_vs._2.5%22_SATA_drive.JPG/1024px-MSATA_SSD_vs._2.5%22_SATA_drive.JPG)

### M.2

![M.2](https://www.silverstonetek.com/images/products/sdp12/sdp12-6.jpg)

### PCI-E
![pcie](https://adexel.verio.com/pexp-sx-la.jpg)

# Bus/Line

### PATA
![pata](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Ata_20070127_002.jpg/1200px-Ata_20070127_002.jpg)

###  SATA3
![sata3](https://c1.neweggimages.com/ProductImage/12-119-229-S01.jpg)

### PCI-E
![pcie](https://c1.neweggimages.com/ProductImage/12-423-259-Z01.jpg)


# Driver software
### IDE
The very old one, supports mostly PATA

### AHCI
Technology after `IDE` supports mostly `HD` and `SSD`, but it is designed to fit `HD` better, with only 1 queue available, each queue with 32 commands

### NVMe
Technology after `AHCI`, not many devices are supported. Mostly `SSD`. With 64K queue available, each queue with 64K commands

### RAID
Technology designed for Redundency and Fault Tolerance requirement.
