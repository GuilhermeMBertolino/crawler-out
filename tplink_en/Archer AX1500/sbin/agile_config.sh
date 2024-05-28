#!/bin/sh
#this is for agile config rule apply
#author: liuqu
#date:2019/07/22
. /lib/functions.sh

xml_config_file="/tmp/agile_config/tmp/user-config.xml"

# $2 can set the output terminal to telnet or a file ;by default it's /dev/console

local host_name="$(getfirm HOSTNAME_NO_BLANK)"
local file_end="n.bin"

local temp="require(\"luci.controller.admin.firmware\").agile_config_filename()"
local date_ver=`lua -e "$temp"`
echo "date_ver: $date_ver" >/dev/console

config_file="$host_name$date_ver$file_end"
#echo "agile config config_file:$config_file" > /dev/console

#ax10 bcm cfe recovery时，只能支持1024字节的分区表长度，最多在原分区表基础上增加一个
#图片改为一起压缩存储
#favicon_partition="favicon"
#logo_partiton="logo"
icons_partition="icons"

write_favicon_flag="false"
write_logo_flag="false"

global_exist_flag="true"
macbin_exist_flag="true"

config_finish="false"

#for wireless interfaces.
wifi_intf_24g=
wifi_intf_24g_gst=
wifi_intf_5g=
wifi_intf_5g_gst=

global_rule_apply()
{
		local suffix4=$(getfirm MAC|cut -d "-" -f 5,6 | sed 's/-//g'|tr 'a-f' 'A-F')
		local suffix3=$(echo $suffix4|cut -c2-)
		local pin=$(getfirm PIN)
		
		echo "global_rule_apply---" > /dev/console
	
		###SSID naming
		echo "agile_config_rule_apply:Para1:$1" > /dev/console
		if [ "A$(grep 'XXXX' $1 |grep ssid)" != "A" ];then
	 		 sed -i "/^<ssid>/s/XXXX/$suffix4/g" $1
		fi
		
	 	if [ "A$(grep 'xxxx' $1 |grep ssid)" != "A" ];then 
	 		sed -i "/^<ssid>/s/xxxx/$suffix4/g" $1
		fi	
			
	 	if [ "A$(grep 'XXX' $1 |grep ssid)" != "A" ];then
	 		 sed -i "/^<ssid>/s/XXX/$suffix3/g" $1
		fi
		
	 	if [ "A$(grep 'xxx' $1 |grep ssid)" != "A" ];then 
	 		sed -i "/^<ssid>/s/xxx/$suffix3/g" $1
		fi	
			 	
	 	###PSK key change
	 	if [ "A$(grep '\?undefined\?' $1 |grep psk_key)" != "A" ];then
	 		sed -i "/^<psk_key>/s/?undefined?/$pin/g" $1
	 	else
	 		echo "no psk key rule matched!" > /dev/console		
	 	fi		 		 	
}

