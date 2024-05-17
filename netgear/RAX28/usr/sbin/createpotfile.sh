#!/bin/sh
#<<<PEGA JYang, If older DUT have pot data at /mnt/defaults/, copy it to new partition>>
if [ -f /mnt/defaults/mtd.bin ]; then
	cp /mnt/defaults/mtd.bin /mnt/pot && touch /mnt/pot/createdMTD && sync
	mount -t ubifs ubi:defaults /mnt/defaults -oremount,rw
	rm /mnt/defaults/mtd.bin && sync
	mount -t ubifs ubi:defaults /mnt/defaults -oremount,ro

else
	dd if=/dev/zero ibs=1k count=2048 | tr '\000' '\377' > /mnt/pot/mtd.bin && touch /mnt/pot/createdMTD && sync
fi
