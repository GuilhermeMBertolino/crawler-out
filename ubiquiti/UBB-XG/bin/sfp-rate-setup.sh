#!/bin/sh

sfp_rate_ctl="/proc/net/sfp-gearbox"
default_sfp_rate=10
rate_measure_text="Gbps"
wait_process_name="vpp"

sed -e "s/vpp.sfp_speed=10000//g" -i /tmp/system.cfg

# For advanced users:
#  You can set "vpp.sfp_speed_override=auto|1000|10000" config param to force SFP+ rate
#  default value is "auto" so SFP+ driver will try to negotiate and select the proper rate
#

configured_sfp_rate=`cat /tmp/system.cfg | grep sfp_speed_override | awk -F '=' '{print $2}'`
current_sfp_rate=`cat ${sfp_rate_ctl} | head -n2 | awk '{print $4}' | awk -F 'G' '{print $1}'`

if [ -z ${configured_sfp_rate} ]; then
	configured_sfp_rate=0
fi

configured_sfp_rate=$((configured_sfp_rate/1000))

case $configured_sfp_rate in
    ''|*[!0-9]*) echo "Bad sfp_speed value in the system configuration file!"; exit 1;;
    *);;
esac

if [[ "$configured_sfp_rate" -eq "$current_sfp_rate" ]]; then
	echo "SFP+ rate is configured to "${current_sfp_rate}${rate_measure_text}
	exit 0
fi

if [[ ! ${configured_sfp_rate} -eq 0 ]]; then
	echo "Default SFP+ rate is "${default_sfp_rate}${rate_measure_text}
	echo "Current SFP+ rate is "${current_sfp_rate}${rate_measure_text}
fi

if [ "$configured_sfp_rate" -eq "0" ]; then
	echo "SFP+ is in auto-negotiation mode"
else
	echo "New SFP+ rate is "${configured_sfp_rate}${rate_measure_text}
fi

echo "Initializing network, please wait a few seconds..."

while true; do
	wait_process_cnt=`ps | grep ${wait_process_name} | grep -v grep | wc -l`

	if [[ "$wait_process_cnt" -ne "0" ]]; then
		sleep 3
		if [ "$configured_sfp_rate" -eq "0" ]; then
			echo -e "auto" > ${sfp_rate_ctl}
		else
			echo -e ${configured_sfp_rate}"G" > ${sfp_rate_ctl}
		fi
		echo -e "\nNetwork is ready. Have a nice day."
		exit 0
	fi

	sleep 1
done

exit 1
