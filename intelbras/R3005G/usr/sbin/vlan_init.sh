#!/bin/sh

# $Id: //WIFI_SOC/release/SDK_4_1_0_0/source/user/rt2880_app/scripts/config-vlan.sh#1 $
#
# usage: config-vlan.sh <switch_type> <vlan_type>
#   switch_type: 0=IC+, 1=vtss
#   vlan_type: 0=no_vlan, 1=vlan, LLLLW=wan_4, WLLLL=wan_0
# 


usage()
{
	echo "Usage:"
	echo "  $0 0 0 - restore IC+ to no VLAN partition"
	echo "  $0 0 LLLLW - config IC+ with VLAN and WAN at port 4"
	echo "  $0 0 WLLLL - config IC+ with VLAN and WAN at port 0"
	echo "  $0 1 0 - restore Vtss to no VLAN partition"
	echo "  $0 1 LLLLW - config Vtss with VLAN and WAN at port 4"
	echo "  $0 1 WLLLL - config Vtss with VLAN and WAN at port 0"
	echo "  $0 2 0 - restore Ralink ESW to no VLAN partition"
	echo "  $0 2 LLLLW - config Ralink ESW with VLAN and WAN at port 4"
	echo "  $0 2 WLLLL - config Ralink ESW with VLAN and WAN at port 0"
	echo "  $0 2 W1234 - config Ralink ESW with VLAN 5 at port 0 and VLAN 1~4 at port 1~4"
	echo "  $0 2 12345 - config Ralink ESW with VLAN 1~5 at port 0~4"
	echo "  $0 2 GW - config Ralink ESW with WAN at Giga port"
	echo "  $0 2 G01234 - config Ralink ESW with VLAN 6 at Giga port, and VLAN 1~5 at port 0~4"
	echo "  $0 3 0 - restore Ralink RT6855/MT7620/MT7621 ESW to no VLAN partition"
	echo "  $0 3 LLLLW - config Ralink RT6855/MT7620/MT7621 ESW with VLAN and WAN at port 4"
	echo "  $0 3 WLLLL - config Ralink RT6855/MT7620/MT7621 ESW with VLAN and WAN at port 0"
	echo "  $0 3 12345 - config Ralink RT6855/MT7620/MT7621 ESW with VLAN 1~5 at port 0~4"
	echo "  $0 3 GW - config Ralink RT6855/MT7620/MT7621 ESW with WAN at Giga port"
	exit 0
}

config175C()
{
	mii_mgr -s -p 29 -r 23 -v 0x07c2
	mii_mgr -s -p 29 -r 22 -v 0x8420

	if [ "$1" = "LLLLW" ]; then
		mii_mgr -s -p 29 -r 24 -v 0x1
		mii_mgr -s -p 29 -r 25 -v 0x1
		mii_mgr -s -p 29 -r 26 -v 0x1
		mii_mgr -s -p 29 -r 27 -v 0x1
		mii_mgr -s -p 29 -r 28 -v 0x2
		mii_mgr -s -p 30 -r 9 -v 0x1089
		if [ "$CONFIG_RALINK_VISTA_BASIC" == "y" ]; then
			mii_mgr -s -p 30 -r 1 -v 0x2f3f
		else
			mii_mgr -s -p 30 -r 1 -v 0x2f00
		fi
		mii_mgr -s -p 30 -r 2 -v 0x0030
	elif [ "$1" = "WLLLL" ]; then
		mii_mgr -s -p 29 -r 24 -v 0x2
		mii_mgr -s -p 29 -r 25 -v 0x1
		mii_mgr -s -p 29 -r 26 -v 0x1
		mii_mgr -s -p 29 -r 27 -v 0x1
		mii_mgr -s -p 29 -r 28 -v 0x1
		mii_mgr -s -p 30 -r 9 -v 0x0189
		if [ "$CONFIG_RALINK_VISTA_BASIC" == "y" ]; then
			mii_mgr -s -p 30 -r 1 -v 0x3e3f
		else
			mii_mgr -s -p 30 -r 1 -v 0x3e00
		fi
		mii_mgr -s -p 30 -r 2 -v 0x0021
	else
		echo "LAN WAN layout $0 is not suported"
	fi
}

