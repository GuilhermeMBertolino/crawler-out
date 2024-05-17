#!/bin/sh
#
# Script for TS.
# Developed by: Marcelo Araujo <araujo@intelbras.com.br>
#
#eth0
LAN=eth0
WAN=wlan0

#Habilita modo de debug
DEBUG=0

#Le variaveis de ambiente
eval `flash get QOS_RULE_TBL_NUM`
eval `flash get QOS_MANUAL_UPLINK_SPEED`
eval `flash get QOS_MANUAL_DOWNLINK_SPEED`
eval `flash get QOS_ENABLED`


#Limpa as regras de traffic shaping anteriormente setadas
tc qdisc del dev $LAN root 2> /dev/null
tc qdisc del dev $WAN root 2> /dev/null

#Verifica se o traffic shaping esta habilitado
if [ $QOS_ENABLED -eq 0 ]; then

	if [ $DEBUG -eq 1 ]; then
		echo "===========>Desabilitando o QoS - regras apagadas"
	fi

	exit
fi


#Cria as qdisc root para cada interface de rede
tc qdisc add dev $LAN root handle 1:0 cbq bandwidth 100Mbit avpkt 1000 cell 8

tc qdisc add dev $WAN root handle 2:0 cbq bandwidth 100Mbit avpkt 1000 cell 8


# Here is the TS rule.
if [ $QOS_RULE_TBL_NUM -gt 0 ];then

	if [ $DEBUG -eq 1 ]; then
		echo  "========== Variaveis das Regras LOCAIS ============"
	fi
	
	num=1
	
	while [ $num -le $QOS_RULE_TBL_NUM ];
	do


		str=`flash get QOS_RULE_TBL | grep QOS_RULE_TBL$num`
		str=`echo $str | cut -f2 -d=`
		enabled=`echo $str | cut -f1 -d,`

		if [ $enabled -gt 0 ];then

			priority=`echo $str | cut -f2 -d,`
			priority=`echo $priority | cut -f2 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Prioridade = $priority"
			fi
			
			protocol=`echo $str | cut -f3 -d,`
			protocol=`echo $protocolo | cut -f3 -d" "`
			
			if [ $DEBUG -eq 1 ]; then
				echo "Protocolo = $protocol"
			fi

			sip=`echo $str | cut -f4 -d,`
			sip=`echo $sip | cut -f4 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Src IP = $sip"
			fi

			smask=`echo $str | cut -f5 -d,`
			smask=`echo $smask | cut -f5 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Src Mask = $smask"
			fi

			sspt=`echo $str | cut -f6 -d,`
			sspt=`echo $sspt | cut -f6 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Src Port = $sspt"
			fi

			sept=`echo $str | cut -f7 -d,`
			sept=`echo $sept | cut -f7 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "End Port = $sept"
			fi

			dip=`echo $str | cut -f8 -d,`
			dip=`echo $dip | cut -f8 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Dst IP = $dip"
			fi

			dmask=`echo $str | cut -f9 -d,`
			dmask=`echo $dmask | cut -f9 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Dst Mask = $dmask"
			fi	
		
			dspt=`echo $str | cut -f10 -d,`
			dspt=`echo $dspt | cut -f10 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "Src Port = $dspt"
			fi			

			dept=`echo $str | cut -f11 -d,`
			dept=`echo $dept | cut -f11 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "End Port = $dept"
			fi

			download=`echo $str | cut -f12 -d,`
			download=`echo $download | cut -f12 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "download = $download"
			fi			

			wdownload=`expr $download / 10`
			if [ $DEBUG -eq 1 ]; then
				echo "wdownload = $wdownload"
			fi	
		
			rdownload=`expr $download \* 732 / 1000`
			if [ $DEBUG -eq 1 ]; then
				echo "rdownload = $rdownload"
			fi

			upload=`echo $str | cut -f13 -d,`
			upload=`echo $upload | cut -f13 -d" "`
			if [ $DEBUG -eq 1 ]; then
				echo "upload = $upload"
			fi			

			wupload=`expr $upload / 10`
			if [ $DEBUG -eq 1 ]; then
				echo "wupload = $wupload"
			fi		
	
			rupload=`expr $upload \* 732 / 1000`
			if [ $DEBUG -eq 1 ]; then
				echo "rupload = $rdownload"
			fi
			
			handle=`expr $num + 10`
			if [ $DEBUG -eq 1 ]; then
				echo "Handle = $handle"
			fi
			
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
if [ $DEBUG -eq 1 ]; then
	echo  "========== Variaveis das Regras GLOBAIS ============"
fi


wdownload=`expr $QOS_MANUAL_DOWNLINK_SPEED / 10`
if [ $DEBUG -eq 1 ]; then
	echo "wdownload = $wdownload"
fi

wdownrate=`expr $QOS_MANUAL_DOWNLINK_SPEED \* 732 / 1000`
if [ $DEBUG -eq 1 ]; then
	echo "wdownrate = $wdownrate"
fi

wupload=`expr $QOS_MANUAL_UPLINK_SPEED / 10`
if [ $DEBUG -eq 1 ]; then
	echo "wupload = $wupload"
fi

wuploadrate=`expr $QOS_MANUAL_UPLINK_SPEED \* 732 / 1000`
if [ $DEBUG -eq 1 ]; then
	echo "wuploadrate = $wuploadrate"
fi

# LAN
tc class add dev $LAN parent 1:0 classid 1:400 cbq bandwidth ${QOS_MANUAL_DOWNLINK_SPEED}kbit rate ${wdownrate}kbit weight ${wdownrate}kbit prio 8 allot 1514 cell 8 maxburst 20 avpkt 1000 bounded
tc qdisc add dev $LAN parent 1:400 handle 100: sfq
tc filter add dev $LAN parent 1:0 protocol ip prio 8 u32 match ip dst 0/0 flowid 1:400
# WLAN
tc class add dev $WAN parent 2:0 classid 2:400 cbq bandwidth ${QOS_MANUAL_UPLINK_SPEED}kbit rate ${wuploadrate}kbit weight ${wuploadrate}kbit prio 8 allot 1514 cell 8 maxburst 20 avpkt 1000 bounded
tc qdisc add dev $WAN parent 2:400 handle 100: sfq
tc filter add dev $WAN parent 2:0 protocol ip prio 8 u32 match ip dst 0/0 flowid 2:400


