# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh

tc_d(){
    #echo "tc $@" > /dev/console
    tc $@
}

tmctl_d(){
    #echo "tmctl $@" > /dev/console
    tmctl $@
}

bs_d(){
    #echo "bs $@" > /dev/console
    bs $@
}

crontab_cmd="\* \* \* \* \* \/sbin\/qos_check"
qos_schedule_support=$(uci get profile.@qos[0].qos_schedule_support -c "/etc/profile.d" -q)
#for bcm, HQoS support
bcm_hqos_support=$(uci get profile.@qos[0].bcm_hqos_support -c "/etc/profile.d" -q)
bcm_hqos_downlink_enable="yes"

remove_guest_mark="-m mark ! --mark 0x60/0xfff0 -m mark ! --mark 0x80/0xfff0 -m mark ! --mark 0xa0/0xfff0 -m mark ! --mark 0xc0/0xfff0"

#local ifaces="mobile wan"
ifaces="wan"
lanDev="br-lan"
[ -e /proc/ppa/ ] && {
	lanDev="ifb1"
	accel_handler_load
}
        
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
        string hw_thresh		"1000" \
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
    #for bcm, HQoS support
    bcm_hqos_support=$(uci get profile.@qos[0].bcm_hqos_support -c "/etc/profile.d" -q)
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        local wan_type=$(uci get network.wan.wan_type)
        bcm_hqos_downlink_enable="yes"
        #pptp and l2tp traffic go to HTB
        if [[ "$wan_type" == "pptp" -o "$wan_type" == "l2tp" ]]; then
            bcm_hqos_downlink_enable="no"
        fi
    fi

    if [[ x"$(uci_get_state qos_v2 core)" != x"qos_v2" ]]; then
        uci_set_state qos_v2 core "" qos_v2
    fi
    
    fw_config_once fw_load_global global 
}

fw_rule_exit(){
    #fw flush i m zone_lan_qos
    #fw flush i m zone_wan_qos
    
    fw flush i m qos_lan_rule
    fw del i m zone_lan_qos qos_lan_rule
    fw del i m qos_lan_rule

    fw flush i m qos_lan_HIGH
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw del i m zone_lan_qos qos_lan_HIGH { "-m connmark --mark 0x0030/0xfff0" }
    else
        fw del i m zone_lan_qos qos_lan_HIGH { "-m connmark --mark 0x0010/0xfff0" }
    fi
    fw del i m qos_lan_HIGH
    
    fw flush i m qos_lan_LOW
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw del i m zone_lan_qos qos_lan_LOW { "-m connmark --mark 0x0020/0xfff0" }
    else
        fw del i m zone_lan_qos qos_lan_LOW { "-m connmark --mark 0x0030/0xfff0" }
    fi
    fw del i m zone_lan_qos qos_lan_LOW
    fw del i m qos_lan_LOW
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw flush i m qos_lan_SUPER
        fw del i m zone_lan_qos qos_lan_SUPER { "-m connmark --mark 0x0010/0xfff0" }
        fw del i m qos_lan_SUPER
    fi

    fw flush i m qos_wan_HIGH
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw del i m zone_wan_qos qos_wan_HIGH { "-m connmark --mark 0x0030/0xfff0" }
    else
        fw del i m zone_wan_qos qos_wan_HIGH { "-m connmark --mark 0x0010/0xfff0" }
    fi
    fw del i m qos_wan_HIGH
    
    fw flush i m qos_wan_LOW
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw del i m zone_wan_qos qos_wan_LOW { "-m connmark --mark 0x0020/0xfff0" }
    else
        fw del i m zone_wan_qos qos_wan_LOW { "-m connmark --mark 0x0030/0xfff0" }
    fi
    fw del i m zone_wan_qos qos_wan_LOW
    fw del i m qos_wan_LOW  
}

