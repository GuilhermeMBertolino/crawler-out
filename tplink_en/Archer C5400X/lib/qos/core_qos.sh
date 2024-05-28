# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh

tc_d(){
	#echo "tc $@" > /dev/console
	#tc $@ delete by wanghao, we use TM-TC now.
	return
}

local dscp=$(uci get profile.@qos[0].dscp_support -c "/etc/profile.d")

fw_config_get_global(){
	if [ "$dscp" == "yes" ]; then
		fw_config_get_section "$1" global { \
			string enable           "off" \
			string up_band          "" \
			string down_band        "" \
			string high             "60" \
			string middle           "30" \
			string low              "10" \
			string percent          "92" \
			string up_unit          "mbps" \
			string down_unit        "mbps" \
			string rUpband		"" \
			string rDownband	"" \
		} || return   
	else
		fw_config_get_section "$1" global { \
			string enable           "off" \
			string up_band          "" \
			string down_band        "" \
			string high             "60" \
			string middle           "30" \
			string low              "10" \
			string percent          "92" \
			string up_unit          "mbps" \
			string down_unit        "mbps" \
			string rUpband		"" \
			string rDownband	"" \
		} || return   
	fi
}

fw_config_get_rule(){
    fw_config_get_section "$1" rule { \
        string enable           "" \
        string name             "" \
        string mac              "" \
        string proto            "" \
        string port             "" \
        string ipaddr           "" \
        string phy              "" \
        string priority         "" \
        string app              "" \
        string type             "" \
    } || return
}

fw_config_get_queue(){
    fw_config_get_section "$1" queue {\
        string enable              "on"\
        string qMinRate         ""\
        string qMaxRate        ""\
        string qName             ""\
    } || return
}

fw_config_get_dscp_rule(){
    fw_config_get_section "$1" dscprule {\
        string queueName     ""\
        string qCOS                 ""\
        string DSCPNumber    ""\
    } || return
}





fw_load_dscp_qos(){
    if [[ x"$(uci_get_state qos core)" != x"qos" ]]; then
        uci_set_state qos core "" qos
        uci_set_state qos wan  "" sb
    fi
    fw_config_once fw_load_global_dscp global 
}
fw_exit_dscp_qos(){
    if [[ x"$(uci_get_state qos core)" != x"qos" ]]; then
        uci_set_state qos core "" qos
        uci_set_state qos wan  "" sb
    fi
    if [[ x"$(uci_get_state qos core loaded)" == x1 ]]; then
        local by_phy=$(uci get profile.@qos[0].by_phy -c "/etc/profile.d")
        local by_app=$(uci get profile.@qos[0].by_app -c "/etc/profile.d")

        # fw_unset_netfilter
        fw_rule_exit
        fw_tc_stop
        # rmmod cls_fw.ko
        # rmmod sch_sfq.ko
        # rmmod sch_htb.ko

        uci_revert_state qos core loaded
        uci_set_state qos core loaded 0

		if [[ "$by_phy" == "on" ]]; then
			rmmod appid
		fi

		#if [[ $by_phy == "on" ]]; then
            #fw_unset_switch
            # fw_unset_network  need not to do this
        #fi
    fi
}

fw_exit_qos(){
    if [[ x"$(uci_get_state qos core)" != x"qos" ]]; then
        uci_set_state qos core "" qos
    fi
    if [[ x"$(uci_get_state qos core loaded)" == x1 ]]; then
        local by_phy=$(uci get profile.@qos[0].by_phy -c "/etc/profile.d")
        local by_app=$(uci get profile.@qos[0].by_app -c "/etc/profile.d")

        # fw_unset_netfilter
        fw_rule_exit
        fw_tc_stop
        # rmmod cls_fw.ko
        # rmmod sch_sfq.ko
        # rmmod sch_htb.ko

        uci_revert_state qos core loaded
        uci_set_state qos core loaded 0

	if [[ "$by_phy" == "on" ]]; then
	    rmmod appid
        fi

	#if [[ $by_phy == "on" ]]; then
            #fw_unset_switch
            # fw_unset_network  need not to do this
        #fi
    fi
}

