#!/bin/sh

usage() {
    echo "Usage: $0 <iface_name>"
}

if [ $# -lt 1 ]; then
    usage
    exit 254
fi

/usr/bin/iwinfo "$1" freqlist | /usr/bin/sed 's/^[ \t\*]*//;s/\.//'| /usr/bin/awk -F' ' '{print $1}'| /usr/bin/tr '\n' ' ' | xargs

