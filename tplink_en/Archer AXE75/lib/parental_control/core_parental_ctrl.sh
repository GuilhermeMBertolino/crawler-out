# Copyright (C) 2009-2010 OpenWrt.org

MODULE=parental_ctrl

DEBUG="off"

if [ x"$DEBUG" == x"on" ]; then
	STDOUT="/dev/console"
else
	STDOUT="/dev/null"
fi

PCTL_DEBUG() {
	echo "[PCTL_DEBUG]: $@" > $STDOUT
}


fw_add_web_filter_all()
{
	PCTL_DEBUG "fw_add_web_filter_all start"
	local wan_type=$(uci get network.wan.wan_type)
	
	fw add i f web_filter_all
	fw add 4 m web_filter_all
	
	fw s_add i f zone_lan_forward web_filter_all 1
	if [ "$wan_type" == "v6plus" ] && network_get_ipaddr6 ip6addr "wanv6"; then
		fw s_add 4 m INPUT web_filter_all 1 { "-i br-lan -p udp --dport 53" }
	fi

	fw s_add i f web_filter_all DROP { "-m pctl --id 65534" }
	fw s_add 4 m web_filter_all DROP { "-m pctl --id 65534" }

	fw s_add i f web_filter_all RETURN

	PCTL_DEBUG "fw_add_web_filter_all end"
}

fw_del_web_filter_all()
{
	PCTL_DEBUG "fw_del_web_filter_all start"
	fw s_del i f zone_lan_forward web_filter_all
	fw s_del 4 m INPUT web_filter_all { "-i br-lan -p udp -m udp --dport 53" }	
	
	fw flush i f web_filter_all
	fw del i f web_filter_all
	
	fw flush 4 m web_filter_all
	fw del 4 m web_filter_all
	
	PCTL_DEBUG "fw_del_web_filter_all end"
}


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
	local section="$1"
	local prefix="$2"
	local bedtime_mode="$3"
	local timeLimits_mode="$4"
	local offTime_mode="$5"

	## 通用配置
	fw_config_get_section "$1" "$2" { \
		string owner_id     	 "" \
		string available     	 "" \
		string name     	 "" \
		string blocked      	 "0" \
		string today_bonus_time      	 "0" \
		string today_reward_time	"0" \
		string workdays      	 "62" \
		string website           "" \
		string website_white           "" \
		string filter_categories_list           "0" \
		string website_type       "0" \
	} || return

	## bedtime
	if [ "$bedtime_mode" = "everyday" ]; then
		fw_config_get_section "$1" "$2" { \
			string bedtime_eve_beg	"0" \
			string bedtime_eve_end	"0" \
		} || return
	elif [ "$bedtime_mode" = "workingDay" ]; then
		fw_config_get_section "$1" "$2" { \
			string workday_bedtime	"0" \
			string workday_begin	"0" \
			string workday_end	"0" \
			string weekend_bedtime	"0" \
			string weekend_begin	"0" \
			string weekend_end	"0" \
		} || return
	elif [ "$bedtime_mode" = "customize" ]; then
		fw_config_get_section "$1" "$2" { \
			string bedtime_cus_enable "0" \
			string bedtime_sun_beg "0" \
			string bedtime_sun_end "0" \
			string bedtime_mon_beg "0" \
			string bedtime_mon_end "0" \
			string bedtime_tue_beg "0" \
			string bedtime_tue_end "0" \
			string bedtime_wed_beg "0" \
			string bedtime_wed_end "0" \
			string bedtime_thu_beg "0" \
			string bedtime_thu_end "0" \
			string bedtime_fri_beg "0" \
			string bedtime_fri_end "0" \
			string bedtime_sat_beg "0" \
			string bedtime_sat_end "0" \
		} || return
	fi

	## timeLimits
	if [ "$timeLimits_mode" = "everyday" ]; then
		fw_config_get_section "$1" "$2" { \
			string timeLimits_eve_time	"0" \
		} || return
	elif [ "$timeLimits_mode" = "workingDay" ]; then
		fw_config_get_section "$1" "$2" { \
			string workday_limit	"0" \
			string workday_time	"0" \
			string weekend_limit	"0" \
			string weekend_time	"0" \
		} || return
	elif [ "$timeLimits_mode" = "customize" ]; then
		## timeLimits_cus_enable代表每天是否支持上网时长限制
		fw_config_get_section "$1" "$2" { \
			string timeLimits_cus_enable "0" \
			string sun_time "0" \
			string mon_time "0" \
			string tue_time "0" \
			string wed_time "0" \
			string thu_time "0" \
			string fri_time "0" \
			string sat_time "0" \
		} || return
	fi

	## offTime
	if [ "$offTime_mode" = "everyday" ]; then
		fw_config_get_section "$1" "$2" { \
			string offTime_eve_forenoon	"0" \
			string offTime_eve_afternoon	"0" \
		} || return
	elif [ "$offTime_mode" = "workingDay" ]; then
		fw_config_get_section "$1" "$2" { \
			string offTime_wrk_enable	"0" \
			string offTime_wrk_forenoon	"0" \
			string offTime_wrk_afternoon	"0" \
			string offTime_wek_enable	"0" \
			string offTime_wek_forenoon	"0" \
			string offTime_wek_afternoon	"0" \
		} || return
	elif [ "$offTime_mode" = "customize" ]; then
		fw_config_get_section "$1" "$2" { \
			string offTime_cus_enable "0" \
			string sun_forenoon "0" \
			string sun_afternoon "0" \
			string mon_forenoon "0" \
			string mon_afternoon "0" \
			string tue_forenoon "0" \
			string tue_afternoon "0" \
			string wed_forenoon "0" \
			string wed_afternoon "0" \
			string thu_forenoon "0" \
			string thu_afternoon "0" \
			string fri_forenoon "0" \
			string fri_afternoon "0" \
			string sat_forenoon "0" \
			string sat_afternoon "0" \
		} || return
	fi
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

