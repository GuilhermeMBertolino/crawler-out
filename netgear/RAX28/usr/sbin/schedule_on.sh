# Disable Internet : 
#(Let the SSID is still connectable and can get the IP address from router. But the device can't access the Internet.)


# Remove existed rules. call schedule_off.sh to remove schedule rules
schedule_off.sh 

# Add rules
ebtables -P FORWARD DROP > /dev/null 2>&1
ebtables -I FORWARD -i eth0.0 -j ACCEPT > /dev/null 2>&1
ebtables -I FORWARD -i wl0.1 -j ACCEPT > /dev/null 2>&1
ebtables -I FORWARD -i wl1.1 -j ACCEPT > /dev/null 2>&1
ebtables -I FORWARD -p IPv4 -i wl0 --ip-proto 17 --ip-dport 67:68 -j ACCEPT > /dev/null 2>&1
ebtables -I FORWARD -p IPv4 -i wl0 --ip-proto 17 --ip-sport 67:68 -j ACCEPT > /dev/null 2>&1
ebtables -I FORWARD -p IPv4 -i wl1 --ip-proto 17 --ip-dport 67:68 -j ACCEPT > /dev/null 2>&1
ebtables -I FORWARD -p IPv4 -i wl1 --ip-proto 17 --ip-sport 67:68 -j ACCEPT > /dev/null 2>&1
