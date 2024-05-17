#!/bin/sh

#send signal1 to aws-iot
RAE_DIR=/tmp/
TRI_RAW_FILE=/tmp/router-analytics/trigger_data/raw_data
enable_ra=`/bin/config get agree_collect_TC`
if [ "$enable_ra" == "0" ]; then
	exit
fi

case "$1" in
	"all")
		/usr/sbin/data_collector all
		mv $RAE_DIR/aws_json_all $TRI_RAW_FILE
	;;	#Daily Updates
	"eventtype5")
		/usr/sbin/data_collector eventtype5
		mv $RAE_DIR/aws_json_eventtype5 $TRI_RAW_FILE
	;;	#internet disconnect
	"eventtype7")
		/usr/sbin/data_collector eventtype7
		mv $RAE_DIR/aws_json_eventtype7 $TRI_RAW_FILE
	;;	#ssorap login event
esac

