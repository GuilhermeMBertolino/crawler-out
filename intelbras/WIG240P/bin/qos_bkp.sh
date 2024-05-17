#!/bin/sh
#
# Script for TS.
# Developed by: Marcelo Araujo <araujo@intelbras.com.br>
#
#eth0
echo "TRACE 0"
LAN=eth0
WAN=wlan0

echo "TRACE 1"
eval `flash get QOS_RULE_TBL_NUM`
echo "TRACE 2"

eval `flash get QOS_MANUAL_UPLINK_SPEED`
echo "TRACE 3"

eval `flash get QOS_MANUAL_DOWNLINK_SPEED`
echo "TRACE 4"

#pletsch
eval `flash get QOS_ENABLED`
echo "TRACE 5"

#

# Clean all qdisc
tc qdisc del dev $LAN root 2> /dev/null
echo "TRACE 6"

tc qdisc del dev $WAN root 2> /dev/null
echo "TRACE 7"

if [ $QOS_ENABLED -eq 0 ]; then
	echo "===========>Desabilitando o QoS - regras apagadas"
	exit
fi
# Start qdisc at first with the currently UPLINK value

echo "TRACE 8"
tc qdisc add dev $LAN root handle 1:0 cbq bandwidth ${QOS_MANUAL_DOWNLINK_SPEED}kbit avpkt 1000 cell 8

echo "TRACE 9"
tc qdisc add dev $WAN root handle 2:0 cbq bandwidth ${QOS_MANUAL_UPLINK_SPEED}kbit avpkt 1000 cell 8

echo "TRACE 10"

# Here is the TS rule.
if [ $QOS_RULE_TBL_NUM -gt 0 ];then

echo "TRACE 11"
	num=1
	
echo "TRACE 12"
	while [ $num -le $QOS_RULE_TBL_NUM ];
	do

		echo "TRACE 13"

		str=`flash get QOS_RULE_TBL | grep QOS_RULE_TBL$num`
		str=`echo $str | cut -f2 -d=`
		enabled=`echo $str | cut -f1 -d,`

		if [ $enabled -gt 0 ];then

			priority=`echo $str | cut -f2 -d,`
			priority=`echo $priority | cut -f2 -d" "`
			#debug
			echo "Prioridade = $priority"
			#
			protocol=`echo $str | cut -f3 -d,`
			protocol=`echo $protocolo | cut -f3 -d" "`
			#debug
			echo "Protocolo = $protocol"
			#
			sip=`echo $str | cut -f4 -d,`
			sip=`echo $sip | cut -f4 -d" "`
			#debug
			echo "Src IP = $sip"
			#
			smask=`echo $str | cut -f5 -d,`
			smask=`echo $smask | cut -f5 -d" "`
			#debug
			echo "Src Mask = $smask"
			#
			sspt=`echo $str | cut -f6 -d,`
			sspt=`echo $sspt | cut -f6 -d" "`
			#debug
			echo "Src Port = $sspt"
			#
			sept=`echo $str | cut -f7 -d,`
			sept=`echo $sept | cut -f7 -d" "`
			#debug
			echo "End Port = $sept"
			#
			dip=`echo $str | cut -f8 -d,`
			dip=`echo $dip | cut -f8 -d" "`
			#debug
			echo "Dst IP = $dip"
			#
			dmask=`echo $str | cut -f9 -d,`
			dmask=`echo $dmask | cut -f9 -d" "`
			#debug
			echo "Dst Mask = $dmask"
			#
			dspt=`echo $str | cut -f10 -d,`
			dspt=`echo $dspt | cut -f10 -d" "`
			#debug
			echo "Src Port = $dspt"
			#
			dept=`echo $str | cut -f11 -d,`
			dept=`echo $dept | cut -f11 -d" "`
			#debug			
			echo "End Port = $dept"
			#
			download=`echo $str | cut -f12 -d,`
			download=`echo $download | cut -f12 -d" "`
			wdownload=`expr $download / 10`
			rdownload=`expr $download / 2 + 40`
			#debug
			echo "Down = $download"
			#
			upload=`echo $str | cut -f13 -d,`
			upload=`echo $upload | cut -f13 -d" "`
			wupload=`expr $upload / 10`
			rupload=`expr $upload / 2 + 40`
			#debug
			echo "Up = $upload"
			echo "Dweight = $wdownload"
			echo "Uweight = $wupload"	
			#
			handle=`expr $num + 10`
			#debug
			echo "Handle = $handle"
			#
			###### DOWNLOAD ######
			tc class add dev $LAN parent 1:0 classid 1:$num cbq bandwidth ${download}kbit rate ${rdownload}kbit weight ${wdownload}kbit prio $priority allot 1514 cell 8 maxburst 20 avpkt 1000 bounded 
			tc qdisc add dev $LAN parent 1:$num handle ${handle}: sfq
			tc filter add dev $LAN parent 1:0 protocol ip prio $priority u32 match ip dst $sip flowid 1:$num

			###### UPLOAD ######
			tc class add dev $WAN parent 2:0 classid 2:$num cbq bandwidth ${upload}kbit rate ${rupload}kbit weight ${wupload}kbit prio $priority allot 1514 cell 8 maxburst 20 avpkt 1000 bounded
			tc qdisc add dev $WAN parent 2:$num handle ${handle}: sfq 
			tc filter add dev $WAN parent 2:0 protocol ip prio $priority u32 match ip dst $sip flowid 2:$num
		fi
		num=`expr $num + 1`
	done
fi
####### Global Download #######
###### DOWNLOAD ######
wdownload=`expr $QOS_MANUAL_DOWNLINK_SPEED / 10`
echo "wdownload = $wdownload"
wdownrate=`expr $QOS_MANUAL_DOWNLINK_SPEED / 2 + 10`
echo "wdownrate = $wdownrate"

wupload=`expr $QOS_MANUAL_UPLINK_SPEED / 10`
echo "wupload = $wupload"

wuploadrate=`expr $QOS_MANUAL_UPLINK_SPEED / 2 + 10`
echo "wuploadrate = $wuploadrate"

# LAN
tc class add dev $LAN parent 1:0 classid 1:400 cbq bandwidth ${QOS_MANUAL_DOWNLINK_SPEED}kbit rate ${wdownrate}kbit weight ${wdownrate}kbit prio 8 allot 1514 cell 8 maxburst 20 avpkt 1000 bounded
tc qdisc add dev $LAN parent 1:400 handle 100: sfq
tc filter add dev $LAN parent 1:0 protocol ip prio 8 u32 match ip dst 0/0 flowid 1:400
# WLAN
tc class add dev $WAN parent 2:0 classid 2:400 cbq bandwidth ${QOS_MANUAL_UPLINK_SPEED}kbit rate ${wuploadrate}kbit weight ${wuploadrate}kbit prio 8 allot 1514 cell 8 maxburst 20 avpkt 1000 bounded
tc qdisc add dev $WAN parent 2:400 handle 100: sfq
tc filter add dev $WAN parent 2:0 protocol ip prio 8 u32 match ip dst 0/0 flowid 2:400


