# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh

ffs_support=$(uci get profile.@wireless[0].ffs -c /etc/profile.d/ -q)
[ "$ffs_support" = "yes" ] && {
    ffs_enable=$(uci get amazon_ffs.ffs.enable)
    . /lib/ffs/ffs_core.sh
}

tc_d(){
    #echo "tc $@" > /dev/console
    tc $@
}

crontab_cmd="\* \* \* \* \* \/sbin\/qos_check"

fw_config_get_global(){
	# $1 should be qos_v2 section "settings"
    fw_config_get_section "settings" global { \
        string enable           "off" \
        string up_band          "" \
        string down_band        "" \
        string high             "90" \
        string low              "10" \
        string percent          "92" \
        string up_unit          "mbps" \
        string down_unit        "mbps" \
        string rUpband          "" \
        string rDownband        "" \
    } || return   
}

fw_config_get_client(){
    fw_config_get_section "$1" client { \
        string mac              "" \
        string prio             "off" \
        string prio_time        "" \
        string time_period      "" \
    } || return
}

fw_load_qos(){
    if [[ x"$(uci_get_state qos_v2 core)" != x"qos_v2" ]]; then
        uci_set_state qos_v2 core "" qos_v2
    fi
    
    fw_config_once fw_load_global global 
}

fw_rule_exit(){
    fw flush 4 m zone_lan_qos
    fw flush 4 m zone_wan_qos

    fw flush 4 m qos_lan_rule

    fw flush 4 m qos_lan_HIGH
    fw flush 4 m qos_lan_LOW

    fw flush 4 m qos_wan_HIGH
    fw flush 4 m qos_wan_LOW

    fw del 4 m qos_lan_rule

    fw del 4 m qos_lan_HIGH
    fw del 4 m qos_lan_LOW

    fw del 4 m qos_wan_HIGH
    fw del 4 m qos_wan_LOW
}

fw_rule_load() {
    fw add 4 m qos_lan_HIGH
    fw add 4 m qos_lan_LOW
    fw add 4 m qos_lan_rule

    fw add 4 m qos_wan_HIGH
    fw add 4 m qos_wan_LOW

    local lan_target="MARK --set-xmark 0x1101/0xffff"
    local conn_target="CONNMARK --set-xmark 0x1101/0xffff"
    local wan_target="MARK --set-xmark 0x2101/0xffff"

    fw s_add 4 m qos_lan_HIGH "$lan_target"
    fw s_add 4 m qos_lan_HIGH "$conn_target"
    fw s_add 4 m qos_lan_HIGH ACCEPT
    fw s_add 4 m qos_wan_HIGH "$wan_target"
    fw s_add 4 m qos_wan_HIGH ACCEPT

    lan_target="MARK --set-xmark 0x1103/0xffff"
    conn_target="CONNMARK --set-xmark 0x1103/0xffff"
    wan_target="MARK --set-xmark 0x2103/0xffff"

    fw s_add 4 m qos_lan_LOW "$lan_target"
    fw s_add 4 m qos_lan_LOW "$conn_target"
    fw s_add 4 m qos_lan_LOW ACCEPT
    fw s_add 4 m qos_wan_LOW "$wan_target"
    fw s_add 4 m qos_wan_LOW ACCEPT

    # wan rules, low is default
    fw s_add 4 m zone_wan_qos qos_wan_HIGH { "-m connmark --mark 0x1101/0xffff" }
    fw s_add 4 m zone_wan_qos qos_wan_LOW { "-m connmark --mark 0x1103/0xffff" }

    # lan rules, to avoid second match
    fw s_add 4 m zone_lan_qos qos_lan_HIGH { "-m connmark --mark 0x1101/0xffff" }
    fw s_add 4 m zone_lan_qos qos_lan_LOW { "-m connmark --mark 0x1103/0xffff" }
    fw s_add 4 m zone_lan_qos qos_lan_rule

    # set up iptables rules
	uci_revert_state qos_v2 core check_time
    config_foreach fw_load_client client
	
	local macs=$(uci_get_state qos_v2 core check_time)
	if [ ! -z "$macs" ]; then
		:
		sed -i "/^${crontab_cmd}/d" /etc/crontabs/root 
		echo "* * * * * /sbin/qos_check" >> /etc/crontabs/root 
		/etc/init.d/cron restart &
	fi
	

    # default qos
    fw s_add 4 m zone_lan_qos qos_lan_LOW
    fw s_add 4 m zone_wan_qos qos_wan_LOW
}

fw_exit_qos(){
    if [[ x"$(uci_get_state qos_v2 core)" != x"qos_v2" ]]; then
        uci_set_state qos_v2 core "" qos_v2
    fi

    if [[ x"$(uci_get_state qos_v2 core loaded)" == x1 ]]; then

        fw_rule_exit
        fw_tc_stop
        rmmod cls_fw.ko
        rmmod sch_sfq.ko
        rmmod sch_htb.ko

        uci_revert_state qos_v2 core loaded
        uci_revert_state qos_v2 core check_time
        uci_set_state qos_v2 core loaded 0

        #ffs
        [ "$ffs_support" = "yes" ] && {
            if [ "$ffs_enable" = "on" ]; then
                ffs_fw_del_rate_rule
                ffs_fw_add_rate_rule
                ffs_tc_support
                ffs_tc_add_up_rule
            fi
        }
    fi
}

