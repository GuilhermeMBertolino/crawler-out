#!/bin/sh

#############################################################################
#usage:
#	wan_auto_conn_del.sh iface
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/wan_auto_conn_tid.cfg
TEMPFILE=/root/wan_auto_conn_tid.cfg$$


DNAME=iface_$1


if [ -f "$CFGFILE" ]; then
while read LINE
do
	NAME=`echo "$LINE" | cut -f1 -d'='`
	TID=`echo "$LINE" | cut -f2 -d'='`
	
	if [ "$NAME" = "$DNAME" ]; then
		timer_del.sh $TID
	else
		echo "$LINE" >>$TEMPFILE  
	fi

done <$CFGFILE

if [ -f "$TEMPFILE" ]; then
	mv -f $TEMPFILE $CFGFILE
else
	rm $CFGFILE
fi


fi

exit 0