restore175C()
{
	mii_mgr -s -p 29 -r 23 -v 0x0
	mii_mgr -s -p 29 -r 22 -v 0x420
	mii_mgr -s -p 29 -r 24 -v 0x1
	mii_mgr -s -p 29 -r 25 -v 0x1
	mii_mgr -s -p 29 -r 26 -v 0x1
	mii_mgr -s -p 29 -r 27 -v 0x1
	mii_mgr -s -p 29 -r 27 -v 0x2
	mii_mgr -s -p 30 -r 9 -v 0x1001
	mii_mgr -s -p 30 -r 1 -v 0x2f3f
	mii_mgr -s -p 30 -r 2 -v 0x3f30
}

restore175D()
{
	mii_mgr -s -p 20 -r  4 -v 0xa000
	mii_mgr -s -p 20 -r 13 -v 0x20
	mii_mgr -s -p 21 -r  1 -v 0x1800
	mii_mgr -s -p 22 -r  0 -v 0x0
	mii_mgr -s -p 22 -r  2 -v 0x0
	mii_mgr -s -p 22 -r 10 -v 0x0
	mii_mgr -s -p 22 -r 14 -v 0x1
	mii_mgr -s -p 22 -r 15 -v 0x2
	mii_mgr -s -p 23 -r  8 -v 0x0
	mii_mgr -s -p 23 -r 16 -v 0x0

	mii_mgr -s -p 22 -r 4 -v 0x1
	mii_mgr -s -p 22 -r 5 -v 0x1
	mii_mgr -s -p 22 -r 6 -v 0x1
	mii_mgr -s -p 22 -r 7 -v 0x1
	mii_mgr -s -p 22 -r 8 -v 0x1
	mii_mgr -s -p 23 -r 0 -v 0x3f3f
}

config175D()
{
	mii_mgr -s -p 20 -r  4 -v 0xa000
	mii_mgr -s -p 20 -r 13 -v 0x21
	mii_mgr -s -p 21 -r  1 -v 0x1800
	mii_mgr -s -p 22 -r  0 -v 0x27ff
	mii_mgr -s -p 22 -r  2 -v 0x20
	mii_mgr -s -p 22 -r  3 -v 0x8100
	mii_mgr -s -p 22 -r 10 -v 0x3
	mii_mgr -s -p 22 -r 14 -v 0x1001
	mii_mgr -s -p 22 -r 15 -v 0x2002
	mii_mgr -s -p 23 -r  8 -v 0x2020
	mii_mgr -s -p 23 -r 16 -v 0x1f1f
	if [ "$1" = "LLLLW" ]; then
		mii_mgr -s -p 22 -r 4 -v 0x1
		mii_mgr -s -p 22 -r 5 -v 0x1
		mii_mgr -s -p 22 -r 6 -v 0x1
		mii_mgr -s -p 22 -r 7 -v 0x1
		mii_mgr -s -p 22 -r 8 -v 0x2
		mii_mgr -s -p 23 -r 0 -v 0x302f
	elif [ "$1" = "WLLLL" ]; then
		mii_mgr -s -p 22 -r 4 -v 0x2
		mii_mgr -s -p 22 -r 5 -v 0x1
		mii_mgr -s -p 22 -r 6 -v 0x1
		mii_mgr -s -p 22 -r 7 -v 0x1
		mii_mgr -s -p 22 -r 8 -v 0x1
		mii_mgr -s -p 23 -r 0 -v 0x213e
	else
		echo "LAN WAN layout $0 is not suported"
	fi
}

# vlan id start from 4081

