#!/bin/sh

#############################################################################
#usage:
#	mr_delall.sh 
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/mr_tid.cfg


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys rule mroute del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys rule mroute del "$NAME"
		  fi
		
 done <$CFGFILE

rm -f $CFGFILE	

fi

exit 0
