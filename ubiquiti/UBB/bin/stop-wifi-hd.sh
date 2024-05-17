#!/bin/sh

sed -i '/hostapd/d' /etc/inittab
sed -i '/wpa_supplicant/d' /etc/inittab

kill -1 1

killall hostapd
killall wpa_supplicant

ifconfig ath0 down
ifconfig ath1 down

wlanconfig ath0 destroy
wlanconfig ath1 destroy

rmmod qca_ol
rmmod ath_pktlog
rmmod qca_da
rmmod ath_dev
rmmod ath_rate_atheros
rmmod ath_hal
rmmod ath_dfs
rmmod umac
rmmod mem_manager
rmmod ath_spectral
rmmod qdf
rmmod asf

rmmod ath10k_pci ath10k_core ath