fw_rule_load() {
    fw add i m qos_lan_HIGH
    fw add i m qos_lan_LOW
    fw add i m qos_lan_rule

    fw add i m qos_wan_HIGH
    fw add i m qos_wan_LOW

    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        local lan_target="MARK --set-xmark 0x3/0x7"
        local conn_target="CONNMARK --set-xmark 0x0030/0xfff0"
        local wan_target="MARK --set-xmark 0x18000010/0xf8000010"
    else
        local lan_target="MARK --set-xmark 0x0010/0xfff0"
        local conn_target="CONNMARK --set-xmark 0x0010/0xfff0"
        local wan_target="MARK --set-xmark 0x0020/0xfff0"
    fi

    fw s_add i m qos_lan_HIGH "$lan_target"
    fw s_add i m qos_lan_HIGH "$conn_target"
    fw s_add i m qos_lan_HIGH ACCEPT
    fw s_add i m qos_wan_HIGH "$wan_target"
    fw s_add i m qos_wan_HIGH ACCEPT

    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        lan_target="MARK --set-xmark 0x2/0x7"
        conn_target="CONNMARK --set-xmark 0x0020/0xfff0"
        wan_target="MARK --set-xmark 0x08000010/0xf8000010"
    else
        lan_target="MARK --set-xmark 0x0030/0xfff0"
        conn_target="CONNMARK --set-xmark 0x0030/0xfff0"
        wan_target="MARK --set-xmark 0x0040/0xfff0"
    fi

    fw s_add i m qos_lan_LOW "$lan_target"
    fw s_add i m qos_lan_LOW "$conn_target"
    fw s_add i m qos_lan_LOW ACCEPT
    fw s_add i m qos_wan_LOW "$wan_target"
    fw s_add i m qos_wan_LOW ACCEPT
	
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
	lan_target="MARK --set-xmark 0x7/0x7"
	conn_target="CONNMARK --set-xmark 0x0010/0xfff0"
	
	fw add i m qos_lan_SUPER
	
	fw s_add i m qos_lan_SUPER "$lan_target"
	fw s_add i m qos_lan_SUPER "$conn_target"
	fw s_add i m qos_lan_SUPER ACCEPT
    fi

    # wan rules, low is default
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw s_add i m zone_wan_qos qos_wan_HIGH { "-m connmark --mark 0x0030/0xfff0" }
        fw s_add i m zone_wan_qos qos_wan_LOW { "-m connmark --mark 0x0020/00xfff0" }
    else
        fw s_add i m zone_wan_qos qos_wan_HIGH { "-m connmark --mark 0x0010/0xfff0" }
        fw s_add i m zone_wan_qos qos_wan_LOW { "-m connmark --mark 0x0030/0xfff0" }
    fi

    # lan rules, to avoid second match
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw s_add i m zone_lan_qos qos_lan_SUPER { "-m connmark --mark 0x0010/0xfff0" }
        fw s_add i m zone_lan_qos qos_lan_HIGH { "-m connmark --mark 0x0030/0xfff0" }
        fw s_add i m zone_lan_qos qos_lan_LOW { "-m connmark --mark 0x0020/0xfff0" }
    else
        fw s_add i m zone_lan_qos qos_lan_HIGH { "-m connmark --mark 0x0010/0xfff0" }
        fw s_add i m zone_lan_qos qos_lan_LOW { "-m connmark --mark 0x0030/0xfff0" }
    fi
    fw s_add i m zone_lan_qos qos_lan_rule
	
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        fw_load_super_traffic
    fi

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
    fw s_add i m zone_lan_qos qos_lan_LOW
    fw s_add i m zone_wan_qos qos_wan_LOW
}

fw_exit_qos(){
    if [[ x"$(uci_get_state qos_v2 core)" != x"qos_v2" ]]; then
        uci_set_state qos_v2 core "" qos_v2
    fi

    if [[ x"$(uci_get_state qos_v2 core loaded)" == x1 ]]; then
        #for bcm, HQoS support
        bcm_hqos_support=$(uci get profile.@qos[0].bcm_hqos_support -c "/etc/profile.d" -q)
        if [[ "${bcm_hqos_support}" == "yes" ]]; then
            if [[ x"$(uci_get_state qos_v2 core bcm_hqos_loaded)" != x1 ]]; then
                bcm_hqos_support="no"
            else
                if [[ x"$(uci_get_state qos_v2 core bcm_hqos_downlink_loaded)" == x1 ]]; then
                    bcm_hqos_downlink_enable="yes"
                fi
            fi
        fi

        fw_rule_exit
        fw_tc_stop $@

        uci_revert_state qos_v2 core loaded
		uci_revert_state qos_v2 core check_time
        uci_set_state qos_v2 core loaded 0
		
        #for bcm, HQoS support
        if [[ "${bcm_hqos_support}" == "yes" ]]; then
            uci_revert_state qos_v2 core bcm_hqos_loaded
            uci_set_state qos_v2 core bcm_hqos_loaded 0
            if [[ "${bcm_hqos_downlink_enable}" == "yes" ]]; then
                uci_revert_state qos_v2 core bcm_hqos_downlink_loaded
                uci_set_state qos_v2 core bcm_hqos_downlink_loaded 0
            fi
        fi
    else
        fw_tc_stop $@
    fi
}

