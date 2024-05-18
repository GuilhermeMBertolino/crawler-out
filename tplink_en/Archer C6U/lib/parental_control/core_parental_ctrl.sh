# Copyright (C) 2009-2010 OpenWrt.org

MODULE=parental_ctrl

fw_config_load_mac()
{
	config_get mac $1 mac
	config_get id  $1 owner_id
	
	if [ "$id" == "$2" ]; then
		append $3 $mac
	fi
}

fw_config_get_owner()
{
	fw_config_get_section "$1" owner { \
		string owner_id     	 "" \
		string name     	 "" \
		string blocked      	 "0" \
		string workday_limit     "0" \
		string workday_time      "0" \
		string workday_bedtime   "0" \
		string workday_begin     "0" \
		string workday_end       "0" \
		string weekend_limit     "0" \
		string weekend_time      "0" \
		string weekend_bedtime   "0" \
		string weekend_begin     "0" \
		string weekend_end       "0" \
		string website           "" \
    } || return	
}

fw_load_device_info()
{
	fw add 4 f parental_ctrl_device_info
	fw s_add 4 f FORWARD parental_ctrl_device_info 1 { "-i br-lan -p tcp -m tcp --dport 80" }
	fw s_add 4 f parental_ctrl_device_info DROP { "-m pctl --id 65535" }
}

fw_unload_device_info()
{
	fw s_del 4 f FORWARD parental_ctrl_device_info { "-i br-lan -p tcp -m tcp --dport 80" }
	fw flush 4 f parental_ctrl_device_info
	fw del 4 f parental_ctrl_device_info
}

accel_handler_for_owner()
{
	# only for bcm fcache now
	[ -e /proc/fcache/ ] && {
		local ids=$(uci_get_state parental_control_v2 core ids)
	
	for id in $ids
	do
		macs=$(uci_get_state parental_control_v2 core id_${id})
		for mac in $macs
		do
			echo "accel_handler_for_owner: to flush accel rules of $mac for pctl id_${id}"
			#if [ -d /proc/fcache/ ]; then
				fc flush --mac $mac
			#fi
		done
	done
}

	[ -e /proc/ppa/ ] && {
		local interval=0
		local ids=$(uci_get_state parental_control_v2 core ids)

		[ -n "$ids" ] && {
			interval=8
		}
		echo "accel_handler_for_owner: swaccel_skip_interval = $interval"
		echo $interval > /proc/ppa/api/swaccel_skip_interval	
	}	
}

fw_load_owner()
{
	fw_config_get_owner $1 owner
	
	owner_mac=""
    owner_id=${owner_owner_id}
	config_foreach fw_config_load_mac client ${owner_id} owner_mac
	
	owner_mac=${owner_mac//-/:}
	owner_mac=$(echo $owner_mac | tr [a-z] [A-Z])
	owner_website=${owner_website// /,}
    owner_website=$(echo "$owner_website" | tr [A-Z] [a-z])
	
	#echo $owner_id $owner_name $owner_mac
	
	ids=$(uci_get_state parental_control_v2 core ids)
	append ids ${owner_id}
	uci_toggle_state parental_control_v2 core ids "${ids}"
	
	fw add 4 f parental_ctrl_${owner_id}
	for mac in $owner_mac
	do
		fw s_add 4 f zone_lan_forward parental_ctrl_${owner_id} 1 { "-m mac --mac-source $mac" }
	done
	
	uci_toggle_state parental_control_v2 core id_${owner_id} "${owner_mac}"
	
	if [ -z "$owner_website" ]; then
		host_rule=""
	else
		host_rule="--host $owner_website "
	fi
	
    fw s_add 4 f parental_ctrl_${owner_id} DROP { "-m pctl --id ${owner_id} \
--blocked ${owner_blocked} \
--workday_limit ${owner_workday_limit} \
--workday_time ${owner_workday_time} \
--workday_bedtime ${owner_workday_bedtime} \
--workday_begin ${owner_workday_begin} \
--workday_end ${owner_workday_end} \
--weekend_limit ${owner_weekend_limit} \
--weekend_time ${owner_weekend_time} \
--weekend_bedtime ${owner_weekend_bedtime} \
--weekend_begin ${owner_weekend_begin} \
--weekend_end ${owner_weekend_end} \
  $host_rule " }
  
	fw s_add 4 f parental_ctrl_${owner_id} RETURN
}

fw_load_parental_ctrl(){
	uci_revert_state parental_control_v2
	uci_toggle_state parental_control_v2 core "" 1
	local wan_type=$(uci get network.wan.wan_type)
	if [ "$wan_type" != "v6plus" -a "$wan_type" != "dslite" ];then
    	config_foreach	fw_load_owner owner
	fi

	fw_load_device_info
	
	ids=$(uci_get_state parental_control_v2 core ids)
	[ -z "$ids" ] || {
		fw s_del 4 f FORWARD ACCEPT { "-m conntrack --ctstate RELATED,ESTABLISHED" }
		fw s_add 4 f FORWARD ACCEPT 1 { "-o br-lan -m conntrack --ctstate RELATED,ESTABLISHED" }
	}
	syslog $LOG_INF_FUNCTION_ENABLE

	# for brcm fc support
	accel_handler_for_owner
}

fw_exit_parental_ctrl(){
	ids=$(uci_get_state parental_control_v2 core ids)
	[ -z "$ids" ] || {	
		fw s_del 4 f FORWARD ACCEPT { "-o br-lan -m conntrack --ctstate RELATED,ESTABLISHED" }
		fw s_add 4 f FORWARD ACCEPT 1 { "-m conntrack --ctstate RELATED,ESTABLISHED" }
	}
	
	for id in $ids
	do
		macs=$(uci_get_state parental_control_v2 core id_${id})
		for mac in $macs
		do
			fw s_del 4 f zone_lan_forward parental_ctrl_${id} { "-m mac --mac-source $mac" }
		done
		
		fw flush 4 f parental_ctrl_${id}
		fw del 4 f parental_ctrl_${id}
	done
	fw_unload_device_info
	
	uci_revert_state parental_control_v2
	uci_toggle_state parental_control_v2 core "" 0
	syslog $LOG_INF_FUNCTION_DISABLE
}
