#!/bin/sh

status="`xmldbc -g /runtime/wifi_tmpnode/state`"

if [ "$status" == "" -o "$status" == "DONE" ]; then
		xmldbc -s /runtime/wifi_tmpnode/state "DOING"
		xmldbc -X /runtime/wifi_tmpnode/sitesurvey
		iwlist ath0 scanning > /var/ssvy.txt
		iwlist ath2 scanning >> /var/ssvy.txt
		parse2db sitesurvey -f /var/ssvy.txt -s /etc/scripts/sitesurveyhlper.sh > /dev/null
		xmldbc -s /runtime/wifi_tmpnode/state "DONE"
    rm /var/ssvy.txt
fi

exit 0
