#!/bin/sh
# utf-8 coding

cfm set wan1.ip 192.168.10.110
cfm set wan1.mask 255.255.255.0
cfm set wan1.staticMTU 1500
cfm set wan1.gateway 192.168.10.1
cfm set wan1.dns1 114.114.114.114
cfm set wan1.dns2 8.8.8.8
cfm set wan1.connecttype 1
cfm post multiWAN 12 1 1 0
