# !/bin/sh
sleep 239
if [ -f /tmp/wps_process_state ]; then
i='/bin/cat /tmp/wps_process_state'
if [ $i == "start" ]; then
	then "echo wps pin timeout" > /dev/console
	echo 0 > /tmp/wps_process_state
fi
fi

