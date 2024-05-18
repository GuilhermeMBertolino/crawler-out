#!/bin/sh

#This script is used to delete token when expired.

expired=$1

sleep $expired

[ -f /tmp/cloud/vendor_token ] && rm -f /tmp/cloud/vendor_token

echo "VendorToken expired,delete it." >/dev/console 2>&1