fw_unset_switch() {
    uci delete switch.@switch_vlan[0]
    uci delete switch.@switch_vlan[0]
    uci delete switch.@switch_vlan[0]
    uci delete switch.@switch_vlan[0]
    uci delete switch.@switch_vlan[0]

    uci add switch switch_vlan
    uci add switch switch_vlan

    uci set switch.@switch_vlan[0].ports="$(nvram get vlan1ports)"
    uci set switch.@switch_vlan[0].device="switch0"
    uci set switch.@switch_vlan[0].vlan="1"

    uci set switch.@switch_vlan[1].ports="$(nvram get vlan2ports)"
    uci set switch.@switch_vlan[1].device="switch0"
    uci set switch.@switch_vlan[1].vlan="2"

    uci_commit_flash switch
   
    /etc/init.d/switch restart
}

fw_rule_exit_fast(){
    fw flush 4 m qos_lan_rule
	fw flush 4 m qos_wan_rule
	
	fw flush 4 m qos_lan_lvl_high
	fw flush 4 m qos_wan_lvl_high
	
	fw flush 4 m qos_lan_lvl_middle
	fw flush 4 m qos_wan_lvl_middle
}

fw_rule_exit(){
    fw flush 4 m zone_lan_qos
    fw flush 4 m zone_wan_qos

    fw flush 4 m qos_lan_rule
    fw flush 4 m qos_wan_rule
	
	fw flush 4 m qos_lan_lvl_high
	fw flush 4 m qos_wan_lvl_high
	
	fw flush 4 m qos_lan_lvl_middle
	fw flush 4 m qos_wan_lvl_middle
    
    fw del 4 m qos_lan_rule
    fw del 4 m qos_wan_rule

	fw del 4 m qos_lan_lvl_high
	fw del 4 m qos_wan_lvl_high
	
	fw del 4 m qos_lan_lvl_middle
	fw del 4 m qos_wan_lvl_middle
}

fw_unset_network() {
    uci set network.lan.ifname="eth0.1"
    uci_commit_flash network
    
    /etc/init.d/network reload 
}

fw_set_switch() {
    if [[ x"$(uci get switch.@switch_vlan[0].ports)" != x"5 1" ]]; then
        uci delete switch.@switch_vlan[0]
        uci delete switch.@switch_vlan[0]

        uci add switch switch_vlan
        uci add switch switch_vlan
        uci add switch switch_vlan
        uci add switch switch_vlan
        uci add switch switch_vlan

        uci set switch.@switch_vlan[0].ports="5 1"
        uci set switch.@switch_vlan[0].device="switch0"
        uci set switch.@switch_vlan[0].vlan="1"

        uci set switch.@switch_vlan[1].ports="5 2"
        uci set switch.@switch_vlan[1].device="switch0"
        uci set switch.@switch_vlan[1].vlan="2"

        uci set switch.@switch_vlan[2].ports="5 3"
        uci set switch.@switch_vlan[2].device="switch0"
        uci set switch.@switch_vlan[2].vlan="3"

        uci set switch.@switch_vlan[3].ports="5 4"
        uci set switch.@switch_vlan[3].device="switch0"
        uci set switch.@switch_vlan[3].vlan="4"

        uci set switch.@switch_vlan[4].ports="0 5u"
        uci set switch.@switch_vlan[4].device="switch0"
        uci set switch.@switch_vlan[4].vlan="5"

        uci_commit_flash switch
        /etc/init.d/switch restart
    fi
}

fw_set_network() {
    if [[ x"$(uci get network.lan.ifname)" != x"eth0.1 eth0.2 eth0.3 eth0.4" ]]; then
        uci set network.lan.ifname="eth0.1 eth0.2 eth0.3 eth0.4"
        uci_commit_flash network
	  
        /etc/init.d/network reload
    fi
}

fw_set_netfilter() {
    echo 1 > /sys/class/net/br-lan/bridge/nf_call_iptables
    echo 1 > /sys/class/net/br-lan/bridge/nf_call_ip6tables

    #Notice: S99sysctl revert these values to 0
    echo 1 > /proc/sys/net/bridge/bridge-nf-call-iptables
    echo 1 > /proc/sys/net/bridge/bridge-nf-call-ip6tables
}

