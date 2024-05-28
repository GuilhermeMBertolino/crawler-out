#!/bin/sh

. /lib/wifi/cal_data_list

# 校准数据设置
set_cal_data()
{
	local ifname=$1
	local ifband=$2
	local key size band value

	for param_row in $cal_data_list; do
		key=${param_row%:*}
		size=${param_row#*:}
		band=${size#*,}
		size=${size%,*}
		value=$(/usr/sbin/rtk_caldata read $key)

		if [ "$band" = "$ifband" ]; then
			case $band in
				2g) iwpriv $ifname set_mib $key=$value;;
				5g) iwpriv $ifname flash_set $key=$value;;
			esac
		fi
	done
}

# usage: get_dfs <op>
get_dfs()
{
	local dfs
	dfs=$(read_wlan_ini DFS_${1}_${COUNTRY_CODE})
	if [ -z $dfs ]; then
		dfs=$(read_wlan_ini DFS_${1}_DFT)
	fi
	echo $dfs
}

# usage: get_pwr_lmt <op> <band>
get_pwr_lmt()
{
	local lmt
	lmt=$(read_wlan_ini PWR_LMT_${1}_${2}_${COUNTRY_CODE})
	if [ -z $lmt ]; then
		lmt=$(read_wlan_ini PWR_LMT_${1}_${2}_DFT)
	fi
	echo $lmt
}

# usage: get_acs_chanlist <band>
get_acs_chanlist()
{
	local chanlist
	chanlist=$(read_wlan_ini ACS_CHAN_${1}_${COUNTRY_CODE})
	if [ -z $chanlist ]; then
		chanlist=$(read_wlan_ini ACS_CHAN_${1}_DFT)
	fi
	echo $chanlist
}

set_pwr_lmt()
{
	local ifname=$1
	local band=$2
	local txpwr_en txpwr_lmt_index

	# 增加查看新校准标志is_cal_new脚本，用于判断是否是旧版EU（即未做共版，不使用功率限制的版本）
	# true 为 已共版，使用功率限制
	# false 为 旧版，使用旧by rate表
	if [ "$(/sbin/is_cal_new)" = "true" ]; then
		if [ "$band" = "2g" ]; then
			txpwr_en=$(get_pwr_lmt EN $band)
			if [ "$txpwr_en" = "1" ]; then
				txpwr_lmt_index=$(get_pwr_lmt REG $band)
				iwpriv $ifname set_mib disable_txpwrlmt=0
				iwpriv $ifname set_mib txpwr_lmt_index=$txpwr_lmt_index
			fi
		fi
	else
		if [ "$band" = "2g" ]; then
			iwpriv $ifname set_mib pwr_by_rate_old=1
		else
			# 5g
			cp -f /etc/conf/rtl8832bre/RFE50/AP_5G/TXPWR_ByRate_Old.txt /etc/conf/rtl8832bre/RFE50/AP_5G/TXPWR_ByRate.txt 	
		fi
	fi
}

set_pwr_lmt_later()
{
	local vif=$1
	local dev band ifname
	local txpwr_en txpwr_lmt_reg

	[ "$(/sbin/is_cal)" != "true" ] && return
	[ "$(/sbin/is_cal_new)" != "true" ] && return

	config_get dev $vif device
	config_get ifname $dev main_ifname
	config_get band $dev band

	if [ "$band" = "5g" ]; then
		txpwr_en=$(get_pwr_lmt EN $band)
		if [ "$txpwr_en" = "1" ]; then
			txpwr_lmt_reg=$(get_pwr_lmt REG $band)
			cmd bb tx_pw lmt en 1
			iwpriv $ifname set_regd $txpwr_lmt_reg
		fi
	fi
}

rtk_set_hw_mib()
{
	local ifname band

	for dev in $DEVICES; do
		config_get ifname $dev main_ifname
		config_get band $dev band

		if [ "$band" = "5g" ]; then
			iwpriv $ifname flash_set xcap=64
		else
			if [ "$(/sbin/is_cal)" != "true" ]; then
				iwpriv $ifname set_mib tssi_enable=0
			fi
		fi

		if [ "$(/sbin/is_cal)" = "true" ]; then
			set_pwr_lmt $ifname $band
			set_cal_data $ifname $band
		fi
	done
}

# caldata_get <key> <value>
caldata_get()
{
	local ___value=""

	___value=$(rtk_caldata read $1)

	eval export "${2}=${___value}"
}

# 功率调整逻辑参考自SDK的boa程序
# power_adjust_2g <ifname> <key> <powerpercent>
power_adjust_2g()
{
	local ifname=$1
	local caldata_key=$2
	local powerpercent=$3
	local intval
	local caldata_value tmp_value adjust_value=""
	local channel_offset_s channel_index=0

	[ $powerpercent -ge 100 ] && return

	# 未校准，则不调整
	[ "$(/sbin/is_cal)" = "false" ] && return

	caldata_get $caldata_key caldata_value

	# 功率相关mib值每个信道都不一样，mib的值有14字节，转成16进制字符串有28个字符
	caldata_value=$caldata_value"0000000000000000000000000000"

	if [ $powerpercent -ge 90 ]; then
		intval=0
	elif [ $powerpercent -ge 80 ]; then
		intval=2
	elif [ $powerpercent -ge 60 ]; then
		intval=5
	elif [ $powerpercent -ge 35 ]; then
		intval=9
	else
		intval=17
	fi

	while [ $channel_index -lt 14 ];  do
		let channel_offset_s=$channel_index*2
		tmp_value=${caldata_value:$channel_offset_s:2}
		tmp_value=$(printf "%d" 0x$tmp_value)
		if [ $tmp_value -gt 0 ]; then
			let tmp_value=$tmp_value-$intval
			if [ $tmp_value -lt 1 ]; then
				tmp_value=1
			fi
		fi
		tmp_value=$(printf "%02X" $tmp_value)
		adjust_value=$adjust_value$tmp_value
		let channel_index+=1
	done

	iwpriv $ifname set_mib "$caldata_key=$adjust_value"
}