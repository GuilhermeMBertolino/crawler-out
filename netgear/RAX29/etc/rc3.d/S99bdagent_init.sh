#!/bin/sh

# Disable Armor at PR SKU
sku=$(cat /proc/environment/sku)
if [ "$sku" = "PR" ]; then
	rm -rf /data/bitdefender
	exit 0
fi

# clear Armor task flag
rm -rf /opt/bitdefender/.stop_bd
rm -rf /opt/bitdefender/.bdupd

op_mode=$(getdb -r)
echo -e "\033[35mStarting BDAgent...\033[0m";
if [ "$op_mode" = "router" ]; then
	# Check current bdagent version is same as FW bdagent version
	# if the version is different, update it
	mkdir /tmp/bitdefender # KKHuang: If untar to /tmp directly, then premission of /tmp will be changed and cause SSH failed
	tar -xzf /etc/armor_bdagent.tar.gz -C /tmp/bitdefender
	fw_bdagent=`cat /tmp/bitdefender/opt/bitdefender/bitdefender-release | grep VERSION`
	fw_ver=$(echo $fw_bdagent | tr "=.-" " ") #split version to VERSION 2 2 65 3~61f979c75
	set -- $fw_ver
	fw_ver_sum=$(($2+$3+$4))

	if [ -f /opt/bitdefender/bitdefender-release ]; then
		cur_bdagent=`cat /opt/bitdefender/bitdefender-release | grep VERSION`
		cur_ver=$(echo $cur_bdagent | tr "=.-" " ") #split version to VERSION 2 2 65 3~61f979c75
		set -- $cur_ver
		cur_ver_sum=$(($2+$3+$4))
	else
		cur_bdagent="empty"
		cur_ver_sum=0
	fi
	echo "FW BDAgent version is $fw_bdagent, current BDAgent version is $cur_bdagent" > /dev/console

	if [ $fw_ver_sum -gt $cur_ver_sum ]; then
		echo "BDAgent version is not consist, update it..."
		# backup storage.data
		cp -f /data/bitdefender/etc/storage.data /data/storage.data

		# update the bdagent as FW version
		cp -af /tmp/bitdefender/opt/bitdefender/ /data/
		chmod +x /opt/bitdefender/guster/scripts/create_chain.sh

		mkdir -p /opt/bitdefender/lib
		sync;sleep 1

		ln -fs /lib/libbdbroker.so /opt/bitdefender/lib/libbdbroker.so
		ln -fs bdleases-ng /data/bitdefender/bin/bdleases

		# restore storage.data
		[ -f /data/storage.data ] && mv /data/storage.data /data/bitdefender/etc/storage.data

		# remove old armor bdagent install flag
		# if FW downgrade to V70 or older version, it would force update bdagent binary
		rm -f /data/bitdefender/.rax30Installed

		touch /data/bitdefender/.installed
	fi
	rm -rf /tmp/bitdefender
	sync

	# Run bdupd check-consistency befroe launch bdagent
	/usr/bin/bdupd_run.sh boot

	/etc/init.d/ASH stop

	/opt/bitdefender/bin/bd start;
	/opt/bitdefender/guster/scripts/create_chain.sh 0;
	sleep 10;
	fc flush; #clean Brcm's flow cache.

	/etc/init.d/ASH start

	/usr/bin/bd_health_check.sh boot

	# set the crond for periodic check of bdagent update
	rand=`shuf -i 0-179 -n 1`
	hour=$(($rand/60 + 1))
	min=$(($rand%60))
	echo "$min $hour * * * /usr/bin/bdupd_run.sh daily" > /var/spool/cron/crontabs/bdupd
	echo "bdupd" > /var/spool/cron/crontabs/cron.update

	# every 30min to call bd health checking script
	echo "*/30 * * * * /usr/bin/bd_health_check.sh checker" > /var/spool/cron/crontabs/bdchecker
	echo "bdchecker" > /var/spool/cron/crontabs/cron.update
fi
#case "$1" in
#	start)
#		echo "Starting CMS smd..."
#		/bin/smd
#		exit 0
#		;;
#
#	stop)
#		echo "Stopping CMS smd..."
#		/bin/send_cms_msg -r 0x1000080D 20
#		exit 0
#		;;
#
#	*)
#		echo "$0: unrecognized option $1"
#		exit 1
#		;;
#
#esac

