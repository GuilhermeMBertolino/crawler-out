#!/bin/sh

#function 
calcHighMemTime() {
    local highMemTime=0;
    local highMemThres=$1;
    #highMemThres=9; #<==Test
#echo "\$highMemThres=$highMemThres";
#echo "\$1=$1";
    rows=$(grep ":" /tmp/memUsage_in_1440mins.dat -c);
    if [ -e /tmp/NTGR_RA_memUsageAll.txt ]; then
        lastRow=$(grep "lastRow=" /tmp/NTGR_RA_memUsageAll.txt | awk -F '=' '{printf $2}');
    else
        lastRow=1;
    fi
    if [ ! -e /tmp/memUsage_in_1440mins.dat ]; then
        echo "0";
		return;
    fi
#echo "\$rows=$rows" 2>/dev/console;
#echo "\$lastRow=$lastRow" 2>/dev/console;
    #rows maximum should be 1440.
    startIndex=$(($rows - $lastRow));
#echo "\$startIndex=$startIndex" 2>/dev/console;
    #tail -n 1225 /tmp/memUsage_in_1440mins.dat;head -n 215 /tmp/memUsage_in_1440mins.dat
	memUtilArray=$(tail -n "$startIndex" /tmp/memUsage_in_1440mins.dat;head -n $lastRow /tmp/memUsage_in_1440mins.dat);
#echo "\$memUtilArray=$memUtilArray";
#===>debug    #highCpuTime=$(echo "$memUtilArray" | awk -F ' ' -v thres=$highMemThres 'BEGIN{totalMemUtilIn10times=0;highMemCount=0;} {print NR":"$2, $3, totalMemUtilIn10times;if ( NR % 10 == 0 ) {print totalMemUtilIn10times, highMemCount; if ( (totalMemUtilIn10times / 10) > thres ){highMemCount++;}totalMemUtilIn10times=0;}else{totalMemUtilIn10times += $2;}} END{printf highMemCount * 10}');
    highMemTime=$(echo "$memUtilArray" | awk -F ' ' -v thres=$highMemThres 'BEGIN{totalMemUtilIn10times=0;highMemCount=0;} {if ( NR % 10 == 0 ) {if ( (totalMemUtilIn10times / 10) > thres ){highMemCount++;}totalMemUtilIn10times=0;}else{totalMemUtilIn10times += $2;}} END{printf highMemCount * 10}');
    #highCpuTime=$(printf "$cpuUtilArray" > awk -F ' ' 'BEGIN{totalCpuUtilIn10times=0;highCpuCount=0;} {print NR;if ( NR % 10 == 0 ) {print $totalCpuUtilIn10times; if ( ($totalCpuUtilIn10times / 10 / 2) > $1 ){highCpuCount++;}else{totalCpuUtilIn10times=0;}}else{$totalCpuUtilIn10times += $2 + $3;}} END{printf $highCpuCount * 10}');
#echo "\$highMemTime=$highMemTime";
    echo "$highMemTime";
    return;
#return $((highMemTime));
}

#Calculate highMemTime.
#rows=$(grep ":" /tmp/memUsage_in_1440mins.dat -c);
#i=1;
highMemTime=0;
#cpuAllTotalUtilization=0;
#core1TotalUtilization=0;
#core2TotalUtilization=0;

if [ -e /etc/Local_RAE_Policy.json ]; then
	highMemThres=$(cat /etc/Local_RAE_Policy.json | jsonfilter -e '@.eventLogPolicy[1].memoryUtilizationsHigh');
else
    highMemThres=90;
fi
#highMemThres=20; #For test.
#echo "\$highMemThres=$highMemThres";

#core1AveUtilization=$(cat /tmp/memUsage_in_1440mins.dat | awk -F ' ' '{core1Total += $2; count++;} END{print core1Total/count}' | awk '{printf("%.2f", $1)}');
#core2AveUtilization=$(cat /tmp/memUsage_in_1440mins.dat | awk -F ' ' '{core2Total += $3; count++;} END{print core2Total/count}' | awk '{printf("%.2f", $1)}');
#cpuAllAveUtilization=$(cat /tmp/memUsage_in_1440mins.dat | awk -F ' ' '{cpuTotal += $2 + $3; count++;} END{print cpuTotal/count/2}' | awk '{printf("%.2f", $1)}');
#highCpuTime=$(cat /tmp/memUsage_in_1440mins.dat | awk -F ' ' 'BEGIN{highCpuTime=0;} {onceCpuAvg = ($2 +$3) / 2; print onceCpuAvg; if ( onceCpuAvg > ${highCpuThres} ) {highCpuTime += 1; print highCpuTime;} END{printf highCpuTime}}');
#highCpuTime=$(cat /tmp/memUsage_in_1440mins.dat | awk -v highCpuThres=$highCpuThres -F ' ' 'BEGIN{highCpuTime=0;} {onceCpuAvg = ($2 +$3) / 2; if ( onceCpuAvg > highCpuThres ){highCpuTime += 1;}} END{printf highCpuTime}');
highMemTime=$(eval calcHighMemTime $highMemThres);
####For Debug####echo "\$highMemTime=$highMemTime" 2>/dev/console;

if [ "$(grep 'highMemTime=' /tmp/NTGR_RA_memUsageAll.txt -c)" -ge 1 ]; then
    sed -i '/highMemTime=/c highMemTime='"$highMemTime"'' /tmp/NTGR_RA_memUsageAll.txt;
else
    echo "highMemTime=$highMemTime" >> /tmp/NTGR_RA_memUsageAll.txt;
fi
