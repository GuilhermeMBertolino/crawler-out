#!/bin/sh

#This script is used to delete token when expired.

expired=$1

sleep $expired

[ -f /tmp/cloud/dst_token ] && rm -f /tmp/cloud/dst_token

echo "DstToken expired,delete it." >/dev/console 2>&1