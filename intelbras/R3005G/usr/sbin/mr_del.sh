#!/bin/sh

#############################################################################
#usage:
#	mr_del.sh name 
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/mr_tid.cfg
TEMPFILE=/root/mr_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys rule mroute del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys rule mroute del "$NAME" 
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