fw_load_global() {

    fw_config_get_global "$1"
    local release=$(uname -r)
	local wan_type=$(uci get network.wan.wan_type)
    if [[ x"$(uci_get_state qos_v2 core loaded)" != x1 ]]; then
        if [[ "$global_enable" == "on" ]]; then
            syslog $LOG_INF_FUNCTION_ENABLE

            if [[ -n "$global_up_band" -a -n "$global_down_band" ]]; then
                fw_tc_start
            fi

            fw_rule_load

            uci_revert_state qos_v2 core loaded
            uci_set_state qos_v2 core loaded 1
			
            #for bcm, HQoS support
            if [[ "${bcm_hqos_support}" == "yes" ]]; then
                uci_revert_state qos_v2 core bcm_hqos_loaded
                uci_set_state qos_v2 core bcm_hqos_loaded 1
                if [[ "${bcm_hqos_downlink_enable}" == "yes" ]]; then
                    uci_revert_state qos_v2 core bcm_hqos_downlink_loaded
                    uci_set_state qos_v2 core bcm_hqos_downlink_loaded 1
                fi
            else
                uci_revert_state qos_v2 core bcm_hqos_loaded
                uci_set_state qos_v2 core bcm_hqos_loaded 0
            fi
            
            qos_enable_accel_support
        else
            syslog $LOG_INF_FUNCTION_DISABLE
            uci_revert_state qos_v2 core loaded
			uci_revert_state qos_v2 core check_time
            uci_set_state qos_v2 core loaded 0
			
            #for bcm, HQoS support
            uci_revert_state qos_v2 core bcm_hqos_loaded
            uci_set_state qos_v2 core bcm_hqos_loaded 0

            qos_disable_accel_support
        fi
    fi    
}

get_max_wan_speed() {
	local wan_sec=$(uci get switch.wan.switch_port -q)
	local portspeed=1000

	if [ -n "${wan_sec}" ]; then
		portspeed=$(uci get switch.${wan_sec}.portspeed -q)
		portspeed=$(echo $portspeed | egrep -o "[0-9\.]+.")
	else
		portspeed=$(uci get profile.@qos_v2[0].max_wan_speed -c "/etc/profile.d" -q)
	fi

	if [ -z "$portspeed" ]; then
		portspeed=1000
	fi

	echo $(($portspeed * 1000))
}

