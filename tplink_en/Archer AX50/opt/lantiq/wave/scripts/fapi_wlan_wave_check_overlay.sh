#!/bin/sh

script_name="$0"

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh

no_sleep=$1

# Find the interface index of wlan0
interface_index=`find_index_from_interface_name wlan0`

verify_versions()
{
	# Define local parameters
	local driver_drv_version driver_fw_version driver_prog_gen4_version driver_prog_gen5_version ugw_drv_version ugw_fw_version ugw_prog_gen4_version ugw_prog_gen5_version \
	var1 var2 var3 var4 var5 var6 var7 var8 component progmodel_name different_versions drv_rel_6
	
	# Read information of physical Wlan interface from fapi_wlan_wave_discover output
	. ${TEMP_DIR}/fapi_wlan_wave_discover.txt

	# Read the values from the /proc
	while read var1 var2 var3 var4 var5 var6 var7 var8
	do
		case "$var1" in
			"Driver")
				component="driver"
				continue
				;;
			"MAC/PHY")
				component="fw"
				continue
				;;
			"ProgModel:")
				# Check if it's Gen5 or Gen4 progmodel
				progmodel_name=$var2
				progmodel_name=${progmodel_name:10:4}
				if [ "$progmodel_name" = "gen4" ]
				then
					component="progmodel-gen4"
				elif [ "$progmodel_name" = "gen5" ]
				then
					component="progmodel-gen5"
				fi
				;;
		esac
		
		case "$component" in
			"driver")
				# Driver veriosn in proc is in the format of: A.B.C.D.E.exported.HASH. Comparing the hash value.
				driver_drv_version="$var1"
				drv_rel_6=`echo $driver_drv_version | grep -c REL_6`

				if [ $drv_rel_6 -ge 1 ]; then
					driver_drv_version=${driver_drv_version##*-}
					driver_drv_version=${driver_drv_version%%.release*}
					driver_drv_version=${driver_drv_version/[a-z]/}
					driver_drv_version=${driver_drv_version/[A-Z]/}
				else
					driver_drv_version=${driver_drv_version##*exported.}
					driver_drv_version=${driver_drv_version%%.*}
				fi
				component=""
				;;
			"fw")
				driver_fw_version="$var8"
				driver_fw_version=${driver_fw_version##*version number: }
				driver_fw_version=${driver_fw_version%% *}
				component=""
				;;
			"progmodel-gen4")
				driver_prog_gen4_version="$var4"
				component=""
				;;
			"progmodel-gen5")
				driver_prog_gen5_version="$var4"
				component=""
				;;
		esac
	done < /proc/net/mtlk/version
	
	# Read the values from /etc/wave_components.ver
	ugw_drv_version=${wave_driver_ver##*.}
	ugw_fw_version=$wave_mac_ver
	ugw_prog_gen4_version=$wave_ar10_progmodel_ver
	ugw_prog_gen5_version=$wave500_progmodel_ver
	# If AHB disabled, Gen4 progmodel won't appear in driver output, so nothing to compare
	if [ "$AHB_WLAN_COUNT" = "0" ]  || [ "$AHB_DISABLED" = "1" ]
	then
		ugw_prog_gen4_version=""
	fi
	# If no Wave500 detected, Gen5 progmodel won't appear in driver output, so nothing to compare
	[ "$PCI_WLAN_COUNT" = "0" ] && ugw_prog_gen5_version=""
	
	# If an interface wasn't started well, the version in the driver is empty. Don't compare versions in such case.
	[ -z "$driver_drv_version" ] && ugw_drv_version=""
	[ -z "$driver_fw_version" ] && ugw_fw_version=""
	[ -z "$driver_prog_gen4_version" ] && ugw_prog_gen4_version=""
	[ -z "$driver_prog_gen5_version" ] && ugw_prog_gen5_version=""
	
	# Compare the versions numbers
	different_versions=""
	[ "$driver_drv_version" != "$ugw_drv_version" ] && different_versions="driver"
	[ "$driver_fw_version" != "$ugw_fw_version" ] && different_versions="${different_versions} fw"
	[ "$driver_prog_gen4_version" != "$ugw_prog_gen4_version" ] && different_versions="${different_versions} AR10-Progmodels"
	# TODO: remove comment once Gen5 progmodel version is displayed correctly in driver output
	#[ "$driver_prog_gen5_version" != "$ugw_prog_gen5_version" ] && different_versions="${different_versions} Wave500-Progmodels"
	different_versions=`echo $different_versions`
	
	if [ -n "$different_versions" ]
	then
		print2log $interface_index ATTENTION ""
		print2log $interface_index ATTENTION "##################################################################################################################"
		print2log $interface_index ATTENTION "######### $script_name: binaries version is different from expected version ###"
		print2log $interface_index ATTENTION "##################################################################################################################"
		print2log $interface_index ATTENTION "#### difference was found for: $different_versions"
		print2log $interface_index ATTENTION "##################################################################################################################"
	fi
}

# Check if the overlay folder has files in a Wave related folders:
# /opt/<vendor name>/wave/images
# /opt/<vendor name>/lib
# /opt/<vendor name>/wave/scripts
# If files exist in any of these overlay folders, show warning.
check_overlay()
{
	# Define local parameters
	local vendor_name overlay_files file

	if [ -d /opt/lantiq ]
	then
		vendor_name="lantiq"
	elif [ -d /opt/intel ]
	then
		vendor_name="intel"
	fi
	overlay_files=`find /nvram/etc/wave_overlay/ /overlay/opt/${vendor_name}/wave/images /overlay/opt/${vendor_name}/lib /overlay/opt/${vendor_name}/wave/scripts 2>/dev/null`
	if [ -n "$overlay_files" ]
	then
		print2log $interface_index ATTENTION ""
		print2log $interface_index ATTENTION "########################################################################################################"
		print2log $interface_index ATTENTION "######### $script_name: Overlay folder has leftover Wave related files ###"
		print2log $interface_index ATTENTION "########################################################################################################"
		print2log $interface_index ATTENTION "##### Files found in Overlay folder are:"
		for file in $overlay_files
		do
			print2log $interface_index ATTENTION "##### $file"
		done
		print2log $interface_index ATTENTION "########################################################################################################"
	fi
}

# Add sleep to allow prints in console to finish
[ -z "$no_sleep" ] && sleep 7
	
# Source wave_components.ver to get the UGW versions
if [ -e /etc/wave_components.ver ]
then
	. /etc/wave_components.ver
	verify_versions
else
	print2log $interface_index ATTENTION "Can't Compare Version Because wave_components.ver not found"
fi

check_overlay
