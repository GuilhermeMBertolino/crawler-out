#!/bin/sh
#
# script file for traffic control (QoS)
#
WAN=eth2.2
WAN2=
BRIDGE=br0
wanConnectionMode=`nvram_get 2860 wanConnectionMode`
OperationMode=`nvram_get 2860 OperationMode`
QosEnable=`nvram_get 2860 QosEnable`
AutoUplinkSpeed=`nvram_get 2860 AutoUplinkSpeed`
ManualUplinkSpeed=`nvram_get 2860 ManualUplinkSpeed`
AutoDownlinkSpeed=`nvram_get 2860 AutoDownlinkSpeed`
ManualDownlinkSpeed=`nvram_get 2860 ManualDownlinkSpeed`
#curNum=`nvram_get QosRules | grep ";" | wc -l`
QosRulesNum=`nvram_get QosRules | tr ";" "\n" | wc -l`


#OperationMode br mode=0 gw mode=1 wisp mode=3 
# if wireless ISP mode , set WAN to apcli0
if [ "$OperationMode" = '3' ];then
	WAN=apcli0
fi

if [ $wanConnectionMode = "PPPOE" ] || [ $wanConnectionMode = "PPTP" ]; then
  WAN=ppp0
fi

if [ $wanConnectionMode = "L2TP" ]; then
  WAN2=ppp0
fi


## for "mode" field of QOS_RULE_TBL
## 		guaranteed minimum bandwidth	0x01
##		restricted maximum bandwidth	0x02
##		by IP address					0x04
##		by MAC address				0x08

iptables -F -t mangle
iptables -X -t mangle
iptables -Z -t mangle

# To avoid rule left when wan changed
tc qdisc del dev eth2.2 root 2> /dev/null
tc qdisc del dev ppp0 root 2> /dev/null

if [ "$WAN" != "eth2.2" ] && [ "$WAN" != "ppp0" ]; then
  tc qdisc del dev $WAN root 2> /dev/null
fi

tc qdisc del dev $BRIDGE root 2> /dev/null

## this line is in firewall.sh, run it again because mangle table is cleared before.
#iptables -t mangle -I PREROUTING -i $BRIDGE -j MARK --set-mark 5


#PROC_QOS="0,"

UPLINK_SPEED=102400
DOWNLINK_SPEED=102400

