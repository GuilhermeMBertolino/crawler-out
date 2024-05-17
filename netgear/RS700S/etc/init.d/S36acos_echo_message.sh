#!/bin/sh
echo "=============S36 Check wl_nand_manufacturer!"

if [ -f /proc/nvram/wl_nand_manufacturer ]; then
	is_mfg=`cat /proc/nvram/wl_nand_manufacturer`
	echo "=====================is_mfg= $is_mfg"
fi

#####################################################################
##### modify bootargs_append start
if [ -f /proc/environment/bootargs_append ]; then
	bootargs_append=`cat /proc/environment/bootargs_append`
	echo "=====================bootargs_append= $bootargs_append"
else
    #echo "bootargs_append=cma=96M" > /proc/nvram/set
	bootargs_append=`cat /proc/environment/bootargs_append`
	#echo "=====================set bootargs_append= $bootargs_append"
	echo "=====================bootargs_append is wrong= $bootargs_append"
fi

bootargs_append=`cat /proc/environment/bootargs_append`
if [ $bootargs_append != 'cma=128M' ]; then
    #echo "bootargs_append=cma=96M" > /proc/nvram/set
	bootargs_append=`cat /proc/environment/bootargs_append`
	#echo "=====================set bootargs_append= $bootargs_append"
	echo "=====================bootargs_append is wrong= $bootargs_append"
fi
##### modify bootargs_append end
#####################################################################

#####################################################################
##### modify bufmem start
if [ -f /proc/environment/bufmem ]; then
	bufmem=`cat /proc/environment/bufmem`
	echo "=====================bufmem= $bufmem"
else
    #echo "bufmem=256" > /proc/nvram/set
	bufmem=`cat /proc/environment/bufmem`
	#echo "=====================set bufmem= $bufmem"
	echo "=====================bufmem is wrong= $bufmem"
fi

bufmem=`cat /proc/environment/bufmem`
if [ $bufmem != '256' ]; then
    #echo "bufmem=256" > /proc/nvram/set
	bufmem=`cat /proc/environment/bufmem`
	#echo "=====================set bufmem= $bufmem"
	echo "=====================bufmem is wrong= $bufmem"
fi
##### modify bufmem end
#####################################################################


#####################################################################
##### modify dhd0 start
if [ -f /proc/environment/dhd0 ]; then
	dhd0=`cat /proc/environment/dhd0`
	echo "=====================dhd0= $dhd0"
else
    #echo "echo \"dhd0=11\"" > /proc/nvram/set
	dhd0=`cat /proc/environment/dhd0`
	#echo "=====================set dhd0= $dhd0"
	echo "===================== dhd0 is wrong= $dhd0"
fi
dhd0=`cat /proc/environment/dhd0`
if [ $dhd0 != '11' ]; then
    #echo "echo \"dhd0=11\"" > /proc/nvram/set
	dhd0=`cat /proc/environment/dhd0`
	#echo "=====================set dhd0= $dhd0"
	echo "===================== dhd0 is wrong= $dhd0"
fi
##### modify dhd0 end
#####################################################################

#####################################################################
##### modify dhd1 start
if [ -f /proc/environment/dhd1 ]; then
	dhd1=`cat /proc/environment/dhd1`
	echo "=====================dhd1= $dhd1"
else
    #echo "echo \"dhd1=11\"" > /proc/nvram/set
	dhd1=`cat /proc/environment/dhd1`
	#echo "=====================set dhd1= $dhd1"
	echo "===================== dhd1 is wrong= $dhd1"
fi
dhd1=`cat /proc/environment/dhd1`
if [ $dhd1 != '11' ]; then
    #echo "echo \"dhd1=11\"" > /proc/nvram/set
	dhd1=`cat /proc/environment/dhd1`
	#echo "=====================set dhd1= $dhd1"
	echo "===================== dhd1 is wrong= $dhd1"
fi
##### modify dhd1 end
#####################################################################

#####################################################################
##### modify dhd2 start

if [ -f /proc/environment/dhd2 ]; then
	dhd2=`cat /proc/environment/dhd2`
	echo "=====================dhd2= $dhd2"
else
    #echo "echo \"dhd2=11\"" > /proc/nvram/set
	dhd2=`cat /proc/environment/dhd2`
	#echo "=====================set dhd2= $dhd2"
	echo "===================== dhd2 is wrong= $dhd2"
fi
dhd2=`cat /proc/environment/dhd2`
if [ $dhd2 != '11' ]; then
    #echo "echo \"dhd2=11\"" > /proc/nvram/set
	dhd2=`cat /proc/environment/dhd2`
	#echo "=====================set dhd1= $dhd2"
	echo "===================== dhd2 is wrong= $dhd2"
fi
##### modify dhd2 end
#####################################################################

if [ -f /proc/environment/serverip ]; then
	serverip=`cat /proc/environment/serverip`
	echo "=====================serverip= $serverip"
else
    echo "serverip=192.168.1.2" > /proc/nvram/set
	serverip=`cat /proc/environment/serverip`
	echo "=====================set serverip= $serverip"
fi

bp3_license_name=bp3_license_10042023.bin
if [ -f /data/licenses/$bp3_license_name ]; then
	echo "=====================/data/licenses/$bp3_license_name installed!"
else
    cp /etc/bp3/$bp3_license_name /data/licenses/$bp3_license_name
	echo "=====================copy /etc/bp3/$bp3_license_name to /data/licenses/$bp3_license_name"
fi

