#!/bin/sh

#highCpuThres=$(cat /etc/Local_RAE_Policy.json | jsonfilter -e '@.eventLogPolicy[0].cpuThresholdHigh');

#Find last record(last row) and decide which index for this record should store to.
if [ -e /tmp/cpuUsage_in_1440mins.dat ]; then
    rows=$(grep ":" /tmp/cpuUsage_in_1440mins.dat -c);
    if [ -e /tmp/NTGR_RA_cpuAveAll.txt ]; then
        lastRow=$(grep "lastRow" /tmp/NTGR_RA_cpuAveAll.txt | awk -F '=' '{printf $2}');
        targetRow=$(( ($lastRow % 1440) + 1 ));
        sed -i 's/lastRow=*.*/lastRow='"$targetRow"'/g' /tmp/NTGR_RA_cpuAveAll.txt;
    else
        targetRow=$(( ($rows % 1440) + 1 ));
        echo "lastRow=$targetRow" >> /tmp/NTGR_RA_cpuAveAll.txt;
    fi
else
    rows=0;
    targetRow=$(( ($rows % 1440) + 1 ));
    echo "lastRow=$targetRow" >> /tmp/NTGR_RA_cpuAveAll.txt;
fi

core1Usage=$(mpstat -P 0| tail -n 1 | awk -F ' ' '{printf 100-$11}');
core2Usage=$(mpstat -P 2| tail -n 1 | awk -F ' ' '{printf 100-$11}');
#echo "\$rows=$rows, \$core1Usage=$core1Usage, \$core2Usage=$core2Usage, " 2>/dev/console; 
#echo "\$targetRow=$targetRow, " 2>/dev/console; 
#echo "$targetRow: $core1Usage $core2Usage" 2>/dev/console;
exist=$(grep "$targetRow:" -c /tmp/cpuUsage_in_1440mins.dat);
#If old index already exist, use sed to subsititude it otherwise just append it to the record file.
#Record file format: (one row, index should be 1~1440 or by other policy decide.)
#index: core1Utilization core1Utilization
if [ "$exist" -ge 1 ]; then
    #sed -i 's/^"$targetRow":*.*/'"$targetRow"': '"$core1Usage"' '"$core2Usage"'/g' /tmp/cpuUsage_in_1440mins.dat
    sed -i '/^'"$targetRow"':/c '"$targetRow"': '"$core1Usage"' '"$core2Usage"'' /tmp/cpuUsage_in_1440mins.dat;
#echo "use sed" 2>/dev/console
else
    echo  "$targetRow: $core1Usage $core2Usage" >> /tmp/cpuUsage_in_1440mins.dat
#echo "use echo" 2>/dev/console
fi

