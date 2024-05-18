#!/bin/sh
# Library script to convert from DB values to driver values.

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh

# Get from DB log level for a component and return the string to configure it.
# String structure is: LogLevel <component> <log level>
convert_log_level()
{
	# Define local parameters
	local interface_name interface_index component param_name log_level

	interface_name=$1
	interface_index=$2
	component=$3

	case $component in
		"0") param_name="WaveFWDebugLevelFw";;
		"1") param_name="WaveDriverDebugLevel";;
		"2") param_name="WaveConfigurationDebugLevel";;
		"3") param_name="WaveHostapdDebugLevel";;
	esac
	log_level=`db2fapi_convert regular $param_name $interface_index`
	echo "LogLevel $component $interface_name $log_level"
}

assign_hw_module_fifo()
{
	local chip_id interface_name interface_index

	interface_name=$1
	interface_index=$2

	chip_id=`check_wave_chip_id $interface_name`

	if [ "$chip_id" = "$GEN6_CHIP_ID" ]; then
		assign_hw_module_fifo_gen6 $interface_name $interface_index
	else
		assign_hw_module_fifo_gen5 $interface_name $interface_index
	fi
}

# Get the assigned module for each HW FIFO and return the command for LogHwModuleFifo
assign_hw_module_fifo_gen5()
{
	# Define local parameters
	local interface_name interface_index hw_module1 hw_module2 \
	hw_module3 hw_module4 hw_module5 hw_module6 assigned_hw

	echo "Logger:assign_hw_module_fifo_gen5" $TRACE_OUT

	interface_name=$1
	interface_index=$2

	# Generate the string of the assigned modules
	hw_module1=`db2fapi_convert regular WaveHwFifo1Module $interface_index`
	hw_module2=`db2fapi_convert regular WaveHwFifo2Module $interface_index`
	hw_module3=`db2fapi_convert regular WaveHwFifo3Module $interface_index`
	hw_module4=`db2fapi_convert regular WaveHwFifo4Module $interface_index`
	hw_module5=`db2fapi_convert regular WaveHwFifo5Module $interface_index`
	hw_module6=`db2fapi_convert regular WaveHwFifo6Module $interface_index`

	assigned_hw="${hw_module1} ${hw_module2} ${hw_module3} ${hw_module4} ${hw_module5} ${hw_module6}"

	echo "LogHwModuleFifo $interface_name $assigned_hw"
}

# Get the assigned module for each HW FIFO and return the command for LogHwModuleFifo
assign_hw_module_fifo_gen6()
{
	# Define local parameters
	local interface_name interface_index hw_module1 hw_module2 \
	hw_module3 hw_module4 hw_module5 hw_module6 assigned_hw

	echo "Logger:assign_hw_module_fifo_gen6" $TRACE_OUT

	interface_name=$1
	interface_index=$2

	# Generate the string of the assigned modules
	hw_module1=`db2fapi_convert regular WaveHwFifo1Module $interface_index`
	hw_module2=`db2fapi_convert regular WaveHwFifo2Module $interface_index`
	hw_module3=`db2fapi_convert regular WaveHwFifo3Module $interface_index`
	hw_module4=`db2fapi_convert regular WaveHwFifo4Module $interface_index`
	hw_module5=`db2fapi_convert regular WaveHwFifo5Module $interface_index`
	hw_module6=`db2fapi_convert regular WaveHwFifo6Module $interface_index`
	hw_module7=`db2fapi_convert regular WaveHwFifo7Module $interface_index`
	hw_module8=`db2fapi_convert regular WaveHwFifo8Module $interface_index`
	hw_module9=`db2fapi_convert regular WaveHwFifo9Module $interface_index`
	hw_module10=`db2fapi_convert regular WaveHwFifo10Module $interface_index`
	hw_module11=`db2fapi_convert regular WaveHwFifo11Module $interface_index`
	hw_module12=`db2fapi_convert regular WaveHwFifo12Module $interface_index`
	hw_module13=`db2fapi_convert regular WaveHwFifo13Module $interface_index`
	hw_module14=`db2fapi_convert regular WaveHwFifo14Module $interface_index`
	hw_module15=`db2fapi_convert regular WaveHwFifo15Module $interface_index`
	hw_module16=`db2fapi_convert regular WaveHwFifo16Module $interface_index`

	assigned_hw="${hw_module1} ${hw_module2} ${hw_module3} ${hw_module4} ${hw_module5} ${hw_module6}"
	assigned_hw="$assigned_hw ${hw_module7} ${hw_module8} ${hw_module9} ${hw_module10} ${hw_module11}"
	assigned_hw="$assigned_hw ${hw_module12} ${hw_module13} ${hw_module14} ${hw_module15} ${hw_module16}"

	echo "LogHwModuleFifo $interface_name $assigned_hw"

}

