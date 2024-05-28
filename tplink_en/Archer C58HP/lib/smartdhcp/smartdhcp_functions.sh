#!/bin/sh /etc/rc.common
# Copyright (c) 2016 Shenzhen TP-LINK Technologies Co.Ltd.
# Author  : Sharon Lin <sharon.lin@tp-link.com>
# Date    : 3 Mar 2016

. /lib/functions.sh
. /lib/config/uci.sh
. /lib/domain_login/domain_login_core.sh

SMARTDHCP_DNS_FILE="/tmp/smartdhcp_dns"
SMARTDHCP_STATUS_FILE="/tmp/smartdhcp_current_status"

smartdhcp_debug_print() {
	local debug=$(uci_get dhcp smartdhcp debug)
	if [ "$debug" == "enable" ]
	then 
		local debugfile=$(uci_get dhcp smartdhcp debugfile)
		[ -e $debugfile ] && echo "@@@@ [smartdhcp debug]: $1" > $debugfile
	fi
	return
} 

config_dns(){
	local dnses=$(cat $SMARTDHCP_DNS_FILE)
	if [ -n "$dnses" ]
	then
		echo "" >  /tmp/resolv.conf
		for dns in $dnses; do
			smartdhcp_debug_print "echo \"nameserver $dns\" >> /tmp/resolv.conf"
			echo "nameserver $dns" >> /tmp/resolv.conf	
		done
		echo "nameserver 127.0.0.1" >> /tmp/resolv.conf
		# add rotate options to avoid multi dns not work
		echo "options rotate" >> /tmp/resolv.conf
		echo "options timeout:3" >> /tmp/resolv.conf
	else
		deconfig_dns
	fi
}	

deconfig_dns(){
	local gateway=$(uci_get network lan gateway)
	if [ -n "$gateway" ]
	then
		smartdhcp_debug_print "echo \"nameserver $gateway\" > /tmp/resolv.conf"
		echo "nameserver $gateway" > /tmp/resolv.conf
	else
		smartdhcp_debug_print "echo \"nameserver 127.0.0.1\" > /tmp/resolv.conf"
		echo "nameserver 127.0.0.1" > /tmp/resolv.conf
	fi
}

deconfig_gw(){
	local ifname=$1
	local result=$(route -n| grep $ifname|grep UG|grep 1 |wc -l)
	if [ $result -ge 1 ]
	then
		smartdhcp_debug_print "/sbin/route del default metric 1 dev $ifname"
		/sbin/route del default metric 1 dev $ifname
	fi

}


config_gw(){
	local ifname=$1
	local router=$2
	if [ -n "$router" ]
	then
		deconfig_gw $ifname
		smartdhcp_debug_print "/sbin/route add default gw $router metric 1 dev $interface"
		/sbin/route add default gw $router metric 1 dev $interface
	fi
}

setup_ipalias() {
	local interface=$1
	local ip=$2
	local router=$3
	local subnet=$4
	local mask=$5
	local dnses=$(cat $SMARTDHCP_DNS_FILE)
	local proto=$(uci_get network lan proto)
	if [ "$proto" == "static" ]
	then
		smartdhcp_debug_print "/sbin/ifconfig $interface $ip netmask $subnet"
		/sbin/ifconfig $interface $ip netmask $subnet
		config_gw $interface $router
		smartdhcp_debug_print "set newip=$ip domain_login"
		dlogin_iface_event "lan" "$ip"
		# save alias ip informations
		uci_add dhcp smartdhcp smartdhcpinfo 
		uci_set dhcp smartdhcpinfo remotedhcps "existed"
		uci_set dhcp smartdhcpinfo aliasip "$ip"
		uci_set dhcp smartdhcpinfo aliasdns "$dnses"
		uci_set dhcp smartdhcpinfo aliasgw "$router"	
		uci_set dhcp smartdhcpinfo aliassubnet "$subnet"
		uci_set dhcp smartdhcpinfo aliasmask "$mask"
		uci_commit
	fi
}

deconfig_ipalias() {
	local interface=$1
	local proto=$(uci_get network lan proto)
	deconfig_gw $interface
	deconfig_dns
	if [ "$proto" == "static" ]
	then
		local staticip=$(uci_get network lan ipaddr)
		local netmask=$(uci_get network lan netmask)
		local gateway=$(uci_get network lan gateway)
		smartdhcp_debug_print "/sbin/ifconfig $interface $staticip netmask $netmask"
		/sbin/ifconfig $interface $staticip netmask $netmask
		smartdhcp_debug_print "set staticip=$staticip into domain_login"
		dlogin_iface_event "lan" "$staticip"
		config_gw $interface $gateway
	fi

	# remove alias ip informations
	smartdhcp_debug_print "uci del dhcp.smartdhcpinfo"
	uci_remove dhcp smartdhcpinfo
	uci_commit
}

stop_lan_dhcps() {
        smartdhcp_debug_print  "stop lan dhcp server"
		uci_set dhcp lan ignore 1
        uci_commit
        /etc/init.d/dnsmasq reload
	return
}

start_lan_dhcps() {
        smartdhcp_debug_print "start lan dhcp server"
		uci_set dhcp lan ignore 0
        uci_commit
        /etc/init.d/dnsmasq reload
	return
}

ifconfig_ap_vap_downup() {
	local cfg="$1"
	local enable 
	local mode
	local ifname

	config_get enable "$cfg" enable
	config_get mode "$cfg" mode
	config_get ifname "$cfg" ifname

	if [ "$enable" == "on" -a "$mode" == "ap" ]; then
		smartdhcp_debug_print "ifconfig down/up $ifname"
		ifconfig $ifname down 2>&1
		ifconfig $ifname up 2>&1
	fi
}