private_wan_valid_check()
{
		echo "private_wan_valid check start---" >/dev/console
   		local pppoe4_username=$(grep -w PPPOE4_username $2 |cut -d ":" -f 2 | tr -d "\r")
		local pppoe4_password=$(grep -w PPPOE4_password $2 |cut -d ":" -f 2 | tr -d "\r")
		local static_ip=$(grep -w static_IP4 $2 |cut -d ":" -f 2)
		local static_mask=$(grep -w static_Mask4 $2 |cut -d ":" -f 2)
		local static_gw=$(grep -w static_GW4 $2 |cut -d ":" -f 2)
		local static_dns=$(grep -w static_DNS4 $2 |cut -d ":" -f 2)

		static_ip=`echo $static_ip | tr -d "\r"`
		static_mask=`echo $static_mask | tr -d "\r"`
		static_gw=`echo $static_gw | tr -d "\r"`
		static_dns=`echo $static_dns | tr -d "\r"`
		
		local ret_val=0

		#if both pppoe and static exists, it's abnormal!
		if [ ${#static_ip} -gt 0 ] && [ ${#pppoe4_username} -gt 0 ] && [ ${#pppoe4_password} -gt 0 ] ;then
			echo "[agile_config]Both pppoe and static rule exists! Please check!!!" >/dev/console
			return 1
		fi

		if [ ${#static_ip} -gt 0 ] ;then
			echo "static_ip:$static_ip" >/dev/console
			echo "len:${#static_ip}" >/dev/console
			
			local tmp="require(\"luci.sys.config\").static_ip_validity_check(\"$static_ip\")"
			ret_val=`lua -e "$tmp"`
			echo "ret_val:$ret_val" >/dev/console
			if [ "A$ret_val" != "A0" ];then
				echo "[agile_config] Static IP invalid! Please check!!!" >/dev/console
				return 1
			fi

			
			if [ ${#static_mask} -gt 0 ];then
				tmp="require(\"luci.sys.config\").static_mask_validity_check(\"$static_mask\")"
				ret_val=`lua -e "$tmp"`
				if [ "A$ret_val" != "A0" ];then
					echo "[agile_config] Static MASK invalid! Please check!!!" >/dev/console
					return 1
				fi	
			fi

			
			if [ ${#static_gw} -gt 0 ]; then
				tmp="require(\"luci.sys.config\").static_ip_validity_check(\"$static_gw\")"
				ret_val=`lua -e "$tmp"`
				if [ "A$ret_val" != "A0" ];then
					echo "[agile_config] Static GW invalid! Please check!!!" >/dev/console
					return 1
				fi
			fi

			
			if [ ${#static_dns} -gt 0 ];then
				tmp="require(\"luci.sys.config\").static_ip_validity_check(\"$static_dns\")"
				ret_val=`lua -e "$tmp"`
				if [ "A$ret_val" != "A0" ];then
					echo "[agile_config] Static DNS invalid! Please check!!!" >/dev/console
					return 1
				fi	
			fi

			echo "static ip values verified OK!" >/dev/console
		fi
				
		if [ ${#pppoe4_username} -gt 0 ] && [ ${#pppoe4_password} -gt 0 ];then
			if [ ${#pppoe4_username} -gt 0 ];then
				tmp="require(\"luci.sys.config\").pppoe_validity_check(\"$pppoe4_username\")"
				ret_val=`lua -e "$tmp"`
				if [ "A$ret_val" != "A0" ];then
					echo "[agile_config] PPPOE username invalid! Please check!!!" >/dev/console
					return 1
				fi	
			fi
			
			if [ ${#pppoe4_password} -gt 0 ];then
				tmp="require(\"luci.sys.config\").pppoe_validity_check(\"$pppoe4_password\")"
				ret_val=`lua -e "$tmp"`
				if [ "A$ret_val" != "A0" ];then
					echo "[agile_config] PPPOE password invalid! Please check!!!" >/dev/console
					return 1
				fi	
			fi
			
			echo "[agile_config][pppoe]$pppoe4_username $pppoe4_password" > /dev/console
			
			#check wether the config.bin is set to PPPoE
		 	grep wan_type /tmp/agile_config/config/network |grep "pppoe"
		 	if [ $? -eq 1 ];then
		 		echo "The WAN is not set to PPPoE,please check config.bin settings!" >/dev/console
		 		return 1
		 	fi
			echo "[agile_config][PPPoE]valid check done!" > /dev/console 
		fi
			
		if [ ${#static_ip} -gt 0 ] ;then
		 	echo "[agile_config][static]$static_ip" > /dev/console
		 	#check whether the config.bin is set to static
		 	grep wan_type /tmp/agile_config/config/network |grep "static"
		 	if [ $? -eq 1 ];then
		 		echo "The WAN is not set to Static,please check config.bin settings!" >/dev/console
		 		return 1
		 	fi
			echo "[agile_config][Static]valid check done!" > /dev/console	
		fi

		return 0
}

private_login_password_valid_check()
{
		local login_pwd=$(grep -w "password" $2 |cut -d ":" -f 2 | tr -d "\r")
	
		echo "private_login_password_valid_check:$login_pwd:${#login_pwd}" > /dev/console

		local ret_val=0
		if [ ${#login_pwd} -gt 0 ];then
			local tmp="require(\"luci.sys.config\").login_validity_check(\"$login_pwd\")"
			ret_val=`lua -e "$tmp"`
			if [ "A$ret_val" != "A0" ];then
				echo "[NOTE]Login password invalid!Abort!!!" >/dev/console
				return 1
			fi
		fi
		return 0
}
	
private_ssid_valid_check()
{
		local ssid_2g=$(grep -w "SSID_2G_0" $2 |cut -d ":" -f 2 | tr -d "\r")
		local ssid_2g_guest=$(grep -w "SSID_2G_1" $2 |cut -d ":" -f 2| tr -d "\r")
		local ssid_5g=$(grep -w "SSID_5G_0" $2 |cut -d ":" -f 2| tr -d "\r")
		local ssid_5g_guest=$(grep -w "SSID_5G_1" $2 |cut -d ":" -f 2| tr -d "\r")
		local psk_key=$(grep -w "wirelesskey" $2 |cut -d ":" -f 2| tr -d "\r")
		local change_flag=0

		local ret_val=0
		if [ ${#psk_key} -gt 0 ]; then
			local tmp="require(\"luci.sys.config\").wirelesskey_validity_check(\"$psk_key\")"
			#echo $tmp >/dev/console
			ret_val=`lua -e "$tmp"`
			if [ "A$ret_val" != "A0" ];then
				echo "[NOTE]Wireless key invalid!Abort!!!" >/dev/console
				return 1
			fi	
		fi

		if [ ${#ssid_2g} -gt 0 ];then
			tmp="require(\"luci.sys.config\").wireless_ssid_check(\"$ssid_2g\")"
			ret_val=`lua -e "$tmp"`
			if [ "A$ret_val" != "A0" ];then
				echo "[agile_config] SSID 2G invalid! Please check!!!" >/dev/console
				return 1
			fi	
		fi
		
		if [ ${#ssid_2g_guest} -gt 0 ];then
			tmp="require(\"luci.sys.config\").wireless_ssid_check(\"$ssid_2g_guest\")"
			ret_val=`lua -e "$tmp"`
			if [ "A$ret_val" != "A0" ];then
				echo "[agile_config] SSID 2G GUEST invalid! Please check!!!" >/dev/console
				return 1
			fi	
		fi
		
		if [ ${#ssid_5g} -gt 0 ];then
			tmp="require(\"luci.sys.config\").wireless_ssid_check(\"$ssid_5g\")"
			ret_val=`lua -e "$tmp"`
			if [ "A$ret_val" != "A0" ];then
				echo "[agile_config] SSID 5G invalid! Please check!!!" >/dev/console
				return 1
			fi	
		fi
		
		if [ ${#ssid_5g_guest} -gt 0 ];then
			tmp="require(\"luci.sys.config\").wireless_ssid_check(\"$ssid_5g_guest\")"
			ret_val=`lua -e "$tmp"`
			if [ "A$ret_val" != "A0" ];then
				echo "[agile_config] SSID 5G GUEST invalid! Please check!!!" >/dev/console
				return 1
			fi	
		fi
		
		return 0
}


private_wan_apply()
{
		echo "private_wan_apply start---" >/dev/console
   		local pppoe4_username=$(grep -w PPPOE4_username $2 |cut -d ":" -f 2 | tr -d "\r")
		local pppoe4_password=$(grep -w PPPOE4_password $2 |cut -d ":" -f 2 | tr -d "\r")
		local static_ip=$(grep -w static_IP4 $2 |cut -d ":" -f 2)
		local static_mask=$(grep -w static_Mask4 $2 |cut -d ":" -f 2)
		local static_gw=$(grep -w static_GW4 $2 |cut -d ":" -f 2)
		local static_dns=$(grep -w static_DNS4 $2 |cut -d ":" -f 2)

		static_ip=`echo $static_ip | tr -d "\r"`
		static_mask=`echo $static_mask | tr -d "\r"`
		static_gw=`echo $static_gw | tr -d "\r"`
		static_dns=`echo $static_dns | tr -d "\r"`
			
		if [ ${#pppoe4_username} -gt 0 ] && [ ${#pppoe4_password} -gt 0 ];then
			#apply pppoe rules....
			
			#first we need to use the global config to overwrite the current one.			
			cp /tmp/agile_config/config/network	/etc/config/network
			cp /tmp/agile_config/config/protocol /etc/config/protocol
			
			uci set network.internet.username="$pppoe4_username"
			uci set network.internet.password="$pppoe4_password"
			uci set protocol.pppoe.username="$pppoe4_username"
			uci set protocol.pppoe.password="$pppoe4_password"
			
			uci commit
			cp 	/etc/config/network /tmp/agile_config/config/network
			cp /etc/config/protocol /tmp/agile_config/config/protocol
			echo "[agile_config][PPPoE]set done!" > /dev/console 
			return 0
		fi
			
		if [ ${#static_ip} -gt 0 ] ;then
		 	echo "[agile_config][static]$static_ip" > /dev/console
			#apply static wan ip rules....	
			
			#first we need to use the global config to overwrite the current one.			
			cp /tmp/agile_config/config/network	/etc/config/network
			cp /tmp/agile_config/config/protocol /etc/config/protocol
			
			uci set network.wan.ipaddr=$static_ip
			uci set protocol.static.ipaddr=$static_ip
			
			
			if [ ${#static_mask} -gt 0 ] ;then
				uci set network.wan.netmask=$static_mask
				uci set protocol.static.netmask=$static_mask
			fi	
										
			if [ ${#static_gw} -gt 0 ] ;then	
				uci set network.wan.gateway=$static_gw
				uci set protocol.static.gateway=$static_gw
			fi
						
			if [ ${#static_dns} -gt 0 ] ;then
				uci set network.wan.dns=$static_dns
				uci set protocol.static.pri_dns=$static_dns
			fi	
			
			uci commit
			cp 	/etc/config/network /tmp/agile_config/config/network
			cp /etc/config/protocol /tmp/agile_config/config/protocol
			echo "[agile_config][Static]set done!" > /dev/console	

			return 0
		fi

		return 0
}

private_login_password_apply()
{
		local login_pwd=$(grep -w "password" $2 |cut -d ":" -f 2 | tr -d "\r")
		local login_pwd_encry=

		if [ ${#login_pwd} -gt 0 ];then
			cp /tmp/agile_config/config/accountmgnt /etc/config/accountmgnt
			local tmp="require(\"luci.model.accountmgnt\").agile_config_aes_encrypt(\"$login_pwd\")"
			login_pwd_encry=`lua -e "$tmp"`
			echo $login_pwd_encry > /dev/console
			
			uci set accountmgnt.admin.password=$login_pwd_encry
			uci commit
			cp /etc/config/accountmgnt /tmp/agile_config/config/accountmgnt
			echo "login_pwd ok" > /dev/console
		fi

		return 0
}

wifi_intf_name_get()
{
	local dev=$1
	local type
	local band
	local phy
	local easymesh_support

	config_get type $dev type
	config_get band $dev band
	config_get phy $dev phy
	easymesh_support=`uci get profile.@onemesh[0].easymesh_support -c /etc/profile.d`

	if [ $type = "mtkwifi" ]; then
		if [ $band = "2g" ]; then
			wifi_intf_24g=$phy
			wifi_intf_24g_gst=$(echo $phy | tr 0 1)
			#Error handling in the private_ssid_apply()
			config_get guest $wifi_intf_24g_gst guest
			if [ -z $guest ]; then
				wifi_intf_24g_gst=
			fi
		elif [ $band = "5g" ]; then
			wifi_intf_5g=$phy
			wifi_intf_5g_gst=$(echo $phy | tr 0 1)
			#Error handling in the private_ssid_apply()
			config_get guest $wifi_intf_5g_gst guest
			if [ -z $guest ]; then
				wifi_intf_5g_gst=
			fi
		fi
	fi

	if [ $type = "brcmwifi" ]; then
		if [ $band = "2g" ]; then
			if [ $easymesh_support == "yes" ] ;then
  				wifi_intf_24g=$(echo $phy | sed 's/$/3/g')
			else
				wifi_intf_24g=$(echo $phy | sed 's/$/1/g')
			fi
			wifi_intf_24g_gst=$(echo $phy | sed 's/$/2/g')
			#Error handling in the private_ssid_apply()
			config_get guest $wifi_intf_24g_gst guest
			if [ -z $guest ]; then
				wifi_intf_24g_gst=
			fi
		elif [ $band = "5g" ]; then
			if [ $easymesh_support == "yes" ] ;then
  				wifi_intf_5g=$(echo $phy | sed 's/$/3/g')
			else
				wifi_intf_5g=$(echo $phy | sed 's/$/1/g')
			fi
			wifi_intf_5g_gst=$(echo $phy | sed 's/$/2/g')
			#Error handling in the private_ssid_apply()
			config_get guest $wifi_intf_5g_gst guest
			if [ -z $guest ]; then
				wifi_intf_5g_gst=
			fi
		fi
	fi
}

private_ssid_apply()
{
		local ssid_2g=$(grep -w "SSID_2G_0" $2 |cut -d ":" -f 2 | tr -d "\r")
		local ssid_2g_guest=$(grep -w "SSID_2G_1" $2 |cut -d ":" -f 2| tr -d "\r")
		local ssid_5g=$(grep -w "SSID_5G_0" $2 |cut -d ":" -f 2| tr -d "\r")
		local ssid_5g_guest=$(grep -w "SSID_5G_1" $2 |cut -d ":" -f 2| tr -d "\r")
		local psk_key=$(grep -w "wirelesskey" $2 |cut -d ":" -f 2| tr -d "\r")
		local change_flag=1

		if [ ${#ssid_2g} -gt 0 -o  ${#ssid_2g_guest} -gt 0 -o  ${#ssid_5g} -gt 0 -o  ${#ssid_5g_guest} -gt 0  -o ${#psk_key} -ge 8 ]; then
			change_flag=1
			echo "[agile config] change_flag=1, ssid value need to modify" > /dev/console
		fi

		if [ $change_flag -eq 0 ];then
			echo "[agile config] ssid no change" > /dev/console
			return 0
		fi

		#first we need to use the global config wireless to overwrite the current one.
		#when global.bin does not exist, use the dut config directly.
		if [ $global_exist_flag = "true" ];then
			cp /tmp/agile_config/config/wireless	/etc/config/wireless
		fi

		#We dynamically obtain the wireless interface name through /etc/config/wireless (currently 2g and 5g are supported)
		config_load wireless
		config_foreach wifi_intf_name_get wifi-device

		if [ -z $wifi_intf_24g -o -z wifi_intf_24g_gst -o -z wifi_intf_5g -o -z wifi_intf_5g_gst ]; then
			echo "[agile config] get wireless interface name error!! exit!"
			return 1
		fi

		if [ ${#ssid_2g} -gt 0 ] ;then
			uci set wireless.$wifi_intf_24g.ssid="$ssid_2g"
			echo "ssid_2g ok" > /dev/console
		fi
		
		if [ ${#ssid_2g_guest} -gt 0 ] ;then
			uci set wireless.$wifi_intf_24g_gst.ssid="$ssid_2g_guest"
			echo "ssid_2g_guest ok" > /dev/console
		fi
		
		if [ ${#ssid_5g} -gt 0 ] ;then
			uci set wireless.$wifi_intf_5g.ssid="$ssid_5g"
			echo "ssid_5g ok" > /dev/console
		fi
		
		if [ ${#ssid_5g_guest} -gt 0 ] ;then
			uci set wireless.$wifi_intf_5g_gst.ssid="$ssid_5g_guest"
			echo "ssid_5g_guest ok" > /dev/console
		fi
		
		if [ ${#psk_key} -ge 8 ];then
			uci set wireless.$wifi_intf_24g.psk_key="$psk_key"
			uci set wireless.$wifi_intf_24g_gst.psk_key="$psk_key"
			uci set wireless.$wifi_intf_5g.psk_key="$psk_key"
			uci set wireless.$wifi_intf_5g_gst.psk_key="$psk_key"
			echo "psk_key ok" > /dev/console
		fi
				
		uci commit
		cp /etc/config/wireless /tmp/agile_config/config/wireless

		return 0
}

#return 0 means OK;return 1 means fail;
check_mac_bin_validation()
{
 		grep -w "password\|SSID_2G_0\|SSID_2G_1\|SSID_5G_0\|SSID_5G_0\|wirelesskey\|PPPOE4_username\|PPPOE4_password\|static_IP4\|static_Mask4\|static_GW4\|static_DNS4" $2
 		[ $? = 1 ] && echo "No vaild private key value in MAC.bin!!!Abort!!!" >/dev/console && return 1

		#wan type valid check
		private_wan_valid_check $1 $2
		if [ $? = 1 ];then
			return 1
		fi
				
		#login password rsa valid check
		private_login_password_valid_check $1 $2
		if [ $? = 1 ];then
			return 1
		fi
				
		#ssid valid check		
		private_ssid_valid_check $1 $2
		if [ $? = 1 ];then
			return 1
		fi

 		return 0
}

private_rule_apply()
{
		#remove the ^M char at the end of each line! note there is a '0x0d' after 's/
		sed -i 's/^M//g' $2
								
		#pppoe rule apply
		private_wan_apply $1 $2
		if [ $? = 1 ];then
			return 1
		fi
				
		#login password rsa encrypt and save...
		private_login_password_apply $1 $2
		if [ $? = 1 ];then
			return 1
		fi
				
		#ssid apply		
		private_ssid_apply $1 $2	
		if [ $? = 1 ];then
			return 1
		fi

		return 0
}

write_file_to_flash()
{
		local filename=$1
		local filepartition=$2
		echo "agile config write file to flash..." > /dev/console
		local file_size=$(ls -l /tmp/$filename |awk '{print $5}')
		if [ $file_size -gt 6144 ];then
			echo "[agile config] $filename file size too big:$file_size" > /dev/console
			return 1
		fi

		#erase partition
		nvrammanager -e -p  $filepartition
		#write file to partition
		nvrammanager -w /tmp/$filename -p $filepartition >/dev/console

		echo "agile config write $filepartition done" >/dev/console

		rm -f $filename
    		return 0							
}

check_accoungmgnt()
{
		if [ ! -s /tmp/agile_config/config/accountmgnt ];then
			uci delete accountmgnt.admin.password
			uci commit
			cp  /etc/config/accountmgnt /tmp/agile_config/config/accountmgnt
		fi
} 


modify_agileconfig()
{
	#first we need to use the global config to overwrite the current one.			
	cp /tmp/agile_config/config/factory	/etc/config/factory

	uci set factory.agileconfig.enable="no"
	uci commit

	cp /etc/config/factory /tmp/agile_config/config/factory
	echo "agile_config set done, agile config won't be set repeatedly!" > /dev/console 
}


#prevent partitions from being modified
no_write_partitions()
{
	#use this lock to prevent saving config...
	touch /var/run/switch_mode.lock
}

#############################################################################################
#here is the steps for aglie config procedue
#############################################################################################

#[prepare check] whether the sysmode is router 
if [ $(uci get sysmode.sysmode.mode) != "router" ];then
	echo "[Agile config]The sysmode is $(uci get sysmode.sysmode.mode),agileconfig has been supported! Exit!!!" >/dev/console
	return 1
fi

#[prepare check] whether agileconfig has been configured
echo "agile config the agileconfig.enable is $(uci get factory.agileconfig.enable)!" >/dev/console
if [ "A$(uci get factory.agileconfig.enable)" != "Ayes" ];then
	echo "[Agile config]The agileconfig.enable is $(uci get factory.agileconfig.enable),agileconfig has been configured! Exit!!!" >/dev/console
	return 1
fi

#[prepare check] parameters first!
if [ $# -lt 1 ];then
	echo "Please set tftp server ip!" > /dev/console
	return 1
fi

if [ -n $2 ];then
	terminal=$2
fi

#[prepare check] only WAN DHCP can access agile function; l2tp/pptp/pppoe 2nd can't access agile function!
if [ $(uci get network.wan.wan_type) != "dhcp" ];then
	echo "[Agile config]The wan is $(uci get network.wan.wan_type),not dhcp!Exit!!!" >/dev/console
	return 1
fi

#[prepare check] wait until server can be reached!!!
local ret=0
local try_cnt=0
ping -c 1 -w 3 $1
ret=$?
while [ $ret -ne 0 ];do
	sleep 1
	ping -c 1 -w 3 $1
	ret=$?
	
	try_cnt=`expr $try_cnt + 1`
	if [ $try_cnt -gt 5 ];then
		echo "TFTP Server $1 can't be reached!" > /dev/console
		return 1;
	fi
done

#use wanMac to calculate the encryptname
local wanMac=$(uci get network.wan.macaddr)
wanMac=`echo $wanMac | tr -d ":"`
wanMac=`echo $wanMac | tr -d "\r"`
wanMac=`echo $wanMac | tr '[a-z]' '[A-Z]'`
echo "agile config wanMac: $wanMac" >/dev/console

#step 1:get favicon.icon from tftp server:
local faviconName="favicon.ico"
temp="require(\"luci.sys.config\").agile_config_encryptFileName(\"$faviconName\",\"$wanMac\")"
#echo "faviconName temp: $temp" >/dev/console
local encryptFileName=`lua -e "$temp"`
echo "favicon.icon encryptFileName: $encryptFileName" >/dev/console
echo "[agile_config]tftp -gr $encryptFileName -l /tmp/$faviconName $1" > /dev/console
tftp -gr $encryptFileName -l /tmp/$faviconName $1
if [ ! -s /tmp/$faviconName ];then
	echo "[agile_config]try to get /tmp/$faviconName again..." > /dev/console
	tftp -gr $encryptFileName -l /tmp/$faviconName $1
	
	if [ ! -s /tmp/$faviconName ];then
		echo "[agile_config]get tftp $encryptFileName doesn't exist!" > /dev/console
	fi
fi
if [ -s /tmp/$faviconName ];then
	echo "[agile_config]get tftp $encryptFileName exists!" > /dev/console
	write_favicon_flag="true"
fi

#step 2:get logo-icon.png from tftp server:
local logoName="logo-icon.png"
temp="require(\"luci.sys.config\").agile_config_encryptFileName(\"$logoName\",\"$wanMac\")"
#echo "faviconName temp: $temp" >/dev/console
local encryptFileName=`lua -e "$temp"`
echo "logo encryptFileName: $encryptFileName" >/dev/console
echo "[agile_config]tftp -gr $encryptFileName -l /tmp/$logoName $1" > /dev/console
tftp -gr $encryptFileName -l /tmp/$logoName $1
if [ ! -s /tmp/$logoName ];then
	echo "[agile_config]try to get /tmp/$logoName again..." > /dev/console
	tftp -gr $encryptFileName -l /tmp/$logoName $1
	
	if [ ! -s /tmp/$logoName ];then
		echo "[agile_config]get tftp $encryptFileName doesn't exist!" > /dev/console
	fi
fi
if [ -s /tmp/$logoName ];then
	echo "[agile_config]get tftp $encryptFileName  exists!" > /dev/console
	write_logo_flag="true"
fi

#step 3:get global.bin from tftp server:
temp="require(\"luci.sys.config\").agile_config_encryptFileName(\"$config_file\",\"$wanMac\")"
#echo "config file temp: $temp" >/dev/console
local encryptFileName=`lua -e "$temp"`
echo "config file encryptFileName: $encryptFileName" >/dev/console
echo "tftp -gr $encryptFileName -l /tmp/$config_file $1" > /dev/console
tftp -gr $encryptFileName -l /tmp/$config_file $1
if [ ! -s /tmp/$config_file ];then
	echo "try to get tftp file again..." > /dev/console
	tftp -gr $encryptFileName -l /tmp/$config_file $1
	
	if [ ! -s /tmp/$config_file ];then
		echo "get tftp golbal.bin failed!" > /dev/console
		global_exist_flag="false"
	fi
fi

#step 4:get mac.bin from tftp server
local mac=$(getfirm MAC)
mac=`echo $mac | tr -d "-"`
mac=`echo $mac | tr -d "\r"`
mac=`echo $mac | tr '[a-z]' '[A-Z]'`
echo "agile config mac: $mac" >/dev/console

temp="require(\"luci.sys.config\").agile_config_encryptFileName(\"$mac.bin\",\"$wanMac\")"
#echo "mac temp: $temp" >/dev/console
local encryptFileName=`lua -e "$temp"`
echo "mac encryptFileName: $encryptFileName" >/dev/console
echo "[agile_config]tftp -gr $encryptFileName -l /tmp/$mac.bin $1" > /dev/console
tftp -gr $encryptFileName -l /tmp/$mac.bin $1

if [ ! -s /tmp/$mac.bin ];then
	echo "[agile_config]try to get $mac.bin again..." > /dev/console
	tftp -gr $encryptFileName -l /tmp/$mac.bin $1
	
	if [ ! -s /tmp/$mac.bin ];then
		echo "[agile_config]get tftp $mac.bin doesn't exist!" > /dev/console
		macbin_exist_flag="false"
	fi
fi

#step 5:judge whether the files transfer is successful
if [ "$write_favicon_flag" = "true" -o "$write_logo_flag" = "true" -o "$global_exist_flag" = "true" -o "$macbin_exist_flag" = "true" ];then
	config_finish="true"
else
	echo "all file were not transferred successfully! exit!!!" >/dev/console  
	return 1
fi

#step 6:lighting rule, all leds are lit, indicating the Agile Config has started.
if [ "$config_finish" = "true" ];then
	ledcli ALL_LED_ON
fi 

#step 7-0:check png and ico 
if [ "$write_favicon_flag" = "true" ];then
	hexdump -n 4 /tmp/$faviconName |grep "0000 0100"
	if [ $? = 1 ];then
		hexdump -n 4 /tmp/$faviconName |grep "0000 0001"
		if [ $? = 1 ];then
			echo "fav.icon format invalid!!!" >/dev/console
		 	#lighting rule, all leds are off, indicating the Agile Config is failed.
			ledcli ALL_LED_OFF
			return 1
		fi	
	fi
fi

if [ "$write_logo_flag" = "true" ];then
	hexdump -n 4 /tmp/$logoName |grep "8950 4e47"
	if [ $? = 1 ];then
		hexdump -n 4 /tmp/$logoName |grep "5089 474e"
		if [ $? = 1 ];then
			echo "logo.png format invalid!!!" >/dev/console
		 	#lighting rule, all leds are off, indicating the Agile Config is failed.
			ledcli ALL_LED_OFF
			return 1
		fi	
	fi
fi

#step 7:decrypt the config.bin
if [ ! -s /tmp/$config_file ];then
	nvrammanager -r /tmp/$config_file -p default-config
	if [ ! -s /tmp/$config_file ];then
		sleep 1
		echo "get default-config failed! exit!" > /dev/console
		#lighting rule, all leds are off, indicating the Agile Config is failed.
		ledcli ALL_LED_OFF
		return 1
	fi
fi
mv /tmp/$config_file /tmp/config.bin
[ -f $xml_config_file ] && rm $xml_config_file
[ -d /tmp/agile_config ] || mkdir /tmp/agile_config

#lua -e 'require("luci.controller.admin.firmware").config_extract(\"$global_exist_flag\")'
temp="require(\"luci.controller.admin.firmware\").config_extract(\"$global_exist_flag\")"
lua -e "$temp"

if [ -f $xml_config_file ];then
	echo "xml config file extract OK!" > /dev/console
else
	echo "xml config file extract failed!" > /dev/console
	#lighting rule, all leds are off, indicating the Agile Config is failed.
	ledcli ALL_LED_OFF
	return 1
fi
	

#step 8:apply global rule...
if [ $global_exist_flag = "true" ];then
	global_rule_apply $xml_config_file
fi

#step 9:extract xml to config files
[ -d /tmp/agile_config/config ] && rm -rf /tmp/agile_config/config
lua -e 'require("luci.sys.config").xmlToFile("/tmp/agile_config/tmp/user-config.xml","/tmp/agile_config")'

#step 10:check mac.bin whether is valid
if [ -s /tmp/$mac.bin ];then
	#first check mac.bin is a vaild file...
	check_mac_bin_validation $xml_config_file /tmp/$mac.bin
	if [ $? = 1 ];then
		echo "[NOTE]Check mac.bin file Failed!!!Abort!!!" >/dev/console 
		#lighting rule, all leds are off, indicating the Agile Config is failed.
		ledcli ALL_LED_OFF
		return 1
	fi
	
	echo "Apply mac.bin rule---" >/dev/console	
	private_rule_apply $xml_config_file /tmp/$mac.bin
	if [ $? = 1 ] ;then
		echo "[NOTE]Apply mac.bin Failed!!!Abort!!!" >/dev/console  
		#lighting rule, all leds are off, indicating the Agile Config is failed.
		ledcli ALL_LED_OFF
		return 1
	else	
		echo "Apply mac.bin Succeed!" >/dev/console
	fi
fi

#step 11:check whether the accountmgnt exists in the new config...
check_accoungmgnt

#step 12:modify the config, agile config won't be set repeatedly
if [ "$config_finish" = "true" ];then
	modify_agileconfig
fi 

#step 13: convert config files to xml...
rm -f $xml_config_file
lua -e 'require("luci.sys.config").convertFileToXml("/tmp/agile_config/config","/tmp/agile_config/tmp/user-config.xml")'

#step 14:restore
local iconsName="icons.tar"
if [ "$write_favicon_flag" = "true" -a "$write_logo_flag" = "true" ];then
	tar -czf /tmp/$iconsName /tmp/$faviconName /tmp/$logoName
	write_file_to_flash $iconsName $icons_partition
elif [ "$write_favicon_flag" = "true" ];then
	tar -czf /tmp/$iconsName /tmp/$faviconName
	write_file_to_flash $iconsName $icons_partition
elif [ "$write_logo_flag" = "true" ];then
	tar -czf /tmp/$iconsName /tmp/$logoName
	write_file_to_flash $iconsName $icons_partition
fi

if [ "$global_exist_flag" = "true" -o "$macbin_exist_flag" = "true" ];then
	#xml_restore_to_flash
	lua -e 'require("luci.sys.config").agile_saveconfig()'
fi

if [ "$config_finish" = "true" ];then
	#step 15:prevent partitions from being modified
	no_write_partitions

	#step 16:lighting rule, all leds are twinlkle, indicating the Agile Config is successful.
	ledcli ALL_LED_TWINKLE
fi
 
