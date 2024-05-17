#!/bin/sh

date >> /tmp/mailreport_schedule.log

echo "start run mail report ....." 

echo "mail report schedule on" >> /tmp/mailreport_schedule.log

if [ -f /bin/rex_maillog ]; then
	rex_maillog -l
fi

if [ -f /bin/rex_maillog ] && [ -f /var/logmailcmd.sh ]; then
	rex_maillog -c
fi

if [ -f /var/log/rexlog ]; then
	dd if=/dev/null of=/var/log/rexlog
fi
