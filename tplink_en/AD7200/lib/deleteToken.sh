#!/bin/sh

#This script is used to delete token when expired.

expired=$1

sleep $expired

[ -f /tmp/cloud/cloud_token ] && rm -f /tmp/cloud/cloud_token

echo "Token expired,delete it." >/dev/console 2>&1