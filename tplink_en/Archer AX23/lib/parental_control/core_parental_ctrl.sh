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
		string available     	 "" \
		string name     	 "" \
		string blocked      	 "0" \
		string timeLimitsMode      	 "0" \
		string workdays      	 "-1" \
		string today_bonus_time      	 "0" \
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
		string website_white           "" \
		string filter_categories_list           "0" \
		string advanced_enable           "0" \
		string sun_time           "0" \
		string sun_forenoon           "0" \
		string sun_afternoon           "0" \
		string mon_time           "0" \
		string mon_forenoon           "0" \
		string mon_afternoon           "0" \
		string tue_time           "0" \
		string tue_forenoon           "0" \
		string tue_afternoon           "0" \
		string wed_time           "0" \
		string wed_forenoon           "0" \
		string wed_afternoon           "0" \
		string thu_time           "0" \
		string thu_forenoon           "0" \
		string thu_afternoon           "0" \
		string fri_time           "0" \
		string fri_forenoon           "0" \
		string fri_afternoon           "0" \
		string sat_time           "0" \
		string sat_forenoon           "0" \
		string sat_afternoon           "0" \
		string website_type       "0" \
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

#add by wanghao
fw_load_dns_resp()
{
	fw add 4 m parental_ctrl_dns_resp
	fw s_add 4 m FORWARD parental_ctrl_dns_resp 1 { "-p udp -m udp --sport 53" }
	fw s_add 4 m parental_ctrl_dns_resp DROP { "-m pctl --id 61166" }
}

fw_unload_dns_resp()
{
	fw s_del 4 m FORWARD parental_ctrl_dns_resp { "-p udp -m udp --sport 53" }
	fw flush 4 m parental_ctrl_dns_resp
	fw del 4 m parental_ctrl_dns_resp
}
#add end

fw_load_owner()
{
	fw_config_get_owner $1 owner
	
	#add by wanghao
	available=${owner_available}
	if [ "$available" == "false" ]; then
		return
	fi
	#add end
	
	owner_mac=""
    owner_id=${owner_owner_id}
	config_foreach fw_config_load_mac client ${owner_id} owner_mac
	
	owner_mac=${owner_mac//-/:}
	owner_mac=$(echo $owner_mac | tr [a-z] [A-Z])
	owner_website=${owner_website// /,}
    owner_website=$(echo "$owner_website" | tr [A-Z] [a-z])
	#add by wanghao
	owner_website_white=${owner_website_white// /,}
    owner_website_white=$(echo "$owner_website_white" | tr [A-Z] [a-z])
	#add end
	
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
	
	#add by wanghao
	if [ -z "$owner_website_white" ]; then
		host_rule_wl=""
	else
		host_rule_wl="--host_wl $owner_website_white "
	fi
	#add end
	
	if [ "$owner_timeLimitsMode" == "0" ]; then
		# "$owner_workdays" == "-1" means there is no workdays in user config, will set Saturay and Sunday as the default weekend, which is 62=0x0011 1110 
		if [ "$owner_workdays" == "-1" ]; then
			fw s_add 4 f parental_ctrl_${owner_id} DROP { "-m pctl --advancedMode ${owner_timeLimitsMode} \
			--id ${owner_id} \
			--blocked ${owner_blocked} \
			--workdays 62 \
			--today_bonus_time ${owner_today_bonus_time} \
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
			--sun_time ${owner_sun_time} \
			--mon_time ${owner_mon_time} \
			--tue_time ${owner_tue_time} \
			--wed_time ${owner_wed_time} \
			--thu_time ${owner_thu_time} \
			--fri_time ${owner_fri_time} \
			--sat_time ${owner_sat_time} \
			--hosts_type ${owner_website_type} \
			--cat_map ${owner_filter_categories_list} \
			  $host_rule_wl \
			  $host_rule " }
		else
			fw s_add 4 f parental_ctrl_${owner_id} DROP { "-m pctl --advancedMode ${owner_timeLimitsMode} \
			--id ${owner_id} \
			--blocked ${owner_blocked} \
			--workdays ${owner_workdays} \
			--today_bonus_time ${owner_today_bonus_time} \
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
			--sun_time ${owner_sun_time} \
			--mon_time ${owner_mon_time} \
			--tue_time ${owner_tue_time} \
			--wed_time ${owner_wed_time} \
			--thu_time ${owner_thu_time} \
			--fri_time ${owner_fri_time} \
			--sat_time ${owner_sat_time} \
			--hosts_type ${owner_website_type} \
			--cat_map ${owner_filter_categories_list} \
			  $host_rule_wl \
			  $host_rule " }		
		fi
	  else
	  #advanced mode
		fw s_add 4 f parental_ctrl_${owner_id} DROP { "-m pctl --advancedMode ${owner_timeLimitsMode} \
	--id ${owner_id} \
	--blocked ${owner_blocked} \
	--today_bonus_time ${owner_today_bonus_time} \
	--advanced_enable ${owner_advanced_enable} \
	--sun_time ${owner_sun_time} \
	--sun_forenoon ${owner_sun_forenoon} \
	--sun_afternoon ${owner_sun_afternoon} \
	--mon_time ${owner_mon_time} \
	--mon_forenoon ${owner_mon_forenoon} \
	--mon_afternoon ${owner_mon_afternoon} \
	--tue_time ${owner_tue_time} \
	--tue_forenoon ${owner_tue_forenoon} \
	--tue_afternoon ${owner_tue_afternoon} \
	--wed_time ${owner_wed_time} \
	--wed_forenoon ${owner_wed_forenoon} \
	--wed_afternoon ${owner_wed_afternoon} \
	--thu_time ${owner_thu_time} \
	--thu_forenoon ${owner_thu_forenoon} \
	--thu_afternoon ${owner_thu_afternoon} \
	--fri_time ${owner_fri_time} \
	--fri_forenoon ${owner_fri_forenoon} \
	--fri_afternoon ${owner_fri_afternoon} \
	--sat_time ${owner_sat_time} \
	--sat_forenoon ${owner_sat_forenoon} \
	--sat_afternoon ${owner_sat_afternoon} \
	--cat_map ${owner_filter_categories_list} \
	--hosts_type ${owner_website_type} \
	  $host_rule_wl \
	  $host_rule " }
	  fi
  
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
	
	#add by wanghao
	[ -e /usr/sbin/url-class ] && {
		fw_load_dns_resp
	}
	
	security=$(uci get parental_control_v2.settings.sec_enable)
	if [ "$security" == "false" ]; then
		[ -e /proc/block/block_rule ] && {
			echo s > /proc/block/block_rule
		}
	else
		[ -e /proc/block/block_rule ] && {
			echo S > /proc/block/block_rule
		}
	fi
	#add end
	
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
	
	#add by wanghao
	[ -e /usr/sbin/url-class ] && {
		fw_unload_dns_resp
	}
	
	[ -e /proc/block/block_rule ] && {
		echo c > /proc/block/block_rule
	}
	#add end
	
	uci_revert_state parental_control_v2
	uci_toggle_state parental_control_v2 core "" 0
	syslog $LOG_INF_FUNCTION_DISABLE
}
