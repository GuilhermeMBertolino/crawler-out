#!/bin/sh

#Purpose:
#update ntgrddns_set related parameters from config database

CONFIG=/bin/config

if [ "x$1" = "xclient_id" ];then
	$CONFIG set client_id=$2
else
	$CONFIG set client_key=$2
fi
$CONFIG commit
