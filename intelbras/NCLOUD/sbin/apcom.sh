#!/bin/sh
#
# 处理与soft AC通信中需要的信息
#

case "$1" in
	"init")
		rm -rf /etc/apcom.conf
		route add -net 224.0.0.0 netmask 224.0.0.0 br0
		ip=`ifconfig br0 |grep "inet addr" |cut -d: -f2 |cut -d" " -f1`
		echo IP_ADDR=$ip >> /etc/apcom.conf
		mac=`ifconfig ra0  | sed -n '/HWaddr/ s/^.*HWaddr *//pg'`
		echo MAC_ADDR=$mac >> /etc/apcom.conf ;;
	"change_ip")
		rm -rf /etc/apcom.conf
		ip=`ifconfig br0 |grep "inet addr" |cut -d: -f2 |cut -d" " -f1`
		echo IP_ADDR=$ip >> /etc/apcom.conf
		mac=`ifconfig ra0  | sed -n '/HWaddr/ s/^.*HWaddr *//pg'`
		echo MAC_ADDR=$mac >> /etc/apcom.conf ;;
	"ssid")
		nvram_set 2860 SSID1 $2
		iwpriv ra0 set SSID=$2;;
	"channel")
		nvram_set 2860 Channel $2
		iwpriv ra0 set Channel=$2;;
	"band")
		if [ "$2" = "0" ]; then
			nvram_set 2860 HT_BW 0
		else
			nvram_set 2860 HT_BW 1
		fi;;
	"op_mode")
		if [ "$2" = "0" ]; then
			nvram_set 2860 bridgeMode 0
		else
			nvram_set 2860 bridgeMode 1
		fi;;
	"sec_mode")
		if [ "$2" = "0" ]; then
			nvram_set 2860 AuthMode OPEN
			nvram_set 2860 EncrypType NONE
		elif [ "$2" = "1" ]; then
			nvram_set 2860 AuthMode OPEN
			nvram_set 2860 EncrypType WEP
			if [ "$4" = "0" ]; then
				nvram_set 2860 Key1Type 0
			elif [ "$4" = "1" ]; then
				nvram_set 2860 Key1Type 1
			fi
			nvram_set 2860 DefaultKeyID 1
		elif [ "$2" = "2" ]; then
			nvram_set 2860 AuthMode SHARED
			nvram_set 2860 EncrypType WEP
			if [ "$4" = "0" ]; then
				nvram_set 2860 Key1Type 0
			elif [ "$4" = "1" ]; then
				nvram_set 2860 Key1Type 1
			fi
			nvram_set 2860 DefaultKeyID 1
		elif [ "$2" = "3" ]; then
			nvram_set 2860 AuthMode WPAPSK
			nvram_set 2860 DefaultKeyID 2
			if [ "$3" = "3" ]; then
				nvram_set 2860 EncrypType TKIP
			elif [ "$3" = "4" ]; then
				nvram_set 2860 EncrypType AES
			fi
		elif [ "$2" = "4" ]; then
			nvram_set 2860 AuthMode WPA2PSK
			nvram_set 2860 DefaultKeyID 2
			if [ "$3" = "3" ]; then
				nvram_set 2860 EncrypType TKIP
			elif [ "$3" = "4" ]; then
				nvram_set 2860 EncrypType AES
			elif [ "$3" = "5" ]; then
				nvram_set 2860 EncrypType TKIPAES
			fi
		elif [ "$2" = "5" ]; then
			nvram_set 2860 AuthMode WPAPSKWPA2PSK
			nvram_set 2860 DefaultKeyID 2
			if [ "$3" = "3" ]; then
				nvram_set 2860 EncrypType TKIP
			elif [ "$3" = "4" ]; then
				nvram_set 2860 EncrypType AES
			elif [ "$3" = "5" ]; then
				nvram_set 2860 EncrypType TKIPAES
			fi
		fi;;
	"password")
		encryptype=`nvram_get 2860 EncrypType`
		if [ `echo $encryptype | grep '^WEP'` ]; then
			nvram_set 2860 Key1Str1 $2
		else
			nvram_set 2860 WPAPSK1 $2
		fi;;
	"hssid")
		if [ "$2" = "0" ]; then
			nvram_set 2860 HideSSID 0
		else
			nvram_set 2860 HideSSID 1
		fi;;
	"wmm")
		nvram_set 2860 WmmCapable $2;;
	"get_ssid")
		rm -rf /etc/apcom_get_tmp.conf
		nvram_get 2860 SSID1 > /etc/apcom_get_tmp.conf;;
	"get_channel")
		rm -rf /etc/apcom_get_tmp.conf
		nvram_get 2860 Channel > /etc/apcom_get_tmp.conf;;
	"get_band")
		rm -rf /etc/apcom_get_tmp.conf
		nvram_get 2860 HT_BW > /etc/apcom_get_tmp.conf;;
	"op_mode")
		rm -rf /etc/apcom_get_tmp.conf
		nvram_get 2860 bridgeMode > /etc/apcom_get_tmp.conf;;
	"get_sec_mode")
		rm -rf /etc/apcom_get_tmp.conf
		auth_mode=`nvram_get 2860 AuthMode`
		encryptype=`nvram_get 2860 EncrypType`
		key_format=`nvram_get 2860 Key1Type`
		wep_key=`nvram_get 2860 Key1Str1`
		wpa_key=`nvram_get 2860 WPAPSK1`
		if [ `echo $encryptype | grep '^NONE'` ]; then
			echo 000 > /etc/apcom_get_tmp.conf
		elif [ `echo $encryptype | grep '^WEP'` ]; then
			if [ `echo $auth_mode | grep '^OPEN'` ]; then
				if [ `echo $key_format | grep '^1'` ]; then
					if [ ${#wep_key} -eq 5 ]; then
						echo 111 > /etc/apcom_get_tmp.conf
					else
						echo 121 > /etc/apcom_get_tmp.conf
					fi
				else
					if [ ${#wep_key} -eq 10 ]; then
						echo 110 > /etc/apcom_get_tmp.conf
					else
						echo 120 > /etc/apcom_get_tmp.conf
					fi
				fi
			else
				if [ `echo $key_format | grep '^1'` ]; then
					if [ ${#wep_key} -eq 5 ]; then
						echo 211 > /etc/apcom_get_tmp.conf
					else
						echo 221 > /etc/apcom_get_tmp.conf
					fi
				else
					if [ ${#wep_key} -eq 10 ]; then
						echo 210 > /etc/apcom_get_tmp.conf
					else
						echo 220 > /etc/apcom_get_tmp.conf
					fi
				fi
			fi
		elif [ `echo $encryptype | grep '^TKIPAES'` ]; then
			if [ `echo $auth_mode | grep '^WPAPSKWPA2PSK'` ]; then
				if [ ${#wpa_key} -eq 64 ]; then
					echo 550 > /etc/apcom_get_tmp.conf
				else
					echo 551 > /etc/apcom_get_tmp.conf
				fi
			else
				if [ ${#wpa_key} -eq 64 ]; then
					echo 450 > /etc/apcom_get_tmp.conf
				else
					echo 451 > /etc/apcom_get_tmp.conf
				fi
			fi
		elif [ `echo $encryptype | grep '^TKIP'` ]; then
			if [ `echo $auth_mode | grep '^WPAPSKWPA2PSK'` ]; then
				if [ ${#wpa_key} -eq 64 ]; then
					echo 530 > /etc/apcom_get_tmp.conf
				else
					echo 531 > /etc/apcom_get_tmp.conf
				fi
			elif [ `echo $auth_mode | grep '^WPA2PSK'` ]; then
				if [ ${#wpa_key} -eq 64 ]; then
					echo 430 > /etc/apcom_get_tmp.conf
				else
					echo 431 > /etc/apcom_get_tmp.conf
				fi
			else
				if [ ${#wpa_key} -eq 64 ]; then
					echo 330 > /etc/apcom_get_tmp.conf
				else
					echo 331 > /etc/apcom_get_tmp.conf
				fi
			fi
		elif [ `echo $encryptype | grep '^AES'` ]; then
			if [ `echo $auth_mode | grep '^WPAPSKWPA2PSK'` ]; then
				if [ ${#wpa_key} -eq 64 ]; then
					echo 540 > /etc/apcom_get_tmp.conf
				else
					echo 541 > /etc/apcom_get_tmp.conf
				fi
			elif [ `echo $auth_mode | grep '^WPA2PSK'` ]; then
				if [ ${#wpa_key} -eq 64 ]; then
					echo 440 > /etc/apcom_get_tmp.conf
				else
					echo 441 > /etc/apcom_get_tmp.conf
				fi
			else
				if [ ${#wpa_key} -eq 64 ]; then
					echo 340 > /etc/apcom_get_tmp.conf
				else
					echo 341 > /etc/apcom_get_tmp.conf
				fi
			fi
		fi;;
	"get_password")
		rm -rf /etc/apcom_get_tmp.conf
		encryptype=`nvram_get 2860 EncrypType`
		if [ `echo $encryptype | grep '^WEP'` ]; then
			nvram_get 2860 Key1Str1 > /etc/apcom_get_tmp.conf
		else
			nvram_get 2860 WPAPSK1 > /etc/apcom_get_tmp.conf
		fi;;
	"get_hssid")
		rm -rf /etc/apcom_get_tmp.conf
		nvram_get 2860 HideSSID > /etc/apcom_get_tmp.conf;;
	"get_wmm")
		rm -rf /etc/apcom_get_tmp.conf
		nvram_get 2860 WmmCapable > /etc/apcom_get_tmp.conf;;
	"set_ip")
		ifconfig br0 $2;;
	"statistical_get_SWV")
		rm -rf /etc/ap_statistical.conf
		nvram_get 2860 softwareversion > /etc/ap_statistical.conf;;
	"statistical_get_HWV")
		rm -rf /etc/ap_statistical.conf
		nvram_get 2860 hardwareversion > /etc/ap_statistical.conf;;
	"statistical_get_DM")
		rm -rf /etc/ap_statistical.conf
		nvram_get 2860 devicemodel > /etc/ap_statistical.conf;;
	"statistical_get_path")
		rm -rf /etc/ap_statistical.conf
		nvram_get 2860 WebServicePath > /etc/ap_statistical.conf;;
	"statistical_get_port")
		rm -rf /etc/ap_statistical.conf
		nvram_get 2860 WebServiceport > /etc/ap_statistical.conf;;
	"statistical_get_type")
		rm -rf /etc/ap_statistical.conf
		nvram_get 2860 WebServicetype > /etc/ap_statistical.conf;;
	"statistical_report")
		echo statistical_report
		reboot_state=`nvram_get 2860 rebootstate`
		/bin/statistclient d
		/bin/statistclient s
		if [ "$reboot_state" = "1" ]; then
			/bin/statistclient r
		fi
		;;
esac

