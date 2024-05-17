#!/bin/sh
# By Araujo <araujo@intelbras.com.br>
SNMPD=/bin/snmpd
PID=`ps -x | grep "snmpd" | head -n 1 | cut -f2 -dS`

/bin/snmpd &
echo "1" >/tmp/snmpd.pid

if [ `ps -x | grep "snmpd" | head -n 1 | cut -f2 -dS` = 'snmpd' ];then
	echo "PID ON"
else
	echo "PID OFF"
fi
