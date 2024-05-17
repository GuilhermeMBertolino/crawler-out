while [ 1 -eq 1 ]
do
	sleep 10
	
	PID_FILE="/var/run/hostapd.pid"
	HOSTAPD_PID="0";
	if [ -e "$PID_FILE" ]; then
		HOSTAPD_PID=`cat /var/run/hostapd.pid`
	fi
	
	#ps | grep "hostapd -B" | grep -v "ps " |  grep -v "grep " | awk '{print $1}'
	
	echo "HOSTAPD_PID=$HOSTAPD_PID"
	if [ "$HOSTAPD_PID" == "0" ]; then
		hostapd -B `cat /var/tmp/hostapdcfg` &
		echo "hostapd server is die !"
	fi
done
exit 0
