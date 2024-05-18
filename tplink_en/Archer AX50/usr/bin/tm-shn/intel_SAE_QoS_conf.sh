#!/bin/sh
# Copyright (C) 2008-2018 TP-Link
# Author: Han Jiayan <hanjiayan@tp-link.net>
# Date: 14Nov16

[ "$1" != "swfp" -a "$1" != "ifb1" -a "$1" != "setPpaThreshold" -o -z "$2" ] && echo "Usage: intel_SAE_QoS_conf.sh swfp/ifb1/setPpaThreshold enable/disable/threshold." && exit 1

. /lib/functions.sh

cmd="$1"
param="$2"
IFB_IFNAME="ifb1"
LAN_IFNAMES="eth0_1 eth0_2 eth0_3 eth0_4 wlan0 wlan2 wlan0.0 wlan2.0"
WLAN_IFNAMES="wlan0 wlan2 wlan0.0 wlan2.0"

tc_d(){
	#echo "tc $@" > /dev/console
	tc $@
}

enable_redirect_netifs(){
	# no need of this, wlan interface up will get here
	# ifconfig $IFB_IFNAME | grep -Eq 'UP' && return

	echo "redirect lan ifaces($LAN_IFNAMES) to $IFB_IFNAME..." > /dev/console	
    ifconfig $IFB_IFNAME up
	
	for ifc in $LAN_IFNAMES; do
		 tc_d qdisc del dev $ifc root 2>/dev/null
	done
	
	local lan_ifname=`uci get network.lan.ifname`
	for ifc in $lan_ifname; do
		tc_d qdisc add dev $ifc root handle 1: htb
		tc_d filter add dev $ifc parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $IFB_IFNAME
	done
	
	for ifc in $WLAN_IFNAMES; do
		tc_d qdisc add dev $ifc root handle 1: htb
		tc_d filter add dev $ifc parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $IFB_IFNAME
	done	
}

disable_redirect_netifs(){
	echo "Disable lan redirect..." > /dev/console	
	
	tc_d qdisc del dev $IFB_IFNAME root
	for ifc in $LAN_IFNAMES; do
		 tc_d qdisc del dev $ifc root
	done
	ifconfig $IFB_IFNAME down
}

disable_hw_nat(){

	. /lib/functions.sh   
	
	config_load nat  
	config_get hw_enable "nat_global" "hw_enable"
	[ "$hw_enable" = "off" ] && return
	
	$(ppacmd getppefpstatus | grep 'enable' -Eq) || return
	
	echo "Enable the SW acceleration..." > /dev/console	
	# echo disable > /proc/ppa/pae/accel
	# echo disable > /proc/ppa/mpe/accel
	ppacmd setppefp -f 0
	#ppacmd setswfp -f 1
	
	config_ppa
}

enable_hw_nat()
{
	. /lib/functions.sh   
	
	config_load nat  
	config_get hw_enable "nat_global" "hw_enable"
	[ "$hw_enable" = "off" ] && return
	
	$(ppacmd getppefpstatus | grep 'enable' -Eq) && return	
	
	echo "Enable the HW acceleration..." > /dev/console	
	# echo enable > /proc/ppa/pae/accel
	# echo enable > /proc/ppa/mpe/accel
	ppacmd setppefp -f 1
	ppacmd setswfp -f 1
	
	config_ppa	
}

enable_rps(){
	#enable the RPS(Receive Packet Steering) feature, make 3 CPUs handle with the packet forwarding:
	echo 4096 > /sys/class/net/eth0_1/queues/rx-0/rps_flow_cnt  
	# ( 7 is 111, the bitmap of the 3 CPUs)
	echo 7 > /sys/class/net/eth0_1/queues/rx-0/rps_cpus 

	echo 4096 > /sys/class/net/eth0_2/queues/rx-0/rps_flow_cnt  
	echo 7 > /sys/class/net/eth0_2/queues/rx-0/rps_cpus 

	echo 4096 > /sys/class/net/eth0_3/queues/rx-0/rps_flow_cnt  
	echo 7 > /sys/class/net/eth0_3/queues/rx-0/rps_cpus 

	echo 4096 > /sys/class/net/eth0_4/queues/rx-0/rps_flow_cnt  
	echo 7 > /sys/class/net/eth0_4/queues/rx-0/rps_cpus
	 
	echo 4096 > /sys/class/net/wlan0/queues/rx-0/rps_flow_cnt  
	echo 7 > /sys/class/net/wlan0/queues/rx-0/rps_cpus 

	echo 4096 > /sys/class/net/wlan2/queues/rx-0/rps_flow_cnt  
	echo 7 > /sys/class/net/wlan2/queues/rx-0/rps_cpus 

	echo 4096 > /sys/class/net/eth1/queues/rx-0/rps_flow_cnt
	echo 7 > /sys/class/net/eth1/queues/rx-0/rps_cpus

	echo 32768 > /proc/sys/net/core/rps_sock_flow_entries
}

set_ppa_threshold()
{
	local threshold=$1
	local oldThreshold=0
	
	. /lib/functions.sh   
	
	config_load nat  
	config_get hw_enable "nat_global" "hw_enable"
	[ "$hw_enable" = "off" ] && return
	
	[ $threshold -lt 1 -o $threshold -gt 10 ] && threshold=3
	oldThreshold=$(cat /etc/ppa.conf | grep tcp-threshold | awk '{print $2}')
	[ $oldThreshold -eq $threshold ] && return

	lock /var/run/set_ppa_threshold.lck
	echo "Set PPA threshold to $threshold..." > /dev/console	
	ppacmd exit
	echo "tcp-threshold $threshold" > /etc/ppa.conf
	echo "udp-threshold $threshold" >> /etc/ppa.conf
	ppacmd init -f /etc/ppa.conf	
	
	config_ppa
	lock -u /var/run/set_ppa_threshold.lck
}

case "$cmd" in
swfp)

	case "$param" in
	enable)
		disable_hw_nat
		#enable_rps
		;;
	disable)
		enable_hw_nat
		;;
	esac;	

	;;
ifb1)

	case "$param" in
	enable)
		enable_redirect_netifs
		;;
	disable)
		disable_redirect_netifs
		;;
	esac;	
	
	;;
setPpaThreshold)

	set_ppa_threshold $2
	
	;;
esac;
