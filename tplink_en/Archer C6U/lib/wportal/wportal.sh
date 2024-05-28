#!/bin/sh
. /etc/functions.sh

#各种处理的脚本
guest_enable="no"
#废弃，之前拦截功能需要区分mac，但是后来不需要区分，从而废弃
wportalctrl_insert_mac_forever(){
	local id=$1
	local type
	config_get MAC $id mac ""
	config_get type $id TYPE ""
	if [ $type == "device" ] ;
	then
		wportalctrl -a $MAC
	fi
}

local have_account="0"

account_check(){
	local id=$1
	config_get password $id password ""
	if [ ! -z $password ] ;
	then
		have_account="1"
	fi
}

is_account_exist(){
	have_account="0"
	config_load accountmgnt
	config_foreach account_check account
 	if [ $have_account != "0" ] ;
 	then
 		return "1"
	fi

	local need_unbind
	config_foreach account_check cloud_account
	config_load cloud_config
 	config_get need_unbind device_status need_unbind "0"
	if [ $have_account != "0" -a $need_unbind == "0" ] ;
	then
		return "1"
	fi

	return 0
}

is_guest_enable(){
	local id=$1
	local guest
	local enable
	config_get guest $id guest "none"
	config_get enable $id enable "none"
	if [ $guest == "on" ];
	then
		if [ $enable == "on" ] ;
		then
			guest_enable="yes"
		fi
	fi
}

wportalctrl_insert_filter_mac(){
	local id=$1
	local MAC
	config_get MAC $id mac "none"
	if [ $MAC != "none" ] ;
	then
		wportalctrl -a $MAC
	fi
}

#初始化crond
wportalctrl_update_init() {
	cp /lib/wportal/wportaltime.sh.tmp /tmp/wportal/wportaltime.sh

	echo '* * * * * /bin/sh /etc/hotplug.d/iface/99-wportal ' >> /etc/crontabs/root
	/etc/init.d/cron restart &
}

#判断是否加载upgrade并进行相关操作。
wportalctrl_time_check() {
	cat /tmp/wportal/status | grep -E "(init|wan_error)"
	if [ $? -eq 0 ] ;
	then
		#init与wan_error状态优先级比upgrade高，不进行加载
		return
	fi
	
	local should_load	#模块是否应该加载
	local loaded		#模块是否已经加载
	local ignore_time	#点击24小时不再提示的时间
	local upgrade_enable		#是否点击了不再提示
	
	loaded="yes"
	cat /tmp/wportal/status | grep -E "(upgrade)"
	if [ $? -ne 0 ] ;
	then
		loaded="no"
	fi
#	local release_sec	#推送到达时间
	should_load="no"
	config_load cloud_config
	config_get fw_new_notify new_firmware fw_new_notify "0"
	if [ $fw_new_notify == "1" ] ;
	then
		should_load="yes"
	fi
#	config_load cloud_config
#	config_get release_sec new_firmware time "0"
	
#	ignore_time=`cat /tmp/wportal/upgrade_ignore_tmp`
#	if [ $? == 1 ] ;
#	then
#		ignore_time="0"
#	fi
	
	local upgrade_level	#模块优先级，1：低优先级，不拦截。2，3：中/高优先级，拦截
	
	config_load wportal
	config_get upgrade_enable upgrade enable "yes"
	config_get ignore_time upgrade time "0"
	
	config_load cloud_config
	config_get upgrade_level upgrade_info type "0"
	
	guest_enable="no"
	config_clear
	config_load wireless
	config_foreach is_guest_enable
	
	if [[ $guest_enable == "yes" ]] ;
	then
		should_load="no"
	fi
#	if [[ $release_sec == "0" ]] ;
#	then
#		return
#	else
	
	local now_sec	#当前时间
	now_sec=`date +%s`
		
		#一个月以内才加载
#       if [ $now_sec -ge $release_sec ] ;
#		then
#           if [ $(( $now_sec - $release_sec )) -le 2592000 ] ;
#			then 
#				should_load="yes"
#			else
#				should_load="no"
#			fi
#		else
#			should_load="no"
#		fi
		
		#一天以内都不加载
	if [ $now_sec -ge $ignore_time ] ;
	then
		if [ $(( $now_sec - $ignore_time )) -le 86400 ] ;
		then
			should_load="no"
		fi
	else
		should_load="no"
	fi
	
	#不加载
	if [[ $upgrade_enable == "no" ]] ;
	then
		should_load="no"
	fi
	
	if [[ $upgrade_level != "2" && $upgrade_level != "3" ]] ;
	then 
		should_load="no"
	fi
	
	if [[ $should_load == $loaded ]];
	then
		return 
	fi
	
	if [[ $should_load == "yes" ]];
	then
		wportalctrl_update_start
	else
		wportalctrl_stop
	fi
#	fi
}

