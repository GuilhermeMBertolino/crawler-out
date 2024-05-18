#!/bin/sh

. /lib/gmac3/gmac3_nvram.sh

gmac3_override_switch ()
{
	uci set switch.lan_dev.old_ports="$(uci get switch.lan_dev.ports)"
	uci set switch.lan_dev.ports="1 2 3 4 5 7 8*"
	
	uci set switch.wan_dev.old_ports="$(uci get switch.wan_dev.ports)"
	uci set switch.wan_dev.ports="0 8"
	
	uci set switch.lan.old_ports="$(uci get switch.lan.ports)"
	uci set switch.lan.ports="1 2 3 4"
	
	uci set switch.wan.old_ports="$(uci get switch.wan.ports)"
	uci set switch.wan.ports="0"
	
	uci set switch.cpu.old_ports="$(uci get switch.cpu.ports)"
	uci set switch.cpu.ports="8"
	
	uci set switch.switch0.gmac3="1"
	
	uci commit
}

gmac3_restore_switch ()
{
	uci set switch.lan_dev.ports="$(uci get switch.lan_dev.old_ports)"
	uci delete switch.lan_dev.old_ports

	uci set switch.wan_dev.ports="$(uci get switch.wan_dev.old_ports)"
	uci delete switch.wan_dev.old_ports

	uci set switch.lan.ports="$(uci get switch.lan.old_ports)"
	uci delete switch.lan.old_ports
	
	uci set switch.wan.ports="$(uci get switch.wan.old_ports)"
	uci delete switch.wan.old_ports
	
	uci set switch.cpu.ports="$(uci get switch.cpu.old_ports)"
	uci delete switch.cpu.old_ports
	
	uci delete switch.switch0.gmac3
	
	uci commit
}

gmac3_switch_configured ()
{
	echo "$(uci get switch.switch0.gmac3 -q)"
}

gmac3_switch_adjust ()
{
	local gmac3_configured=`gmac3_nvram_configured`
	local switch_configured=`gmac3_switch_configured`
	
	if [ "$gmac3_configured" == "1" ] && [ "$switch_configured" != "1" ] ;
	then
		gmac3_override_switch
	elif [ "$gmac3_configured" == "0" ] && [ "$switch_configured" == "1" ] ;
	then
		gmac3_restore_switch
	fi
}