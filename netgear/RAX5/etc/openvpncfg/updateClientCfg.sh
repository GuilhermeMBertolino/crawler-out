#!/bin/sh

. /lib/functions.sh

# get openvpn configuration
config_load openvpn
local tunPort tunProto tapPort tapProto wanName
config_get tunPort openvpn_tun dest_port
config_get tunProto openvpn_tun proto
config_get tapPort openvpn_tap dest_port
config_get tapProto openvpn_tap proto
wanName=$(uci_get_state network inet ifname)

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

DEFSET_DIR="/etc/openvpncfg"
CERT_DIR="/etc/reserve-data/.cert"
KEYS_DIR="/etc/reserve-data/.cert/keys"
OVPN_DIR="/tmp/openvpn"

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

#* ================================================================================================= *#

# WIN-TAP CONF
#* ================ *#
cp ${DEFSET_DIR}/client_tap.ovpn.tmpl ${CERT_DIR}/client_win/client_win.ovpn
sed -i "s/\[PROTO_TYPE\]/proto ${TAP_PROTO}/" ${CERT_DIR}/client_win/client_win.ovpn
sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TAP_PORT}/" ${CERT_DIR}/client_win/client_win.ovpn

# SmartPhone CONF
#* ================ *#
cp ${DEFSET_DIR}/client_tun.ovpn.tmpl ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "s/\[PROTO_TYPE\]/proto ${TUN_PROTO}/" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "s/\[IP_PORT\]/remote ${SERVER_IP} ${TUN_PORT}/" ${CERT_DIR}/smartphone/smartphone.ovpn

sed -i "/ca ca.crt/d" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "/cert rax-client.crt/d" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "/key rax-client.key/d" ${CERT_DIR}/smartphone/smartphone.ovpn
sed -i "/dev-node/d" ${CERT_DIR}/smartphone/smartphone.ovpn

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