fw_unset_netfilter() {
    echo 0 > /sys/class/net/br-lan/bridge/nf_call_iptables
    echo 0 > /sys/class/net/br-lan/bridge/nf_call_ip6tables
    echo 0 > /proc/sys/net/bridge/bridge-nf-call-iptables
    echo 0 > /proc/sys/net/bridge/bridge-nf-call-ip6tables
}

reset_conntrack_mark() {
    conntrack -U -m 0x0/0xffff
}


fw_rule_dscp_load(){
	local lan_list=
	local wan_list=
    local lan_and_target=
    local lan_or_target=
    local wan_and_target=
    local wan_or_target=
	
	#high list
	lan_list="qos_lan_lvl_high"
	wan_list="qos_wan_lvl_high"
	lan_and_target="MARK --and-mark 0x3fc0ffff"
	lan_or_target="MARK --or-mark 0xa0000"
	wan_and_target="MARK --and-mark 0x3fc0ffff"
	wan_or_target="MARK --or-mark 0xa0000"
	
	fw add 4 m "$lan_list"
	fw add 4 m "$wan_list"
	fw s_add 4 m "$lan_list" "$lan_and_target"
	fw s_add 4 m "$lan_list" "$lan_or_target"
	fw s_add 4 m "$lan_list" ACCEPT
	fw s_add 4 m "$wan_list" "$wan_and_target"
	fw s_add 4 m "$wan_list" "$wan_or_target"
	fw s_add 4 m "$wan_list" ACCEPT
	
	#middle list
	lan_list="qos_lan_lvl_middle"
	wan_list="qos_wan_lvl_middle"
	lan_and_target="MARK --and-mark 0x3fc0ffff"
	lan_or_target="MARK --or-mark 0x80000"
	wan_and_target="MARK --and-mark 0x3fc0ffff"
	wan_or_target="MARK --or-mark 0x80000"
	
	fw add 4 m "$lan_list"
	fw add 4 m "$wan_list"
	fw s_add 4 m "$lan_list" "$lan_and_target"
	fw s_add 4 m "$lan_list" "$lan_or_target"
	fw s_add 4 m "$lan_list" ACCEPT
	fw s_add 4 m "$wan_list" "$wan_and_target"
	fw s_add 4 m "$wan_list" "$wan_or_target"
	fw s_add 4 m "$wan_list" ACCEPT
		
	fw add 4 m qos_lan_rule
	fw add 4 m qos_wan_rule

    fw s_add 4 m zone_lan_qos qos_lan_rule
	fw s_add 4 m zone_wan_qos qos_wan_rule

    # set up iptables rules
    config_foreach fw_load_rule rule high
    config_foreach fw_load_rule rule middle
    #config_foreach fw_load_rule rule low
    config_foreach fw_load_dscp_rule dscprule
}



fw_load_global_dscp() {
    fw_config_get_global "$1"

    # check profile
    #local by_phy=$(uci get profile.@qos[0].by_phy -c "/etc/profile.d")
    #local by_app=$(uci get profile.@qos[0].by_app -c "/etc/profile.d")

    if [[ x"$(uci_get_state qos core loaded)" != x1 ]]; then
        if [[ "$global_enable" == "on" ]]; then
            syslog $LOG_INF_FUNCTION_ENABLE


            #if [[ "$by_phy" == "on" ]]; then
                #fw_set_switch
                #fw_set_network  need not to do this
                #[ -n "$rule_phy_on" ] && fw_set_netfilter
            #if
            
            #if [[ "$by_app" == "on" ]]; then
            #   insmod appid
            #   iqos-db-loader /tmp/database.bin
            #fi 
            
            if [[ -n "$global_up_band" -a -n "$global_down_band" ]]; then
                fw_tc_dscp_start
            fi

            fw_rule_dscp_load

            uci_revert_state qos core loaded
            uci_set_state qos core loaded 1
        else
            syslog $LOG_INF_FUNCTION_DISABLE

            uci_revert_state qos core loaded
            uci_set_state qos core loaded 0
        fi
    fi
}




