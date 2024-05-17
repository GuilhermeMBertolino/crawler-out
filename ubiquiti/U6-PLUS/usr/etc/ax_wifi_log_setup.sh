#!/bin/sh

printUsage() {
    # print usage
    printf "\n"
    printf "Usage: $0\n"
    printf "    set     HOST_IP  [HOST_MAC]\n"
    printf "    enable [HOST_IP] [HOST_MAC]\n"
    printf "    disable\n"
    printf "\n"
    printf "Mandatory arguments\n"
    printf "    set         Setup log server HOST_IP and HOST_MAC\n"
    printf "    enable      Enable log to server\n"
    printf "    disable     Disable log to server\n"
    printf "\n"
}

pingServer() {
    # ping ip to get mac address
    printf "PING $1: "
    ping -c1 -w1 -q $1 > /dev/null 2>&1
    if [ "$?" -eq 0 ]; then
        printf "[ OK ]\n"
    else
        printf "[ FAILED ]\n"
    fi
}

getMacFromArp() {
    # get mac from /proc/net/arp
    while read arpip _ _ mac_addr _; do
        [[ "$arpip" == "$1" ]] && break
    done < /proc/net/arp

    echo $mac_addr
}

setServer() {
    # setup log server to ax_wifi driver
    echo "SETUP ax_wifi debug server: [ OK ][ $ip / $mac ]"
    iwpriv rai0 set fwlogserverip=$1 > /dev/null 2>&1
    iwpriv rai0 set fwlogservermac=$2 > /dev/null 2>&1
}

pingAndSetServer() {
    ip=$1
    mac=$2

    # ping ip to get mac address
    pingServer $ip
    if [ -z $mac ]; then
        # get mac from /proc/net/arp
        mac=$(getMacFromArp $ip)

        if [[ "$mac" == "00:00:00:00:00:00" ]] || [ -z $mac ]; then
            echo "GET MAC: [ FAILED ]"
            exit 1
        else
            echo "GET MAC: [ OK ] [$mac]"
        fi
    else
        echo "GET MAC from input parameter: [$mac]"
    fi

    # setup log server to ax_wifi driver
    setServer $ip $mac
}

enableLog() {
    iwpriv rai0 set fwlog=0:16
    iwpriv rai0 set fw_dbg=1:62
    iwpriv rai0 set fw_dbg=1:63
    iwpriv rai0 set fw_dbg=1:64
    iwpriv rai0 set fw_dbg=1:65
    iwpriv rai0 set fw_dbg=1:66
    iwpriv rai0 set fw_dbg=1:68
    echo "SET ax_wifi log: [ ENABLE ]"
}

disableLog() {
    iwpriv rai0 set fwlog=0:0
    echo "SET ax_wifi log: [ DISABLE ]"
}

#main function
if [[ "$1" == "set" ]]; then
    if [ $# -eq 1 ]; then
        printUsage
        exit 1
    fi
    # Setup log server
    pingAndSetServer $2 $3
elif [[ "$1" == "enable" ]]; then
    if [ $# -gt 1 ]; then
        # Setup log server
        pingAndSetServer $2 $3
    fi
    # enable FW log
    enableLog
elif [[ "$1" == "disable" ]]; then
    # disable FW log
    disableLog
else
    printUsage
fi

exit 1
