#!/bin/sh
if [ ! -f /mnt/pot/mtd.bin ]; then
	echo 'Generate mtd.bin ing....'
	dd if=/dev/zero ibs=1k count=2048 | tr '\000' '\377' > /mnt/pot/mtd.bin && touch /mnt/pot/createdMTD && sync
fi
