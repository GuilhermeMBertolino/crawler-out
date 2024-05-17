#!/bin/sh

. /lib/functions.sh

ACC_TYPE_AUTO_US(){

    CONFFILE=$1

    echo "push \"route 3.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 4.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 8.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 9.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 14.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 16.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 18.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 23.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 47.128.0.0 255.128.0.0\"" >> ${CONFFILE}
    echo "push \"route 54.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 72.21.192.0 255.255.192.0\"" >> ${CONFFILE}
    echo "push \"route 184.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 69.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 204.245.0.0 255.255.0.0\"" >> ${CONFFILE}
    echo "push \"route 173.224.0.0 255.255.0.0\"" >> ${CONFFILE}
    echo "push \"route 205.251.192.0 255.255.192.0\"" >> ${CONFFILE}
    echo "push \"route 208.85.40.0 255.255.248.0\"" >> ${CONFFILE}
    echo "push \"route 208.79.0.0 255.255.0.0\"" >> ${CONFFILE}
}

ACC_TYPE_AUTO_EU(){

    CONFFILE=$1

    echo "push \"route 57.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 90.0.0.0 255.128.0.0\"" >> ${CONFFILE}
    echo "push \"route 78.192.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 92.128.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 86.192.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 176.128.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 25.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 51.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 86.128.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 53.0.0.0 255.0.0.0\"" >> ${CONFFILE}
    echo "push \"route 84.128.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 93.192.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 176.0.0.0 255.192.0.0\"" >> ${CONFFILE}
    echo "push \"route 151.3.0.0 255.128.0.0\"" >> ${CONFFILE}
}

CHECK_LOCATION(){

    LOCATION=""

    if [ ! -f "/tmp/openvpn/ookla_list" ]; then
        ookla --configurl=http://www.speedtest.net/api/embed/netgear/config -L > /tmp/openvpn/ookla_list
    fi
    
    OOKLALst=`cat /tmp/openvpn/ookla_list | tail -n 1`; echo ${OOKLALst}

    if [[ ${OOKLALst} == *"United States"* ]]; then
        echo "in United States.."
        LOCATION="US"
    elif [[ ${OOKLALst} == *"United Kingdom"* ]]; then
        echo "in United Kingdom.."
        LOCATION="EU"
    elif [[ ${OOKLALst} == *"France"* ]]; then
        echo "in France.."
        LOCATION="EU"
    elif [[ ${OOKLALst} == *"Germany"* ]]; then
        echo "in Germany.."
        LOCATION="EU"
    else
        echo "in unknow.."
        LOCATION=""
    fi

    return ${LOCATION}
}

# get openvpn configuration
config_load openvpn
local tunPort tunProto tapPort tapProto wanName vpnAccessType
config_get tunPort openvpn_tun dest_port
config_get tunProto openvpn_tun proto
config_get tapPort openvpn_tap dest_port
config_get tapProto openvpn_tap proto
wanName=$(uci_get_state network inet ifname)
config_get vpnAccessType global access_type

# get dynamic DNS host name
config_load ddns
local ddnsEnabled lookupHost serviceName
config_get ddnsEnabled myddns_ipv4 enabled
config_get lookupHost myddns_ipv4 lookup_host
config_get serviceName myddns_ipv4 service_name

echo "ddnsEnabled=" $ddnsEnabled
echo "lookupHost=" $lookupHost
echo "serviceName=" $serviceName

echo "openvpn tun port = " $tunPort " proto = " $tunProto
echo "openvpn tap port = " $tapPort " proto = " $tapProto
echo "wan interface name = " $wanName
echo "access_type=" $vpnAccessType

if [ "$ddnsEnabled" == "1"  -a "$lookupHost" != "" ]; then
    SERVER_IP=$lookupHost
    if [ "$serviceName" == "netgear" ]; then
        SERVER_IP=$lookupHost".mynetgear.com"
    fi
else
    SERVER_IP=`ifconfig $wanName 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'`
fi

echo "SERVER_IP = "${SERVER_IP}

TUN_PORT=$tunPort
TUN_PROTO=$tunProto

