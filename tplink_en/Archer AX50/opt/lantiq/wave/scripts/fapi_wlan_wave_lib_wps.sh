#!/bin/sh

script_name="$0"
# For logs set enable_log=1
enable_log=0

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh

export HOSTAPD_PIN_REQ=/var/run/hostapd.pin-req
export WPS_PIN_TEMP_FILE=${CONF_DIR}/wps_current_pin
export WPS_MAC_TEMP_FILE=${CONF_DIR}/wps_current_mac

# Read uuid from DB. If no value is set, generate new uuid
# Return the uuid.
read_uuid()
{
	# Define local parameters
	local interface_index uuid

	interface_index=$1

	uuid=`db2fapi_convert regular UUID $interface_index`
	if [ -z "$uuid" ]
	then
		if [ -e /tmp/uuid_placeholder ]
		then
			uuid=`cat /tmp/uuid_placeholder`
		else
			which uuidgen > /dev/null
			if [ $? -eq 0 ]
			then
				uuid=`uuidgen`
			else
				uuid=`cat /proc/sys/kernel/random/uuid`
			fi
			[ -n $uuid ] && echo $uuid > /tmp/uuid_placeholder
		fi
	fi

	echo "$uuid"
}

set_ap_configured()
{
	local interface_name wps_vendor_index interface_index radio_index wps_state

	interface_name=$1
	wps_vendor_index=$2
	interface_index=$3
	radio_index=$4

	print2log $radio_index DEBUG "$script_name: Start set_ap_configured"

	wps_state=`convert_wps_state $interface_index $radio_index`

	# If it is a non-configured AP
	if [ "$wps_state" = "$WPS_ENABLED_NOT_CONFIGURED" ]
	then
		print2log $radio_index DEBUG "$script_name: set_ap_configured. AP is non-configured, setting to configured"
		update_conf_out "Object_${wps_vendor_index}" "$RADIO_WPS_VENDOR_OBJECT"
		update_conf_out "ConfigState_${wps_vendor_index}" "Configured"
		# TBD: need to add ubus call that will re-trigger the WPS PBC with AP as configured. concider: how much time will it all take?
	else
		print2log $radio_index DEBUG "$script_name: set_ap_configured. AP is in configured mode"
	fi
	print2log $radio_index DEBUG "$script_name: End set_ap_configured"
}

wps_connect_via_pbc()
{
	local interface_name radio_name wps_vendor_index interface_index radio_index

	interface_name=$1
	radio_name=$2
	wps_vendor_index=$3

	# Find the interface index and the radio index
	interface_index=`find_index_from_interface_name $interface_name`
	radio_index=`find_index_from_interface_name $radio_name`

	print2log $radio_index WPS "wps_connect_via_pbc: The button 'Start PBC' was activated for $interface_name"

	# send WPS-SESSION-START event to the WLAN events script
	( . $HOSTAPD_EVENTS_SCRIPT $radio_name WPS-SESSION-START $interface_name )
	# Set AP to configured mode.
	set_ap_configured $interface_name $wps_vendor_index $interface_index $radio_index
	# Start the PBC session
	/tmp/hostapd_cli_${radio_name} -i $radio_name wps_pbc $interface_name
	#/tmp/hostapd_cli_${radio_name} -i $interface_name wps_pbc
}

# return valid pin or empty one if invalid.
wps_pin_checksum_validity()
{
	local interface_name enrollee_pin enrollee_pin_res
	interface_name=$1
	enrollee_pin=$2

	enrollee_pin_res=`hostapd_cli -i$interface_name wps_check_pin $enrollee_pin`
	[ "$enrollee_pin_res" = "FAIL-CHECKSUM" ] || [ "$enrollee_pin_res" = "FAIL" ] && enrollee_pin_res=""

	echo "$enrollee_pin_res"
}

# Start a WPS PIN session for the AP
wps_connect_via_pin()
{
	local interface_index interface_name radio_name wps_vendor_index enrollee_mac enrollee_uuid \
	radio_index enrollee_pin enrollee_type wps_pin_timeout line_timestamp line_uuid line_mac param4 \
	line res need_uuid

	interface_index=$1
	interface_name=$2
	radio_name=$3
	wps_vendor_index=$4
	enrollee_mac=$5
	enrollee_uuid=$6

	# Find the radio index
	radio_index=`find_index_from_interface_name $radio_name`

	# Read enrollee PIN
	enrollee_pin=`db2fapi_convert regular EndpointPIN $interface_index`
	[ -z "$enrollee_pin" ] && . $WPS_PIN_TEMP_FILE
	enrollee_pin=`wps_pin_checksum_validity $interface_name $enrollee_pin`

	# If enrollee MAC is missing, check if authorized MAC is set
	[ -z "$enrollee_mac" ] && enrollee_mac=`db2fapi_convert regular AuthorizedMac $interface_index`
	# Make enrollee_mac lower case as appears in the pin requests file
	enrollee_mac=`echo "$enrollee_mac" | tr '[:upper:]' '[:lower:]'`

	enrollee_type=2
	# Using hard-coded timeout of 30 minutes
	wps_pin_timeout=1800

	# If PIN wasn't received or invalid, show warning and exit
	if [ -z "$enrollee_pin" ]; then
		print2log $radio_index "######################################################################################"
		print2log $radio_index WPS "ATTENTION:!!! PIN connection started but no PIN number received Or PIN INVALID !!!" 
		print2log $radio_index "######################################################################################"
		exit
	else
		print2log $radio_index WPS "FAPI_WLAN_VENDOR_WAVE: The button 'Connect' for PIN connection was activated for $interface_name with PIN=$enrollee_pin and MAC=$enrollee_mac"
	fi

	# Save PIN and MAC of STA in temp files
	echo "enrollee_pin=$enrollee_pin" > $WPS_PIN_TEMP_FILE
	echo "enrollee_mac=$enrollee_mac" > $WPS_MAC_TEMP_FILE

	# send WPS-SESSION-START event to the WLAN events script
	( . $HOSTAPD_EVENTS_SCRIPT $radio_name WPS-SESSION-START $interface_name )
	# Set AP to configured mode.
	set_ap_configured $interface_name $wps_vendor_index $interface_index $radio_index

	# Check if web selection was to accept all incoming PIN connectios with correct PIN. In such case, no MAC and timeout are needed.
	if [ -z "$enrollee_mac"  ]
	then
		enrollee_uuid=any
		enrollee_mac=""
		wps_pin_timeout=""
	fi

	# If no uuid was received, need to read from pin_req file or generate new random
	if [ -z "$enrollee_uuid" ]
	then
		if [ -e $HOSTAPD_PIN_REQ ]
		then
			# Get the MAC from the file and compare with requesting MAC
			# Get the MACs and uuids from the file
			while read line_timestamp line_uuid line_mac param4
			do
				if [ "$enrollee_mac" = "$line_mac" ]
				then
					enrollee_uuid=$line_uuid
					break
				fi
			done < $HOSTAPD_PIN_REQ
		fi
		# If file list doesn't exist or MAC wasn't found in list, generate random uuid
		[ -z "$enrollee_uuid" ] && enrollee_uuid=`uuidgen`
	fi
	enrollee_pin=`echo $enrollee_pin | sed -e 's/-//g' -e 's/ //g'`
	/tmp/hostapd_cli_${radio_name} -i $radio_name wps_pin $interface_name $enrollee_uuid $enrollee_pin $wps_pin_timeout $enrollee_mac
	#/tmp/hostapd_cli_${radio_name} -i$interface_name wps_pin $enrollee_uuid $enrollee_pin $wps_pin_timeout $enrollee_mac
}

