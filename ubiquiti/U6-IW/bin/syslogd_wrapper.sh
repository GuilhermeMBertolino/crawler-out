#!/bin/sh
CFGFILE=/var/run/syslogd_args.conf
if [ -f ${CFGFILE} ] ; then
	exec /sbin/syslogd $(cat ${CFGFILE})
else
	exec /sbin/syslogd
fi
