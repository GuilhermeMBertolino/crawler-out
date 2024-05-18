#
# Copyright (c) 2017 Qualcomm Technologies, Inc.
# All Rights Reserved.
# Confidential and Proprietary - Qualcomm Technologies, Inc.
#

#
# Copyright (c) 2014, The Linux Foundation. All rights reserved.
#
update_config="update_config=1"

wpa_supplicant()
{
	wifi_dbg "/usr/sbin/wpa_supplicant $@"
	/usr/sbin/wpa_supplicant $@
}

wpa_cli()
{
	wifi_dbg "/usr/sbin/wpa_cli $@"

	if [ -e "/var/run/wpa_supplicant-global.pid" ]; then
		/usr/sbin/wpa_cli $@
	fi
}

wpa_supplicant_set_basic_options()
{
	local var=$1
	local vif=$2
	local ifname

	config_get ifname $vif ifname

	append $var "ctrl_interface=/var/run/wpa_supplicant/$ifname" "$N"
}

wpa_supplicant_set_wps_options()
{
	local var=$1
	local vif=$2
	local device_type device_name manufacturer model_name model_number serial_number wps_uuid wps_pbc mesh_enable

	config_get ifname $vif ifname
	config_get device $vif device
	config_get_bool wps_pbc $vif wps_pbc 0
	config_get_bool mesh_enable meshd enable 0

	if [ "$wps_pbc" = "0" ]; then
		return
	fi

	config_get device_type wps wps_device_type "6-0050F204-1"
	config_get device_name wps wps_device_name "OpenWrt AP"
	config_get manufacturer wps wps_manufacturer "openwrt.org"
	config_get model_name wps model_name "WAP"
	config_get model_number wps model_number "123"
	config_get serial_number wps serial_number "12345"
	config_get wps_uuid wps uuid

	append $var "update_config=1" "$N"
	append $var "device_type=$device_type" "$N"
	append $var "device_name=$device_name" "$N"
	append $var "manufacturer=$manufacturer" "$N"
	append $var "model_name=$model_name" "$N"
	append $var "model_number=$model_number" "$N"
	append $var "serial_number=$serial_number" "$N"
	append $var "config_methods=physical_push_button virtual_push_button" "$N"
	if [ "$mesh_enable" = "1" ];then
		append $var "tp_mesh_enable=1" "$N"
		append $var "wps_priority=1" "$N"
	fi
	
	# fix the overlap session of WPS PBC for dual band AP
	local macaddr=$(getfirm MAC)
	uuid=$(echo "$macaddr" | sed 's/-//g')
	[ -n "$uuid" ] && {
		append $var "uuid=87654321-9abc-def0-1234-$uuid" "$N"
	}
}

