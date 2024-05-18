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
qos_schedule_support=$(uci get profile.@qos[0].qos_schedule_support -c "/etc/profile.d" -q)

accel_handler_load()
{
	[ -e /proc/ppa/ ] && {
	
		. /lib/qos/intel_SAE_QoS_conf.sh
		
		#set_ppa_threshold 5
		#disable_hw_nat
		enable_redirect_netifs
	}
}

accel_handler_exit()
{
	[ -e /proc/ppa/ ] && {
	
		. /lib/qos/intel_SAE_QoS_conf.sh
		
		#set_ppa_threshold 3
		#enable_hw_nat
		disable_redirect_netifs
	}
}

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

# no_repeat_exec -- flag of no repeats, "on" means that it will be executed, "off" means that it has been executed
fw_config_get_client(){
	if [ "$qos_schedule_support" = "yes" ]; then
	    fw_config_get_section "$1" client { \
	        string mac               "" \
	        string prio              "off" \
	        string prio_time         "" \
	        string time_period       "" \
	        string schedule_enable   "" \
	        string time_mode         "" \
	        string status            "" \
	        string slots             "" \
	        string slots_next_day    "" \
	        string repeats           "" \
	        string repeats_next_day  "" \
	        string no_repeat_exec    "" \
	    } || return
	else
		fw_config_get_section "$1" client { \
	        string mac               "" \
	        string prio              "off" \
	        string prio_time         "" \
	        string time_period       "" \
	    } || return
	fi
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

    local lan_target="MARK --set-xmark 0x1101/0xfff3"
    local conn_target="CONNMARK --set-xmark 0x1101/0xfff3"
    local wan_target="MARK --set-xmark 0x2101/0xfff3"

    fw s_add 4 m qos_lan_HIGH "$lan_target"
    fw s_add 4 m qos_lan_HIGH "$conn_target"
    fw s_add 4 m qos_lan_HIGH ACCEPT
    fw s_add 4 m qos_wan_HIGH "$wan_target"
    fw s_add 4 m qos_wan_HIGH ACCEPT

    lan_target="MARK --set-xmark 0x1103/0xfff3"
    conn_target="CONNMARK --set-xmark 0x1103/0xfff3"
    wan_target="MARK --set-xmark 0x2103/0xfff3"

    fw s_add 4 m qos_lan_LOW "$lan_target"
    fw s_add 4 m qos_lan_LOW "$conn_target"
    fw s_add 4 m qos_lan_LOW ACCEPT
    fw s_add 4 m qos_wan_LOW "$wan_target"
    fw s_add 4 m qos_wan_LOW ACCEPT

    # wan rules, low is default
    fw s_add 4 m zone_wan_qos qos_wan_HIGH { "-m connmark --mark 0x1101/0xfff3" }
    fw s_add 4 m zone_wan_qos qos_wan_LOW { "-m connmark --mark 0x1103/0xfff3" }

    # lan rules, to avoid second match
    fw s_add 4 m zone_lan_qos qos_lan_HIGH { "-m connmark --mark 0x1101/0xfff3" }
    fw s_add 4 m zone_lan_qos qos_lan_LOW { "-m connmark --mark 0x1103/0xfff3" }
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
        # for brcm qos support
        grep qos_kctl /proc/modules && rmmod qos_kctl

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
	local wan_type=$(uci get network.wan.wan_type)
    if [[ x"$(uci_get_state qos_v2 core loaded)" != x1 ]]; then
        if [[ "$wan_type" != "v6plus" -a "$wan_type" != "dslite" -a "$global_enable" == "on" ]]; then
            syslog $LOG_INF_FUNCTION_ENABLE

            if [[ -n "$global_up_band" -a -n "$global_down_band" ]]; then
                fw_tc_start
            fi

            fw_rule_load

            uci_revert_state qos_v2 core loaded
            uci_set_state qos_v2 core loaded 1
            
    		# for brcm rest wl1 affinity
            if [[ -f /etc/init.d/bcm_cpu_affinity ]]; then
                /etc/init.d/bcm_cpu_affinity start
            fi
			
            # for brcm qos support
            if [[ -f /lib/modules/iplatform/qos_kctl.ko ]]; then
                insmod /lib/modules/iplatform/qos_kctl.ko
            fi
			
			# for Intel qos support
			[ -e /proc/ppa ] && {
				ppacmd delsession -a all
			}
        else
            syslog $LOG_INF_FUNCTION_DISABLE
            uci_revert_state qos_v2 core loaded
			uci_revert_state qos_v2 core check_time
            uci_set_state qos_v2 core loaded 0
            # for brcm qos support
            grep qos_kctl /proc/modules && rmmod qos_kctl
			
    		# for brcm rest wl1 affinity
            if [[ -f /etc/init.d/bcm_cpu_affinity ]]; then
                /etc/init.d/bcm_cpu_affinity start
            fi

            # ffs - When FFS is turned on, turn on qos, this process will be executed
            [ "$ffs_support" = "yes" -a "$ffs_enable" = "on" ] && {
                ffs_ratelimit_debug "ffs_add_qos_kctl_support start"
                ffs_add_qos_kctl_support
                ffs_ratelimit_debug "ffs_add_qos_kctl_support end"
            }

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
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)	      
  		[ -z $wan_ifname ] && {
            continue
        }
        # uplink
        
        # ffsd 
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
        tc_d filter add dev $wan_ifname parent 1:0 protocol all handle 0x1101/0xfff3 fw classid 1:1101
        tc_d filter add dev $wan_ifname parent 1:0 protocol all handle 0x1103/0xfff3 fw classid 1:1103

        # ffsd
        [ "$ffs_support" = "yes" -a "$ffs_enable" = "on" ] && {
            tc_d class add dev $wan_ifname parent 1:1 classid 1:1110 htb rate 82kbit ceil 82kbit 
            tc_d qdisc add dev $wan_ifname parent 1:1110 handle 1110: sfq perturb 10
            tc_d filter add dev $wan_ifname parent 1:0 protocol all handle 0x1110/0xffff fw classid 1:1110
        }
    done

	local lanDev="br-lan"
	[ -e /proc/ppa/ ] && {
		lanDev="ifb1"
		accel_handler_load
	}	
	
    # downlink
    tc_d qdisc add dev $lanDev root handle 2: htb default 2100
    tc_d class add dev $lanDev parent 2: classid 2:2 htb rate "$downlink" ceil "$downlink" $down_burst quantum 1500
    tc_d class add dev $lanDev parent 2: classid 2:2100 htb rate 1000000kbit ceil 1000000kbit $down_iface_burst quantum 1500 prio 3
    tc_d qdisc add dev $lanDev parent 2:2100 handle 2100: sfq perturb 10

    tc_d class add dev $lanDev parent 2:2 classid 2:2101 htb rate "$down_high" ceil "$downlink" $d_hi_burst quantum 1500 prio 0
    tc_d qdisc add dev $lanDev parent 2:2101 handle 2101: sfq perturb 10

    tc_d class add dev $lanDev parent 2:2 classid 2:2103 htb rate "$down_low" ceil "$downlink" $d_lo_burst quantum 1500 prio 2
    tc_d qdisc add dev $lanDev parent 2:2103 handle 2103: sfq perturb 10

    # filter
    tc_d filter add dev $lanDev parent 2:0 protocol all handle 0x2101/0xfff3 fw classid 2:2101
    tc_d filter add dev $lanDev parent 2:0 protocol all handle 0x2103/0xfff3 fw classid 2:2103
}

