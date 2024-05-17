#!/bin/sh

#############################################################################
#usage:
#	timer_add.sh day mtime infun outfun
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/timer_day.cfg
TEMPFILE=/root/timer_day.cfg$$

DAY=$1
MTIME=$2
INFUN=$3
OUTFUN=$4


if [ -f "$CFGFILE" ]; then

	while read LINE
	do
		NAME=`echo "$LINE" | cut -f1 -d'='`
		if [ "$NAME" = "ID" ]; then
			#ID=`echo "$LINE" | cut -f2 -d'='`
			ID=`sed -n '$p' $CFGFILE | cut -f1 -d'='`
			ID=${ID#*d}
			let "NEWID=$ID + 1"
			echo "ID=$NEWID" >>$TEMPFILE
		else
			echo "$LINE" >>$TEMPFILE
		fi
	done <$CFGFILE

	echo "d$NEWID=$DAY;$MTIME;$INFUN;$OUTFUN" >>$TEMPFILE

	mv -f $TEMPFILE $CFGFILE

else

	NEWID=10
	echo "ID=$NEWID" > $CFGFILE
	echo "d$NEWID=$DAY;$MTIME;$INFUN;$OUTFUN" >>$CFGFILE

fi

killall -SIGUSR1 jhltmg

exit $NEWID
