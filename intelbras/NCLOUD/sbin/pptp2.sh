#!/bin/sh

PPTP_CHAT_FILE=/etc_ro/ppp/chap-secrets
PPTP_CONFIG_FILE=/etc_ro/ppp/options
PPTP_FILE=/etc_ro/ppp/peers/pptp

if [ ! -n "$5" ]; then
  echo "insufficient arguments!"
  echo "Usage: $0 <user> <password> <server_ip> <opmode> <optime>"
  exit 0
fi

PPTP_USER_NAME="$1"
PPTP_PASSWORD="$2"
PPTP_SERVER_IP="$3"
PPTP_OPMODE="$4"
PPTP_OPTIME="$5"

#chap
echo \"$PPTP_USER_NAME\" PPTP \"$PPTP_PASSWORD\" \"*\" > $PPTP_CHAT_FILE

#pptp
echo "remotename PPTP" > $PPTP_FILE
echo "pty \"pptp $PPTP_SERVER_IP --nolaunchpppd\"" >> $PPTP_FILE
echo "name $PPTP_USER_NAME" >> $PPTP_FILE
echo "noauth" >> $PPTP_FILE
echo "file /etc_ro/ppp/options" >> $PPTP_FILE
#echo "nodetach" >> $PPTP_FILE
echo "novj" >> $PPTP_FILE

#option
echo "noauth" > $PPTP_CONFIG_FILE  
echo "refuse-eap" >> $PPTP_CONFIG_FILE
echo "refuse-chap" >> $PPTP_CONFIG_FILE
echo "refuse-mschap" >> $PPTP_CONFIG_FILE
echo "lock" >> $PPTP_CONFIG_FILE
echo "nobsdcomp" >> $PPTP_CONFIG_FILE
echo "usepeerdns" >> $PPTP_CONFIG_FILE
echo "require-mppe-128" >> $PPTP_CONFIG_FILE
echo "nomppe-stateful" >> $PPTP_CONFIG_FILE
echo "lcp-echo-interval 20" >> $PPTP_CONFIG_FILE
echo "lcp-echo-failure 3" >> $PPTP_CONFIG_FILE
if [ $PPTP_OPMODE == "KeepAlive" ]; then
	echo "persist" >> $PPTP_CONFIG_FILE
	echo "holdoff $PPTP_OPTIME" >> $PPTP_CONFIG_FILE
elif [ $PPTP_OPMODE == "OnDemand" ]; then
	PPTP_OPTIME=`expr $PPTP_OPTIME \* 60`
	echo "demand" >> $PPTP_CONFIG_FILE
	echo "idle $PPTP_OPTIME" >> $PPTP_CONFIG_FILE
fi
echo "noipdefault" >> $PPTP_CONFIG_FILE  
echo "defaultroute" >> $PPTP_CONFIG_FILE
echo "ipcp-accept-remote" >> $PPTP_CONFIG_FILE
echo "ipcp-accept-local" >> $PPTP_CONFIG_FILE
