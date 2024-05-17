#!/bin/sh

console_enable=`config get trend_micro_console_enable`
if [ "x$console_enable" = "x0" ];then
	cd /usr/sbin/
	/usr/sbin/shn_ctrl -a get_qos_dni_user_info 1>/dev/null 2>&1 &
	/usr/sbin/shn_ctrl -a get_qos_dni_app_info  1>/dev/null 2>&1 &
	cd - 1>/dev/null 2>&1
	config set trend_micro_console_enable=1
fi
