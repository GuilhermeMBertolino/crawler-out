#!/bin/sh

script_name="fapi_wlan_wave_events_hostapd.sh"

# [ -e $LED_VARS_FILE ] && . $LED_VARS_FILE

# Due to a change in hostapd event input we change parameters settings:
# VAP name is added as third parameter
# input examples:
#   disconnect VAP:
#   /opt/<vendor_name>/wave/scripts/fapi_wlan_wave_events_hostapd.sh wlan0 AP-STA-DISCONNECTED wlan0.0 30:5a:3a:18:bd:7b
#interface_name=$1
name=$2
#radio_name=$1
interface_name=$3
param3=$4
param4=$5

# In order to reduce CPU usage, exit on all events that are not handled, before sourcing the lib_common.
# Every new event must be added to this list, as well as to the handler.
# lib_required events will source the fapi lib_common, events that  do not need it will skip to save CPU
case $name in
	"WPS-NEW-AP-SETTINGS" |	"WPS-PIN-NEEDED" | "WPS-SESSION-START" | "WPS-REG-SUCCESS" |\
	"WPS-TIMEOUT" |	"WPS-FAIL" | "WPS-OVERLAP-DETECTED" | "AP-STA-CONNECTED" | "CONNECTED" | "AP-STA-DISCONNECTED")
		lib_required=1
	;;
	"ACS-COMPLETED")
		lib_required=0
	;;
	*)
		exit 0
	;;
esac


if [ "$lib_required" = "1" ]; then
	[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh
	[ ! "$LIB_WPS_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_wps.sh

	# Find the interface index and the radio index
	interface_index=`find_index_from_interface_name $interface_name`
	local_db_source SSID
	ssid_type=`db2fapi_convert regular X_LANTIQ_COM_Vendor_SsidType $interface_index`
	if [ "$ssid_type" = "EndPoint" ]
	then
		radio_name=`get_radio_name_from_endpoint $interface_name`
	else
		radio_name=${interface_name%%.*}
	fi
	radio_index=`find_index_from_interface_name $radio_name`
	#print2log $radio_index DEBUG "$script_name $*"
fi

conf_via_external()
{
	# Define local parameters
	local interface_name

	interface_name=$1

	print2log $radio_index DEBUG "$script_name: conf_via_external start"
	wps_external_done $interface_name
	print2log $radio_index DEBUG "$script_name: conf_via_external done"
}

wps_pin_needed()
{
	# Define local parameters
	local interface_name sta_uuid sta_mac allowed_mac

	interface_name=$1
	sta_uuid=$2
	sta_mac=$3

	print2log $radio_index DEBUG "$script_name: Start wps_pin_needed for MAC=$sta_mac with uuid=$sta_uuid"
	# Change MAC to uppercase
	sta_mac=`echo $sta_mac | tr '[:lower:]' '[:upper:]'`

	# Compare between MAC in requesting sta and MAC listed as allowed in rc.conf (converted to uppercase).
	allowed_mac=`cat $WPS_MAC_TEMP_FILE | tr '[:lower:]' '[:upper:]'`

	# If requesting STA's MAC is allowed, perform pin connection
	if [ "$allowed_mac" = "$sta_mac" ]
	then
		print2log $radio_index DEBUG "$script_name: connecting STA via PIN"
		wps_connect_via_pin $interface_index $interface_name $radio_name 0 $sta_mac $sta_uuid
	else
		print2log $radio_index DEBUG "$script_name: STA $sta_mac tried PIN connection but wasn't allowed"
	fi
	print2log $radio_index DEBUG "$script_name: Done wps_pin_needed"
}

wps_in_progress()
{
	# Define local parameters
	local interface_name

	interface_name=$1

	# First, set status to Idle and only after that set to In Progress.
	# Notify the web and the DB that status is "Idle"
	build_wlan_notification "wsd" "NOTIFY_WPS_STATUS" "message:Idle"
	build_wlan_notification "servd" "NOTIFY_WIFI_WPS_STATUS" "Name:${interface_name} Status:Idle"
	# Notify the web and the DB that status is "In Progress"
	build_wlan_notification "wsd" "NOTIFY_WPS_STATUS" "message:In_Progress"
	build_wlan_notification "servd" "NOTIFY_WIFI_WPS_STATUS" "Name:${interface_name} Status:In_Progress"
}

wps_fail()
{
	# Define local parameters
	local interface_name

	interface_name=$1
	error_code=$2
	
	# CancelWPS on all other interfaces:
	radio_name=${interface_name%%.*}
	other_radio_name=wlan0
	if [ "$radio_name" = "wlan0" ]
	then
		other_radio_name=wlan2
	fi
	cancel_wps $other_radio_name

	case $error_code in
		"18")
		#echo "wave_wlan_hostapd_events: wps_fail(): error_code=18 Status:PinError" > /dev/console
		build_wlan_notification "wsd" "NOTIFY_WPS_STATUS" "message:pinError"
		build_wlan_notification "servd" "NOTIFY_WIFI_WPS_STATUS" "Name:${interface_name} Status:PinError"
		;;
		*)
			echo "wave_wlan_hostapd_events: unknown error event: code=$code" > /dev/console
		;;
	esac

}