fw_tc_start() {
    local all_percent=$((${global_high}+${global_low}))
    global_high=$((${global_high}*100/${all_percent}))
    global_low=$((${global_low}*100/${all_percent}))
	
    local weight_high
    local weight_low

    # paras
    if [[ -n "$global_rUpband" ]]; then
        global_up_band=$((global_rUpband))
    elif [[ "$global_up_unit" == "mbps" ]]; then
        global_up_band=$((global_up_band*1000))
    fi
    local uplink=$((${global_percent}*${global_up_band}/100))
    local uplink_hqos=${uplink}
    
    if [[ -n "$global_rDownband" ]]; then
        global_down_band=$((global_rDownband))
    elif [[ "$global_down_unit" == "mbps" ]]; then
        global_down_band=$((global_down_band*1000))
    fi
    local downlink=$((${global_percent}*${global_down_band}/100))
    local downlink_hqos=$((${downlink}*1000))
	
    #for bcm, downlink HQoS enable
    if [[ "$downlink" -le $((${global_hw_thresh} * 1000)) ]]; then
        bcm_hqos_downlink_enable="no"
    fi

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

        local max_wan_speed=$(get_max_wan_speed)
        up_iface_burst=$(burst__calc ${max_wan_speed})
        down_iface_burst=$(burst__calc ${max_wan_speed})
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

    # when the integer division result is 0, deal with this situation
    if [ ${uplink} -le 0 ]; then
        uplink=1
    fi
    if [ ${downlink} -le 0 ]; then
        downlink=1
    fi
    if [ ${uplink_hqos} -le 0 ]; then
        uplink_hqos=1
    fi
    if [ ${downlink_hqos} -le 0 ]; then
        downlink_hqos=1000
    fi
    if [ ${up_high} -le 0 ]; then
        up_high=1
    fi
    if [ ${up_low} -le 0 ]; then
        up_low=1
    fi
    if [ ${down_high} -le 0 ]; then
        down_high=1
    fi
    if [ ${down_low} -le 0 ]; then
        down_low=1
    fi
	
    uplink="$uplink""kbit"
    downlink="$downlink""kbit"

    up_high="$up_high""kbit"
    up_low="$up_low""kbit"

    down_high="$down_high""kbit"
    down_low="$down_low""kbit"

    # add tc root
    fw_add_tc_root
	
    for i in $ifaces; do
        #local wan_ifname=$(uci get network.$i.ifname)
        local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
        [ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
        [ -z $wan_ifname ] && {
            continue
        }
        # uplink
        #for bcm, HQoS support
        if [[ "${bcm_hqos_support}" == "yes" ]]; then
            local qsize=682
            local sp_max_speed=$((${uplink_hqos}/2))
			weight_high=63
			weight_low=$((${weight_high}*${global_low}/${global_high}))
            
            #traffic management
            #2 WRR queues(others not used), weight range 1~63
            #1 SP queue(others not used), half of the uplink bandwidth as speed limit
            tmctl_d porttminit --devtype 0 --if $wan_ifname --flag 0 --numqueues 8
            #set WRR mode
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 0 --priority 0 --qsize ${qsize} --weight 1 --schedmode 2 --shapingrate 0 --burstsize 0 --minrate 0
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 1 --priority 0 --qsize ${qsize} --weight 1 --schedmode 2 --shapingrate 0 --burstsize 0 --minrate 0
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 2 --priority 0 --qsize ${qsize} --weight ${weight_low} --schedmode 2 --shapingrate 0 --burstsize 0 --minrate 0
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 3 --priority 0 --qsize ${qsize} --weight ${weight_high} --schedmode 2 --shapingrate 0 --burstsize 0 --minrate 0
            #set SP mode
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 4 --priority 4 --qsize ${qsize} --weight 1 --schedmode 1 --shapingrate 0 --burstsize 0 --minrate 0
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 5 --priority 5 --qsize ${qsize} --weight 1 --schedmode 1 --shapingrate 0 --burstsize 0 --minrate 0
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 6 --priority 6 --qsize ${qsize} --weight 1 --schedmode 1 --shapingrate 0 --burstsize 0 --minrate 0
            tmctl_d setqcfg --devtype 0 --if $wan_ifname --qid 7 --priority 7 --qsize ${qsize} --weight 1 --schedmode 1 --shapingrate ${sp_max_speed} --burstsize 0 --minrate 0
            #set port shaper
            tmctl_d setportshaper --devtype 0 --if $wan_ifname --shapingrate ${uplink_hqos} --burstsize 0 --minrate 0
        else
            # mark uplink high: 0010
            # mark uplink low:  0020
            
            tc_d class add dev $wan_ifname parent 1:1 classid 1:2 htb rate "$uplink" ceil "$uplink" $up_burst quantum 1500
            
            tc_d class add dev $wan_ifname parent 1:2 classid 1:0010 htb rate "$up_high" ceil "$uplink" $u_hi_burst quantum 1500 prio 0
            tc_d qdisc add dev $wan_ifname parent 1:0010 handle 0010: sfq perturb 10

            tc_d class add dev $wan_ifname parent 1:2 classid 1:0030 htb rate "$up_low" ceil "$uplink" $u_lo_burst quantum 1500 prio 2
            tc_d qdisc add dev $wan_ifname parent 1:0030 handle 0030: sfq perturb 10

            # filter
            tc_d filter add dev $wan_ifname parent 1:0 protocol all prio 1 handle 0x0010/0xfff0 fw classid 1:0010
            tc_d filter add dev $wan_ifname parent 1:0 protocol all prio 1 handle 0x0030/0xfff0 fw classid 1:0030
        fi
    done

    # downlink
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" -a "${bcm_hqos_downlink_enable}" == "yes" ]]; then
        local threshold=1047552
		weight_high=63
		weight_low=$((${weight_high}*${global_low}/${global_high}))
        
        #service queue
        #2 WRR queues(others not used), weight range 1~63
        bs_d /bdmf/new egress_tm/dir=ds,level=queue,mode=wrr,service_queue={enable=true},num_queues=8,rl={af=${downlink_hqos},be=0,burst=0},rl_rate_mode=single_rate

        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[0]={drop_threshold=${threshold},queue_id=0,weight=1,rl={af=0,be=0,burst=0}}
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[1]={drop_threshold=${threshold},queue_id=1,weight=${weight_low},rl={af=0,be=0,burst=0}}
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[2]={drop_threshold=${threshold},queue_id=2,weight=1,rl={af=0,be=0,burst=0}}
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[3]={drop_threshold=${threshold},queue_id=3,weight=${weight_high},rl={af=0,be=0,burst=0}}
        
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[4]={drop_threshold=${threshold},queue_id=4,weight=1,rl={af=0,be=0,burst=0}}
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[5]={drop_threshold=${threshold},queue_id=5,weight=1,rl={af=0,be=0,burst=0}}
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[6]={drop_threshold=${threshold},queue_id=6,weight=1,rl={af=0,be=0,burst=0}}
        bs_d /b/c egress_tm/dir=ds,index=2 queue_cfg[7]={drop_threshold=${threshold},queue_id=7,weight=1,rl={af=0,be=0,burst=0}}
    fi
    # mark uplink high: 0030
    # mark uplink low:  0040
    tc_d class add dev $lanDev parent 2:1 classid 2:2 htb rate "$downlink" ceil "$downlink" $down_burst quantum 1500

    tc_d class add dev $lanDev parent 2:2 classid 2:0020 htb rate "$down_high" ceil "$downlink" $d_hi_burst quantum 1500 prio 0
    tc_d qdisc add dev $lanDev parent 2:0020 handle 0020: sfq perturb 10

    tc_d class add dev $lanDev parent 2:2 classid 2:0040 htb rate "$down_low" ceil "$downlink" $d_lo_burst quantum 1500 prio 2
    tc_d qdisc add dev $lanDev parent 2:0040 handle 0040: sfq perturb 10

    # filter
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        tc_d filter add dev $lanDev parent 2:0 protocol all prio 1 handle 0x18000010/0xf8000010 fw classid 2:0020
        tc_d filter add dev $lanDev parent 2:0 protocol all prio 1 handle 0x08000010/0xf8000010 fw classid 2:0040
    else
        tc_d filter add dev $lanDev parent 2:0 protocol all prio 1 handle 0x0020/0xfff0 fw classid 2:0020
        tc_d filter add dev $lanDev parent 2:0 protocol all prio 1 handle 0x0040/0xfff0 fw classid 2:0040
    fi
}

#for bcm, HQoS support
tm_port_init(){
    local if="$1"
    local qsize=682

    tmctl_d porttminit --devtype 0 --if ${if} --flag 0x0100 

    for qid in `seq 0 7`; do
        tmctl_d setqcfg --devtype 0 --if ${if} --qid ${qid} --priority ${qid} --qsize ${qsize} --weight 0 --schedmode 1 --shapingrate 0 --burstsize 0 --minrate 0
    done
}

fw_tc_stop(){
    # del uplink
    for i in $ifaces; do
        #local wan_ifname=$(uci get network.$i.ifname)
        local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
        [ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
        [ -z $wan_ifname ] && {
            continue
        }
        
        #for bcm, HQoS support
        if [[ "${bcm_hqos_support}" == "yes" ]]; then
            tmctl_d porttmuninit --devtype 0 --if $wan_ifname --flag 0
            tm_port_init $wan_ifname
        else
            tc_d filter del dev $wan_ifname parent 1:0 protocol all prio 1 handle 0x0010/0xfff0 fw classid 1:10
            tc_d filter del dev $wan_ifname parent 1:0 protocol all prio 1 handle 0x0030/0xfff0 fw classid 1:30
            tc_d class del dev $wan_ifname parent 1:2 classid 1:10
            tc_d class del dev $wan_ifname parent 1:2 classid 1:30
            
            tc_d class del dev $wan_ifname parent 1:1 classid 1:2
        fi
    done

    # del downlink
    #for bcm, HQoS support
    if [[ "${bcm_hqos_support}" == "yes" -a "${bcm_hqos_downlink_enable}" == "yes" ]]; then
        bs_d /bdmf/Delete egress_tm/dir=ds,index=2
    fi
	
    if [[ "${bcm_hqos_support}" == "yes" ]]; then
        tc_d filter del dev $lanDev parent 2:0 protocol all prio 1 handle 0x18000010/0xf8000010 fw classid 2:20
        tc_d filter del dev $lanDev parent 2:0 protocol all prio 1 handle 0x08000010/0xf8000010 fw classid 2:40
    else
        tc_d filter del dev $lanDev parent 2:0 protocol all prio 1 handle 0x0020/0xfff0 fw classid 2:20
        tc_d filter del dev $lanDev parent 2:0 protocol all prio 1 handle 0x0040/0xfff0 fw classid 2:40
    fi
    tc_d class del dev $lanDev parent 2:2 classid 2:20
    tc_d class del dev $lanDev parent 2:2 classid 2:40

    tc_d class del dev $lanDev parent 2:1 classid 2:2
    
    # del root
    fw_del_tc_root $@
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
			fw s_add i m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $client_mac $remove_guest_mark" }
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
				fw s_add i m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $client_mac $remove_guest_mark" }
			fi
		fi
	fi
}

#for bcm, HQoS support
fw_load_super_traffic() {
	#ICMP
    fw s_add 4 m qos_lan_rule qos_lan_SUPER { "-p icmp" }
	
	#TCP ack(no payload), Not sure of the benefits, temporarily disabled
	#fw s_add 4 m qos_lan_rule qos_lan_SUPER { "-p tcp --tcp-flags ALL ACK -m length --length :60" }
	
	#Web service
	fw s_add 4 m qos_lan_rule qos_lan_SUPER { "-p tcp -m multiport --dport 80,443" }
	
	#TBD:Key apps or other high value but low load traffic
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
				fw s_add i m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac $remove_guest_mark" }
				conntrack -U --mark 0x0/0xfff0
				
				uci set client_mgmt.$key.status="on"
			fi
			# del rules
			if [ "${client_status}" == "on" -a "${flag_add}" == "false" ]; then
				fw s_del i m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac $remove_guest_mark" }
				conntrack -U --mark 0x0/0xfff0
				
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
				fw s_del i m qos_lan_rule qos_lan_HIGH { "-m mac --mac-source $mac $remove_guest_mark" }
				conntrack -U --mark 0x0/0xfff0
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

is_del_tc_root_qos() {
    local qos_enable=$(uci get qos_v2.settings.enable)
    if [ "${qos_enable}" == "on" ] ; then
        echo "is_del_tc_root_qos return 0"
        return 0
    else
        echo "is_del_tc_root_qos return 1"
        return 1
    fi
}

fw_add_tc_root() {
    local is_add_tc_support="false"
    local wan_rule_root=$(tc qdisc | grep "htb 1:")
    local lan_rule_root=$(tc qdisc | grep "htb 2:")

    # add tc support
    if [ -z "${wan_rule_root}" -a -z "${lan_rule_root}" ] ; then
        add_tc_support
    fi

    # calculate the rate parameters of the root
    local qos_enable=$(uci get qos_v2.settings.enable)
    local uplink downlink
    local up_iface_burst down_iface_burst
    local up_burst down_burst
    fw_config_get_global global

    local max_wan_speed=$(get_max_wan_speed)

    if [ "${qos_enable}" == "on" ]; then
        if [[ -n "$global_rUpband" ]]; then
            global_up_band=$((global_rUpband))
        elif [[ "$global_up_unit" == "mbps" ]]; then
            global_up_band=$((global_up_band*1000))
        fi
        uplink=$((${global_percent}*${global_up_band}/100))
        
        if [[ -n "$global_rDownband" ]]; then
            global_down_band=$((global_rDownband))
        elif [[ "$global_down_unit" == "mbps" ]]; then
            global_down_band=$((global_down_band*1000))
        fi
        downlink=$((${global_percent}*${global_down_band}/100))

        # Calculate the burst and cburst parameters for HTB 
        # Added by Jason Guo<guodongxian@tp-link.net>, 20140729 
        local hz=$(cat /proc/net/psched|awk -F ' ' '{print $4}')
        [ "$hz" == "3b9aca00" ] && {
            burst__calc() {
                local b=$((${1} * 1000 / 8 / 100))
                b=$((${b} + 1600))
                echo "$b"
            }
            up_burst=$(burst__calc $uplink)
            down_burst=$(burst__calc $downlink)
            up_iface_burst=$(burst__calc ${max_wan_speed})
            down_iface_burst=$(burst__calc ${max_wan_speed})
            param__convert() {
                local p=
                [ -n "$1" -a -n "$2" ] && {
                    p="burst $1 cburst $2"
                }
                echo "$p"        
            }
            up_burst=$(param__convert $up_burst $up_burst)
            down_burst=$(param__convert $down_burst $down_burst)
            up_iface_burst=$(param__convert $up_iface_burst $up_iface_burst)
            down_iface_burst=$(param__convert $down_iface_burst $down_iface_burst)
        }
        # when the integer division result is 0, deal with this situation
        if [ ${uplink} -le 0 ]; then
            uplink=1
        fi
        if [ ${downlink} -le 0 ]; then
            downlink=1
        fi
    else
        uplink=${max_wan_speed}
        downlink=${max_wan_speed}
    fi
    uplink="$uplink""kbit"
    downlink="$downlink""kbit"

    # wan, if the tc root already exists, only adjust the bandwidth size of the root queue
    if [ -z "${wan_rule_root}" ] ; then
        for i in $ifaces; do
            #local wan_ifname=$(uci get network.$i.ifname)
            local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
            [ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
            [ -z $wan_ifname ] && {
                continue
            }
            # uplink
            tc_d qdisc add dev $wan_ifname root handle 1: htb default 11
            tc_d class add dev $wan_ifname parent 1: classid 1:1 htb rate "$uplink" ceil "$uplink" $up_burst quantum 1500
            tc_d class add dev $wan_ifname parent 1: classid 1:11 htb rate ${max_wan_speed}kbit ceil ${max_wan_speed}kbit $up_iface_burst quantum 1500 prio 3
            tc_d qdisc add dev $wan_ifname parent 1:11 handle 11: sfq perturb 10
        done
    else
    	for i in $ifaces; do
            #local wan_ifname=$(uci get network.$i.ifname)
            local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
            [ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
            [ -z $wan_ifname ] && {
                continue
            }
            # uplink
            tc_d class replace dev $wan_ifname parent 1: classid 1:1 htb rate "$uplink" ceil "$uplink" $up_burst quantum 1500
        done
    fi
    
    # lan, if the tc root already exists, only adjust the bandwidth size of the root queue
    if [ -z "${lan_rule_root}" ] ; then
        # downlink
        tc_d qdisc add dev $lanDev root handle 2: htb default 11
        tc_d class add dev $lanDev parent 2: classid 2:1 htb rate "$downlink" ceil "$downlink" $down_burst quantum 1500
        tc_d class add dev $lanDev parent 2: classid 2:11 htb rate ${max_wan_speed}kbit ceil ${max_wan_speed}kbit $down_iface_burst quantum 1500 prio 3
        tc_d qdisc add dev $lanDev parent 2:11 handle 11: sfq perturb 10
    else
        tc_d class replace dev $lanDev parent 2: classid 2:1 htb rate "$downlink" ceil "$downlink" $down_burst quantum 1500
    fi
}

fw_del_tc_root() {
    #qos
    local support_qos="yes"
    local delroot_qos="true"
    if [ "${support_qos}" == "yes" ] ; then
        is_del_tc_root_qos
        if [ $? == 0 ] ; then
            delroot_qos="false"
        fi
    fi
    
    # ffs
    local support_ffs=$(uci get profile.@wireless[0].ffs -c /etc/profile.d/ -q)
    local delroot_ffs="true"    
    if [ "${support_ffs}" == "yes" ] ; then 
        . /lib/ffs/ffs_core.sh
        is_del_tc_root_ffs
        if [ $? == 0 ] ; then
            delroot_ffs="false"
        fi
    fi

    # guestnetwork_bandwidth
    local support_guestnetwork_bandwidth=$(uci get profile.@wireless[0].guestnetwork_bandwidth_ctrl_support -c /etc/profile.d/ -q)
    local delroot_guestnetwork_bandwidth="true"
    if [ "${support_guestnetwork_bandwidth}" == "yes" ] ; then
        . /lib/guestnetwork_bandwidth_ctrl/gbc_core.sh
        is_del_tc_root_guestnetwork_bandwidth
        if [ $? == 0 ] ; then
            delroot_guestnetwork_bandwidth="false"
        fi
    fi

    # client speed limit
    local support_client_speed_limit=$(uci get profile.@client_speed_limit[0].support -c /etc/profile.d/ -q)
    local delroot_client_speed_limit="true"
    if [ "${support_client_speed_limit}" == "yes" ] ; then
        . /lib/client_speed_limit/csl_core.sh
        is_del_tc_root_client_speed_limit
        if [ $? == 0 ] ; then
            delroot_client_speed_limit="false"
        fi
    fi

    echo "[del_tc_root] ${delroot_qos} ${delroot_ffs} ${delroot_guestnetwork_bandwidth} ${delroot_client_speed_limit}" > /dev/console
    
    [ x"$1" == x"FORCE" ] || [ "${delroot_qos}" == "true" -a "${delroot_ffs}" == "true" -a "${delroot_guestnetwork_bandwidth}" == "true" -a "${delroot_client_speed_limit}" == "true" ] && {
        echo "[del_tc_root] input: $@" > /dev/console
        for i in $ifaces; do
            #local wan_ifname=$(uci get network.$i.ifname)
            local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
            [ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
            [ -z $wan_ifname ] && {
                continue
            }
            tc_d qdisc del dev "$wan_ifname" root
        done
        
        tc_d qdisc del dev "$lanDev" root
        del_tc_support
    }
}

qos_enable_accel_support() {
    # for brcm qos support
    if [[ -f /lib/modules/iplatform/qos_kctl.ko ]]; then
        if [[ x"${bcm_hqos_support}" == x"yes" ]]; then
            #for bcm, HQoS support
            local up_sqos=0
            local down_sqos=1
            local up_hqos=1
            local down_hqos=0
            [[ x"${bcm_hqos_downlink_enable}" == x"yes" ]] && {
                down_hqos=1
            }
        
            grep qos_kctl /proc/modules && rmmod qos_kctl.ko
            insmod /lib/modules/iplatform/qos_kctl.ko up_sqos=${up_sqos} up_hqos=${up_hqos} down_sqos=${down_sqos} down_hqos=${down_hqos}
        else
            grep qos_kctl /proc/modules || insmod /lib/modules/iplatform/qos_kctl.ko
        fi

        # brcm speedtest hw accel support: stop when qos on
        if [[ -f /lib/modules/iplatform/spt_kctl.ko ]]; then
            grep spt_kctl /proc/modules && rmmod spt_kctl
        fi
    fi
}

add_tc_support() {
    # modules
    local release=$(uname -r)
    insmod /lib/modules/"$release"/sch_htb.ko
    insmod /lib/modules/"$release"/sch_sfq.ko
    insmod /lib/modules/"$release"/cls_fw.ko
    
    # for brcm rest wl1 affinity
    if [[ -f /etc/init.d/bcm_cpu_affinity ]]; then
        /etc/init.d/bcm_cpu_affinity start
    fi

    local qos_enable=$(uci get qos_v2.settings.enable)
    if [ "${qos_enable}" == "on" ] ; then
        qos_enable_accel_support
    fi
    
    # for Intel qos support
    [ -e /proc/ppa ] && {
        ppacmd delsession -a all
    }
    accel_handler_load
}

qos_disable_accel_support() {
    # for brcm qos support
    if [[ -f /lib/modules/iplatform/qos_kctl.ko ]]; then
        #for bcm, HQoS support
        #if [[ "${bcm_hqos_support}" != "yes" -o "${bcm_hqos_downlink_enable}" != "yes" ]]; then
            grep qos_kctl /proc/modules && rmmod qos_kctl
        #fi
		
        # brcm speedtest hw accel support: enable when qos off
        if [[ -f /lib/modules/iplatform/spt_kctl.ko ]]; then
            grep spt_kctl /proc/modules || insmod /lib/modules/iplatform/spt_kctl.ko
        fi
    fi
}

del_tc_support() {
    rmmod cls_fw.ko
    rmmod sch_sfq.ko
    rmmod sch_htb.ko

    local qos_enable=$(uci get qos_v2.settings.enable)
    if [ "${qos_enable}" != "on" ] ; then
        qos_disable_accel_support
    fi

    # for brcm rest wl1 affinity
    if [[ -f /etc/init.d/bcm_cpu_affinity ]]; then
        /etc/init.d/bcm_cpu_affinity start
    fi
    accel_handler_exit
}
