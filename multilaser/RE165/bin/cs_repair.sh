#!/bin/sh

case $1 in
# PID file is abnormal,err num is 2
 2|3) 	
	case $2 in
	 \/var\/run\/lighttpd\.pid)
	 	killall lighttpd 2> /dev/null
		if [ -f "/tmp/crpc_url" ];then
			/bin/lighttpd -f /lighttp/lighttpd_crpc.conf -m /lighttp/lib/
		else	
			/bin/lighttpd -f /lighttp/lighttpd.conf -m /lighttp/lib/
		fi
	 	;;
	 	
	 \/var\/run\/dnsmasq\.pid)
	 	killall dnsmasq 2> /dev/null
		/bin/dnsmasq &
	 	;;

	\/var\/run\/cs_broker\.pid)
	 	killall cs_broker 2> /dev/null
		/bin/initcste &
	 	;;

	 \/var\/run\/cste_sub\.pid)
	 	killall cstecgi.cgi 2> /dev/null
	 	killall cste_sub 2> /dev/null
		/bin/cste_sub -h 127.0.0.1 -t totolink/router/# &
	 	;;

	 \/var\/run\/header\.pid)
	 		killall -9 header 2> /dev/null
			/bin/header &
	 	;;

	 \/var\/run\/extender\.pid)
	 		killall extender 2> /dev/null
			/bin/extender &
	 	;;

	 \/var\/run\/crond\.pid)
	 		killall crond 2> /dev/null
			/bin/crond &
	 	;;

	 \/var\/run\/crpc\.pid)
	 		killall crpc 2> /dev/null
			/bin/crpc &
	 	;;

	 \/var\/run\/csteDrvierConnMachine\.pid)
	 		killall csteDrvierConnMachine 2> /dev/null
			/bin/csteDriverConnMachine &
	 	;;
		
	 \/var\/udhcpc\/udhcpc-br0\.pid)
		killall udhcpc 2> /dev/null
		udhcpc -i br0 -p /etc/udhcpc/udhcpc-br0.pid -s /usr/share/udhcpc/br0.sh &
		;;
		
	esac
	date    >> /var/log/watchdog/2_err_repair_log
	echo $2 >> /var/log/watchdog/2_err_repair_log
	exit 0;;

	
# Our define monitor, in cs_test.sh, err num is 246
 246)
	# waitting for developing

	date    >> /var/log/watchdog/254_err_repair_log
	echo $2 >> /var/log/watchdog/254_err_repair_log
	exit 0;;
esac


exit 0