wpa_supplicant_set_network_options()
{
	local var=$1
	local vif=$2
	local encryption ssid psk_version psk_cipher psk_key
	local key_mgmt="" proto="" group="" pairwise=""

	config_get encryption $vif encryption none
	config_get ssid $vif ssid
	config_get psk_version $vif psk_version auto
	config_get psk_cipher $vif psk_cipher auto
	config_get psk_key $vif psk_key

	append $var "network={" "$N"
	append $var "scan_ssid=1" "$N"

	case $encryption in
		none)
			key_mgmt='NONE'
		;;
		psk)
			case $psk_version in
				auto) proto="WPA RSN";;
				wpa) proto="WPA";;
				wpa2 | rsn) proto="RSN";;
			esac
			group="TKIP CCMP"
			key_mgmt="WPA-PSK"
		;;
		psk_sae)
			case $psk_version in
				sae_transition) key_mgmt="SAE WPA-PSK";;
				sae_only) key_mgmt="SAE";;
			esac
			sae_password=$psk_key
			proto="RSN"
		;;
	esac

	case $psk_cipher in
		auto) pairwise="TKIP CCMP";;
		tkip) pairwise="TKIP";;
		aes|ccmp) pairwise="CCMP";;
	esac

	[ -n "$ssid" ] && append $var "ssid=\"$ssid\"" "$N"
	[ -n "$psk_key" ] && {
		if [ ${#psk_key} -gt 63 ];then 
			append $var "psk=$psk_key" "$N"
		else
			append $var "psk=\"$psk_key\"" "$N"
		fi
	}
	[ -n "$key_mgmt" ] && append $var "key_mgmt=$key_mgmt" "$N"
	[ -n "$proto" ] && append $var "proto=$proto" "$N"
	[ -n "$pairwise" ] && append $var "pairwise=$pairwise" "$N"
	[ -n "$group" ] && append $var "group=$group" "$N"

	append $var "}" "$N"
}

wpa_supplicant_gen_cfg()
{
	local wpa_supplicant_cfg_file=$1
	local vif=$2
	local ifname device

	wpa_supplicant_cfg=

	config_get ifname $vif ifname
	config_get device $vif device

	wpa_supplicant_set_basic_options wpa_supplicant_cfg $vif
	wpa_supplicant_set_wps_options wpa_supplicant_cfg $vif
	wpa_supplicant_set_network_options wpa_supplicant_cfg $vif

	rm -f $wpa_supplicant_cfg_file
	cat > $wpa_supplicant_cfg_file <<EOF
$wpa_supplicant_cfg
EOF
}

wpa_supplicant_start_vif()
{
	local vif=$1
	local ifname
	local wpa_supplicant_cfg_file

	config_get ifname $vif ifname

	wifi_dbg "wpa_supplicant_start_vif $vif"

	wpa_supplicant_cfg_file="/var/run/wpa_supplicant-$ifname.conf"
	wpa_supplicant_gen_cfg $wpa_supplicant_cfg_file $vif

	wpa_cli -g /var/run/wpa_supplicant/global interface_add $ifname $wpa_supplicant_cfg_file nl80211 /var/run/wpa_supplicant/ \"\" $NAME_BR
}

wpa_supplicant_stop_vif()
{
	local vif=$1
	local ifname running_ifs tmp_if

	config_get ifname $vif ifname

	running_ifs=$(wpa_cli -g /var/run/wpa_supplicant/global interface)
	for tmp_if in $running_ifs
	do
		if [ "$tmp_if" = "$ifname" ]; then
			wifi_dbg "wpa_supplicant_stop_vif $ifname"
			wpa_cli -g /var/run/wpa_supplicant/global interface_remove $ifname
			break
		fi
	done

	rm -f /var/run/wpa_supplicant-$ifname.conf
}

wpa_supplicant_global()
{
	mkdir -p /var/run/wpa_supplicant
	wpa_supplicant -g /var/run/wpa_supplicant/global -P /var/run/wpa_supplicant-global.pid -B
}

wpa_supplicant_wps_pbc()
{
	local vif=$1
	local ifname
	local mesh_enable

	config_get ifname $vif ifname
	config_get_bool mesh_enable meshd enable 0

	wifi_dbg "wpa_supplicant_wps_pbc : $vif mesh_enable : $mesh_enable"

	wpa_cli -i $ifname -p /var/run/wpa_supplicant node_id "0"

	if [ $mesh_enable -eq 1 ]; then
		wpa_cli -i $ifname -p /var/run/wpa_supplicant wps_pbc multi_ap=1
	else
		wpa_cli -i $ifname -p /var/run/wpa_supplicant wps_pbc multi_ap=0
	fi

	[ -f /var/run/wpa_supplicant-$ifname.pid ] || {
		wpa_cli -p /var/run/wpa_supplicant -a /lib/wifi/wps-supplicant-update-uci -P /var/run/wpa_supplicant-$ifname.pid -i $ifname -B
	}

}

wpa_supplicant_wps()
{
	local vif=$1
	shift 1
	local ifname

	config_get ifname $vif ifname
	wpa_cli -i $ifname $@
}
