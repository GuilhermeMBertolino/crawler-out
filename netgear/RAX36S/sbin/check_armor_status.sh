#! /bin/sh

# [DNIRAX60-2372] Projects without procd, call bd script periodically.
# Run "/opt/bitdefender/bin/bd start" once every 30 minutes
# to check armor related daemon crash or not.

while :; do
	sleep 1800 # 30 min
	if [ -f /tmp/check_bdagent ];then
		/opt/bitdefender/bin/bd start	
	fi
done

