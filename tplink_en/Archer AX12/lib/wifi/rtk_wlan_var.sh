#!/bin/sh

# Copyright (c) 2021 Shenzhen TP-LINK Technologies Co.Ltd.
#
# yanghuiting@tp-link.com.cn
# 2021-04-08
# Content:
#	Create for qca wireless-script

#
# INI TOOLS
#
read_ini()
{
    file=$1;section=$2;item=$3;
	if [ -z "${file}" -o -z "${section}" -o -z "${item}" ]; then
		wifi_err "[read_ini error] parameters is null!"
		echo "";
		return;
	fi
	
	if [ -e "${file}" ]; then
		val=$(awk -F '=' '/\['${section}'\]/{a=1} (a==1 && "'${item}'"==$1){a=0;print $2}' ${file} | sed 's/^\"//g;s/\"$//g')
		if [ "$?" != "0" ]; then
			wifi_err "[read_ini error] awk exec error!"
			echo "";
		else
			echo ${val};
		fi
	else
		ecwifi_errho "[read_ini error] .ini file is not exist!"
		echo "";
	fi
}

get_wlan_ini()
{
	eval export "${1}=\`read_ini \${INI_FILE} WLAN \${1}\`"
}

read_wlan_ini()
{
	read_ini $INI_FILE WLAN $1
}

getfirm_country()
{
	local country=$(getfirm COUNTRY)
	[ "$country" = "EG" ] && country="DE"
	[ "$country" = "SG" ] && country="US"
	[ "$country" = "SE" ] && country="DE"
	echo $country
}

##
## wlan global var
##
#
# wlan vif
#
VIF_HOME_2G=""
VIF_GUEST_2G=""
VIF_BACKHAUL_2G=""
VIF_RTORCFG_2G=""
VIF_WDS_2G=""

VIF_HOME_5G=""
VIF_GUEST_5G=""
VIF_BACKHAUL_5G=""
VIF_RTORCFG_5G=""
VIF_WDS_5G=""

#
# wlan ifname
#
NAME_HOME_2G=""
NAME_GUEST_2G=""
NAME_BACKHAUL_2G=""
NAME_RTORCFG_2G=""
NAME_WDS_2G=""

NAME_HOME_5G=""
NAME_GUEST_5G=""
NAME_BACKHAUL_5G=""
NAME_RTORCFG_5G=""
NAME_WDS_5G=""

NAME_BR="br-lan"

#
# ini file path
#
INI_FILE=`read_ini /lib/wifi/config.ini WLAN_CONFIG FILE_PATH`
COUNTRY_CODE=`getfirm_country`
