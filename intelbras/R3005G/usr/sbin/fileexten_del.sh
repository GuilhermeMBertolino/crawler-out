#!/bin/sh

#############################################################################
#usage:
#	fileexten_del.sh name|act|user_id|exten|
# wys hpostfixfilter del group_id acl postfix
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/fileexten_tid.cfg
TEMPFILE=/root/fileexten_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys hpostfixfilter del "$DNAME"
			else
		  	timer_del.sh $TID
		  	wys hpostfixfilter del "$DNAME"
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
