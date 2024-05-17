#!/bin/sh
CPU_LIST=`cat /proc/interrupts | sed -n '1p'`
NUM_OF_CPU=$(echo "$CPU_LIST" | wc -w)
VAR_PREFIX="autogen"
# setup by getEthIfName/getWiFiIfName/every model
RPS_IF_LIST=""

MT7621()
{
	num_of_wifi=$1

	#Physical IRQ# setting
	eth_trx=10
	PCIe0=11
	PCIe1=31

	# Please update the CPU binding in each cases.
	# CPU#_AFFINITY="add binding irq number here"
	# CPU#_RPS="add binding interface name here"
	dbg "[MT7621]"
	if [ "$num_of_wifi" = "0" ]; then
		CPU0_AFFINITY="$eth_trx"
		CPU1_AFFINITY=""
		CPU2_AFFINITY=""
		CPU3_AFFINITY=""

		CPU0_RPS="$ethif1 $ethif2"
		CPU1_RPS="$ethif1 $ethif2"
		CPU2_RPS="$ethif1 $ethif2"
		CPU3_RPS="$ethif1 $ethif2"
	elif [ "$num_of_wifi" = "1" ]; then
                CPU0_AFFINITY=""
                CPU1_AFFINITY="$eth_trx"
                CPU2_AFFINITY="$PCIe0"
                CPU3_AFFINITY="$PCIe1"

                CPU0_RPS="$ethif1 $ethif2 $wifi1 $wifi1_apcli0"
                CPU1_RPS="$wifi1 $wifi1_apcli0"
                CPU2_RPS="$ethif1 $ethif2"
                CPU3_RPS=""
	elif [ "$num_of_wifi" = "2" ]; then
		CPU0_AFFINITY=""
		CPU1_AFFINITY="$eth_trx"
		CPU2_AFFINITY="$PCIe0"
		CPU3_AFFINITY="$PCIe1"

		CPU0_RPS="$ethif1 $ethif2 $wifi2 $wifi2_apcli0 $wifi2_prefix1 $wifi2_prefix2 $wifi2_prefix3 $wifi2_prefix4 $wifi2_prefix5 $wifi2_prefix6 $wifi2_prefix7"
		CPU1_RPS="$wifi1 $wifi1_apcli0 $wifi1_prefix1 $wifi1_prefix2 $wifi1_prefix3 $wifi1_prefix4 $wifi1_prefix5 $wifi1_prefix6 $wifi1_prefix7"
		CPU2_RPS="$ethif1 $ethif2"
		CPU3_RPS=""
	else
		dbg "MT7621 with $NUM_OF_WIFI Wi-Fi bands is not support"
	fi
}

