# Enable Internet:
ebtables -P FORWARD ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -i eth0.0 -j ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -i wl0.1 -j ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -i wl1.1 -j ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -p IPv4 -i wl0 --ip-proto 17 --ip-dport 67:68 -j ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -p IPv4 -i wl0 --ip-proto 17 --ip-sport 67:68 -j ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -p IPv4 -i wl1 --ip-proto 17 --ip-dport 67:68 -j ACCEPT > /dev/null 2>&1
ebtables -D FORWARD -p IPv4 -i wl1 --ip-proto 17 --ip-sport 67:68 -j ACCEPT > /dev/null 2>&1
