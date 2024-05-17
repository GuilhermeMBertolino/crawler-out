#!/bin/sh

# Remove Bluetopia driver lock file if in result of abnormal program exit it was not removed before

[ $# -eq 1 ] || exit 64
[ -f "$1" ] || exit 65

rm -f "$1"