config6855Esw()
{
	#VLAN Mode bits[1:0]: ports as security mode
	switch reg w 2004 ff0003 #port0
	switch reg w 2104 ff0003 #port1
	switch reg w 2204 ff0003 #port2
	switch reg w 2304 ff0003 #port3
	switch reg w 2404 ff0003 #port4
	switch reg w 2504 ff0003 #port5
	#VLAN Port Attribute bits[7:6]: ports as transparent port
	switch reg w 2010 810000c0 #port0
	switch reg w 2110 810000c0 #port1
	switch reg w 2210 810000c0 #port2
	switch reg w 2310 810000c0 #port3
	switch reg w 2410 810000c0 #port4
	switch reg w 2510 810000c0 #port5
	#set CPU/P7 port as user port
	switch reg w 2610 81000000 #port6
	switch reg w 2710 81000000 #port7

	#bits[29:28]: 0, untag; 2, tag
	switch reg w 2604 20ff0003 #port6, Egress VLAN Tag Attribution=tagged
	switch reg w 2704 20ff0003 #port7, Egress VLAN Tag Attribution=tagged

	if [ "$1" = "LLLLW" ]; then
		#set PVID, bits[11:0]
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF2 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 11110011
		switch vlan set 1 4082 00001011
	elif [ "$1" = "LLLWW" ]; then
		#set PVID
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF2 #port3
		switch reg w 2414 10FF3 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 11100011
		switch vlan set 1 4082 00010011
		switch vlan set 2 4083 00001011
	elif [ "$1" = "LLWWW" ]; then
		#set PVID
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF2 #port2
		switch reg w 2314 10FF3 #port3
		switch reg w 2414 10FF4 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 11000011
		switch vlan set 1 4082 00100011
		switch vlan set 2 4083 00010011
		switch vlan set 3 4084 00001011
	elif [ "$1" = "LWWWW" ]; then
		#set PVID
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF2 #port1
		switch reg w 2214 10FF3 #port2
		switch reg w 2314 10FF4 #port3
		switch reg w 2414 10FF5 #port4
		switch reg w 2514 10FF6 #port5
		#VLAN member port
		switch vlan set 0 4081 10000011
		switch vlan set 1 4082 01000011
		switch vlan set 2 4083 00100011
		switch vlan set 3 4084 00010011
		switch vlan set 4 4085 00001011
	elif [ "$1" = "WLLLL" ]; then 
		#set PVID
		switch reg w 2014 10FF2 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 01111011
		switch vlan set 1 4082 10000011
	elif [ "$1" = "WWLLL" ]; then 
		#set PVID
		switch reg w 2014 10FF3 #port0
		switch reg w 2114 10FF2 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 00111011
		switch vlan set 1 4082 01000011
		switch vlan set 2 4083 10000011
	elif [ "$1" = "WWWLL" ]; then 
		#set PVID
		switch reg w 2014 10FF4 #port0
		switch reg w 2114 10FF3 #port1
		switch reg w 2214 10FF2 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 00011011
		switch vlan set 1 4082 00100011
		switch vlan set 2 4083 01000011
		switch vlan set 3 4084 10000011
	elif [ "$1" = "WWWWL" ]; then 
		#set PVID
		switch reg w 2014 10FF5 #port0
		switch reg w 2114 10FF4 #port1
		switch reg w 2214 10FF3 #port2
		switch reg w 2314 10FF2 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF6 #port5
		#VLAN member port
		switch vlan set 0 4081 00001011
		switch vlan set 1 4082 00010011
		switch vlan set 2 4083 00100011
		switch vlan set 3 4084 01000011
		switch vlan set 4 4085 10000011
	elif [ "$1" = "54321" ]; then
		echo "54321"
		#set PVID
		switch reg w 2014 10FF5 #port0
		switch reg w 2114 10FF4 #port1
		switch reg w 2214 10FF3 #port2
		switch reg w 2314 10FF2 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF6 #port5
		#VLAN member port
		switch vlan set 0 4081 00001011
		switch vlan set 1 4082 00010011
		switch vlan set 2 4083 00100011
		switch vlan set 3 4084 01000011
		switch vlan set 4 4085 10000011
		switch vlan set 5 4086 00000111
	elif [ "$1" = "12345" ]; then
		echo "12345"
		#set PVID
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF2 #port1
		switch reg w 2214 10FF3 #port2
		switch reg w 2314 10FF4 #port3
		switch reg w 2414 10FF5 #port4
		switch reg w 2514 10FF6 #port5
		#VLAN member port
		switch vlan set 0 4081 10000011
		switch vlan set 1 4082 01000011
		switch vlan set 2 4083 00100011
		switch vlan set 3 4084 00010011
		switch vlan set 4 4085 00001011
		switch vlan set 5 4086 00000111
	elif [ "$1" = "GW" ]; then
		echo "GW"
		#set PVID
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF2 #port5
		#VLAN member port
		switch vlan set 0 4081 11111011
		switch vlan set 1 4082 00000111
	elif [ "$1" = "P54" ]; then
		switch reg w 2414 10FF2 #port4
		switch reg w 2514 10FF1 #port5
		#VLAN member port
		switch vlan set 0 4081 00000111
		switch vlan set 1 4082 00001011
	elif [ "$1" = "P45" ]; then
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF2 #port5
		#VLAN member port
		switch vlan set 0 4081 00001011
		switch vlan set 1 4082 00000111
	elif [ "$1" = "P12345" ]; then 
        switch reg w 2014 10FF1 #port0
        switch reg w 2114 10FF1 #port1
        switch reg w 2214 10FF1 #port2
        switch reg w 2314 10FF1 #port3
        switch reg w 2414 10FF1 #port4
        switch reg w 2514 10FF1 #port5
        #VLAN member port
        switch vlan set 0 4081 11111111
	elif [ "$1" = "P234" ]; then
		# LAN: port3, port4; WAN: port2
		switch reg w 2014 10FF1
		switch reg w 2114 10FF1
		switch reg w 2214 10FF2 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF1 #port4
		switch reg w 2514 10FF1
		switch vlan set 0 4081 00011011
		switch vlan set 1 4082 00100011
	elif [ "$1" = "234" ]; then
		# LAN: port3, port4; WAN: port2
		switch reg w 2014 10FF1
		switch reg w 2114 10FF1
		switch reg w 2214 10FF3 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF2 #port4
		switch reg w 2514 10FF1
		switch vlan set 0 4081 00010011
		switch vlan set 1 4082 00001011
		switch vlan set 2 4083 00100011
	elif [ "$1" = "P123" ]; then
		# LAN: port2, port3; WAN: port1
		switch reg w 2014 10FF1
		switch reg w 2114 10FF2 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1 #port3
		switch reg w 2414 10FF1
		switch reg w 2514 10FF1
		switch vlan set 0 4081 00110011
		switch vlan set 1 4082 01000011
	elif [ "$1" = "P01" ]; then
		# LAN: port0; WAN: port1
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF2 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1
		switch reg w 2414 10FF1
		switch reg w 2514 10FF1
		switch vlan set 0 4081 10000011
		switch vlan set 1 4082 01000011
	elif [ "$1" = "P12" ]; then
		# LAN: port1; WAN: port2
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF2 #port2
		switch reg w 2314 10FF1
		switch reg w 2414 10FF1
		switch reg w 2514 10FF1
		switch vlan set 0 4081 01000011
		switch vlan set 1 4082 00100011
	elif [ "$1" = "P02" ]; then
		# LAN: port0; WAN: port2
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF2 #port2
		switch reg w 2314 10FF1
		switch reg w 2414 10FF1
		switch reg w 2514 10FF1
		switch vlan set 0 4081 10000011
		switch vlan set 1 4082 00100011
	elif [ "$1" = "P14" ]; then
		# LAN: port4; WAN: port1
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF2 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF1
		switch reg w 2414 10FF1
		switch reg w 2514 10FF1
		switch vlan set 0 4081 00001011
		switch vlan set 1 4082 01000011
	elif [ "$1" = "P34" ]; then
		# LAN: port4; WAN: port3
		switch reg w 2014 10FF1 #port0
		switch reg w 2114 10FF1 #port1
		switch reg w 2214 10FF1 #port2
		switch reg w 2314 10FF2
		switch reg w 2414 10FF1
		switch reg w 2514 10FF1
		switch vlan set 0 4081 00001011
		switch vlan set 1 4082 00010011
	fi


	#clear mac table if vlan configuration changed
	switch clear
}

