#!/bin/sh

#############################################################################
#usage:
#	qos_delall.sh 
# name
#############################################################################

RULE_NAME=$1

ECHO=/bin/echo

CFGFILE=/root/qos_${RULE_NAME}_tid.cfg
TEMPFILE=/root/qos_${RULE_NAME}_tid.cfg$$


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
			if [ "$TID" = "NOT" ]; then
				wys qos sprule del "$RULE_NAME" "$NAME"
			else
		  	timer_del.sh $TID
		  	wys qos sprule del "$RULE_NAME" "$NAME"
		  fi
		
 done <$CFGFILE

rm -f $CFGFILE	

fi

exit 0