# do not edit the next line
if [ "$QosEnable" = '1' ];then

    ###### uplink speed
    if [ "$AutoUplinkSpeed" = '0' ];then
        UPLINK_SPEED=$ManualUplinkSpeed
    	  if [ $UPLINK_SPEED -lt 100 ];then
	      UPLINK_SPEED=100
    	  fi
    fi

    ## Patch for uplink QoS accuracy
    if [ "$CONFIG_RTL_8198_GW" = "y" ]; then
          if [ $UPLINK_SPEED -gt 160000 ]; then
              UPLINK_SPEED=160000
          fi
    else
          if [ $UPLINK_SPEED -gt 100000 ]; then
                        UPLINK_SPEED=100000
          fi
    fi

    ###### downlink speed
    if [ "$AutoDownlinkSpeed" = '0' ];then
        DOWNLINK_SPEED=$ManualDownlinkSpeed
    	  if [ $DOWNLINK_SPEED -lt 100 ];then
	      DOWNLINK_SPEED=100
    	  fi
    fi

    ## Patch for downlink QoS accuracy
    if [ "$CONFIG_RTL_8198_GW" = "y" ]; then
          if [ $DOWNLINK_SPEED -gt 130000 ]; then
              DOWNLINK_SPEED=130000
          fi
    else
          if [ $DOWNLINK_SPEED -gt 100000 ]; then
              DOWNLINK_SPEED=100000
          fi
    fi

    wan_pkt_mark=13
    lan_pkt_mark=53



    ###### total bandwidth section
    ### uplink
    tc qdisc add dev $WAN root handle 2:0 htb default 2 r2q 64                   
    TC_CMD="tc class add dev $WAN parent 2:0 classid 2:1 htb rate ${UPLINK_SPEED}kbit ceil ${UPLINK_SPEED}kbit quantum 30000"
    $TC_CMD
    #echo $TC_CMD
    TC_CMD="tc class add dev $WAN parent 2:1 classid 2:2 htb rate 1kbit ceil ${UPLINK_SPEED}kbit prio 256 quantum 30000"
    $TC_CMD
    #echo $TC_CMD
    TC_CMD="tc qdisc add dev $WAN parent 2:2 handle 102: sfq perturb 10"
    $TC_CMD
    #echo $TC_CMD

    if [ "$WAN2" = "ppp0" ]; then
    tc qdisc add dev $WAN2 root handle 3:0 htb default 2 r2q 64
    TC_CMD="tc class add dev $WAN2 parent 3:0 classid 3:1 htb rate ${UPLINK_SPEED}kbit ceil ${UPLINK_SPEED}kbit quantum 30000"
    $TC_CMD
    #echo $TC_CMD
    TC_CMD="tc class add dev $WAN2 parent 3:1 classid 3:2 htb rate 1kbit ceil ${UPLINK_SPEED}kbit prio 256 quantum 30000"
    $TC_CMD
    #echo $TC_CMD
    TC_CMD="tc qdisc add dev $WAN2 parent 3:2 handle 302: sfq perturb 10"
    $TC_CMD
    #echo $TC_CMD
    fi

    ### downlink
    tc qdisc add dev $BRIDGE root handle 5:0 htb default 2 r2q 64                   
    TC_CMD="tc class add dev $BRIDGE parent 5:0 classid 5:1 htb rate ${DOWNLINK_SPEED}kbit ceil ${DOWNLINK_SPEED}kbit quantum 30000"
    $TC_CMD
    #echo $TC_CMD
    TC_CMD="tc class add dev $BRIDGE parent 5:1 classid 5:2 htb rate 1kbit ceil ${DOWNLINK_SPEED}kbit prio 256 quantum 30000"
    $TC_CMD
    #echo $TC_CMD
    TC_CMD="tc qdisc add dev $BRIDGE parent 5:2 handle 502: sfq perturb 10"
    $TC_CMD
    #echo $TC_CMD

    #PROC_QOS="1,"

    ###### QoS rules section
    if [ $QosRulesNum -gt 0 ];then

        num=1
  
        while [ $num -le $QosRulesNum ];
        do
            
            str=`nvram_get QosRules | cut -f$num -d\;`
						#echo $str
            #str=`echo $str | cut -f2 -d=`
            #enabled=`echo $str | cut -f1 -d,`
            
            if [ $num -gt 0 ];then
            
                ### include leading space character
                mac_addr=``
                mode=`echo $str | cut -f5 -d,`
                lo_ip_start=`echo $str | cut -f1 -d,`
                lo_ip_end=`echo $str | cut -f2 -d,`
                bandwidth=`echo $str | cut -f3 -d,`
                bandwidth_dl=`echo $str | cut -f4 -d,`

                if [ $bandwidth -gt  0 ]; then
                
	                if [ "$mode" = '5' ] || [ "$mode" = '6' ]; then
	
	                    ## this qos rule is set by IP address            	   	
	                    IPT_CMD="iptables -A PREROUTING -t mangle -m iprange --src-range ${lo_ip_start}-${lo_ip_end} -j MARK --set-mark $wan_pkt_mark"  
	                    $IPT_CMD
			    #echo $IPT_CMD
	                    
	                else
	
	                    mac_1=`echo $mac_addr | cut -b 1-2`
	                    mac_2=`echo $mac_addr | cut -b 4-5`
	                    mac_3=`echo $mac_addr | cut -b 7-8`
	                    mac_4=`echo $mac_addr | cut -b 10-11`
	                    mac_5=`echo $mac_addr | cut -b 13-14`
	                    mac_6=`echo $mac_addr | cut -b 16-17`
	                    IPT_CMD="iptables -A PREROUTING -t mangle -m mac --mac-source ${mac_1}:${mac_2}:${mac_3}:${mac_4}:${mac_5}:${mac_6} -j MARK --set-mark $wan_pkt_mark"
	                    $IPT_CMD
	                    #echo $IPT_CMD
	                fi
	
	                if [ "$mode" = '5' ] || [ "$mode" = '9' ]; then
	                    ## "guaranteed minimum bandwidth" mode
	                    TC_CMD="tc class add dev $WAN parent 2:1 classid 2:$wan_pkt_mark htb rate ${bandwidth}kbit ceil ${UPLINK_SPEED}kbit prio 2 quantum 30000"
	                else
	                    TC_CMD="tc class add dev $WAN parent 2:1 classid 2:$wan_pkt_mark htb rate 1kbit ceil ${bandwidth}kbit prio 2 quantum 30000"
	                fi
	                $TC_CMD
			#echo $TC_CMD
	
	                TC_CMD="tc qdisc add dev $WAN parent 2:$wan_pkt_mark handle 1$wan_pkt_mark: sfq perturb 10"
	                $TC_CMD
			#echo $TC_CMD
	
	                TC_CMD="tc filter add dev $WAN parent 2:0 protocol ip prio 100 handle $wan_pkt_mark fw classid 2:$wan_pkt_mark"
	                $TC_CMD
			#echo $TC_CMD

			
			if [ "$WAN2" = "ppp0" ]; then
			if [ "$mode" = '5' ] || [ "$mode" = '9' ]; then
                            ## "guaranteed minimum bandwidth" mode
                            TC_CMD="tc class add dev $WAN2 parent 3:1 classid 3:$wan_pkt_mark htb rate ${bandwidth}kbit ceil ${UPLINK_SPEED}kbit prio 2 quantum 30000"
                        else
                            TC_CMD="tc class add dev $WAN2 parent 3:1 classid 3:$wan_pkt_mark htb rate 1kbit ceil ${bandwidth}kbit prio 2 quantum 30000"
                        fi
                        $TC_CMD
                        #echo $TC_CMD
 
                        TC_CMD="tc qdisc add dev $WAN2 parent 3:$wan_pkt_mark handle 3$wan_pkt_mark: sfq perturb 10"
                        $TC_CMD
                        #echo $TC_CMD
 
                        TC_CMD="tc filter add dev $WAN2 parent 3:0 protocol ip prio 100 handle $wan_pkt_mark fw classid 3:$wan_pkt_mark"
                        $TC_CMD
                        #echo $TC_CMD
			fi
	            
	                wan_pkt_mark=`expr $wan_pkt_mark + 1`

                fi


                if [ $bandwidth_dl -gt  0 ]; then
                
	                if [ "$mode" = '5' ] || [ "$mode" = '6' ]; then
	
	                    ## this qos rule is set by IP address            	   	
	                    IPT_CMD="iptables -A POSTROUTING -t mangle -m iprange --dst-range ${lo_ip_start}-${lo_ip_end} -j MARK --set-mark $lan_pkt_mark"  
	                    $IPT_CMD
			    #echo $IPT_CMD
	                    
	                else

	                    mac_1=`echo $mac_addr | cut -b 1-2`
	                    mac_2=`echo $mac_addr | cut -b 4-5`
	                    mac_3=`echo $mac_addr | cut -b 7-8`
	                    mac_4=`echo $mac_addr | cut -b 10-11`
	                    mac_5=`echo $mac_addr | cut -b 13-14`
	                    mac_6=`echo $mac_addr | cut -b 16-17`
	                    IPT_CMD="iptables -A POSTROUTING -t mangle -m mac --mac-destination ${mac_1}:${mac_2}:${mac_3}:${mac_4}:${mac_5}:${mac_6} -j MARK --set-mark $lan_pkt_mark"
	                    $IPT_CMD
	                    #echo $IPT_CMD
	                fi

	                if [ "$mode" = '5' ] || [ "$mode" = '9' ]; then
	                    ## "guaranteed minimum bandwidth" mode
	                    TC_CMD="tc class add dev $BRIDGE parent 5:1 classid 5:$lan_pkt_mark htb rate ${bandwidth_dl}kbit ceil ${DOWNLINK_SPEED}kbit prio 2 quantum 30000"
	                else
	                    TC_CMD="tc class add dev $BRIDGE parent 5:1 classid 5:$lan_pkt_mark htb rate 1kbit ceil ${bandwidth_dl}kbit prio 2 quantum 30000"
	                fi
	                $TC_CMD
			#echo $TC_CMD
	                TC_CMD="tc qdisc add dev $BRIDGE parent 5:$lan_pkt_mark handle 5$lan_pkt_mark: sfq perturb 10"
	                $TC_CMD
			#echo $TC_CMD
	                TC_CMD="tc filter add dev $BRIDGE parent 5:0 protocol ip prio 100 handle $lan_pkt_mark fw classid 5:$lan_pkt_mark"
	                $TC_CMD
			#echo $TC_CMD
	                lan_pkt_mark=`expr $lan_pkt_mark + 1`

                fi

            fi

            num=`expr $num + 1`
        done    
    fi
fi
localBandwidth.sh
#echo "$PROC_QOS" > /proc/qos