configEsw()
{
	switch reg w 14 405555
	switch reg w 50 2001
	switch reg w 98 7f3f
if [ "$CONFIG_RAETH_SPECIAL_TAG" == "y" ]; then
	switch reg w e4 40043f  
else
	switch reg w e4 3f
fi

	if [ "$1" = "LLLLW" ]; then
		if [ "$CONFIG_RAETH_SPECIAL_TAG" == "y" ]; then
		switch reg w 40 7007
		switch reg w 44 7007
		switch reg w 48 7008
		switch reg w 70 48444241
		switch reg w 74 50ef6050
		else
		switch reg w 40 1001
		switch reg w 44 1001
		switch reg w 48 1002
		switch reg w 70 ffff506f
		fi
	elif [ "$1" = "WLLLL" ]; then
		if [ "$CONFIG_RAETH_SPECIAL_TAG" == "y" ]; then
		switch reg w 40 7008
		switch reg w 44 7007
		switch reg w 48 7007
		switch reg w 70 48444241
		switch reg w 74 41fe6050
		else
		switch reg w 40 1002
		switch reg w 44 1001
		switch reg w 48 1001
		switch reg w 70 ffff417e
		fi
	elif [ "$1" = "W1234" ]; then
		switch reg w 40 1005
		switch reg w 44 3002
		switch reg w 48 1004
		switch reg w 70 50484442
		switch reg w 74 ffffff41
	elif [ "$1" = "12345" ]; then
		switch reg w 40 2001
		switch reg w 44 4003
		switch reg w 48 1005
		switch reg w 70 48444241
		switch reg w 74 ffffff50
	elif [ "$1" = "GW" ]; then
		switch reg w 40 1001
		switch reg w 44 1001
		switch reg w 48 2001
		switch reg w 70 ffff605f
	elif [ "$1" = "G01234" ]; then
		switch reg w 40 2001
		switch reg w 44 4003
		switch reg w 48 6005
		switch reg w 70 48444241
		switch reg w 74 ffff6050
	fi

	#clear mac table if vlan configuration changed
	switch clear
}

