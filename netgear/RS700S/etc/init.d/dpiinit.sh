#!/bin/sh

trap "" 2

#The following will be populated by buildFS during the make process:
KERNELVER=4.19.275

if [ ! -d /lib/modules/$KERNELVER/extra ]; then
	echo "ERROR: dpiinit.sh: /lib/modules/$KERNELVER/extra does not exist" 1>&2
fi

mknod_tm_device () {
	if [ -e /dev/idp ]; then
		return
	fi

	mknod /dev/idp c 190 0
}

load_dpi_signature () {
	mkdir -p /data/dpi
	if [ ! -e /data/dpi/rule.trf ]; then
		cp -f /etc/rule.trf /data/dpi/rule.trf
	fi

	cd /var
	rm -f bwdpi.*
	tdts_rule_agent -r /data/dpi/rule.trf -g 2>/dev/null
}

configure_dpiqos () {
	echo 1 > /proc/sys/net/netfilter/nf_conntrack_timestamp

	# While not strictly necessary, increasing rmem max allows us to better
	# handle large bursts of netlink messages from the kernel.
	echo 8388608 > /proc/sys/net/core/rmem_max
}

set_default_dq_rules () {
	if [ -e /data/dq_rules.cfg -o ! -w /data ]; then
		return
	fi

	cp /etc/dpi/default_qos_rules.cfg /data/dq_rules.cfg
}

set_default_dq_categories () {
	if [ -e /data/dq_categories.cfg -o ! -w /data ]; then
		return
	fi

	cp /etc/dpi/default_qos_categories.cfg /data/dq_categories.cfg
}

case "$1" in
	start)
		if [ ! -e /lib/modules/$KERNELVER/extra/tdts.ko ]; then
			exit 1;
		fi

		echo "Configuring DPI..."
		mknod_tm_device
		load_dpi_signature
		dpi enable

		configure_dpiqos
		set_default_dq_rules
		set_default_dq_categories
		dpid -a $2 &
		# set WRR for ETH WAN Queue
		tmctl delqcfg --devtype 0 --if eth0 --qid 7
		tmctl delqcfg --devtype 0 --if eth0 --qid 6
		tmctl delqcfg --devtype 0 --if eth0 --qid 5
		tmctl delqcfg --devtype 0 --if eth0 --qid 4
		tmctl delqcfg --devtype 0 --if eth0 --qid 3
		tmctl delqcfg --devtype 0 --if eth0 --qid 2
		tmctl delqcfg --devtype 0 --if eth0 --qid 1
		tmctl delqcfg --devtype 0 --if eth0 --qid 0
		tmctl porttminit --devtype 0 --if eth0
		tmctl setqcfg --devtype 0 --if eth0 --qid 3 --priority 0 --weight 40 --schedmode 2
		tmctl setqcfg --devtype 0 --if eth0 --qid 2 --priority 0 --weight 30 --schedmode 2
		tmctl setqcfg --devtype 0 --if eth0 --qid 1 --priority 0 --weight 20 --schedmode 2
		tmctl setqcfg --devtype 0 --if eth0 --qid 0 --priority 0 --weight 10 --schedmode 2
		;;

	reinit)
		echo "Reinitializing DPI"
		load_dpi_signature
		;;

	stop)
		killall dpid 2> /dev/null
		echo > /data/no_rules.cfg
		dpid -a $2 -r /data/no_rules.cfg &
		killall dpid 2> /dev/null
		rm -f /var/bwdpi.*
		;;

	*)
		echo "$0: unrecognized option $1"
		exit 1
		;;
esac

