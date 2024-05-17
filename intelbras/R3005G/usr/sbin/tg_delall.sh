#!/bin/sh

#############################################################################
#usage:
#	tg_delall.sh
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/tg_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$TID" = "NOT" ]; then
			wys msg del "$NAME" 
		else
	  	timer_del.sh $TID
	  	wys msg del "$NAME" 	  	
	  fi
			
 done <$CFGFILE

rm -f $CFGFILE	

fi

exit 0

