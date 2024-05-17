#!/bin/sh

#############################################################################
#usage:
#	timer_add.sh name tm fun
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/timer_jg.cfg
TEMPFILE=/root/timer_jg.cfg$$

NAME=$1
TM=$2
FUN=$3

jg_del.sh  $NAME

if [ -f "$CFGFILE" ]; then

	while read LINE
	do
		TTT=`echo "$LINE" | cut -f1 -d'='`
		if [ "$TTT" = "ID" ]; then
			#ID=`echo "$LINE" | cut -f2 -d'='`
			ID=`sed -n '$p' $CFGFILE | cut -f1 -d'='`
			ID=${ID#*d}
			let "NEWID=$ID + 1"
			echo "ID=$NEWID" >>$TEMPFILE
		else
			echo "$LINE" >>$TEMPFILE
		fi
	done <$CFGFILE

	echo "d$NEWID=$NAME;$TM;$FUN" >>$TEMPFILE

	mv -f $TEMPFILE $CFGFILE

else

	NEWID=10
	echo "ID=$NEWID" > $CFGFILE
	echo "d$NEWID=$NAME;$TM;$FUN" >>$CFGFILE

fi

killall -SIGPIPE jhltmg

exit $NEWID
