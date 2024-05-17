#!/bin/sh

#############################################################################
#usage:
#	xwgl_ref_clean.sh
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/xwgl_ref_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$TID" = "NOT" ]; then
			wys lvrule del "$NAME"
		else
	  	timer_del.sh $TID
	  	wys lvrule del "$NAME"	  	
	  fi	
	  	 
		
		
 done <$CFGFILE

	rm -f $CFGFILE

fi
