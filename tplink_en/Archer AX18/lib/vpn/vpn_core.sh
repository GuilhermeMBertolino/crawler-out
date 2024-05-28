# Copyright(c) 2012-2019 Shenzhen TP-LINK Technologies Co.Ltd.
# file     vpn.init
# brief    
# author   Zhu Haiming
# version  1.0.0
# date     8Apr19
# histry   arg 1.0.0, 8Apr19, Zhu Haiming, Create the file. 

. /lib/functions.sh
. /lib/functions/network.sh

VPN_CLIENT_MARK=262144
VPN_CLIENT_MASK=262144


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
	fw vpnc_access_accel_handle $vpntype
	
	#init accelskip rule
	fw vpnc_accelskip_add $vpntype

	#save skb mark to ct, to jump hnat
	iptables -t mangle -A prerouting_rule_vpn_client -m mark --mark $VPN_CLIENT_MARK/$VPN_CLIENT_MASK -j CONNMARK --save-mark
	
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

	fw vpnc_block_accel_handle pptp
	fw vpnc_block_accel_handle l2tp


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

	if [ "$vpntype" = "pptp" -o "$vpntype" = "pptpvpn" ];then
		fw vpnc_access_accel_handle pptp
	elif [ "$vpntype" = "l2tp" -o "$vpntype" = "l2tpvpn" ];then
		fw vpnc_access_accel_handle l2tp
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

