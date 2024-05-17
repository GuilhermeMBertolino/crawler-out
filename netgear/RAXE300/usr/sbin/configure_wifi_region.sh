#!/bin/sh

if [ "$#" -ne 1 ]; then
	exit
fi

if [ "$1" != "NA" ] && [ "$1" != "WW" ] && [ "$1" != "AP" ]; then
	exit
fi

if [ "$1" == "NA" ]; then
	echo "region_no=0x0001" > /proc/nvram/set
	echo "sku=NA" > /proc/nvram/set
elif [ "$1" == "WW" ]; then
	echo "region_no=0x0002" > /proc/nvram/set
	echo "sku=WW" > /proc/nvram/set
elif [ "$1" == "AP" ]; then
	echo "region_no=0x000E" > /proc/nvram/set
	echo "sku=AP" > /proc/nvram/set
fi

sleep 1

restoredefault
