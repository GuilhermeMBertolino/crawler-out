#!/bin/sh

#############################################################################
#usage:
#	speed_test_del.sh name
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/speed_test_tid.cfg
TEMPFILE=/root/speed_test_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
		  	timer_del.sh $TID
		else
			echo "$LINE" >>$TEMPFILE  
		fi  	
		
 done <$CFGFILE

 if [ -f "$TEMPFILE" ]; then		
	mv -f $TEMPFILE $CFGFILE
 else
	rm $CFGFILE	
 fi	


fi

exit 0