fw_load_global() {

    fw_config_get_global "$1"
    local release=$(uname -r)

    if [[ x"$(uci_get_state qos_v2 core loaded)" != x1 ]]; then
        if [[ "$global_enable" == "on" ]]; then
            syslog $LOG_INF_FUNCTION_ENABLE

            if [[ -n "$global_up_band" -a -n "$global_down_band" ]]; then
                fw_tc_start
            fi

            fw_rule_load

            uci_revert_state qos_v2 core loaded
            uci_set_state qos_v2 core loaded 1
        else
            syslog $LOG_INF_FUNCTION_DISABLE
            uci_revert_state qos_v2 core loaded
			uci_revert_state qos_v2 core check_time
            uci_set_state qos_v2 core loaded 0
        fi
    fi    
}

fw_tc_start() {
    # modules
    local release=$(uname -r)
    insmod /lib/modules/"$release"/sch_htb.ko
    insmod /lib/modules/"$release"/sch_sfq.ko
    insmod /lib/modules/"$release"/cls_fw.ko

    local all_percent=$((${global_high}+${global_low}))
    global_high=$((${global_high}*100/${all_percent}))
    global_low=$((${global_low}*100/${all_percent}))

    # paras
    if [[ -n "$global_rUpband" ]]; then
        global_up_band=$((global_rUpband))
    elif [[ "$global_up_unit" == "mbps" ]]; then
        global_up_band=$((global_up_band*1000))
    fi
    local uplink=$((${global_percent}*${global_up_band}/100))
    
    if [[ -n "$global_rDownband" ]]; then
        global_down_band=$((global_rDownband))
    elif [[ "$global_down_unit" == "mbps" ]]; then
        global_down_band=$((global_down_band*1000))
    fi
    local downlink=$((${global_percent}*${global_down_band}/100))
    

    local up_high=$((${global_high}*${uplink}/100))
    local up_low=$((${global_low}*${uplink}/100))

    local down_high=$((${global_high}*${downlink}/100))
    local down_low=$((${global_low}*${downlink}/100))

    # Calculate the burst and cburst parameters for HTB 
    # Added by Jason Guo<guodongxian@tp-link.net>, 20140729 
    local hz=$(cat /proc/net/psched|awk -F ' ' '{print $4}')
    local up_iface_burst down_iface_burst
    local up_burst u_hi_burst u_lo_burst
    local down_burst d_hi_burst d_lo_burst 
    [ "$hz" == "3b9aca00" ] && {
        burst__calc() {
            local b=$((${1} * 1000 / 8 / 100))
            b=$((${b} + 1600))
            echo "$b"
        }
        # Uplink, unit bit
        up_burst=$(burst__calc $uplink)
        u_hi_burst=$(burst__calc $up_high)
        u_lo_burst=$(burst__calc $up_low)

        # Downlink, unit bit
        down_burst=$(burst__calc $downlink)
        d_hi_burst=$(burst__calc $down_high)
        d_lo_burst=$(burst__calc $down_low)

        up_iface_burst=$(burst__calc 1000000)
        down_iface_burst=$(burst__calc 1000000)
        param__convert() {
            local p=
            [ -n "$1" -a -n "$2" ] && {
                p="burst $1 cburst $2"
            }
            echo "$p"        
        }
        
        u_hi_burst=$(param__convert $u_hi_burst $up_burst)
        u_lo_burst=$(param__convert $u_lo_burst $up_burst)
        up_burst=$(param__convert $up_burst $up_burst)

        d_hi_burst=$(param__convert $d_hi_burst $down_burst)
        d_lo_burst=$(param__convert $d_lo_burst $down_burst)
        down_burst=$(param__convert $down_burst $down_burst)

        up_iface_burst=$(param__convert $up_iface_burst $up_iface_burst)
        down_iface_burst=$(param__convert $down_iface_burst $down_iface_burst)
    }
    uplink="$uplink""kbit"
    downlink="$downlink""kbit"

    up_high="$up_high""kbit"
    up_low="$up_low""kbit"

    down_high="$down_high""kbit"
    down_low="$down_low""kbit"

    #local ifaces="mobile wan"
    local ifaces="wan"
    for i in $ifaces; do
        local wan_ifname=$(uci get network.$i.ifname)
        [ -z $wan_ifname ] && {
            continue
        }
        # uplink

        # ffs
        [ "$ffs_support" = "yes" -a "$ffs_enable" = "on" ] && {
            tc_d qdisc del dev "$wan_ifname" root
        }

        tc_d qdisc add dev $wan_ifname root handle 1: htb default 1100
        tc_d class add dev $wan_ifname parent 1: classid 1:1 htb rate "$uplink" ceil "$uplink" $up_burst quantum 1500

        tc_d class add dev $wan_ifname parent 1: classid 1:1100 htb rate 1000000kbit ceil 1000000kbit $up_iface_burst quantum 1500 prio 3
        tc_d qdisc add dev $wan_ifname parent 1:1100 handle 1100: sfq perturb 10

        tc_d class add dev $wan_ifname parent 1:1 classid 1:1101 htb rate "$up_high" ceil "$uplink" $u_hi_burst quantum 1500 prio 0
        tc_d qdisc add dev $wan_ifname parent 1:1101 handle 1101: sfq perturb 10

        tc_d class add dev $wan_ifname parent 1:1 classid 1:1103 htb rate "$up_low" ceil "$uplink" $u_lo_burst quantum 1500 prio 2
        tc_d qdisc add dev $wan_ifname parent 1:1103 handle 1103: sfq perturb 10

        # filter
        tc_d filter add dev $wan_ifname parent 1:0 protocol all handle 0x1101/0xffff fw classid 1:1101
        tc_d filter add dev $wan_ifname parent 1:0 protocol all handle 0x1103/0xffff fw classid 1:1103

        # ffs
        [ "$ffs_support" = "yes" -a "$ffs_enable" = "on" ] && {
            tc_d class add dev $wan_ifname parent 1:1 classid 1:1104 htb rate 82kbit ceil 82kbit 
            tc_d qdisc add dev $wan_ifname parent 1:1104 handle 1104: sfq perturb 10
            tc_d filter add dev $wan_ifname parent 1:0 protocol all handle 0x1104/0xffff fw classid 1:1104
        }
    done

    # downlink
    tc_d qdisc add dev br-lan root handle 2: htb default 2100
    tc_d class add dev br-lan parent 2: classid 2:2 htb rate "$downlink" ceil "$downlink" $down_burst quantum 1500

    tc_d class add dev br-lan parent 2: classid 2:2100 htb rate 1000000kbit ceil 1000000kbit $down_iface_burst quantum 1500 prio 3
    tc_d qdisc add dev br-lan parent 2:2100 handle 2100: sfq perturb 10

    tc_d class add dev br-lan parent 2:2 classid 2:2101 htb rate "$down_high" ceil "$downlink" $d_hi_burst quantum 1500 prio 0
    tc_d qdisc add dev br-lan parent 2:2101 handle 2101: sfq perturb 10

    tc_d class add dev br-lan parent 2:2 classid 2:2103 htb rate "$down_low" ceil "$downlink" $d_lo_burst quantum 1500 prio 2
    tc_d qdisc add dev br-lan parent 2:2103 handle 2103: sfq perturb 10

    # filter
    tc_d filter add dev br-lan parent 2:0 protocol all handle 0x2101/0xffff fw classid 2:2101
    tc_d filter add dev br-lan parent 2:0 protocol all handle 0x2103/0xffff fw classid 2:2103
}