# Create the string to remove a stream.
# String structure is: LogRemStream <component> <interface_name> <stream_id>
remove_stream_arguments()
{
	# Define local parameters
	local component_id interface_name stream_id

	component_id=$1
	interface_name=$2
	stream_id=$3

	echo "LogRemStream $component_id $interface_name $stream_id"
}

# Create the string to add a new stream.
# String structure is: LogAddStream 0 wlan0 0 192.168.1.1 01:02:03:04:05:06 2222 192.168.1.222 A1:A2:A3:A4:A5:A6 3333 1024 0x1234
add_new_stream_arguments()
{
	# Define local parameters
	local interface_name interface_index component radio_index_stream stream_id source_mac bridge_name source_ip assigned_fifos \
	component_name source_port dest_ip_param dest_ip dest_mac dest_port buffer_threshold chip_id offline_logger

	interface_name=$1
	interface_index=$2
	component=$3
	radio_index_stream=$4

	# Currently, only 1 stream can exist for each component
	stream_id=0

	# For FW, the MAC is the MAC of the radio interface wlan0 and the IP is an IP from the DHCP pool.
	# For other components, the MAC is the MAC of the bridge (br0) and the IP is the bridge IP.

	### Currently: the source MAC is a MAC address not known to the bridge and the source IP is the bridge IP
	source_mac="00:00:00:00:00:10"
	# Read the bridge name to which the logger is added
	bridge_name=`db2fapi_convert regular WaveLoggerBridgeName $interface_index`
	source_ip=`ifconfig $bridge_name`
	source_ip=${source_ip##*inet addr:}
	source_ip=${source_ip%% *}

	# If component is FW, read the assigned FIFOs for the stream.
	chip_id=`check_wave_chip_id $interface_name`
	if [ "$chip_id" = "$GEN6_CHIP_ID" ]; then
		[ "$component" = "$LOGGER_FW" ] && assigned_fifos=`get_assigned_fifos_gen6 $stream_id $interface_index`
	else
		[ "$component" = "$LOGGER_FW" ] && assigned_fifos=`get_assigned_fifos $stream_id $interface_index`
	fi

	case $component in
		"0") component_name="Fw";;
		"1") component_name="Driver";;
		"2") component_name="Configuration";;
		"3") component_name="Hostapd";;
	esac

	source_port=2008
	eval dest_ip_param=Wave${component_name}DestinationIp
	dest_ip=`db2fapi_convert regular $dest_ip_param $interface_index`
	dest_mac=`set_destination_mac $stream_id $dest_ip $component_name $radio_index_stream $interface_index`
	dest_port=2009
	buffer_threshold=1024
	offline_logger=0

	echo "LogAddStream $component $interface_name $stream_id $source_ip $source_mac $source_port $dest_ip $dest_mac $dest_port $offline_logger $buffer_threshold $assigned_fifos"
}

# Get the assigned FIFOs for a stream and return hexadecimal representation of it.
get_assigned_fifos()
{
	# Define local parameters
	local stream_id interface_index assigned_fifos i fifo_enabled shift_res

	echo "get_assigned_fifos gen5" $TRACE_OUT

	stream_id=$1
	interface_index=$2

	fifos_names="WaveMacFifo
	WaveHostIfFifo
	WaveRxHandlerRiscFifo
	WavePhyGenriscFifo
	WavePhyHW
	WaveHwFifo1
	WaveHwFifo2
	WaveHwFifo3
	WaveHwFifo4
	WaveHwFifo5
	WaveHwFifo6"

	assigned_fifos=0
	i=0
	# Go over the FIFOs and for each FIFO check if it is assigned to the stream_id
	for fifo_name in $fifos_names
	do
		fifo_enabled=`db2fapi_convert boolean $fifo_name $interface_index`

		if [ "$fifo_enabled" = "1" ]
		then
			shift_res=$((1<<i))
			assigned_fifos=$((assigned_fifos|shift_res))
			if [ "$fifo_name" = "WaveMacFifo" ]
			then
				i=1
				shift_res=$((1<<i))
				assigned_fifos=$((assigned_fifos|shift_res))
			fi
			if [ "$fifo_name" = "WaveRxHandlerRiscFifo" ]
			then
				i=4
				shift_res=$((1<<i))
				assigned_fifos=$((assigned_fifos|shift_res))
			fi
		else
			[ "$fifo_name" = "WaveMacFifo" ] && i=1
			[ "$fifo_name" = "WaveRxHandlerRiscFifo" ] && i=4
		fi
		i=$((i+1))
	done

	assigned_fifos=`printf '0x%04x' "$assigned_fifos"`
	echo "$assigned_fifos"
}

