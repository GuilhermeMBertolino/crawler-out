# Copyright(c) 2011-2013 Shenzhen TP-LINK Technologies Co.Ltd.
# file     nat_dmz.sh
# brief    
# author   Guo Dongxian
# version  1.0.0
# date     26Feb14
# history   arg 1.0.0, 26Feb14, Guo Dongxian, Create the file

NAT_DMZ_FW_ISSET=
DMZ_FILTER_CHAINS=

nat_dmz_flush_rules() {
    unset NAT_DMZ_FW_ISSET
    [ -n "$nat_filter_dmz_chains" ] && {
        for fc in $nat_filter_dmz_chains; do
            append DMZ_FILTER_CHAINS $fc
            fw flush 4 f $fc
        done
    }

    [ -n "$nat_dmz_chains" ] && {
        for d in $nat_dmz_chains; do
            fw flush 4 n $d        
        done   
    }
}

 nat_do_dmz() {
        local ifname=$1
        local lan_ip=$2
        local wan_ip=$3    
        local iface=$4
        local proto=$5
        local wan_sec_ip=$6
        
        [ -z $NAT_DMZ_FW_ISSET ] && {
            for f_dmz in $DMZ_FILTER_CHAINS; do
                fw add 4 f ${f_dmz} ACCEPT $ \
                    { -d ${lan_ip} -m conntrack --ctstate DNAT }
            done
            NAT_DMZ_FW_ISSET=1
        }
        
        for n_dmz in $nat_dmz_chains; do
            fw add 4 n ${n_dmz} ACCEPT ^ \
                { -d ${wan_ip} -p icmp -m icmp --icmp-type 8 }
            
            [ -n "$proto" ] && [ "$proto" == "pptp" ] && {
                [ -n "$wan_sec_ip" -a "$wan_sec_ip" != "0.0.0.0" -a "$wan_sec_ip" != "-" ] && {  
                    fw add 4 n ${n_dmz} ACCEPT ^ \
                         { -d ${wan_sec_ip} -p tcp -m tcp --sport 1723 } 
                }  
            }

            fw add 4 n ${n_dmz} DNAT $ \
                { -d ${wan_ip} --to-destination ${lan_ip} }
        done
    }
    
	

nat_config_dmz() {
	nat_config_get_section "$1" nat_dmz { \
		string name "" \
		string enable "" \
        string ipaddr "" \
		string sipaddr "" \
		string interface "" \
	} || return
}

nat_dmz_setup_rules() {
	local active_dmz_ipaddr=$1
	echo "active_dmz_ipaddr=$active_dmz_ipaddr"
	
    nat_syslog 23
    [ -z "$active_dmz_ipaddr" -o "$active_dmz_ipaddr" == "0.0.0.0" ] && {
        echo "host ip address is null."
        return 1
    }

    local lan_addr=$(uci_get_state nat env ${NAT_ZONE_LAN}_ip)
    local lan_mask=$(uci_get_state nat env ${NAT_ZONE_LAN}_mask)
    local same_net=$(lua /lib/nat/nat_tools.lua $active_dmz_ipaddr $lan_addr $lan_mask)
    
    [ -z "$same_net" -o "$same_net" = "false" ] && {
        nat_syslog 81 "$active_dmz_ipaddr"
        echo "The ip address of dmz is not in the lan subnet"
        return 1
    }

        local ifaces=$(uci_get_state nat core ifaces)
        for zone in $NAT_WAN_ZONES; do
            for i in ${ifaces:-"lan"}; do
                nat_config_nw_exist $zone $i && {
                    local ifname=$(uci_get_state nat env ${i}_if)
                    local dev=$(uci_get_state nat env ${i}_dev)
                    
                    local wan_ip=$(uci_get_state nat env ${i}_ip)
                    local wan_sec_ip=$(uci_get_state nat env ${i}_sec_ip)
                    local proto=$(uci_get_state nat env ${i}_proto)

                    [ -n "$ifname" -a -n "$dev" ] && {
                        [ -n "$wan_ip" -a "$wan_ip" != "0.0.0.0" ] && {                            
                            nat_do_dmz $ifname $active_dmz_ipaddr $wan_ip $zone $proto $wan_sec_ip                             
                        }      
                  
                        #[ -n "$wan_sec_ip" -a "$wan_sec_ip" != "0.0.0.0" -a "$wan_sec_ip" != "-" ] && {               
                        #    nat__do_dmz $dev $active_dmz_ipaddr $wan_sec_ip $zone 
                        #}
                    }           
                }
            done
        done
        nat_syslog 53 "$active_dmz_ipaddr"

}


nat_load_dmz() {
    nat_config_dmz "$1"
    

    [ "$nat_dmz_enable" == "dmz" ] && {
		nat_dmz_setup_rules $nat_dmz_ipaddr
    }

	[ "$nat_dmz_enable" == "smartDmz" ] && {
		insert_sdmz_module
		sdmzc &
    }
	
    [ "$nat_dmz_enable" == "disable" ] && nat_syslog 24
}


nat_dmz_operation() {

	nat_dmz_flush_rules

	killall sdmzc
	sleep 1
	remove_sdmz_module
	
    config_foreach nat_load_dmz nat_dmz
    unset DMZ_FILTER_CHAINS
}


nat_load_sdmz() {
    nat_config_dmz "$1"
    
	nat_dmz_setup_rules $nat_dmz_sipaddr
}


nat_sdmz_operation() {
	nat_dmz_flush_rules
    
    config_foreach nat_load_sdmz nat_dmz
    unset DMZ_FILTER_CHAINS
}



insert_sdmz_module() {

insmod /lib/modules/3.3.8/sdmzx.ko 
echo "insert_sdmz_module"

}

remove_sdmz_module() {

rmmod sdmzx
echo "remove_sdmz_module"

}



