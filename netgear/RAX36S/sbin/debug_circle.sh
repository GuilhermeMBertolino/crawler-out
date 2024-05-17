#!/bin/sh
circle_version=`/usr/bin/get_circle_status circle_version`
if [ $circle_version = "2" ];then
	/usr/bin/circlectl status > /tmp/circlectl_status
	LD_LIBRARY_PATH=/usr/bin/circlev2/shares/usr/lib /usr/bin/circlev2/shares/usr/bin/dumpsm > /tmp/dumpsm_result
	cp /usr/bin/circlev2/shares/VERSION /tmp/CIRCLEAGENT_VERSION
	cp /usr/bin/circlev2/shares/usr/bin/db/DATABASE_VERSION /tmp/DATABASE_VERSION
	cd /tmp
	zip -r debug_circle.zip circle/log circlectl_status dumpsm_result aws_json_circleV2 aws_json_all CIRCLEAGENT_VERSION DATABASE_VERSION spc_loader_log
	rm /tmp/circlectl_status /tmp/CIRCLEAGENT_VERSION /tmp/DATABASE_VERSION /tmp/dumpsm_result
fi
