# Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.
#
#
# This script is used to make tp-link log of usbmodem
USBMODEM_DEBUG=1
# mod id
USBMODEM_MOD_ID=292
#debug
LOG_MODEM_INFO_ORI=3
LOG_IS_MBIM=4
LOG_MODESWITCH_S=5
LOG_FUZZY_SWITCH=6
LOG_MODESWITCH_FAIL=7
LOG_MODESWITCH_SUCCEED=8
LOG_ALLPORT=19
LOG_ALLPORT_USE=20
LOG_SEARCHPORT_FAIL=21
LOG_START_SCAN_CPORT=22
LOG_SCAN_CPORT_SUCCEED=23
LOG_SCAN_CPORT_FAIL=24
LOG_UNLOCK_PIN=25
LOG_GETISP=26

LOG_PROTO_INIT=32
LOG_PROTO_SETUP=33
LOG_PROTO_TEARDOWN=34
LOG_GET_SIGNAL=35
LOG_RUN_UNLOCKPIN=36

# information
LOG_CARD_PLUGIN=50
LOG_REMOVE_CARD=51

# notice
LOG_HANDLED_TWICE=72
LOG_HANDLEING_TWICE=73
LOG_N_MODESWITCH_SUCCEED=74
LOG_HANDLE_MODEM_SUCCEED=75
LOG_START_CONNECTING=76
# warning


# error
LOG_N_MODESWITCH_FAIL=105
LOG_HANDLE_MODEM_FAIL=106



# log_id log_param
syslog() {
	#if [ $USBMODEM_DEBUG = 1 ];then
		local log_id=$1
		shift
		logx -p $$ $USBMODEM_MOD_ID $log_id "$@"
	#fi
}