combine_bedtime_workday()
{
	if [ $(($3&64)) = 64 ]; then
		owner_sun_forenoon=$(($owner_sun_forenoon|$1))
		owner_sun_afternoon=$(($owner_sun_afternoon|$2))
	fi
	if [ $(($3&32)) = 32 ]; then
		owner_mon_forenoon=$(($owner_mon_forenoon|$1))
		owner_mon_afternoon=$(($owner_mon_afternoon|$2))
	fi
	if [ $(($3&16)) = 16 ]; then
		owner_tue_forenoon=$(($owner_tue_forenoon|$1))
		owner_tue_afternoon=$(($owner_tue_afternoon|$2))
	fi
	if [ $(($3&8)) = 8 ]; then
		owner_wed_forenoon=$(($owner_wed_forenoon|$1))
		owner_wed_afternoon=$(($owner_wed_afternoon|$2))
	fi
	if [ $(($3&4)) = 4 ]; then
		owner_thu_forenoon=$(($owner_thu_forenoon|$1))
		owner_thu_afternoon=$(($owner_thu_afternoon|$2))
	fi
	if [ $(($3&2)) = 2 ]; then
		owner_fri_forenoon=$(($owner_fri_forenoon|$1))
		owner_fri_afternoon=$(($owner_fri_afternoon|$2))
	fi
	if [ $(($3&1)) = 1 ]; then
		owner_sat_forenoon=$(($owner_sat_forenoon|$1))
		owner_sat_afternoon=$(($owner_sat_afternoon|$2))
	fi
}

combine_bedtime_workday_nextday()
{
	if [ $(($3&1)) = 1 ]; then
		owner_sun_forenoon=$(($owner_sun_forenoon|$1))
		owner_sun_afternoon=$(($owner_sun_afternoon|$2))
	fi
	if [ $(($3&64)) = 64 ]; then
		owner_mon_forenoon=$(($owner_mon_forenoon|$1))
		owner_mon_afternoon=$(($owner_mon_afternoon|$2))
	fi
	if [ $(($3&32)) = 32 ]; then
		owner_tue_forenoon=$(($owner_tue_forenoon|$1))
		owner_tue_afternoon=$(($owner_tue_afternoon|$2))
	fi
	if [ $(($3&16)) = 16 ]; then
		owner_wed_forenoon=$(($owner_wed_forenoon|$1))
		owner_wed_afternoon=$(($owner_wed_afternoon|$2))
	fi
	if [ $(($3&8)) = 8 ]; then
		owner_thu_forenoon=$(($owner_thu_forenoon|$1))
		owner_thu_afternoon=$(($owner_thu_afternoon|$2))
	fi
	if [ $(($3&4)) = 4 ]; then
		owner_fri_forenoon=$(($owner_fri_forenoon|$1))
		owner_fri_afternoon=$(($owner_fri_afternoon|$2))
	fi
	if [ $(($3&2)) = 2 ]; then
		owner_sat_forenoon=$(($owner_sat_forenoon|$1))
		owner_sat_afternoon=$(($owner_sat_afternoon|$2))
	fi
}

combine_bedtime_forenoon()
{
	owner_sun_forenoon=$(($owner_sun_forenoon|$1))
	owner_mon_forenoon=$(($owner_mon_forenoon|$1))
	owner_tue_forenoon=$(($owner_tue_forenoon|$1))
	owner_wed_forenoon=$(($owner_wed_forenoon|$1))
	owner_thu_forenoon=$(($owner_thu_forenoon|$1))
	owner_fri_forenoon=$(($owner_fri_forenoon|$1))
	owner_sat_forenoon=$(($owner_sat_forenoon|$1))
}

combine_bedtime_afternoon()
{
	owner_sun_afternoon=$(($owner_sun_afternoon|$1))
	owner_mon_afternoon=$(($owner_mon_afternoon|$1))
	owner_tue_afternoon=$(($owner_tue_afternoon|$1))
	owner_wed_afternoon=$(($owner_wed_afternoon|$1))
	owner_thu_afternoon=$(($owner_thu_afternoon|$1))
	owner_fri_afternoon=$(($owner_fri_afternoon|$1))
	owner_sat_afternoon=$(($owner_sat_afternoon|$1))
}

