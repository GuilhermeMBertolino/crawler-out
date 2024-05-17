#!/bin/sh
file="/tmp/chip_temp_dbg.log"
while true
do
	date >> $file
	echo "=================wl -i eth1 phy_tempsense================" >> $file
	wl -i eth1 phy_tempsense >> $file
	echo "=================wl -i eth2 phy_tempsense================" >> $file
	wl -i eth2 phy_tempsense >> $file
	sleep 10
done
