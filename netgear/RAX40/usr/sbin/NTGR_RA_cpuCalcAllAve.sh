#!/bin/sh

#function 
calcHighCpuTime() {
    local highCpuTime=0;
    local highCpuThres=$1;
    #highCpuThres=9; #<==Test
#echo "\$highCpuThres=$highCpuThres";
#echo "\$1=$1";
    rows=$(grep ":" /tmp/cpuUsage_in_1440mins.dat -c);
    if [ -e /tmp/NTGR_RA_cpuAveAll.txt ]; then
        lastRow=$(grep "lastRow=" /tmp/NTGR_RA_cpuAveAll.txt | awk -F '=' '{printf $2}');
    else
        lastRow=0;
    fi
    if [ ! -e /tmp/cpuUsage_in_1440mins.dat ]; then
        echo "0";
		return;
    fi
#echo "\$rows=$rows" 2>/dev/console;
#echo "\$lastRow=$lastRow" 2>/dev/console;
    #rows maximum should be 1440.
    startIndex=$(($rows - $lastRow));
#echo "\$startIndex=$startIndex" 2>/dev/console;
    #tail -n 1225 /tmp/cpuUsage_in_1440mins.dat;head -n 215 /tmp/cpuUsage_in_1440mins.dat
	cpuUtilArray=$(tail -n "$startIndex" /tmp/cpuUsage_in_1440mins.dat;head -n $lastRow /tmp/cpuUsage_in_1440mins.dat);
#echo "\$cpuUtilArray=$cpuUtilArray";
#===>debug    #highCpuTime=$(echo "$cpuUtilArray" | awk -F ' ' -v thres=$highCpuThres 'BEGIN{totalCpuUtilIn10times=0;highCpuCount=0;} {print NR":"$2, $3, totalCpuUtilIn10times;if ( NR % 10 == 0 ) {print totalCpuUtilIn10times, highCpuCount; if ( (totalCpuUtilIn10times / 10 / 2) > thres ){highCpuCount++;}totalCpuUtilIn10times=0;}else{totalCpuUtilIn10times += ($2 + $3);}} END{printf highCpuCount * 10}');
    highCpuTime=$(echo "$cpuUtilArray" | awk -F ' ' -v thres=$highCpuThres 'BEGIN{totalCpuUtilIn10times=0;highCpuCount=0;} {if ( NR % 10 == 0 ) {if ( (totalCpuUtilIn10times / 10 / 2) > thres ){highCpuCount++;}totalCpuUtilIn10times=0;}else{totalCpuUtilIn10times += ($2 + $3);}} END{printf highCpuCount * 10}');
    #highCpuTime=$(printf "$cpuUtilArray" > awk -F ' ' 'BEGIN{totalCpuUtilIn10times=0;highCpuCount=0;} {print NR;if ( NR % 10 == 0 ) {print $totalCpuUtilIn10times; if ( ($totalCpuUtilIn10times / 10 / 2) > $1 ){highCpuCount++;}else{totalCpuUtilIn10times=0;}}else{$totalCpuUtilIn10times += $2 + $3;}} END{printf $highCpuCount * 10}');
#echo "\$highCpuTime=$highCpuTime";
    echo "$highCpuTime";
    return;
#return $((highCpuTime));
}



#Calculate average CPU/cores utilization and highCPUTime.
#rows=$(grep ":" /tmp/cpuUsage_in_1440mins.dat -c);
#i=1;
highCpuTime=0;
#cpuAllTotalUtilization=0;
#core1TotalUtilization=0;
#core2TotalUtilization=0;

if [ -e /etc/Local_RAE_Policy.json ]; then
    highCpuThres=$(cat /etc/Local_RAE_Policy.json | jsonfilter -e '@.eventLogPolicy[0].cpuThresholdHigh');
else
    highCpuThres=90;
fi
#highCpuThres=12; #For test.
#echo "\$highCpuThres=$highCpuThres";

core1AveUtilization=$(cat /tmp/cpuUsage_in_1440mins.dat | awk -F ' ' '{core1Total += $2; count++;} END{print core1Total/count}' | awk '{printf("%.2f", $1)}');
core2AveUtilization=$(cat /tmp/cpuUsage_in_1440mins.dat | awk -F ' ' '{core2Total += $3; count++;} END{print core2Total/count}' | awk '{printf("%.2f", $1)}');
cpuAllAveUtilization=$(cat /tmp/cpuUsage_in_1440mins.dat | awk -F ' ' '{cpuTotal += $2 + $3; count++;} END{print cpuTotal/count/2}' | awk '{printf("%.2f", $1)}');
#highCpuTime=$(cat /tmp/cpuUsage_in_1440mins.dat | awk -F ' ' 'BEGIN{highCpuTime=0;} {onceCpuAvg = ($2 +$3) / 2; print onceCpuAvg; if ( onceCpuAvg > ${highCpuThres} ) {highCpuTime += 1; print highCpuTime;} END{printf highCpuTime}}');
#highCpuTime=$(cat /tmp/cpuUsage_in_1440mins.dat | awk -v highCpuThres=$highCpuThres -F ' ' 'BEGIN{highCpuTime=0;} {onceCpuAvg = ($2 +$3) / 2; if ( onceCpuAvg > highCpuThres ){highCpuTime += 1;}} END{printf highCpuTime}');
highCpuTime=$(eval calcHighCpuTime $highCpuThres);

echo "\$core1AveUtilization=$core1AveUtilization" 2>/dev/console;
echo "\$core2AveUtilization=$core2AveUtilization" 2>/dev/console;
echo "\$cpuAllAveUtilization=$cpuAllAveUtilization" 2>/dev/console;
#echo "\$highCpuTime=$highCpuTime" 2>/dev/console;
#In RA data dictionary, it says highCpuTime only record by 10 mins increment. Ex. 0->10->20->30
#highCpuTime=$(($highCpuTime - ($highCpuTime % 10)));
echo "\$highCpuTime=$highCpuTime" 2>/dev/console;

if [ "$(grep 'cpuAveAll=' /tmp/NTGR_RA_cpuAveAll.txt -c)" -ge 1 ]; then
    sed -i 's/cpuAveAll=*.*/cpuAveAll='"$cpuAllAveUtilization"'/g' /tmp/NTGR_RA_cpuAveAll.txt;
else
    echo "cpuAveAll=$cpuAllAveUtilization" >> /tmp/NTGR_RA_cpuAveAll.txt;
fi

if [ "$(grep 'cpuAveByCores=' /tmp/NTGR_RA_cpuAveAll.txt -c)" -ge 1 ]; then
    sed -i 's/cpuAveByCores=*.*/cpuAveByCores=['"$core1AveUtilization"','"$core2AveUtilization"']/g' /tmp/NTGR_RA_cpuAveAll.txt;
else
    echo "cpuAveByCores=[$core1AveUtilization,$core2AveUtilization]" >> /tmp/NTGR_RA_cpuAveAll.txt;
fi

if [ "$(grep 'highCpuTime=' /tmp/NTGR_RA_cpuAveAll.txt -c)" -ge 1 ]; then
    sed -i 's/highCpuTime=*.*/highCpuTime='"$highCpuTime"'/g' /tmp/NTGR_RA_cpuAveAll.txt;
else
    echo "highCpuTime=$highCpuTime" >> /tmp/NTGR_RA_cpuAveAll.txt;
fi
