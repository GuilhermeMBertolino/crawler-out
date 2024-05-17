#!/bin/sh

ifconfig wlan0 down

sed -i '/hostapd_60g/d' /etc/inittab
sed -i '/wpa_supplicant_60g/d' /etc/inittab

kill -1 1

killall hostapd_60g
killall wpa_supplicant_60g

rmmod prs_falcon
