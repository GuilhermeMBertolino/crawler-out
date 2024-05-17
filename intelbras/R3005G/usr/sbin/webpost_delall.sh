#!/bin/sh

#############################################################################
#usage:
#	webpost_delall.sh
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/webpost_tid.cfg


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys hpostforbid del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys hpostforbid del "$NAME" 
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0
