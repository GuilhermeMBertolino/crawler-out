#!/bin/sh
# Library script for recovery functions.

script_name="$0"

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh

# Get free mem, including memory freeable from buffers
get_total_free_mem()
{
	sync
	cat /proc/meminfo | awk 'BEGIN {total=0} { \
	if ($1 == "MemFree:") { total += $2}; if ($1 == "Buffers:") {total += $2}  } \
	END {print total}'
}

# Return 0 if enough free memory available to save dump
fw_dumps_validate_memory()
{
	# Define local parameters
	local min_free_mem_kb ret free_mem free_mem_sync interface_index
	interface_index=$1
	
	min_free_mem_kb=$2
	
	ret=0
	free_mem=`cat /proc/meminfo | grep MemFree | awk '{print $2}'`
	if [ $free_mem -lt $min_free_mem_kb ]
	then
		# Validate also after sync:
		free_mem_sync=`get_total_free_mem`
		print2log $interface_index NOTIFY "memory after sync = $free_mem_sync (before=$free_mem)"
		[ $free_mem_sync -lt $min_free_mem_kb ] && ret=1
	fi
	echo $ret
}

# $1 = folder (/tmp/wave_tmp or /root/mtlk)
# $2 = max dumps to save
# Check if max number of dumps reached and if so, delete the oldest dump file.
fw_dumps_prepare_folder()
{
	# Define local parameters
	local folder max_dumps exist_num_dumps oldest_dump

	folder=$1
	max_dumps=$2

	exist_num_dumps=`ls $folder/ | grep -c dump.tar`
	while [ $exist_num_dumps -ge $max_dumps ]
	do
		if [ "$max_dumps" = "1" ]
		then
			oldest_dump=`ls -tr $folder/*dump.tar | sed -n '1 p'`
		else
			oldest_dump=`ls -tr $folder/*dump.tar | sed -n '2 p'`
		fi
		rm $oldest_dump
		exist_num_dumps=`ls $folder/ | grep -c dump.tar`
	done
}

