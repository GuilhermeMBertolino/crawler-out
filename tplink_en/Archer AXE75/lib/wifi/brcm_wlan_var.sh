#!/bin/sh

# Copyright (c) 2020 Shenzhen TP-LINK Technologies Co.Ltd.
#
# wangxiaolong@tp-link.com.cn
# 2021-1-5
# Content:
#	Create for broadcom wireless-script

#
# INI TOOLS
#
read_ini() {
    file=$1;section=$2;item=$3;
	if [ -z "${file}" -o -z "${section}" -o -z "${item}" ]; then
		echo "[read_ini error] parameters is null!" >/dev/console
		echo "";
		return;
	fi
	
	if [ -e "${file}" ]; then
		val=$(awk -F '=' '/\['${section}'\]/{a=1} (a==1 && "'${item}'"==$1){a=0;print $2}' ${file} | sed 's/^\"//g;s/\"$//g')
		if [ "$?" != "0" ]; then
			echo "[read_ini error] awk exec error!" >/dev/console
			echo "";
		else
			echo ${val};
		fi
	else
		echo "[read_ini error] .ini file is not exist!" >/dev/console
		echo "";
	fi
}

get_wlan_ini() {
	eval export "${1}=\`read_ini \${INI_FILE} WLAN \${1}\`"
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
VIF_WDS_2G=""

VIF_HOME_5G=""
VIF_GUEST_5G=""
VIF_BACKHAUL_5G=""
VIF_WDS_5G=""

VIF_HOME_5G2=""
VIF_GUEST_5G2=""
VIF_BACKHAUL_5G2=""
VIF_WDS_5G2=""

VIF_HOME_6G=""
VIF_GUEST_6G=""
VIF_BACKHAUL_6G=""
VIF_WDS_6G=""

#
# wlan ifname
#
NAME_HOME_2G=""
NAME_GUEST_2G=""
NAME_BACKHAUL_2G=""
NAME_WDS_2G=""

NAME_HOME_5G=""
NAME_GUEST_5G=""
NAME_BACKHAUL_5G=""
NAME_WDS_5G=""

NAME_HOME_5G2=""
NAME_GUEST_5G2=""
NAME_BACKHAUL_5G2=""
NAME_WDS_5G2=""

NAME_HOME_6G=""
NAME_GUEST_6G=""
NAME_BACKHAUL_6G=""
NAME_WDS_6G=""

#
# ini file path
#
INI_FILE=`read_ini /lib/wifi/config.ini WLAN_CONFIG FILE_PATH`