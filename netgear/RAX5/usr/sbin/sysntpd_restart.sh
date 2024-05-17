#!/bin/sh

# Restart NTPD service and regenerate ntp_sync flag if DUT can sync with ntp server

# Remove ntp_sync flag
rm /tmp/ntp_sync

# Restart NTPD service
/etc/init.d/sysntpd restart

