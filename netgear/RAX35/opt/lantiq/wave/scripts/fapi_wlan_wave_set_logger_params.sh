#!/bin/sh
# This script updates the logger parameters in the configuration files.

script_name="fapi_wlan_wave_set_logger_params.sh"

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh
[ ! "$LIB_CONVERT_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_convert.sh
[ ! "$LIB_LOGGER_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_logger.sh

interface_name=$1
interface_index=$2
pid=$3

timestamp $interface_index "$script_name:$interface_name:begin"
print2log $interface_index DEBUG "$script_name $*"

# Map the objects indexes to the received objects in the in.conf file
fw_stream_index=`map_param_index Object $RADIO_VENDOR_FW_LOGGER_OBJECT`
driver_stream_index=`map_param_index Object $RADIO_VENDOR_DRIVER_LOGGER_OBJECT`
if [ -z "$fw_stream_index" ]
then
        fw_stream_index=$driver_stream_index
fi
if [ -z "$driver_stream_index" ]
then
        driver_stream_index=$fw_stream_index
fi

#configuration_stream_index=`map_param_index Object $RADIO_VENDOR_CONFIGURATION_LOGGER_OBJECT`
#hostapd_stream_index=`map_param_index Object $RADIO_VENDOR_HOSTAPD_LOGGER_OBJECT`

destination_conf=drv_config_pre_up
# Remove logger commands from the conf file
drv_config_pre_up_conf_name=${CONF_DIR}/drv_config_pre_up_${interface_name}_${pid}.conf
drv_one_time_conf_name=${CONF_DIR}/${DRIVER_SINGLE_CALL_CONFIG_FILE}_${interface_name}_${pid}.conf
remove_params_from_conf "/proc/net/mtlk_log/rtlog rdebug route tcpdump" "$drv_config_pre_up_conf_name" $DRIVER_PRE_UP_CONF_PREFIX

# Calculate new values.
### General parameters
# Components log level
# TODO: remove comment once LogLevel is supported by driver
#fw_log_level=`convert_log_level $interface_name $interface_index $LOGGER_FW`
driver_log_level=`convert_driver_debug_level $interface_index rdebug`
# TODO: remove comment once configuration and hostapd streams are supported
#configurations_log_level=`convert_log_level $interface_name $interface_index $LOGGER_CONFIGURATIONS`
#hostapd_log_level=`convert_log_level $interface_name $interface_index $LOGGER_HOSTAPD`

# Halt on error
#halt_on_error=`db2fapi_convert regular WaveHaltOnErrorLog $interface_index`

# Write the above parameters to the configuration file.
# TODO: remove comment once LogLevel is supported by driver
#set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$fw_log_level"
#set_conf_param $destination_conf proc otf $pid $interface_name "/proc/net/mtlk_log/debug" "$driver_log_level"
# TODO: remove comment once configuration and hostapd streams are supported
#set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$configurations_log_level"
#set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$hostapd_log_level"
# TODO: remove comment once HaltOnError is supported by driver
#set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "HaltOnError $interface_name $halt_on_error"

# For each component, save the input configuration parameters to a local DB used by Wave FAPI and set its related parameters
# FW logger parameters and streams
if [ -n "$fw_stream_index" ]
then
	save_db_params logger_set_fw $interface_name $fw_stream_index $interface_index
	local_db_source LOGGER_FW

	# Assign HW modules to the HW FIFOs
	hw_module_fifo=`assign_hw_module_fifo $interface_name $interface_index`
	set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$hw_module_fifo"

	# Remove the existing stream and add existing stream.
	remove_fw_stream0=`remove_stream_arguments $LOGGER_FW $interface_name 0`
	# Write the above configurations to the configuration file.
	set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$remove_fw_stream0"

	# Add the stream
	# Check if stream is enabled and if so, add it
	fw_stream_enabled=`db2fapi_convert boolean WaveFwStreamEnable $interface_index`
	if [ "$fw_stream_enabled" = "1" ]
	then
		fw_offline_logger=`db2fapi_convert boolean WaveFwOfflineLogger $interface_index`
		add_fw_stream=`add_new_stream_arguments $interface_name $interface_index $LOGGER_FW $fw_stream_index $fw_offline_logger`
		# For WAN connections, need to add route command to runner
		interface_type=`db2fapi_convert regular WaveFwRemoteInterface $interface_index`
		[ "$interface_type" = "WAN" ] && add_route_command "Fw" $destination_conf $interface_index $pid $interface_name
		set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$add_fw_stream"
	fi
fi
# Driver logger parameters and streams
if [ -n "$driver_stream_index" ]
then
	save_db_params logger_set_driver $interface_name $driver_stream_index $interface_index
	local_db_source LOGGER_DRIVER

	# Remove the existing stream and add existing stream.
	remove_driver_stream0=`remove_stream_arguments $LOGGER_DRIVER $interface_name 0`
	# Write the above configurations to the configuration file.
	set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$remove_driver_stream0"

	# Add the stream
	# Check if stream is enabled and if so, add it
	driver_stream_enabled=`db2fapi_convert boolean WaveDriverStreamEnable $interface_index`
	if [ "$driver_stream_enabled" = "1" ]
	then
		driver_offline_logger=`db2fapi_convert boolean WaveDriverOfflineLogger 0`
		# if driver offline logger is enabled need to add tcpdump command to the runner
		if [ "$driver_offline_logger" = "1" ]
		then
			set_conf_param $destination_conf proc otf $pid $interface_name "/proc/net/mtlk_log/debug" "8 rdebug=1"
			set_conf_param $destination_conf proc otf $pid $interface_name "/proc/net/mtlk_log/debug" "9 rdebug=2"
			if [ "$interface_index" = "0" ]
			then
				driver_offline_max_file_size_mb=`db2fapi_convert regular WaveDriverOfflineMaxfileSizeMb $interface_index`
				driver_offline_packet_size=`db2fapi_convert regular WaveDriverOfflinePacketSize $interface_index`
				driver_offline_num_cyclic_files=`db2fapi_convert regular WaveDriverOfflineNumCyclicFiles $interface_index`
				driver_offline_files_path=`db2fapi_convert regular WaveDriverOfflineFilesPath $interface_index`
				echo "tcpdump -i br-lan udp port 2009 -C${driver_offline_max_file_size_mb} -s${driver_offline_packet_size} -W${driver_offline_num_cyclic_files} -w${driver_offline_files_path} &" >> $drv_config_pre_up_conf_name
				if [ ! -e "$INIT_FLAG" ]
				then
					touch $drv_one_time_conf_name
					echo "killall tcpdump" >> $drv_one_time_conf_name
					echo "tcpdump -i br-lan udp port 2009 -C${driver_offline_max_file_size_mb} -s${driver_offline_packet_size} -W${driver_offline_num_cyclic_files} -w${driver_offline_files_path} &" >> $drv_one_time_conf_name
				fi
			fi
		else
			set_conf_param $destination_conf proc otf $pid $interface_name "/proc/net/mtlk_log/debug" "${driver_log_level}"
			if [ ! -e "$INIT_FLAG" ]
			then
				touch $drv_one_time_conf_name
				echo "killall tcpdump" >> $drv_one_time_conf_name
			fi
		fi
		add_driver_stream=`add_new_stream_arguments $interface_name $interface_index $LOGGER_DRIVER $driver_stream_index $driver_offline_logger`
		# For WAN connections, need to add route command to runner
		interface_type=`db2fapi_convert regular WaveDriverRemoteInterface $interface_index`
		[ "$interface_type" = "WAN" ] && add_route_command "Driver" $destination_conf $interface_index $pid $interface_name
		set_conf_param $destination_conf proc otf $pid $interface_name "$LOGGER_PROC" "$add_driver_stream"
	else
		if [ ! -e "$INIT_FLAG" ]
		then
			touch $drv_one_time_conf_name
			echo "killall tcpdump" >> $drv_one_time_conf_name
		fi
	fi
fi

# TODO: add hostapd and configuration parameters and streams when support is added

# If the bridge of the logger was changed, bring the rtlog0 down and restart the radio
if test `grep WaveLoggerBridgeName_ ${IN_CONF}`
then
	ifconfig rtlog0 down
	echo "restart_${interface_name%%.*}=yes" >> ${CONF_DIR}/${RESTART_FLAG}_${interface_name}
fi

print2log $interface_index DEBUG "$script_name done"
timestamp $interface_index "$script_name:$interface_name:done"
