#!/bin/sh
echo -e "\033[35m Update d2 ... \033[0m" > /dev/console
d2 -c general.devicemodel "`getdb -g Device.X_PEGATRON_COM_DeviceInfo.ModelName`"

# In DAL V1.3.67, DeviceModel might be UNKNOWN since d2d is not ready, so need to recover it
for i in 1 2 3
do
	d2ModelName=`d2 general.devicemodel | awk -F ' ' '{printf $2}'`
	modelName=`getdb -g Device.X_PEGATRON_COM_DeviceInfo.ModelName`
	if [ "$modelName" != "$d2ModelName" ]; then
		echo -e "\033[35m Fail to set d2 general.devicemodel ($i) \033[0m" > /dev/console
		sleep 1
		if [ "$i" == "3" ]; then
			break;
		else
			d2 -c general.devicemodel "$modelName"
		fi
	else
		echo -e "\033[35m Succeed to set d2 general.devicemodel ($i) \033[0m" > /dev/console
		break;
	fi
done

d2 -c general.devicename "`getdb -g Device.X_PEGATRON_COM_DeviceInfo.DeviceName`"
d2 -c general.fwrevision $(echo "`getdb -g Device.DeviceInfo.SoftwareVersion`" | awk -F '_' '{printf $1}')
d2 -c general.hwrevision "`getdb -g Device.DeviceInfo.HardwareVersion`"
d2 -c general.fsn "`getdb -g Device.DeviceInfo.SerialNumber`"
d2 -c general.sku "`getdb -g Device.X_PEGATRON_COM_DeviceInfo.SKU`"
d2 -c general.regionname $(echo "`getdb -g Device.X_PEGATRON_COM_DeviceInfo.SKU`" | tr '[:upper:]' '[:lower:]')
d2 -c general.region "`getdb -g Device.X_PEGATRON_COM_DeviceInfo.Region`"
d2 -c general.lan_ifname "br0"
d2 -c general.GatewayIP "`getdb -I`"
d2 -c general.GatewayMAC "`getdb -M`"
d2 -c general.NetworkAddress "`getdb -n`"
d2 -c general.defaultmac "`getdb -m`"
d2 -c general.RouterMode "`getdb -r`"
d2 -c general.Manufacturer Pegatron
# DNS IP should be the LAN PC used DNS IP address, RAX30 used LAN IP to be DNS IP 
d2 -c general.dnsip "`getdb -I`"
# Report wan_ifname and internetstatus before really connecting a WAN wire for DAL Auto.
d2 -c general.wan_ifname "`getdb -w`"
d2 -c general.Internetstatus "`getdb -s`"
echo -e "\033[35m .. Done \033[0m" > /dev/console
d2 -c xagentcfg[0].lan_ifname "br0"
d2 -c xagentcfg[0].lan_ipaddr "`getdb -I`"