restore6855Esw()
{
	echo "restore RT6855 ESW to dump switch mode"
	wys turn_phy off
	#port matrix mode
	switch reg w 2004 ff0000 #port0
	switch reg w 2104 ff0000 #port1
	switch reg w 2204 ff0000 #port2
	switch reg w 2304 ff0000 #port3
	switch reg w 2404 ff0000 #port4
	switch reg w 2504 ff0000 #port5
	switch reg w 2604 ff0000 #port6
	switch reg w 2704 ff0000 #port7

	#LAN/WAN ports as transparent mode
	switch reg w 2010 810000c0 #port0
	switch reg w 2110 810000c0 #port1
	switch reg w 2210 810000c0 #port2
	switch reg w 2310 810000c0 #port3
	switch reg w 2410 810000c0 #port4
	switch reg w 2510 810000c0 #port5
	switch reg w 2610 810000c0 #port6
	switch reg w 2710 810000c0 #port7
	
	#clear pvid
	switch reg w 2014 10000 #port0
	switch reg w 2114 10000 #port1
	switch reg w 2214 10000 #port2
	switch reg w 2314 10000 #port3
	switch reg w 2414 10000 #port4
	switch reg w 2514 10000 #port5
	
	#clear vlan
	eth_dev=`cat /proc/net/dev | grep "bond_" | awk -F':' '{printf "%s\n",$1}'`	
	for dev in $eth_dev; do
		ifconfig $dev down
		echo -$dev >/sys/class/net/bonding_masters
	done
	
	eth_dev=`cat /proc/net/dev | grep "eth2\."| awk -F':' '{printf "%s\n",$1}'`	
	for dev in $eth_dev; do
		ifconfig $dev down
		
		result=$(echo $dev | grep "\." | grep -v "_")
		if [[ "$result" != "" ]]; then
			vconfig rem $dev
			vlanid=`echo $dev | awk -F '.' '{printf $2}'`
			switch vlan set 0 $vlanid 00000000
		fi
	done
	
	eth_dev=`cat /proc/net/dev | grep "eth3\."| awk -F':' '{printf "%s\n",$1}'`	
	for dev in $eth_dev; do
		ifconfig $dev down
		result=$(echo $dev | grep "\." | grep -v "_")
		if [[ "$result" != "" ]]; then
			vconfig rem $dev
		fi
	done
	
	#clear mac table if vlan configuration changed
	switch clear

	wys turn_phy on
}

restoreEsw()
{
	switch reg w 14 5555
	switch reg w 40 1001
	switch reg w 44 1001
	switch reg w 48 1001
	switch reg w 4c 1
	switch reg w 50 2001
	switch reg w 70 ffffffff
	switch reg w 98 7f7f
	switch reg w e4 7f
	
	#clear mac table if vlan configuration changed
	switch clear
}

