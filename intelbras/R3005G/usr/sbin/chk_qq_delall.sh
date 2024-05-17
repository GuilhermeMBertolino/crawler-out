#!/bin/sh

#############################################################################
#usage:
#	chk_qq_delall.sh type
# 
#############################################################################

ECHO=/bin/echo
TYPE=$1
CFGFILE=/root/chk_${TYPE}_tid.cfg

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		QQ_ID=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$TID" = "NOT" ]; then
			wys lvrule hbmd  "$TYPE"  del  "$QQ_ID"		
		else
	  	timer_del.sh $TID
			wys lvrule hbmd  "$TYPE"  del  "$QQ_ID"			  	
	  fi	
	  	 
		
		
 done <$CFGFILE

	rm -f $CFGFILE

fi
