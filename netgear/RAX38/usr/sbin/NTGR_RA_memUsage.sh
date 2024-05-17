#!/bin/sh

#highMemThres=$(cat /etc/Local_RAE_Policy.json | jsonfilter -e '@.eventLogPolicy[1].memoryUtilizationsHigh');

#Find last record(last row) and decide which index for this record should store to.
if [ -e /tmp/memUsage_in_1440mins.dat ]; then
    rows=$(grep ":" /tmp/memUsage_in_1440mins.dat -c);
    if [ -e /tmp/NTGR_RA_memUsageAll.txt ]; then
        lastRow=$(grep "lastRow=" /tmp/NTGR_RA_memUsageAll.txt | awk -F '=' '{printf $2}');
        targetRow=$(( ($lastRow % 1440) + 1 ));
        sed -i 's/lastRow=*.*/lastRow='"$targetRow"'/g' /tmp/NTGR_RA_memUsageAll.txt;
    else
        targetRow=$(( ($rows % 1440) + 1 ));
        echo "lastRow=$targetRow" >> /tmp/NTGR_RA_memUsageAll.txt;
    fi
else
    rows=0;
    targetRow=$(( ($rows % 1440) + 1 ));
    echo "lastRow=$targetRow" >> /tmp/NTGR_RA_memUsageAll.txt;
fi

maxMemSize=$1;
#cat /proc/meminfo | grep 'MemAvailable:' | awk -F ' ' '{printf $2/(512 * 1024)%}'
memUtilizationInst=$(cat /proc/meminfo | grep 'MemAvailable:' | awk -v maxSize=$maxMemSize -F ' ' '{printf (1 - $2 / (maxSize * 1024))*100}');
####For Debug####echo "\$rows=$rows, \$memUtilizationInst=$memUtilizationInst, " 2>/dev/console; 
####For Debug####echo "\$targetRow=$targetRow, " 2>/dev/console; 
####For Debug####echo "$targetRow: $memUtilizationInst" 2>/dev/console;
exist=$(grep "$targetRow:" -c /tmp/memUsage_in_1440mins.dat);
#If old index already exist, use sed to subsititude it otherwise just append it to the record file.
#Record file format: (one row, index should be 1~1440 or by other policy decide.)
#index: $memUtilizationInst
if [ "$exist" -ge 1 ]; then
    sed -i '/^'"$targetRow"':/c '"$targetRow"': '"$memUtilizationInst"'' /tmp/memUsage_in_1440mins.dat;
#echo "use sed" 2>/dev/console
else
    echo  "$targetRow: $memUtilizationInst" >> /tmp/memUsage_in_1440mins.dat
#echo "use echo" 2>/dev/console
fi
