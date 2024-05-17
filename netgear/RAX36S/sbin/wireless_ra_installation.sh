#!/bin/sh
#wireless RA for installation

. /etc/wlan/wifi_conf
CONFIG="/bin/config"

hijack=`$CONFIG get dns_hijack`
[ "x$hijack" = "x0" ] && return 0

[ ! -d "/tmp/wireless_ra" ] && /bin/mkdir -p /tmp/wireless_ra/clients_event; /bin/mkdir -p /tmp/wireless_ra/vaps_event
FILE_PATH_CLIENT="/tmp/wireless_ra/clients_event"
FILE_PATH_VAP="/tmp/wireless_ra/vaps_event"

pre_vap_state=""
cur_vap_state=""
pre_clients_2g=""
cur_clients_2g=""
pre_clients_5gl=""
cur_clients_5gl=""
pre_clients_5gh=""
cur_clients_5gh=""

check_client_event(){
	mac_2g=$(wl -i ${mainifname_2G} status 2>/dev/null | grep BSSID | awk '{print $2}')
	mac_5gl=$(wl -i ${mainifname_5GL} status 2>/dev/null | grep BSSID | awk '{print $2}')
	channel_2g=$(wl -i ${mainifname_2G} chanspec | awk '{print $1}')
	channel_5gl=$(wl -i ${mainifname_5GL} chanspec | awk '{print $1}')
	cur_clients_2g=$(wl -i $mainifname_2G assoclist 2>/dev/null | awk '{print $2}')
	cur_clients_5gl=$(wl -i $mainifname_5GL assoclist 2>/dev/null | awk '{print $2}')
	if [ "$is_dual_band" = "0" ]; then
		mac_5gh=$(wl -i ${mainifname_5GH} status 2>/dev/null | grep BSSID | awk '{print $2}')
		channel_5gh=$(wl -i ${mainifname_5GH} chanspec | awk '{print $1}')
		cur_clients_5gh=$(wl -i $mainifname_5GH assoclist 2>/dev/null | awk '{print $2}')
	fi

	#find disconnect clients
	echo "$pre_clients_2g"|while read line;do
		[ -z "$pre_clients_2g" ] && break
		clients_state=`echo "$cur_clients_2g"|grep $line`
		if [ -z "$clients_state" ];then
			echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
			echo "EVENT:DISCONNNECTED" >> "$FILE_PATH_CLIENT/$line"
			echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
			echo "apMAC:$mac_2g" >> "$FILE_PATH_CLIENT/$line"
			echo "band:2.4G" >> "$FILE_PATH_CLIENT/$line"
			echo "channel:$channel_2g" >> "$FILE_PATH_CLIENT/$line"
			echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
			echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
			echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
			echo "nss" >> "$FILE_PATH_CLIENT/$line"
			echo "************client:$line disconnected 2.4G****************" >/dev/console
			/usr/sbin/ra_installevent  wificlientdisconnect "$FILE_PATH_CLIENT/$line"
		fi
	done
	#find disconnect clients
	echo "$pre_clients_5gl"|while read line;do
		[ -z "$pre_clients_5gl" ] && break
		clients_state=`echo "$cur_clients_5gl"|grep $line`
		if [ -z "$clients_state" ];then
			echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
			echo "EVENT:DISCONNNECTED" >> "$FILE_PATH_CLIENT/$line"
			echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
			echo "apMAC:$mac_5gl" >> "$FILE_PATH_CLIENT/$line"
			echo "band:5G" >> "$FILE_PATH_CLIENT/$line"
			echo "channel:$channel_5gl" >> "$FILE_PATH_CLIENT/$line"
			echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
			echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
			echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
			echo "nss" >> "$FILE_PATH_CLIENT/$line"
			echo "************client:$line disconnected 5G****************" >/dev/console
			/usr/sbin/ra_installevent  wificlientdisconnect "$FILE_PATH_CLIENT/$line"
		fi
	done
	if [ "$is_dual_band" = "0" ]; then
		#find disconnect clients
		echo "$pre_clients_5gh"|while read line;do
			[ -z "$pre_clients_5gh" ] && break
			clients_state=`echo "$cur_clients_5gh"|grep $line`
			if [ -z "$clients_state" ];then
				echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
				echo "EVENT:DISCONNNECTED" >> "$FILE_PATH_CLIENT/$line"
				echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
				echo "apMAC:$mac_5gh" >> "$FILE_PATH_CLIENT/$line"
				echo "band:5GH" >> "$FILE_PATH_CLIENT/$line"
				echo "channel:$channel_5gh" >> "$FILE_PATH_CLIENT/$line"
				echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
				echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
				echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
				echo "nss" >> "$FILE_PATH_CLIENT/$line"
				echo "************client:$line disconnected 5GH****************" >/dev/console
				/usr/sbin/ra_installevent  wificlientdisconnect "$FILE_PATH_CLIENT/$line"
			fi
		done
	fi

	#find connect clients
	echo "$cur_clients_2g"|while read line;do
		[ -z "$cur_clients_2g" ] && break
		clients_state=`echo "$pre_clients_2g"|grep $line`
		if [ -z "$clients_state" ];then
			echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
			echo "EVENT:CONNNECT SUCCESS" >> "$FILE_PATH_CLIENT/$line"
			echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
			echo "apMAC:$mac_2g" >> "$FILE_PATH_CLIENT/$line"
			echo "band:2.4G" >> "$FILE_PATH_CLIENT/$line"
			echo "channel:$channel_2g" >> "$FILE_PATH_CLIENT/$line"
			echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
			echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
			echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
			echo "nss" >> "$FILE_PATH_CLIENT/$line"
			echo "************client:$line connected 2.4G****************" >/dev/console
			/usr/sbin/ra_installevent  wificlientconnect "$FILE_PATH_CLIENT/$line"
		fi
	done
	#find 5GL connect clients
	echo "$cur_clients_5gl"|while read line;do
		[ -z "$cur_clients_5gl" ] && break
		clients_state=`echo "$pre_clients_5gl"|grep $line`
		if [ -z "$clients_state" ];then
			echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
			echo "EVENT:CONNNECT SUCCESS" >> "$FILE_PATH_CLIENT/$line"
			echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
			echo "apMAC:$mac_5gl" >> "$FILE_PATH_CLIENT/$line"
			echo "band:5G" >> "$FILE_PATH_CLIENT/$line"
			echo "channel:$channel_5gl" >> "$FILE_PATH_CLIENT/$line"
			echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
			echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
			echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
			echo "nss" >> "$FILE_PATH_CLIENT/$line"
			echo "************client:$line connected 5G****************" >/dev/console
			/usr/sbin/ra_installevent  wificlientconnect "$FILE_PATH_CLIENT/$line"
		fi
	done
	if [ "$is_dual_band" = "0" ]; then
		#find 5GH connect clients
		echo "$cur_clients_5gh"|while read line;do
			[ -z "$cur_clients_5gh" ] && break
			clients_state=`echo "$pre_clients_5gh"|grep $line`
			if [ -z "$clients_state" ];then
				echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
				echo "EVENT:CONNNECT SUCCESS" >> "$FILE_PATH_CLIENT/$line"
				echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
				echo "apMAC:$mac_5gh" >> "$FILE_PATH_CLIENT/$line"
				echo "band:5GH" >> "$FILE_PATH_CLIENT/$line"
				echo "channel:$channel_5gh" >> "$FILE_PATH_CLIENT/$line"
				echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
				echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
				echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
				echo "nss" >> "$FILE_PATH_CLIENT/$line"
				echo "************client:$line connected 5GH****************" >/dev/console
				/usr/sbin/ra_installevent  wificlientconnect "$FILE_PATH_CLIENT/$line"
			fi
		done
		pre_clients_5gh="$cur_clients_5gh"
	fi
	pre_clients_2g="$cur_clients_2g"
	pre_clients_5gl="$cur_clients_5gl"
}
#when vap off, client is disconnect.
check_client_event_wifi_off(){
	cur_clients_2g=""
	cur_clients_5gl=""
	cur_clients_5gh=""

	#find disconnect clients
	echo "$pre_clients_2g"|while read line;do
		[ -z "$pre_clients_2g" ] && break
		clients_state=`echo "$cur_clients_2g"|grep $line`
		if [ -z "$clients_state" ];then
			echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
			echo "EVENT:DISCONNNECTED" >> "$FILE_PATH_CLIENT/$line"
			echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
			echo "apMAC:$mac_2g" >> "$FILE_PATH_CLIENT/$line"
			echo "band:2.4G" >> "$FILE_PATH_CLIENT/$line"
			echo "channel:$channel_2g" >> "$FILE_PATH_CLIENT/$line"
			echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
			echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
			echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
			echo "nss" >> "$FILE_PATH_CLIENT/$line"
			echo "************client:$line disconnected 2.4G****************" >/dev/console
			/usr/sbin/ra_installevent  wificlientdisconnect "$FILE_PATH_CLIENT/$line"
		fi
	done
	pre_clients_2g="$cur_clients_2g"

	#find disconnect clients
	echo "$pre_clients_5gl"|while read line;do
		[ -z "$pre_clients_5gl" ] && break
		clients_state=`echo "$cur_clients_5gl"|grep $line`
		if [ -z "$clients_state" ];then
			echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
			echo "EVENT:DISCONNNECTED" >> "$FILE_PATH_CLIENT/$line"
			echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
			echo "apMAC:$mac_5gl" >> "$FILE_PATH_CLIENT/$line"
			echo "band:5G" >> "$FILE_PATH_CLIENT/$line"
			echo "channel:$channel_5gl" >> "$FILE_PATH_CLIENT/$line"
			echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
			echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
			echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
			echo "nss" >> "$FILE_PATH_CLIENT/$line"
			echo "************client:$line disconnected 5G****************" >/dev/console
			/usr/sbin/ra_installevent  wificlientdisconnect "$FILE_PATH_CLIENT/$line"
		fi
	done
	pre_clients_5gl="$cur_clients_5gl"

	if [ "$is_dual_band" = "0" ]; then
		#find disconnect clients
		echo "$pre_clients_5gh"|while read line;do
			[ -z "$pre_clients_5gh" ] && break
			clients_state=`echo "$cur_clients_5gh"|grep $line`
			if [ -z "$clients_state" ];then
				echo "timestamp:`date`" > "$FILE_PATH_CLIENT/$line"
				echo "EVENT:DISCONNNECTED" >> "$FILE_PATH_CLIENT/$line"
				echo "clientMAC:$line" >> "$FILE_PATH_CLIENT/$line"
				echo "apMAC:$mac_5gh" >> "$FILE_PATH_CLIENT/$line"
				echo "band:5GH" >> "$FILE_PATH_CLIENT/$line"
				echo "channel:$channel_5gh" >> "$FILE_PATH_CLIENT/$line"
				echo "Capability:" >> "$FILE_PATH_CLIENT/$line"
				echo "phymode:" >> "$FILE_PATH_CLIENT/$line"
				echo "KCS:" >> "$FILE_PATH_CLIENT/$line"
				echo "nss" >> "$FILE_PATH_CLIENT/$line"
				echo "************client:$line disconnected 5GH****************" >/dev/console
				/usr/sbin/ra_installevent  wificlientdisconnect "$FILE_PATH_CLIENT/$line"
			fi
		done
		pre_clients_5gh="$cur_clients_5gh"
	fi

}