TAP_PORT=$tapPort
TAP_PROTO=$tapProto

ACC_TYPE=$vpnAccessType

if [ "${ACC_TYPE}" == "allsites" ] || [ "${ACC_TYPE}" == "home" ] || [ "${ACC_TYPE}" == "auto" ]; then
    echo "ACC_TYPE = "${ACC_TYPE}
else
    echo "ACC_TYPE Error!!"
    exit 1
fi

DEFSET_DIR="/etc/openvpncfg"
CERT_DIR="/etc/reserve-data/.cert"
KEYS_DIR="/etc/reserve-data/.cert/keys"
OVPN_DIR="/tmp/openvpn"

BR_LAN_IP=`ifconfig br-lan 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'`
BR_LAN_NET=`echo $BR_LAN_IP | awk -F '.' '{printf $1"."$2"."$3""}'`
SUBNET=`echo $BR_LAN_IP | awk -F '.' '{printf $1"."$2"."$3".0"}'`
if [ "${SUBNET}" == "" ]; then
	BR_LAN_IP="192.168.1.1"
	BR_LAN_NET="192.168.1"
	SUBNET="192.168.1.0"
fi

sh /etc/openvpncfg/ovpncfg-stop.sh $wanName

TMP=`ifconfig | grep tap0`

if [ "${TMP}" == "" ]; then

    br="br-lan"
    tap="tap0"

    for t in $tap; do
        openvpn --mktun --dev $t
    done

    for t in $tap; do
        brctl addif $br $t
    done

    for t in $tap; do
        ifconfig $t 0.0.0.0 promisc up
    done
fi

#* ================================================================================================= *#

cd /etc/

