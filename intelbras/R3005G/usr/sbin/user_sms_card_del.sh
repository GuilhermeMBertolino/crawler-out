#!/bin/sh

#############################################################################
#usage:
#	user_sms_card_add.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/user_sms_card_tid.cfg
TEMPFILE=/root/user_sms_card_tid.cfg$$


DNAME=$1
TYPE=$2


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
		  timer_del.sh $TID
		  wys user card set $TYPE 1
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