wps_timeout()
{
	# Define local parameters
	local interface_name

	interface_name=$1

	# Notify the web and the DB that status is "Timeout"
	build_wlan_notification "wsd" "NOTIFY_WPS_STATUS" "message:Timeout"
	build_wlan_notification "servd" "NOTIFY_WIFI_WPS_STATUS" "Name:${interface_name} Status:Timeout"
}

wps_session_overlap()
{
	# Define local parameters
	local interface_name

	interface_name=$1
	
	# CancelWPS on all other interfaces:
	radio_name=${interface_name%%.*}
	other_radio_name=wlan0
	if [ "$radio_name" = "wlan0" ]
	then
		other_radio_name=wlan2
	fi
	cancel_wps $other_radio_name

	# Notify the web and the DB that status is "Overlap"
	build_wlan_notification "wsd" "NOTIFY_WPS_STATUS" "message:Overlap"
	build_wlan_notification "servd" "NOTIFY_WIFI_WPS_STATUS" "Name:${interface_name} Status:Overlap"
}

wps_success()
{
	# Define local parameters
	local interface_name

	interface_name=$1
	#mac_addr=$2
	
	# CancelWPS on all other interfaces:
	radio_name=${interface_name%%.*}
	other_radio_name=wlan0
	if [ "$radio_name" = "wlan0" ]
	then
		other_radio_name=wlan2
	fi
	cancel_wps $other_radio_name

	# Notify the web and the DB that status is "Success"
	build_wlan_notification "wsd" "NOTIFY_WPS_STATUS" "message:Success"
	build_wlan_notification "servd" "NOTIFY_WIFI_WPS_STATUS" "Name:${interface_name} Status:Success"
}

sta_connection()
{
	# Define local parameters
	local interface_name mac_address downlink_rate uplink_rate signal_strength retransmissions ip_address

	interface_name=$1
	mac_address=$2

	if [ "$(is_certifiction)" = "1" ]; then
		# MBO 897173b6be66c: Clear connected STA MAC from LAN port (port 4 in switch) to prevent filtering on ethernet RX
		lan_macs=`switch_cli dev=1 GSW_MAC_TABLE_ENTRY_READ | awk '/  4 / {print $1}'`
		for lan_mac in $lan_macs; do
			#echo testing MAC $lan_mac > /dev/console
			[ "$lan_mac" = "$mac_address" ] && switch_cli dev=1 GSW_MAC_TABLE_ENTRY_REMOVE nMAC=$lan_mac && echo Removed $lan_mac from LAN port > /dev/console
		done
	fi

	# To minimize CPU utilization, use default values for initial notification. Values will be updated on query
	downlink_rate=1000
	uplink_rate=1000
	retransmissions=0
	ip_address="Unknown"
	# Parse signal strength from the connect event
	signal_strength=${@##*SignalStrength=}
	signal_strength=${signal_strength%% *}

	[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name},MAC,${mac_address}" > ${SMDPIPE}
    #DIL related
	echo -e "\033[35m sta_connection $interface_name $mac_address \033[0m" > /dev/console
	/usr/bin/pudil -a $mac_address "$ip_address" ""
	/usr/bin/pudil -m $mac_address 7 $interface_name	
	/usr/bin/pudil -m $mac_address 6 up
	# PegaBU6, YochengLian, 20200603, For update devices behind extender.
	# 4th parameter is debug print enable or disable. Use "1" to print debug, other or NULL is disable.
	pudil_update_devStatusByClid.sh $mac_address "up" $interface_name

	build_wlan_notification "servd" "NOTIFY_WIFI_DEVICE_ASSOCIATED" "Name:${interface_name} Status:Connected MACAddress:$mac_address AuthenticationState:true LastDataDownlinkRate:$downlink_rate LastDataUplinkRate:$uplink_rate SignalStrength:$signal_strength X_LANTIQ_COM_Vendor_SignalStrength2:$signal_strength X_LANTIQ_COM_Vendor_SignalStrength3:$signal_strength X_LANTIQ_COM_Vendor_SignalStrength4:$signal_strength Retransmissions:$retransmissions IPAddress:$ip_address"
}

ap_enabled()
{
	# Define local parameters
	local interface_name externally_managed

	interface_name=$1

	local_db_source RADIO
	externally_managed=`db2fapi_convert boolean WaveExternallyManaged 0`

	if [ "$externally_managed" = "1" ]
	then
		print2log $radio_index DEBUGI "$script_name: AP_ENABLED received for $interface_name"
		# Delete the runner file
		rm -f ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}_events_hostapd
		cat ${TEMP_DIR}/${DRIVER_POST_UP_CONF_PREFIX}_${interface_name}.*.conf >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}_events_hostapd
		echo "exit 0" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}_events_hostapd
		chmod +x ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}_events_hostapd
		${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}_events_hostapd
	fi
}