fw_load_queue(){
    fw_config_get_queue "$1"
    
    
    local mark=1101
	local mark2=2101
	local prior=8
    if    [[ "$queue_qName" == "Queue1" ]]; then
        mark=1101
		mark2=2101
		prior=0
    elif [[ "$queue_qName" == "Queue2" ]]; then
        mark=1102
		mark2=2102
		prior=1
    elif [[ "$queue_qName" == "Queue3" ]]; then
        mark=1103
		mark2=2103
		prior=2
    elif [[ "$queue_qName" == "Queue4" ]]; then
        mark=1104
		mark2=2104
		prior=3
    elif [[ "$queue_qName" == "Queue5" ]]; then
        mark=1105
		mark2=2105
		prior=4
    elif [[ "$queue_qName" == "Queue6" ]]; then
        mark=1106
		mark2=2106
		prior=5
    elif [[ "$queue_qName" == "Queue7" ]]; then
        mark=1107
		mark2=2107
		prior=6
    elif [[ "$queue_qName" == "Queue8" ]]; then
        mark=1108
		mark2=2108
		prior=7
    fi

    # Calculate the burst and cburst parameters for HTB 
    # Added by Jason Guo<guodongxian@tp-link.net>, 20140729 
    local hz=$(cat /proc/net/psched|awk -F ' ' '{print $4}')
    local up_burst 
    [ "$hz" == "3b9aca00" ] && {
        burst__calc() {
            local b=$((${1} * 1000 / 8 / 100))
            b=$((${b} + 1600))
            echo "$b"
        }
        up_global_burst=$(burst__calc $global_up_band)
        up_burst=$(burst__calc $queue_qMinRate)
        
        param__convert() {
            local p=
            [ -n "$1" -a -n "$2" ] && {
                p="burst $1 cburst $2"
            }
            echo "$p"        
        }

        up_burst=$(param__convert $up_burst $up_global_burst)
    }

    #echo "queue name "$queue_qName >/dev/console
    #echo "mark is ""$mark" >/dev/console
    #echo "up burst  ""$up_burst" >/dev/console
    #echo "global upband +++  $global_up_band +++" >/dev/console
    #local wan_ifname=$(uci get network.wan.ifname)
	
	#up link
    tc_d class add dev $wan_ifname parent 1:1 classid 1:"$mark" htb rate "$queue_qMinRate""kbit" ceil "$queue_qMaxRate""kbit" $up_burst quantum 1500 prio $prior
    tc_d qdisc add dev $wan_ifname parent 1:"$mark" handle "$mark": sfq perturb 10
    tc_d filter add dev $wan_ifname parent 1:0 protocol ip handle 0x"$mark"/0xffff fw classid 1:"$mark"
	
	#down link
    tc_d class add dev br-lan parent 2:2 classid 2:"$mark2" htb rate "$queue_qMinRate""kbit" ceil "$queue_qMaxRate""kbit" $up_burst quantum 1500 prio $prior
    tc_d qdisc add dev br-lan parent 2:"$mark2" handle "$mark2": sfq perturb 10
    tc_d filter add dev br-lan parent 2:0 protocol ip handle 0x"$mark2"/0xffff fw classid 2:"$mark2"
}

fw_load_dscp_rule(){
    fw_config_get_dscp_rule   "$1"
    local jumpTarget=

    if [[ "$dscprule_queueName" == "Queue1" ]]; then
            jumpTarget="qos_wan_lvl_high"
	else
            jumpTarget="qos_wan_lvl_middle"
    fi

    local rule="-m dscp --dscp ""$dscprule_DSCPNumber"
    
    local wan_ifname=$(uci get network.wan.ifname)

    local IFC=""

    network_get_device IFC internet
    #network_get_device linternet internet
    [ -z "$IFC" ] && {
        network_get_device IFC wan
        [ -z "$IFC" ] && {
            IFC=$(uci get network.wan.ifname) 
        }
    }

    # transfer to hex
    local clsNum=$(printf "%X" "$dscprule_DSCPNumber")
    #fw s_add 4 m POSTROUTING "CLASSIFY --set-class 2:$clsNum" { "-o $IFC $rule" }
    #vconfig set_egress_map $wan_ifname $(( 65536*2 + $dscprule_DSCPNumber)) $dscprule_qCOS
    fw s_add 4 m qos_wan_rule "$jumpTarget" { "$rule" }


}

