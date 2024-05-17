#!/bin/sh

#Find last record(last row) and decide which index for this record should store to.
if [ -e /tmp/disconnection_in_1440mins.dat ]; then
    rows=$(grep ":" /tmp/disconnection_in_1440mins.dat -c);
	lastRow=$(grep "lastRow=" /tmp/disconnection_in_1440mins.dat | awk -F '=' '{printf $2}');
#echo "\$rows=$rows" 2>/dev/console;
#echo "\$lastRow=$lastRow" 2>/dev/console;
    if [ -n "$lastRow"  ]; then
        targetRow=$(( ($lastRow % 144) + 1 ));
        sed -i 's/lastRow=*.*/lastRow='"$targetRow"'/g' /tmp/disconnection_in_1440mins.dat;
    else
        targetRow=$(( ($rows % 144) + 1 ));
        echo "lastRow=$targetRow" >> /tmp/disconnection_in_1440mins.dat;
    fi
else
    rows=0;
    targetRow=$(( ($rows % 144) + 1 ));
    echo "lastRow=$targetRow" >> /tmp/disconnection_in_1440mins.dat;
fi

gwConnTest="un-test";
internetConnTest="un-test";
wanPhyPort=$1
isEth1PortLowerUp=$(ip link show $wanPhyPort | grep "LOWER_UP" -c | awk -F ' ' '{printf $1}');
if [ "$isEth1PortLowerUp" -ge 1 ]; then
    #default via 111.2.1.252 dev eth1_w3  proto static  src 111.2.1.43
    defGwIp=$(ip route show | grep "default via" | awk -F ' ' '{printf $3}');
    
    if [ -n "$defGwIp" ]; then
        gwConnTest=$(ping $defGwIp -c 3 | grep "packets received" | awk -F ' ' '{if ( $3 > 0 ){printf "Up"}}');
    fi
    if [ "$gwConnTest" != "Up" ]; then
        gwConnTest="Down";
    fi
    
    internetConnTest=$(ping www.netgear.com -c 3 | grep "packets received" | awk -F ' ' '{if ( $3 > 0 ){printf "Up"}}');
    if [ "$internetConnTest" != "Up" ]; then
        internetConnTest="Down";
    fi
else
    gwConnTest="Down";
	internetConnTest="Down";
fi

####For Debug####echo "\$rows=$rows, \$targetRow=$targetRow," 2>/dev/console;
####For Debug####echo "\$gwConnTest=$gwConnTest, \$internetConnTest=$internetConnTest" 2>/dev/console;
 
exist=$(grep "$targetRow:" -c /tmp/disconnection_in_1440mins.dat);
#If old index already exist, use sed to subsititude it otherwise just append it
#Record file format: (one row, index should be 1~144 or by other policy decide.
#index: $internetConnTest $gwConnTest
if [ "$exist" -ge 1 ]; then
    #sed -i 's/^"$targetRow":*.*/'"$targetRow"': '"$internetConnTest"' '"$gwConnTest"'/g' /tmp/disconnection_in_1440mins.dat;
    sed -i '/^'"$targetRow"':/c '"$targetRow"': '"$internetConnTest"' '"$gwConnTest"'' /tmp/disconnection_in_1440mins.dat;
####For Debug####echo "use sed" 2>/dev/console
else
    sed -i '/lastRow=/d' /tmp/disconnection_in_1440mins.dat; #Last line is "lastRow=XXX".
    echo  "$targetRow: $internetConnTest $gwConnTest" >> /tmp/disconnection_in_1440mins.dat;
    echo  "lastRow=$targetRow" >> /tmp/disconnection_in_1440mins.dat;
####For Debug####echo "use echo" 2>/dev/console
fi
