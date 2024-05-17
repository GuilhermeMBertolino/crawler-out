# !/bin/sh

. /etc/wlan/wifi_conf

echo "************update wps anotherband setting*************" > /dev/console
sleep 1
ifname=$1
role=$2
echo "************update wps anotherband setting $ifname $role*************" > /dev/console
if [ "$is_dual_band" = "0" ]; then
	if [ "$ifname" = "wl0" ];then
		ifname2="wl1"
		ifname3="wl2"
		ifname_onoff=$(config get endis_wla_2nd_radio)
		ifname2_onoff=$(config get endis_wl_radio)
		ifname3_onoff=$(config get endis_wla_radio)
	elif [ "$ifname" = "wl1" ];then
		ifname2="wl0"
		ifname3="wl2"
		ifname2_onoff=$(config get endis_wla_2nd_radio)
		ifname_onoff=$(config get endis_wl_radio)
		ifname3_onoff=$(config get endis_wla_radio)
	else
		ifname2="wl0"
		ifname3="wl1"
		ifname2_onoff=$(config get endis_wla_2nd_radio)
		ifname3_onoff=$(config get endis_wl_radio)
		ifname_onoff=$(config get endis_wla_radio)
	fi
else
	if [ "$ifname" = "wl0" ];then
		ifname2="wl1"
		ifname3="wl1"
		ifname2_onoff=$(config get endis_wla_radio)
		ifname_onoff=$(config get endis_wl_radio)
	elif [ "$ifname" = "wl1" ];then
		ifname2="wl0"
		ifname3="wl0"
		ifname_onoff=$(config get endis_wla_radio)
		ifname2_onoff=$(config get endis_wl_radio)
	fi
fi
akm=`nvram get ${ifname}_akm`
crypto=`nvram get ${ifname}_crypto`
wpa_psk=`nvram get ${ifname}_wpa_psk`
tmp_ssid=`nvram get ${ifname}_ssid`
qca_hostapd_config_file=/tmp/`echo $ifname2`_hapd.conf
other_akm=`nvram get ${ifname2}_akm`
other_wpa_psk=`nvram get ${ifname2}_wpa_psk`
nvram set ${ifname2}_akm="$akm"
nvram set ${ifname2}_crypto="$crypto"
nvram set ${ifname2}_wpa_psk="$wpa_psk"
if [ "$is_dual_band" = "0" ]; then
	qca_hostapd_config_file_2=/tmp/`echo $ifname3`_hapd.conf
	other_akm_2=`nvram get ${ifname3}_akm`
	other_wpa_psk_2=`nvram get ${ifname3}_wpa_psk`
	nvram set ${ifname3}_akm="$akm"
	nvram set ${ifname3}_crypto="$crypto"
	nvram set ${ifname3}_wpa_psk="$wpa_psk"
