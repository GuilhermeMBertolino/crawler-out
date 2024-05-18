# Copyright(c) 2012-2019 Shenzhen TP-LINK Technologies Co.Ltd.
# file     vpn.init
# brief    
# author   Zhu Haiming
# version  1.0.0
# date     8Apr19
# histry   arg 1.0.0, 8Apr19, Zhu Haiming, Create the file. 

. /lib/functions.sh
. /lib/functions/network.sh

VPN_CLIENT_MARK=32768

add_vpn_client()
{
	local access="on"
	local mac
	config_get access "$1" "access"
	config_get mac "$1" "mac"
	if [ "$access" = "on" ]; then
		vpn_mgmt "client" add "$mac"
	fi
}

vpn_main() {
	local enabled="off"
	local vpntype="none"
	local ipsec="0"
	
	config_load vpn
	config_get enabled "client" "enabled"
	config_get vpntype "client" "vpntype"
	config_get ipsec "client" "ipsec"
    
	if [ "$enabled" = "off" -o "$vpntype" = "none" ]; then
		echo "vpn client if off, exit" > /dev/console
		return;
	fi
	
	#init iptables rules
	iptables -t mangle -N prerouting_rule_vpn_client
	iptables -t mangle -I PREROUTING -j prerouting_rule_vpn_client
	iptables -t nat -N prerouting_rule_vpn_client
	iptables -t nat -I PREROUTING -j prerouting_rule_vpn_client
	iptables -t mangle -N output_rule_vpn_client
	iptables -t mangle -I OUTPUT -j output_rule_vpn_client
	
	#prepare client mark
	iptables -t mangle -F prerouting_rule_vpn_client
	config_foreach add_vpn_client user

	#init accelskip rule
	fw vpnc_accelskip_add $vpntype
	
	#connect
	ubus call network.interface.vpn disconnect
	ubus call network reload
	ubus call network.interface.vpn connect

	if [ "$vpntype" = "l2tpvpn" -a "$ipsec" = "1" ];then
		ipsec_client_tunnel_monitor &
	fi
    return
}

vpn_event() {
    vpn_main "$@"
}

vpn_start() {
	vpn_main "$1"
}

vpn_stop() {
	ubus call network.interface.vpn disconnect
	ubus call network reload
	
    ip rule del table vpn
	ip route flush table vpn
	ip route flush cache
	
	killall vpnDnsproxy
	iptables -t mangle -D PREROUTING -j prerouting_rule_vpn_client
	iptables -t mangle -F prerouting_rule_vpn_client
	iptables -t mangle -X prerouting_rule_vpn_client
	iptables -t nat -D PREROUTING -j prerouting_rule_vpn_client
	iptables -t nat -F prerouting_rule_vpn_client
	iptables -t nat -X prerouting_rule_vpn_client
	iptables -t mangle -D OUTPUT -j output_rule_vpn_client
	iptables -t mangle -F output_rule_vpn_client
	iptables -t mangle -X output_rule_vpn_client
	fw vpnc_accelskip_del pptp
	fw vpnc_accelskip_del l2tp
	# for brcm fcache bug: openvpn can not access the internet
	local enabled="off"
	config_load openvpn
	config_get enabled "server" "enabled"
	if [ "$enabled" = "off" ]; then
		fw vpnc_accelskip_del openvpn
	fi


	killall -9 ipsec_client_tunnel_monitor
}

vpn_check_add_rules() {
	local enabled="off"
	local vpntype="none"
	local ipsec="0"
	
	config_load vpn
	config_get enabled "client" "enabled"
	config_get vpntype "client" "vpntype"
	config_get ipsec "client" "ipsec"
    
	if [ "$enabled" = "off" -o "$vpntype" = "none" ]; then
		echo "vpn client if off, exit" > /dev/console
		return;
	fi
	
	#init iptables rules
	exist=$(iptables -nvL -t mangle | grep prerouting_rule_vpn_client)
	if [ -z "$exist" ]; then
		echo "===========$0 suplement vpnc mark rule in mangle==========" > /dev/console
		iptables -t mangle -N prerouting_rule_vpn_client
		iptables -t mangle -I PREROUTING -j prerouting_rule_vpn_client

		#prepare client mark
		iptables -t mangle -F prerouting_rule_vpn_client
		config_foreach add_vpn_client user
	fi

	if [ -e /proc/fcache/ ]; then
		if [ "$vpntype" = "pptp" -o "$vpntype" = "pptpvpn" ];then
			exist=$(iptables -nvL| grep -i BLOGSKIP | grep "pptp-vpn")
			if [ -z "$exist" ]; then
				fw vpnc_accelskip_add pptp
			fi
		elif [ "$vpntype" = "l2tp" -o "$vpntype" = "l2tpvpn" ];then	
			exist=$(iptables -nvL| grep -i BLOGSKIP | grep "l2tp-vpn")
			if [ -z "$exist" ]; then
				fw vpnc_accelskip_add l2tp 
			fi
		# for brcm fcache bug: openvpn can not access the internet
		elif [ "$vpntype" = "openvpn" ];then	
			exist=$(iptables -nvL| grep -i BLOGSKIP | grep "tun")
			if [ -z "$exist" ]; then
				fw vpnc_accelskip_add openvpn 
			fi
		fi
	fi
}

vpn_restart() {
	vpn_stop
    	sleep 2
	vpn_main
}

vpn_reload() {
	vpn_restart $1
}

