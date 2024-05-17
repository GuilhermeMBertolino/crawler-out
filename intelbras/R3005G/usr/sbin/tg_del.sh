#!/bin/sh

#############################################################################
#usage:
#	tg_del.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/tg_tid.cfg
TEMPFILE=/root/tg_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys msg del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys msg del "$NAME" 
		  fi
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
