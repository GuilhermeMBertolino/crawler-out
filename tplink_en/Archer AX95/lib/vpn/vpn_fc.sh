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
        local pptp_vpn_client_parent=`uci get network.vpn.parent 2>/dev/null`
        if [[ "$pptp_vpn_server" == "on" ]] && [[ "$internet_proto" == "pptp" || "$internet_proto" == "l2tp" ]] ; then
            fcctl config --gre 0
        elif [[ "$pptp_vpn_client_enable" == "on" ]] && [[ "$pptp_vpn_client_type" == "pptpvpn" ]] && [[ "$internet_proto" == "pptp" || "$internet_proto" == "l2tp" ]] ; then
            fcctl config --gre 0
        elif [[ "$pptp_vpn_client_enable" == "on" ]] && [[ "$pptp_vpn_client_type" == "pptpvpn" ]] && [[ "$pptp_vpn_client_parent" == "mobile" ]]; then
            fcctl config --gre 0
        else
            fcctl config --gre 1
        fi
    fi
}

fw_pptp_access_accel_handle(){
    # for brcm fcache bug workaround
    [ -e /proc/fcache/ ] && {
        update_pptp_fc_gre_status

        local internet_proto="$(uci get network.internet.proto 2>/dev/null)"
        if [[ "${internet_proto}" == "pppoe" ]] ; then
            local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "[^l2tp-]pppdrv")
            [ -z "${skip_rule}" ] && {
                fw_s_add 4 f FORWARD BLOGSKIP 1 { "-i pppdrv+ -o pppoe-internet" }
                fw_s_add 4 f FORWARD BLOGSKIP 1 { "-i pppoe-internet -o pppdrv+" }
            }
        else
            local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "[^l2tp-]pppdrv")
            [ -n "${skip_rule}" ] && {
                fw_s_del 4 f FORWARD BLOGSKIP { "-i pppdrv+ -o pppoe-internet" }
                fw_s_del 4 f FORWARD BLOGSKIP { "-i pppoe-internet -o pppdrv+" }
            }
        fi
    }
}

fw_pptp_block_accel_handle(){
    # for brcm fcache bug workaround
    [ -e /proc/fcache/ ] && {
        local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "[^l2tp-]pppdrv")
        [ -n "${skip_rule}" ] && {
            fw_s_del 4 f FORWARD BLOGSKIP { "-i pppdrv+ -o pppoe-internet" }
            fw_s_del 4 f FORWARD BLOGSKIP { "-i pppoe-internet -o pppdrv+" }
        }

        update_pptp_fc_gre_status
    }
}

fw_l2tp_access_accel_handle(){
    [ -e /proc/fcache/ ] && {
        local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "l2tp-pppdrv")
        [ -z "${skip_rule}" ] && {
            fw_s_add 4 f FORWARD BLOGSKIP 1 { "-i l2tp-pppdrv+" }
            fw_s_add 4 f FORWARD BLOGSKIP 1 { "-o l2tp-pppdrv+" }
        }
    }
}

fw_l2tp_block_accel_handle(){
    [ -e /proc/fcache/ ] && {
        local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "l2tp-pppdrv")
        [ -n "${skip_rule}" ] && {
            fw_s_del 4 f FORWARD BLOGSKIP { "-i l2tp-pppdrv+" }
            fw_s_del 4 f FORWARD BLOGSKIP { "-o l2tp-pppdrv+" }
        }
    }
}

fw_vpnc_access_accel_handle(){
    [ -e /proc/fcache/ ] && {
        vpntype=$1
        if [ "$vpntype" = "pptp" -o "$vpntype" = "pptpvpn" ]; then
            local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "pptp-vpn")
            [ -z "${skip_rule}" ] && {
                fw_s_add 4 f FORWARD BLOGSKIP 1 { "-i pptp-vpn" }
                fw_s_add 4 f FORWARD BLOGSKIP 1 { "-o pptp-vpn" }
            }
        elif [ "$vpntype" = "l2tp" -o "$vpntype" = "l2tpvpn" ]; then
            local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "l2tp-vpn")
            [ -z "${skip_rule}" ] && {
                fw_s_add 4 f FORWARD BLOGSKIP 1 { "-i l2tp-vpn" }
                fw_s_add 4 f FORWARD BLOGSKIP 1 { "-o l2tp-vpn" }
            }
        fi
    }
}

fw_vpnc_block_accel_handle(){
    [ -e /proc/fcache/ ] && {
        vpntype=$1
        if [ "$vpntype" = "pptp" -o "$vpntype" = "pptpvpn" ]; then
            local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "pptp-vpn")
            [ -n "${skip_rule}" ] && {
                fw_s_del 4 f FORWARD BLOGSKIP { "-i pptp-vpn" }
                fw_s_del 4 f FORWARD BLOGSKIP { "-o pptp-vpn" }
            }
        elif [ "$vpntype" = "l2tp" -o "$vpntype" = "l2tpvpn" ]; then
            local skip_rule=$(fw list 4 f FORWARD | grep -i "BLOGSKIP" | grep "l2tp-vpn")
            [ -n "${skip_rule}" ] && {
                fw_s_del 4 f FORWARD BLOGSKIP { "-i l2tp-vpn" }
                fw_s_del 4 f FORWARD BLOGSKIP { "-o l2tp-vpn" }
            }
        fi
    }
}