# Generate a new PIN number for the AP and return new value to the fapi_wlan_wave_out.conf
wps_generate_pin()
{
	local interface_name radio_name wps_vendor_index new_pin

	interface_name=$1
	radio_name=$2
	wps_vendor_index=$3

	new_pin=`/tmp/hostapd_cli_${radio_name} -i $radio_name wps_ap_pin $interface_name random`
	#new_pin=`/tmp/hostapd_cli_${radio_name} -i $interface_name wps_ap_pin random`

	# Write the new AP PIN to out.conf
	update_conf_out "PIN_${wps_vendor_index}" "$new_pin"
}

# Cancel currently running WPS session
cancel_wps()
{
	# Define local parameters
	local radio_name

	radio_name=$1

	#echo "cancel_wps: wps_fail: /tmp/hostapd_cli_${radio_name} -i $radio_name wps_cancel" > $TRACE_OUT
	/tmp/hostapd_cli_${radio_name} -i $radio_name wps_cancel
}

# Test handler, take place only if test_only is set in wps_external_done()
create_test_file()
{
	hostapd_conf_file_file=$1
	
	echo "create_test_file: create test in file: $hostapd_conf_file_file" > $TRACE_OUT
	
	echo "############## wlan0 VAP parameters #############" > $hostapd_conf_file_file
	echo "vendor_elements=dd050009860100" >> $hostapd_conf_file_file
	echo "bssid=AC:9A:96:F4:85:10" >> $hostapd_conf_file_file
	echo "###___WPS_parameters___###" >> $hostapd_conf_file_file
	echo "wps_state=0" >> $hostapd_conf_file_file
	echo "############## wlan0.0 VAP parameters #############" >> $hostapd_conf_file_file
	echo "bss=wlan0.0" >> $hostapd_conf_file_file
	echo "vendor_elements=dd050009860100" >> $hostapd_conf_file_file
	echo "bssid=AC:9A:96:F4:85:12" >> $hostapd_conf_file_file
	echo "###___SSID_parameters___###" >> $hostapd_conf_file_file
	echo "bridge=br-lan" >> $hostapd_conf_file_file
	echo "# WPS configuration - START" >> $hostapd_conf_file_file
	echo "wps_state=2" >> $hostapd_conf_file_file
	echo "ssid=WLAN-TEST-160_Network" >> $hostapd_conf_file_file
	echo "wpa=2" >> $hostapd_conf_file_file
	echo "wpa_key_mgmt=WPA-PSK" >> $hostapd_conf_file_file
	echo "wpa_pairwise=CCMP" >> $hostapd_conf_file_file
	echo "wpa_passphrase=h3dz-gt48-voc5" >> $hostapd_conf_file_file
	echo "auth_algs=1" >> $hostapd_conf_file_file
	echo "# WPS configuration - END" >> $hostapd_conf_file_file
	echo "#WPS# ssid=2g_165.0" >> $hostapd_conf_file_file
	echo "###___AccessPoint_parameters___###" >> $hostapd_conf_file_file
	echo "ignore_broadcast_ssid=0" >> $hostapd_conf_file_file
	echo "############## wlan0.1 VAP parameters #############" >> $hostapd_conf_file_file
	echo "bss=wlan0.1" >> $hostapd_conf_file_file

	echo "create_test_file: dump $hostapd_conf_file_file:" > $TRACE_OUT
	cat  $hostapd_conf_file_file > $TRACE_OUT
}

