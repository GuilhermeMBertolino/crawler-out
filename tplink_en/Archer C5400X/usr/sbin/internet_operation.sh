#!/bin/sh

. /usr/share/libubox/jshn.sh

get_lan_ip()
{
	json_init
	json_load "`ubus call network.interface.lan status`"
	
	json_get_type type ipv4_address
	if [ "$type" == array ]
	then
		json_select "ipv4_address"
		json_get_type type1 1
		if [ $type1 = object ]
		then
			json_select 1
			json_get_var var address
			echo $var
		fi
	fi
}

get_wan_ip()
{
    json_init
    IFC=wan
    ubus list |grep -q network.interface.internet && IFC=internet
    json_load "`ubus call network.interface.$IFC status`"

    json_get_type type ipv4_address
    if [ "$type" == array ]
    then
	    json_select "ipv4_address"
	    json_get_type type1 1
	    if [ $type1 = object ]
	    then
			json_select 1
	        json_get_var var address
	        echo $var 
    	fi
    fi	
}


if [ $1 == "lan_ip" ]
then
	get_lan_ip
elif [ $1 == "wan_ip" ]
then
	get_wan_ip
fi
