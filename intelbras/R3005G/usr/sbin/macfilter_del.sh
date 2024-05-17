#!/bin/sh

#############################################################################
#usage:
#	macfilterdel.sh name type
# name
#############################################################################

ECHO=/bin/echo


DNAME=$1

CFGFILE=/root/macfilter_tid.cfg
TEMPFILE=/root/macfilter_tid.cfg$$
DEL_FLAG=0

if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys macfilter del $DNAME
			else
				timer_del.sh $TID
				wys macfilter del $DNAME 	  	
			fi
			$DEL_FLAG=1
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

if [ "$DEL_FLAG" == "0" ]; then
	wys macfilter del $DNAME
fi


exit 0