if [ -d "${KEYS_DIR}" ]; then

  echo "Installing cert files in ${CERT_DIR}..."

  cd ${CERT_DIR}

  mkdir -p ${CERT_DIR}/server
  cp -av ${CERT_DIR}/keys/server/* ${CERT_DIR}/server/

  mkdir -p ${CERT_DIR}/client_win
  cp -av ${CERT_DIR}/keys/client/* ${CERT_DIR}/client_win/

  mkdir -p ${CERT_DIR}/smartphone
  cp -av ${CERT_DIR}/keys/client/* ${CERT_DIR}/smartphone/

  mkdir -p ${CERT_DIR}/client_non-win
  cp -av ${CERT_DIR}/keys/client/* ${CERT_DIR}/client_non-win/

  mkdir -p ${CERT_DIR}/client_mac
  cp -av ${CERT_DIR}/keys/client/* ${CERT_DIR}/client_mac/
fi

#* ================================================================================================= *#

mkdir -p ${OVPN_DIR}

cp ${DEFSET_DIR}/server_tun.conf.tmpl ${OVPN_DIR}/server_tun.conf
sed -i "s/\[PORT\]/port ${TUN_PORT}/" ${OVPN_DIR}/server_tun.conf
sed -i "s/\[PROTO_TYPE\]/proto ${TUN_PROTO}/" ${OVPN_DIR}/server_tun.conf
sed -i "s/\[BR_LAN_IP\]/${BR_LAN_IP}/g" ${OVPN_DIR}/server_tun.conf
#sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route ${SUBNET} 255.255.255.0\"/" ${OVPN_DIR}/server_tun.conf

cp ${DEFSET_DIR}/server_tap.conf.tmpl ${OVPN_DIR}/server_tap.conf
sed -i "s/\[PORT\]/port ${TAP_PORT}/" ${OVPN_DIR}/server_tap.conf
sed -i "s/\[PROTO_TYPE\]/proto ${TAP_PROTO}/" ${OVPN_DIR}/server_tap.conf
sed -i "s/\[BR_LAN_IP\]/${BR_LAN_IP}/g" ${OVPN_DIR}/server_tap.conf
sed -i "s/\[BR_LAN_NET\]/${BR_LAN_NET}/g" ${OVPN_DIR}/server_tap.conf
#sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route ${SUBNET} 255.255.255.0\"/" ${OVPN_DIR}/server_tap.conf

#cp ${CERT_DIR}/keys/server/ta.key ${OVPN_DIR}

#* ================================================================================================= *#

# WIN-TAP CONF
#* ================ *#
cp ${DEFSET_DIR}/client_tap.ovpn.tmpl ${CERT_DIR}/client_win/client_win.ovpn
sed -i "s/\[PROTO_TYPE\]/proto ${TAP_PROTO}/" ${CERT_DIR}/client_win/client_win.ovpn
sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TAP_PORT}/" ${CERT_DIR}/client_win/client_win.ovpn
#sed -i "/dev-node/d" ${CERT_DIR}/client_win/client_win.ovpn

# WIN-TUN CONF
#* ================ *#
#cp ${DEFSET_DIR}/client_tun.ovpn.tmpl ${CERT_DIR}/client_win/client_win.ovpn
#sed -i "s/\[PROTO_TYPE\]/proto ${TUN_PROTO}/" ${CERT_DIR}/client_win/client_win.ovpn
#sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TUN_PORT}/" ${CERT_DIR}/client_win/client_win.ovpn
#sed -i "/dev-node/d" ${CERT_DIR}/client_win/client_win.ovpn

#* ================ *#
cp ${DEFSET_DIR}/client_tun.ovpn.tmpl ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "s/\[PROTO_TYPE\]/proto ${TUN_PROTO}/" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TUN_PORT}/" ${CERT_DIR}/smartphone/smartphone.ovpn

sed -i "/ca ca.crt/d" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "/cert rax-client.crt/d" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "/key rax-client.key/d" ${CERT_DIR}/smartphone/smartphone.ovpn
#sed -i "/tls-auth ta.key 1/d" ${CERT_DIR}/smartphone/smartphone.ovpn

echo "key-direction 1" >> ${CERT_DIR}/smartphone/smartphone.ovpn

echo "<ca>"        >> ${CERT_DIR}/smartphone/smartphone.ovpn
cat ${CERT_DIR}/smartphone/ca.crt         >> ${CERT_DIR}/smartphone/smartphone.ovpn
echo "</ca>"       >> ${CERT_DIR}/smartphone/smartphone.ovpn

echo "<cert>"      >> ${CERT_DIR}/smartphone/smartphone.ovpn
cat ${CERT_DIR}/smartphone/rax-client.crt >> ${CERT_DIR}/smartphone/smartphone.ovpn
echo "</cert>"     >> ${CERT_DIR}/smartphone/smartphone.ovpn

echo "<key>"       >> ${CERT_DIR}/smartphone/smartphone.ovpn
cat ${CERT_DIR}/smartphone/rax-client.key >> ${CERT_DIR}/smartphone/smartphone.ovpn
echo "</key>"      >> ${CERT_DIR}/smartphone/smartphone.ovpn

#echo "<tls-auth>"  >> ${CERT_DIR}/smartphone/smartphone.ovpn
#cat ${CERT_DIR}/smartphone/ta.key         >> ${CERT_DIR}/smartphone/smartphone.ovpn
#echo "</tls-auth>" >> ${CERT_DIR}/smartphone/smartphone.ovpn

rm -f ${CERT_DIR}/smartphone/ca.crt
rm -f ${CERT_DIR}/smartphone/rax-client.crt
rm -f ${CERT_DIR}/smartphone/rax-client.key
#rm -f ${CERT_DIR}/smartphone/ta.key

#* ================ *#
cp ${DEFSET_DIR}/client_tun.ovpn.tmpl ${CERT_DIR}/client_non-win/client_non-win.ovpn
sed -i "s/\[PROTO_TYPE\]/proto ${TUN_PROTO}/" ${CERT_DIR}/client_non-win/client_non-win.ovpn
sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TUN_PORT}/" ${CERT_DIR}/client_non-win/client_non-win.ovpn
sed -i "/dev-node/d" ${CERT_DIR}/client_non-win/client_non-win.ovpn

#* ================ *#
cp ${DEFSET_DIR}/client_tap.ovpn.tmpl ${CERT_DIR}/client_mac/client_mac.ovpn
sed -i "s/\[PROTO_TYPE\]/proto ${TAP_PROTO}/" ${CERT_DIR}/client_mac/client_mac.ovpn
sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TAP_PORT}/" ${CERT_DIR}/client_mac/client_mac.ovpn
sed -i "/dev-node/d" ${CERT_DIR}/client_mac/client_mac.ovpn

#* ================ *#
rm ${CERT_DIR}/server/ta.key
rm ${CERT_DIR}/client_win/ta.key
rm ${CERT_DIR}/smartphone/ta.key
rm ${CERT_DIR}/client_non-win/ta.key
rm ${CERT_DIR}/client_mac/ta.key

#* ================ *#
(cd ${CERT_DIR}/client_win && chmod 777 ca.crt rax-client.crt rax-client.key client_win.ovpn)
(cd ${CERT_DIR}/smartphone && chmod 777 smartphone.ovpn)
(cd ${CERT_DIR}/client_non-win && chmod 777 ca.crt rax-client.crt rax-client.key client_non-win.ovpn)
(cd ${CERT_DIR}/client_mac && chmod 777 ca.crt rax-client.crt rax-client.key client_mac.ovpn)

#* ================ *#
(cd ${CERT_DIR} && zip ${OVPN_DIR}/windows ./client_win/*)
(cd ${CERT_DIR} && zip ${OVPN_DIR}/smartphone ./smartphone/*)
(cd ${CERT_DIR} && zip ${OVPN_DIR}/nonwindows ./client_non-win/*)
(cd ${CERT_DIR} && zip ${OVPN_DIR}/client_mac ./client_mac/*)

#* ================================================================================================= *#

if [ "${ACC_TYPE}" == "allsites" ]; then

    echo "Run allsites rules."

    #sed -i "/redirect-gateway/d" ${OVPN_DIR}/server_tun.conf
    #sed -i "/redirect-gateway/d" ${OVPN_DIR}/server_tap.conf

    sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route 0.0.0.0 0.0.0.0\"/" ${OVPN_DIR}/server_tun.conf
    sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route 0.0.0.0 0.0.0.0\"/" ${OVPN_DIR}/server_tap.conf

elif [ "${ACC_TYPE}" == "home" ]; then

    echo "Run home rules."

    sed -i "/redirect-gateway/d" ${OVPN_DIR}/server_tun.conf
    sed -i "/redirect-gateway/d" ${OVPN_DIR}/server_tap.conf

    sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route ${SUBNET} 255.255.255.0\"/" ${OVPN_DIR}/server_tun.conf
    sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route ${SUBNET} 255.255.255.0\"/" ${OVPN_DIR}/server_tap.conf

elif [ "${ACC_TYPE}" == "auto" ]; then

    echo "Run auto rules."

    sed -i "/redirect-gateway/d" ${OVPN_DIR}/server_tun.conf
    sed -i "/redirect-gateway/d" ${OVPN_DIR}/server_tap.conf

    sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route ${SUBNET} 255.255.255.0\"/" ${OVPN_DIR}/server_tun.conf
    sed -i "s/\[PUSH_ROUTE_SUBNET\]/push \"route ${SUBNET} 255.255.255.0\"/" ${OVPN_DIR}/server_tap.conf

    internetStatus=$(uci_get_state network inet up)
    if [ $internetStatus == '1' ]; then
        #Check Location
        LOC=$(CHECK_LOCATION)
        if [ "${LOC}" == "US" ]; then

            ACC_TYPE_AUTO_US ${OVPN_DIR}/server_tun.conf
            ACC_TYPE_AUTO_US ${OVPN_DIR}/server_tap.conf

        elif [ "${LOC}" == "EU" ]; then

            ACC_TYPE_AUTO_EU ${OVPN_DIR}/server_tun.conf
            ACC_TYPE_AUTO_EU ${OVPN_DIR}/server_tap.conf

        fi
    fi
fi

openvpn --cd ${OVPN_DIR} --daemon --config server_tun.conf
openvpn --cd ${OVPN_DIR} --daemon --config server_tap.conf

ps  | grep openvpn
brctl show

