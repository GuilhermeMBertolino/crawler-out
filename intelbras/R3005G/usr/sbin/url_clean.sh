#!/bin/sh

#############################################################################
#usage:
#	url_clean.sh
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/url_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$TID" = "NOT" ]; then
			wys url del "$NAME"
		else
	  	timer_del.sh $TID
	  	wys url del "$NAME"	  	
	  fi	
	  	 
		
		
 done <$CFGFILE

	rm -f $CFGFILE

fi
