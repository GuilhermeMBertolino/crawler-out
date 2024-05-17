#!/bin/sh
echo "=============S36 Check wl_nand_manufacturer!"

if [ -f /proc/nvram/wl_nand_manufacturer ]; then
	is_mfg=`cat /proc/nvram/wl_nand_manufacturer`
	echo "=====================is_mfg= $is_mfg"
fi
