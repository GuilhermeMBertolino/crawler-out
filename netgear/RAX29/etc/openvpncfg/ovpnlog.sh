#!/bin/bash

if [ "$1" == "connect" ]; then
    logger -p local5.warn \[VPN\]\[OpenVPN, connection successfully\] from remote IP address: "$2"
    exit 0
fi

if [ "$1" == "disconnect" ]; then
    logger -p local5.warn \[VPN\]\[OpenVPN, connection drop\] from remote IP address: "$2"
    exit 0
fi

if [ "$1" == "fail" ]; then
    logger -p local5.warn \[VPN\]\[OpenVPN, connection fail\] from remote IP address: "$2"
    exit 0
fi
