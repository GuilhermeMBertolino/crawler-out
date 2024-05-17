#!/bin/sh

#############################################################################
#usage:
#	fileexten_delall_shibie.sh 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/fileexten_tid.cfg



if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys hpostfixfilter del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys hpostfixfilter del "$NAME" 
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0