wportalctrl_outdate() {
	rm /tmp/wportal/wportaltime.sh
}

wportalctrl_add_filter_macs(){
	wportalctrl -r
	config_clear
	config_load parental_control

	config_get enable settings enable "off"
	if [ $enable == "on" ];
	then
		config_foreach wportalctrl_insert_filter_mac
	fi
}

wportalctrl_insert_local_mac(){
	local id=$1
	local MAC
	local enable
	config_get enable $id enable "none"
	config_get MAC $id mac "none"
	if [ $enable == "on" ] ;
	then
		if [ $MAC != "none" ] ;
		then
			wportalctrl -l $MAC
		fi
	fi
}

wportalctrl_add_local_macs(){
	config_clear
	config_load administration

	config_get enable local mode "all"
	if [ $enable == "partial" ];
	then
		config_foreach wportalctrl_insert_local_mac
	fi
}

#无论什么情况，加载upgrade页面
wportalctrl_update_start() {
	local ip
	config_load network
	config_get ip lan ipaddr ""
	local domain
	config_load domain_login
	config_get domain tp_domain domain ""
	local lan_ip_addr
	config_load network
	config_get lan_ip_addr lan ipaddr $domain
	
	local time=`cat /etc/webpage_time`
	local webpage_path=""
	[ "x$time" == "x" ] || webpage_path="${time}."

	wportalctrl -c
	wportalctrl -s -u http://$lan_ip_addr/webpages/upgrade.${webpage_path}html -i $ip
	wportalctrl -d -y
	
	local lan_mask
	config_get lan_mask lan netmask "255.255.255.0"
	wportalctrl -m $lan_mask
	
	echo "upgrade" > /tmp/wportal/status
	
	wportalctrl_add_filter_macs
	wportalctrl_add_local_macs
#	config_load wportal
#	config_foreach wportalctrl_insert_mac_forever
#	[ -x /tmp/wportal/wportaltmp.sh ] && chmod 777 /tmp/wportal/wportaltmp.sh && /tmp/wportal/wportaltmp.sh
}

#无论什么情况，停止一切页面加载
wportalctrl_stop() {
	wportalctrl -c
	echo "stop" > /tmp/wportal/status
}

wportalctrl_restart() {
#	rm -f /tmp/wportaltmp.sh
	wportalctrl_stop
	wportalctrl_update_start
}

#软件升级后，清除wan_error，upgrade标记
wportalctrl_clear_all() {
	lua /lib/wportal/clear_wan_error.lua
	lua /lib/wportal/clear_upgrade.lua
	rm /tmp/wportal/upgrade_ignore_tmp
#	lua /lib/wportal/saveconfig.lua
#	local defcfg
#	defcfg=`cat /etc/config/wportal | grep 'option' | grep defcfg`
#
#	echo > /etc/config/wportal
#	echo "config wportal 'defcfg'" >> /etc/config/wportal
#	echo "$defcfg" >> /etc/config/wportal
#	lua /lib/wportal/saveconfig.lua
}

#收到云推送后，清除云推送相关标记，保存wan error的标记。
wportalctrl_clear_upgrade_mac() {
	lua /lib/wportal/clear_upgrade.lua
#	lua /lib/wportal/saveconfig.lua
#	local defcfg
#	defcfg=`cat /etc/config/wportal | grep 'option' | grep defcfg`
#	cat /etc/config/wportal | grep -A 3 wan_error_device > /tmp/config_wportal
#	cat /tmp/config_wportal > /etc/config/wportal
#	echo "config wportal 'defcfg'" >> /etc/config/wportal
#	echo "$defcfg" >> /etc/config/wportal
#	rm /tmp/config_wportal
#	lua /lib/wportal/saveconfig.lua
}
