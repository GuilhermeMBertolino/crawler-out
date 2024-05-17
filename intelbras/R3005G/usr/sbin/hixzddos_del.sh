#!/bin/sh

#############################################################################
#usage:
#	hizxddos_del.sh name
# wys ctrule del type[ct ddos] name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/hizxddos_tid.cfg
TEMPFILE=/root/hizxddos_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys ctrule del ddos "$NAME"
			else
		  	timer_del.sh $TID
		  	wys ctrule del ddos "$NAME" 
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
