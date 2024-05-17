#!/bin/sh

#############################################################################
#usage:
#	jg_del.sh name
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/timer_jg.cfg
TEMPFILE=/root/timer_jg.cfg$$

ID=$1

if [ -f "$CFGFILE" ]; then
	while read LINE
	do
		TTT=`echo "$LINE" | cut -f2 -d'='`
		NAME=`echo "$TTT" | cut -f1 -d';'`
		if [ "$NAME" = "$ID" ]; then
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

	killall -SIGPIPE jhltmg

fi

exit 0
