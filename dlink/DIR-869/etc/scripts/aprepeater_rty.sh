#!/bin/sh
xmldbc -k "APCLIENT_RETRY"
/etc/events/SITESURVEY.sh
service PHYINF.WIFI-REPEATER restart
exit 0