fw_load_owner()
{
	config_get available "$1" available
	if [ "$available" == "false" ]; then
		return
	fi

	config_get bedtime_enable "$1" bedtime_enable '0'
	config_get timeLimits_enable "$1" timeLimits_enable '0'
	config_get offTime_enable "$1" offTime_enable '0'

	if [ "$bedtime_enable" = "1" ]; then
		config_get bedtime_mode "$1" bedtime_mode 'everyday'
	else
		# bedtime enable off
		bedtime_mode="off"
	fi

	if [ "$timeLimits_enable" = "1" ]; then
		config_get timeLimits_mode "$1" timeLimits_mode 'everyday'
	else
		# timeLimits enable off
		timeLimits_mode="off"
		owner_advanced_enable="0"
		owner_sun_time="0"
		owner_mon_time="0"
		owner_tue_time="0"
		owner_wed_time="0"
		owner_thu_time="0"
		owner_fri_time="0"
		owner_sat_time="0"
	fi

	if [ "$offTime_enable" = "1" ]; then
		config_get offTime_mode "$1" offTime_mode 'everyday'
	else
		# offTime enable off
		offTime_mode="off"
		owner_offTime_cus_enable="0"
		owner_sun_forenoon="0"
		owner_sun_afternoon="0"
		owner_mon_forenoon="0"
		owner_mon_afternoon="0"
		owner_tue_forenoon="0"
		owner_tue_afternoon="0"
		owner_wed_forenoon="0"
		owner_wed_afternoon="0"
		owner_thu_forenoon="0"
		owner_thu_afternoon="0"
		owner_fri_forenoon="0"
		owner_fri_afternoon="0"
		owner_sat_forenoon="0"
		owner_sat_afternoon="0"
	fi

	PCTL_DEBUG "Get all need config begin"

	fw_config_get_owner "$1" "owner" "$bedtime_mode" "$timeLimits_mode" "$offTime_mode"

	PCTL_DEBUG "Get all need config end"

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

	ids=$(uci_get_state parental_control_v2 core ids)
	append ids ${owner_id}
	uci_toggle_state parental_control_v2 core ids "${ids}"
	
	fw add 4 f parental_ctrl_${owner_id}
	echo "m $owner_mac" > /proc/pctl/$owner_id
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

	## 把配置转换为PCTL模块可读格式
	local owner_advanced_enable="0"
	local counter=0
	local week="64 32 16 8 4 2 1"
	local weekend

	PCTL_DEBUG "timeLimits"
	## timeLimits
	if [ "$timeLimits_mode" = "everyday" ]; then
		owner_advanced_enable=127
		## 将everyday转换为按天执行的配置
		owner_sun_time=$owner_timeLimits_eve_time
		owner_mon_time=$owner_timeLimits_eve_time
		owner_tue_time=$owner_timeLimits_eve_time
		owner_wed_time=$owner_timeLimits_eve_time
		owner_thu_time=$owner_timeLimits_eve_time
		owner_fri_time=$owner_timeLimits_eve_time
		owner_sat_time=$owner_timeLimits_eve_time
	elif [ "$timeLimits_mode" = "workingDay" ]; then
		if [ "$owner_workday_limit" = "1" ];then
			owner_advanced_enable=$owner_workdays
		fi
		if [ "$owner_weekend_limit" = "1" ];then
			weekend=$((127-$owner_workdays))
			owner_advanced_enable=$(($owner_advanced_enable|$weekend))
		fi

		## 将workday/weekend转换为按天执行的配置
		if [ $(($owner_workdays&64)) = 64 ]; then
			owner_sun_time=$owner_workday_time
		else
			owner_sun_time=$owner_weekend_time
		fi
		if [ $(($owner_workdays&32)) = 32 ]; then
			owner_mon_time=$owner_workday_time
		else
			owner_mon_time=$owner_weekend_time
		fi
		if [ $(($owner_workdays&16)) = 16 ]; then
			owner_tue_time=$owner_workday_time
		else
			owner_tue_time=$owner_weekend_time
		fi
		if [ $(($owner_workdays&8)) = 8 ]; then
			owner_wed_time=$owner_workday_time
		else
			owner_wed_time=$owner_weekend_time
		fi
		if [ $(($owner_workdays&4)) = 4 ]; then
			owner_thu_time=$owner_workday_time
		else
			owner_thu_time=$owner_weekend_time
		fi
		if [ $(($owner_workdays&2)) = 2 ]; then
			owner_fri_time=$owner_workday_time
		else
			owner_fri_time=$owner_weekend_time
		fi
		if [ $(($owner_workdays&1)) = 1 ]; then
			owner_sat_time=$owner_workday_time
		else
			owner_sat_time=$owner_weekend_time
		fi
	elif [ "$timeLimits_mode" = "customize" ]; then
		owner_advanced_enable=$owner_timeLimits_cus_enable
	fi
	PCTL_DEBUG "timeLimits end"

	PCTL_DEBUG "offTime"
	## offTime
	if [ "$offTime_mode" = "everyday" ]; then
		## 将everyday转换为按天执行的配置
		owner_sun_forenoon=$owner_offTime_eve_forenoon
		owner_sun_afternoon=$owner_offTime_eve_afternoon
		owner_mon_forenoon=$owner_offTime_eve_forenoon
		owner_mon_afternoon=$owner_offTime_eve_afternoon
		owner_tue_forenoon=$owner_offTime_eve_forenoon
		owner_tue_afternoon=$owner_offTime_eve_afternoon
		owner_wed_forenoon=$owner_offTime_eve_forenoon
		owner_wed_afternoon=$owner_offTime_eve_afternoon
		owner_thu_forenoon=$owner_offTime_eve_forenoon
		owner_thu_afternoon=$owner_offTime_eve_afternoon
		owner_fri_forenoon=$owner_offTime_eve_forenoon
		owner_fri_afternoon=$owner_offTime_eve_afternoon
		owner_sat_forenoon=$owner_offTime_eve_forenoon
		owner_sat_afternoon=$owner_offTime_eve_afternoon
	elif [ "$offTime_mode" = "workingDay" ]; then
		## 将workday/weekend转换为按天执行的配置, 如果enable是0，要相应的将原值置为0
		if [ $(($owner_workdays&64)) = 64 ]; then
			owner_sun_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_sun_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_sun_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_sun_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
		if [ $(($owner_workdays&32)) = 32 ]; then
			owner_mon_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_mon_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_mon_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_mon_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
		if [ $(($owner_workdays&16)) = 16 ]; then
			owner_tue_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_tue_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_tue_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_tue_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
		if [ $(($owner_workdays&8)) = 8 ]; then
			owner_wed_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_wed_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_wed_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_wed_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
		if [ $(($owner_workdays&4)) = 4 ]; then
			owner_thu_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_thu_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_thu_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_thu_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
		if [ $(($owner_workdays&2)) = 2 ]; then
			owner_fri_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_fri_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_fri_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_fri_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
		if [ $(($owner_workdays&1)) = 1 ]; then
			owner_sat_forenoon=$(($owner_offTime_wrk_forenoon*$owner_offTime_wrk_enable))
			owner_sat_afternoon=$(($owner_offTime_wrk_afternoon*$owner_offTime_wrk_enable))
		else
			owner_sat_forenoon=$(($owner_offTime_wek_forenoon*$owner_offTime_wek_enable))
			owner_sat_afternoon=$(($owner_offTime_wek_afternoon*$owner_offTime_wek_enable))
		fi
	elif [ "$offTime_mode" = "customize" ]; then
		## 将一周中未开启功能几天配置置0传入PCTL
		if [ $(($owner_offTime_cus_enable&64)) = 0 ]; then
			owner_sun_forenoon=0
			owner_sun_afternoon=0
		fi
		if [ $(($owner_offTime_cus_enable&32)) = 0 ]; then
			owner_mon_forenoon=0
			owner_mon_afternoon=0
		fi
		if [ $(($owner_offTime_cus_enable&16)) = 0 ]; then
			owner_tue_forenoon=0
			owner_tue_afternoon=0
		fi
		if [ $(($owner_offTime_cus_enable&8)) = 0 ]; then
			owner_wed_forenoon=0
			owner_wed_afternoon=0
		fi
		if [ $(($owner_offTime_cus_enable&4)) = 0 ]; then
			owner_thu_forenoon=0
			owner_thu_afternoon=0
		fi
		if [ $(($owner_offTime_cus_enable&2)) = 0 ]; then
			owner_fri_forenoon=0
			owner_fri_afternoon=0
		fi
		if [ $(($owner_offTime_cus_enable&1)) = 0 ]; then
			owner_sat_forenoon=0
			owner_sat_afternoon=0
		fi
	fi

	PCTL_DEBUG "offTime end"

	## bedtime最后设置，需要和offTime进行合并
	local temp
	local temp1
	local temp2
	if [ "$bedtime_mode" = "everyday" ]; then
		owner_bedtime_eve_beg=$(($owner_bedtime_eve_beg/30))
		owner_bedtime_eve_end=$(($owner_bedtime_eve_end/30))
		if [ $owner_bedtime_eve_end -gt $owner_bedtime_eve_beg ]; then
			if [ $owner_bedtime_eve_beg -gt 23 ]; then
				owner_bedtime_eve_end=$(($owner_bedtime_eve_end-24))
				owner_bedtime_eve_beg=$(($owner_bedtime_eve_beg-24))
				temp=$((2**$owner_bedtime_eve_end-2**$owner_bedtime_eve_beg))
				combine_bedtime_afternoon "$temp"
			elif [ $owner_bedtime_eve_end -gt 24 ]; then
				temp=$((16777216-2**$owner_bedtime_eve_beg))
				combine_bedtime_forenoon "$temp"

				owner_bedtime_eve_end=$(($owner_bedtime_eve_end-24))
				temp=$((2**$owner_bedtime_eve_end-1))
				combine_bedtime_afternoon "$temp"
			else
				temp=$((2**$owner_bedtime_eve_end-2**$owner_bedtime_eve_beg))
				combine_bedtime_forenoon "$temp"
			fi
		elif [ $owner_bedtime_eve_end -lt $owner_bedtime_eve_beg ]; then
			if [ $owner_bedtime_eve_beg -gt 23 ]; then
				owner_bedtime_eve_beg=$(($owner_bedtime_eve_beg-24))
				temp=$((16777216-2**$owner_bedtime_eve_beg))
				combine_bedtime_afternoon "$temp"
				if [ $owner_bedtime_eve_end -gt 24 ]; then
					owner_bedtime_eve_end=$(($owner_bedtime_eve_end-24))
					temp=$((2**$owner_bedtime_eve_end-1))
					combine_bedtime_forenoon "16777215"
					combine_bedtime_afternoon "$temp"
				else
					temp=$((2**$owner_bedtime_eve_end-1))
					combine_bedtime_forenoon "$temp"
				fi
			else
				temp=$((16777216-2**$owner_bedtime_eve_beg))
				combine_bedtime_forenoon "$temp"
				combine_bedtime_afternoon "16777215"
				temp=$((2**$owner_bedtime_eve_end-1))
				combine_bedtime_forenoon "$temp"
			fi
		fi
	elif [ "$bedtime_mode" = "workingDay" ]; then
		## 先判断workday是否开启，再进行合并
		if [ "$owner_workday_bedtime" = "1" ];then
			owner_workday_begin=$(($owner_workday_begin/30))
			owner_workday_end=$(($owner_workday_end/30))
			if [ $owner_workday_end -gt $owner_workday_begin ]; then
				if [ $owner_workday_begin -gt 23 ]; then
					owner_workday_end=$(($owner_workday_end-24))
					owner_workday_begin=$(($owner_workday_begin-24))
					temp=$((2**$owner_workday_end-2**$owner_workday_begin))
					combine_bedtime_workday "0" "$temp" "$owner_workdays"
				elif [ $owner_workday_end -gt 24 ]; then
					temp1=$((16777216-2**$owner_workday_begin))
					owner_workday_end=$(($owner_workday_end-24))
					temp2=$((2**$owner_workday_end-1))
					combine_bedtime_workday "$temp1" "$temp2" "$owner_workdays"
				else
					temp=$((2**$owner_workday_end-2**$owner_workday_begin))
					combine_bedtime_workday "$temp" "0" "$owner_workdays"
				fi
			elif [ $owner_workday_end -lt $owner_workday_begin ]; then
				if [ $owner_workday_begin -gt 23 ]; then
					owner_workday_begin=$(($owner_workday_begin-24))
					temp1=$((16777216-2**$owner_workday_begin))
					combine_bedtime_workday "0" "$temp1" "$owner_workdays"
					if [ $owner_workday_end -gt 24 ]; then
						owner_workday_end=$(($owner_workday_end-24))
						temp2=$((2**$owner_workday_end-1))
						combine_bedtime_workday_nextday "16777215" "$temp2" "$owner_workdays"
					else
						temp2=$((2**$owner_workday_end-1))
						combine_bedtime_workday_nextday "$temp2" "0" "$owner_workdays"
					fi
				else
					temp1=$((16777216-2**$owner_workday_begin))
					combine_bedtime_workday "$temp1" "16777215" "$owner_workdays"
					temp2=$((2**$owner_workday_end-1))
					combine_bedtime_workday_nextday "$temp2" "0" "$owner_workdays"
				fi
			fi
		fi
		if [ "$owner_weekend_bedtime" = "1" ];then
			weekend=$((127-$owner_workdays))
			owner_weekend_begin=$(($owner_weekend_begin/30))
			owner_weekend_end=$(($owner_weekend_end/30))
			if [ $owner_weekend_end -gt $owner_weekend_begin ]; then
				if [ $owner_weekend_begin -gt 23 ]; then
					owner_weekend_end=$(($owner_weekend_end-24))
					owner_weekend_begin=$(($owner_weekend_begin-24))
					temp=$((2**$owner_weekend_end-2**$owner_weekend_begin))
					combine_bedtime_workday "0" "$temp" "$weekend"
				elif [ $owner_weekend_end -gt 24 ]; then
					temp1=$((16777216-2**$owner_weekend_begin))
					owner_weekend_end=$(($owner_weekend_end-24))
					temp2=$((2**$owner_weekend_end-1))
					combine_bedtime_workday "$temp1" "$temp2" "$weekend"
				else
					temp=$((2**$owner_weekend_end-2**$owner_weekend_begin))
					combine_bedtime_workday "$temp" "0" "$weekend"
				fi
			elif [ $owner_weekend_end -lt $owner_weekend_begin ]; then
				if [ $owner_weekend_begin -gt 23 ]; then
					owner_weekend_begin=$(($owner_weekend_begin-24))
					temp1=$((16777216-2**$owner_weekend_begin))
					combine_bedtime_workday "0" "$temp1" "$weekend"
					if [ $owner_weekend_end -gt 24 ]; then
						owner_weekend_end=$(($owner_weekend_end-24))
						temp2=$((2**$owner_weekend_end-1))
						combine_bedtime_workday_nextday "16777215" "$temp2" "$weekend"
					else
						temp2=$((2**$owner_weekend_end-1))
						combine_bedtime_workday_nextday "$temp2" "0" "$weekend"
					fi
				else
					temp1=$((16777216-2**$owner_weekend_begin))
					combine_bedtime_workday "$temp1" "16777215" "$weekend"
					temp2=$((2**$owner_weekend_end-1))
					combine_bedtime_workday_nextday "$temp2" "0" "$weekend"
				fi
			fi
		fi
	elif [ "$bedtime_mode" = "customize" ]; then
		## 按天合并cumstomize
		if [ $(($owner_bedtime_cus_enable&64)) = 64 ]; then
			owner_bedtime_sun_beg=$(($owner_bedtime_sun_beg/30))
			owner_bedtime_sun_end=$(($owner_bedtime_sun_end/30))
			if [ $owner_bedtime_sun_end -gt $owner_bedtime_sun_beg ]; then
				if [ $owner_bedtime_sun_beg -gt 23 ]; then
					owner_bedtime_sun_end=$(($owner_bedtime_sun_end-24))
					owner_bedtime_sun_beg=$(($owner_bedtime_sun_beg-24))
					temp=$((2**$owner_bedtime_sun_end-2**$owner_bedtime_sun_beg))
					owner_sun_afternoon=$(($owner_sun_afternoon|$temp))
				elif [ $owner_bedtime_sun_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_sun_beg))
					owner_sun_forenoon=$(($owner_sun_forenoon|$temp))

					owner_bedtime_sun_end=$(($owner_bedtime_sun_end-24))
					temp=$((2**$owner_bedtime_sun_end-1))
					owner_sun_afternoon=$(($owner_sun_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_sun_end-2**$owner_bedtime_sun_beg))
					owner_sun_forenoon=$(($owner_sun_forenoon|$temp))
				fi
			elif [ $owner_bedtime_sun_end -lt $owner_bedtime_sun_beg ]; then
				if [ $owner_bedtime_sun_beg -gt 23 ]; then
					owner_bedtime_sun_beg=$(($owner_bedtime_sun_beg-24))
					temp=$((16777216-2**$owner_bedtime_sun_beg))
					owner_sun_afternoon=$(($owner_sun_afternoon|$temp))
					if [ $owner_bedtime_sun_end -gt 24 ]; then
						owner_bedtime_sun_end=$(($owner_bedtime_sun_end-24))
						temp=$((2**$owner_bedtime_sun_end-1))
						owner_mon_forenoon=$(($owner_mon_forenoon|16777215))
						owner_mon_afternoon=$(($owner_mon_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_sun_end-1))
						owner_mon_forenoon=$(($owner_mon_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_sun_beg))
					owner_sun_forenoon=$(($owner_sun_forenoon|$temp))
					owner_sun_afternoon=$(($owner_sun_afternoon|16777215))
					temp=$((2**$owner_bedtime_sun_end-1))
					owner_mon_forenoon=$(($owner_mon_forenoon|$temp))
				fi
			fi
		fi
		if [ $(($owner_bedtime_cus_enable&32)) = 32 ]; then
			owner_bedtime_mon_beg=$(($owner_bedtime_mon_beg/30))
			owner_bedtime_mon_end=$(($owner_bedtime_mon_end/30))
			if [ $owner_bedtime_mon_end -gt $owner_bedtime_mon_beg ]; then
				if [ $owner_bedtime_mon_beg -gt 23 ]; then
					owner_bedtime_mon_end=$(($owner_bedtime_mon_end-24))
					owner_bedtime_mon_beg=$(($owner_bedtime_mon_beg-24))
					temp=$((2**$owner_bedtime_mon_end-2**$owner_bedtime_mon_beg))
					owner_mon_afternoon=$(($owner_mon_afternoon|$temp))
				elif [ $owner_bedtime_mon_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_mon_beg))
					owner_mon_forenoon=$(($owner_mon_forenoon|$temp))

					owner_bedtime_mon_end=$(($owner_bedtime_mon_end-24))
					temp=$((2**$owner_bedtime_mon_end-1))
					owner_mon_afternoon=$(($owner_mon_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_mon_end-2**$owner_bedtime_mon_beg))
					owner_mon_forenoon=$(($owner_mon_forenoon|$temp))
				fi
			elif [ $owner_bedtime_mon_end -lt $owner_bedtime_mon_beg ]; then
				if [ $owner_bedtime_mon_beg -gt 23 ]; then
					owner_bedtime_mon_beg=$(($owner_bedtime_mon_beg-24))
					temp=$((16777216-2**$owner_bedtime_mon_beg))
					owner_mon_afternoon=$(($owner_mon_afternoon|$temp))
					if [ $owner_bedtime_mon_end -gt 24 ]; then
						owner_bedtime_mon_end=$(($owner_bedtime_mon_end-24))
						temp=$((2**$owner_bedtime_mon_end-1))
						owner_tue_forenoon=$(($owner_tue_forenoon|16777215))
						owner_tue_afternoon=$(($owner_tue_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_mon_end-1))
						owner_tue_forenoon=$(($owner_tue_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_mon_beg))
					owner_mon_forenoon=$(($owner_mon_forenoon|$temp))
					owner_mon_afternoon=$(($owner_mon_afternoon|16777215))
					temp=$((2**$owner_bedtime_mon_end-1))
					owner_tue_forenoon=$(($owner_tue_forenoon|$temp))
				fi
			fi
		fi
		if [ $(($owner_bedtime_cus_enable&16)) = 16 ]; then
			owner_bedtime_tue_beg=$(($owner_bedtime_tue_beg/30))
			owner_bedtime_tue_end=$(($owner_bedtime_tue_end/30))
			if [ $owner_bedtime_tue_end -gt $owner_bedtime_tue_beg ]; then
				if [ $owner_bedtime_tue_beg -gt 23 ]; then
					owner_bedtime_tue_end=$(($owner_bedtime_tue_end-24))
					owner_bedtime_tue_beg=$(($owner_bedtime_tue_beg-24))
					temp=$((2**$owner_bedtime_tue_end-2**$owner_bedtime_tue_beg))
					owner_tue_afternoon=$(($owner_tue_afternoon|$temp))
				elif [ $owner_bedtime_tue_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_tue_beg))
					owner_tue_forenoon=$(($owner_tue_forenoon|$temp))

					owner_bedtime_tue_end=$(($owner_bedtime_tue_end-24))
					temp=$((2**$owner_bedtime_tue_end-1))
					owner_tue_afternoon=$(($owner_tue_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_tue_end-2**$owner_bedtime_tue_beg))
					owner_tue_forenoon=$(($owner_tue_forenoon|$temp))
				fi
			elif [ $owner_bedtime_tue_end -lt $owner_bedtime_tue_beg ]; then
				if [ $owner_bedtime_tue_beg -gt 23 ]; then
					owner_bedtime_tue_beg=$(($owner_bedtime_tue_beg-24))
					temp=$((16777216-2**$owner_bedtime_tue_beg))
					owner_tue_afternoon=$(($owner_tue_afternoon|$temp))
					if [ $owner_bedtime_tue_end -gt 24 ]; then
						owner_bedtime_tue_end=$(($owner_bedtime_tue_end-24))
						temp=$((2**$owner_bedtime_tue_end-1))
						owner_wed_forenoon=$(($owner_wed_forenoon|16777215))
						owner_wed_afternoon=$(($owner_wed_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_tue_end-1))
						owner_wed_forenoon=$(($owner_wed_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_tue_beg))
					owner_tue_forenoon=$(($owner_tue_forenoon|$temp))
					owner_tue_afternoon=$(($owner_tue_afternoon|16777215))
					temp=$((2**$owner_bedtime_tue_end-1))
					owner_wed_forenoon=$(($owner_wed_forenoon|$temp))
				fi
			fi
		fi
		if [ $(($owner_bedtime_cus_enable&8)) = 8 ]; then
			owner_bedtime_wed_beg=$(($owner_bedtime_wed_beg/30))
			owner_bedtime_wed_end=$(($owner_bedtime_wed_end/30))
			if [ $owner_bedtime_wed_end -gt $owner_bedtime_wed_beg ]; then
				if [ $owner_bedtime_wed_beg -gt 23 ]; then
					owner_bedtime_wed_end=$(($owner_bedtime_wed_end-24))
					owner_bedtime_wed_beg=$(($owner_bedtime_wed_beg-24))
					temp=$((2**$owner_bedtime_wed_end-2**$owner_bedtime_wed_beg))
					owner_wed_afternoon=$(($owner_wed_afternoon|$temp))
				elif [ $owner_bedtime_wed_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_wed_beg))
					owner_wed_forenoon=$(($owner_wed_forenoon|$temp))

					owner_bedtime_wed_end=$(($owner_bedtime_wed_end-24))
					temp=$((2**$owner_bedtime_wed_end-1))
					owner_wed_afternoon=$(($owner_wed_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_wed_end-2**$owner_bedtime_wed_beg))
					owner_wed_forenoon=$(($owner_wed_forenoon|$temp))
				fi
			elif [ $owner_bedtime_wed_end -lt $owner_bedtime_wed_beg ]; then
				if [ $owner_bedtime_wed_beg -gt 23 ]; then
					owner_bedtime_wed_beg=$(($owner_bedtime_wed_beg-24))
					temp=$((16777216-2**$owner_bedtime_wed_beg))
					owner_wed_afternoon=$(($owner_wed_afternoon|$temp))
					if [ $owner_bedtime_wed_end -gt 24 ]; then
						owner_bedtime_wed_end=$(($owner_bedtime_wed_end-24))
						temp=$((2**$owner_bedtime_wed_end-1))
						owner_thu_forenoon=$(($owner_thu_forenoon|16777215))
						owner_thu_afternoon=$(($owner_thu_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_wed_end-1))
						owner_thu_forenoon=$(($owner_thu_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_wed_beg))
					owner_wed_forenoon=$(($owner_wed_forenoon|$temp))
					owner_wed_afternoon=$(($owner_wed_afternoon|16777215))
					temp=$((2**$owner_bedtime_wed_end-1))
					owner_thu_forenoon=$(($owner_thu_forenoon|$temp))
				fi
			fi
		fi
		if [ $(($owner_bedtime_cus_enable&4)) = 4 ]; then
			owner_bedtime_thu_beg=$(($owner_bedtime_thu_beg/30))
			owner_bedtime_thu_end=$(($owner_bedtime_thu_end/30))
			if [ $owner_bedtime_thu_end -gt $owner_bedtime_thu_beg ]; then
				if [ $owner_bedtime_thu_beg -gt 23 ]; then
					owner_bedtime_thu_end=$(($owner_bedtime_thu_end-24))
					owner_bedtime_thu_beg=$(($owner_bedtime_thu_beg-24))
					temp=$((2**$owner_bedtime_thu_end-2**$owner_bedtime_thu_beg))
					owner_thu_afternoon=$(($owner_thu_afternoon|$temp))
				elif [ $owner_bedtime_thu_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_thu_beg))
					owner_thu_forenoon=$(($owner_thu_forenoon|$temp))

					owner_bedtime_thu_end=$(($owner_bedtime_thu_end-24))
					temp=$((2**$owner_bedtime_thu_end-1))
					owner_thu_afternoon=$(($owner_thu_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_thu_end-2**$owner_bedtime_thu_beg))
					owner_thu_forenoon=$(($owner_thu_forenoon|$temp))
				fi
			elif [ $owner_bedtime_thu_end -lt $owner_bedtime_thu_beg ]; then
				if [ $owner_bedtime_thu_beg -gt 23 ]; then
					owner_bedtime_thu_beg=$(($owner_bedtime_thu_beg-24))
					temp=$((16777216-2**$owner_bedtime_thu_beg))
					owner_thu_afternoon=$(($owner_thu_afternoon|$temp))
					if [ $owner_bedtime_thu_end -gt 24 ]; then
						owner_bedtime_thu_end=$(($owner_bedtime_thu_end-24))
						temp=$((2**$owner_bedtime_thu_end-1))
						owner_fri_forenoon=$(($owner_fri_forenoon|16777215))
						owner_fri_afternoon=$(($owner_fri_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_thu_end-1))
						owner_fri_forenoon=$(($owner_fri_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_thu_beg))
					owner_thu_forenoon=$(($owner_thu_forenoon|$temp))
					owner_thu_afternoon=$(($owner_thu_afternoon|16777215))
					temp=$((2**$owner_bedtime_thu_end-1))
					owner_fri_forenoon=$(($owner_fri_forenoon|$temp))
				fi
			fi
		fi
		if [ $(($owner_bedtime_cus_enable&2)) = 2 ]; then
			owner_bedtime_fri_beg=$(($owner_bedtime_fri_beg/30))
			owner_bedtime_fri_end=$(($owner_bedtime_fri_end/30))
			if [ $owner_bedtime_fri_end -gt $owner_bedtime_fri_beg ]; then
				if [ $owner_bedtime_fri_beg -gt 23 ]; then
					owner_bedtime_fri_end=$(($owner_bedtime_fri_end-24))
					owner_bedtime_fri_beg=$(($owner_bedtime_fri_beg-24))
					temp=$((2**$owner_bedtime_fri_end-2**$owner_bedtime_fri_beg))
					owner_fri_afternoon=$(($owner_fri_afternoon|$temp))
				elif [ $owner_bedtime_fri_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_fri_beg))
					owner_fri_forenoon=$(($owner_fri_forenoon|$temp))

					owner_bedtime_fri_end=$(($owner_bedtime_fri_end-24))
					temp=$((2**$owner_bedtime_fri_end-1))
					owner_fri_afternoon=$(($owner_fri_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_fri_end-2**$owner_bedtime_fri_beg))
					owner_fri_forenoon=$(($owner_fri_forenoon|$temp))
				fi
			elif [ $owner_bedtime_fri_end -lt $owner_bedtime_fri_beg ]; then
				if [ $owner_bedtime_fri_beg -gt 23 ]; then
					owner_bedtime_fri_beg=$(($owner_bedtime_fri_beg-24))
					temp=$((16777216-2**$owner_bedtime_fri_beg))
					owner_fri_afternoon=$(($owner_fri_afternoon|$temp))
					if [ $owner_bedtime_fri_end -gt 24 ]; then
						owner_bedtime_fri_end=$(($owner_bedtime_fri_end-24))
						temp=$((2**$owner_bedtime_fri_end-1))
						owner_sat_forenoon=$(($owner_sat_forenoon|16777215))
						owner_sat_afternoon=$(($owner_sat_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_fri_end-1))
						owner_sat_forenoon=$(($owner_sat_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_fri_beg))
					owner_fri_forenoon=$(($owner_fri_forenoon|$temp))
					owner_fri_afternoon=$(($owner_fri_afternoon|16777215))
					temp=$((2**$owner_bedtime_fri_end-1))
					owner_sat_forenoon=$(($owner_sat_forenoon|$temp))
				fi
			fi
		fi
		if [ $(($owner_bedtime_cus_enable&1)) = 1 ]; then
			owner_bedtime_sat_beg=$(($owner_bedtime_sat_beg/30))
			owner_bedtime_sat_end=$(($owner_bedtime_sat_end/30))
			if [ $owner_bedtime_sat_end -gt $owner_bedtime_sat_beg ]; then
				if [ $owner_bedtime_sat_beg -gt 23 ]; then
					owner_bedtime_sat_end=$(($owner_bedtime_sat_end-24))
					owner_bedtime_sat_beg=$(($owner_bedtime_sat_beg-24))
					temp=$((2**$owner_bedtime_sat_end-2**$owner_bedtime_sat_beg))
					owner_sat_afternoon=$(($owner_sat_afternoon|$temp))
				elif [ $owner_bedtime_sat_end -gt 24 ]; then
					temp=$((16777216-2**$owner_bedtime_sat_beg))
					owner_sat_forenoon=$(($owner_sat_forenoon|$temp))

					owner_bedtime_sat_end=$(($owner_bedtime_sat_end-24))
					temp=$((2**$owner_bedtime_sat_end-1))
					owner_sat_afternoon=$(($owner_sat_afternoon|$temp))
				else
					temp=$((2**$owner_bedtime_sat_end-2**$owner_bedtime_sat_beg))
					owner_sat_forenoon=$(($owner_sat_forenoon|$temp))
				fi
			elif [ $owner_bedtime_sat_end -lt $owner_bedtime_sat_beg ]; then
				if [ $owner_bedtime_sat_beg -gt 23 ]; then
					owner_bedtime_sat_beg=$(($owner_bedtime_sat_beg-24))
					temp=$((16777216-2**$owner_bedtime_sat_beg))
					owner_sat_afternoon=$(($owner_sat_afternoon|$temp))
					if [ $owner_bedtime_sat_end -gt 24 ]; then
						owner_bedtime_sat_end=$(($owner_bedtime_sat_end-24))
						temp=$((2**$owner_bedtime_sat_end-1))
						owner_sun_forenoon=$(($owner_sun_forenoon|16777215))
						owner_sun_afternoon=$(($owner_sun_afternoon|$temp))
					else
						temp=$((2**$owner_bedtime_sat_end-1))
						owner_sun_forenoon=$(($owner_sun_forenoon|$temp))
					fi
				else
					temp=$((16777216-2**$owner_bedtime_sat_beg))
					owner_sat_forenoon=$(($owner_sat_forenoon|$temp))
					owner_sat_afternoon=$(($owner_sat_afternoon|16777215))
					temp=$((2**$owner_bedtime_sat_end-1))
					owner_sun_forenoon=$(($owner_sun_forenoon|$temp))
				fi
			fi
		fi
	fi

	PCTL_DEBUG "bedtime end"
	PCTL_DEBUG "owner_id: ${owner_id}"
	PCTL_DEBUG "owner_today_bonus_time: ${owner_today_bonus_time}"
	PCTL_DEBUG "owner_advanced_enable: ${owner_advanced_enable}"
	PCTL_DEBUG "owner_sun_time: ${owner_sun_time}"
	PCTL_DEBUG "owner_sun_forenoon: ${owner_sun_forenoon}"
	PCTL_DEBUG "owner_sun_afternoon: ${owner_sun_afternoon}"
	PCTL_DEBUG "owner_mon_time: ${owner_mon_time}"
	PCTL_DEBUG "owner_mon_forenoon: ${owner_mon_forenoon}"
	PCTL_DEBUG "owner_mon_afternoon: ${owner_mon_afternoon}"
	PCTL_DEBUG "owner_tue_time: ${owner_tue_time}"
	PCTL_DEBUG "owner_tue_forenoon: ${owner_tue_forenoon}"
	PCTL_DEBUG "owner_tue_afternoon: ${owner_tue_afternoon}"
	PCTL_DEBUG "owner_wed_time: ${owner_wed_time}"
	PCTL_DEBUG "owner_wed_forenoon: ${owner_wed_forenoon}"
	PCTL_DEBUG "owner_wed_afternoon: ${owner_wed_afternoon}"
	PCTL_DEBUG "owner_thu_time: ${owner_thu_time}"
	PCTL_DEBUG "owner_thu_forenoon: ${owner_thu_forenoon}"
	PCTL_DEBUG "owner_thu_afternoon: ${owner_thu_afternoon}"
	PCTL_DEBUG "owner_fri_time: ${owner_fri_time}"
	PCTL_DEBUG "owner_fri_forenoon: ${owner_fri_forenoon}"
	PCTL_DEBUG "owner_fri_afternoon: ${owner_fri_afternoon}"
	PCTL_DEBUG "owner_sat_time: ${owner_sat_time}"
	PCTL_DEBUG "owner_sat_forenoon: ${owner_sat_forenoon}"
	PCTL_DEBUG "owner_sat_afternoon: ${owner_sat_afternoon}"
	PCTL_DEBUG "owner_filter_categories_list: ${owner_filter_categories_list}"

	fw s_add 4 f parental_ctrl_${owner_id} DROP { "-m pctl --advancedMode "1" \
	--id ${owner_id} \
	--blocked ${owner_blocked} \
	--today_bonus_time ${owner_today_bonus_time} \
	--today_reward_time ${owner_today_reward_time} \
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

	fw s_add 4 f parental_ctrl_${owner_id} RETURN

	PCTL_DEBUG "load end"
}

