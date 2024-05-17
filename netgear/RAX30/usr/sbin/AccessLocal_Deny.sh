#!/bin/ash
#
# Re-define the interface name for RAX30
# TODO : Need generate the interface dynamiclly
#

echo "Access Loacl Deny at $1" > /dev/console

LAN_INTF="eth0.0 eth1.0 eth2.0 eth3.0"
WL_INTF="wl0 wl0.1 wl1 wl1.1"

# KKHuang: SPC will create br0:0, so need to exclude it
lan_ip=`ip address show br0 | grep -v "br0:" | grep "inet " | awk -F '[ /]' '{print $6}'`

ebtables -N wlisolation_$1 || true
ebtables -F wlisolation_$1

for wl in $WL_INTF
do
  if [ $wl != $1 ]; then
    ebtables -A wlisolation_$1 -i $1 -o $wl -j DROP
    ebtables -A wlisolation_$1 -i $wl -o $1 -j DROP
  fi
done

for lan in $LAN_INTF
do
  ebtables -A wlisolation_$1 -i $1 -o $lan -j DROP
  ebtables -A wlisolation_$1 -i $lan -o $1 -j DROP
done
ebtables -A wlisolation_$1 -j RETURN

ebtables -D FORWARD -j wlisolation_$1 >/dev/null 2>&1 || true
ebtables -I FORWARD -j wlisolation_$1

# Not allow access router local interface
ebtables -N deny_router_local_$1 || true
ebtables -F deny_router_local_$1

# Deny to access router hostapd service
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 49152 -j DROP
# Deny to access router telnet service
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 23 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 17 --ip-destination-port 23 -j DROP
# Deny to access router FTP service
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 21 -j DROP
# Deny to access router SAMBA service
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 139 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 445 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 17 --ip-destination-port 137 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 17 --ip-destination-port 138 -j DROP
# Deny to access router DNS service
#ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 53 -j DROP
#ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 17 --ip-destination-port 53 -j DROP
# Deny to access router web management
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 80 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 443 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 26081 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 27081 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 28081 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 26443 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 27443 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 28443 -j DROP
# Deny to access router SOAP service
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 5000 -j DROP
# Deny to access router UPNP/DLNA service
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 8200 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 6 --ip-destination-port 56688 -j DROP
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 17 --ip-destination-port 1900 -j DROP
# Deny to ping router
ebtables -A deny_router_local_$1 -i $1 -p IPv4 --ip-destination $lan_ip --ip-proto 1 -j DROP

# IPv6
lan_ipv6_addrs=`ip address show br0 | grep -v "br0:" | grep "inet6 " | awk -F '[ /]' '{print $6}'`
for addr in $lan_ipv6_addrs; do
  # KKHuang: SPC will create IPv6 private IP, so need to exclude it
  prefixAddr=$(echo $addr | cut -c1-2)
  if [ "$prefixAddr" == "fc" -o "$prefixAddr" == "fd" ]; then
    continue
  fi
  # Deny to access router hostapd service
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 49152 -j DROP
  # Deny to access router telnet service
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 23 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 17 --ip6-destination-port 23 -j DROP
  # Deny to access router FTP service
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 21 -j DROP
  # Deny to access router SAMBA service
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 139 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 445 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 17 --ip6-destination-port 137 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 17 --ip6-destination-port 138 -j DROP
  # Deny to access router DNS service
  #ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 53 -j DROP
  #ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 17 --ip6-destination-port 53 -j DROP
  # Deny to access router web management
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 80 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 443 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 26081 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 27081 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 28081 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 26443 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 27443 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 28443 -j DROP
  # Deny to access router SOAP service
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 5000 -j DROP
  # Deny to access router UPNP/DLNA service
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 8200 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 6 --ip6-destination-port 56688 -j DROP
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 17 --ip6-destination-port 1900 -j DROP
  # Deny to ping router
  ebtables -A deny_router_local_$1 -i $1 -p IPv6 --ip6-destination $addr --ip6-proto 1 -j DROP
done

# Last rule
ebtables -A deny_router_local_$1 -j RETURN

ebtables -D INPUT -j deny_router_local_$1 >/dev/null 2>&1 || true
ebtables -I INPUT -j deny_router_local_$1

fc flush >/dev/null 2>&1
