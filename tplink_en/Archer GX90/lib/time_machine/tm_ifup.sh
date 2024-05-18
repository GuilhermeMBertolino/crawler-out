#!/bin/sh

flock -x -w 10 "/var/run/tm_checkrun.lock" -c "/usr/sbin/tm_checkrun"

