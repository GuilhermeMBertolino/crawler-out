#!/bin/sh

#############################################################################
#usage:
#	webpost_del.sh name|act|user_id 
# wys hpostforbid del group_id acl
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/webpost_tid.cfg
TEMPFILE=/root/webpost_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys hpostforbid del "$DNAME" 
			else
		  	timer_del.sh $TID
		  	wys hpostforbid del "$DNAME" 
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
