#!/bin/sh

#function 
calcHighCpuTime() {
    local highCpuTime=0;
    local highCpuThres=$1;

    rows=$(grep ":" /tmp/ra/cpuUsage.dat -c);
    if [ -e /tmp/ra/NTGR_RA_cpuAveAll.txt ]; then
        lastRow=$(grep "lastRow=" /tmp/ra/NTGR_RA_cpuAveAll.txt | awk -F '=' '{printf $2}');
    else
        lastRow=0;
    fi
    if [ ! -e /tmp/ra/cpuUsage.dat ]; then
        echo "0";
		return;
    fi

    #rows maximum should be 1440.
    startIndex=$(($rows - $lastRow));
	cpuUtilArray=$(tail -n "$startIndex" /tmp/ra/cpuUsage.dat;head -n $lastRow /tmp/ra/cpuUsage.dat);
    highCpuTime=$(echo "$cpuUtilArray" | awk -F ' ' -v thres=$highCpuThres 'BEGIN{totalCpuUtilIn10times=0;highCpuCount=0;} {if ( NR % 10 == 0 ) {if ( (totalCpuUtilIn10times / 10 / 3) > thres ){highCpuCount++;}totalCpuUtilIn10times=0;}else{totalCpuUtilIn10times += ($2 + $3 + $4);}} END{printf highCpuCount * 10}');

    echo "$highCpuTime";
    return;
}


#Calculate average CPU/cores utilization and highCPUTime.
highCpuTime=0;

if [ -e /data/rabin/raePolicy.json ]; then
    highCpuThres=$(cat /data/rabin/raePolicy.json | grep "cpuThresholdHigh" | cut -d'"' -f4 | xargs echo -n);
else
    highCpuThres=90;
fi

core1AveUtilization=$(cat /tmp/ra/cpuUsage.dat | awk -F ' ' '{core1Total += $2; count++;} END{print core1Total/count}' | awk '{printf("%.2f", $1)}');
core2AveUtilization=$(cat /tmp/ra/cpuUsage.dat | awk -F ' ' '{core2Total += $3; count++;} END{print core2Total/count}' | awk '{printf("%.2f", $1)}');
core3AveUtilization=$(cat /tmp/ra/cpuUsage.dat | awk -F ' ' '{core3Total += $4; count++;} END{print core3Total/count}' | awk '{printf("%.2f", $1)}');
cpuAllAveUtilization=$(cat /tmp/ra/cpuUsage.dat | awk -F ' ' '{cpuTotal += $2 + $3 + $4; count++;} END{print cpuTotal/count/3}' | awk '{printf("%.2f", $1)}');
highCpuTime=$(eval calcHighCpuTime $highCpuThres);

#echo "\$core1AveUtilization=$core1AveUtilization" 2>/dev/console;
#echo "\$core2AveUtilization=$core2AveUtilization" 2>/dev/console;
#echo "\$core3AveUtilization=$core3AveUtilization" 2>/dev/console;
#echo "\$cpuAllAveUtilization=$cpuAllAveUtilization" 2>/dev/console;

#In RA data dictionary, it says highCpuTime only record by 10 mins increment. Ex. 0->10->20->30
#echo "\$highCpuTime=$highCpuTime" 2>/dev/console;

if [ "$(grep 'cpuAveAll=' /tmp/ra/NTGR_RA_cpuAveAll.txt -c)" -ge 1 ]; then
    sed -i 's/cpuAveAll=*.*/cpuAveAll='"$cpuAllAveUtilization"'/g' /tmp/ra/NTGR_RA_cpuAveAll.txt;
else
    echo "cpuAveAll=$cpuAllAveUtilization" >> /tmp/ra/NTGR_RA_cpuAveAll.txt;
fi

if [ "$(grep 'cpuAveByCores=' /tmp/ra/NTGR_RA_cpuAveAll.txt -c)" -ge 1 ]; then
    sed -i 's/cpuAveByCores=*.*/cpuAveByCores='"$core1AveUtilization"','"$core2AveUtilization"','"$core3AveUtilization"'/g' /tmp/ra/NTGR_RA_cpuAveAll.txt;
else
    echo "cpuAveByCores=$core1AveUtilization,$core2AveUtilization,$core3AveUtilization" >> /tmp/ra/NTGR_RA_cpuAveAll.txt;
fi

if [ "$(grep 'highCpuTime=' /tmp/ra/NTGR_RA_cpuAveAll.txt -c)" -ge 1 ]; then
    sed -i 's/highCpuTime=*.*/highCpuTime='"$highCpuTime"'/g' /tmp/ra/NTGR_RA_cpuAveAll.txt;
else
    echo "highCpuTime=$highCpuTime" >> /tmp/ra/NTGR_RA_cpuAveAll.txt;
fi
