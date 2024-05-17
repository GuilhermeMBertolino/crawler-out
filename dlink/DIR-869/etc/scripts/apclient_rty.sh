#!/bin/sh
xmldbc -k "APCLIENT_RETRY"
/etc/events/SITESURVEY.sh
service PHYINF.WIFISTA-1.1 restart
service PHYINF.WIFISTA-2.1 restart
service PHYINF.WIFISTA-3.1 restart
exit 0
