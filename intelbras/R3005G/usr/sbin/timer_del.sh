#!/bin/sh

#############################################################################
#usage:
#	timer_del.sh id
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/timer_man.cfg
TEMPFILE=/root/timer_man.cfg$$

ID=$1

if [ -f "$CFGFILE" ]; then
	while read LINE
	do
		NAME=`echo "$LINE" | cut -f1 -d'='`
		if [ "$NAME" = "d$ID" ]; then
			echo "found"
		else
			echo "$LINE" >>$TEMPFILE
		fi
	done <$CFGFILE

	if [ -f "$TEMPFILE" ]; then
		mv -f $TEMPFILE $CFGFILE
	else
		rm $CFGFILE
	fi

	killall -SIGUSR2 jhltmg

fi

exit 0
