#!/bin/sh

#Find last record(last row) and decide which index for this record should store to.
if [ -e /tmp/ra/cpuUsage.dat ]; then
    rows=$(grep ":" /tmp/ra/cpuUsage.dat -c);
    if [ -e /tmp/ra/NTGR_RA_cpuAveAll.txt ]; then
        lastRow=$(grep "lastRow" /tmp/ra/NTGR_RA_cpuAveAll.txt | awk -F '=' '{printf $2}');
        targetRow=$(( ($lastRow % 1440) + 1 ));
        sed -i 's/lastRow=*.*/lastRow='"$targetRow"'/g' /tmp/ra/NTGR_RA_cpuAveAll.txt;
    else
        targetRow=$(( ($rows % 1440) + 1 ));
        echo "lastRow=$targetRow" >> /tmp/ra/NTGR_RA_cpuAveAll.txt;
    fi
    exist=$(grep "$targetRow:" -c /tmp/ra/cpuUsage.dat);
else
    rows=0;
    targetRow=$(( ($rows % 1440) + 1 ));
    echo "lastRow=$targetRow" >> /tmp/ra/NTGR_RA_cpuAveAll.txt;
    exist=0;
fi

core1Usage=$(mpstat -P 0| tail -n 1 | awk -F ' ' '{printf 100-$12}');
core2Usage=$(mpstat -P 1| tail -n 1 | awk -F ' ' '{printf 100-$12}');
core3Usage=$(mpstat -P 2| tail -n 1 | awk -F ' ' '{printf 100-$12}');

#If old index already exist, use sed to subsititude it otherwise just append it to the record file.
#Record file format: (one row, index should be 1~1440 or by other policy decide.)
#index: core1Utilization core1Utilization
if [ "$exist" -ge 1 ]; then
    sed -i '/^'"$targetRow"':/c '"$targetRow"': '"$core1Usage"' '"$core2Usage"' '"$core3Usage"'' /tmp/ra/cpuUsage.dat;
else
    echo  "$targetRow: $core1Usage $core2Usage $core3Usage" >> /tmp/ra/cpuUsage.dat;
fi