fw_tc_stop(){
    #local ifaces="mobile wan"
	local ifaces="wan"
    for i in $ifaces; do
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)	      
  		[ -z $wan_ifname ] && {
            continue
        }
        tc_d qdisc del dev "$wan_ifname" root
    done

    tc_d qdisc del dev br-lan root
	
	accel_handler_exit
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
	if [ "$client_prio" == "on" -a "${client_time_mode}" != "schedule" ]; then
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
	
	#qos schedule
	if [ "$qos_schedule_support" == "yes" ]; then
		if [ "${client_time_mode}" == "schedule" -a "$client_schedule_enable" == "on" ]; then
			macs=$(uci_get_state qos_v2 core check_time)
			append macs ${client_mac}
			uci_toggle_state qos_v2 core check_time "${macs}"
			if [ "${client_status}" == "on" ]; then
				fw s_add 4 m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $client_mac" }
			fi
		fi
	fi
}

fw_check_clients() {
	local old_macs=$(uci_get_state qos_v2 core check_time)
	local new_macs
	echo "[fw_check_clients] old_macs:$old_macs"
	local now=`date '+%s'`
	local repeats
	local repeats_next_day
	local slots
	local slots_next_day
	local time_begin
	local time_end
	local time_begin_next_day
	local time_end_next_day

	local flag_add="false"

	local index

	if [ "$qos_schedule_support" = "yes" ]; then
		local now_week=`date '+%a'`
		local now_time=`date '+%T'`
		now_time=${now_time//:/}
		now_time=`echo ${now_time:0-3:4}`
	fi
	
	for mac in $old_macs
	do
		# initializing variable
		repeats=""
		repeats_next_day=""
		slots=""
		slots_next_day=""
		time_begin=""
		time_end=""
		time_begin_next_day=""
		time_end_next_day=""
		flag_add="false"
		
		key=${mac//:/}
		fw_config_get_client $key

		if [ "${qos_schedule_support}" = "yes" -a "${client_time_mode}" = "schedule" ];then
			append new_macs $mac

			#deal with the time slots
			slots=${client_slots// / }
			index=0
			for v in $slots
			do
				if [ $index -eq 0 ]; then
					time_begin=$v
				fi
				if [ $index -eq 1 ]; then
					time_end=$v
				fi
				index=`expr $index + 1`
			done

			#deal with the time slots of the next day
			if [ ! -z "${client_slots_next_day}" ];then
				slots_next_day=${client_slots_next_day// / }
				index=0
				for v in $slots_next_day
				do
					if [ $index -eq 0 ]; then
						time_begin_next_day=$v
					fi
					if [ $index -eq 1 ]; then
						time_end_next_day=$v
					fi
					index=`expr $index + 1`
				done
			fi

			# no repeats
			if [ -z "${client_repeats}" ];then
				if [ "${now_time}" -gt "${time_begin}" -a "${now_time}" -lt "${time_end}" ]; then
					if [ "${client_no_repeat_exec}" == "on" ]; then
						flag_add="true"
					fi
				fi
				#no repeats next day
				if [ ! -z "${client_slots_next_day}" ];then
					if [ "${now_time}" -gt "${time_begin_next_day}" -a "${now_time}" -lt "${time_end_next_day}" ]; then
						if [ "${client_no_repeat_exec}" == "on" ]; then
							flag_add="true"
						fi
					fi
				fi
			fi

			# repeats
			if [ ! -z "${client_repeats}" ];then
				repeats=${client_repeats// / }
				for week in $repeats
				do
					if [ "${now_week}" == "${week}" ];then
						if [ "${now_time}" -gt "${time_begin}" -a "${now_time}" -lt "${time_end}" ]; then
							flag_add="true"
						fi
					fi
				done
			fi
			
			# next day repeats
			if [ ! -z "${client_repeats_next_day}" ];then
				repeats_next_day=${client_repeats_next_day// / }
				for week in $repeats_next_day
				do
					if [ "${now_week}" == "${week}" ];then
						if [ "${now_time}" -gt "${time_begin_next_day}" -a "${now_time}" -lt "${time_end_next_day}" ]; then
							flag_add="true"
						fi
					fi
				done
			fi

			# add rules
			if [ "${client_status}" == "off" -a "${flag_add}" == "true" ]; then
				fw s_add 4 m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac" }
				uci set client_mgmt.$key.status="on"
			fi
			# del rules
			if [ "${client_status}" == "on" -a "${flag_add}" == "false" ]; then
				fw s_del 4 m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac" }
				uci set client_mgmt.$key.status="off"

				# no repeats
				if [ -z "${client_repeats}" -a -z "${client_repeats_next_day}" ];then
					if [ -z "${client_slots_next_day}" ];then
						uci set client_mgmt.$key.no_repeat_exec=""
					else
						#no repeats next day
						local tmp_start=`expr $time_end_next_day - 1`
						local tmp_end=`expr $time_end_next_day + 1`
						if [ "${now_time}" -gt "${tmp_start}" -a "${now_time}" -lt "${tmp_end}" ]; then
							uci set client_mgmt.$key.no_repeat_exec=""
						fi
					fi	
				fi
			fi
			
		else
			if [ "${now}" -gt "${client_prio_time}" ]; then
				fw s_del 4 m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac" }
			else
				append new_macs $mac 
			fi
		fi
	done

	uci commit 
	
	if [ "${new_macs}" != "${old_macs}" ];then
		uci_toggle_state qos_v2 core check_time "${new_macs}"
	fi
	
	if [ -z "${new_macs}" ];then
		uci_revert_state qos_v2 core check_time
		sed -i "/^${crontab_cmd}/d" /etc/crontabs/root 
		/etc/init.d/cron restart &
	fi
}

