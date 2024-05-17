#!/bin/sh

. /etc/wlan/wifi_conf

usage()
{
	echo "Usage: $0 stop/start <board high threshold> <board low threshold> <check period>"
	echo "default: 95 92 60"
	exit
}

level_dc_set()
{
	local wlx=$1
	local dc=${2:-100}
	eval wl -i $wlx dutycycle_cck $dc
	eval wl -i $wlx dutycycle_ofdm $dc
	#thermaltool -i $wlx -set -e 1 -off0 $dc -hi0 150 -lo0 -100
	#thermaltool -i $wlx -set -e 1 -off1 $dc -hi1 150 -lo1 -100
	#thermaltool -i $wlx -set -e 1 -off2 $dc -hi2 150 -lo2 -100
	#thermaltool -i $wlx -set -e 1 -off3 $dc -hi3 150 -lo3 -100
}

thermal_check()
{
	board_hi=${1:-95}
	board_lo=${2:-92}
	delay=${3:-60}

	## If thermal_rad is no running, run it.
	rad_isup=$(ps | grep "thermal_rad" | grep -v grep)
	if [ -z "$rad_isup" ];then
		/sbin/thermal_rad &
	fi

	while [ 1 ]
	do
		temp_i2c=`i2cget -y 0 0x48 0x00`
		#temp_chip=`cat /sys/power/bpcm/select0 | awk '{print $2}'`
		t_tmp=$(( $temp_i2c & 0x80 ))

		if [ $t_tmp -gt 0  ]; then
			thermal_board=0
		else
			thermal_board=$(( $temp_i2c & 0xff ))
		fi

		cur_dc_wl0=$(wl -i wl0 dutycycle_cck 2>/dev/null | awk '{print $1}')
		cur_dc_wl1=$(wl -i wl1 dutycycle_cck 2>/dev/null | awk '{print $1}')
		if [ "$is_dual_band" = "0" ]; then
			cur_dc_wl2=$(wl -i wl2 dutycycle_cck 2>/dev/null | awk '{print $1}')
		fi

		if [ $thermal_board -le $board_lo ]; then
			for wlx in ${main_ifname_list}
			do
				eval now=\$cur_dc_$wlx
				if [ "$now" != "100" ]; then
					echo "$0 - Cur board temp is $thermal_board, Set $wlx dutycycle to 100" >/dev/console
					level_dc_set $wlx 100 
				fi
			done
		fi

		if [ $thermal_board -ge $board_hi ]; then
			for wlx in ${main_ifname_list}
			do
				eval now=\$cur_dc_$wlx
				if [ "$now" != "50" ]; then
					echo "$0 - Cur board temp is $thermal_board, Set $wlx dutycycle to 50" >/dev/console
					level_dc_set $wlx 50 
				fi
			done
		fi
		sleep $delay
	done
}

thermal_init()
{
	echo "$0 - Thermal Set ALL wifi dutycycle to 100" >/dev/console
	for wlx in ${main_ifname_list}
	do
		level_dc_set $wlx 100 
	done
}

check_start()
{
	if [ "x$1" = "x" -o "x$2" = "x" ]; then
		usage $0
		exit
	fi
	thermal_init
	thermal_check $1 $2 $3
}

check_stop()
{
	thermal_init
	#killall thermal.sh > /dev/null
	pids=`ps w|grep "thermal.sh start"|grep -v "grep"|awk -F ' ' '{print $1}'`
	for pid in $pids;do
		kill -9 $pid
	done
	killall thermal_rad
}

case "$1" in
	stop)
		check_stop
		break
	;;
	start)
		check_start $2 $3 $4
		break
	;;
	*)
		usage $0
	;;
esac
