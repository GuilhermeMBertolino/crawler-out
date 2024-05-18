######### Switch APIs for BCM490X/BCM675X board #########

. /lib/bcmenet/bcmenet_4908.sh

wan_ifname=""
wan_unit=""
wan_port=""
lan_ifnames=""

log()
{
    echo $@ >/dev/console
}

get_lan_wan_ifnames()
{
    local wan_sec=$(uci get switch.wan.switch_port)
    wan_ifname=$(uci get switch.${wan_sec}.ifname)
    wan_unit=$(uci get switch.${wan_sec}.unit)
    wan_port=$(uci get switch.${wan_sec}.port)
	
	local lan_sec=$(uci get switch.lan.switch_port)
	lan_ifnames=$(uci get switch.${lan_sec}.ifname)

    #echo "WAN: $wan_ifname, unit $wan_unit port $wan_port" >/dev/console   
    #echo "LAN: $lan_ifnames" >/dev/console 
}

phy_port_is_linked () { # dev or dev list
    local dev_list=$1
    
    for dev in ${dev_list}
    do
        local res=$(ethctl $dev media-type | grep -i " Up ")
        if [ -n "$res" ]; then
            return 0
        fi
    done

    return 1
}

phy_lan_is_linked () {  
    #phy_port_is_linked "$lan_ifnames"
    #return $?
	
    local res=$(cat /proc/driver/phy/phyStatus)

    for port in ${res}
    do
        if [ $port -eq 1 ]; then
            return 0
        fi
    done
	
    return 1
}

phy_wan_is_linked () {  
    phy_port_is_linked "$wan_ifname"
    return $?
}

link_down_phy_port () { # <dev>
    local dev=$1

    ethctl $dev phy-power down
}

link_up_phy_port () {   # <dev>
    local dev=$1

    ethctl $dev phy-power up
}

link_down_lan_ports() {
    echo physet 0 > /proc/driver/phy/rtl8367s

    log "lan ports is linked down!"
}   

link_up_lan_ports () {
    echo physet 1 > /proc/driver/phy/rtl8367s
    
    log "lan ports is linked up!"
}

link_down_wan_ports() {
    for dev in $wan_ifname
    do
        link_down_phy_port $dev
    done

    log "wan ports is linked down!"
}   

link_up_wan_ports () {
    for dev in $wan_ifname
    do
        link_up_phy_port $dev
    done
    
    log "wan ports is linked up!"
}

link_down_all_ports () {
    #for LAN ports
    echo physet 0 > /proc/driver/phy/rtl8367s
    
    #for WAN port
    for dev in $wan_ifname
    do
        link_down_phy_port $dev
    done
    
    log "switch ports is linked down!"
}

link_up_all_ports () {
    #for LAN ports
    echo physet 1 > /proc/driver/phy/rtl8367s
    
    #for WAN port
    for dev in $wan_ifname
    do
        link_up_phy_port $dev
    done
    
    log "switch ports is linked up!"
}

power_up_all_ports () {
    #add by wanghao
    ethswctl -c setlinkstatus -n 0 -p 5 -x 1 -y 2500 -z 1
    echo sgmii 1 > /proc/driver/phy/rtl8367s
    #add end
    
    setup_phy_eee_set
    
    ethswctl -c powerset-enable -v 1
    link_up_all_ports
}

power_down_all_ports() {
    link_down_all_ports
    ethswctl -c powerset-enable -v 0
}


setup_phy_eee_set () {
    #for LAN ports of RTL8367S
    for port in `seq 0 3`
    do
        echo eeeset ${port} 0 > /proc/driver/phy/rtl8367s
    done
}

setup_wan_ports() {
    ethswctl -c wan -o enable -i $wan_ifname
}

unsetup_wan_ports() {
    ethswctl -c wan -o disable -i $wan_ifname
}

pause_enable_lan_ports() { 
	local lan_sec=$(uci get switch.lan.switch_port)
    local lan_unit=$(uci get switch.${lan_sec}.unit)
    local lan_port=$(uci get switch.${lan_sec}.port)

	bcm_4908_set_pause $lan_unit $lan_port 2
}

pause_disable_lan_ports() { 
    local lan4_port=$(uci get switch.lan4.switch_port)
    local lan_list="lan1 lan2 lan3 ${lan4_port}"
    for lan in ${lan_list}
    do
        local unit=$(uci get switch.${lan}.unit)
        local port=$(uci get switch.${lan}.port)

        bcm_4908_set_pause $unit $port 0
    done
}

setup_wan_pause() {
    # 4: enable rx pause
    bcm_4908_set_pause $wan_unit $wan_port 4
}

setup_phy_eee() {
    local if_list="eth1"
    for intf in ${if_list}
    do
        ethctl ${intf} eee off
    done
}

setup_phy_wirespeed() {
    local if_list="eth1"
    for intf in ${if_list}
    do
        ethctl ${intf} ethernet@wirespeed enable
    done
}

# 
# $1: auto, 2500F, 1000F, 1000H, 100F, 100H, 10F, 10H
#
bcm_set_wan_phy_mode ()
{
    local err_pre="***error bcm_set_wan_phy_mode()"
    local cmd=""
    local params1=""

    if [ $# -lt 1 ] ; then
        echo  "${err_pre}: at least 1 params required" >&2
        return 1
    fi

    if [ $1 == "auto" ] ; then
        params1="auto"
    elif [[ $1 == "2500F" || $1 == "1000F" || $1 == "1000H" || $1 == "100F" || $1 == "100H" || $1 == "10F" || $1 == "10H" ]] ; then 
        params1="${1}D"
    else
        echo  "${err_pre}: invalid value $1" >&2
        return 1        
    fi

    #local wan_sec=$(uci get switch.wan.switch_port)
    #local wan_ifname=$(uci get switch.${wan_sec}.ifname)

    # ethctl will sleep some seconds, 
    # we don't need waste time to wait it finish
    # so here, let it run at background,
    cmd="ethctl ${wan_ifname} media-type ${params1} &"

    if [ ${debug_this_script} -eq 1 ] ; then
        echo "${cmd}"
    fi

    eval ${cmd}
}

setup_wan_duplex() {
    local wan_sec=$(uci get switch.wan.switch_port)
    local profile=$(uci get switch.${wan_sec}.portspeed)
    local speedname=$(uci get portspeed.${profile}.current)
    
    # note: `ethctl ethx media-type auto' will power on wan phy
    if [ "$speedname" != "auto" ] ; then
        bcm_set_wan_phy_mode ${speedname}
    fi
}

disable_hwswitch() {
#6756 + 8367s  hw-switching make lan -lan broadcast failed
    ethswctl -c hw-switching -o disable
}

enable_hwswitch() {
    ethswctl -c hw-switching -o enable
}

get_lan_wan_ifnames
