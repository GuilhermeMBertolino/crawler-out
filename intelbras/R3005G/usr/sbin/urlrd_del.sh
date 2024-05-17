#!/bin/sh

#############################################################################
#usage:
#	rulrd_del.sh name
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/urlrd_tid.cfg
TEMPFILE=/root/urlrd_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys urlrd del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys urlrd del "$NAME" 
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