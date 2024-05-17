#!/bin/sh

#############################################################################
#usage:
#	chk_qq_del.sh  type qq_id 
#############################################################################
ECHO=/bin/echo
TYPE=$1
DQQ_ID=$2
CFGFILE=/root/chk_${TYPE}_tid.cfg
TEMPFILE=/root/chk_${TYPE}_tid.cfg$$

if [ -f "$CFGFILE" ]; then   
 while read LINE
 do
		QQ_ID=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
   if [ "$QQ_ID" = "$DQQ_ID" ]; then
			if [ "$TID" = "NOT" ]; then
						wys lvrule hbmd  "$TYPE"  del  "$QQ_ID"				
			else
		  	    timer_del.sh $TID
		  	    wys lvrule hbmd  "$TYPE"  del  "$QQ_ID"	  			
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
