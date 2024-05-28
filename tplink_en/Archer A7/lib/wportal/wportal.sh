#!/bin/sh
. /etc/functions.sh


guest_enable="no"

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
#	config_get access $id access "none"
	
#	if [ $access == "off" ];
#	then
		if [ $guest == "on" ];
		then
			if [ $enable == "on" ] ;
			then
				guest_enable="yes"
			fi
		fi
#	fi
}

wportalctrl_insert_filter_mac(){
	local id=$1
	local MAC
	local enable
	config_get MAC $id mac "none"
	config_get enable $id enable "none"
	if [ $enable == "on" ] ;
	then
		if [ $MAC != "none" ] ;
		then
			wportalctrl -a $MAC
		fi
	fi
}

#add script to crond
wportalctrl_update_init() {
	#every minute
	echo '* * * * * /bin/sh /etc/hotplug.d/iface/99-wportal ' >> /etc/crontabs/root
	#killall crond amybe fail,so use restart
	/etc/init.d/cron restart &
}

# whether or not pop upgrade window.
wportalctrl_time_check() {
	cat /tmp/wportal/status | grep -E "(init|wan_error)"
	if [ $? -eq 0 ] ;
	then
		return
	fi
	
	local should_load
	local loaded
	local ignore_time  # whether or not the "Remind me later" button is clicked
	local upgrade_enable # whether or not the "Ignore the version" button is clicked
	local fw_new_notify
	local upgrade_level
	
	loaded="yes"
	cat /tmp/wportal/status | grep -E "(upgrade)"
	if [ $? -ne 0 ] ;
	then
		loaded="no"
	fi

	should_load="no"
	config_load cloud_config
	config_get fw_new_notify new_firmware fw_new_notify "0"
	config_get upgrade_level upgrade_info type "0"
	if [ $fw_new_notify == "1" ] ;
	then
		should_load="yes"
	fi
	# priority: 1 - low, do not intercept; 2 / 3 - middle / high, intercpet.
	if [[ $upgrade_level != "2" && $upgrade_level != "3" ]] ;
	then 
		should_load="no"
	fi
	
	config_load wportal
	config_get upgrade_enable upgrade enable "yes"
	config_get ignore_time upgrade time "0"
	if [[ $upgrade_enable == "no" ]] ;
	then
		should_load="no"
	fi
	
	guest_enable="no"
	config_clear
	config_load wireless
	config_foreach is_guest_enable
	
	if [[ $guest_enable == "yes" ]] ;
	then
		should_load="no"
	fi
	
	local now_sec
	now_sec=`date +%s`

	if [ $now_sec -ge $ignore_time ] ;
	then
		# wait 24 hour.
		if [ $(( $now_sec - $ignore_time )) -le 86400 ] ;
		then
			should_load="no"
		fi
	else
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

# start to block webpage request and pop upgrade window.
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
	wportalctrl -c
	wportalctrl -s -u http://$lan_ip_addr/webpages/upgrade.html -i $ip
	wportalctrl -d -y
	
	local lan_mask
	config_get lan_mask lan netmask "255.255.255.0"
	wportalctrl -m $lan_mask
	
	echo "upgrade" > /tmp/wportal/status
	
	wportalctrl_add_filter_macs
	wportalctrl_add_local_macs
}

# stop wportal
wportalctrl_stop() {
	wportalctrl -c
	echo "stop" > /tmp/wportal/status
}

# clear wan_error and upgrade info
wportalctrl_clear_all() {
	lua /lib/wportal/clear_wan_error.lua
	lua /lib/wportal/clear_upgrade.lua
}

wportalctrl_clear_upgrade_mac() {
	lua /lib/wportal/clear_upgrade.lua
}
