#! /bin/sh

factory_mode_flag=`/bin/config get factory_mode`
if [ "x$factory_mode_flag" = "x1" ]; then
	exit 0
fi

acl_enable=`d2 -s featurecfg[0].ACLEnable`
gui_acl=`/bin/config get enable_block_device`
if [ "$acl_enable" = "true" -a "$gui_acl" != "1" ]; then
	/bin/config set enable_block_device=1
	/bin/config commit
elif [ "$acl_enable" = "false" -a "$gui_acl" != "0" ]; then
	/bin/config set enable_block_device=0
	/bin/config commit
fi

while [ 1 ]
do
	d2 -w featurecfg[0].ACLEnable

	if [ -f "/tmp/aclenableby_guisoap" ]; then
		echo "[net-scan]Change the DAL ACLEnable by GUI or SOAP, ignore it!" > /dev/console
		rm -rf /tmp/aclenableby_guisoap
	else
		acl_enable=`d2 -s featurecfg[0].ACLEnable`
		gui_acl=`/bin/config get enable_block_device`
		acl_change=0
		if [ "$acl_enable" = "true" -a "$gui_acl" != "1" ]; then
			/bin/config set enable_block_device=1
			acl_change=1
			echo "[net-scan]The acl enable is $acl_enable, gui acl is $gui_acl, acl change is $acl_change!!!" > /dev/console
		elif [ "$acl_enable" = "false" -a "$gui_acl" != "0" ]; then
			/bin/config set enable_block_device=0
			acl_change=1
			echo "[net-scan]The acl enable is $acl_enable, gui acl is $gui_acl, acl change is $acl_change!!!" > /dev/console
		elif [ "$acl_enable" != "false" -a "$acl_enable" != "true" ]; then
			sleep 1
		fi

		if [ "$acl_change" = "1" ]; then
			/etc/init.d/acl restart > /dev/console
			/bin/config set soap_setting=AccessControl
			killall -SIGUSR1 soap_agent
			/bin/config commit
		fi
	fi
done
