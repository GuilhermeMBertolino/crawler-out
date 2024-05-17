#!/bin/sh

#############################################################################
#usage:
#	usblog_del.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/usblog_tid.cfg
TEMPFILE=/root/usblog_tid.cfg$$


DNAME=usblog


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