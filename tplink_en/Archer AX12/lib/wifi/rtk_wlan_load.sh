#!/bin/sh
# Realtek Wifi6 driver initilization script
# Default parameter values

# proc path of driver
drv_proc=/proc/net/rtk_wifi6
# Suffix of virtual interface:
vif_suffix=-vap
# Suffix start index
vif_start_idx=0
# Client VIF index if follows VAP's naming
client_vif_idx=
# Client interface
client_suffix=-vxd
# Show debug messages
verbose=1
# temp directory
tmp=/tmp

# Create client interface or VAPs if iw exists
create_vif()
{
	w_if=$1
	vif_name=$2

	iw ${w_if} interface add ${vif_name} type managed

	if [ -d ${drv_proc}/${vif_name} ]; then
		wifi_dbg "Interface ${vif_name} is created."
	else
		wifi_dbg "Failed to create ${vif_name}!"
	fi
}

rtk_wlan_load()
{
	if [ -f $reinit_file ]; then
		return
	fi

	if [ -f /etc/conf/compat.ko ]; then
		insmod /etc/conf/compat.ko
	fi
	if [ -f /etc/conf/cfg80211.ko ]; then
		insmod /etc/conf/cfg80211.ko
	fi

	if [ -f /etc/conf/rtl8192cd.ko ]; then
		insmod /etc/conf/rtl8192cd.ko
	fi

	if [ -f /etc/conf/rtk_wifi6.ko ]; then
		insmod /etc/conf/rtk_wifi6.ko rtw_phy_file_path=/etc/conf/ rtw_ht_enable=2 rtw_vht_enable=2 rtw_he_enable=2 rtw_drv_log_level=2 phl_log_level=2 
	fi

	if_num=1
	persist_if=0
	client_mode=0

	[ ! -f ${drv_proc}/drv_cfg ] \
		&& wifi_err "Realtek Wifi6 driver installation failed!" \
		&& exit 1

	wifi_dbg "Getting Realtek Wifi6 driver's configuration..."

	while IFS= read -r line; do
			case "$line" in
					CONFIG_RTW_PERSIST_IF*)
							persist_if=${line/CONFIG_RTW_PERSIST_IF = /} ;;
					CONFIG_RTW_CLIENT_MODE_SUPPORT*)
							client_mode=${line/CONFIG_RTW_CLIENT_MODE_SUPPORT = /} ;;
					CONFIG_IFACE_NUMBER*)
							if_num=${line/CONFIG_IFACE_NUMBER = /} ;;
			esac
	done < ${drv_proc}/drv_cfg

	# Debugging
	if [ ${verbose} -gt 0 ]; then
		echo "persist_if = ${persist_if}"
		echo "client_mode = ${client_mode}"
		echo "if_num = ${if_num}"
	fi

	vif_num=$(( if_num - 1 ))

	[ ${persist_if} -eq 0 -o ${vif_num} -eq 0 ] \
		&& wifi_err "Driver has no virtual interface(s) or VIF is not persist." \
		&& exit 0

	wifi_dbg "Realtek Wifi6 driver supports ${vif_num} virtual interfaces..."

	# Calculate number of VIFs
	vap_num=${vif_num}
	if [ ${client_mode} -ne 0 ]; then
		vap_num=$(( vap_num - 1 ))
		if [ "${client_vif_idx}" != "" ]; then
			client_suffix=${vif_suffix}${client_vif_idx}
		fi
	fi

	# Get primary interfaces created by driver for each device
	wlan_if_dir=$(cd ${drv_proc}; find -type d -maxdepth 1 )
	wlan_if_dir=${wlan_if_dir//./}

	wlan_if_list=
	for w_if in ${wlan_if_dir}; do
		if [ "${wlan_if_list}" != "" ]; then
			wlan_if_list="${wlan_if_list} ${w_if:1}"
		else
			wlan_if_list=${w_if:1}
		fi
	done

	wifi_dbg "Primary interface(s) of RTK wifi6 driver: %s\n" "${wlan_if_list}"

	# Create virtual interfaces for every primary interface
	for w_if in ${wlan_if_list}; do
		wifi_dbg "Creating $((if_num - 1)) virtual interface(s) for ${w_if} ..."

		vif_suffix_idx=${vif_start_idx}
		vif_idx=0

		# Client interface name
		client_vif_name=${w_if}${client_suffix}
		printf "Client interface is %s\n" ${client_vif_name}

		# VAP interface names
		vap_names=""
		vap_idx=0
		while [ ${vap_idx} -lt ${vap_num} ]; do
			vap_name=${w_if}${vif_suffix}${vif_suffix_idx}

			if [ "${client_vif_name}" != "${vap_name}" ]; then
				if [ "${vap_names}" == "" ]; then
					vap_names=${vap_name}
				else
					vap_names="${vap_names} ${vap_name}"
				fi
				vap_idx=$(( vap_idx + 1 ))
			fi

			vif_suffix_idx=$(( vif_suffix_idx + 1 ))
		done

		# Create virtual interfaces
		wifi_dbg "Creating VIFs %s ...\n" "${vap_names} ${client_vif_name}"

		for vif in ${vap_names} ${client_vif_name}; do
			create_vif ${w_if} ${vif}
		done
	done
}

rtk_wlan_set_mac()
{
	set_mac_foreach_vif()
	{
		local macaddr ifname

		config_get ifname $1 ifname
		config_get macaddr $1 macaddr

		ifconfig $ifname hw ether $macaddr 
	}

	config_foreach set_mac_foreach_vif wifi-iface
}

