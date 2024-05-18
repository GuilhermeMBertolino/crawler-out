#!/bin/sh

#This script is used to delete tm signature token when expired.

expired=$1

sleep $expired

[ -f /tmp/cloud/tm_sig_token ] && rm -f /tmp/cloud/tm_sig_token

echo "TM Signature token expired, delete it." >/dev/console 2>&1