# Returns interface name that was configured by external registrar.
# Read updated values in hostapd.conf after external registrar configured it.
# It parse hostapd.conf and save the VAP name that has its WPS active.
# These values are in a section starting with the comment 
#   "############## wlanX VAP parameters #############" (X=0, 0.0 etc.) and under it:
#   "WPS configuration - START" and ending with the comment "WPS configuration - END".
# Save last wlanX if found the WPS comments.
read_wps_vap_name_from_hostapd()
{
	# Define local parameters
	local interface_name radio_name section_start_text section_end_text section_start hostapd_get_name line

	interface_name=$1
	radio_name=$2
	wps_state=$3
	hostapd_conf_file_file=$4
	[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: interface_name=$interface_name, radio_name=$radio_name, wps_state=$wps_state, hostapd_conf_file_file=$hostapd_conf_file_file" > $TRACE_OUT

	if [ -z "$hostapd_conf_file_file" ]
	then
		#hostapd_conf_file_file=${CONF_DIR}/hostapd_${radio_name}.conf
		hostapd_conf_file_file=${CONF_DIR}/hostapd_${interface_name}.conf
	fi
	[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: hostapd_conf_file_file=$hostapd_conf_file_file" > $TRACE_OUT
	
	[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: wps_state=$wps_state" > $TRACE_OUT

	# Options: unConfigured and Configured hostapd files
	# #___WPS_parameters___#
	# # WPS configuration - START
	if [ "$wps_state" = "wps_state=1" ]
	then
		[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: look for name of Unconfigured VAP" > $TRACE_OUT
		section_start_text="#___WPS_parameters___#"
	else
		[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: look for name of Configured VAP" > $TRACE_OUT
		section_start_text="# WPS configuration - START"
	fi

	section_start=""
	hostapd_get_name=${CONF_DIR}/hostapd_get_name_${interface_name}
	start_vap=" VAP parameters #"

	rm -f $hostapd_get_name
	
	while read line
	do
		[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: found section_start, line=$line" > $TRACE_OUT
		start_vap=`echo $line | grep ' VAP parameters #' -c`
		if [ "$start_vap" = "1" ]
		then
			[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: found VAP Start, get interface name" > $TRACE_OUT
			tmp1=${line################ }
			vap_name=`echo $tmp1 | awk '{print $1}'`
			[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: vap_name=$vap_name" > $TRACE_OUT
			# Overrun with last name
			echo "hostapd_vap_name=$vap_name" > $hostapd_get_name
		fi
		# If this section has WPS enable, return the VAP name
		if [ "$section_start" = "1" ]
		then
			[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: section_start=1, compare line ($line) to $wps_state" > $TRACE_OUT
			if [ "$line" = "$wps_state" ]
			then
				[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: wps supported interface name already saved, can return" > $TRACE_OUT
				################################################
				# Source new hostapd values file and delete it.
				################################################
				[ -e "$hostapd_get_name" ] && . $hostapd_get_name
				return
			fi
		fi
		# If found starting comment, set the flag.
		if [ "$line" = "$section_start_text" ]
		then
			[ "$enable_log" = "1" ] && echo "read_wps_vap_name_from_hostapd: set section_start ($line)" > $TRACE_OUT
			section_start=1
		fi
	done < $hostapd_conf_file_file

	# Source new hostapd values file and delete it.
	[ -e "$hostapd_get_name" ] && . $hostapd_get_name
	# For debug savefile:
	[ -e "$hostapd_get_name" ] && cp $hostapd_get_name ${hostapd_get_name}_${interface_name}
}

# Returns external registrar configuration.
# Read updated values in hostapd.conf after external registrar configured it.
# The updated values changed by the external registrar are saved in the hostapd conf file.
# These values are in a section starting with the comment "WPS configuration - START" and ending with the comment "WPS configuration - END".
# Read the updated parameters in the new section to a file and source this file.
read_new_hostapd_values()
{
	# Define local parameters
	local interface_name radio_name section_start_text section_end_text section_start hostapd_new_values line

	interface_name=$1
	radio_name=$2
	hostapd_conf_file_file=$3
	[ "$enable_log" = "1" ] && echo "read_new_hostapd_values: interface_name=$interface_name, radio_name=$radio_name, hostapd_conf_file_file=$hostapd_conf_file_file" > $TRACE_OUT

	if [ -z "$hostapd_conf_file_file" ]
	then
		hostapd_conf_file_file=${CONF_DIR}/hostapd_${radio_name}.conf
	fi
	section_start_text="# WPS configuration - START"
	section_end_text="# WPS configuration - END"
	section_start=""
	hostapd_new_values=${CONF_DIR}/hostapd_new_values_${interface_name}
	start_vap=" VAP parameters #"
	
	rm -f $hostapd_new_values
	
	# Go over the updated hostapd.conf file and find the needed parameters.
	while read line
	do
		start_vap=`echo $line | grep ' VAP parameters #' -c`
		if [ "$start_vap" = "1" ]
		then
			[ "$enable_log" = "1" ] && echo "read_new_hostapd_values: found VAP Start, get interface name" > $TRACE_OUT
			tmp1=${line################ }
			vap_name=`echo $tmp1 | awk '{print $1}'`
			[ "$enable_log" = "1" ] && echo "read_new_hostapd_values: vap_name=$vap_name" > $TRACE_OUT
			echo "hostapd_vap_name=$vap_name" >> $hostapd_new_values
		fi
		
		# If found ending comment, exit the loop.
		if [ "$line" = "$section_end_text" ]; then break; fi
		if [ "$section_start" = "1" ]
		then
			# Write the parameter to the temp file with the prefix "hostapd_"
			echo "hostapd_$line" >> $hostapd_new_values
		fi
		# If found starting comment, set the flag.
		if [ "$line" = "$section_start_text" ]
		then
			[ "$enable_log" = "1" ] && echo "read_new_hostapd_values: set section_start :-) !!!!!!!!!" > $TRACE_OUT
			section_start=1
		fi
	done < $hostapd_conf_file_file

	# Wrap hostapd_wpa_pairwise with parenthesis as there are spaces in value
	sed -i -e 's/hostapd_wpa_pairwise=/hostapd_wpa_pairwise=\"/' -e '/hostapd_wpa_pairwise=/s/$/\"/' $hostapd_new_values

	# Source new hostapd values file and delete it.
	[ -e "$hostapd_new_values" ] && . $hostapd_new_values
	[ -e "$hostapd_new_values" ] && cp $hostapd_new_values ${hostapd_new_values}_last
	[ -e "$hostapd_new_values" ] && rm $hostapd_new_values
}


# Conver UGW WPS notification command to FAPI CLI format.
# Example of UG command:
#   ubus call servd notify '{"nid":20,"type":false,"pn1":"ObjectName","pv1":"Device.WiFi.SSID","pn2":"SSID","pv2":"L-FWDRV-02_Network_6","pn3":"Name","pv3":"wlan0","pn4":"ObjectName","pv4":"Device.WiFi.AccessPoint.Security","pn5":"ModeEnabled","pv5":"WPA2-Personal","pn6":"KeyPassphrase","pv6":"yn26-uno0-fqkp"}'
convert_ugw_to_fapicli()
{
	command=$*
	name=pn
	value=pv
	stam=ubus
	
	[ "$enable_log" = "1" ] && echo "In convert_ugw_to_fapicli" > $TRACE_OUT
	#ubus_command="build_wlan_notification \"servd\" \"NOTIFY_WIFI_UPDATE_PARAM\" \"Name:$hostapd_vap_name "
	ubus_command="\"servd\" \"NOTIFY_WIFI_UPDATE_PARAM\" \"Name:$hostapd_vap_name "
	for word in $command
	do
		#echo "In loop: word=$word" > $TRACE_OUT
		if [ "$word" = "${word/:/}" ]; then echo "continue" > /dev/consol; continue; fi
		# Replace ',' with space
		word1=`echo $word | sed 's/,/ /g'`
		word1=`echo $word1 | sed "s/'//g"`
		word1=`echo $word1 | sed "s/}//g"`
		for word2 in $word1
		do
			#echo "In loop2" > $TRACE_OUT
			#echo "word2=$word2" > $TRACE_OUT
			if [ "$word2" != "${word2/$name/}" ];then  param=${word2##*:}; param=$param; param=`echo "$param" | sed 's/\"//g'`; echo "param=$param"  > $TRACE_OUT; ubus_command="$ubus_command $param:"; fi
			if [ "$word2" != "${word2/$value/}" ];then  val=${word2##*:}; val=$val; val=`echo "$val" | sed 's/\"//g'`; echo "val=$val"  > $TRACE_OUT; ubus_command="$ubus_command$val "; fi
		done
	done
	if [ ! -e $FAPI_RPC ]
	then
		echo "$ubus_command\""
	else
		echo "$ubus_command\"" > /tmp/wlan_wave/ubus_command
	fi
}

# Save the settings after WPS external registrar session from the hostapd conf file to the database.
# Notify SL that an update of the DB after external registrar is needed using ubus call with the parameters to update
# For test set test_only=1
wps_external_done()
{
	local interface_name interface_index radio_name radio_index nid \
	param_index ubus_call db_security_mode wep_key_length wpa_type key_management conf_param_index
	############################################################################
	# TEST MODE:                                                               #
	# For test set test_only=1                                                 #
	# For logs set enable_log=1                                                #
	# Code:                                                                    #
	# [ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh       #
	# wps_external_done wlan0.0                                                #
	############################################################################
	test_only=0

	interface_name=$1
	
	#############################################################################
	# Remove USE_CURRENT_CONF flag, will set when finish configuration
	[ -e ${USE_CURRENT_CONF}_${interface_name} ] && rm ${USE_CURRENT_CONF}_${interface_name}
	
	# Find the interface index and the radio index
	interface_index=`find_index_from_interface_name $interface_name`
	radio_name=${interface_name%%.*}
	radio_index=`find_index_from_interface_name $radio_name`

	echo "wps_external_done: interface_name=$interface_name, radio_name=$radio_name" > $TRACE_OUT

	################################################################
	# Support WPS session in Unconfigured mode:
	wps_in_procees_in_unconfigured_state=
	if [ -e ${WPS_IN_PROGRESS_UNCONF_STATE} ]
	then
		[ "$enable_log" = "1" ] && echo "wps_external_done: set wps_in_procees_in_unconfigured_state" > $TRACE_OUT
		wps_in_procees_in_unconfigured_state=1
		[ "$enable_log" = "1" ] && echo "wps_external_done: rm ${WPS_IN_PROGRESS_UNCONF_STATE}" > $TRACE_OUT
		rm ${WPS_IN_PROGRESS_UNCONF_STATE}
	fi
	[ "$enable_log" = "1" ] && echo "wps_external_done: interface_index=$interface_index, radio_name=$radio_name" > $TRACE_OUT
	print2log $radio_index DEBUG "$script_name: Start wps_external_done"

	# Check hostapd configuration file exists.
	[ ! -e ${CONF_DIR}/hostapd_${radio_name}.conf ] && print2log $radio_index ERROR "$script_name: Aborted. hostapd_${radio_name}.conf file doesn't exist" && exit 1

	# Find number of interfaces and config those support WPS
	
	ifname_list=
	# Get Physical interfaces, parse to have names only in list:
	db_radio_name_list=`cat ${CONF_DIR}/fapi_wlan_wave_radio_conf | grep ^Name`
	for n in $db_radio_name_list
	do
		ifname_list_tmp=`echo ${n#*=\"}`
		ifname_list_tmp=`echo ${ifname_list_tmp%\"}`
		ifname_list_tmp=$(printf "%b" "$ifname_list_tmp")
		ifname_list="$ifname_list $ifname_list_tmp"
	done
	
	[ "$enable_log" = "1" ] && echo "wps_external_done: ifname_list=$ifname_list" > $TRACE_OUT
	
	###################################################################
	# DEBUG: dump files:
	for interface_name_tmp in $ifname_list
	do
		[ "$test_only" = "0" ] && [ "$enable_log" = "1" ] && echo "wps_external_done: dump ${CONF_DIR}/hostapd_${interface_name_tmp}.conf" > $TRACE_OUT
		[ "$test_only" = "0" ] && [ "$enable_log" = "1" ] && cat ${CONF_DIR}/hostapd_${interface_name_tmp}.conf > $TRACE_OUT
	done
	###################################################################

	# NEW - Use interface from hostapd event:
	radio_configured=$radio_name

	[ "$enable_log" = "1" ] && echo "wps_external_done: radio_configured=$radio_configured" > $TRACE_OUT

	##################################################################
	# read_new_hostapd_values: set parameters and source them.
	# Format: hostapd_PARAMNAME
	# List:
	#   hostapd_wpa
	#   hostapd_wep_default_key
	#   hostapd_wep_key
	#   hostapd_wpa_pairwise
	#   hostapd_wpa_key_mgmt
	#   hostapd_ssid
	#   hostapd_wpa_passphrase
	##################################################################
	# Read the updated parameters from hostapd conf file
	if [ "$test_only" = "0" ]
	then
		#read_new_hostapd_values $interface_name $radio_name
		read_new_hostapd_values $radio_configured $radio_name
	else
		echo "wps_external_done: ############################################################################" > $TRACE_OUT
		echo "wps_external_done: # TEST MODE                                                                #" > $TRACE_OUT
		echo "wps_external_done: ############################################################################" > $TRACE_OUT
		create_test_file /tmp/fapi_test_external_registrar
		read_new_hostapd_values $radio_configured $radio_name /tmp/fapi_test_external_registrar
	fi

	# Convert security hostapd values to DB values
	######################################################################
	db_security_mode=""
	
	# If wpa is 0, security is wep or open.
	[ "$enable_log" = "1" ] && echo "wps_external_done: hostapd_wpa=$hostapd_wpa" > $TRACE_OUT
	if [ -z "$hostapd_wpa" ] || [ "$hostapd_wpa" = "0" ]
	then
		[ "$enable_log" = "1" ] && echo "wps_external_done: OPEN/WEP" > $TRACE_OUT
		db_security_mode="None"
		# Check if WEP by checking if wep_default_key was set.
		if [ "$hostapd_wep_default_key" ]
		then
			db_security_mode="WEP-64"
			# Check if key is 128
			wep_key_length=`echo $hostapd_wep_key | wc -L`
			if [ $wep_key_length = 13 ] || [ $wep_key_length = 26 ]
			then
				db_security_mode="WEP-128"
			fi
		fi
	else # Security is WPA 
		[ "$enable_log" = "1" ] && echo "wps_external_done: hostapd_wpa_pairwise=$hostapd_wpa_pairwise" > $TRACE_OUT
		[ "$enable_log" = "1" ] && echo "wps_external_done: hostapd_wpa=$hostapd_wpa" > $TRACE_OUT
		[ "$enable_log" = "1" ] && echo "wps_external_done: WPA" > $TRACE_OUT
		tkip_exist=`echo $hostapd_wpa_pairwise | grep TKIP -c`
		[ "$enable_log" = "1" ] && echo "wps_external_done: tkip_exist=$tkip_exist" > $TRACE_OUT
		if [ "$hostapd_wpa_pairwise" ] && [ "$hostapd_wpa_pairwise" = "CCMP" ]
		then
			wpa_type="WPA2"
		else
			wpa_type="WPA"
			# hostapd_rsn_pairwise - no such parameter. Add fix (05/04/17)
			[ "$hostapd_wpa_pairwise" ] && [ "$tkip_exist" = "1" ] && wpa_type="WPA-WPA2"
		fi
		# Check wpa_key_mgmt to see if in WPA-personal or WPA-enterparise security mode.
		key_management="Personal"
		[ "$hostapd_wpa_key_mgmt" ] && [ "$hostapd_wpa_key_mgmt" = "WPA-EAP" ] && key_management="Enterprise"
		db_security_mode="${wpa_type}-${key_management}"
		[ "$enable_log" = "1" ] && echo "wps_external_done: db_security_mode=$db_security_mode" > $TRACE_OUT
	fi
	#
	######################################################################
	
	
	######################################################################
	# Create ubus command for SL to update DB with new values
	######################################################################
	
	# Source ugw_notify_defs.sh
	if [ -e $FAPI_RPC ]
	then
		#. /etc/ugw_notify_defs.sh
		nid=1
	else
		. /etc/ugw_notify_defs.sh
		nid=$NOTIFY_WIFI_WPS_NEW_AP_SETTINGS
	fi
	#param_index=1

	ubus_call=${CONF_DIR}/ubus_call.sh
	
	ssid=$hostapd_ssid
	index=0
	
	# Build radio list, configured radio first in list:
	# 	wlanX (Configured) wlanY (Unconfigured)
	#
	ifname_list_new=$radio_configured
	for interface_name_tmp in $ifname_list
	do
		if [ "$interface_name_tmp" != "$radio_configured" ]
		then
			ifname_list_new="$ifname_list_new $interface_name_tmp"
		fi
	done
	[ "$enable_log" = "1" ] && echo "wps_external_done: ifname_list_new=$ifname_list_new" > $TRACE_OUT
	
	echo 1 > ${WPS_IN_PROGRESS_EXTERNAL}
	
	# Loop over radios:
	# 	Configured first in loop
	# 	For Configured - do not restart
	restart_interface=0
	for interface_name_tmp in $ifname_list_new
	do
		param_index=1
		
		if [ "$test_only" = "0" ]
		then
			file=${CONF_DIR}/hostapd_${interface_name_tmp}.conf
		else
			file=/tmp/fapi_test_external_registrar
		fi

		#wps_state_config=`cat $file | grep ^wps_state | grep =2` # WPS Configured
		#wps_state_unconfig=`cat $file | grep ^wps_state | grep =1` # WPS Unconfigured
		wps_state_config=`cat $file | grep ^wps_state=2` # WPS Configured
		wps_state_unconfig=`cat $file | grep ^wps_state=1` # WPS Unconfigured
		[ "$enable_log" = "1" ] && echo "wps_external_done: wps_state_config=$wps_state_config, wps_state_unconfig=$wps_state_unconfig" > $TRACE_OUT

		if [ "$wps_state_config" = "wps_state=2" ]
		then
			wps_state=$wps_state_config
		else
			wps_state=$wps_state_unconfig
		fi
		[ "$enable_log" = "1" ] && echo "wps_external_done: wps_state=$wps_state" > $TRACE_OUT

		if [ "$wps_state" = "wps_state=2" ] || [ "$wps_state" = "wps_state=1" ]
		then
			############################################
			# This interface has WPS enabled. Serve it...
			
			[ "$enable_log" = "1" ] && echo "wps_external_done: $interface_name_tmp has WPS enabled" > $TRACE_OUT

			# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			# Open comment - to give different name for each interface:
			#if [ "$interface_name_tmp" != "radio_name" ]
			#then
			#	eval hostapd_ssid_${index}=${hostapd_ssid}_${index}
			#	ssid=${hostapd_ssid}_${index}
			#	[ "$enable_log" = "1" ] && echo "wps_external_done: ssid=$ssid" > $TRACE_OUT
			#fi

			ubus_command="ubus call servd notify '{\"nid\":$nid,\"type\":false,\"pn${param_index}\":\"ObjectName\",\"pv${param_index}\":\"$SSID_OBJECT\","
			param_index=$((param_index+1))
			ubus_command="${ubus_command}\"pn${param_index}\":\"SSID\",\"pv${param_index}\":\"$ssid\","
			param_index=$((param_index+1))
			
			# For the Unconfigured interface:
			#   -Find the vap that needs to be updated
			# If the radio is of current VAP, send to VAP (hostapd_vap_name)
			if [ "$test_only" = "0" ]
			then
				if [ "$interface_name_tmp" != "$interface_name" ]
				then
					# will save name in hostapd_vap_name
					read_wps_vap_name_from_hostapd $interface_name_tmp $radio_name $wps_state
				else
					hostapd_vap_name=$interface_name_tmp
				fi
			else
				############################################################################
				# TEST MODE                                                                #
				############################################################################
				read_wps_vap_name_from_hostapd $interface_name_tmp $radio_name $wps_state /tmp/fapi_test_external_registrar
			fi
			[ "$enable_log" = "1" ] && echo "wps_external_done: after read_wps_vap_name_from_hostapd: hostapd_vap_name=$hostapd_vap_name" > $TRACE_OUT
			
			ubus_command="${ubus_command}\"pn${param_index}\":\"Name\",\"pv${param_index}\":\"$hostapd_vap_name\","
			param_index=$((param_index+1))
			ubus_command="${ubus_command}\"pn${param_index}\":\"ObjectName\",\"pv${param_index}\":\"$ACCESSPOINT_SECURITY_OBJECT\","
			param_index=$((param_index+1))
			ubus_command="${ubus_command}\"pn${param_index}\":\"ModeEnabled\",\"pv${param_index}\":\"$db_security_mode\""
			param_index=$((param_index+1))
			# If security is WPA/WPA2/mixed, set paddphrase
			if [ ! -z "$hostapd_wpa_passphrase" ]
			then
				ubus_command="${ubus_command},\"pn${param_index}\":\"KeyPassphrase\",\"pv${param_index}\":\"$hostapd_wpa_passphrase\""
				param_index=$((param_index+1))
			fi
			# If security is WEP, set WEP key
			if [ ! -z "$hostapd_wep_key" ]
			then
				ubus_command="${ubus_command},\"pn${param_index}\":\"WEPKey\",\"pv${param_index}\":\"$hostapd_wep_key\""
				param_index=$((param_index+1))
			fi

			################################################################
			# Support WPS session in Unconfigured mode:
			NoRestart=false
			if [ "$wps_in_procees_in_unconfigured_state" = "1" ]
			then
				# This case is WPS session when the board is in Unconfigured state.
				# Restart only Unconfigured interface (the interface that had WPS session may be connected already)
				[ "$enable_log" = "1" ] && echo "wps_external_done: restart_interface=$restart_interface" > $TRACE_OUT
				if [ "$restart_interface" = "0" ]
				then
					NoRestart=true
					restart_interface=1
				fi
			fi

			if [ "$wps_state" = "wps_state=2" ]
			then
				local wps_state_from_conf wps_state_val
				## check the actual value from the interanl DB.
				wps_state_from_conf=`get_wps_state $interface_index ${CONF_DIR}/fapi_wlan_wave_wps_conf`
				wps_state_val="${wps_state##*=}"
				[ "$wps_state_val" = "$wps_state_from_conf" ] && NoRestart=true
				## no restart is needed if wps_state was not changed in case of Configured.
				[ "$enable_log" = "1" ] && echo "wps_external_done: change due to wps_state=2 NoRestart=$NoRestart wps_state_from_conf=$wps_state_from_conf wps_state_val=$wps_state_val" > $TRACE_OUT
			fi

			[ "$enable_log" = "1" ] && echo "wps_external_done: NoRestart=$NoRestart" > $TRACE_OUT
			ubus_command="${ubus_command},\"pn${param_index}\":\"NoRestart\",\"pv${param_index}\":\"$NoRestart\""
			param_index=$((param_index+1))
	
			ubus_command="${ubus_command}}'"
		
			print2log $radio_index DEBUG_WPS "wps_external_done: build_wlan_notification: Name:$hostapd_vap_name Object:${RADIO_WPS_VENDOR_OBJECT} ConfigState:Configured"
			if [ -e $FAPI_RPC ]
			then
				[ "$test_only" = "0" ] && build_wlan_notification "servd" "NOTIFY_WIFI_WPS" "Name:$hostapd_vap_name Object:${RADIO_WPS_VENDOR_OBJECT} ConfigState:Configured"
			else
				[ "$test_only" = "0" ] && build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$hostapd_vap_name Object:${RADIO_WPS_VENDOR_OBJECT} ConfigState:Configured"
			fi
			
			if [ "$hostapd_vap_name" != "$interface_name_tmp" ]
			then
				print2log $radio_index DEBUG_WPS "wps_external_done: 2nd: build_wlan_notification: Name:$interface_name_tmp Object:${RADIO_WPS_VENDOR_OBJECT} ConfigState:Configured"
				if [ -e $FAPI_RPC ]
				then
					[ "$test_only" = "0" ] && build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name_tmp Object:${RADIO_WPS_VENDOR_OBJECT} ConfigState:Configured"
				else
					[ "$test_only" = "0" ] && build_wlan_notification "servd" "NOTIFY_WIFI_WPS" "Name:$interface_name_tmp Object:${RADIO_WPS_VENDOR_OBJECT} ConfigState:Configured"
				fi	
			fi

			# Make the script calling the ubus executable and execute it
			echo "$ubus_command" > $ubus_call
			chmod +x $ubus_call
			[ "$enable_log" = "1" ] && echo "wps_external_done: cat $ubus_call:" > $TRACE_OUT
			[ "$enable_log" = "1" ] && cat $ubus_call > $TRACE_OUT
			# Call notification according to platform:
			fapi_rpc=false
			if [ -e $FAPI_RPC ]
			then
				fapi_rpc=true
			fi
		
			case "$fapi_rpc" in
			"false")
				[ "$enable_log" = "1" ] && echo "wps_external_done: UGW, exec ubus_command=$ubus_command" > $TRACE_OUT
				# TEST:
				[ "$test_only" = "1" ] && exit
				# TEST END
				[ "$test_only" = "0" ] && $ubus_call
			;;
			"true")
				[ "$enable_log" = "1" ] && echo "wps_external_done: Call convert_ugw_to_fapicli with ubus_command=$ubus_command" > $TRACE_OUT
				ubus_command_fapi=`convert_ugw_to_fapicli $ubus_command`
				ubus_command_fapi=`cat /tmp/wlan_wave/ubus_command`
				ubus_command_fapi=`echo $ubus_command_fapi | awk -F " \"" '{print $3}' | awk -F "NoRestart" '{print $1}'`
				[ "$enable_log" = "1" ] && echo "wps_external_done: exec build_wlan_notification" > $TRACE_OUT
				build_wlan_notification "servd" "NOTIFY_WIFI_SSID_SECURITY" "${ubus_command_fapi}"
			;;
			esac

			
			rm -f $ubus_call
			
			index=$((index+1))
			
			
			#########################################################################
			# Update local dB
			#   ObjectName,$SSID_OBJECT
			#     SSID,$ssid
			#     Name,$hostapd_vap_name
			#   ObjectName,$ACCESSPOINT_SECURITY_OBJECT
			#     ModeEnabled,$db_security_mode
			#     if [ ! -z "$hostapd_wpa_passphrase" ];then KeyPassphrase,$hostapd_wpa_passphrase; fi
			#
			
			if [ "$NoRestart" = "true" ]
			then
				#####################################
				# Update local dB for this interface
				[ "$enable_log" = "1" ] && echo "wps_external_done: update local dB for $interface_name_tmp" > $TRACE_OUT
	
				conf_param_index=0
				
				# Update ssid
				ssid_hex=`ascii2hex $ssid`
				hostapd_vap_index=`find_index_from_interface_name $hostapd_vap_name`
				[ "$enable_log" = "1" ] && echo "Create Local dB: $SSID_OBJECT" > $TRACE_OUT
				save_db_params_local_create_file $conf_param_index $SSID_OBJECT SSID "$ssid_hex"
				[ "$enable_log" = "1" ] && cat ${TEMP_DIR}/save_db_params_local_file
				[ "$test_mode" = "0" ] && save_db_params_local ssid_set $hostapd_vap_name $conf_param_index $hostapd_vap_index

				# Update security
				db_security_mode_hex=`ascii2hex $db_security_mode`
				hostapd_vap_index=`find_index_from_interface_name $hostapd_vap_name`
				[ "$enable_log" = "1" ] && echo "Create Local dB: $ACCESSPOINT_SECURITY_OBJECT" > $TRACE_OUT
				save_db_params_local_create_file $conf_param_index $ACCESSPOINT_SECURITY_OBJECT ModeEnabled "$db_security_mode_hex"
				if [ ! -z "$hostapd_wpa_passphrase" ]
				then
					hostapd_wpa_passphrase_hex=`ascii2hex $hostapd_wpa_passphrase`
					save_db_params_local_add_file $conf_param_index KeyPassphrase "$hostapd_wpa_passphrase_hex"
				fi
				[ "$enable_log" = "1" ] && cat ${TEMP_DIR}/save_db_params_local_file
				[ "$test_mode" = "0" ] && save_db_params_local ssid_set $hostapd_vap_name $conf_param_index $hostapd_vap_index
	
				
				#####################################
				# Update local VAP hostapd
				[ "$enable_log" = "1" ] && echo "wps_external_done: update local VAP hostapd" > $TRACE_OUT

				hostapd_vap_conf_name=${CONF_DIR}/hostapd_vap_${hostapd_vap_name}.conf
				
				# SSID
				#sed -i -e 's/ssid=.*/ssid='$ssid_new'/' -e 's/bridge=.*/bridge='$bridge_new'/'  $hostapd_vap_conf_name
				sed -i -e 's/ssid=.*/ssid='$ssid_new'/'  $hostapd_vap_conf_name

				# security
				sed -i -e 's/wpa=.*/wpa='$hostapd_wpa'/'  $hostapd_vap_conf_name
				if [ ! -z "$hostapd_wpa_passphrase" ]
				then
					sed -i -e 's/wpa_passphrase=.*/wpa_passphrase='$hostapd_wpa_passphrase'/'  $hostapd_vap_conf_name
				fi
				
				# wps
				sed -i -e 's/wps_state=.*/wps_state='2'/'  $hostapd_vap_conf_name
			fi

		else
			[ "$enable_log" = "1" ] && echo "wps_external_done: $interface_name_tmp has WPS disabled" > $TRACE_OUT
		fi
				
		
	done
	
	###############################################
	# Create USE_CURRENT_CONF flag
	touch ${USE_CURRENT_CONF}_${interface_name}
	
	rm ${WPS_IN_PROGRESS_EXTERNAL}
	
	# Remove TEST file if exist
	rm -rf /tmp/fapi_test_external_registrar
	
	print2log $radio_index DEBUG "wps_external_done: End wps_external_done"
}

endpoint_wps_connect_via_pbc()
{
	# Define local parameters
	local interface_name wps_timeout wpa_state

	interface_name=$1

	wpa_cli -i $interface_name wps_pbc
}

endpoint_wps_connect_via_pin()
{
	enrollee_PIN=$1
	if [ -n "$enrollee_PIN" ]
	then
		wpa_cli -i $interface_name wps_pin any $enrollee_PIN
	else
		print2log $ap_index ERROR "missing enrollee_PIN in WPS PIN action"
	fi
}

# Read needed information from supplicant:
# SSID of the far AP (from wpa_cli status)
# Security type of the connection (from wpa_cli status)
# Passphrase for WPA2 security (when in WPA2-CCMP mode, from supplicant.conf)
read_supplicant_configuration()
{
	# Define local parameters
	local endpoint_name out_ssid out_security out_passphrase \
	new_ssid new_psk new_security current_network key_mgmt supplicant_conf ssid_line

	endpoint_name=$1
	out_ssid=$2
	out_security=$3
	out_passphrase=$4

	new_ssid=""
	new_psk=""
	new_security="$DB_WPA2_CCMP_PERSONAL"

	# Read the current active network
	current_network=`wpa_cli -i${endpoint_name} list_networks | grep [CURRENT] | awk '{print $1}'`

	# Read the ssid of the current network
	new_ssid=`wpa_cli -i${endpoint_name} get_network $current_network ssid`
	# Remove double quotes
	new_ssid=${new_ssid//\"}

	# Read the security of the current network
	key_mgmt=`wpa_cli -i${endpoint_name} get_network $current_network key_mgmt`
	if [ "$key_mgmt" = "NONE" ]
	then
		new_security="$DB_OPEN"
	fi

	# For WPA2-CCMP security, read the psk from the supplicant.conf file
	if [ "$new_security" = "$DB_WPA2_CCMP_PERSONAL" ]
	then
		supplicant_conf=${CONF_DIR}/${SUPPLICANT_CONF_PREFIX}_${endpoint_name}.conf
		# Get the network block from supplicant conf file with the selected ssid
		ssid_line=`grep -n $new_ssid $supplicant_conf | cut -d: -f1`
		cat $supplicant_conf | sed -n "${ssid_line},/}/p" > ${TEMP_DIR}/active_block

		# Extract the PSK from the network block
		new_psk=`grep psk ${TEMP_DIR}/active_block`
		new_psk=${new_psk##*=\"}
		new_psk=${new_psk%\"}
	fi

	rm -f ${TEMP_DIR}/wpa_cli_status ${TEMP_DIR}/active_block

	# Set the parameters for the notification
	eval $out_ssid="$new_ssid"
	eval $out_security="$new_security"
	eval $out_passphrase="$new_psk"
}

# Check if endpoint_set was called to perform WPS action
# return the WPS action (empty if none)
endpoint_check_wps_action()
{
	# Define local parameters
	local interface_index interface_name wps_action enrollee_PIN

	interface_index=$1
	interface_name=$2

	wps_action=""

	# Check the WPS action if it is included in in.conf
	if test $(grep '^X_LANTIQ_COM_Vendor_WPSAction_' ${IN_CONF})
	then
		[ ! "$LIB_WPS_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_wps.sh
		wps_action=`db2fapi_convert regular X_LANTIQ_COM_Vendor_WPSAction $interface_index`
		case "$wps_action" in
			"PBC")
				endpoint_wps_connect_via_pbc $interface_name
				;;
			"PIN")
				enrollee_PIN=`db2fapi_convert regular X_LANTIQ_COM_Vendor_EndpointPIN $interface_index`
				endpoint_wps_connect_via_pin $enrollee_PIN
				;;
		#	"CancelWPS")
		#		cancel_wps
		#		;;
		esac
	fi

	echo "$wps_action"
}
get_wps_state()
{
	local interface_index TMP1 wps_state conf_file

	interface_index=$1
	conf_file=$2

	TMP1=`cat $conf_file | sed -n 's/^ConfigState_'"$interface_index"'=//p'`
	eval wps_state=`printf $TMP1`
	[ "$wps_state" = "Disabled" ] && wps_state="0"
	[ "$wps_state" = "Unconfigured" ] && wps_state="1"
	[ "$wps_state" = "Configured" ] && wps_state="2"
	echo "$wps_state"
}
LIB_WPS_SOURCED="1"
