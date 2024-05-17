#!/bin/sh

# Paths to programs
UVM=/usr/bin/uvm
UO_PATH=/usr/uo/
UO_FILE=dhcp-fwd.conf.uo
UO_CONF=dhcp-fwd.conf

NAT_PATH=/var/nat/

TESTIF=`rdcsman 0x008001000b str`

start() {
	local err; err=0
	   				 
 	[ -z "$TESTIF" ] && return
 	
 	  rm -f /etc/$UO_CONF 
         
   $UVM $UO_PATH/$UO_FILE > /etc/$UO_CONF 
   
 #		if [ -f /var/run/udhcpd.pid ]; then     
 #    		kill `cat /var/run/udhcpd.pid` 
 #   fi
    
    if [ -f /var/run/dhcp-fwd.pid ]; then
    	kill `cat /var/run/dhcp-fwd.pid`
   	 (rm -f /var/run/dhcp-fwd.pid);
    fi
 		
 #		if [ -f $NAT_PATH/tsh_block_wan_pkts_cleaner ]; then 
 #					chmod 775 $NAT_PATH/tsh_block_wan_pkts_cleaner 
 #		     echo " dhcpfw cleaner ==>" >> $NAT_PATH/tsh_debug  
 #       iptables -t nat --list-rules >> $NAT_PATH/tsh_debug 
 #       (. $NAT_PATH/tsh_block_wan_pkts_cleaner);
 #       #(rm -f $NAT_PATH/tsh_block_wan_pkts_cleaner);
 #       echo " <== dhcpfw cleaner" >> $NAT_PATH/tsh_debug  
 #       iptables -t nat --list-rules >> $NAT_PATH/tsh_debug   
 #   fi 
    
    dhcpfwd
}

stop() {
    local err; err=0
    
  	[ ! -f /var/run/dhcp-fwd.pid ] && return
  
#    if [ -f $NAT_PATH/tsh_block_wan_pkts_init ] && [ -f $NAT_PATH/tsh_cleaner ]; then
#   		 chmod 775 $NAT_PATH/tsh_block_wan_pkts_init 
#     echo "dhcp-fwd.sh stop ===> " >> $NAT_PATH/tsh_debug1
#     iptables -t nat --list-rules >> $NAT_PATH/tsh_debug1
#     (. $NAT_PATH/tsh_block_wan_pkts_init);
#	   #(rm -f $NAT_PATH/tsh_block_wan_pkts_init);
#	   echo "<== dhcp-fwd.sh stop " >> $NAT_PATH/tsh_debug1
#     iptables -t nat --list-rules >> $NAT_PATH/tsh_debug1
#    fi
    
    rm -f /etc/$UO_CONF
#   kill `cat /var/run/dhcp-fwd.pid`
	kill $(ps | grep -v grep |grep dhcpfwd |cut -d' ' -f 2)
    (rm -f /var/run/dhcp-fwd.pid);

    return $err
}

usage() {
    echo "$0 [start num|stop|restart]"
    exit 1
}

[ -z "$1" ] && usage;

err=0

case "$1" in
    start)      start;;
    stop)       stop;;
    restart)    stop; start;;
    *)      usage;;
esac

exit $err
