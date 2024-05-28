#!/bin/sh

ffs_ratelimit_debug()
{
    [ ${FFS_DEBUG} -gt 0 ] && {
        echo "[ ffs_ratelimit.sh ] $1"  > /dev/console
    }
}

qos_restart()
{
    ffs_ratelimit_debug "qos_restart start"

    /etc/init.d/qos restart

    ffs_ratelimit_debug "qos_restart end"
}

ffs_tc_support()
{   
    local release=$(uname -r)
    
    local sch_htb_exist=$(lsmod|grep -o "sch_htb" )
    local sch_sfq_exist=$(lsmod|grep -o "sch_sfq" )
    local cls_fw_exist=$(lsmod|grep -o "cls_fw" )
    
    [ -n "$sch_htb_exist" ] || insmod /lib/modules/"$release"/sch_htb.ko
    [ -n "$sch_sfq_exist" ] || insmod /lib/modules/"$release"/sch_sfq.ko
    [ -n "$cls_fw_exist" ] || insmod /lib/modules/"$release"/cls_fw.ko
}

ffs_tc_unsupport()
{
    local release=$(uname -r)

    local sch_htb_exist=$(lsmod|grep -o "sch_htb" )
    local sch_sfq_exist=$(lsmod|grep -o "sch_sfq" )
    local cls_fw_exist=$(lsmod|grep -o "cls_fw" )
    
    [ -n "$sch_htb_exist" ] && rmmod cls_fw.ko
    [ -n "$sch_sfq_exist" ] && rmmod sch_sfq.ko
    [ -n "$cls_fw_exist" ] && rmmod sch_htb.ko
}

ffs_tc_add_down_rule()
{
    ffs_ratelimit_debug "ffs_tc_add_down_rule start"

    tc qdisc del dev br-wifi root

    # tc rule down Speed  wan --> br-wifi  0x9101
    tc qdisc add dev br-wifi root handle 9: htb default 9100 
    tc class add dev br-wifi parent 9: classid 9:9 htb rate 82kbit ceil 82kbit 

    tc class add dev br-wifi parent 9: classid 9:9100 htb rate 82kbit ceil 82kbit 
    tc qdisc add dev br-wifi parent 9:9100 handle 9100: sfq perturb 10

    tc class add dev br-wifi parent 9:9 classid 9:9101 htb rate 82kbit ceil 82kbit
    tc qdisc add dev br-wifi parent 9:9101 handle 9101: sfq perturb 10

    tc filter add dev br-wifi parent 9:0 protocol all handle 0x9101/0xffff fw classid 9:9101

    ffs_ratelimit_debug "ffs_tc_add_down_rule end"
}

ffs_tc_del_down_rule()
{
   ffs_ratelimit_debug "ffs_tc_del_down_rule start"
   
   tc qdisc del dev br-wifi root

   ffs_ratelimit_debug "ffs_tc_del_down_rule end"
}

ffs_tc_add_up_rule()
{
    ffs_ratelimit_debug "ffs_tc_add_up_rule start"

    local ifaces="wan"

    for i in $ifaces; do
        
        local wan_ifname=$(uci get network.$i.ifname)
        
        [ -z $wan_ifname ] && {
            continue
        }
        tc qdisc del dev "$wan_ifname" root
        
        tc qdisc add dev $wan_ifname root handle 1: htb default 1100
        tc class add dev $wan_ifname parent 1: classid 1:1 htb rate 1000000kbit ceil 1000000kbit
        
        tc class add dev $wan_ifname parent 1: classid 1:1100 htb rate 1000000kbit ceil 1000000kbit
        tc qdisc add dev $wan_ifname parent 1:1100 handle 1100: sfq perturb 10
        
        tc class add dev $wan_ifname parent 1:1 classid 1:1104 htb rate 82kbit ceil 82kbit 
        tc qdisc add dev $wan_ifname parent 1:1104 handle 1104: sfq perturb 10

        tc filter add dev $wan_ifname parent 1:0 protocol all handle 0x1104/0xffff fw classid 1:1104
    done
 
    ffs_ratelimit_debug "ffs_tc_add_up_rule end"
}
    

ffs_tc_del_up_rule()
{
    ffs_ratelimit_debug "ffs_tc_del_up_rule start"

    local ifaces="wan"
    
    for i in $ifaces; do
        local wan_ifname=$(uci get network.$i.ifname)
        [ -z $wan_ifname ] && {
            continue
        }
        tc qdisc del dev "$wan_ifname" root
    done

    ffs_ratelimit_debug "ffs_tc_del_up_rule end"
}

ffs_tc_add_rule()
{
    ffs_ratelimit_debug "ffs_tc_add_rule start"
 
    local qos_enable=$(uci get qos_v2.settings.enable)

    ffs_tc_support

    ffs_tc_add_down_rule

    if [[ "$qos_enable" == "off" ]] ; then
        ffs_tc_add_up_rule
    else
        qos_restart
    fi

    ffs_ratelimit_debug "ffs_tc_add_rule end"
}


ffs_tc_del_rule()
{
    ffs_ratelimit_debug "ffs_tc_del_rule start"

    local qos_enable=$(uci get qos_v2.settings.enable)

    ffs_tc_del_down_rule
    ffs_tc_del_up_rule
    
    if [[ "$qos_enable" == "on" ]] ; then    
        qos_restart
    fi
    
    ffs_ratelimit_debug "ffs_tc_del_rule end"
}

ffs_fw_add_rate_rule()
{
    ffs_ratelimit_debug "ffs_fw_add_rate_rule start"
    
    # br-wifi --> wan 0x1104
    fw add 4 m limit_lan_br_wifi_LEVEL1
    fw add 4 m limit_lan_br_wifi_LEVEL1 "MARK --set-xmark 0x1104/0xffff"
    fw add 4 m limit_lan_br_wifi_LEVEL1 "CONNMARK --set-xmark 0x1104/0xffff"
    fw add 4 m limit_lan_br_wifi_LEVEL1 ACCEPT
    
    fw add 4 m limit_lan_br_wifi_rule
    fw add 4 m limit_lan_br_wifi_rule limit_lan_br_wifi_LEVEL1 { "-i br-wifi" }
    fw add 4 m FORWARD limit_lan_br_wifi_rule { "-i br-wifi" }
    
    # wan --> br-wifi  0x9101 
    fw add 4 m limit_wan_br_wifi_rule 
    fw add 4 m limit_wan_br_wifi_rule "MARK --set-xmark 0x9101/0xffff"
    fw add 4 m limit_wan_br_wifi_rule ACCEPT
    fw add 4 m zone_wan_qos limit_wan_br_wifi_rule 1 { "-m connmark --mark 0x1104/0xffff" }
    
    ffs_ratelimit_debug "ffs_fw_add_rate_rule end"
}

ffs_fw_del_rate_rule()
{
    ffs_ratelimit_debug "ffs_fw_del_rate_rule start"

    # br-wifi --> wan
    fw del 4 m FORWARD limit_lan_br_wifi_rule { "-i br-wifi" }
    fw del 4 m limit_lan_br_wifi_rule

    fw del 4 m limit_lan_br_wifi_LEVEL1
    
    # wan --> br-wifi 
    fw del 4 m zone_wan_qos limit_wan_br_wifi_rule { "-m connmark --mark 0x1104/0xffff" }
    fw del 4 m limit_wan_br_wifi_rule
    
    ffs_ratelimit_debug "ffs_fw_del_rate_rule end"
}
