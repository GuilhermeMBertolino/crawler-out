#!/bin/sh

#############################################################################
#usage:
#	qos_del.sh rule_name name 
# name
#############################################################################

RULE_NAME=$1
DNAME=$2

ECHO=/bin/echo
CFGFILE=/root/qos_${RULE_NAME}_tid.cfg
TEMPFILE=/root/qos_${RULE_NAME}_tid.cfg$$




if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys qos sprule del "$RULE_NAME"  "$NAME"
			else
		  	timer_del.sh $TID
		  	wys qos sprule del "$RULE_NAME"  "$NAME"
		  fi
		else
			echo "$LINE" >>$TEMPFILE  
		fi  	
		
 done <$CFGFILE

 if [ -f "$TEMPFILE" ]; then		
	mv -f $TEMPFILE $CFGFILE
 else
	rm -f $CFGFILE	
 fi	
 
fi
exit 0
