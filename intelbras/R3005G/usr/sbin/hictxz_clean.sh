#!/bin/sh

#############################################################################
#usage:
#	hictxz_clean.sh
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/hictxz_tid.cfg



if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys ctrule del ct "$NAME"
			else
		  	timer_del.sh $TID
		  	wys ctrule del ct "$NAME" 
			fi
		
 done <$CFGFILE

rm $CFGFILE	


fi

exit 0
