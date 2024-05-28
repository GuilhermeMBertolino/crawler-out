# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh

crontab_cmd="\* \* \* \* \* \/sbin\/family_check"

DEBUG="on"

if [ x"$DEBUG" == x"on" ]; then
	STDOUT="/dev/console"
else
	STDOUT="/dev/null"
fi

FW_DEBUG() {
	echo "$@" > $STDOUT
}

fw_config_get_global(){
	# $1 should be parental_control_v2 section "familytime"
	fw_config_get_section "$1" family { \
		string enable		"false" \
		string time			"0" \
	} || return   
}

fw_config_get_client(){
	fw_config_get_section "$1" client { \
		string mac			"" \
		string family		"off" \
	} || return
}

fw_load_client() {
	fw_config_get_client "$1"

	local client_mac=${client_mac//-/:}
	client_mac=$(echo $client_mac | tr [a-z] [A-Z])

	local lan_target
	if [ "$client_family" == "on" ]; then
		FW_DEBUG "$client_mac"
		fw s_add 4 f parental_family_time DROP { "-m mac --mac-source $client_mac" }
		macs=$(uci_get_state parental_control_v2 core check_time)
		append macs ${client_mac}
		uci_toggle_state parental_control_v2 core check_time "${macs}"
	fi
}

fw_load_family_time() {
	if [[ x"$(uci_get_state parental_control_v2 core loaded)" != x1 ]]; then
		## 1. 功能是否开启
		fw_config_get_global "familytime"
		FW_DEBUG "$family_enable" "$family_time"
		if [ "$family_enable" == "false" ]; then
			syslog $LOG_INF_FUNCTION_DISABLE
			uci_revert_state parental_control_v2 core loaded
			uci_revert_state parental_control_v2 core check_time
			uci_set_state parental_control_v2 core loaded 0
			return
		fi

		## 2. 功能是否在生效时段
		local now=`date '+%s'`
		if [ "$now" -ge "$family_time" ]; then
			uci set parental_control_v2.familytime.enable='false'
			uci commit
			syslog $LOG_INF_FUNCTION_DISABLE
			uci_revert_state parental_control_v2 core loaded
			uci_revert_state parental_control_v2 core check_time
			uci_set_state parental_control_v2 core loaded 0
			return
		fi

		## 3. 创建主链parental_family_time并加入到forward下
		
		fw add 4 f parental_family_time
		fw s_add 4 f forward parental_family_time 1 { "-i br-lan" }

		## 3. 设置防火墙规则（fw_load_client），设置定时器
		syslog $LOG_INF_FUNCTION_ENABLE
		uci_revert_state parental_control_v2 core check_time
		config_foreach fw_load_client client

		local macs=$(uci_get_state parental_control_v2 core check_time)
		if [ ! -z "$macs" ]; then
			sed -i "/^${crontab_cmd}/d" /etc/crontabs/root 
			echo "* * * * * /sbin/family_check" >> /etc/crontabs/root 
			/etc/init.d/cron restart &
		fi
		uci_revert_state parental_control_v2 core loaded
		uci_set_state parental_control_v2 core loaded 1
	fi
}

fw_exit_family_time() {
	## 1. 如果已load规则，需要清空规则再退出
	if [[ x"$(uci_get_state parental_control_v2 core loaded)" == x1 ]]; then
		## 1. 删除相关规则
		fw flush 4 f parental_family_time
		fw s_del 4 f forward parental_family_time { "-i br-lan" }
		fw del 4 f parental_family_time
		
		## 2. 重置状态
		uci_revert_state parental_control_v2 core loaded
		uci_revert_state parental_control_v2 core check_time
		uci_set_state parental_control_v2 core loaded 0

		## 3. 删除定时器
		sed -i "/^${crontab_cmd}/d" /etc/crontabs/root
		/etc/init.d/cron restart &
	fi
}

fw_check_familytime() {
	## 1. family time check status
	FW_DEBUG "[ Family Time ] exec family check."
	local old_macs=$(uci_get_state parental_control_v2 core check_time)
	local new_macs

	## 1. family time时间结束
	fw_config_get_global "familytime"
	now=`date '+%s'`
	if [ "$now" -ge "$family_time" ]; then
		## 1. 修改配置
		uci set parental_control_v2.familytime.time='0'
		uci set parental_control_v2.familytime.enable='false'
		uci commit
		## 2. 清空规则 & 删除定时器
		fw_exit_family_time
		return
	fi

	## 2. 功能仍在生效时段
	## do nothing
}