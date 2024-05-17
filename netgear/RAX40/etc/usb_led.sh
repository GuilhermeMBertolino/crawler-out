#!/bin/sh
# Script to activate of deactivate host mode USB LED's based on disk mount
# This script designed to work only with mountd application

led_f ()
{
	#       echo $2 > /sys/class/leds/usb$1_led/brightness
	echo -e "\033[33m $0 led $2 \033[0m" > /dev/console
	echo $2 > /sys/class/gpio/gpio34/value
}

#20190506 turn on usb led if ledmode is 1(1 is disable blinking LED) and not control USB LED if modelName not match
#USB LED only for RAX40. In RAX35, it's instead of WiFi Guest Network function(and LED) with same GOIP and not be controled by this shell script.
led_mode()
{    
    while [ 1 ]
    do
	sleep 1
	if [ -f /tmp/ledmode.data ]; then
	    led_mode=`cat /tmp/ledmode.data`
	    if [ "$led_mode" == "1" ]; then
		led_f 1 1
	    fi
	    check_mount_device
	    exit 0
	fi
    done
}

update_interfaces_file_USB()
{
    cat /tmp/interfaces.txt | grep USB > /dev/null
    if [ $? != 0 ]; then
    	echo USB=0 >> /tmp/interfaces.txt
    fi
    if [ $1 == 0 ]; then
	sed -i -r 's/USB=.*/USB=0/' /tmp/interfaces.txt > /dev/null
    else
	sed -i -r 's/USB=.*/USB=1/' /tmp/interfaces.txt > /dev/null			
    fi
}

check_mount_device()
{
    mountcount=`ls /mnt/usb/ | wc -l`
    #No Compatible USB device is connected.
    if [ $mountcount == 0 ]; then 
	led_f 1 0
	update_interfaces_file_USB 0
    #USB device has been accepted by the Router 
and is ready to be used.
    else
    	update_interfaces_file_USB 1
    fi
}

check_umount_device()
{
    mountcount=`ls /mnt/usb/ | wc -l`
    if [ $mountcount == 0 ]; then
	led_f 1 0
    fi    
}

if [ ! -f /tmp/USBPortExist ] && [ ! -f /tmp/NoUSBPort ]; then
    if [ -f /tmp/modelName ]; then
	model=`cat /tmp/modelName`
    else
	model=`uboot_env --get --name pega_param3`
    fi
    if [ "$model" == "RAX35" ]; then
	touch /tmp/NoUSBPort
    else
	touch /tmp/USBPortExist
    fi
fi


if [ -f /tmp/NoUSBPort ]; then
    exit 0
fi

if [ "$1" == "" ]; then
    find /sys/block/ -name "sd*" | grep "sd*" > /dev/null
    if [ $? == 0 ]; then
        led_mode &
    else
	led_f 1 0
	update_interfaces_file_USB 0
    fi
else
    check_mount_device
fi
#End of 20190506.