fw_tc_stop(){
    #local ifaces="mobile wan"
    local ifaces="wan"
    for i in $ifaces; do
        local wan_ifname=$(uci get network.$i.ifname)
        [ -z $wan_ifname ] && {
            continue
        }
        tc_d qdisc del dev "$wan_ifname" root
    done

    tc_d qdisc del dev br-lan root
}

fw_rule_reload() {
    fw_rule_exit
    fw_config_get_global "$1"

    if [[ "$global_enable" == "on" ]]; then
        fw_rule_load
    fi
}

fw_load_client() {
    fw_config_get_client "$1"
	#echo "client_mac=$client_mac client_prio=$client_prio" > /dev/console
	
	local client_mac=${client_mac//-/:}
	client_mac=$(echo $client_mac | tr [a-z] [A-Z])
	
	local lan_target
	if [ "$client_prio" == "on" ]; then
		now=`date '+%s'`
		if [ "$client_prio_time" == "-1" -o "$now" -lt "$client_prio_time" ]; then
			fw s_add 4 m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $client_mac" }
		fi
		if [ "$now" -lt "$client_prio_time" ]; then
			macs=$(uci_get_state qos_v2 core check_time)
			append macs ${client_mac}
			uci_toggle_state qos_v2 core check_time "${macs}"
		fi
	fi
}

fw_check_clients() {
	local old_macs=$(uci_get_state qos_v2 core check_time)
	local new_macs
	
	local now=`date '+%s'`
	for mac in $old_macs
	do
		key=${mac//:/}
		fw_config_get_client $key
		
		#echo $key "$client_mac" "$now" "$client_prio_time" > /dev/console
		
		if [ "$now" -gt "$client_prio_time" ]; then
			fw s_del 4 m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac" }
		else
			append new_macs $mac 
		fi
	done
	
	if [ "${new_macs}" != "${old_macs}" ];then
		uci_toggle_state qos_v2 core check_time "${new_macs}"
	fi
	
	if [ -z "${new_macs}" ];then
		uci_revert_state qos_v2 core check_time
		sed -i "/^${crontab_cmd}/d" /etc/crontabs/root 
		/etc/init.d/cron restart &
	fi
}