vtss_cpu()
{
	vreg=`spicmd vtss read 7 0 10 | sed -e 's/.*> //'`
	pre=`echo $vreg | sed -e 's/\(.*\)[0-9a-f]/\1/'`
	hex=`echo $vreg | sed -e 's/.*\([0-9a-f]\)/\1/'`

	# 0 -> disable clock (bit 1)
	# 1 -> enable clock (bit 1)
	# 2 -> soft reset (bit 0)
	if [ "$1" = "0" ]; then
		case $hex in
			"2")	rep="0"	;;
			"3")	rep="1"	;;
			"6")	rep="4"	;;
			"7")	rep="5"	;;
			"a")	rep="8"	;;
			"b")	rep="9"	;;
			"e")	rep="c"	;;
			"f")	rep="d"	;;
			*)	return;;
		esac
		new=$pre$rep
		spicmd vtss write 7 0 10 $new > /dev/null
	elif [ "$1" = "1" ]; then
		case $hex in
			"0")	rep="2"	;;
			"1")	rep="3"	;;
			"4")	rep="6"	;;
			"5")	rep="7"	;;
			"8")	rep="a"	;;
			"9")	rep="b"	;;
			"c")	rep="e"	;;
			"d")	rep="f"	;;
			*)	return;;
		esac
		new=$pre$rep
		spicmd vtss write 7 0 10 $new > /dev/null
	elif [ "$1" = "2" ]; then
		case $hex in
			"1")	rep="0";;
			"3")	rep="2";;
			"5")	rep="4";;
			"7")	rep="6";;
			"9")	rep="8";;
			"b")	rep="a";;
			"d")	rep="c";;
			"f")	rep="e";;
			*)	return;;
		esac
		new=$pre$rep
		spicmd vtss write 7 0 10 $new > /dev/null
		spicmd vtss write 7 0 10 $vreg > /dev/null
	fi
}

vtss_power_save()
{
	# turn on ActiPHY feature (PHY_AUX_CTRL_STAT bit 6) for power saving
	for i in 0 1 2 3 4; do
		x=`expr $i \* 2 + 1`
		spicmd vtss write 3 0 1 4${x}c0000 /dev/null > /dev/null
		vreg=`spicmd vtss read 3 0 2 | sed -e 's/.*> //'`
		h1=`echo $vreg | sed -e 's/.//'`
		h2=`echo $vreg | sed -e 's/..//'`
		h3=`echo $vreg | sed -e 's/...//'`
		h4=`echo $vreg | sed -e 's/....//'`
		if [ "$h1" = "" ]; then
			spicmd vtss write 3 0 1 ${x}c004$vreg > /dev/null
		elif [ "$h2" = "" ]; then
			hex=`echo $vreg | sed -e 's/\(.\)./\1/'`
			post=`echo $vreg | sed -e 's/.\(.\)/\1/'`
			case $hex in
				"0")	rep="4";;
				"1")	rep="5";;
				"2")	rep="6";;
				"3")	rep="7";;
				"8")	rep="c";;
				"9")	rep="d";;
				"a")	rep="e";;
				"b")	rep="f";;
				*)	return;;
			esac
			spicmd vtss write 3 0 1 ${x}c00$rep$post > /dev/null
		elif [ "$h3" = "" ]; then
			pre=`echo $vreg | sed -e 's/\(.\)../\1/'`
			hex=`echo $vreg | sed -e 's/.\(.\)./\1/'`
			post=`echo $vreg | sed -e 's/..\(.\)/\1/'`
			case $hex in
				"0")	rep="4";;
				"1")	rep="5";;
				"2")	rep="6";;
				"3")	rep="7";;
				"8")	rep="c";;
				"9")	rep="d";;
				"a")	rep="e";;
				"b")	rep="f";;
				*)	return;;
			esac
			spicmd vtss write 3 0 1 ${x}c0$pre$rep$post > /dev/null
		elif [ "$h4" = "" ]; then
			pre=`echo $vreg | sed -e 's/\(..\)../\1/'`
			hex=`echo $vreg | sed -e 's/..\(.\)./\1/'`
			post=`echo $vreg | sed -e 's/...\(.\)/\1/'`
			case $hex in
				"0")	rep="4";;
				"1")	rep="5";;
				"2")	rep="6";;
				"3")	rep="7";;
				"8")	rep="c";;
				"9")	rep="d";;
				"a")	rep="e";;
				"b")	rep="f";;
				*)	return;;
			esac
			spicmd vtss write 3 0 1 ${x}c0$pre$rep$post > /dev/null
		fi
	done
}

