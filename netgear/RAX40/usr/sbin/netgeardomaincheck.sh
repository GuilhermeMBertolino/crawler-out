#!/bin/sh
flagfile="/tmp/f_flag.dat"
netgeardomain="/tmp/hosts/netgear"
pidfile="/tmp/netgeardomaincheck.pid"
debugfile="/tmp/netgeardomaincheck.debug"
netgearwebsite="www.netgear.com"
whiteurls="
www.google.com
as.xboxlive.com
tgs.xboxlive.com
macs.xboxlive.com
as.xboxlive.com.local
tgs.xboxlive.com.local
macs.xboxlive.com.local
updates1.netgear.com
captive.apple.com
www.appleiphonecell.com
www.apple.com
www.itools.info
www.ibook.info
www.airport.us
www.thinkdifferent.us
captive.apple.com
clients1.google.com
clients3.google.com
connectivitycheck.gstatic.com
detectportal.firefox.com
connectivitycheck.android.com
armor.netgear.com
ocapi.netgear.com
www.msftncsi.com
amazonaws.com
netgear.com
netgear.net
netgear-devrecog.fing.io
ocapicep-dev.netgear.com
ocapicep-qa.netgear.com
itunes.apple.com
play.google.com
appcom-dev.up.netgear.com
devcom-dev.up.netgear.com
appcom-qa.up.netgear.com
devcom-qa.up.netgear.com
appcom-staging.up.netgear.com
devcom-staging.up.netgear.com
appcom.up.netgear.com
devcom.up.netgear.com
http.fw.updates1.netgear.com
www.google.com
as.xboxlive.com
tgs.xboxlive.com
macs.xboxlive.com
as.xboxlive.com.local
tgs.xboxlive.com.local
macs.xboxlive.com.local
updates1.netgear.com
captive.apple.com
www.appleiphonecell.com
www.apple.com
www.itools.info
www.ibook.info
www.airport.us
www.thinkdifferent.us
captive.apple.com
clients1.google.com
clients3.google.com
connectivitycheck.gstatic.com
detectportal.firefox.com
connectivitycheck.android.com
armor.netgear.com
ocapi.netgear.com
www.msftncsi.com
amazonaws.com
netgear.com
netgear.net
netgear-devrecog.fing.io
ocapicep-dev.netgear.com
ocapicep-qa.netgear.com
itunes.apple.com
play.google.com
appcom-dev.up.netgear.com
devcom-dev.up.netgear.com
appcom-qa.up.netgear.com
devcom-qa.up.netgear.com
appcom-staging.up.netgear.com
devcom-staging.up.netgear.com
appcom.up.netgear.com
devcom.up.netgear.com
http.fw.updates1.netgear.com
http.updates1.netgear.com
connectivity.samsung.com.cn
www.msftconnecttest.com
connectivitycheck.platfrom.hiclould.com
console.netgear.glassboxdigital.io
play.googleapis.com
apple.com
pingid.com
swrve.com
instabug.com
crashlytics.com
firebase.com
firebaseio.com
glassboxdigital.io
glassboxcdn.com
optimizely.com
s3.amazonaws.com
mozilla.cloudflare-dns.com
chrome.cloudflare-dns.com
asnapieu.com
urbanairship.com
ngxcld.com"

outputptr="/dev/null"
if [ -f $debugfile ]; then
   outputptr="/dev/console"
fi

if [ -f $flagfile ] && [ -f $netgeardomain ]; then
  if [ -f $pidfile ]; then
    exit 1
  else
    echo "$$" > $pidfile
	echo "pid is $$" >> $outputptr
  fi
  i=0
  while [ $i -lt 3 ]
    do
	  address=$(nslookup -q=A "$netgearwebsite" | grep -m 3 -A 10 "$netgearwebsite" | awk -F ' ' '{if($1=="Address:"){printf $2;exit}}')
      if [ -n "$address" ]; then
        break
      fi
	  i=$(expr $i + 1)
	  echo "netgeardomaincheck try $i time" >> $outputptr
	  if [ $i -ge 3 ]; then
	    rm $pidfile
		exit 1
	  fi
    done

  for domain in $whiteurls;
    do
      address=$(nslookup -q=A "$domain" | grep -m 3 -A 10 "$domain" | awk -F ' ' '{if($1=="Address:"){printf $2;exit}}')
      if [ -n "$address" ]; then
        echo "$domain=$address" >> $outputptr
        eval "sed -i '/ $domain$/c $address $domain' $netgeardomain"
      fi
    done
  rm $pidfile
  kill -SIGHUP `pidof dnsmasq` #Update the memory record of whitelist hosts in dnsmaq porcess.
fi
if [ -f $pidfile ]; then
  rm $pidfile
fi