iwpriv_ap_vap_kickout() {
	local cfg="$1"
	local enable 
	local mode
	local ifname

	config_get enable "$cfg" enable
	config_get mode "$cfg" mode
	config_get ifname "$cfg" ifname

	if [ "$enable" == "on" -a "$mode" == "ap" ]; then
		smartdhcp_debug_print "iwpriv kick out all client of $ifname"
		iwpriv $ifname kickmac ff:ff:ff:ff:ff:ff 2>&1
	fi
}

ifconfig_sta_vap_downup() {
	local cfg="$1"
	local enable 
	local mode
	local ifname

	config_get enable "$cfg" enable
	config_get mode "$cfg" mode
	config_get ifname "$cfg" ifname

	if [ "$enable" == "on" -a "$mode" == "sta" ]; then
		smartdhcp_debug_print "ifconfig down/up $ifname"
		ifconfig $ifname down 2>&1
		ifconfig $ifname up 2>&1
	fi
}

ifconfig_eth_downup() {
    local igmp_snooping_enable=$(uci_get iptv iptv igmp_snooping_enable)
    if [ "$igmp_snooping_enable" == "on" ]; then
		smartdhcp_debug_print "igmp snooping enable"
		local brif=$(uci_get iptv iptv lan)
		smartdhcp_debug_print "ifconfig down/up $brif"
		ifconfig $brif down 2>&1
		ifconfig $brif up 2>&1
		smartdhcp_debug_print "Force to disable switch port learning & flush FDB if igmp snooping enabled"
		ssdk_sh fdb portLearn set 0 disable
		ssdk_sh fdb portLearn set 1 disable
		ssdk_sh fdb portLearn set 2 disable
		ssdk_sh fdb portLearn set 3 disable
		ssdk_sh fdb portLearn set 4 disable
		ssdk_sh fdb entry flush 0
	else
		portset down lan
		portset up lan
		local sysmode=`uci get sysmode.sysmode.mode`
		if [ "$sysmode" == "re" ]; then
			portset down wan
			portset up wan
		fi
	fi
}

ifconfig_brif_downup() {
	local status=$1
	# for ethernet client
	ifconfig_eth_downup
	#for wireless client
	config_load wireless
	config_foreach iwpriv_ap_vap_kickout wifi-iface	
	#if [ "$status" == "0" ]; then
	#	config_foreach ifconfig_sta_vap_downup wifi-iface	
	#fi

	return
}


restart_lan_dhcps(){
	local status=$1
	local ifname=$2
	local set_dns_flag=$3
	local mode=$(uci_get dhcp smartdhcp mode)
	local current="0"

	if [ -e "${SMARTDHCP_STATUS_FILE}" ]; then
		current=$(cat ${SMARTDHCP_STATUS_FILE})

		if [ "$current" == "$status" ]; then
			return
		fi
	else
		touch ${SMARTDHCP_STATUS_FILE}
	fi

	if [ "$status" == "1" ]; then
		config_dns
	else
		deconfig_ipalias $ifname
		if [ "$set_dns_flag" == "1" ]; then
			config_dns
		fi
	fi

	if [ "$mode" == "default" -o "$mode" == "auto" ]; then
		if [ "$status" == "1" ]; then
			stop_lan_dhcps
		else
			if [ -z "$set_dns_flag" ]; then
				start_lan_dhcps
			else
				stop_lan_dhcps
			fi
		fi

	elif [ "$mode" == "enable" ]; then 
		start_lan_dhcps

	elif [ "$mode" == "disable" ]; then
		stop_lan_dhcps
	fi	



	echo "$status" > ${SMARTDHCP_STATUS_FILE}

	ifconfig_brif_downup $status

	#smartdhcp_debug_print "Session not work. Need to re-login forcely"
	#lua /lib/domain_login/domain_login_tools.lua ksess
}

smartdhcp_arping_dhcps(){
	local remotedhcps=$(uci_get dhcp smartdhcpinfo remotedhcps)
    if [ "$remotedhcps" == "existed" ]; then
		local ifname=$1
		local retry=$(uci_get dhcp smartdhcp retry)
		local timeout=$(uci_get dhcp smartdhcp timeout) #timeout ms
		local gwip=$(uci_get dhcp smartdhcpinfo aliasgw)
		[ -z "$retry" ] && retry=1
		[ -z "$timeout" ] && timeout=3000 || timeout="$timeout"000
		
		#
		# Usage: arp-scan [options] [hosts...]
		# --retry=<i> or -r <i>   Set total number of attempts per host to <i>, default=2
		# --timeout=<i> or -t <i> Set initial per host timeout to <i> ms, default=500.
		# --interface=<s> or -I <s> Use network interface <s>.
		# IPnetwork/bits (e.g. 192.168.1.0/24)
		#
		smartdhcp_debug_print "/usr/sbin/arp-scan -q -r $retry -t $timeout -I $ifname $gwip/32"
		ret=$(/usr/sbin/arp-scan -q -r $retry  -t $timeout -I $ifname $gwip/32 | grep "1 responded"| wc -l ) 
		if [ $ret == 1 ]
		then
			smartdhcp_debug_print "##### arping $gwip over $ifname existed"
			echo "1"
			return
		fi
		smartdhcp_debug_print "##### arping $gwip over $ifname not existed"
	fi
	smartdhcp_debug_print "##### arping failed"
	echo "0"
	return


}
