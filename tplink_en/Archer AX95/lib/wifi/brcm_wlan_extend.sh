#!/bin/sh

# Copyright (c) 2020 Shenzhen TP-LINK Technologies Co.Ltd.
#
# wangxiaolong@tp-link.com.cn
# 2020-11-18
# Content:
#	Create for broadcom wireless-script
# 	This is a default extend-script, should be put in /lib/wifi

##
## model-only extend script(FEATURE_INIT_NVRAM_EXTEND)
##
init_nvram_extend() {
	echo "init_nvram_extend" >$STDOUT
	init_nvram_nbr_discovery_config
	#nvram kset 0:dacdiv10_2g="1"
}

##
## wifi_check(FEATURE_WIFI_CHECK)
##
init_nvram_wifi_check_flag() {
	nvram set wifi_start="0"
}

wifi_check_set_finish_flag()
{
	if [ "$( nvram kget rftestflag )" == "1" ] && [ "$( nvram kget btntestflag )" == "1" ]; then
		nvram set wifi_start="1"
	fi
}

#add by zhangshengbo for check wifi status
wifi_check()
{
	echo "come in wifi_check" >$STDOUT
	
	local c2gl="1"
	local c2gh=""
	local c5g1l="36"
	local c5g1h=""
	local c5g2l=""
	local c5g2h=""
	
	get_if_var
	local country=$( wl country | cut -c 1-2 )
	
	#add nas check into crontab, fix bug 298545. check nas every 1 min, while do nothing when config wireless on web
	#by zhangshengbo
	#crontab -l >/tmp/cron-conf && echo '*/1 * * * * if [ "$( pgrep nas )" == "" ] && [ "$( ps | grep /sbin/wifi | grep -v grep )" == "" ]; then nas; fi ;' >> /tmp/cron-conf && crontab /tmp/cron-conf 

	echo "in wifi_check,country is $country" >$STDOUT
	
	case $country in
		"DE")
			c2gh="13"
			c5g1h="64"
			c5g2l="100"
			c5g2h="140"
			;;
		"US")
			c2gh="11"
			c5g1h="48"
			c5g2l="149"
			c5g2h="165"
			;;
		"JP")
			c2gh="13"
			c5g1h="64"
			c5g2l="100"
			c5g2h="140"
			;;
		"TW")
			c2gh="11"
			c5g1h="48"
			c5g2l="149"
			c5g2h="165"
			;;
		*)
			echo "in wifi_check, country is not US DE TW or JP" >$STDOUT
			country="unknown"
			;;
	esac
	local wifi_all_down="1"
	local BAND_ALL="2g 5g"
	for band in $BAND_ALL; do
		eval local vap0=\${vap0_$band}
		echo "in wifi_check, vap0 is $vap0" >$STDOUT
		
		config_get_bool wifi_disabled $vap0 disabled       #hardware switch
		config_get_bool soft_disabled $vap0 disabled_all   #software switch
		
		if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
			local bssid=$( wl -i $vap0 status | grep BSSID | cut -d ':' -f 2-7 | cut -c 2-18 )
			local channel=$( wl -i $vap0 status | grep Primary | cut -d ':' -f 2 | cut -d ' ' -f 2 )
			wifi_all_down="0"
			echo "in wifi_check,bssid now is $bssid,channel now is $channel" >$STDOUT
			
			if [ "$bssid" == "00:00:00:00:00:00" ] || [ "$bssid" == "" ]; then
				echo "bssid error!!!wifi error!!!reload!!!" > /dev/console
				if [ $( nvram kget rftestflag ) == "1" ]; then
					wifi_reload
				else
					echo "rftestflag !=1, return from wifi check!!" >/dev/console
				fi
				break
			fi
			if [ "$country" != "unknown" ]; then
				if [ "$band" = "2g" ]; then
					if [ "$channel" -lt "$c2gl" ] || [ "$channel" -gt "$c2gh" ]; then
						echo "2g channel error!!!reload!!!" > /dev/console
						if [ $( nvram kget rftestflag ) == "1" ]; then
							wifi_reload
						else
							echo "rftestflag !=1, return from wifi check!!" >/dev/console
						fi
						break
					fi
				else
					#US TW band2 band3 illegal
					if [ "$country" == "US" ] || [ "$country" == "TW" ]; then
						if [ "$channel" -gt "$c5g1h" ] && [ "$channel" -lt "$c5g2l" ]; then
							echo "5g channel error!!!reload!!!" > /dev/console
							if [ $( nvram kget rftestflag ) == "1" ]; then
								wifi_reload
							else
								echo "rftestflag !=1, return from wifi check!!" >/dev/console
							fi
							break
						fi
					#EU JP band4 illegal
					else
						if [ "$channel" -gt "$c5g2h" ]; then
							echo "5g channel error!!!reload!!!" > /dev/console
							if [ $( nvram kget rftestflag ) == "1" ]; then
								wifi_reload
							else
								echo "rftestflag !=1, return from wifi check!!" >/dev/console
							fi
							break
						fi
					fi
				fi	
			fi
		fi
	done

	if [ "$wifi_all_down" == "1" ];then
		return
	fi
	#check nas acsd eapd
	echo "in wifi_check,will check acsd,nas,eapd" >$STDOUT
	
	
	local acsd_isup=$( pgrep acsd )
	#local nas_isup=$( pgrep nas )
	local eapd_isup=$( pgrep eapd )

	if [ "$acsd_isup" == "" ] || [ "$eapd_isup" == "" ]; then
		echo "no acsd or no nas or no eapd!!!!reload!!!" > /dev/console
		if [ $( nvram kget rftestflag ) == "1" ]; then
			wifi_reload
		else
			echo "rftestflag !=1, return from wifi check!!" >/dev/console
		fi
		return
	fi	
}

##
## Add for high performance(FEATURE_HP_FLAG)
##
wifi_add_hp_flag()
{
	#CC Code: US/1
	local tp_hp_flag=`nvram get tp_hp`
	if [ "$tp_hp_flag" = "1" ]; then
		nvram set ${HOME_WIFI}_country_code="US"
		nvram set ${HOME_WIFI}_country_rev="11"
	fi
}

