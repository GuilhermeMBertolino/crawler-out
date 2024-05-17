#!/bin/sh

. /etc/wlan/wifi_conf

# collect wirless as Rax200
common_wireless_log()
{
	for wlname in ${main_ifname_list}; do
		eval echo ----------------------------------$wlname 2g_rate >>${output_file}
		eval wl -i $wlname 2g_rate 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname 5g_rate >>${output_file}
		eval wl -i $wlname 5g_rate 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname assoclist >>${output_file}
		eval wl -i $wlname assoclist 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname authe_sta_list >>${output_file}
		eval wl -i $wlname authe_sta_list 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname band >>${output_file}
		eval wl -i $wlname band 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname bs_data >>${output_file}
		eval wl -i $wlname bs_data 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname cap >>${output_file}
		eval wl -i $wlname cap 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname chan_info >>${output_file}
		eval wl -i $wlname chan_info 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname chanim_stats >>${output_file}
		eval wl -i $wlname chanim_stats 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname counters >>${output_file}
		eval wl -i $wlname counters 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dfs_status_all >>${output_file}
		eval wl -i $wlname dfs_status_all 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump ampdu >>${output_file}
		eval wl -i $wlname dump ampdu 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump amsdu >>${output_file}
		eval wl -i $wlname dump amsdu 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump d11cnts >>${output_file}
		eval wl -i $wlname dump d11cnts 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump msched >>${output_file}
		eval wl -i $wlname dump msched 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump murx >>${output_file}
		eval wl -i $wlname dump murx 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump mutx >>${output_file}
		eval wl -i $wlname dump mutx 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump perf_stats >>${output_file}
		eval wl -i $wlname dump perf_stats 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump txbf >>${output_file}
		eval wl -i $wlname dump txbf 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump txq >>${output_file}
		eval wl -i $wlname dump txq 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump umsched >>${output_file}
		eval wl -i $wlname dump umsched 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname dump wlc >>${output_file}
		eval wl -i $wlname dump wlc 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname if_counters >>${output_file}
		eval wl -i $wlname if_counters 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname interference >>${output_file}
		eval wl -i $wlname interference 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname memuse >>${output_file}
		eval wl -i $wlname memuse 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname noise >>${output_file}
		eval wl -i $wlname noise 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname nrate >>${output_file}
		eval wl -i $wlname nrate 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname phy_rssi_ant >>${output_file}
		eval wl -i $wlname phy_rssi_ant 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname phy_tempsense >>${output_file}
		eval wl -i $wlname phy_tempsense 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname pktqstats >>${output_file}
		eval wl -i $wlname pktqstats 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname rate >>${output_file}
		eval wl -i $wlname rate 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname revinfo >>${output_file}
		eval wl -i $wlname revinfo 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname scanresults >>${output_file}
		eval wl -i $wlname scanresults 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname spect >>${output_file}
		eval wl -i $wlname spect 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname status >>${output_file}
		eval wl -i $wlname status 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname ver >>${output_file}
		eval wl -i $wlname ver 1>>${output_file} 2>/dev/null
		eval echo ----------------------------------$wlname wme counters >>${output_file}
		eval wl -i $wlname wme counters 1>>${output_file} 2>/dev/null
	done
}

dni_wireless_log()
{
	echo ==================================ifconfig >>${output_file}
	ifconfig 1>>${output_file} 2>/dev/null

	echo ==================================iwconfig >>${output_file}
	iwconfig 1>>${output_file} 2>/dev/null

	echo ==================================ps hostapd >>${output_file}
	ps |grep hostapd 1>>${output_file} 2>/dev/null

	echo "==================================select hostapd conf" >>${output_file}
	for wlx in ${main_ifname_list}
	do
		echo "==========================${wlx} hostapd conf" >>${output_file}
		cat /tmp/${wlx}_hapd.conf 1>>${output_file} 2>/dev/null
	done

	# smart connect log
	echo "==================================smart_connect bsd -s" >>${output_file}
	bsd -s 1>>${output_file} 2>/dev/null

	echo "==================================select hostapd base info" >>${output_file}
	for wlx in ${main_ifname_list}
	do
		echo "==========================${wlx} he features" >>${output_file}
		wl -i ${wlx} he features 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} dfs_status_all" >>${output_file}
		wl -i ${wlx} dfs_status_all 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} dutycycle_cck" >>${output_file}
		wl -i ${wlx} dutycycle_thermal 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} thermal_throttle_features" >>${output_file}
		wl -i ${wlx} thermal_throttle_features 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} chanspecs" >>${output_file}
		wl -i ${wlx} chanspecs 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} chanspec" >>${output_file}
		wl -i ${wlx} chanspec 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} country" >>${output_file}
		wl -i ${wlx} country 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} muinfo" >>${output_file}
		wl -i ${wlx} muinfo 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} phy_ed_thresh" >>${output_file}
		wl -i ${wlx} phy_ed_thresh 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} chanim_stats" >>${output_file}
		wl -i ${wlx} chanim_stats 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} counters" >>${output_file}
		wl -i ${wlx} counters 1>>${output_file} 2>/dev/null

		echo "==========================${wlx} pktq_stats" >>${output_file}
		wl -i ${wlx} pktq_stats 1>>${output_file} 2>/dev/null
	done

	echo "==================================select hostapd stainfo" >>${output_file}
	for wlx in ${ifname_list}
	do
		echo "==========================${wlx} rate" >>${output_file}
		wl -i ${wlx} rate 1>>${output_file} 2>/dev/null
		echo "==========================${wlx} assoclist" >>${output_file}
		wl -i ${wlx} assoclist 1>>${output_file} 2>/dev/null
		echo "==========================${wlx} stainfo" >>${output_file}
		wl -i ${wlx} sta_info all 1>>${output_file} 2>/dev/null
	done

	bridge_mode=$(/bin/config get bridge_mode) 
	if [ "x$bridge_mode" = "x1" ];then
		echo "==================================select bridge mode info" >>${output_file}
		echo "==========================ps supplicant" >>${output_file}
		ps |grep supplicant 1>>${output_file} 2>/dev/null

		for wlx in ${main_ifname_list}
		do
			echo "==========================${wlx} supplicant conf" >>${output_file}
			cat /tmp/${wlx}_wpa_supplicant.conf 1>>${output_file} 2>/dev/null
		done

		echo "==========================bridge mode wlan stainfo" >>${output_file}
		wlan stainfo 1>>${output_file} 2>/dev/null
	fi

}

