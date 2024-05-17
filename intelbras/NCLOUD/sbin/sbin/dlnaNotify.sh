#!/bin/sh

killall -9 usbnotify.sh  >>/dev/null 2>&1
killall -9 inotifywait >>/dev/null 2>&1

sleep 1
usb_parts=`nvram_get usb_part |tr "?" " "`
dlnaDirNum=`nvram_get 2860 DlnaDir | tr ";" "\n" | wc -l`

if [ $dlnaDirNum -gt 0 ];then
	num=1
	while [ $num -le $dlnaDirNum ];
	do
		partDir=`nvram_get DlnaDir | cut -f$num -d\; | cut -f2 -d\,`
		echo "$partDir"
		usbnotify.sh $partDir &
		num=`expr $num + 1`
	done
fi

		
