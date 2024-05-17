#!/bin/sh

debug_file="/data/dni/armor_debug"
#Run restore, if we have backup dir, that means router has performed upgrade and backup BD configuration to backup dir
/usr/share/armor/upgrade_bd_cfg.sh restore
/usr/share/armor/change_cloud_server.sh set_server production

chown -R root:root /opt/bitdefender/
chmod +x /opt/bitdefender/guster/scripts/*

opmode=`/bin/config get i_opmode`
if [ "$opmode" = "apmode"  -o "$opmode" = "brmode" ]; then
	exit 0
fi
#insmod armor.ko
kernel_version=`uname -a | awk -F " " '{print $3}'`
insmod /lib/modules/$kernel_version/extra/guster.ko

#Change bdlease soft link to bdlease-ng
cd /opt/bitdefender/bin/
ln -sf bdleases-ng bdleases

echo "BD agent start"
/opt/bitdefender/bin/bd start
touch /tmp/check_bdagent

/etc/init.d/ASH start
#iptables -t filter -I FORWARD -p tcp ! --sport 53 ! --dport 53 -j GUSTER

#trigger VA scan every day
LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -set-key /daemons/bdvad/va_schedule_interval -to-string 604800
#LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -set-key /daemons/bddevicediscovery/online_devices_sync_interval -to-string 90
#LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -set-key /daemons/bddevicediscovery/neigh_expiry_time -to-string 200

activation_status=`/usr/share/armor/get_armor_status activate`
if [ "$activation_status" != "true" ]; then
	LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -set-key /daemons/bdvad/first_wait -to-string 3600
fi

check_status=`/usr/share/armor/bdagent_check`

if [ "$check_status" != "0" ];then
	echo "[`date '+%Y/%m/%d %T'`][Health check] error1 !!!" >> $debug_file
	/etc/init.d/ASH stop
	rm /tmp/check_bdagent
	/opt/bitdefender/bin/bd stop
	sleep 15
	/opt/bitdefender/bin/bd start
	touch /tmp/check_bdagent
	/etc/init.d/ASH start
	check_status=`/usr/share/armor/bdagent_check`
	if [ "$check_status" != "0" ];then
		echo "[`date '+%Y/%m/%d %T'`][Health check] error2 !!!" >> $debug_file
		/etc/init.d/ASH stop
		rm /tmp/check_bdagent
		/opt/bitdefender/bin/bd stop
		sleep 15
		rm -rf /opt/bitdefender/*
		if [ ! -e "/opt/bitdefender/bitdefender-release" ]; then
			[ -e /lib/armor/phase2.tar.gz ] && tar -zxf /lib/armor/phase2.tar.gz -C /
			if [ "$?" != 0 ];then
				[ -e /lib/armor/phase2.tar.gz ] && tar -zxf /lib/armor/phase2.tar.gz -C /
			fi
			sync
			echo "[`date '+%Y/%m/%d %T'`][Health check] error2, unpack tar package" >> $debug_file
		fi

		if [ ! -e "/opt/bitdefender/bin/bdupd" ]; then
			[ -e /lib/armor/phase2-upd.tar.gz ] && tar -zxf /lib/armor/phase2-upd.tar.gz -C /opt/bitdefender
			if [ "$?" != 0 ];then
				[ -e /lib/armor/phase2-upd.tar.gz ] && tar -zxf /lib/armor/phase2-upd.tar.gz -C /opt/bitdefender
			fi
			sync
			echo "[`date '+%Y/%m/%d %T'`][Health check] error2, unpack upd-tar package" >> $debug_file
		fi
		chown -R root:root /opt/bitdefender/ 2>/dev/null
		chmod +x /opt/bitdefender/guster/scripts/*
		#Per MH request,disable bdupdater carried in BD agent, Set BD updater check interval to 14days, this requirement is from DT 2.3.0.28
		sed -ri "/check_interval/s/(check_interval=)[^ ]+/\11209600/g" /opt/bitdefender/etc/patch.server 2>/dev/null
		
		if [ ! -e "/opt/bitdefender/lib/libbdbroker.so" ]; then
 			cp /lib/libbdbroker.so /opt/bitdefender/lib
		fi
	
		if [ -e /lib/armor/phase2.tar.gz ]; then
			#if we have prebuild BD agent, directly start
			echo "[`date '+%Y/%m/%d %T'`][Health check] error2: run BD_START.sh again" >> $debug_file
			/usr/share/armor/BD_START.sh &
		elif [ -e /lib/armor/phase2-upd.tar.gz ]; then
			#If not have prebuild BD agent, call bdupd to download and start
			echo "[`date '+%Y/%m/%d %T'`][Health check] error2: run bdupd_start.sh boot" >> $debug_file
			/usr/share/armor/bdupd_start.sh boot &
		fi
		exit 0
	fi
fi

net-wall restart
#/opt/bitdefender/guster/script/create_chain.sh 0


