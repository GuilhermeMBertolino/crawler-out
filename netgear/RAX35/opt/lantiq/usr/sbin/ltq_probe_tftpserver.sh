#!/bin/sh

which ltq_probe_ftpserver.sh > /dev/null 2>&1
[ $? -eq 0 ] && { ltq_probe_ftpserver.sh $@; exit $?; }

#find some small space in ramfs, in future it should be taken form exported variable.
tempdir="$1"
timestamp="$2"
network=0
tempfile="logger$timestamp.zip"
md5file="logger$timestamp.md5"
reasonfile="logger$timestamp_fail_reason.txt"

# for each ip address found on arp table (will correspond to LAN hosts)
for i in $(cat /proc/net/arp | grep br-lan | cut -d " " -f 1); do
	ping -W2 -c 1 -q  $i 2>/dev/null

	if [ $? = "0" ]; then
		network=1
		echo "$i responded to ping, Now trying tftp transfer..!!"
		cd $tempdir
		tftp -p -l $tempfile $i
		tftp -p -l $md5file $i
		tftp -p -l $reasonfile $i

		if [ $? = "0" ]; then
			echo "Transfer Success .!! to tftp Server running @ $i"
		else
			echo "Transfer Failed..!! Since, tftp Server not running @ $i"
		fi
	fi
done
if [ "$network" -eq "0" ]; then
        echo "Network Not available ; Dumping the Log to console"
        cat /tmp/logger.txt
	if [ -e /tmp/dbfile.xml ]; then
		echo "DB file dump"
		cat /tmp/dbfile.xml
	fi
fi