sta_disconnection()
{
	# Define local parameters
	local interface_name  mac_address

	interface_name=$1
	mac_address=$2

	[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_DIS,WLAN,${interface_name},MAC,${mac_address}" > ${SMDPIPE}
	echo -e "\033[35m sta_disconnection $interface_name $mac_address \033[0m" > /dev/console
	# PegaCVP MattLin, for DIL
	/usr/bin/pudil -m $mac_address 6 down	
	# PegaBU6, YochengLian, 20200603, For update devices behind extender.
	# 4th parameter is debug print enable or disable. Use "1" to print debug, other or NULL is disable.
	pudil_update_devStatusByClid.sh $mac_address "down" $interface_name
	build_wlan_notification "servd" "NOTIFY_WIFI_DEVICE_ASSOCIATED" "Name:${interface_name} Status:Disconnected MACAddress:$mac_address"
}


#echo "get WPS event-- $interface_name $name" > /dev/console
# Handled hostapd events
case $name in
	"WPS-NEW-AP-SETTINGS")
		conf_via_external $interface_name
	;;
	"WPS-PIN-NEEDED")
		wps_pin_needed $interface_name $param3 $param4
	;;
	"WPS-SESSION-START")
			wps_in_progress $interface_name
	    #PegaCVP,20180816
			#echo "create $interface_name wps pin file" > /dev/console
			touch /tmp/$interface_name"_wps_pin_start.dat"

	;;
	"WPS-REG-SUCCESS")
		wps_success $interface_name $param3
		#PegaCVP,20180816
		touch /tmp/$interface_name"_wps_pin_ok.dat"
	;;
	"AP-STA-CONNECTED" | "CONNECTED")
		sta_connection $interface_name $param3 $@
	;;
	"AP-STA-DISCONNECTED")
		sta_disconnection $interface_name $param3
	;;
	"WPS-TIMEOUT")
		wps_timeout $interface_name
	;;
	"WPS-FAIL")
	# event example (PIN Error): 
	#   wlan2 WPS-FAIL wlan2 msg=8 config_error=18
	#From the code:
	#	enum wps_config_error {
	#		WPS_CFG_NO_ERROR = 0,
	#		WPS_CFG_OOB_IFACE_READ_ERROR = 1,
	#		WPS_CFG_DECRYPTION_CRC_FAILURE = 2,
	#		WPS_CFG_24_CHAN_NOT_SUPPORTED = 3,
	#		WPS_CFG_50_CHAN_NOT_SUPPORTED = 4,
	#		WPS_CFG_SIGNAL_TOO_WEAK = 5,
	#		WPS_CFG_NETWORK_AUTH_FAILURE = 6,
	#		WPS_CFG_NETWORK_ASSOC_FAILURE = 7,
	#		WPS_CFG_NO_DHCP_RESPONSE = 8,
	#		WPS_CFG_FAILED_DHCP_CONFIG = 9,
	#		WPS_CFG_IP_ADDR_CONFLICT = 10,
	#		WPS_CFG_NO_CONN_TO_REGISTRAR = 11,
	#		WPS_CFG_MULTIPLE_PBC_DETECTED = 12,
	#		WPS_CFG_ROGUE_SUSPECTED = 13,
	#		WPS_CFG_DEVICE_BUSY = 14,
	#		WPS_CFG_SETUP_LOCKED = 15,
	#		WPS_CFG_MSG_TIMEOUT = 16,
	#		WPS_CFG_REG_SESS_TIMEOUT = 17,
	#		WPS_CFG_DEV_PASSWORD_AUTH_FAILURE = 18,
	#		WPS_CFG_60G_CHAN_NOT_SUPPORTED = 19,
	#		WPS_CFG_PUBLIC_KEY_HASH_MISMATCH = 20
	#	}
	
	code=`echo $param4 | awk -F "=" '{print $2}'`
	case $code in
		"12")
		#This error code probably followed OVERLAP error. Ignor.
		print2log $radio_index DEBUG "$script_name: error event=WPS_CFG_MULTIPLE_PBC_DETECTED"
		;;
		"18")
		wps_fail $interface_name 18
		;;
		*)
			echo "wave_wlan_hostapd_events: unknown error event, code=$code" > /dev/console
		;;
	esac
	;;
	"WPS-OVERLAP-DETECTED")
		wps_session_overlap $interface_name
	;;
	"AP-ENABLED")
		ap_enabled $interface_name
	;;
	*)
		#print2log $radio_index DEBUG "$script_name:wave_wlan_hostapd_events: $name"
	;;
esac

