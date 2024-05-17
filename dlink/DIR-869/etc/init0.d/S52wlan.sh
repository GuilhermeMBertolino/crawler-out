#!/bin/sh
echo [$0]: $1 ... > /dev/console

xmldbc -P /etc/services/WIFI/rtcfg.php -V ACTION="INIT" > /var/init_wifi_mod.sh

# restore txbf data from proc
if [ -f "/proc/alpha_nvram" ]; then
  TXBFUPDATE="1"
  exec < /proc/alpha_nvram
  while read line; do
    TXBFCAL=`echo $line | cut -d "=" -f1`
    TXBFVALUE=`devdata get -e $TXBFCAL`
    if [ "$TXBFVALUE" != "0" ]; then
      TXBFUPDATE="0"
      break
    fi
  done

  if [ "$TXBFUPDATE" == "1" ]; then
    exec < /proc/alpha_nvram
    while read line; do
	  devdata set -e $line
    done
  fi
fi

nvram set emf_enable=1

##2G module uses PCIe_0

#implict txbf calibration data for 2G
#nvram set 1:rpcal2g=0
#TXBFCAL=`devdata get -e rpcal2g`
#[ "$TXBFCAL" != "" ] && nvram set 1:rpcal2g=$TXBFCAL

##5G band uses PCIe_1

#implict txbf calibration data for 5G band
#TXBFCAL=`devdata get -e rpcal5gb0`
#[ "$TXBFCAL" != "" ] && nvram set 0:rpcal5gb0=$TXBFCAL
#TXBFCAL=`devdata get -e rpcal5gb1`
#[ "$TXBFCAL" != "" ] && nvram set 0:rpcal5gb1=$TXBFCAL
#TXBFCAL=`devdata get -e rpcal5gb2`
#[ "$TXBFCAL" != "" ] && nvram set 0:rpcal5gb2=$TXBFCAL
#TXBFCAL=`devdata get -e rpcal5gb3`
#[ "$TXBFCAL" != "" ] && nvram set 0:rpcal5gb3=$TXBFCAL

#HuanYao: Move calibration to init_wifi_mod.php.

#fix acs would not choose HT80
nvram set acs_no_restrict_align=1


#we only insert wifi modules in init. 
xmldbc -P /etc/services/WIFI/init_wifi_mod.php >> /var/init_wifi_mod.sh
chmod +x /var/init_wifi_mod.sh
/bin/sh /var/init_wifi_mod.sh

#initial wifi interfaces
service PHYINF.WIFI restart
#workaroud for wifi security issue
xmldbc -t "PHYINF.WIFI:5:service PHYINF.WIFI restart"
