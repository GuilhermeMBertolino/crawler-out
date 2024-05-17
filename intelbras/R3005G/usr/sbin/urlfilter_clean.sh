#!/bin/sh

#############################################################################
#usage:
#	url_clean.sh
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/urlfilter_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$TID" = "NOT" ]; then
	  		wys urlfilter del "$NAME"
		else
	  		timer_del.sh $TID
	  		wys urlfilter del "$NAME"	  	
	  fi	
		
 done <$CFGFILE

	rm -f $CFGFILE

fi