fw_tc_dscp_start(){
    # paras
    if [[ "$global_up_unit" == "mbps" ]]; then
        global_up_band=$((global_up_band*1024))
    fi
    #local uplink=$((${global_percent}*${global_up_band}/100))
    local uplink=${global_up_band}

    # Calculate the burst and cburst parameters for HTB 
    # Added by Jason Guo<guodongxian@tp-link.net>, 20140729 
    local hz=$(cat /proc/net/psched|awk -F ' ' '{print $4}')
    local up_iface_burst
    local up_burst 
    [ "$hz" == "3b9aca00" ] && {
        burst__calc() {
            local b=$((${1} * 1000 / 8 / 100))
            b=$((${b} + 1600))
            echo "$b"
        }
        up_burst=$(burst__calc $uplink)
        up_iface_burst=$(burst__calc 1000000)

        param__convert() {
            local p=
            [ -n "$1" -a -n "$2" ] && {
                p="burst $1 cburst $2"
            }
            echo "$p"        
        }

        up_burst=$(param__convert $up_burst $up_burst)
        up_iface_burst=$(param__convert $up_iface_burst $up_iface_burst)
    }

    uplink="$uplink""kbit"

    local IFC=""

    network_get_device IFC internet
    #network_get_device linternet internet
    [ -z "$IFC" ] && {
        network_get_device IFC wan
        [ -z "$IFC" ] && {
            IFC=$(uci get network.wan.ifname) 
        }
    }

    local wan_ifname="$IFC"

    #echo "up link" $uplink >/dev/console
    #echo "up burst" $up_burst >/dev/console

    # uplink
    tc_d qdisc add dev $wan_ifname root handle 1: htb default 1100
    tc_d class add dev $wan_ifname parent 1: classid 1:1 htb rate "$uplink" ceil "$uplink" $up_burst  quantum 1500
    tc_d class add dev $wan_ifname parent 1: classid 1:1100 htb rate 1000000kbit ceil 1000000kbit $up_iface_burst quantum 1500 prio 8
    tc_d qdisc add dev $wan_ifname parent 1:1100 handle 1100: sfq perturb 10
	
	#downlink
    tc_d qdisc add dev br-lan root handle 2: htb default 2100
    tc_d class add dev br-lan parent 2: classid 2:2 htb rate "$uplink" ceil "$uplink" $up_burst  quantum 1500
    tc_d class add dev br-lan parent 2: classid 2:2100 htb rate 1000000kbit ceil 1000000kbit $up_iface_burst  quantum 1500 prio 8
    tc_d qdisc add dev br-lan parent 2:2100 handle 2100: sfq perturb 10

    config_foreach fw_load_queue queue

}


fw_tc_stop(){
    local ifaces="mobile wan"
    for iface in ${ifaces}; do
        local wan_ifname=$(uci get network.${iface}.ifname)
        [ -z $wan_ifname ] && {
            continue
        }
        tc_d qdisc del dev "$wan_ifname" root
    done

    local wan_ifname="$IFC"

    tc_d qdisc del dev $wan_ifname root
    tc_d qdisc del dev "$(uci get network.wan.ifname)" root
    tc_d qdisc del dev br-lan root
}

fw_rule_reload() {
    fw_rule_exit_fast
    fw_config_get_global "$1"

    if [[ "$global_enable" == "on" ]]; then
		if [ "$dscp" == "yes" ]; then 
			fw_rule_dscp_load
		else
			fw_rule_load_fast
		fi
    fi

    return 0
}

