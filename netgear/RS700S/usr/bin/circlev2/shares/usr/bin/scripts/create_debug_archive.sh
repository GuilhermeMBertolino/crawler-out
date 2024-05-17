#!/bin/sh

print_help_menu()
{
	echo "Usage: create_debug_archive.sh [-C tmpdir] [-f outfile] [-h] [-arDHST]"
	echo "     -C tmpdir     specify path to Circle tmp directory (default /tmp/)"
	echo "     -f outfile    specify filename for output archive (default debug.tgz)"
	echo "     -a            include all optional files (same as [-BDST])"
	echo "     -h            print this help menu"
	echo "     -r            specify calling agent is a router agent"
	echo "     -B            include tracking binary files (DNS history and session table) in archive"
	echo "     -D            include debug session logs in archive"
	echo "     -S            include settings binary files (device settings and custom filters) in archive"
	echo "     -T            include compatibility test results in archive"
}

unset CIRCLE_TMP_DIR
CIRCLE_TMP_DIR="/tmp"
OUT_FILE="debug.tgz"
TRACKING_FILES_FLAG=0
DEBUG_SESSIONS_FLAG=0
SETTINGS_FLAG=0
TESTS_FLAG=0
IS_ROUTER_AGENT=0

while getopts "C:f:ahrBDST" opt; do
	case "$opt" in
	C) CIRCLE_TMP_DIR=$OPTARG ;;
	a) TRACKING_FILES_FLAG=1
	   DEBUG_SESSIONS_FLAG=1
	   SETTINGS_FLAG=1
	   TESTS_FLAG=1 ;;
	f) OUT_FILE=$OPTARG ;;
	h) print_help_menu 
	   exit 0 ;;
	r) IS_ROUTER_AGENT=1 ;;
	B) TRACKING_FILES_FLAG=1 ;;
	D) DEBUG_SESSIONS_FLAG=1 ;;
	S) SETTINGS_FLAG=1 ;;
	T) TESTS_FLAG=1 ;;
	esac
done

DEBUG_DIR="$CIRCLE_TMP_DIR/debug"

[ ! -d "$DEBUG_DIR" ] && {
	echo "debug directory not found: $DEBUG_DIR"
	exit 1
}

if [ -s $OUT_FILE ] ; then
	echo "removing previous debug files archive: $OUT_FILE ..."
	rm -f $OUT_FILE
fi

DEBUG_FILES_DIR="$DEBUG_DIR/files"
[ -d "$DEBUG_FILES_DIR" ] && {
	echo "removing previous debug files directory: $DEBUG_FILES_DIR ..."
	rm -rf $DEBUG_FILES_DIR
}
echo "creating debug files directory ..."
mkdir $DEBUG_FILES_DIR
[ ! -d "$DEBUG_FILES_DIR" ] && {
	echo "failed to create debug files directory"
	exit 1
}

#Add tmp files
mkdir $DEBUG_FILES_DIR/tmp
cp -rf \
	$CIRCLE_TMP_DIR/CIRCLE* \
	$CIRCLE_TMP_DIR/MAC \
	$CIRCLE_TMP_DIR/iplist \
	$CIRCLE_TMP_DIR/ip6list.txt \
	$CIRCLE_TMP_DIR/dhcp.log \
	$CIRCLE_TMP_DIR/mdns.log \
	$CIRCLE_TMP_DIR/managed_devices.txt \
	$CIRCLE_TMP_DIR/tid_debug.txt \
	$CIRCLE_TMP_DIR/status/ \
	$CIRCLE_TMP_DIR/versions \
	$DEBUG_FILES_DIR/tmp/

if [ "$IS_ROUTER_AGENT" -eq 0 ]; then
	cp -f \
		$CIRCLE_TMP_DIR/resolv.conf.auto \
		$CIRCLE_TMP_DIR/gwmac \
		$CIRCLE_TMP_DIR/networkstatus \
		$CIRCLE_TMP_DIR/eth_connected \
		$CIRCLE_TMP_DIR/battery_percent \
		$CIRCLE_TMP_DIR/flag_* \
		$DEBUG_FILES_DIR/tmp/
fi

#Add session logs if requested
if [ "$DEBUG_SESSIONS_FLAG" -gt 0 ]; then
	cp -rf $DEBUG_DIR/sessions $DEBUG_FILES_DIR/
fi

#Add test results if requested
if [ "$TESTS_FLAG" -gt 0 ]; then
	cp -rf $CIRCLE_TMP_DIR/tests $DEBUG_FILES_DIR/
fi

if [ "$TRACKING_FILES_FLAG" -gt 0 ]; then
	cp -f \
		$CIRCLE_TMP_DIR/dns_history.bin \
		$CIRCLE_TMP_DIR/sessions.bin \
		$DEBUG_FILES_DIR/tmp/
fi

if [ "$SETTINGS_FLAG" -gt 0 ]; then
	cp -f \
		$CIRCLE_TMP_DIR/mmap_devices \
		$CIRCLE_TMP_DIR/mmap_customs \
		$DEBUG_FILES_DIR/tmp/
fi

#Add command output files
mkdir $DEBUG_FILES_DIR/out
ifconfig > $DEBUG_FILES_DIR/out/ifconfig.out
uptime > $DEBUG_FILES_DIR/out/uptime.out
date > $DEBUG_FILES_DIR/out/date.out
iptables -L -v > $DEBUG_FILES_DIR/out/iptables-filter.out
iptables -t nat -L -v > $DEBUG_FILES_DIR/out/iptables-nat.out
ip6tables -L -v > $DEBUG_FILES_DIR/out/ip6tables-filter.out
ip6tables -t nat -L -v > $DEBUG_FILES_DIR/out/ip6tables-nat.out

#archive debug files
tar -czf $OUT_FILE -C $DEBUG_DIR files
rm -rf $DEBUG_FILES_DIR

if [ ! -s $OUT_FILE ] ; then
	echo "failed to create debug.tgz file"
	exit 1
fi

exit 0
