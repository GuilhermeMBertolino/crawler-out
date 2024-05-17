#!/bin/sh

#This script is using to update devices status by DHCP clientId.
#The calling timing is focus on wireless client sta_connection() or sta_disconnection().
#Which means it may require IP by DHCP relay/proxy and devices may behind extender/VM.
#The input parameters must be:
#$1, parent's MAC address. ==>The hardware address in dhcp leasefile(column2).
#$2, parent's interface. ==>The interface which parent device connect to. eth0_1, eth0_2, eth0_3, eth0_4, wlan0, wlan0.0, wlan2, wlan2.0.
#$3, parent's link status. ==>up or down, according the sl notify event.
#$4, enable/disable debug print. Only "1" is enable, other vaule or NULL are disable debug print.

parentMac=$1;
parentLinkState=$2;
parentIntf=$3;
debugOutput="/dev/null";

#All of three input parameters can't be NULL string.
if [ -z "$parentMac" ] || [ -z "$parentLinkState" ] || [ -z "$parentIntf" ]; then
    return;
fi

#Format check, the link state only can be "up" or "down".
if [ "$parentLinkState" != "up" ] && [ "$parentLinkState" != "down" ]; then
    return;
fi
echo "\$parentMac=$parentMac, \$parentLinkState=$parentLinkState, \$parentIntf=$parentIntf" > $debugOutput;

#1. Use the input MAC address to find same MAC address record in "Device.Hosts." object and list mapped IPs(in "Device.Hosts." object).
##jFilterCmd="'@.Objects[@.Param[1].ParamValue='"'$parentMac'"'].Param[2].ParamValue'";
##echo "\$jFilterCmd=$jFilterCmd" > $debugOutput;
##ipList=$(cgigetutil Device.Hosts. | jsonfilter -e $jFilterCmd); ##<===Can't use this way.
#The jsonfilter command, "jsonfilter -e '@.Objects[@.Param[1].ParamValue="XX:XX:XX:XX:XX:XX"].Param[2].ParamValue'", can list ip addresses with inputed MAC in "Device.Hosts." object.
ipList=$(cgigetutil Device.Hosts. | jsonfilter -e '@.Objects[@.Param[1].ParamValue='"'$parentMac'"'].Param[2].ParamValue');
echo "\$ipList=$ipList" > $debugOutput;

#2. If the IP also in DHCP leasefile, we also update the link state and connected interface to DIL DB. 
#   These devices may behind extender/VM etc..., so we need to update them when parent device status changed.
for ipEntry in ${ipList}
do
    if [ -n "$ipEntry" ]; then
        hwaddr=$(grep -irn "$ipEntry" /tmp/leasefile -m 1 | awk -F ' ' '{printf $2}');
        #The "01:" prefix(first byte in dhcp option61's context) of clinetId in DHCP leasefile is "type". We need to cut it.
        clid=$(grep -irn "$ipEntry" /tmp/leasefile -m 1 | awk -F ' ' '{printf $5}' | cut -c4-20);
        echo "ip=$ipEntry, hwaddr=$hwaddr, clid=$clid," > $debugOutput;
        if [ -n "$clid" ] && [ "$(echo "$clid" | grep -E "^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$")" ]; then
            echo "$clid is a valid hardware address." > $debugOutput;
            pudil -m "$clid" 6 "$parentLinkState";
            pudil -m "$clid" 7 "$parentIntf";
        elif [ -n "$hwaddr" ]; then
            echo "$clid is NOT a valid hardware address. use hwaddr=$hwaddr as MACaddr key to update DIL DB" > $debugOutput;
            pudil -m "$hwaddr" 6 "$parentLinkState";
            pudil -m "$hwaddr" 7 "$parentIntf";
        else
            echo "do nothing" > $debugOutput;
        fi
    fi
done

