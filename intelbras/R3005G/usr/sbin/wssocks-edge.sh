#!/bin/sh

wssocks-edge -f $@
nvram set mqtt_sdwan_restart=1
