#!/bin/sh
# 
# QCN8337N led control
# Herbert <yuanjianpeng@tp-link.com.cn>
#

set_lan_led_rule ()
{
	ssdk_sh debug reg set 0x0050 $1 4
	ssdk_sh debug reg set 0x0054 $1 4
	ssdk_sh debug reg set 0x0058 $1 4
} > /dev/null

# 8337N doesn't work for always on !!!
lan_led_on ()
{
	RULE_ALWAYS_ON=$((2<<14))	
	RULE_ALWAYS_ON=$((RULE_ALWAYS_ON<<16|RULE_ALWAYS_ON))
	set_lan_led_rule $RULE_ALWAYS_ON
}

lan_led_off ()
{
	RULE_ALWAYS_OFF=$((0<<14))	
	RULE_ALWAYS_OFF=$((RULE_ALWAYS_OFF<<16|RULE_ALWAYS_OFF))
	set_lan_led_rule $RULE_ALWAYS_OFF
}

lan_led_rule ()
{
	RULE_A9=0xf704f704
	set_lan_led_rule $RULE_A9
}

usage ()
{
	echo "usage: $0 {off|rule}" 1>&2
	exit 1
}

[ $# -eq 1 ] || usage 


case $1 in
	off)
		lan_led_off
	;;
	on)
		lan_led_on
	;;
	rule)
		lan_led_rule
	;;
	*)
		usage
	;;
esac