filesize=0
file_num=1
max_console_log_size=10485760

stress_test=$(config get stress_test)
if [ "x${stress_test}" = "x1"  ]; then
	output_file=/dev/console
else
	output_file="/tmp/wireless_log${file_num}.txt"
fi

if [ "$is_dual_band" = "0" ];then
	echo "==================================WlGetDriverCfg.sh wl2 5 nic" >>/tmp/wldrvcfg.log
	WlGetDriverCfg.sh wl2 5 nic 1>>/tmp/wldrvcfg.log 2>/dev/null
	echo "==================================WlGetDriverCfg.sh wl0 5 dhd" >>/tmp/wldrvcfg.log
	WlGetDriverCfg.sh wl0 5 dhd 1>>/tmp/wldrvcfg.log 2>/dev/null
	echo "==================================WlGetDriverCfg.sh wl1 2 nic" >>/tmp/wldrvcfg.log
	WlGetDriverCfg.sh wl1 2 nic 1>>/tmp/wldrvcfg.log 2>/dev/null
elif [ "$is_dual_band" = "1" ];then
	echo "==================================WlGetDriverCfg.sh wl0 2 nic" >>/tmp/wldrvcfg.log
	WlGetDriverCfg.sh wl0 2 nic 1>>/tmp/wldrvcfg.log 2>/dev/null
	echo "==================================WlGetDriverCfg.sh wl1 5 nic" >>/tmp/wldrvcfg.log
	WlGetDriverCfg.sh wl1 5 nic 1>>/tmp/wldrvcfg.log 2>/dev/null
fi

for wlx in ${ifname_list}
do
	wl -i ${wlx} msglevel +error +assoc 1>>${output_file} 2>/dev/null
done


while true
do
	echo "==================date: $(date -R)=================" >>${output_file}
	echo "==================date: $(date -R)=================" >>/dev/console

	common_wireless_log
	dni_wireless_log

	if [ "$is_dual_band" = "0" ];then
		echo "==================================WlGetDriverStats.sh wl0 dhd 1" >>${output_file}
		WlGetDriverStats.sh wl0 dhd 1 1>>${output_file} 2>/dev/null
		echo "==================================WlGetDriverStats.sh wl1 nic 1" >>${output_file}
		WlGetDriverStats.sh wl1 nic 1 1>>${output_file} 2>/dev/null
		echo "==================================WlGetDriverStats.sh wl2 nic 1" >>${output_file}
		WlGetDriverStats.sh wl2 nic 1 1>>${output_file} 2>/dev/null
	elif [ "$is_dual_band" = "1" ];then
		echo "==================================WlGetDriverStats.sh wl0 nic 1" >>${output_file}
		WlGetDriverStats.sh wl0 nic 1 1>>${output_file} 2>/dev/null
		echo "==================================WlGetDriverStats.sh wl1 nic 1" >>${output_file}
		WlGetDriverStats.sh wl1 nic 1 1>>${output_file} 2>/dev/null
	fi

	if [ "x${stress_test}" != "x1"  ]; then
		filesize=`ls -l ${output_file} | awk '{print $5}'`
		if [ $filesize -ge $max_console_log_size ]; then
			echo "filesize if over, change to another wireless log file"
			if [ $file_num -eq 1 ]; then
				file_num=2;
				output_file="/tmp/wireless_log${file_num}.txt"
			else
				file_num=1;
				output_file="/tmp/wireless_log${file_num}.txt"
			fi
			# Once 1 file has reached the maximum(5MB), start write to another file
			[ -f ${output_file} ] && rm -rf ${output_file}
		fi
	fi

	sleep 60
done

