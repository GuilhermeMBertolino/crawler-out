#!/bin/sh

echo ">> $0 $1" > /dev/console

# waiting rcd
w=0
while [ ! -e /var/rcd ] && [ $w -lt 30 ]; do
	echo "$0 waiting rcd $w" > /dev/console
	sleep 1
	let w=w+1
done

while [ -f "/tmp/keep_usb_u" ]; do
	echo "Wait USB $1" > /tmp/wait_usb_u_$1
	/usr/sbin/sleep 1
done

if [ -f /tmp/wait_usb_u_$1 ]; then
	rm /tmp/wait_usb_u_$1
fi

echo "keep" > /tmp/keep_usb_u
rm /tmp/sd/$1
/usr/sbin/killall wget_gd
/usr/sbin/rc mediaserver stop
/usr/sbin/rc down_manage stop
/usr/sbin/rc usb_service kumount "$1"

/sbin/sleep 3
rm /tmp/keep_usb_u
/sbin/sleep 2
/usr/sbin/rc mediaserver restart 
