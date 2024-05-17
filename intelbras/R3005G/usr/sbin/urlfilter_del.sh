#!/bin/sh

#############################################################################
#usage:
#	urlfilter_del.sh
# name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/urlfilter_tid.cfg
TEMPFILE=/root/urlfilter_tid.cfg$$


DNAME=$1


if [ -f "$CFGFILE" ]; then
DEL_TIMEFILE=0
 while read LINE
 do
 
		NAME=`echo "$LINE" | cut -f1 -d'='`
		VALUE=`echo "$LINE" | cut -f2 -d'='`
		TID=`echo "$VALUE" | cut -f1 -d';'`
		
		if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys urlfilter del "$NAME"
			else
		  	timer_del.sh $TID
		  	wys urlfilter del "$NAME" 
		  	DEL_TIMEFILE=1
				TIME_NAME=`echo "$VALUE" | cut -f2 -d';'`
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

 if [ "$DEL_TIMEFILE" = "1" ]; then
 		TIMEFILE=/root/time_group/time_${TIME_NAME}.cfg	
 		TEMP_TIMEFILE=/root/time_group/time_${TIME_NAME}.cfg$$
 		if [ -f "$TIMEFILE" ]; then
 			 while read LINE
			 do
			 
					TIMENAME=`echo "$LINE" | cut -f1 -d'='`
					
					if [ "$TIMENAME" = "urlfilter_$NAME" ]; then
						echo "fond"
					else	
						echo "$LINE" >>$TEMP_TIMEFILE  
					fi  	
					
			 done <$TIMEFILE
			  if [ -f "$TEMP_TIMEFILE" ]; then		
					mv -f $TEMP_TIMEFILE $TIMEFILE
				else
					rm 	$TIMEFILE
			 fi
 		fi
 fi
fi

exit 0
