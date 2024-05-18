# This is the demo of wifi event handle script.
# Place it to the directory under $PATH
# It should be filled by product 
event_type=$1
STATUS_OK='0'
STATUS_FAIL='-1'

usage()
{
	echo "usage: $0 <EVENT_type> [msg]"
	echo "note: $0 should be called by wifi daemon processes"
}

if [ $# -lt 1 ]; then
	usage $0
	exit 0
fi

case $event_type in
	config_band_finished)
		ifname=$2
		status=$3
		if [ "$status" = "$STATUS_OK" ]; then
			# something to do when "wcli -c band $ifname" success
			echo "config band $ifname success"
		else
			# something to do when "wcli -c band $ifname" fail
			echo "config band $ifname fail"
		fi
		;;
	config_wifison_finished)
		status=$2
		if [ "$status" = "$STATUS_OK" ]; then
			# something to do when "wcli -c wifison" success
			echo "config wifison success"
		else
			# something to do when "wcli -c wifison" fail
			echo "config wifison fail"
		fi
		;;
	wps_status_changed)
		wps_status=$2
		ifname=$3
		# something to do when wps status changed
		case $wps_status in
			overlap)
				echo "wps overlap ($ifname)" >/dev/console
				;;
			timeout)
				echo "wps timeout ($ifname)" >/dev/console
				;;
			active)
				echo "wps pbc start ($ifname)" >/dev/console
				;;
			success)
				# call tpi_wifi_get_wps_status for ssid and password
				echo "wps success ($ifname)" >/dev/console
				;;
			fail)
				reason=$4
				echo "wps fail for reason $reason ($ifname)" >/dev/console
				;;
			*)
				echo "wps unknown status $wps_status ($ifname)" >/dev/console
				;;
		esac
		;;
	wifison_backhaul_switched)
		connected=$2
		status=$3
		if [ "$status" = "$STATUS_OK" ]; then
			# something to do when "wcli -c wifison_ethbackhaul $connected" success
			if [ "$connected" -gt 0 ]; then
				echo "switch to ethernet backhaul success"
			else
				echo "switch to wifi backhaul success"
			fi
		else
			# something to do when "wcli -c wifison_ethbackhaul $connected" fail
			if [ "$connected" -gt 0 ]; then
				echo "switch to ethernet backhaul failed"
			else
				echo "switch to wifi backhaul failed"
			fi
		fi
		;;
	group_key_update)
		mac=$2
		ifname=`ifconfig -a|grep -i $mac|awk '{print $1}'`

		# something to do when WPA group key of $ifname updated
		echo "Group key updated($ifname $mac)" >/dev/console
		;;
	*)
		echo "unknown event $event_type"
		;;
esac
