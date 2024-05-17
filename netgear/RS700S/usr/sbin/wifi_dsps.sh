#!/bin/sh
#
# WiFi Deep Sleep Power Save
# wifi_dsps.sh <WiFi interface name> <power_down|power_up>
#
# Copyright (C) 2023, Broadcom. All Rights Reserved.
#
# Permission to use, copy, modify, and/or distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
# SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
# OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
# CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
#
# $Id:$
#
# <<Broadcom-WL-IPTag/Proprietary,Open:.*>>
#
#

show_help () {
	echo "Syntax: $0 <WiFi interface name> <power_down|power_up>"
	exit
}

# Help/command use error
if [[ $# -eq 1 ]] && [[ $1 == "--help" ]]; then
	show_help
	exit 0
elif [[ $# -ne 2 ]]; then
	echo "Invalid number of parameters! $#"
	show_help
	exit 0
fi

# Argument 1 is WiFi interface
# Argument 2 is operation: poweroff or poweron
ifname=$1
operation=$2

if [[ ! "$ifname" =~ "wl" ]] ; then
	show_help
	exit 0
fi

if [[ $operation != "power_up" ]] &&
   [[ $operation != "power_down" ]] ; then
	show_help
	exit 0
fi

#Script/Platform customization
#For CMWIFI platforms:
#	device tree/linux control voltage regulators
#	no user level programming required.
#For BCARouter platforms:
#	device tree/linux control voltage regulators is TBD
#	use below customization to add user level control
#	e.g.
#	4912 reworked reference -
#	gpio 5 controls pcie0
#	gpio 4 controls pcie1, pcie2
#	no gpio control/radio connected pcie3
#	Note: gpio is reserved for alternate purpose,
#	the export of gpio will fail

#__init
model=`cat /sys/firmware/devicetree/base/model`
gpio_num_pci0=NA
gpio_num_pci1=NA
gpio_num_pci2=NA
gpio_num_pci3=NA
WIFI_DSPS_INFO_FILE="/tmp/.wifi_dsps_info"
DM_DIR=/tmp/dm
if [[ $model =~ Broadcom-v8A ]]; then
	model=BCARouter
	board=`cat /sys/firmware/devicetree/base/uboot_env | grep board | cut -d= -f2`
	BRCM_PCI_DRV=bcm-pcie
elif [[ $model =~ 3390 ]]; then
	model=CMWIFI
	PS_OPTIONS="-aef"
	BRCM_PCI_DRV=brcm-pcie
	if  [ ! -e "/sys/bus/platform/drivers/${BRCM_PCI_DRV}" ] ; then
		# older 3390 releases have driver path exported as brcm-pci
		BRCM_PCI_DRV=brcm-pci
	fi
else
	#echo "Warning:model=${model}, assuming BCARouter platform"
	model=BCARouter
	BRCM_PCI_DRV=bcm-pcie
fi

function get_gpio_num()
{

	gpio=`cat /tmp/.wifi_dsps_info | grep GPIO | grep $1| cut -d= -f2`
	if [[ -z $gpio ]] ; then
		pci_bus=`ls -Ld /sys/devices/platform/*pcie/pci*/*/*/net/wl*|grep ${1} \
			| cut -d '/' -f 6 | cut -d ':' -f 1  | sed s/000//`
		if [[ -z $pci_bus ]] ; then
			gpio=NA
		elif [[ $pci_bus == "pci0" ]] ; then
			gpio=${gpio_num_pci0}
		elif [[ $pci_bus == "pci1" ]] ; then
			gpio=${gpio_num_pci1}
		elif [[ $pci_bus == "pci2" ]] ; then
			gpio=${gpio_num_pci2}
		elif [[ $pci_bus == "pci3" ]] ; then
			gpio=${gpio_num_pci3}
		fi
	fi
	echo $gpio
}

if  [ ! -e "${WIFI_DSPS_INFO_FILE}" ] ; then
	echo "model=$model" > ${WIFI_DSPS_INFO_FILE}
	wl0_gpio=$(get_gpio_num wl0)
	wl1_gpio=$(get_gpio_num wl1)
	wl2_gpio=$(get_gpio_num wl2)
	wl3_gpio=$(get_gpio_num wl3)
	# cache gpio mapping for future use
	echo "GPIO for wl0=${wl0_gpio}" >> ${WIFI_DSPS_INFO_FILE}
	echo "GPIO for wl1=${wl1_gpio}" >> ${WIFI_DSPS_INFO_FILE}
	echo "GPIO for wl2=${wl2_gpio}" >> ${WIFI_DSPS_INFO_FILE}
	echo "GPIO for wl3=${wl3_gpio}" >> ${WIFI_DSPS_INFO_FILE}
fi

WIFI_DSPS_LOCK_FILE="/tmp/.wifi_dsps_lock"
function acquire_lock() {

	while [[ -e ${WIFI_DSPS_LOCK_FILE} ]]
	do
		sleep 1
	done

	#busybox: touch <file> not available
	echo "Locking for $ifname" > ${WIFI_DSPS_LOCK_FILE}
}

function release_lock() {
	rm -f $WIFI_DSPS_LOCK_FILE
}

function get_wifirf_vreg()
{
        busid=`ls -Ld /sys/devices/platform/*pcie/pci*/*/*/net/${1} | cut -d '/' -f 6 | cut -d ':' -f 1 | sed s/pci000//g`
        echo wifirf${busid}pwr
}

function gen_wifirf_powerup_override()
{
	if [[ "$model" =~ CMWIFI ]]; then
		wifirf=$(get_wifirf_vreg $ifname)
		echo "
			if [ -e "/proc/driver/wrfpwr/cmd" ]; then
				echo regpwrcntrl ${wifirf} enable > /proc/driver/wrfpwr/cmd;
			fi;
		"
	fi
}

function gen_wifirf_powerdown_override()
{
	if [[ "$model" =~ CMWIFI ]]; then
		wifirf=$(get_wifirf_vreg $ifname)
		echo "
			if [ -e "/proc/driver/wrfpwr/cmd" ]; then
				echo regpwrcntrl ${wifirf} disable > /proc/driver/wrfpwr/cmd;
			fi;
		"
	fi
}

get_pcie_devaddr()
{
	devaddr=`ls -Ld /sys/devices/platform/*pcie/pci*/*/*/net/${1} | cut -d '/' -f 5`
	echo $devaddr
}

function gen_gpio_powerup_override()
{
	if [[ "$model" =~ BCARouter ]]; then
		gpio_num=$(get_gpio_num $1)
		if [[ $gpio_num != "NA" ]]; then
			echo "
				if [ -e "/sys/class/gpio/gpio${gpio_num}/value" ]; then
					echo 1 >  /sys/class/gpio/gpio${gpio_num}/value;
				fi;
			"
		fi
	fi
}

function gen_gpio_powerdown_override()
{
	gpio_num=$(get_gpio_num $1)
	COND="[[ TRUE ]] "
	if [[ "$model" =~ BCARouter ]] &&
	   [[ $gpio_num != "NA" ]]; then
		if  [[ "$gpio_num" == $(get_gpio_num "wl0") ]]; then
			COND=" ${COND} && [[ -e /tmp/wifi_dsps_wl0.powerdown ]]"
		fi
		if  [[ "${gpio_num}" == $(get_gpio_num "wl1") ]]; then
			COND="${COND} && [[ -e /tmp/wifi_dsps_wl1.powerdown ]] "
		fi
		if  [[ "${gpio_num}" == $(get_gpio_num "wl2") ]]; then
			COND="${COND}  && [[ -e /tmp/wifi_dsps_wl2.powerdown ]]"
		fi
		echo "
			if ${COND} ; then
				echo ${gpio_num} > /sys/class/gpio/export;
				if [ -e "/sys/class/gpio/gpio${gpio_num}/value" ]; then
					echo out > /sys/class/gpio/gpio${gpio_num}/direction;
					echo 0 >  /sys/class/gpio/gpio${gpio_num}/value;
				fi
			fi;
		"
	fi
}
function get_hostapd_pid()
{
        ifname=$1
        for pid in `pidof hostapd`;
        do
                match=`cat /proc/${pid}/cmdline  | awk '{printf $1 " " }'|grep $ifname;`
                if [[ ! -z "${match}" ]] ; then
                        echo $pid
                fi
        done
}

function gen_powerup_script()
{
	ifname=$1
	pid_hostapd=$(get_hostapd_pid ${ifname})
	if [[ ! -z ${pid_hostapd} ]]; then
		cmd_hostapd=`cat /proc/${pid_hostapd}/cmdline  | awk '{printf $1 " " }';`
	fi
	devaddr_node=$(get_pcie_devaddr $ifname)
	gen_gpio_powerup_override $ifname
	gen_wifirf_powerup_override $ifname
	echo "
		echo ${devaddr_node} > /sys/bus/platform/drivers/${BRCM_PCI_DRV}/bind;
		wlconf ${ifname} up;
	"
	# bring up interface manually in some cases, e.g dfs fixed channel case
	echo "
		[[ -z \$(brctl show|grep ${ifname}) ]] && sleep 1;
		[[ -z \$(brctl show|grep ${ifname}) ]] && ifconfig ${ifname} up && sleep 1;
	"
	if [[ ! -z "${cmd_hostapd}" ]]; then
		echo "hostapd_cli -i ${ifname} enable;"
	fi

	pid_acsd2=`pidof acsd2`
	if [[ ! -z ${pid_acsd2} ]] ; then
		acs_cli_mode=`acs_cli2 -i ${ifname} mode|sed s/\:.*//`;
		echo "
			acs_cli2 -i ${ifname} mode ${acs_cli_mode};
			acs_cli2 -i ${ifname} acs_restart;
		"
	fi
	pid_escand=`pidof escand`
	if [[ ! -z ${pid_escand} ]] ; then
		es_cli_mode=`es -i ${ifname} mode|sed s/\:.*//`;
		echo "es -i ${ifname} mode ${es_cli_mode}";
	fi
}

function gen_powerdown_script()
{
	ifname=$1
	wlif_list=`ifconfig -a  | grep wl | awk '{print $1}' | grep ${ifname}`
	pid_hostapd=$(get_hostapd_pid ${ifname})
	pid_acsd2=`pidof acsd2`
	pid_escand=`pidof escand`
	devaddr_node=$(get_pcie_devaddr $ifname)
	[[ ! -z ${pid_acsd2} ]] && echo "acs_cli2 -i ${ifname} mode 0;"
	[[ ! -z ${pid_escand} ]] && echo "es -i ${ifname} mode 0;"
	echo "
		wlconf ${ifname} down;
		for wlif in ${wlif_list}; do ifconfig \${wlif} down; done;
	"
	if [[ ! -z ${pid_hostapd} ]]; then
		if [[ -e ${DM_DIR}/${pid_hostapd} ]]; then
			rm -f ${DM_DIR}/${pid_hostapd}
		fi
		echo "hostapd_cli -i ${ifname} disable;"
	fi
	echo "
		echo ${devaddr_node} > /sys/bus/platform/drivers/${BRCM_PCI_DRV}/unbind;
	"
	gen_gpio_powerdown_override $ifname
	gen_wifirf_powerdown_override $ifname
}
#Locking:
# 1. Global lock for any power state operation across any device
#Status:
# 1. Existence of /tmp/wifi_dsps_${ifname}.powerdown indicates power down requested
# 2. Existence of /tmp/wifi_dsps_${ifname}.powerup indicates device in power down state
# 3. Removal of /tmp/wifi_dsps_${ifname}.powerdown indicates power up requested
# 4. Removal of /tmp/wifi_dsps_${ifname}.powerup indicates device powered up

#Start operation
acquire_lock;

	if [[ $operation == "power_down" ]]; then
		if [ -e "/tmp/wifi_dsps_${ifname}.powerdown" ]; then
			echo "Radio $ifname already in power down state"
			release_lock;
			exit 0;
		fi
	elif [[ $operation == "power_up" ]]; then
		if [ ! -f "/tmp/wifi_dsps_${ifname}.powerup" ]; then
			echo "Radio $ifname already in power up state"
			release_lock;
			exit 0;
		fi
	fi

	if [[ $operation == "power_down" ]]; then
		# check if device is registered with pcie subsystem */
		devaddr=`ls -Ld /sys/devices/platform/*pcie/pci*/*/*/net/${1} | cut -d '/' -f 5 | cut -d '.' -f 1`
		if [[ -z $devaddr ]] ; then
			echo "Radio $ifname not initialized"
			release_lock;
			exit 0;
		fi

		powerup_cmd_seq=$(gen_powerup_script $ifname)
		powerdown_cmd_seq=$(gen_powerdown_script $ifname)
		#gen script : device is transitioning to powerdown
		echo ${powerdown_cmd_seq} >> /tmp/wifi_dsps_${ifname}.powerdown
		#execute script: transition to power down state
		sh ${DEBUG_SCR} /tmp/wifi_dsps_${ifname}.powerdown
		#gen script: device in power down
		echo ${powerup_cmd_seq} >> /tmp/wifi_dsps_${ifname}.powerup
	fi

	if [[ $operation == "power_up" ]]; then
		#rm script : device is transitioning to power up
		rm /tmp/wifi_dsps_${ifname}.powerdown
		#execute script: transition to power up state
		sh ${DEBUG_SCR} /tmp/wifi_dsps_${ifname}.powerup
		# wait for network interface to be registered
		while [[ -z `ls -d /sys/devices/platform/*pcie/pci*/*/*/net/${ifname} 2> /dev/null` ]]
		do
			echo "wifi_dsps.sh: interface ${ifname} not added to network stack, sleep(1)"
			sleep 1
		done
		#rm script: device powered up/configured state
		rm /tmp/wifi_dsps_${ifname}.powerup
	fi

#Operation completed
release_lock;
exit
