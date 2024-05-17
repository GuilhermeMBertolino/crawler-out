#!/bin/sh

#atheros_driver_init
dev_type=`xmldbc -w /device/layout`

echo "Inserting gpio.ko ..." > /dev/console
insmod /lib/modules/gpio.ko
#[ "$?" = "0" ] && mknod /dev/gpio c 101 0 && echo "done."

echo "Inserting athrs_gmac.ko ..." > /dev/console

if [ "$dev_type" == "router" ]; then 
	insmod /lib/modules/athrs_gmac.ko
else
	insmod /lib/modules/athrs_gmac.ko #alpha_dev_type=0
fi


echo "Inserting rebootm.ko ..." > /dev/console
insmod /lib/modules/rebootm.ko
# UNIX 98 pty
#mknod -m666 /dev/pts/0 c 136 0
#mknod -m666 /dev/pts/1 c 136 1

if [ "$dev_type" == "router" ]; then 

	MACADDR=`devdata get -e wanmac`
	[ "$MACADDR" != "" ] && ip link set eth0 addr $MACADDR

else

	MACADDR=`devdata get -e lanmac`
	[ "$MACADDR" != "" ] && ip link set eth0 addr $MACADDR
fi
