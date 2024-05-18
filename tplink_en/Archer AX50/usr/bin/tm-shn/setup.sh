#!/bin/sh

[ "$1" != "start" -a "$1" != "stop" -a "$1" != "restart" -o -z "$2" ] && echo "Usage: setup.sh start/stop/restart wan-ifname." && exit 1

cmd="$1"
dev_wan="$2"
dev_lan=br-lan
qos_wan=eth1
qos_lan=ifb1
sess_num=40960
user_timeout=3600
app_timeout=3600

udb_param="dev_wan=$dev_wan"
udb_param="$udb_param dev_lan=$dev_lan"
udb_param="$udb_param qos_wan=$qos_wan"
udb_param="$udb_param qos_lan=$qos_lan"
udb_param="$udb_param sess_num=$sess_num"
udb_param="$udb_param user_timeout=$user_timeout"
udb_param="$udb_param app_timeout=$app_timeout"

idp_mod=tdts.ko
udb_mod=tdts_udb.ko
fw_mod=tdts_udbfw.ko
rule=rule.trf
rule_schema=rule_schema.trf
lic_ctrl=gen_lic

dev=/dev/detector
dev_maj=190
dev_min=0

fwdev=/dev/idpfw
fwdev_maj=191
fwdev_min=0

wred_setup=wred-setup.sh
iqos_setup=iqos-setup.sh

cd /tmp/tm-shn

case "$cmd" in
start)
	echo "in `pwd`"

	if [ ! -f "$rule" ]; then
		echo "Signature file $rule not found"
		exit 1
	fi

	# create dev node
	echo "Creating device nodes..."
	[ ! -c "$dev" ] && mknod $dev c $dev_maj $dev_min
	[ ! -c "$fwdev" ] && mknod $fwdev c $fwdev_maj $fwdev_min
	test -c $dev || echo "...Creat $dev failed"
	test -c $fwdev || echo "...Create $fwdev failed"

#	if [ "$(cat /proc/modules | grep pktrunner)" != "" ]; then
#		rmmod pktrunner
#	fi

	echo "Insert IDP engine..."
	insmod ./$idp_mod || exit -1

	echo "Running rule agent to setup signature file $rule..."
	LD_LIBRARY_PATH=$(pwd) ./tdts_ctrl --op signature_loadv2 -1 $rule -2 $rule_schema

	sleep 1

	echo "Insert UDB ($udb_param)..."
	insmod ./$udb_mod $udb_param || exit 1

	echo "Insert forward module..."
	insmod ./$fw_mod || exit 1

	if [ -x ./$lic_ctrl ]; then
		echo "Running license control"
		./lic-setup.sh &
		sleep 25
	fi

	# start tcd
	if [ -x ./tcd_monitor.sh ]; then
		./tcd_monitor.sh &
	fi

	# start dcd
	if [ -x ./dc_monitor.sh ]; then
		./dc_monitor.sh &
	fi
		
	# start wred
	if [ -x ./$wred_setup ]; then
		./$wred_setup &
		./wred_set_conf -f wred.conf
	fi

	# start App patrol
	LD_LIBRARY_PATH=$(pwd) ./shn_ctrl -a set_app_patrol -R ./app_patrol.conf

	# start TQ patrol
	LD_LIBRARY_PATH=$(pwd) ./shn_ctrl -a set_patrol_tq -R ./patrol_tq.conf

	echo "Pushing DEVID meta data to UDB..."
	LD_LIBRARY_PATH=$(pwd) ./shn_ctrl -a set_meta_data -R ./meta_en-US.dat

	# clean cache
	if [ -x ./clean-cache.sh ]; then
		echo "Running clean-cache.sh..."
		./clean-cache.sh > /dev/null 2>&1 &
	fi

	./shn_ctrl -a set_eula_agreed

	/usr/bin/tm_shn -t start

	;;
stop)
	# stop clean cache
	killall -9 clean-cache.sh

	killall -9 lic-setup.sh
	killall -9 $lic_ctrl	
	
	# stop iqos
	if [ -x ./$iqos_setup ]; then
		./$iqos_setup stop
	fi
	sleep 3
	killall -9 tcd_monitor.sh
	killall -9 tcd

	# stop wrs
	killall -9 wred-setup.sh
	killall -9 wred

	# stop dc
	killall -9 dc_monitor.sh
	killall -9 dcd

	echo "Unload engine..."
	rmmod $fw_mod > /dev/null 2>&1
	rmmod $udb_mod > /dev/null 2>&1
	rmmod $idp_mod > /dev/null 2>&1

	echo "Remove device nodes..."
	[ -c "$dev" ] && rm -f $dev 
	[ ! -c "$dev" ] || echo "...Remove $dev failed"
	[ -c "$fwdev" ] && rm -f $fwdev
	[ ! -c "$fwdev" ] || echo "...Remove $fwdev failed"

#	if [ "$(cat /proc/modules | grep pktrunner)" == "" ]; then
#		insmod /lib/modules/$(uname -r)/extra/pktrunner.ko
#	fi
	
	;;
restart)
	$0 stop $dev_wan
	sleep 2
	$0 start $dev_wan
	;;
esac;

