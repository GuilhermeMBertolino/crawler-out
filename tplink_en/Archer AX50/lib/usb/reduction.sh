#!/bin/sh
local enable=$1
local reg_tmp=0x0
local old_gpio2=0x0
if [ "$enable" = "off" ]; then
#		mem -s 0x16c00000 -uw 0x0047421a
		reg_tmp=$(mem -s 0x16c00000 -ud | cut -d : -f 2-)
		old_gpio2=$(($reg_tmp&0x00000004))
		reg_tmp=$(($reg_tmp&0xfffffffb))
		mem -s 0x16c00000 -uw $reg_tmp
		sleep 1
		
		mem -s 0x1a60c020 -uw 0x0400
		sleep 1
		
#		mem -s 0x16c00000 -uw 0x0047421e
		reg_tmp=$(mem -s 0x16c00000 -ud | cut -d : -f 2-)
		reg_tmp=$(($reg_tmp|old_gpio2))
		mem -s 0x16c00000 -uw $reg_tmp
elif [ "$enable" = "on" ]; then
#		mem -s 0x16c00000 -uw 0x0047421a
		reg_tmp=$(mem -s 0x16c00000 -ud | cut -d : -f 2-)
		old_gpio2=$(($reg_tmp&0x00000004))
		reg_tmp=$(($reg_tmp&0xfffffffb))
		mem -s 0x16c00000 -uw $reg_tmp
		sleep 1
		
		mem -s 0x1a60c020 -uw 0x2000
		sleep 1
		
#		mem -s 0x16c00000 -uw 0x0047421e
		reg_tmp=$(mem -s 0x16c00000 -ud | cut -d : -f 2-)
		reg_tmp=$(($reg_tmp|old_gpio2))
		mem -s 0x16c00000 -uw $reg_tmp
fi