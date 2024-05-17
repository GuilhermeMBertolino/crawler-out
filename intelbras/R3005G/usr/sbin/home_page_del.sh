#!/bin/sh

#############################################################################
#usage:
#	home_page_del.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/home_page_tid.cfg
TEMPFILE=/root/home_page_tid.cfg$$


DNAME=home_page


if [ -f "$CFGFILE" ]; then
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys home_page set "0"
			else
		  	timer_del.sh $TID
		  	wys home_page set "0"
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