if [ "$1" = "0" ]; then
	restore6855Esw
elif [ "$1" = "reset" ]; then
	restore6855Esw
elif [ "$1" = "L12345" ]; then
	restore6855Esw
	ifconfig eth2 up
elif [ "$1" = "L1234" ]; then
	ifconfig eth2 up
	config6855Esw LLLLW
	vconfig add eth2 4081
	vconfig add eth2 4082

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "L123" ]; then
	ifconfig eth2 up
	config6855Esw LLLWW
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
elif [ "$1" = "L12" ]; then
	ifconfig eth2 up
	config6855Esw LLWWW
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	vconfig add eth2 4084

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
	ifconfig eth2.4084 up
elif [ "$1" = "L1" ]; then
	ifconfig eth2 up
	config6855Esw LWWWW
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	vconfig add eth2 4084
	vconfig add eth2 4085

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
	ifconfig eth2.4084 up
	ifconfig eth2.4085 up
elif [ "$1" = "WLLLL" ]; then
	ifconfig eth2 up
	config6855Esw WLLLL
	vconfig add eth2 4081
	vconfig add eth2 4082

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "WWLLL" ]; then
	ifconfig eth2 up
	config6855Esw WWLLL
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
elif [ "$1" = "WWWLL" ]; then
	ifconfig eth2 up
	config6855Esw WWWLL
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	vconfig add eth2 4084

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
	ifconfig eth2.4084 up
elif [ "$1" = "WWWWL" ]; then
	ifconfig eth2 up
	config6855Esw WWWWL
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	vconfig add eth2 4084
	vconfig add eth2 4085

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
	ifconfig eth2.4084 up
	ifconfig eth2.4085 up
elif [ "$1" = "54321" ]; then
	ifconfig eth2 up
	config6855Esw 54321
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	vconfig add eth2 4084
	vconfig add eth2 4085

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
	ifconfig eth2.4084 up
	ifconfig eth2.4085 up
elif [ "$1" = "12345" ]; then
	ifconfig eth2 up
	config6855Esw 12345
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	vconfig add eth2 4084
	vconfig add eth2 4085

	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
	ifconfig eth2.4084 up
	ifconfig eth2.4085 up
elif [ "$1" = "GW" ]; then
	config6855Esw GW
elif [ "$1" = "P54" ]; then
	config6855Esw P54
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2 up
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P45" ]; then
	config6855Esw P45
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2 up
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P12345" ]; then
	ifconfig eth2 up
	config6855Esw P12345
	vconfig add eth2 4081
	ifconfig eth2.4081 up
elif [ "$1" = "P234" ]; then
	ifconfig eth2 up
	config6855Esw P234
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "234" ]; then
	ifconfig eth2 up
	config6855Esw 234
	vconfig add eth2 4081
	vconfig add eth2 4082
	vconfig add eth2 4083
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
	ifconfig eth2.4083 up
elif [ "$1" = "P123" ]; then
	ifconfig eth2 up
	config6855Esw P123
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P01" ]; then
	ifconfig eth2 up
	config6855Esw P01
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P12" ]; then
	ifconfig eth2 up
	config6855Esw P12
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P02" ]; then
	ifconfig eth2 up
	config6855Esw P02
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P14" ]; then
	ifconfig eth2 up
	config6855Esw P14
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
elif [ "$1" = "P34" ]; then
	ifconfig eth2 up
	config6855Esw P34
	vconfig add eth2 4081
	vconfig add eth2 4082
	ifconfig eth2.4081 up
	ifconfig eth2.4082 up
else
	echo "unknown vlan type $1"
	echo ""
	usage $0
fi

if [ $# -ge 2 ]; then
if [ $2 -eq 1 ]; then
	switch reg w 2010 81000000 #port0
	switch reg w 2110 81000000 #port1
	switch reg w 2210 81000000 #port2
	switch reg w 2310 81000000 #port3
	switch reg w 2410 81000000 #port4
	switch reg w 2510 81000000 #port5
fi
fi



