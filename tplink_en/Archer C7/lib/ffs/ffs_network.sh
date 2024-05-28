#!/bin/sh

. /lib/functions.sh
. /lib/functions/network.sh
. /lib/domain_login/domain_login_core.sh

FFS_LAN_IFACE="wifi"

ffs_network_debug()
{
    [ ${FFS_DEBUG} -gt 0 ] && {
        echo "[ ffs_network.sh ] $1"  > /dev/console
    }
}

ffs_network_get_iplist()
{
    local iface="$1"
    local iface_wan="wan"
    local iface_internet="internet"
    local lan_addr=
    local wan_addr=
    local wan_dns_addr=
    local internet_addr=
    local internet_dns_addr=
    local iface_addr=
    local iface_dns_addr=
    local ip_list=

    if [ "$iface" != "$iface_wan" -a "$iface" != "$iface_internet" ] ; then
        network_get_ipaddr iface_addr "$iface"
		network_get_dnsserver iface_dns_addr "$iface"
    fi

    ubus list | grep -q network.interface.wan &&  network_get_ipaddr wan_addr "$iface_wan" && network_get_dnsserver wan_dns_addr "$iface_wan"
    ubus list | grep -q network.interface.internet && network_get_ipaddr internet_addr "$iface_internet" && network_get_dnsserver internet_dns_addr "$iface_internet"
    ubus list | grep -q network.interface.lan && network_get_ipaddr lan_addr "$DLOGIN_LAN_IFACE"

    for ip in $iface_addr $wan_addr $internet_addr $wan_dns_addr $internet_dns_addr $iface_dns_addr $lan_addr; do
        if [ -n "$ip" ] ; then
            if [ -n "$ip_list" ] ; then
                ip_list="$ip"",""$ip_list"
            else
                ip_list="$ip"
            fi
        fi
    done

    echo "$ip_list"
}

ffs_network_ip_is_conflict()
{
    local ffs_wifi_addr=
    local mask=
    local mask_len=
    local ip_list=$(ffs_network_get_iplist)

    config_load network
    config_get ffs_wifi_addr "wifi" "ipaddr" "0.0.0.0"
    config_get mask "wifi" "netmask" "0.0.0.0"
    config_clear

    mask_len=$(lua /lib/ffs/ffs_tools.lua get_masklen $mask)
    ubus list | grep -q network.interface.wifi && network_get_ipaddr ffs_wifi_addr "$FFS_LAN_IFACE" && network_get_subnet mask_len "$FFS_LAN_IFACE"
    mask_len="${mask_len#*/}"

    ffs_network_debug "ffs ipaddr: $ffs_wifi_addr, mask: $mask, mask_len: $mask_len"
    ffs_network_debug "wanIP/DnsIP/lanIp($ip_list)"
    
    [ "$ffs_wifi_addr" = "0.0.0.0" -o "$mask_len" = "0" -o "$mask_len" = "" ] && {
         echo "false"
         return 1
    }

    local sysmode
    config_load sysmode
    config_get sysmode sysmode mode "router"
    config_clear

    local same_subnet=$(lua ${DLOGIN_LIB_PATH}/domain_login_tools.lua checklist $ffs_wifi_addr $ip_list $mask_len)
    if [ "$sysmode" = "router" -a "$same_subnet" = "true" ]; then
        ffs_network_debug "ffsIP($ffs_wifi_addr/$mask_len) is conflict with wanIP/DnsIP/lanIp($ip_list)" > /dev/console
        echo "true"
    else
        echo "false"
    fi
}

ffs_network_ip_renew()
{
    local ip_list=$(ffs_network_get_iplist)
    local mask=
    local mask_len=
    
    config_load network
    config_get ffs_wifi_addr "wifi" "ipaddr" "0.0.0.0"
    config_get mask "wifi" "netmask" "0.0.0.0"
    config_clear

    mask_len=$(lua /lib/ffs/ffs_tools.lua get_masklen $mask)
    ubus list | grep -q network.interface.wifi && network_get_ipaddr ffs_wifi_addr "$FFS_LAN_IFACE" && network_get_subnet mask_len "$FFS_LAN_IFACE"
    mask_len="${mask_len#*/}"
    
    [ "$mask_len" = "0" -o "$mask_len" = "" ] && {
        echo "false"
        return 1
    }

    local rslt=$(lua ${DLOGIN_LIB_PATH}/domain_login_tools.lua getnew $ip_list $mask_len)
    if [ -n "$rslt" -a "$rslt" != "false" ]; then
        local new_addr new_mask
        new_addr=${rslt%/*}
        new_mask=${rslt#*/}

        ffs_network_debug "ffsIP will change to $rslt"

        lua /lib/ffs/ffs_tools.lua net_change $new_addr $new_mask

        echo "true"
    else
        ffs_network_debug "ffsIP renew fail, can't get new ip"
        echo "false"
    fi
}
