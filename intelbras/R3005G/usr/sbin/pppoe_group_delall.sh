#!/bin/sh

#############################################################################
#usage:
#	pppoe_group_delall.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/pppoe_group_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				echo
			else
		  	timer_del.sh $TID
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0