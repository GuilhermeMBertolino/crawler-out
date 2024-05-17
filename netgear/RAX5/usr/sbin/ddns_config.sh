#!/bin/sh

DDNS_CONFIG_CHANGED="/var/ddnsconfigchanged"

# touch one temporary file for DDNS update script file use and force do ip update if DDNS config is changed
touch $DDNS_CONFIG_CHANGED

