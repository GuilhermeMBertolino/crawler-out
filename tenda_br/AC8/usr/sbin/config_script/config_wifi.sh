#!/bin/sh
# utf-8 coding

#wlan1.0/wlan1.1/wlan0.0/wlan0.1对应2.4G主网络/2.4G访客网络/5G主网络/5G访客网络

#设置ssid为aaaaaaaaaa1234
cfm set wlan1.0_bss_ssid aaaaaaaaaa1234
#开启加密，设置加密方式为wpapsk，如果需要设置成不加密的话则值修改为none
cfm set wlan1.0_bss_security  wpapsk
cfm set wlan1.0_bss_wpapsk_type psk+psk2
cfm set wlan1.0_bss_wpapsk_crypto tkip+aes
#设置密码
cfm set wlan1.0_bss_wpapsk_key 12345678

#设置ssid为aaaaaaaaaa1234_5G
cfm set wlan0.0_bss_ssid aaaaaaaaaa1234_5G
#开启加密，设置加密方式为wpapsk，如果需要设置成不加密的话则值修改为none
cfm set wlan0.0_bss_security  wpapsk
cfm set wlan0.0_bss_wpapsk_type psk+psk2
cfm set wlan0.0_bss_wpapsk_crypto tkip+aes
#设置密码
cfm set wlan0.0_bss_wpapsk_key 12345678

#重启无线
wcli -c band wlan0 wlan1
