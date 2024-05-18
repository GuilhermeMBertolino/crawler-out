#/bin/sh
#
# Copyright (C) 2019 Tp-link.com
# Author: Jiangji <jiangji@tp-link.com.cn>
# Date: 24Sep19
#

PWR_CONFIG_FILE="/etc/powermanager.conf"

pwr_cfg_title() {
	echo "$1" >> $PWR_CONFIG_FILE
}

pwr_cfg_option() {
	echo "    $1" >> $PWR_CONFIG_FILE
}

prepare_configfile() {
	echo "" > $PWR_CONFIG_FILE

	local THRESH_2GH=110
	local THRESH_2GL=105
	local THRESH_5GH=105
	local THRESH_5GL=100
	local THRESH_CPUH=123
	local THRESH_CPUL=118

	local country=`uci get wireless.wlan0.country`
	if [ "$country" = "US" ] || [ "$country" = "AU" ];then
		THRESH_2GH=105
		THRESH_2GL=100
		THRESH_5GH=110
		THRESH_5GL=105
	fi

	pwr_cfg_title "config action FLAG_2G"
	pwr_cfg_option "option cmd '\$(cat /etc/flag_2g)'"

	pwr_cfg_title "config action FLAG_5G"
	pwr_cfg_option "option cmd '\$(cat /etc/flag_5g)'"

	pwr_cfg_title "config action PROTECT_FLAG"
	pwr_cfg_option "option cmd 'set_flag() { echo \$2 > \$1 ; }'"

	pwr_cfg_title "config action OPEN_CHAIN"
	pwr_cfg_option "option cmd 'open_chain() { iwpriv \$1 sCoCPower 0 2 2 ; } '"

	pwr_cfg_title "config action CLOSE_CHAIN"
	pwr_cfg_option "option cmd 'close_chain() { iwpriv \$1 sCoCPower 0 \$2 \$2 ; }'"

	pwr_cfg_title "config condition TEMP_2G"
	pwr_cfg_option "option cmd '\$(if eval [ \$WLAN0 ] ; then echo \$(iwpriv wlan0 gTemperature | sed \"s/.*gTemperature:\\([0-9]\\+\\) .*/\\1/g\") ; fi ;)'"

	pwr_cfg_title "config condition TEMP_5G"
	pwr_cfg_option "option cmd '\$(if eval [ \$WLAN2 ] ; then echo \$(iwpriv wlan2 gTemperature | sed \"s/.*gTemperature:\\([0-9]\\+\\) .*/\\1/g\") ; fi ;)'"

	pwr_cfg_title "config action MAX_TEMP"
	pwr_cfg_option "option cmd '\$(a=\$(/opt/lantiq/bin/pm_util -t | sed -r \"s/.*Temp1 (.*) C.*Temp2 (.*) C.*/\1/\"); b=\$(/opt/lantiq/bin/pm_util -t | sed -r \"s/.*Temp1 (.*) C.*Temp2 (.*) C.*/\2/\"); if eval [ \`expr \$a \> \$b\` -eq 0 ]; then echo \${b%.*}; else echo \${a%.*}; fi;) '"

	pwr_cfg_title "config condition WLAN0"
	pwr_cfg_option "option cmd '\$(ifconfig | sed \"s/ /\n/g\" | grep \"wlan0\$\")'"

	pwr_cfg_title "config condition WLAN2"
	pwr_cfg_option "option cmd '\$(ifconfig | sed \"s/ /\n/g\" | grep \"wlan2\$\")'"

	pwr_cfg_title "config rule temp_monitor"
	pwr_cfg_option "option freq '30000'"
	pwr_cfg_option "option action_0 '\$PROTECT_FLAG ; \$OPEN_CHAIN ; \$CLOSE_CHAIN'"
	pwr_cfg_option "option condition_1 'test \$WLAN0 && test \$TEMP_2G -ge $THRESH_2GH && test \$FLAG_2G -le 0'"
	pwr_cfg_option "option action_1 'set_flag /etc/flag_2g 1 ; close_chain wlan0 1'"
	pwr_cfg_option "option condition_2 'test \$WLAN0 && test \$TEMP_2G -lt $THRESH_2GL && test \$FLAG_2G -ge 1'"
	pwr_cfg_option "option action_2 'set_flag /etc/flag_2g 0 ; open_chain wlan0'"
	pwr_cfg_option "option condition_3 'test \$WLAN2 && test \$TEMP_5G -ge $THRESH_5GH || test \$MAX_TEMP -ge $THRESH_CPUH && test \$FLAG_5G -le 0'"
	pwr_cfg_option "option action_3 'set_flag /etc/flag_5g 1 ; close_chain wlan2 1'"
	pwr_cfg_option "option condition_4 'test \$WLAN2 && test \$TEMP_5G -lt $THRESH_5GL && test \$MAX_TEMP -lt $THRESH_CPUL && test \$FLAG_5G -ge 1'"
	pwr_cfg_option "option action_4 'set_flag /etc/flag_5g 0 ; open_chain wlan2'"
}