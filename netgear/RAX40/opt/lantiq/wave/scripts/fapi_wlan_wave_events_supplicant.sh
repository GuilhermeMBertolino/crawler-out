#!/bin/sh

script_name="$0"

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh
[ ! "$LIB_WPS_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_wps.sh

# input examples:
#   EndPoint connected:
#   /opt/<vendor_name>/wave/scripts/fapi_wlan_wave_events_supplicant.sh wlan
interface_name=$1
name=$2
init=$3
type=$4
reg_domain=$5

#echo "$script_name: $*" > /dev/console
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

endpoint_connected()
{
	# Define local parameters
	local interface_name wps_ssid wps_security wps_passphrase

	interface_name=$1

	# When an endpoint is connected:
	# 1. Update the BSSID of the remote AP in SSID object
	# 2. Update the status of the EndPoint to Connected

	# Read the BSSID using wpa_cli
	bssid=`wpa_cli -i${interface_name} status | grep ^bssid=`
	bssid=${bssid##bssid=}
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:${interface_name} Object:${SSID_OBJECT} BSSID:${bssid}"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:${interface_name} Object:${ENDPOINT_OBJECT} X_LANTIQ_COM_Vendor_ConnectionStatus:Connected"
	build_wlan_notification "servd" "NOTIFY_WIFI_ENDPOINT_CONNECTED" "RadioName:${radio_name}"

	# If connection is after WPS success, send additional information
	if [ -e ${TEMP_DIR}/wps_success_${interface_name} ]
	then
		# Read the needed information from the supplicant (ssid, security and passphrase)
		read_supplicant_configuration $interface_name wps_ssid wps_security wps_passphrase

		# Send notification with the status and profile information
		build_wlan_notification "servd" "NOTIFY_WIFI_WPS_ENDPOINT_DONE" "Name:$interface_name Status:Success SSID:$wps_ssid ModeEnabled:$wps_security KeyPassphrase:$wps_passphrase"
		rm -f ${TEMP_DIR}/wps_success_${interface_name}
	fi
}

endpoint_disconnected()
{
	# Define local parameters
	local interface_name

	interface_name=$1

	# When an endpoint is disconnected:
	# 1. Remove the BSSID of the remote AP in SSID object (set value of NULL in the notification, SL converts it to empty string)
	# 2. Update the status of the EndPoint to Disconnected

	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:${interface_name} Object:${SSID_OBJECT} BSSID:NULL"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:${interface_name} Object:${ENDPOINT_OBJECT} X_LANTIQ_COM_Vendor_ConnectionStatus:Disconnected"
}

regulatory_domain_changed()
{
	# Define local parameters
	local interface_name country radio_name radio

	interface_name=$1
	country=$2

	country=${country#*=}
	if [ ! -e "${REG_DOMAIN_SET_FLAG}_${interface_name}" ]
	then
		# Notify about regulatory domain change only when EndPoint should be connected:
		# There is ProfileReference in the EndPoint and the profile status is "Active".
		local_db_source ENDPOINT
		local_db_source PROFILE

		profile_name=`db2fapi_convert regular ProfileReference $interface_index`
		[ -z "$profile_name" ] && exit
		profile_status=`db2fapi_convert regular Status $interface_index`
		[ "$profile_status" != "Active" ] && exit
		touch ${REG_DOMAIN_SET_FLAG}_${interface_name}
		echo "$script_name: Notifying APs about regulatory domain change to $country" > /dev/console

		radios_list=`ls ${INTERFACES_STATUS}*`
		for radio in $radios_list
		do
			radio=${radio#${INTERFACES_STATUS}_}
			build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:${radio} Object:${RADIO_OBJECT} RegulatoryDomain:${country} "
		done
		echo "$script_name: Executing iw reg set $country" > /dev/console
		iw reg set $country > /dev/console
	fi
}

wps_done()
{
	# Define local parameters
	local interface_name wps_status

	interface_name=$1
	wps_status=$2

	if [ "$wps_status" = "Success" ]
	then
		# Set a flag indicating a successful WPS
		touch ${TEMP_DIR}/wps_success_${interface_name}
	else
		# Send notification with the failed status
		build_wlan_notification "servd" "NOTIFY_WIFI_WPS_ENDPOINT_DONE" "Name:$interface_name Status:$wps_status"
	fi
}

scan_completed()
{
	# Define local parameters
	local interface_name

	interface_name=$1

	touch ${ENDPOINT_SCAN_COMPLETED_EVENT}_${interface_name}
}

case $name in
	"CONNECTED")
		endpoint_connected $interface_name
	;;
	"DISCONNECTED")
		endpoint_disconnected $interface_name
	;;
	"CTRL-EVENT-REGDOM-CHANGE")
		[ -n "$reg_domain" ] && regulatory_domain_changed $interface_name $reg_domain
	;;
	"WPS-SUCCESS")
		wps_done $interface_name "Success"
	;;
	"WPS-TIMEOUT")
		wps_done $interface_name "Timeout"
	;;
	"WPS-FAIL")
		wps_done $interface_name "Failed"
	;;
	"WPS-OVERLAP-DETECTED")
		wps_done $interface_name "Overlap"
	;;
	"CTRL-EVENT-SCAN-RESULTS")
		scan_completed $interface_name
	;;
	*)
		echo "$script_name: $name"
	;;
esac
