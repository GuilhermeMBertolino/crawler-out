#!/bin/sh
echo "Build firewall rules to /tmp/firewallrules"
echo -e "COMMAMD:iptables -t filter -nL\n" > /tmp/firewallrules
iptables -t filter -nL >> /tmp/firewallrules
echo -e "\nCOMMAMD:iptables -t nat -nL\n" >> /tmp/firewallrules
iptables -t nat -nL >> /tmp/firewallrules
echo -e "\nCOMMAMD:iptables -t mangle -nL\n" >> /tmp/firewallrules
iptables -t mangle -nL >> /tmp/firewallrules
echo -e "\nCOMMAMD:ebtables -t filter -L\n" >> /tmp/firewallrules
ebtables -t filter -L >> /tmp/firewallrules
echo -e "\nCOMMAMD:ebtables -t nat -L\n" >> /tmp/firewallrules
ebtables -t nat -L >> /tmp/firewallrules
echo -e "\nCOMMAMD:ebtables -t broute -L\n" >> /tmp/firewallrules
ebtables -t broute -L >> /tmp/firewallrules
