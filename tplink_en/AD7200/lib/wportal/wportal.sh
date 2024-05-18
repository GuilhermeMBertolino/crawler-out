#!/bin/sh
. /etc/functions.sh

#各种处理的脚本

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

#初始化crond
wportalctrl_update_init() {
	cp /lib/wportal/wportaltime.sh.tmp /tmp/wportal/wportaltime.sh
#	echo '0 0 * * * /bin/sh /lib/wportal/wportaltimecmd.sh wportalctrl_clear_tmp' >> /etc/crontabs/root 
	echo '* * * * * /bin/sh /etc/hotplug.d/iface/99-wportal ' >> /etc/crontabs/root
    #需要重启crond进程，但是crond进程此时不一定已经启动。
    #此处判断如果crond进程已经启动，则重启，若未启动，则忽略。

    ps | grep crond | grep -v grep 
    if [ $? -eq 0 ] ;
    then
        killall crond
        /usr/sbin/crond -c /etc/crontabs -l 5
    fi
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
	
	local upgrade_level
	
	config_load wportal
	config_get upgrade_enable upgrade enable "yes"
	config_get ignore_time upgrade time "0"
	
	config_load cloud_config
	config_get upgrade_level upgrade_info type "0"
	
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
	
	if [[ $upgrade_level != "1" && $upgrade_level != "2" ]] ;
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