fi

        sed -i '1,/^wpa/{s/^wpa/##wpa/}' $qca_hostapd_config_file
        sed -i '1,/^ssid/{s/^ssid/##ssid/}' $qca_hostapd_config_file
        sed -i '1,/^wps_state/{s/^wps_state/##wps_state/}' $qca_hostapd_config_file
    # we'd better remove the fellowing line if security was changed from wpa2 to none
	if [ "x$other_akm" != "x" ]; then
        sed -i '1,/^wpa_pairwise/{s/^wpa_pairwise/##wpa_pairwise/}' $qca_hostapd_config_file
        sed -i '1,/^wpa_key_mgmt/{s/^wpa_key_mgmt/##wpa_key_mgmt/}' $qca_hostapd_config_file
            if [ ${#other_wpa_psk} -eq 64 ]; then
                sed -i '1,/^wpa_psk/{s/^wpa_psk/##wpa_psk/}' $qca_hostapd_config_file
            else
                sed -i '1,/^wpa_passphrase/{s/^wpa_passphrase/##wpa_passphrase/}' $qca_hostapd_config_file
            fi
        fi

if [ "$is_dual_band" = "0" ]; then
        sed -i '1,/^wpa/{s/^wpa/##wpa/}' $qca_hostapd_config_file_2
        sed -i '1,/^ssid/{s/^ssid/##ssid/}' $qca_hostapd_config_file_2
        sed -i '1,/^wps_state/{s/^wps_state/##wps_state/}' $qca_hostapd_config_file_2
    # we'd better remove the fellowing line if security was changed from wpa2 to none
        if [ "x$other_akm_2" != "x" ]; then
        sed -i '1,/^wpa_pairwise/{s/^wpa_pairwise/##wpa_pairwise/}' $qca_hostapd_config_file_2
        sed -i '1,/^wpa_key_mgmt/{s/^wpa_key_mgmt/##wpa_key_mgmt/}' $qca_hostapd_config_file_2
            if [ ${#other_wpa_psk_2} -eq 64 ]; then
                sed -i '1,/^wpa_psk/{s/^wpa_psk/##wpa_psk/}' $qca_hostapd_config_file_2
            else
                sed -i '1,/^wpa_passphrase/{s/^wpa_passphrase/##wpa_passphrase/}' $qca_hostapd_config_file_2
            fi
        fi
fi

echo "=========akm:$akm====crypto:$crypto===========" > /dev/console
sed -i '8i ##DNI WPS START##' $qca_hostapd_config_file
case "$akm:$crypto" in
	"psk psk2":"tkip+aes")
		echo "****mixed security********" > /dev/console	
                # WPA-PSK [TKIP] + WPA2-PSK [AES]
                sed -i '9i wpa=3' $qca_hostapd_config_file
                sed -i '9i wpa_pairwise=CCMP TKIP' $qca_hostapd_config_file
                sed -i '9i wpa_key_mgmt=WPA-PSK' $qca_hostapd_config_file
                if [ ${#wpa_psk} -eq 64 ]; then
                    eval "sed -i '9i wpa_psk=$wpa_psk' $qca_hostapd_config_file"
                else
                    eval "sed -i '9i wpa_passphrase=$wpa_psk' $qca_hostapd_config_file"
                fi
		if [ "$is_dual_band" = "0" ]; then
			sed -i '9i wpa=3' $qca_hostapd_config_file_2
			sed -i '9i wpa_pairwise=CCMP TKIP' $qca_hostapd_config_file_2
			sed -i '9i wpa_key_mgmt=WPA-PSK' $qca_hostapd_config_file_2
			if [ ${#wpa_psk} -eq 64 ]; then
				eval "sed -i '9i wpa_psk=$wpa_psk' $qca_hostapd_config_file_2"
			else
				eval "sed -i '9i wpa_passphrase=$wpa_psk' $qca_hostapd_config_file_2"
			fi
			config set wla_2nd_sectype=5
			config set wla_2nd_wpas_psk="$wpa_psk"
		fi
		config set wla_sectype=5
		config set wl_sectype=5
		config set wl_wpas_psk="$wpa_psk"
		config set wla_wpas_psk="$wpa_psk"
                ;;
	"psk2":"aes")
		echo "****wpa2 security********" > /dev/console
                # WPA2-PSK [AES]
                sed -i '9i wpa=2' $qca_hostapd_config_file
                sed -i '9i wpa_pairwise=CCMP' $qca_hostapd_config_file
                sed -i '9i wpa_key_mgmt=WPA-PSK' $qca_hostapd_config_file
                if [ ${#wpa_psk} -eq 64 ]; then
                    eval "sed -i '9i wpa_psk=$wpa_psk' $qca_hostapd_config_file"
                else
                    eval "sed -i '9i wpa_passphrase=$wpa_psk' $qca_hostapd_config_file"
                fi
		if [ "$is_dual_band" = "0" ]; then
			sed -i '9i wpa=2' $qca_hostapd_config_file_2
			sed -i '9i wpa_pairwise=CCMP' $qca_hostapd_config_file_2
			sed -i '9i wpa_key_mgmt=WPA-PSK' $qca_hostapd_config_file_2
			if [ ${#wpa_psk} -eq 64 ]; then
				eval "sed -i '9i wpa_psk=$wpa_psk' $qca_hostapd_config_file_2"
			else
				eval "sed -i '9i wpa_passphrase=$wpa_psk' $qca_hostapd_config_file_2"
			fi
			config set wla_2nd_sectype=4
			config set wla_2nd_wpa2_psk="$wpa_psk"
		fi
                config set wla_sectype=4
                config set wl_sectype=4
                config set wl_wpa2_psk="$wpa_psk"
                config set wla_wpa2_psk="$wpa_psk"
                ;;
            *)
		echo "****none security********" > /dev/console
                # None security
                sed -i '9i wpa=0' $qca_hostapd_config_file
		if [ "$is_dual_band" = "0" ]; then
			sed -i '9i wpa=0' $qca_hostapd_config_file_2
			config set wla_2nd_sectype=1
		fi
                config set wla_sectype=1
                config set wl_sectype=1
                ;;
esac
        case "$ifname:$role" in
            wl0:ext)
		if [ "$is_dual_band" = "0" ]; then
			ssid="$(echo "$tmp_ssid" |head -c 27)""-2.4G"
			ssid_2="$(echo "$tmp_ssid" |head -c 27)""-5G-1"
		else
			ssid="$(echo "$tmp_ssid" |head -c 27)""-5G"
		fi
                ;;
            wl0:int)
		if [ "$is_dual_band" = "0" ]; then
			ssid=$(echo $tmp_ssid | sed  -e 's/NTGR-5G-2_/NTGR-2.4G_/g')
			ssid_2=$(echo $tmp_ssid | sed  -e 's/NTGR-5G-2_/NTGR-5G-1_/g')
		else
			if [ "$is_single_ssid" = "1" ]; then
				ssid=$(echo $tmp_ssid)
			else
				ssid=$(echo $tmp_ssid | sed  -e 's/NTGR-2.4G_/NTGR-5G_/g')
			fi
		fi
                ;;
            wl1:ext)
		if [ "$is_dual_band" = "0" ]; then
			ssid="$(echo "$tmp_ssid" |head -c 27)""-5G-2"
			ssid_2="$(echo "$tmp_ssid" |head -c 29)""-5G"
		else
			ssid="$(echo "$tmp_ssid" |head -c 27)""-2.4G"
		fi
                ;;
            wl1:int)
		if [ "$is_dual_band" = "0" ]; then
			ssid=$(echo $tmp_ssid | sed  -e 's/NTGR-2.4G_/NTGR-5G-2_/g')
			ssid_2=$(echo $tmp_ssid | sed  -e 's/NTGR-2.4G_/NTGR-5G-1_/g')
		else
			if [ "$is_single_ssid" = "1" ]; then
				ssid=$(echo $tmp_ssid)
			else
				ssid=$(echo $tmp_ssid | sed  -e 's/NTGR-5G_/NTGR-2.4G_/g')
			fi
		fi
                ;;
            wl2:ext)
			ssid="$(echo "$tmp_ssid" |head -c 27)""-5G-2"
			ssid_2="$(echo "$tmp_ssid" |head -c 27)""-2.4G"
                ;;
            wl2:int)
			ssid=$(echo $tmp_ssid | sed  -e 's/NTGR-5G-1_/NTGR-5G-2_/g')
			ssid_2=$(echo $tmp_ssid | sed  -e 's/NTGR-5G-1_/NTGR-2.4G_/g')
                ;;
            *)
                echo " Not supported type: $ifname $wps_role" >> /dev/console
                ;;
        esac

eval "sed -i '9i ssid=$ssid' $qca_hostapd_config_file"
sed -i '9i wps_state=2' $qca_hostapd_config_file
if [ "$is_dual_band" = "0" ]; then
	eval "sed -i '9i ssid=$ssid_2' $qca_hostapd_config_file_2"
	sed -i '9i wps_state=2' $qca_hostapd_config_file_2
fi
if [ "$ifname" = "wl0" ]; then
	if [ "$is_dual_band" = "0" ]; then
		config set wla_2nd_ssid="$tmp_ssid"
		config set wl_ssid="$ssid"
		config set wla_ssid="$ssid_2"
	else
		config set wl_ssid="$tmp_ssid"
		config set wla_ssid="$ssid"
	fi
elif [ "$ifname" = "wl1" ]; then
	if [ "$is_dual_band" = "0" ]; then
		config set wl_ssid="$tmp_ssid"
		config set wla_2nd_ssid="$ssid"
		config set wla_ssid="$ssid_2"
	else
		config set wla_ssid="$tmp_ssid"
		config set wl_ssid="$ssid"
	fi
else
	config set wla_ssid="$tmp_ssid"
	config set wla_2nd_ssid="$ssid"
	config set wl_ssid="$ssid_2"
fi
nvram set ${ifname2}_ssid="$ssid"
config set wps_status=5
config set wla_wps_status=5
if [ "$is_dual_band" = "0" ]; then
	nvram set ${ifname3}_ssid="$ssid_2"
	config set wla_2nd_wps_status=5
fi
config commit
nvram commit
#sed -e 'i ##DNI WPS END##' $qca_hostapd_config_file
if [ "${ifname2_onoff}" = "1" ]; then
	pid=`eval ps |grep hostapd|grep $ifname2 |awk -F ' ' '{print $1}'`
	kill $pid
	sleep 5
	hostapd -B /tmp/${ifname2}_hapd.conf
	sleep 1
	brctl addif br0 ${ifname2}.1
	if [ "$(config get ssid_number_per_radio)" = "0x7" ]; then
		brctl addif br0 ${ifname2}.2
	fi
fi
if [ "$is_dual_band" = "0" ]; then
	if [ "${ifname3_onoff}" = "1" ]; then
		pid=`eval ps |grep hostapd|grep $ifname3 |awk -F ' ' '{print $1}'`
		kill $pid
		sleep 3
		hostapd -B /tmp/${ifname3}_hapd.conf
		sleep 1
		brctl addif br0 ${ifname3}.1
	fi
fi
if [ "${ifname_onoff}" = "1" ]; then
	pid=`eval ps |grep hostapd|grep $ifname |awk -F ' ' '{print $1}'`
	kill $pid
	sleep 5
	hostapd -B /tmp/${ifname}_hapd.conf
	sleep 1
	brctl addif br0 ${ifname}.1
	if [ "$(config get ssid_number_per_radio)" = "0x7" ]; then
		brctl addif br0 ${ifname}.2
	fi
fi
	pid=`ps |grep wps_pbcd |grep -v grep |awk -F ' ' '{print $1}'`
	sleep 5 && kill $pid && wps_pbcd &
