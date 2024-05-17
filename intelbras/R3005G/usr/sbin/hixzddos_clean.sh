#!/bin/sh

#############################################################################
#usage:
#	hizxddos_clean.sh
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/hizxddos_tid.cfg



if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys ctrule del ddos "$NAME"
			else
		  	timer_del.sh $TID
		  	wys ctrule del ddos "$NAME" 
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0
