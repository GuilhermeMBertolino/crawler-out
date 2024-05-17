#!/bin/sh

#############################################################################
#usage:
#	acc_delall.sh 
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/acc_tid.cfg



if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys rule acc del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys rule acc del "$NAME" 
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0