check_vap_event(){
	isup_2g=$(wl -i ${mainifname_2G} status 2>/dev/null | grep BSSID | awk '{print $2}')
	isup_5gl=$(wl -i ${mainifname_5GL} status 2>/dev/null | grep BSSID | awk '{print $2}')
	if [ "$is_dual_band" = "0" ]; then
		isup_5gh=$(wl -i ${mainifname_5GH} status 2>/dev/null | grep BSSID | awk '{print $2}')
	fi

	if [ -n "$isup_2g" -a "$isup_2g" != "00:00:00:00:00:00" ] || 
		[ -n "$isup_5gl" -a "$isup_5gl" != "00:00:00:00:00:00" ] || 
		[ -n "$isup_5gh" -a "$isup_5gh" != "00:00:00:00:00:00" -a "$is_dual_band" = "0" ]; then
		cur_vap_state="on"
	else
		cur_vap_state="off"
	fi
	if [ "$pre_vap_state" != "$cur_vap_state" ];then
		if [ "$cur_vap_state" = "on" ];then
			echo "************vap on****************" >/dev/console
			/usr/sbin/ra_installevent wifion ""
		else
			echo "************vap off****************" >/dev/console
			/usr/sbin/ra_installevent wifioff ""
		fi
		pre_vap_state="$cur_vap_state"
	fi
}

while [ "x$hijack" = "x1" ];do
	check_vap_event
	if [ "x$cur_vap_state" = "xon" ];then
		check_client_event
	else
		check_client_event_wifi_off
	fi
	sleep 2
	hijack=`$CONFIG get dns_hijack`
done
echo "Exit hijack mode -> Exit wireless RA installation" >/dev/console