fw_dumps_colloect_and_save()
{
	# Define local parameters
	local interface_name interface_index tid wave_folder \
	dump_dir dump_files min_free_mem_kb memory_available \
	file fs_overlay overlay_mem_free tar_size i time_sec \
	dump_file fw_files_list trace_out num_of_cards card_index

	interface_name=$1

	interface_index=`find_index_from_interface_name $interface_name`
	print2log $radio_index FW_RECOVERY "handle_fw_crash - start"

	# Source to get version information:
	# TODO: Add this file to Puma
	[ -e /etc/wave_components.ver ] && . /etc/wave_components.ver 

	# Source RADIO DB
	local_db_source RADIO

	# Read needed parameters from DB
	auto_recovery_dumps_enabled=`db2fapi_convert boolean WaveAutoRecoveryDumpsEnabled $interface_index`
	recovery_num_of_dumps=`db2fapi_convert boolean WaveRecoveryNumOfDumps $interface_index`

	tid=$$

	dump_files="$interface_name"

	dump_dir=${wave_release_minor}_`date +%Y%m%dT%H%M%S`_${interface_name}_${tid}_dump

	cd $CONF_DIR

	# Minimum free memory required to save dumps
	min_free_mem_kb=`cat /proc/sys/vm/min_free_kbytes`
	min_free_mem_kb=$((min_free_mem_kb+2000))

	# Check if needed memory is available
	memory_available=`fw_dumps_validate_memory $interface_index $min_free_mem_kb`
	[ "$memory_available" = "1" ] && print2log $radio_index FW_RECOVERY "$script_name: ### No memory to save dump ### in $CONF_DIR - exit" && exit

	# Check if saving dumps is enabled
	[ "$auto_recovery_dumps_enabled" = "0" ] && print2log $radio_index FW_RECOVERY "$script_name: ### FW dumps saving is disabled ### - exit" && exit

	# If already have max dumps allowed, delete oldest to allow saving of newest
	fw_dumps_prepare_folder $CONF_DIR $recovery_num_of_dumps

	# Zip each file and zip it all together
	mkdir $dump_dir

	for file in $dump_files
	do
		fw_files_list=""
		dump_file=/proc/net/mtlk/$file/FW

		if [ "$file" = "card0" ] || [ "$file" = "card1" ]; then
			trace_out="$file/FW"

			[ -d $dump_file ] && fw_files_list=`ls -A $dump_file`
			if [ ! -z "$fw_files_list" ]; then
				echo "### Compress from $trace_out" > /dev/console
				for fw_file in $fw_files_list
				do
					fw_dump_file=/$dump_file/$fw_file
					echo "### Now Compressing: $fw_dump_file" > /dev/console
					gzip -c $fw_dump_file > $dump_dir/${fw_file}.gz
				done
			else
				echo "### FW directory $trace_out is empty ###" > /dev/console
			fi

		else
			if [ -e $dump_file ]; then
				[ -e $dump_file ] && gzip -c $dump_file > $dump_dir/${file}.gz
			else
				echo "###[  ${dump_file##*/}  ]###-> doesn't exist skip it" > /dev/console
			fi
		fi
	done
	local_db_source LOGGER_DRIVER
	driver_offline_num_cyclic_files=`db2fapi_convert regular WaveDriverOfflineNumCyclicFiles 0`
	driver_offline_files_path=`db2fapi_convert regular WaveDriverOfflineFilesPath 0`
	loop=0
	while [ $loop -lt $driver_offline_num_cyclic_files ]
	do
		dump_file="${driver_offline_files_path}${loop}"
		[ -e $dump_file ] && gzip -c $dump_file > $dump_dir/driver_logs$loop.gz
		loop=$((loop+1))
	done	
	
	tar cf ${dump_dir}.tar $dump_dir
	rm -rf $dump_dir

	# If persistent storage available: save a copy in non-volotile folder:

	# Support different persistent storage paths for UGW and Puma
	wave_folder=/opt/${vendor_name}/wave
	[ -w /nvram/etc ] && wave_folder=/nvram/etc/wave_dumps && mkdir -p $wave_folder

	# Check write permissions
	if [ -w $wave_folder ]
	then
		# If already have max dumps allowed, delete oldest to allow saving of newest
		fw_dumps_prepare_folder $wave_folder $recovery_num_of_dumps

		# Check min free memory in overlayfs before copying (and leave half spare)
		overlay_mem_free=`df | awk '/overlayfs:\/overlay/ {print $4}'`
		overlay_mem_free=$((overlay_mem_free*1024/2))
		tar_size=`ls -l ${dump_dir}.tar | awk '{print $5}'`
		if [ "$tar_size" -lt "$overlay_mem_free" ]
		then
			cp ${dump_dir}.tar $wave_folder/
		else
			# If there is not enough space to save the dump, delete another dump (if exists)
			i=$((recovery_num_of_dumps-1))
			while [ $i -gt 0 ]
			do
				fw_dumps_prepare_folder $wave_folder $i
				overlay_mem_free=`df | awk '/overlayfs:\/overlay/ {print $4}'`
				overlay_mem_free=$((overlay_mem_free*1024/2))
				[ "$tar_size" -lt "$overlay_mem_free" ] && cp ${dump_dir}.tar $wave_folder/ && break
				i=$((i-1))
			done
			if [ "$i" = "0" ]
			then
				print2log $radio_index FW_RECOVERY "$script_name: Skipping copy of ${dump_dir}.tar to $wave_folder/ due to insufficient space."
				print2log $radio_index FW_RECOVERY "$script_name: Take ${dump_dir}.tar from $CONF_DIR"
			fi
		fi
	fi

	time_sec=`awk '{print $1}' < /proc/uptime`
	print2log $radio_index FW_RECOVERY "$script_name: tid=$tid; created: ${dump_dir}.tar ($time_sec)"

}
LIB_RECOVERY_SOURCED="1"
