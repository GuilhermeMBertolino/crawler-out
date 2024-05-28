# Copyight(c) 2011-2013 Shenzhen TP-LINK Technologies Co.Ltd.
# file     nat_config.sh
# bief    
# autho   Guo Dongxian
# vesion  1.0.0
# date     26Feb14
# history   arg 1.0.0, 26Feb14, Guo Dongxian, Ceate the file

NAT_ALL_NETWORK=

NAT_FILTER_CHAINS="zone_lan_natfd_vpn zone_lan_natfd_vs zone_lan_natfd_dmz forwarding_rule_pt "\
"zone_wan_natfd_vs zone_wan_natfd_dmz"
NAT_FILTER_CHAINS_V6="zone_wan_natfdv6_fr6"

NAT_RULE_CHAINS="prerouting_rule"
NAT_DMZ_CHAINS="prerouting_wan_dmz prerouting_lan_dmz"

nat_config_default() {
    local zones
    local ifaces
    
    config_get zones "nat" "zones"

    NAT_ZONES=$zones

    [ -n "$zones" ] && {
        for z in $zones; do
            [ "$z" == "$NAT_ZONE_LAN" ] && continue
            list_contains NAT_WAN_ZONES $z && continue
            append NAT_WAN_ZONES $z
        done
    }

    config_get NAT_ALL_NETWORK "nat" "network"

    for ifc in $NAT_ALL_NETWORK; do
        local i=${ifc#*-}        
        append ifaces $i
    done

    uci_set_state nat core ifaces "$ifaces"

    # Prerouting nat rule chain order
    config_get NAT_NORDER "nat" "norder"

    export "nat_norder"="$NAT_NORDER" 
    export "nat_dmz_chains"="$NAT_DMZ_CHAINS"
    export "nat_rule_chains"="$NAT_RULE_CHAINS"
    export "nat_filter_chains"="$NAT_FILTER_CHAINS"
    export "nat_filter_chains_v6"="$NAT_FILTER_CHAINS_V6"
}

nat_config_nw_exist() {
    [ -z "$NAT_ALL_NETWORK" ] && return 1

    local nw="${1}-${2}"
    local all_nw="$NAT_ALL_NETWORK"

    list_contains all_nw $nw && return 0

    return 1
}

# Read information of the remote management form config file
# and create nat rule of remote management 
nat_config_http_rule() {
    local rules=
    local mod="$1"

    fw flush 4 n "prerouting_rule_${mod}"
    config_get en "remote" "enable"
    [ "$en" != "off" ] && {
        local params=
        config_get http_port "remote" port
        config_get http_ip "remote" ipaddr

        append params "$http_ip"
        append params "$http_port"

        #if [ "$en" == "all" ]; then
        #    nat add http { 255.255.255.255 "$http_port" }
        #elif [ "$en" == "partial" ]; then
        #    nat add http { "$http_ip" "$http_port" }
        #fi
        local interfaces="internet wan"
        for iface in $interfaces; do
            local wan_ip
            network_get_ipaddr wan_ip "$iface"
            [ -n "$wan_ip" -a "$wan_ip" != "0.0.0.0" ] && {
                rule="-d ${wan_ip}/32 -p tcp -m tcp --dport $http_port --to-destination ${wan_ip}:80"
                fw add 4 n prerouting_rule_http DNAT { "$rule" }
            }
        done

        return 0
    }

    return 1
}

nat_config_https_rule() {
    local rules=
    local mod="$1"

    fw flush 4 n "prerouting_rule_${mod}"
    config_get en "remote" "enable"
    [ "$en" != "off" ] && {
        local params=
        config_get https_port "remote" https_port
        config_get https_ip "remote" ipaddr
		
		if [ "$en" == "all" ]; then
			append params "255.255.255.255"
		else
			append params "$https_ip"
		fi	
        append params "$https_port"

		rules=$(nat_https_param_to_rule "$params")
		
        fw add 4 n "prerouting_rule_${mod}" "DNAT" "$" { $rules } 
		
        return 0
    }
    
    return 1
}

# Read information of the ftp server form usbshare config file
# and create nat rule of ftp server
nat_config_ftp_rule() {
    local ftp_ctl_port=
    local mod="$1"

    config_get ftpex_en "global" ftpex
	local wanproto=$(uci get network.wan.wan_type)
	[ "$wanproto" = "dslite" -o "$wanproto" = "v6plus" ] && {
		ftpex_en="off"
	}
    [ "$ftpex_en" == "on" ] && {
        config_get ftp_ctl_port "global" ftpex_port
        local rules=$(nat_ftp_param_to_rule $ftp_ctl_port)
        [ -z "$rules" ] && return
    }

    fw flush 4 n "prerouting_rule_${mod}"
    return
}

nat_config_sftp_rule() {
    local sftp_ctl_port=
    local mod="$1"

    config_get sftpex_en "global" sftpex
	local wanproto=$(uci get network.wan.wan_type)
	[ "$wanproto" = "dslite" -o "$wanproto" = "v6plus" ] && {
		sftpex_en="off"
	}
    [ "$sftpex_en" == "on" ] && {
        config_get sftp_ctl_port "global" sftpex_port
        local rules=$(nat_sftp_param_to_rule $sftp_ctl_port)
        [ -z "$rules" ] && return
    }

    fw flush 4 n "prerouting_rule_${mod}"
    return
}

nat_config_init_mods_rules() {
    # Remote management
    nat_config_http_rule http

    # For remote https management
    local https_support="$(uci -c /etc/profile.d get profile.@https_mgnt[0].https_support)"    
    if [ "$https_support" == "yes" ]; then
    	nat_config_https_rule https
    fi
    
    # Ftp Server && SFTP Server
    nat_config_ftp_rule ftp
    
    local sftp_support="$(uci -q -c /etc/profile.d get profile.@sftp[0].sftp_support)"    
    if [ "$sftp_support" == "yes" ]; then
    	nat_config_sftp_rule sftp
    fi
}


