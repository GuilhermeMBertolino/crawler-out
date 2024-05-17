#!/bin/sh
#
# script file to start network
#
# Usage: init.sh {gw | ap} {all | bridge | wan}
#

if [ $# -lt 2 ]; then echo "Usage: $0 {gw | ap} {all | bridge | wan}"; exit 1 ; fi

TOOL=flash
GETMIB="$TOOL get"
LOADDEF="$TOOL default"
LOADDEFSW="$TOOL default-sw"
LOADDS="$TOOL reset"
SET_IP=fixedip.sh
START_DHCP_SERVER=dhcpd.sh
START_DHCP_CLIENT=dhcpc.sh
START_BRIDGE=bridge.sh
START_WLAN=wlan.sh
START_PPPOE=pppoe.sh
START_FIREWALL=firewall.sh
START_WATCHDOG=watchdog.sh
START_WLAN_APP=wlanapp.sh
START_PPTP=pptp.sh
START_NTP=ntp.sh
START_DDNS=ddns.sh
WLAN_PREFIX=wlan
PLUTO_PID=/var/run/pluto.pid

# Query number of wlan interface
WLAN_INTERFACE=
NUM=0

DATA=`ifconfig -a | grep $WLAN_PREFIX`
LINE=`echo $DATA | grep $WLAN_PREFIX$NUM`
NAME=`echo $LINE | cut -b -5`
while [ -n "$NAME" ] 
do
	WLAN_INTERFACE="$WLAN_INTERFACE $WLAN_PREFIX$NUM"
	NUM=`expr $NUM + 1`
	LINE=`echo $DATA | grep $WLAN_PREFIX$NUM`
	NAME=`echo $LINE | cut -b -5`
done
NUM_INTERFACE=$NUM

# Add By Araujo
# A short message to let user know about the boot process.
echo "====> Preparing the environment, wait a little bit."

# See if flash data is valid
$TOOL test-hwconf
if [ $? != 0 ]; then
	echo 'HW configuration invalid, reset default!'
	$LOADDEF
fi

$TOOL test-dsconf
if [ $? != 0 ]; then
	echo 'Default configuration invalid, reset default!'
	$LOADDEFSW
fi

$TOOL test-csconf
if [ $? != 0 ]; then
	echo 'Current configuration invalid, reset to default configuration!'
	$LOADDS
fi

eval `$GETMIB OP_MODE`
eval `$GETMIB WISP_WAN_ID`
if [ $1 = 'ap' ]; then
### bridge (eth0+wlan0) confiuration #########
	GATEWAY='false'
	BR_INTERFACE=br0
	BR_LAN1_INTERFACE=eth0	
	if [ "$OP_MODE" = '1' ];then
		BR_LAN2_INTERFACE=eth1
	fi	
##############################################
fi

if [ $1 = 'gw' ]; then
### gateway (eth0+eth1+wlan0) configuration ##
	GATEWAY='true'
	if [ "$OP_MODE" = '2' ];then
		WAN_INTERFACE=wlan$WISP_WAN_ID
	else
		WAN_INTERFACE=eth1
	fi
	BR_INTERFACE=br0	
	BR_LAN1_INTERFACE=eth0
	if [ "$OP_MODE" = '1' ] || [ "$OP_MODE" = '2' ]; then
		BR_LAN2_INTERFACE=eth1
	fi
##############################################
fi

if [ $2 = 'all' ]; then
	ENABLE_WAN=1
	ENABLE_BR=1
elif [ $2 = 'wan' ]; then
	ENABLE_WAN=1
	ENABLE_BR=0
elif [ $2 = 'bridge' ]; then
	# if WISP mode , restart wan  for pppoe  ,pptp
	if [ "$OP_MODE" = '2' ]; then 
		ENABLE_WAN=1
	else
		ENABLE_WAN=0
	fi
	ENABLE_BR=1
elif [ $2 = 'wlan_app' ]; then
	$START_WLAN_APP start $WLAN_INTERFACE $BR_INTERFACE
	exit 0	
else
	echo "Usage: $0 {all | bridge | wan}"; exit 1
fi


# Set Ethernet 0 MAC address
eval `$GETMIB ELAN_MAC_ADDR`
if [ "$ELAN_MAC_ADDR" = "000000000000" ]; then
	eval `$GETMIB HW_NIC0_ADDR`
	ELAN_MAC_ADDR=$HW_NIC0_ADDR
fi
ifconfig $BR_LAN1_INTERFACE hw ether $ELAN_MAC_ADDR

# Set Ethernet 1 MAC Address for bridge mode and WISP
eval `$GETMIB ELAN_MAC_ADDR`
if [ "$OP_MODE" = '1' ]; then
	if [ "$ELAN_MAC_ADDR" = "000000000000" ]; then
		eval `$GETMIB HW_NIC1_ADDR`
		ELAN_MAC_ADDR=$HW_NIC1_ADDR
	fi
	ifconfig $BR_LAN2_INTERFACE hw ether $ELAN_MAC_ADDR
fi

# Disable DELAY_RX in Ethernet driver when do WIFI test
eval `$GETMIB WIFI_SPECIFIC`
if [  "$WIFI_SPECIFIC" != 0 ]; then
	echo 1 > /proc/eth_flag
fi

#don't setup WAN in bridge mode
if [ "$GATEWAY" = 'true' ] && [ "$OP_MODE" != '1' ] ; then 
	eval `$GETMIB WAN_MAC_ADDR`
	if [ "$WAN_MAC_ADDR" = "000000000000" ]; then
			eval `$GETMIB HW_NIC1_ADDR`
			WAN_MAC_ADDR=$HW_NIC1_ADDR
	fi
	ifconfig $WAN_INTERFACE hw ether $WAN_MAC_ADDR
fi

if [ $ENABLE_WAN = 1 -a "$GATEWAY" = 'true' ]; then  #disconnect all wan  for vpn and wisp
	# stop vpn if enabled
	if [ -f $PLUTO_PID ];then
		ipsec setup stop
	fi	
	killall -9 pptp.sh
	killall -9 pppoe.sh
	rm -f /etc/ppp/first*
	disconnect.sh all
fi

# Start WLAN interface
NUM=0
while [ $NUM -lt $NUM_INTERFACE -a $ENABLE_BR = 1  ]
do
	echo 'Initialize '$WLAN_PREFIX$NUM' interface'
	$TOOL set_mib $WLAN_PREFIX$NUM
	if [ $? != 0 ] ; then
		echo 'Using wlan script...'
		$START_WLAN $WLAN_PREFIX$NUM
	fi
	NUM=`expr $NUM + 1`
done		

# check repeater interface for wlan0
WLAN_INTERFACE_REPEATER=$WLAN_INTERFACE
eval `$GETMIB REPEATER_ENABLED1`
ifconfig wlan0-vxd down
if  [ "$REPEATER_ENABLED1" != 0 ] ;then
	WLAN_INTERFACE_REPEATER="$WLAN_INTERFACE_REPEATER wlan0-vxd"	
fi

# check repeater interface for wlan1
if [ $NUM_INTERFACE -lt 1  ]; then
	ifconfig wlan1-vxd down
	eval `$GETMIB REPEATER_ENABLED2`
	if  [ "$REPEATER_ENABLED2" != 0 ] ;then
		WLAN_INTERFACE_REPEATER="$WLAN_INTERFACE_REPEATER wlan1-vxd"	
	fi
fi	

if [ "$GATEWAY" = 'true' ]; then
	if [ $ENABLE_BR = 1 ]; then
		echo 'Setup BRIDGE interface'
		PIDFILE=/etc/udhcpc/udhcpc-$BR_INTERFACE.pid
		if [ -f $PIDFILE ] ; then
			PID=`cat $PIDFILE`
			if [ $PID != 0 ]; then
				kill -9 $PID
			fi
			rm -f $PIDFILE
		fi
		#kill syslogd and klogd
		killall syslogd
		killall snmpd
		killall klogd
		#Initialize bridge interface
		$START_BRIDGE $BR_INTERFACE $BR_LAN1_INTERFACE $WLAN_INTERFACE_REPEATER $BR_LAN2_INTERFACE
		eval `$GETMIB SCRLOG_ENABLED`
		if [ $SCRLOG_ENABLED != 0 -a $SCRLOG_ENABLED != 2 ] &&
			[ $SCRLOG_ENABLED != 4 -a $SCRLOG_ENABLED != 6 ] &&
			[ $SCRLOG_ENABLED != 8 -a $SCRLOG_ENABLED != 10 ] &&
			[ $SCRLOG_ENABLED != 12 -a  $SCRLOG_ENABLED != 14 ]; then			
			eval `$GETMIB REMOTELOG_ENABLED`
			eval `$GETMIB REMOTELOG_SERVER`
			if [ $REMOTELOG_ENABLED = "1" ] ;then
				SYSLOG_PARA="-R $REMOTELOG_SERVER"
			fi 
			syslogd -L $SYSLOG_PARA &
			/bin/snmpd &
			klogd &
		fi

		# Set fixed IP or start DHCP server
		PIDFILE=/var/run/udhcpd.pid
		if [ -f $PIDFILE ] ; then
			PID=`cat $PIDFILE`
			if [ $PID != 0 ]; then
				kill -9 $PID
	        	fi
        		rm -f $PIDFILE
		fi

		eval `$GETMIB DHCP`
		if [ "$DHCP" = '0' ]; then
			eval `$GETMIB IP_ADDR`
			eval `$GETMIB SUBNET_MASK`
			eval `$GETMIB DEFAULT_GATEWAY`			
			$SET_IP $BR_INTERFACE $IP_ADDR $SUBNET_MASK $DEFAULT_GATEWAY
			$START_WLAN_APP start $WLAN_INTERFACE $BR_INTERFACE		

		elif [ "$DHCP" = '2' ]; then		
			# caculate wait time
			NUM=0
			WAIT_TIME=0
			while [ $NUM -lt $NUM_INTERFACE  ]
			do				
				eval `$GETMIB $WLAN_PREFIX$NUM WDS_ENABLED`				
				if [ "$WDS_ENABLED" != 0 ]; then
					WAIT_TIME=`expr $WAIT_TIME + 5`
				else				
					WAIT_TIME=`expr $WAIT_TIME + 1`
				fi				
				NUM=`expr $NUM + 1`
			done				
			sleep $WAIT_TIME
			
			$START_DHCP_SERVER $BR_INTERFACE gw
			$START_WLAN_APP start $WLAN_INTERFACE $BR_INTERFACE
		fi
	fi

	if [ $ENABLE_WAN = 1 ]; then
		if [ "$OP_MODE" != '1' ];then
			echo 'Setup WAN interface'
		fi		

		# Initialize WAN interface
		# Delete DHCP client process
		DHCPC_WAN="$WLAN_INTERFACE eth1"
		for INTF in $DHCPC_WAN ; do
			PIDFILE=/etc/udhcpc/udhcpc-$INTF.pid
			if [ -f $PIDFILE ] ; then
				PID=`cat $PIDFILE`
				if [ $PID != 0 ]; then
					kill -9 $PID
				fi
				rm -f $PIDFILE
			fi
		done

		PIDFILE=/var/run/dnrd.pid
		if [ -f $PIDFILE ] ; then
			PID=`cat $PIDFILE`
			if [ $PID != 0 ]; then
				kill -9 $PID
	        	fi
        		rm -f $PIDFILE
		fi
		
		eval `$GETMIB WAN_DHCP`
		if [ "$OP_MODE" != '1' ];then  # not bridge mode
			ifconfig $WAN_INTERFACE down
			ifconfig $WAN_INTERFACE up
						
			# Realtek fast pptp forwarding
			if [ $WAN_DHCP = 4 ]; then
				echo "1" > /proc/fast_pptp
			else
				echo "0" > /proc/fast_pptp
			fi						
						
			if [ "$WAN_DHCP" = '0' ]; then
				eval `$GETMIB WAN_IP_ADDR`
				eval `$GETMIB WAN_SUBNET_MASK`
				eval `$GETMIB WAN_DEFAULT_GATEWAY`
				eval `$GETMIB FIXED_IP_MTU_SIZE`				
				$SET_IP $WAN_INTERFACE $WAN_IP_ADDR $WAN_SUBNET_MASK $WAN_DEFAULT_GATEWAY
				ifconfig $WAN_INTERFACE mtu $FIXED_IP_MTU_SIZE					

				# start DNS relay
				eval `$GETMIB DNS1`
				if [ "$DNS1" != '0.0.0.0' ]; then
					DNS="-s $DNS1"
				fi
				eval `$GETMIB DNS2`
				if [ "$DNS2" != '0.0.0.0' ]; then
					DNS="$DNS -s $DNS2"
				fi
				eval `$GETMIB DNS3`
				if [ "$DNS3" != '0.0.0.0' ]; then
					DNS="$DNS -s $DNS3"
				fi
				echo start DNS Relay Daemon
				dnrd $DNS
				upnp.sh
			elif [ "$WAN_DHCP" = '1' ]; then				
				eval `$GETMIB DHCP_MTU_SIZE`
				ifconfig $WAN_INTERFACE mtu $DHCP_MTU_SIZE
				$START_DHCP_CLIENT $WAN_INTERFACE wait&				
				upnp.sh
				
			elif [ "$WAN_DHCP" = '3' ]; then
				echo 'start PPPoE daemon'
				upnp.sh
				$START_PPPOE all $WAN_INTERFACE
			elif [ "$WAN_DHCP" = '4' ]; then
				echo 'start PPTP daemon'
				upnp.sh
				$START_PPTP $WAN_INTERFACE &
			else
				echo 'Invalid DHCP MIB value for WAN interface!'
			fi
		fi

		# enable firewall when static ip
		if [ "$WAN_DHCP" = '0' ] || [ "$OP_MODE" = '1' ]; then
			echo 'Setup Firewall'
			$START_FIREWALL
		fi
		
		#>>pletsch
		# enable ping watchdog.
		echo 'Start PingWatchDog'
		#$START_WATCHDOG
		watchdog.sh&
		#>>

		#>>pletsch inicia SSH Server
		echo 'Start SSH Server'
		dropbear -r /etc/public_key -P /var/run/drop.pid
		#Habilita acesso SSH pela interface WAN
		iptables -I INPUT -i br0 -p tcp --dport 22 -j ACCEPT
		#Habilita acesso SSH pela interface wlan0
		iptables -I INPUT -i wlan0 -p tcp --dport 22 -j ACCEPT
		#
		

		#>>pletsch inicia QOS
		echo 'Start Traffic Shaping'
		qos.sh		
		#

		# By Araujo
		# Set on the first boot the root password to able user login via ssh.
		echo '====> Setup root account for ssh service.'
		sshpwd.sh

		# static ip 	
		if [ -f /bin/vpn.sh ] && [ "$WAN_DHCP" != '4' ] && [ "$OP_MODE" != '1' ] &&  [ "$WAN_DHCP" = '0' ] ; then 
			echo 'Setup VPN'
			vpn.sh all
		fi

		#enable ntp daemon , not brige mode
		if [ "$OP_MODE" != '1' ]; then
			killall $START_NTP > /dev/null
			$START_NTP
			$START_DDNS option &
		fi
                
	fi

else
	# Delete DHCP server/client process
	PIDFILE=/etc/udhcpc/udhcpc-$BR_INTERFACE.pid
	if [ -f $PIDFILE ] ; then
		PID=`cat $PIDFILE`
		if [ $PID != 0 ]; then
			kill -9 $PID
	       	fi
      		rm -f $PIDFILE
	fi

	PIDFILE=/var/run/udhcpd.pid
	if [ -f $PIDFILE ] ; then
		PID=`cat $PIDFILE`
		if [ $PID != 0 ]; then
			kill -9 $PID
       		fi
      		rm -f $PIDFILE
	fi

	#kill syslogd and klogd
	killall syslogd
	killall snmpd
	killall klogd


	if [ "$OP_MODE" = '1' ];then
		$START_BRIDGE $BR_INTERFACE $BR_LAN1_INTERFACE $WLAN_INTERFACE_REPEATER $BR_LAN2_INTERFACE
	else		
		$START_BRIDGE $BR_INTERFACE $BR_LAN1_INTERFACE $WLAN_INTERFACE_REPEATER
	fi
	
	eval `$GETMIB SCRLOG_ENABLED`	
	if [ $SCRLOG_ENABLED != 0 -a $SCRLOG_ENABLED != 2 ] &&
			[ $SCRLOG_ENABLED != 4 -a $SCRLOG_ENABLED != 6 ] &&
			[ $SCRLOG_ENABLED != 8 -a $SCRLOG_ENABLED != 10 ] &&
			[ $SCRLOG_ENABLED != 12 -a  $SCRLOG_ENABLED != 14 ]; then			
		eval `$GETMIB REMOTELOG_ENABLED`
		eval `$GETMIB REMOTELOG_SERVER`
		if [ $REMOTELOG_ENABLED = "1" ] ;then
			SYSLOG_PARA="-R $REMOTELOG_SERVER"
		fi 
		syslogd -L $SYSLOG_PARA &
		/bin/snmpd &
		klogd &
	fi

	eval `$GETMIB DHCP`
	if [ "$DHCP" = '2' ]; then
		sleep 1
		$START_DHCP_SERVER $BR_INTERFACE ap
	fi

	if [ "$DHCP" = '0' ] || [ "$DHCP" = '2' ]; then
		$START_WLAN_APP start $WLAN_INTERFACE $BR_INTERFACE
	fi
fi

# start auto-discovery daemon
#PIDFILE=/var/run/disc_server.pid
#if [ -f $PIDFILE ] ; then
#	PID=`cat $PIDFILE`
#	if [ $PID != 0 ]; then
#		kill -9 $PID
#	fi
#	rm -f $PIDFILE
#fi

#eval `$GETMIB AUTODISCOVERY_ENABLED`
#if [ "$AUTODISCOVERY_ENABLED" != 0 ]; then
#	disc_server $BR_INTERFACE &
#fi
killall reload.sh
reload.sh


########################################################################
#
#  Load Password	
#
#  Descricao:
#  Esta rotina visa restaurar a senha alterada pelo usuario atraves 
#  do comando "passwd" apos o roteador ter sido reiniciado.
#
#  Obs. Para esta rotina funcionar, ela precisa ser a ultima a ser
#       executada, caso contrario, o arquivo "/etc/passwd" sera
#       sobre escrito pela senha padrao, localizada no SDK em
#       "/home/rtl8186/W441a/AP/etc"
#
#  Autor: Leonardo A. Pletsch
#  Data: 04/05/2010  
# 
########################################################################
echo '====> Load password.'

str=`flash get SSH_PASSWD1`

if [ $str != "SSH_PASSWD1=\"\"" ];then 
	
	str=`flash get SSH_PASSWD1`
	str=`echo $str | cut -f2 -d\"`
	echo $str | sed 's/\\//g' > /etc/passwd

	str=`flash get SSH_PASSWD2`
	str=`echo $str | cut -f2 -d\"`
	echo $str >> /etc/passwd
fi	

echo '====> Press <enter>.'
