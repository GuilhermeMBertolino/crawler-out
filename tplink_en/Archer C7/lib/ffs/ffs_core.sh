FFS_DEBUG=0

. /lib/functions.sh 
. /lib/config/uci.sh
. /lib/ffs/ffs_network.sh
. /lib/ffs/ffs_ratelimit.sh

ffs_core_debug()
{
    [ ${FFS_DEBUG} -gt 0 ] && {
        echo "[ ffs_core.sh ] $1"  > /dev/console
    }
}

ffs_fw_rule_init()
{
    ffs_core_debug "ffs_fw_rule_init begin" 
    #=========================== filter INPUT =====================================================#
    
    local in_white_protocol=$(uci get amazon_ffs.ffs.in_white_protocol)
    local in_white_port=$(uci get amazon_ffs.ffs.in_white_port)
    local in_multiport=$(echo $in_white_port | sed 's/ /,/g')
    
    fw add 4 f input_lan_amazon_wifi
    for proto in $in_white_protocol; do
        case $proto in
            udp | tcp)
                fw add 4 f input_lan_amazon_wifi ACCEPT 1 { "-p $proto -m multiport --ports $in_multiport" } ;;
            *)
                fw add 4 f input_lan_amazon_wifi ACCEPT 1 { "-p $proto" } ;;
        esac
    done
    fw add 4 f input_lan_amazon_wifi reject
    
    fw add 4 f zone_lan input_lan_amazon_wifi 1 { "-i br-wifi" }
    fw add 4 f input zone_lan { "-i br-wifi" }
    
    #=========================== filter FORWARD ===================================================#
    # ffs -> wan
    fw add 4 f zone_lan_ACCEPT ACCEPT { "-o br-wifi" }
    fw add 4 f zone_lan_ACCEPT ACCEPT { "-i br-wifi" }
    
    local fw_white_protocol=$(uci get amazon_ffs.ffs.fw_white_protocol)
    local fw_white_ip=$(uci get amazon_ffs.ffs.fw_white_ip)
    local fw_white_port=$(uci get amazon_ffs.ffs.fw_white_port)
    local fw_multiport=$(echo $fw_white_port | sed 's/ /,/g')
    
    fw add 4 f forward_lan_amazon_wifi
    for ip in $fw_white_ip; do
        for proto in $fw_white_protocol; do
            case $proto in
                udp | tcp)
                    fw add 4 f forward_lan_amazon_wifi ACCEPT 1 { "-d $ip -p $proto -m multiport --ports $fw_multiport" } ;;
                *)
                    fw add 4 f forward_lan_amazon_wifi ACCEPT 1 { "-d $ip -p $proto" } ;;
            esac
        done
    done
    fw add 4 f forward_lan_amazon_wifi ACCEPT 1 { "-p tcp --dport 53" }
    fw add 4 f forward_lan_amazon_wifi ACCEPT 1 { "-p udp --dport 53" }
    fw add 4 f forward_lan_amazon_wifi DROP
    
    fw add 4 f zone_wifi_forward
    fw add 4 f zone_wifi_forward zone_lan_DROP
    fw add 4 f zone_wifi_forward forward_lan_amazon_wifi
    
    fw add 4 f forward zone_wifi_forward { "-i br-wifi" }
    
    # wan -> ffs low match priority
    fw add 4 f forwarding_wan ACCEPT { "-o br-wifi -m conntrack --ctstate RELATED,ESTABLISHED" }
    
    #=========================== nat PREROUTING ===================================================#
    fw add 4 n PREROUTING zone_lan_prerouting { "-i br-wifi" }

    #=========================== nat POSTROUTING ==================================================#
    fw add 4 n POSTROUTING zone_lan_nat { "-o br-wifi" }
    
    #=========================== dns PREROUTING ==================================================#
    local fw_brwifi_ip=$(uci get /etc/config/network.wifi.ipaddr)
    local fw_wan_addr=$(cat /var/run/dnsproxy/dnsproxy.server)

    if [[ "$fw_wan_addr" != "0.0.0.0" && "$fw_brwifi_ip" != "0.0.0.0" ]]; then
        fw add 4 n zone_lan_amazon
        fw add 4 n zone_lan_amazon_dns
        fw add 4 n "zone_lan_amazon_dns" "DNAT" "$" { "-d ${fw_brwifi_ip} -p tcp -m tcp --dport 53 --to-destination ${fw_wan_addr}" }
        fw add 4 n "zone_lan_amazon_dns" "DNAT" "$" { "-d ${fw_brwifi_ip} -p udp -m udp --dport 53 --to-destination ${fw_wan_addr}" }
        fw add 4 n zone_lan_amazon zone_lan_amazon_dns
        fw add 4 n PREROUTING zone_lan_amazon { "-i br-wifi" }
    fi

    ffs_core_debug "ffs_fw_rule_init end " 
}

ffs_fw_rule_exit()
{
    ffs_core_debug "ffs_fw_rule_exit begin " 
    
    #=========================== filter INPUT =====================================================#
    fw del 4 f input zone_lan { "-i br-wifi" }
    fw del 4 f zone_lan input_lan_amazon_wifi { "-i br-wifi" }
    fw del 4 f input_lan_amazon_wifi
    
    #=========================== filter FORWARD ===================================================#
    fw del 4 f zone_lan_ACCEPT ACCEPT { "-o br-wifi" }
    fw del 4 f zone_lan_ACCEPT ACCEPT { "-i br-wifi" }
    
    fw del 4 f forward zone_wifi_forward { "-i br-wifi" }
    fw del 4 f zone_wifi_forward
    
    fw del 4 f forward_lan_amazon_wifi
    
    fw del 4 f forwarding_wan ACCEPT { "-o br-wifi -m conntrack --ctstate RELATED,ESTABLISHED" }
    
    #=========================== nat PREROUTING ===================================================#
    fw del 4 n PREROUTING zone_lan_prerouting { "-i br-wifi" }
    
    #=========================== nat POSTROUTING ==================================================#
    fw del 4 n POSTROUTING zone_lan_nat { "-o br-wifi" }

    #=========================== dns PREROUTING ===================================================#
    fw del 4 n PREROUTING zone_lan_amazon { "-i br-wifi" }

    fw del 4 n zone_lan_amazon

    fw flush 4 n zone_lan_amazon_dns
    fw del 4 n zone_lan_amazon_dns

    ffs_core_debug "ffs_fw_rule_exit end" 
}