fw_load_parental_ctrl(){
	uci_revert_state parental_control_v2
	uci_toggle_state parental_control_v2 core "" 1
	local wan_type=$(uci get network.wan.wan_type)
	local secure_split_support=$(uci get profile.@avira[0].secure_split_support -c "/etc/profile.d" -q)
	local web_sec_enable=$(uci get parental_control_v2.settings.web_sec_enable -q)
	local intrusion_sec_enable=$(uci get parental_control_v2.settings.intrusion_sec_enable -q)
	local iot_sec_enable=$(uci get parental_control_v2.settings.iot_sec_enable -q)
	local paid_state=$(uci -q get avira.info.state)
	local all_sec_enable
	
	# need to ensure that the order of adding all url filtering rules is earlier than that of parental control profile

	if [ "${secure_split_support}" = "yes" ] && [ "${web_sec_enable}" = "true" ]; then
		fw_add_web_filter_all
	fi

	if [ "$wan_type" != "v6plus" -a "$wan_type" != "dslite" ];then
    	config_foreach	fw_load_owner owner
	fi

	fw_load_device_info
	
	[ -e /usr/sbin/url-class ] && {
		fw_load_dns_resp
	}
	
	if [ "$paid_state" = "paid" ]; then
		if [ "${secure_split_support}" = "yes" ]; then
			[ "${web_sec_enable}" = "true" ] && web_sec_enable=1 || web_sec_enable=0
			[ "${intrusion_sec_enable}" = "true" ] && intrusion_sec_enable=1 || intrusion_sec_enable=0
			[ "${iot_sec_enable}" = "true" ] && iot_sec_enable=1 || iot_sec_enable=0
			all_sec_enable=$(($web_sec_enable*2**0+$intrusion_sec_enable*2**1+$iot_sec_enable*2**2))
			[ -e /proc/block/block_rule ] && {
				echo "${all_sec_enable}" > /proc/block/block_rule
			}
			
		else
			security=$(uci get parental_control_v2.settings.sec_enable)
			if [ "$security" == "true" ]; then
				[ -e /proc/block/block_rule ] && {
					echo S > /proc/block/block_rule
				}
			else
				[ -e /proc/block/block_rule ] && {
					echo s > /proc/block/block_rule
				}
			fi
		fi
	else
		echo s > /proc/block/block_rule
	fi
	
	ids=$(uci_get_state parental_control_v2 core ids)
	[ -z "$ids" ] || {
		fw s_del 4 f FORWARD ACCEPT { "-m conntrack --ctstate RELATED,ESTABLISHED" }
		fw s_add 4 f FORWARD ACCEPT 1 { "-o br-lan -m conntrack --ctstate RELATED,ESTABLISHED" }
	}
	syslog $LOG_INF_FUNCTION_ENABLE

	# for brcm fc support
	accel_handler_for_owner
	
	[ -e /etc/init.d/avira_accel_support ] && {
		/etc/init.d/avira_accel_support restart
	}	
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

	local secure_split_support=$(uci get profile.@avira[0].secure_split_support -c "/etc/profile.d" -q)
	if [ "${secure_split_support}" = "yes" ]; then
		fw_del_web_filter_all
	fi

	fw_unload_device_info
	
	#add by wanghao
	[ -e /usr/sbin/url-class ] && {
		fw_unload_dns_resp
	}
	
	[ -e /proc/block/block_rule ] && {
		echo c > /proc/block/block_rule
		echo m > /proc/block/block_rule
	}
	#add end
	
	uci_revert_state parental_control_v2
	uci_toggle_state parental_control_v2 core "" 0
	syslog $LOG_INF_FUNCTION_DISABLE
}
