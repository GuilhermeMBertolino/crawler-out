#!/bin/sh

#############################################################################
#usage:
#	acc_del.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/urlrd_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys urlrd del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys urlrd del "$NAME" 
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0