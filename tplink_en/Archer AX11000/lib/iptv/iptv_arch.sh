
# Copyright (C) 2011-2014 TP-LINK

#### Notice: global variable defined in this file can't be changed

#
# vlan id generation method type
# 0 : generate nothing(initial value)
# 1 : generate single vlan tag automaticly
# 2 : generate dual vlan tag automaticly
# 3 : generate in specific way
# 
gen_vid_mode=1

#
# wan interface vlan id generation method type
# 0 : generate nothing for internet tag off mode
# 1 : generate internet vlan interface for internet tag off mode
# 
gen_wan_vid_mode=1

#
# disable vlan id conflict with iptv wan vids set when gen_vid_mode is 1/2/3
# 0 : not to solve conflict vid generated
# 1 : need to solve conflict vid generated(initial value)
#
disable_conflict=1

#
# specific vlan id sequence to lan port which effect when gen_vid_mode is 3 or 4
# initial value is none
#
specific_lan_vid=""

#
# specific tx vlan id sequence to lan port which effect when gen_vid_mode is 4
# initial value is none
#
specific_lan_txvid=""

#
# Wan default vid
# initial value is 0
#
WAN_DFT_ID="0"

#VLAN setting API
is_switch_vlan_config_finish()
{
	local loop=14
	local str=0
	local val=0
	local hexVal=0
	while true
	do
		str=$(switch reg r 0x90)
		val=0x${str#*value=}
		hexVal=$((val&0x80000000))
		if [ $hexVal -eq 0 ]; then
			break
		fi
		if [ $loop -lt 0 ]; then
			echo "Time out for waiting vlan config finished..."
			break
		fi
		loop=$((loop--))
		sleep 0.1
	done
}

clear_switch_vlan()
{
	local vids=$(uci_get_state switch core sw_vlan_list)
	append vids 1
	append vids 2
	for vid in $vids
	do
		switch reg w 0x90 $(printf %x $((0x80002000|vid))) > /dev/null	#VTCR
	done
}

#new arch VLAN setting
#1 VID
#2 member
#3 tag
#4 CPU
set_switch_vlan()
{
	echo "0000000 vid=$1 mem=$2 tag=$3 cpu=$4"
	local vid="$1"
	local member="$2"
	local memberMask=0
	local tagged="$3"
	local taggedMask=0
	local cpu="$4"
	
	local portReg=0x2004
	local pvcReg=0x2010
	local pvidReg=0x2014
	local port=0
	
	[ "$vid" -gt 0 ] || return
	
	#set mode & pvid
	for port in $member; do
		if [ "$tagged" == "on" ]; then
			switch reg w 0x$(printf %x $((portReg|port<<8))) 0x20ff0003 > /dev/null
			switch reg w 0x$(printf %x $((pvcReg|port<<8))) 0x81000000 > /dev/null
			taggedMask=$((taggedMask|(2<<(port*2))))
		else
			switch reg w 0x$(printf %x $((portReg|port<<8))) 0xff0003 > /dev/null
			switch reg w 0x$(printf %x $((pvcReg|port<<8))) 0x810000c0 > /dev/null
			switch reg w 0x$(printf %x $((pvidReg|port<<8))) 0x$(printf %x $((0x10000|vid))) > /dev/null
		fi
		memberMask=$((memberMask|(1<<$port)))
	done
	
	if [ "$cpu" -eq 1 ]; then
		for port in ${CPU1_PHY_PORT_SET}; do
			memberMask=$((memberMask|(1<<$port)))
			switch reg w 0x$(printf %x $((portReg|port<<8))) 0x20ff0003 > /dev/null
			switch reg w 0x$(printf %x $((pvcReg|port<<8))) 0x81000000 > /dev/null
		done
	elif [ "$cpu" -eq 2 ]; then
		for port in ${CPU2_PHY_PORT_SET}; do
			memberMask=$((memberMask|(1<<$port)))
			switch reg w 0x$(printf %x $((portReg|port<<8))) 0x20ff0003 > /dev/null
			switch reg w 0x$(printf %x $((pvcReg|port<<8))) 0x81000000 > /dev/null
		done
	fi
	
	echo "1111111 memberMask=$memberMask taggedMask=$taggedMask"
	
	#set vlan
	switch reg w 0x94 0x$(printf %x $((0x50000001|($memberMask<<16)))) > /dev/null	#VAWD1
	switch reg w 0x98 0x$(printf %x $((0x2800|taggedMask))) > /dev/null				#VAWD2
	switch reg w 0x90 0x$(printf %x $((0x80001000|vid))) > /dev/null				#VTCR
	is_switch_vlan_config_finish
}
