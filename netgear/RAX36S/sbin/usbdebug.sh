#!/bin/sh

USB_DBGLOG_FILE=/tmp/usbdbg_log/usb_debuginfo.log

/sbin/usb_info_collect.sh all $USB_DBGLOG_FILE