ffs_speed_rule_init()
{
    ffs_core_debug "ffs_speed_rule_init start"
    
    ffs_fw_add_rate_rule
    
    ffs_tc_add_rule
    
    ffs_core_debug "ffs_speed_rule_init end"
}

ffs_speed_rule_exit()
{
    ffs_core_debug "ffs_speed_rule_exit start"
    
    ffs_tc_del_rule
    
    ffs_fw_del_rate_rule
    
    ffs_core_debug "ffs_speed_rule_exit end"
}

ffs_wireless_init()
{
    ffs_core_debug "ffs_wireless_init start"

    local ffs_wireless_iface=$(uci get amazon_ffs.ffs.wireless_iface)
    
    wifi vap $ffs_wireless_iface
    
    ffs_core_debug "ffs_wireless_init end"
}

ffs_wireless_exit()
{
    ffs_core_debug "ffs_wireless_exit start"
    
    local ffs_wireless_iface=$(uci get amazon_ffs.ffs.wireless_iface)
   
    wifi disconnsta $ffs_wireless_iface

    # need set enable to delete wireless interface  
    uci set wireless.$ffs_wireless_iface.enable=off
    uci commit wireless

    wifi vap $ffs_wireless_iface

    ffs_core_debug "ffs_wireless_exit start"
}


ffs_rule_init()
{
    ffs_core_debug "ffs_rule_init start"

    ffs_fw_rule_init

    ffs_speed_rule_init

    ffs_core_debug "ffs_rule_init end"
}

ffs_rule_exit()
{
    ffs_core_debug "ffs_rule_exit start"

    ffs_fw_rule_exit

    ffs_speed_rule_exit

    ffs_core_debug "ffs_rule_exit end"
}

ffs_config_init()
{
    ffs_core_debug "ffs_config_init start"
    
    lua /lib/ffs/ffs_tools.lua cfg_init
    
    local ret=$(ffs_network_ip_is_conflict)
    if [ "$ret" = "true" ]; then
        ret=$(ffs_network_ip_renew)
        if [ "$ret" = "true" ]; then
            ffs_core_debug "ffs renew ip success !!!"
        else
            # exit when renew ip fail, otherwise lan will come into endless loop for ip confict-check
            echo "ffs renew ip failed !!!" > /dev/console
            lua /lib/ffs/ffs_tools.lua cfg_clean
            exit -1
        fi
    fi
    
    ffs_core_debug "ffs_config_init end  "
}

ffs_config_exit()
{
    ffs_core_debug "ffs_config_exit start"
    
    lua /lib/ffs/ffs_tools.lua cfg_clean
    
    ffs_core_debug "ffs_config_exit end"
}

ffs_bridge_init()
{
    ffs_core_debug "ffs_bridge_init start"
    
    /etc/init.d/network reload
    
    ffs_core_debug "ffs_bridge_init end"
}

ffs_bridge_exit()
{
    ffs_core_debug "ffs_bridge_exit start"
    
    ubus call network.interface.wifi remove
 
    ifconfig br-wifi down
    brctl delbr br-wifi

    ffs_core_debug "ffs_bridge_exit end"
}

ffs_start()
{
    local sysmode=$(uci get sysmode.sysmode.mode)
    local ffs_enable=$(uci get amazon_ffs.ffs.enable)

    if [[ "$sysmode" == "router" && "$ffs_enable" == "on" ]]; then
        # check ffs config
        ffs_config_init

        # init ffs bridge
        ffs_bridge_init

        # init ffs wireless interface
        ffs_wireless_init

        # init ffs firewall rules and ratelimit rules
        ffs_rule_init

        # init ffs dhcpd and dynamic domain white list
        /etc/init.d/dnsmasq restart
    else
        # other sysmode not support ffs, clear residual ffs config 
        local ffs_config=$(lua /lib/ffs/ffs_tools.lua cfg_detect)
        if [[ "$ffs_config" != "none" ]]; then
            # close ffs wireless interface
            ffs_wireless_exit

            # close ffs bridge
            ffs_bridge_exit

            # clean ffs tmp config
            ffs_config_exit
        fi
    fi
}

ffs_stop()
{
    if [[ "$1" == "all" ]]; then
        local sysmode=$(uci get sysmode.sysmode.mode)
        # cmd order is very important
        if [[ "$sysmode" == "router" ]]; then
            # clean ffs firewall rules and ratelimit rules
            ffs_rule_exit

            # close ffs wireless interface
            ffs_wireless_exit

            # close ffs bridge
            ffs_bridge_exit

            # clean ffs tmp config
            ffs_config_exit

            # close ffs dhcpd and dynamic domain white list
            /etc/init.d/dnsmasq restart
        fi
    else
        # clean ffs tmp config for 'K' script stop while rebooting
        ffs_config_exit
    fi
}

ffs_restart()
{
    ffs_core_debug "ffs_reload"
    ffs_stop "all"
    ffs_start
}
