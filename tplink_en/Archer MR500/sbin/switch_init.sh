#! /bin/sh

switch2 reg w 2110 810000c0
switch2 reg w 2104 ff0003

switch2 reg w 2210 810000c0
switch2 reg w 2204 ff0003

switch2 reg w 2310 810000c0
switch2 reg w 2304 ff0003

switch2 reg w 2410 81000000
switch2 reg w 2404 ff0003

switch2 reg w 2510 81000000
switch2 reg w 2504 20ff0003

switch2 reg w 2610 81000000
switch2 reg w 2604 20ff0003


switch2 pvid 1 2
switch2 pvid 2 3
switch2 pvid 3 4

switch2 vlan set 1 2 01000010
switch2 vlan set 2 3 00100010
switch2 vlan set 3 4 00010010
switch2 vlan set 4 5 00001100

switch2 pvid 4 5

# ifconfig eth0.5 down
# vconfig rem eth0.5
# vconfig add eth1 5
# ifconfig eth1 up
# ifconfig eth1.5 up

# ip addr add 192.168.10.155/24 dev eth1.5
# ip route add default dev eth1.5
# iptables -t nat -A POSTROUTING -o eth1.5 -j MASQUERADE