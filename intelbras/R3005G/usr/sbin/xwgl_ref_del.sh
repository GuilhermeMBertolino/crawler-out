#!/bin/sh

#############################################################################
#usage:
#	xwgl_ref_del.sh  name 
# name
#############################################################################
ECHO=/bin/echo
DNAME=$1
CFGFILE=/root/xwgl_ref_tid.cfg
TEMPFILE=/root/xwgl_ref_tid_.cfg$$

if [ -f "$CFGFILE" ]; then   
 while read LINE
 do
		NAME=`echo "$LINE" | cut -f1 -d'='`
		TID=`echo "$LINE" | cut -f2 -d'='`
   if [ "$NAME" = "$DNAME" ]; then
			if [ "$TID" = "NOT" ]; then
				wys lvrule  del "$NAME"
			else
		  	    timer_del.sh $TID
		  	    wys lvrule  del "$NAME"	  			
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
