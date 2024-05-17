#!/bin/sh
#
# usage: usbnotify.sh
#

DlnaScan=`nvram_get 2860 DlnaScan`
dlnadb=`nvram_get 2860 dlnadb`
storage_notify() {
/usr/local/bin/inotifywait -mrq --timefmt '%d/%m/%y %H:%M' --format '%T %w%f%e' -e close_write,delete,create,attrib  $1 \
| while read files
	do
		dlnaDirNum=`nvram_get 2860 DlnaDir | tr ";" "\n" | wc -l`
		if [ $dlnaDirNum -gt 0 ];then
			num=1
			while [ $num -le $dlnaDirNum ];
			do
				partDir=`nvram_get DlnaDir | cut -f$num -d\; | cut -f2 -d\,`
				dlnaFlage=`echo "${files}"|grep "${partDir}"`
				if [ "$dlnaFlage" != "" ]; then
					dlnaRestartFlage=1
				fi
				num=`expr $num + 1`
			done
			if [ "$dlnaRestartFlage" == "1" ]; then
				#restart dlna
				if [ "$DlnaScan" == "1" ]; then
					killall -q minidlna
					rm -rf "$dlnadb/.db/files.db"
					sleep 3
					minidlna -f /etc_ro/minidlna.conf -R
				else
					killall -q minidlna
					rm -rf "$dlnadb/.db/files.db"
					sleep 3
					minidlna -f /etc_ro/minidlna.conf
				fi
				dlnaRestartFlage=0
			fi
		fi
	done
}

if [ "$1" != "" ]; then
	storage_notify $1
fi

