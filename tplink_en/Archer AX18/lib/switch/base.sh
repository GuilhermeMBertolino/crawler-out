#!/bin/sh

append_status()
{
	eval $1=\"\$$1' '$2\"
}

# input "abcdef","cd"
# return "ef"
getSubStrRight()
{
	local src=${1}
	local mat=${2}

	local val=${src#*${mat}}
	if [ "$val" == "$src" ]; then
		echo ""
	else
		echo "$val"
	fi
}

# input "abcdef", "bc"
# return m
matchStr()
{
	local src=${1}
	local mat=${2}

	if [ "$src" == "$mat" ]; then
		echo "m"
	fi

	local val=${src#*${mat}}
	if [ "$val" == "$src" ]; then
		echo ""
	else
		echo "m"
	fi
}

########## RTL8197 ##########

local RTL8197_ALL_MASK="0x1e"
local RTL8197_LAN_MASK="0x1c"

local RTL8197_LAN_MAP="2 3 4"
local RTL8197_WAN_MAP="1"

# cat /proc/rtl865/tr181_eth_if
# port0: false Down 3292 false 10 Half
# port1: false Down 3306 false 10 Half
# port2: true Up 1159 false 1000 Full
# port3: true Up 3284 false 1000 Full
# port4: false Down 1166 true 10 Half
# port7: true Up 3306 false -1 Auto

# usage: $(each_line_parser) $(append_var) $(port_list) 
get_rtl8197_port_info()
{
	local val=$(cat /proc/rtl865x/tr181_eth_if | grep port$3)
	$1 "$2" "$val"
}

# usage: $(each_line_parser) $(append_var) $(port_list) 
get_rtl8197_all_port_info()
{
	local val=$(cat /proc/rtl865x/tr181_eth_if)
	local cb=$1
	local port_list=$3

	for i in $port_list; do
		local line=$(echo "$val" | eval "awk '/^port${i}/ {print}'")
		$cb "$2" "$line"
	done
}

# usage: $(append_var) $(port_link_info)
append_link_status()
{
	local out=$(echo "$2" | awk '{print $3}')

	if [ "$out" == "Up" ]; then
		append_status "$1" "connected"
	else
		append_status "$1" "unconnected"
	fi
}

# usage: $(append_var) $(port_link_info)
append_speed_status()
{
	local out=$(echo "$2" | awk '{print $6}')

	case $out in
	"1000")
		append_status "$1" "1000"
		;;
	"100")
		append_status "$1" "100"
		;;
	"10")
		append_status "$1" "10"
		;;
	*)
		append_status "$1" "0"
		;;
	esac
}

# usage: $(append_var) $(port_link_info)
append_duplex_status()
{
	local out=$(echo "$2" | awk '{print $7}')
	
	case $out in
	"Full")
		append_status "$1" "FULL"
		;;
	"Half")
		append_status "$1" "HALF"
		;;
	*)
		append_status "$1" "NONE"
		;;
	esac
}

# usage: $(append_var) $(port_unit)
get_rtl8197_port_status()
{
	get_rtl8197_port_info "append_link_status" "$1" "$2"
}

# usage: $(append_var) $(port_list_unit)
get_rtl8197_port_list_status()
{
	get_rtl8197_all_port_info "append_link_status" "$1" "$2"
}

# usage: $(append_var) $(port_unit)
get_rtl8197_port_speed()
{
	get_rtl8197_port_info "append_speed_status" "$1" "$2"
}

# usage: $(append_var) $(port_list_unit)
get_rtl8197_port_list_speed()
{
	get_rtl8197_all_port_info "append_speed_status" "$1" "$2"
}

# usage: $(append_var) $(port_unit)
get_rtl8197_port_duplex()
{
	get_rtl8197_port_info "append_duplex_status" "$1" "$2"
}

# usage: $(append_var) $(port_list_unit)
get_rtl8197_port_list_duplex()
{
	get_rtl8197_all_port_info "append_duplex_status" "$1" "$2"
}

# usage: $(port_unit) $(ability)
set_rtl8197_port_neg()
{
	local port=$1
	local abi=$2

	echo "port $((1<<$port)) $abi" > /proc/rtl865x/port_status
}

# usage: $(port_unit) $(state)
set_rtl8197_port_link_state()
{
	echo "$1 $2" > /proc/phyPower
}

# usage: $(lan_unit) $(wan_unit)
get_rtl8197_port_unit()
{
	if [ -n "$1" ]; then
		append_status "$1" "${RTL8197_LAN_MAP}"
	fi

	if [ -n "$2" ]; then
		append_status "$2" "${RTL8197_WAN_MAP}"
	fi
}

########## RTL8197 END ##########

########## PUBLIC ##########

# usage: $(lan_unit) $(wan_unit)
get_lan_wan_phyunit()
{
	get_rtl8197_port_unit $@
}

# usage: $(append_var) $(port_unit)
get_common_port_status()
{
	get_rtl8197_port_status $@
}

# usage: $(append_var) $(port_list_unit)
get_common_port_list_status()
{
	get_rtl8197_port_list_status "$1" "$2"
}

# usage: $(append_var) $(port_unit)
get_common_port_speed()
{
	get_rtl8197_port_speed $@
}

# usage: $(append_var) $(port_unit)
get_common_port_list_speed()
{
	get_rtl8197_port_list_speed "$1" "$2"
}

# usage: $(append_var) $(port_unit)
get_common_port_duplex()
{
	get_rtl8197_port_duplex $@
}

# usage: $(append_var) $(port_unit)
get_common_port_list_duplex()
{
	get_rtl8197_port_list_duplex "$1" "$2"
}

# usage: $port $abi
set_common_port_neg()
{
	set_rtl8197_port_neg "$1" "$2"
}

# usage: $port $link 
set_common_port_link_state()
{
	set_rtl8197_port_link_state "$1" "$2"
}

setup_wan_duplex()
{
	local auto="off"
	local speed="1000"
	local duplex="full"

	local wan_sec=$(uci get switch.wan.switch_port)
	local wan_unit=$(uci get switch.${wan_sec}.ports)
	local cap=$(uci get switch.${wan_sec}.portspeed)
	local current=$(uci get portspeed.${cap}.current)

	case $current in
	"1000F")
		ability="1000_full"
		;;
	"100F")
		ability="100_full"
		;;
	"100H")
		ability="100_half"
		;;
	"10F")
		ability="10_full"
		;;
	"10H")
		ability="10_half"
		;;
	*)
		ability="auto"
		;;
	esac

	set_common_port_neg $wan_unit "$ability"
}

link_up_all_ports()
{
	set_common_port_link_state "${RTL8197_ALL_MASK}" "1"
}

link_up_lan_ports()
{
	set_common_port_link_state "${RTL8197_LAN_MASK}" "1"
}

link_down_all_ports()
{
	set_common_port_link_state "${RTL8197_ALL_MASK}" "0"
}

link_down_lan_ports()
{
	set_common_port_link_state "${RTL8197_LAN_MASK}" "0"
}

########## PUBLIC END ##########
