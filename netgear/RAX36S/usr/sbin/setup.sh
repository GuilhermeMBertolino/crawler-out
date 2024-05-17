#!/bin/sh
cmd="$1";
[ -z "$cmd" ] && cmd="start"

# avoid to concurrency qos stop-process
curr_pid="$$"
ps |grep -v grep |grep "setup.sh"|grep -v $curr_pid > /TM/Qos_Stop_$curr_pid
if [ "X`cat /TM/Qos_Stop_$curr_pid`" != "X" ]; then
        rm /TM/Qos_Stop_$curr_pid
        first_pid=`ps |grep -v grep|grep "setup.sh"|head -1|awk '{print $1}'`
        echo "[EXIT] Happen Concurrency Process About Iqos-setup.... " > /dev/console
	    [ "X$first_pid" != "X$curr_pid" ] && exit 125
fi
rm /TM/Qos_Stop_$curr_pid
# avoid to concurrency qos stop-process

if [ "$2" == "" ]; then
	dev_wan=eth0 #broadcom flow cache speed feature work on eth0, need set this interface but no brwan for feature conflict.
else
	dev_wan="$2";
fi

dev_lan=br0
qos_wan=eth0 #broadcom flow cache speed feature work on eth0, need set this interface but no brwan for feature conflict.
qos_lan=br0
sess_num=30000
user_timeout=`expr 60 \* 60`
app_timeout=`expr 60 \* 60`

ppp_status=`cat /tmp/ppp/ppp0-status`
if [ "$ppp_status" = "1" ] ; then
	dev_wan=ppp0
	qos_wan=ppp0
fi

udb_param="dev_wan=$dev_wan"
udb_param="$udb_param dev_lan=$dev_lan"
udb_param="$udb_param qos_wan=$qos_wan"
udb_param="$udb_param qos_lan=$qos_lan"
udb_param="$udb_param sess_num=$sess_num"
udb_param="$udb_param user_timeout=$user_timeout"
udb_param="$udb_param app_timeout=$app_timeout"

TREND_TMP_PATH="/tmp/trend/"
MODULE_FOLDER="/lib/modules/`uname -r`/extra"
ORIG_WAN_FILE="/tmp/trend/orig_wan"
UDBMOD_FILE="/proc/bw_udb_mem"
APPDB_FILE="/tmp/trend/bwdpi.app.db"
idp_mod=tdts.ko
udb_mod=tdts_udb.ko
fw_mod=tdts_udbfw.ko
rule=rule.trf
agent=tdts_rule_agent
NTPCLIENT=ntpclient
NTPDATE=ntpdate
LIGHTTPD=lighttpd
lic_ctrl=gen_lic

dev=/dev/idp
dev_maj=190
dev_min=0

fwdev=/dev/idpfw
fwdev_maj=191
fwdev_min=0
skip_module=0

iqos_setup=iqos-setup.sh

[ -d "$TREND_TMP_PATH" ] || mkdir -p $TREND_TMP_PATH
echo 0 > "$TREND_TMP_PATH/dni_iqos_enable"

start() {
	# keep original wan_ifnames in $ORIG_WAN_FILE
	echo $dev_wan > $ORIG_WAN_FILE
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

	echo "Filter WAN bootp packets..."
	#chain=BWDPI_FILTER
	#iptables -t mangle -N $chain
	#iptables -t mangle -F $chain
	#iptables -t mangle -A $chain -i $dev_wan -p udp --sport 68 --dport 67 -j DROP
	#iptables -t mangle -A $chain -i $dev_wan -p udp --sport 67 --dport 68 -j DROP
	#iptables -t mangle -A PREROUTING -i $dev_wan -p udp -j $chain

      tmp_flag=`lsmod | grep tdts`
      if [ "x$tmp_flag" == "x" ]; then
	echo "Insert IDP engine..."
	insmod $MODULE_FOLDER/$idp_mod || exit -1

	echo "Insert UDB ($udb_param)..."
	insmod $MODULE_FOLDER/$udb_mod $udb_param || exit 1

	echo "Insert forward module..."
	insmod $MODULE_FOLDER/$fw_mod || exit 1
      fi	

	echo "Running rule agent to setup signature file $rule..."
	./$agent -g

	# start tcd
	if [ "$(ps | grep tcd | grep -v grep)" == "" ]; then
		if [ -x /usr/sbin/tcd_monitor.sh ]; then
			tcd_monitor.sh &
			sleep 3
		fi
	fi

	# clean cache
	if [ -x /usr/sbin/clean-cache.sh ]; then
		echo "Running clean-cache.sh..."
		clean-cache.sh > /dev/null 2>&1 &
	fi

	#fc flush
	# start iqos
	if [ -x ./$iqos_setup ]; then
		sleep 5
		./$iqos_setup restart
		sleep 60
	fi
	
	echo 1 > $TREND_TMP_PATH/dni_iqos_enable
}

stop() {
	# stop clean cache
	killall -9 clean-cache.sh

	# stop iqos
	if [ -x ./$iqos_setup ]; then
		./$iqos_setup stop
		sleep 20 # must set more than 3 seconds.
	fi
	killall -9 tcd_monitor.sh
	killall -9 tcd

	echo "Unload engine..."
	fc disable
	fc flush && sleep 3 # sleep for rmmod

      if [ "$skip_module" != "1" ]; then
	rmmod $fw_mod > /dev/null 2>&1
	rmmod $udb_mod > /dev/null 2>&1
	rmmod $idp_mod > /dev/null 2>&1
      fi	
	fc enable

	echo "Remove device nodes..."
	[ -c "$dev" ] && rm -f $dev
	[ ! -c "$dev" ] || echo "...Remove $dev failed"
	[ -c "$fwdev" ] && rm -f $fwdev
	[ ! -c "$fwdev" ] || echo "...Remove $fwdev failed"

	[ -e "$ORIG_WAN_FILE" ] && rm -f $ORIG_WAN_FILE

	sleep 3
	# Clear the conntrack entry
	#DELAY=1;
	#orig=$(cat /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_established);
	#echo "orig=$orig"
	#echo $DELAY > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_established;
	#sleep $DELAY;
}

case "$cmd" in
start)
	start
	;;
stop)
	stop
	;;
restart)
	# If dev_wan is changed, or /proc/bw_udb_mem doesn't exist, need to reload tdts moulde.
	# dev_wan is one of udb_param.
	# If tdts module is inserted, /proc/bw_udb_mem is created.
	if [ -e "$ORIG_WAN_FILE" ]; then
		orig_wan=`cat ${ORIG_WAN_FILE}`
	else
		orig_wan=none
	fi

	#if [ $dev_wan != $orig_wan ] || [ ! -e "$UDBMOD_FILE" ] || [ ! -e "$APPDB_FILE" ]; then
	if [ $dev_wan != $orig_wan ] || [ ! -e "$UDBMOD_FILE" ]; then
		echo "Need to load TDTS module..."
	else
		echo "No need to reload TDTS module..."
		skip_module=1
		#exit 0
	fi

	stop
	sleep 2
	start $dev_wan

	;;
esac;

