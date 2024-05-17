#!/bin/sh

#############################################################################
#usage:
#	hictxz_del.sh name
# wys ctrule del type[ct ddos] name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/hictxz_tid.cfg
TEMPFILE=/root/hictxz_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
	while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys ctrule del ct "$NAME"
			else
		  	timer_del.sh $TID
		  	wys ctrule del ct "$NAME" 
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
