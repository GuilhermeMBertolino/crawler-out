#!/bin/sh

#############################################################################
#usage:
#	pppoe_group_del.sh name
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/pppoe_group_tid.cfg
TEMPFILE=/root/pppoe_group_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				echo
			else
		  	timer_del.sh $TID
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