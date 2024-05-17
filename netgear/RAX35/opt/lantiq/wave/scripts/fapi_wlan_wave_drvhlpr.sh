#!/bin/sh
# Init drvhlpr part of complete recovery
# Needed param: interface_name

script_name="$0"
interface_name="$1"

if [ -d /opt/lantiq ]
then
	vendor_name="lantiq"
elif [ -d /opt/intel ]
then
	vendor_name="intel"
else
	vendor_name="puma"
fi

if [ -e /opt/${vendor_name}/wave/scripts/fapi_wlan_wave_lib_common.sh ]
then
	. /opt/${vendor_name}/wave/scripts/fapi_wlan_wave_lib_common.sh
elif [ -e /etc/wave/scripts/fapi_wlan_wave_lib_common.sh ]
then
	. /etc/wave/scripts/fapi_wlan_wave_lib_common.sh
fi

echo " $script_name:start wait for recovery event on drvhlpr $interface_name" > /dev/console

/tmp/drvhlpr_$interface_name -p ${CONF_DIR}/drvhlpr_$interface_name.conf </dev/console 1>/dev/console 2>&1
term_stat=$?

echo "$script_name:terminated with status $term_stat for $interface_name" > /dev/console

if [ $term_stat = 1 ]
then
	echo "$script_name: ### drvhlpr terminate with term_stat = 1 (doing nothing)###" > /dev/console
	#$ETC_PATH/fapi_wlan_wave_complete_recovery $interface_name
elif [ $term_stat = 2 ]
then
	echo "$script_name: drvhlpr return EVENT_REQ_RMMOD" > /dev/console
else
	echo "$script_name: drvhlpr terminated with status $term_stat" > /dev/console
fi

update_conf_out "wlan_configuration_status" "success"

echo "$script_name:done" > /dev/console
