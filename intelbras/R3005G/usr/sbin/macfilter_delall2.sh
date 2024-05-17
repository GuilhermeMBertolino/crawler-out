#!/bin/sh

#############################################################################
#usage:
#	macfilterdelall.sh 
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/macfilter_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$TID" != "NOT" ]; then
            timer_del.sh $TID
	  fi
			
 done <$CFGFILE

wys macfilter delall

rm -f $CFGFILE	

fi

exit 0