fw_load_rule() {
    fw_config_get_rule "$1"
    local limit="$2"

    if [[ x"$rule_priority" != x"$limit" ]];
    then
        return
    fi
    
    if [[ "$rule_enable" == 'on' ]]; then
        
        local rule=""
        local target=""
        #local ip_rule=""
        local lan_tcp_rule=""
        local wan_tcp_rule=""
        local lan_udp_rule=""
        local wan_udp_rule=""
        #local mac_rule=""
        #local phy_rule=""
        #local icmp_rule=""
        #local appid_rule=""

        list_contains rule_type "app" && {
            if [[ -n "$rule_app" ]]; then
                for app in $rule_app; do
                    local tcp_port udp_port

                    config_get custom "$app" custom
                    config_get tcp_port "$app" tcp_port
                    config_get udp_port "$app" udp_port

                    #if [[ x"$custom" == x"icmp" ]]; then
                    #    icmp_rule="-p icmp "
                    #fi

                    #if [[ x"$custom" == x"appid" ]]; then
                    #    config_get appid "$app" appid
                    #    appid_rule="$appid_rule""$appid"','
                    #fi
                
                    if [[ -n "$tcp_port" ]]; then
                        lan_tcp_rule="$lan_tcp_rule""$tcp_port"','
                        wan_tcp_rule="$wan_tcp_rule""$tcp_port"','
                    fi

                    if [[ -n "$udp_port" ]]; then
                        lan_udp_rule="$lan_udp_rule""$udp_port"','
                        wan_udp_rule="$wan_udp_rule""$udp_port"','
                    fi
                    
                done
            fi
        }

        list_contains rule_type "custom" && {
            if [[ -n "$rule_proto" ]]; then
                case "$rule_proto" in
                    "tcp" )
                        lan_tcp_rule="$lan_tcp_rule""$rule_port"','
                        wan_tcp_rule="$wan_tcp_rule""$rule_port"','
                        ;;
                    "udp" )
                        lan_udp_rule="$lan_udp_rule""$rule_port"','
                        wan_udp_rule="$wan_udp_rule""$rule_port"','
                        ;;
                    "all" )
                        lan_tcp_rule="$lan_tcp_rule""$rule_port"','
                        wan_tcp_rule="$wan_tcp_rule""$rule_port"','
                        lan_udp_rule="$lan_udp_rule""$rule_port"','
                        wan_udp_rule="$wan_udp_rule""$rule_port"','
                        ;;
                esac
            fi
        }

        if [[ -n "$lan_tcp_rule" ]]; then
            lan_tcp_rule=${lan_tcp_rule%,}
            lan_tcp_rule="-p tcp -m multiport --sports "$lan_tcp_rule' '
        fi
		
		if [[ -n "$wan_tcp_rule" ]]; then
            wan_tcp_rule=${wan_tcp_rule%,}
            wan_tcp_rule="-p tcp -m multiport --dports "$wan_tcp_rule' '
        fi

        if [[ -n "$lan_udp_rule" ]]; then
            lan_udp_rule=${lan_udp_rule%,}
            lan_udp_rule="-p udp -m multiport --sports "$lan_udp_rule' '
        fi
		
		if [[ -n "$wan_udp_rule" ]]; then
            wan_udp_rule=${wan_udp_rule%,}
            wan_udp_rule="-p udp -m multiport --dports "$wan_udp_rule' '
        fi

        case "$rule_priority" in
            high )
            lan_target=qos_lan_lvl_high
			wan_target=qos_wan_lvl_high
                ;;
            middle )
            lan_target=qos_lan_lvl_middle
			wan_target=qos_wan_lvl_middle
                ;;
            low )
            lan_target=qos_lan_lvl_low
			wan_target=qos_wan_lvl_low
                ;;
        esac

        if [[ -n "$lan_tcp_rule" ]]; then
            rule="${lan_tcp_rule}${ip_rule}${mac_rule}${phy_rule}"
            rule=${rule% }
            echo $rule
            fw s_add 4 m qos_lan_rule "$lan_target" { "$rule" }
        fi
		
		if [[ -n "$wan_tcp_rule" ]]; then
            rule="${wan_tcp_rule}${ip_rule}${mac_rule}${phy_rule}"
            rule=${rule% }
            echo $rule
            fw s_add 4 m qos_wan_rule "$wan_target" { "$rule" }
        fi

        if [[ -n "$lan_udp_rule" ]]; then
            rule="${lan_udp_rule}${ip_rule}${mac_rule}${phy_rule}"
            rule=${rule% }
            echo $rule
            fw s_add 4 m qos_lan_rule "$lan_target" { "$rule" }
        fi
		
		if [[ -n "$wan_udp_rule" ]]; then
            rule="${wan_udp_rule}${ip_rule}${mac_rule}${phy_rule}"
            rule=${rule% }
            echo $rule
            fw s_add 4 m qos_wan_rule "$wan_target" { "$rule" }
        fi
    fi
}


