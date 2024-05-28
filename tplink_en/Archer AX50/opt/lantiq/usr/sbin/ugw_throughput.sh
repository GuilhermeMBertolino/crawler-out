#!/bin/sh

interface="eth0_LAN"
delay=5
wan_idx=2
board_id=`cat /proc/cmdline | tr ' ' '\n' | awk -F'=' '/BoardID/{print $2}'`
([ "$board_id" = "0xE6" ] || [ -f /etc/sfp_as_wan ]) && wan_idx=0

usage()
{
        echo "usage: $0 [-i|--interface <interface>] [-d|--delay <delay>] [-h|--help]" 1>&2;
        echo "options -"
        echo " -i|--interface   - interface name"
        echo " -d|--delay       - execution time"
        echo " -h|--help        - show this help"
        exit 1;
}

get_status()
{
	case "$interface" in
        "eth0_1" | "eth0_2" | "eth0_3" | "eth0_4" | "eth0_LAN" )
                tmp=$(echo ${interface:5})
				[ "$tmp" = "LAN" ] && tmp=5
				int=$(($tmp-1))
                rx=$(switch_cli GSW_RMON_PORT_GET nPortId=$int | grep nRxGoodBytes | awk '{print $2}')
                tx=$(switch_cli GSW_RMON_PORT_GET nPortId=$int | grep nTxGoodBytes | awk '{print $2}')
				;;
		"eth1"* )
				str=$(echo $wan_idx > /proc/net/synopsys/showInterfaceCounters; cat /proc/net/synopsys/showInterfaceCounters | awk -F'|' '{if (NF==14){print $5;}}')
				rx=$(echo $str | head -n 1)
				tx=$(echo $str | tail -n 1)
                ;;
        * )
                str=$(ifconfig $interface | grep bytes | awk '{print $2}')
                rx=$(echo ${str:6})
                str=$(ifconfig $interface | grep bytes | awk '{print $6}')
                tx=$(echo ${str:6})
                ;;
	esac
	echo $rx $tx
}

print_func()
{
	local BIT=1
	local KB=$(($BIT * 1024))
	local MB=$(($KB * 1024))

	BW=$(($1 / $MB))
	if [ $BW -gt 1 ]; then
			echo "$BW MB/sec = $(($BW * 8)) Mb/sec"
			return
	fi

	BW=$(($1 / $KB))
	if [ $BW -gt 1 ]; then
			echo "$BW KB/sec = $(($BW * 8)) Kb/sec"
			return
	fi

	echo "$1 Bytes/sec = $(($1 * 8)) bits/sec"
}
while true; do
  case "$1" in
        -i | --interface ) interface=$2; shift 2 ;;
        -d | --delay ) delay=$2; shift 2 ;;
        -h | --help ) usage; shift ;;
        -- ) shift; break ;;
        * ) break ;;
  esac
done

str=$(ifconfig $interface 2< /dev/null)
if [ "$str" = "" ]; then
	echo "ERROR:interface doesn't exist"
        usage
fi

zero=0
if [ "$delay" -le "$zero" ]; then
        echo "ERROR:delay must be a positive integer"
        usage
fi                                                                                          
                                                                                            
echo "start test: interface=$interface, delay=$delay"                                       
                                                                                            
str=$(get_status) 
RX1=$(echo $str | awk '{print $1}')
TX1=$(echo $str | awk '{print $2}')                                                                     
                                                                                                       
sleep $delay                             
            
str=$(get_status)
RX2=$(echo $str | awk '{print $1}')
TX2=$(echo $str | awk '{print $2}')                 

if [ "$RX2" -lt "$RX1" ]  || [  "$TX2" -lt "$TX1" ]; then
	echo "ERROR:test failed"
	usage
fi
                                                                                                
RX=$(($RX2-$RX1))                                                                                      
TX=$(($TX2-$TX1))                                                                                      
                                                                                                       
echo "RX throughput:"
print_func $(($RX / $delay))

echo "TX throughput:"
print_func $(($TX / $delay))
