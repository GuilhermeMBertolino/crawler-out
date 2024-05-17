#! /bin/sh

touch /tmp/xunyou_ping_result
ping_result=`cat /tmp/xunyou_ping_result`

dni_ping(){
	ping -c 4 www.netgear.com > /tmp/xunyou_ping_result 2>/dev/null
	sleep 5
	ping_result=`cat /tmp/xunyou_ping_result`
}
dni_ping
while [ "x${ping_result}" = "x" ] || [ "x$( echo ${ping_result} | grep "100% packet loss")" != "x" ]
do
	sleep 10
	dni_ping
done

/data/xunyou/xunyou_daemon.sh stop
sleep 3
/data/xunyou/xunyou_daemon.sh start
rm /tmp/xunyou_ping_result
