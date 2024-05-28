#!/bin/sh

#wangxiaolong@tp-link.com.cn
#2021-07-09
#Add for BCM43684 chip defect in High speed mode

TRI_BAND="n"

HIGH_WATER_TEMP="45"
MIDLLE_WATER_TEMP="35"
LOW_WATER_TEMP="25"

LOOP_INTERVAL="60"

DEBUG=1

#Do not change
STDOUT="/dev/null"
[ -n "${DEBUG}" ] && STDOUT="/dev/console"

WL_IFNAMES_TRI="eth6 eth7 eth8"
WL_IFNAMES_DUAL="eth6 eth7"

BEYOND_HIGH_eth6="n"
BEYOND_MIDLLE_eth6="n"
BEYOND_LOWER_eth6="n"

BEYOND_HIGH_eth7="n"
BEYOND_MIDLLE_eth7="n"
BEYOND_LOWER_eth7="n"

BEYOND_HIGH_eth8="n"
BEYOND_MIDLLE_eth8="n"
BEYOND_LOWER_eth8="n"

#wl() {
#	[ -n "${DEBUG}" ] && echo wl "$@" >  $STDOUT
#	$WL "$@"
#}

wifi_get_temp() {
	local chip_temp="0"
	
	chip_temp=`wl -i $1 avs_temp`
	
	if [ $? != 0 ]; then
		chip_temp="0"
	else
		chip_temp=`echo $chip_temp | cut -d' ' -f1`
		chip_temp=`expr $chip_temp / 1000`
	fi
	
	echo $chip_temp
}

wifi_do_phy_forcecal() {
	local chip_temp="0"
	local BEYOND_HIGH="n"
	local BEYOND_MIDLLE="n"
	local BEYOND_LOWER="n"
	local WL_IFNAMES=$WL_IFNAMES_DUAL

	if [ "$TRI_BAND" = "y" ]; then
		WL_IFNAMES=$WL_IFNAMES_TRI
	fi

	for ifname in ${WL_IFNAMES}; do
		eval BEYOND_HIGH="\${BEYOND_HIGH_$ifname}"
		eval BEYOND_MIDLLE="\${BEYOND_MIDLLE_$ifname}"
		eval BEYOND_LOWER="\${BEYOND_LOWER_$ifname}"
		
		echo "debug.wxl ${ifname} BEYOND_HIGH=${BEYOND_HIGH}" >  $STDOUT 
		echo "debug.wxl ${ifname} BEYOND_MIDLLE=${BEYOND_MIDLLE}" >  $STDOUT 
		echo "debug.wxl ${ifname} BEYOND_LOWER=${BEYOND_LOWER}" >  $STDOUT 
		
		chip_temp=`wifi_get_temp $ifname`
		
		echo "debug.wxl ${ifname} chip_temp=${chip_temp}" >  $STDOUT 
		
		if [ $BEYOND_HIGH = "y" ]; then
			echo "debug.wxl temp already BEYOND_HIGH" >  $STDOUT
		else
			if [ $BEYOND_MIDLLE = "y" ]; then
				echo "debug.wxl temp already BEYOND_MIDLLE" >  $STDOUT
				
				if [ $chip_temp -ge $HIGH_WATER_TEMP ]; then
					eval "BEYOND_HIGH_$ifname"="y"
					echo "debug.wxl temp reach HIGH_WATER_TEMP" >  $STDOUT
					echo "debug.wxl ${ifname} do phy_forcecal 1" >  $STDOUT
					wl -i $ifname phy_forcecal 1
				fi
			else
				if [ $BEYOND_LOWER = "y" ]; then
					echo "debug.wxl temp already BEYOND_LOWER" >  $STDOUT
					
					if [ $chip_temp -ge $HIGH_WATER_TEMP ]; then
						eval "BEYOND_HIGH_$ifname"="y"
						echo "debug.wxl temp reach HIGH_WATER_TEMP" >  $STDOUT
						echo "debug.wxl ${ifname} do phy_forcecal 1" >  $STDOUT
						wl -i $ifname phy_forcecal 1
					elif [ $chip_temp -ge $MIDLLE_WATER_TEMP ]; then
						eval "BEYOND_MIDLLE_$ifname"="y"
						echo "debug.wxl temp reach MIDLLE_WATER_TEMP" >  $STDOUT
						echo "debug.wxl ${ifname} do phy_forcecal 1" >  $STDOUT
						wl -i $ifname phy_forcecal 1
					fi
				else
					echo "debug.wxl temp already BEYOND_NONE" >  $STDOUT
					
					if [ $chip_temp -ge $HIGH_WATER_TEMP ]; then
						eval "BEYOND_HIGH_$ifname"="y"
						echo "debug.wxl temp reach HIGH_WATER_TEMP" >  $STDOUT
						echo "debug.wxl ${ifname} do phy_forcecal 1" >  $STDOUT
						wl -i $ifname phy_forcecal 1
					elif [ $chip_temp -ge $MIDLLE_WATER_TEMP ]; then
						eval "BEYOND_MIDLLE_$ifname"="y"
						echo "debug.wxl temp reach MIDLLE_WATER_TEMP" >  $STDOUT
						echo "debug.wxl ${ifname} do phy_forcecal 1" >  $STDOUT
						wl -i $ifname phy_forcecal 1
					elif [ $chip_temp -ge $LOW_WATER_TEMP ]; then
						eval "BEYOND_LOWER_$ifname"="y"
						echo "debug.wxl temp reach LOW_WATER_TEMP" >  $STDOUT
						echo "debug.wxl ${ifname} do phy_forcecal 1" >  $STDOUT
						wl -i $ifname phy_forcecal 1
					fi
				fi
			fi
		fi		
	done
}

wifi_main_loop() {
	echo "debug.wxl check_phy_forcecal start tri_band=${TRI_BAND}" >  $STDOUT
	echo "debug.wxl check_phy_forcecal HIGH_WATER_TEMP=$HIGH_WATER_TEMP" >  $STDOUT
	echo "debug.wxl check_phy_forcecal MIDLLE_WATER_TEMP=$MIDLLE_WATER_TEMP" >  $STDOUT
	echo "debug.wxl check_phy_forcecal LOW_WATER_TEMP=$LOW_WATER_TEMP" >  $STDOUT
	
	
	while true
	do
		if [ "$TRI_BAND" = "y" ];then 
			if [ "$BEYOND_HIGH_eth6" = "y" -a "$BEYOND_HIGH_eth7" = "y" -a "$BEYOND_HIGH_eth8" = "y" ]; then
				echo "debug.wxl all reach HIGH" >  $STDOUT
				echo "debug.wxl check_phy_forcecal exit" >  $STDOUT
				exit 0
			fi
		else
			if [ "$BEYOND_HIGH_eth6" = "y" -a "$BEYOND_HIGH_eth7" = "y" ]; then
				echo "debug.wxl all reach HIGH" >  $STDOUT
				echo "debug.wxl check_phy_forcecal exit" >  $STDOUT
				exit 0
			fi
		fi

		wifi_do_phy_forcecal
		
		sleep $LOOP_INTERVAL
		
		echo "-----------------------------" >  $STDOUT
	done
}

wifi_main_loop