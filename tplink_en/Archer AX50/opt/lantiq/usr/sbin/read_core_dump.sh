#!/bin/sh

CRASH_DIR='/overlay/userspace_crash'
TEMP_DIR='/tmp/userspace_crash'
CORE_NUM="$(ls -1 $CRASH_DIR | wc -l | awk '{print $1}')"

rm -rf $TEMP_DIR

if [ "$CORE_NUM" > "0" ]; then
	mkdir $TEMP_DIR
	mv $CRASH_DIR/* $TEMP_DIR/
	echo "Following $CORE_NUM Core Dump Files are being sent:"
	ls -1 $TEMP_DIR/
else
	echo "No crash Files"
fi