# Get the assigned FIFOs for a stream and return hexadecimal representation of it.
# the naming are drived from VLSI so without number this is band0 (wlan0)e.g:WaveMacFifo,
# with 1 it is band1 e.g:WaveMac1Fifo (wlan2).
get_assigned_fifos_gen6()
{
	# Define local parameters
	local stream_id interface_index assigned_fifos i fifo_enabled shift_res

	echo "Logger:get_assigned_fifos gen6" $TRACE_OUT

	stream_id=$1
	interface_index=$2

	## in the DB in order keep gen5 as is ,WaveMacFifo is for band1 and WaveMac1Fifo for band2
	## same goes for all. below param are according to the system defenition.

	fifos_names="WaveMacFifo
	WaveMac1Fifo
	WaveHostIfFifo
	WaveRxHandlerRiscFifo
	WaveSenderFifoEnable
	WavePhyGenriscFifo
	WavePhyHW
	WaveHwFifo1
	WaveHwFifo2
	WaveHwFifo3
	WaveHwFifo4
	WaveHwFifo5
	WaveHwFifo6
	WaveHwFifo7
	WaveHwFifo8
	WaveHwFifo9
	WaveHwFifo10
	WaveHwFifo11
	WaveHwFifo12
	WaveHwFifo13
	WaveHwFifo14
	WaveHwFifo15
	WaveHwFifo16
	WaveLowerMac2Fifo
	WaveRxHandlerRisc1Fifo
	WaveSender1FifoEnable
	WavePhyGenrisc1Fifo
	WavePhy1HW"

	assigned_fifos=0
	i=0
	## Go over the FIFOs and for each FIFO check if it is assigned to the stream_id
	for fifo_name in $fifos_names
	do

		fifo_enabled=`db2fapi_convert boolean $fifo_name $interface_index`

		if [ "$fifo_enabled" = "1" ]
		then
			echo "Logger:$fifo_name is Enabled" >$TRACE_OUT
			shift_res=$((1<<i))
			assigned_fifos=$((assigned_fifos|shift_res))
		else
			echo "Logger:$fifo_name is disabled" >$TRACE_OUT
		fi
		i=$((i+1))
	done

	assigned_fifos=`printf '0x%04x' "$assigned_fifos"`

	echo "Logger: assigned_fifos final bits: $assigned_fifos" > $TRACE_OUT
	echo "$assigned_fifos"
}


# Find the destination MAC of a given IP and set the value to DB.
# Return the MAC found.
set_destination_mac()
{
	# Define local parameters
	local stream_id dest_ping component_name radio_index_stream interface_index interface_type_param interface_type \
	dest_gw_ip_param dest_mac dest_mac_param object_name bridge_name

	stream_id=$1
	dest_ping=$2
	component_name=$3
	radio_index_stream=$4
	interface_index=$5

	# For LAN, ping to the destination IP to find its MAC.
	# For WAN, get the GW MAC from the user

	# Read the interface type
	eval interface_type_param=Wave${component_name}RemoteInterface
	interface_type=`db2fapi_convert regular $interface_type_param $interface_index`

	if [ "$interface_type" = "WAN" ]
	then
		eval dest_gw_ip_param=Wave${component_name}GwIp
		dest_ping=`db2fapi_convert regular $dest_gw_ip_param $interface_index`
	fi

	# Ping for 2 seconds to the requested IP address
	ping $dest_ping -w 2 > /dev/null

	local_db_source RADIO
	bridge_name=`db2fapi_convert regular WaveLoggerBridgeName $interface_index`

	[ -f ${RDKBOS_WIFI_UTIL} ] && bridge_name="brlan0"

	# Get the MAC address from the arp table only for br-lan

	dest_mac=`cat /proc/net/arp | grep -w $dest_ping | grep $bridge_name | awk '{print $4}'`

	# Save the MAC to the DB
	eval dest_mac_param=Wave${component_name}DestinationMacAddress
	case $component_name in
		"Fw") object_name="$RADIO_VENDOR_FW_LOGGER_OBJECT";;
		"Driver") object_name="$RADIO_VENDOR_DRIVER_LOGGER_OBJECT";;
		"Configuration") object_name="$RADIO_VENDOR_CONFIGURATION_LOGGER_OBJECT";;
		"Hostapd") object_name="$RADIO_VENDOR_HOSTAPD_LOGGER_OBJECT";;
	esac
	update_conf_out "Object_${radio_index_stream}" "${object_name}"
	update_conf_out "${dest_mac_param}_${radio_index_stream}" "$dest_mac"

	# Return the destination MAC
	echo "$dest_mac"
}

add_route_command()
{
	# Define local parameters
	local component_name destination_conf interface_index pid interface_name \
	dest_gw_ip_param dest_gw_ip

	component_name=$1
	destination_conf=$2
	interface_index=$3
	pid=$4
	interface_name=$5

	eval dest_gw_ip_param=Wave${component_name}GwIp
	dest_gw_ip=`db2fapi_convert regular $dest_gw_ip_param $interface_index`
	set_conf_param $destination_conf route otf $pid $interface_name add "default gw $dest_gw_ip"
}
LIB_LOGGER_SOURCED="1"