# $1: The prefix of vifs
# $2: The number of vifs
gen_vifs_to_rps_if()
{
	if [ $# -lt 2 ]; then
		dbg "gen_vifs_to_rps_if requires 2 parameters"
		return
	fi

	vif=$1
	total=$2
	if [ -z "$vif" ]; then
		dbg "null vif"
		return
	fi

	for i in $(seq 0 1 $total); do
		eval prefix=\$$vif
		eval $vif$i=$prefix$i
		RPS_IF_LIST="$RPS_IF_LIST $prefix$i"
	done
}

get_eth_if_name()
{
	ethif1="eth0"
	ethif2="eth1"
	dbg2 "# Ethernet interface list=$ethif1 $ethif2"
	RPS_IF_LIST="$RPS_IF_LIST $ethif1 $ethif2"
}

# Try to get Wi-Fi interface name from l1profile
get_wifi_if_name()
{
	wifi1="ra0"
	wifi1_apcli="apcli"
	wifi1_prefix="ra"
	wifi2="rai0"
	wifi2_apcli="apclii"
	wifi2_prefix="rai"

	gen_vifs_to_rps_if "wifi1_prefix" 7
	gen_vifs_to_rps_if "wifi2_prefix" 7
	gen_vifs_to_rps_if "wifi1_apcli" 0
	gen_vifs_to_rps_if "wifi2_apcli" 0

	dbg2 "# Wifi list=$RPS_IF_LIST"
	scan_wifi_num
}

scan_wifi_num()
{
	NUM_OF_WIFI=0
	for wifi in $wifi1 $wifi2; do
		if [ -n "$wifi" -a -d "/sys/class/net/$wifi" ]; then
			NUM_OF_WIFI=`expr $NUM_OF_WIFI + 1`
		fi
	done
	dbg "# NUM_OF_WIFI=$NUM_OF_WIFI band(s)"
}

get_wifi_num()
{
	echo $NUM_OF_WIFI
}

setup_model()
{
	num_of_wifi=$(get_wifi_num)

	if grep -q "MediaTek MT7621" /proc/cpuinfo; then
		dbg "setup_model:MT7621 with wifi-$num_of_wifi"
		MT7621 $num_of_wifi
	fi
}

set_rps_cpu_bitmap()
{
	dbg2 "# Scan binding interfaces of each cpu"
	# suppose the value of interface_var is null or hex
	for num in $(seq 0 1 $NUM_OF_CPU); do
		cpu_bit=$((2 ** $num))
		eval rps_list=\$CPU${num}_RPS
		dbg2 "# CPU$num: rps_list=$rps_list"
		for i in $rps_list; do
			var=${VAR_PREFIX}_${i//-/_}
			eval ifval=\$$var
			dbg2 "[var val before] \$$var=$ifval"
			if [ -z "$ifval" ]; then
				eval $var=$cpu_bit
			else
				eval $var=`expr $ifval + $cpu_bit`
			fi
			eval ifval=\$$var
			dbg2 "[rps val after]$i=$ifval"
		done
	done
}

# $1: The default rps value. If rps of the interface is not setup, set $1 to it
set_rps_cpus()
{
	dbg2 "# Setup rps of the interfaces, $RPS_IF_LIST."
	for i in $RPS_IF_LIST; do
		var=${VAR_PREFIX}_${i//-/_}
		eval cpu_map=\$$var
		if [ -d /sys/class/net/$i ]; then
			if [ -n "$cpu_map" ]; then
				cpu_map=`printf '%x' $cpu_map`
				dbg "echo $cpu_map > /sys/class/net/$i/queues/rx-0/rps_cpus"
				echo $cpu_map > /sys/class/net/$i/queues/rx-0/rps_cpus
			elif [ -n "$1" ]; then
				dbg "echo $1 > /sys/class/net/$i/queues/rx-0/rps_cpus"
				echo $1 > /sys/class/net/$i/queues/rx-0/rps_cpus
			fi
		fi
	done
}

set_smp_affinity()
{
	dbg2 "# Setup affinity of each physical irq."
	for num in $(seq 0 1 $NUM_OF_CPU); do
		eval smp_list=\$CPU${num}_AFFINITY
		for irq in $smp_list; do
			cpu_bit=$((2 ** $num))
			if [ -n "$irq" ]; then
				dbg "echo $cpu_bit > /proc/irq/$irq/smp_affinity"
				echo $cpu_bit > /proc/irq/$irq/smp_affinity
			fi
		done
	done
}

if [ "$1" = "dbg" ]; then
	DBG=1
elif [ "$1" = "dbg2" ]; then
	DBG=2
else
	DBG=0
fi

# Usage: dbg "the output string"
dbg()
{
	if [ "$DBG" -ge "1" ]; then
		echo $1
	fi
}

# Usage: dbg2 "the output string"
dbg2()
{
	if [ "$DBG" -ge "2" ]; then
		echo $1
	fi
}

dbg "# RPS and AFFINITY Setting"
dbg "# NUM_OF_CPU=$NUM_OF_CPU"
get_wifi_if_name
get_eth_if_name
dbg2 "# default RPS_IF_LIST=$RPS_IF_LIST"
setup_model
set_rps_cpu_bitmap
set_rps_cpus 3
set_smp_affinity
