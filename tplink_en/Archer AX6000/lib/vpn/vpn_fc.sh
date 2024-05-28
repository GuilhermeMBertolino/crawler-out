# Copyright(c) 2012-2019 Shenzhen TP-LINK Technologies Co.Ltd.
# file     vpn_fc
# brief    
# author   marujun
# version  1.0.0
# date     2021/6/3
# histry   2021/6/3, marujun, Create the file. 

#!/bin/sh

. /lib/functions.sh
. /lib/functions/network.sh


# stop fc gre if pptp_vpn_server or pptp_vpn_client enable and internet_proto is pptp or l2tp
update_pptp_fc_gre_status(){
    if [ -d /proc/fcache/ ] ; then
		local internet_proto=`uci get network.internet.proto 2>/dev/null`
		local pptp_vpn_server=`uci get pptpd.pptpd.enabled 2>/dev/null`
        local pptp_vpn_client_enable=`uci get vpn.client.enabled 2>/dev/null`
        local pptp_vpn_client_type=`uci get vpn.client.vpntype 2>/dev/null`
		if [[ "$pptp_vpn_server" == "on" ]] && [[ "$internet_proto" == "pptp" || "$internet_proto" == "l2tp" ]] ; then
			fcctl config --gre 0
		elif [[ "$pptp_vpn_client_enable" == "on" ]] && [[ "$pptp_vpn_client_type" == "pptpvpn" ]] && [[ "$internet_proto" == "pptp" || "$internet_proto" == "l2tp" ]] ; then
			fcctl config --gre 0
        else
            fcctl config --gre 1
		fi
	fi
}
