#!/bin/sh

#############################################################################
#usage:
#	timer_mod.sh time_name time_mem
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/timer_man.cfg
TEMPFILE=/root/timer_man.cfg$$


TIME_NAME=$1
TIME_MEM=$2

TIMEFILE=/root/time_group/time_${TIME_NAME}.cfg	
MODI_ENABLE=0

if [ -f "$TIMEFILE" ]; then
	 while read LINE
	 do
	 
			TIMENAME=`echo "$LINE" | cut -f1 -d'='`
			TID=`echo "$LINE" | cut -f2 -d'='`
			
			if [ -f "$CFGFILE" ]; then
		  	while read LINE
				do
					NAME=`echo "$LINE" | cut -f1 -d'='`
					
				  if [ "$NAME" = "d$TID" ]; then
				  	MEMBER=`echo "$LINE" | cut -f2 -d'='`
				  	INFUN=`echo "$MEMBER" | cut -f3 -d';'`
				  	OUTFUN=`echo "$MEMBER" | cut -f4 -d';'`
				  	TWDAY=`echo "$TIME_MEM" | cut -f1 -d';'`
	  				TMIN=`echo "$TIME_MEM" | cut -f2 -d';'`
	  				echo "$NAME=$TWDAY;$TMIN;$INFUN;$OUTFUN" >>$TEMPFILE
	  				MODI_ENABLE=1
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
			
	 done <$TIMEFILE
fi
 		
if [ "$MODI_ENABLE" = "1" ]; then
	killall -SIGUSR2 jhltmg
fi
exit 0
