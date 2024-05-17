#!/bin/sh

#For Netgear wizard function, remove the wizard configuration. 
#file="/opt/vendor/www2/lighttpd4.conf"
dnsmasqFile="/overlay/etc/dnsmasq.conf"
multiLangVerFile="/overlay/opt/vendor/www2/langver.dat"
multiLangVerDataFile="/overlay/opt/vendor/www2/langtable.dat"
dlnaFile="/overlay/etc/config/minidlna"
upnpFile="/overlay//etc/config/upnpd"
systemFile="/overlay/etc/config/system"
lighttpdFile="/overlay/opt/vendor/www2/lighttpd4.conf"
PSDFile="/overlay/opt/lantiq/wave/images/PSD.bin"
RADebugFile="/overlay/etc/rahardcode.dat"
#wifiRadioscript="/overlay/opt/lantiq/wave/scripts/fapi_wlan_wave_radio_set"
wifiScriptsDir="/overlay/opt/lantiq/wave/scripts/"
xAgentDebugFile="/overlay/etc/xagentdisable.dat"
passwd="/overlay/etc/passwd"
needhash="/overlay/etc/needhash"
dalDir="/overlay/etc/dal"
d2Dir="/overlay/etc/d2"
cfuFile="/overlay/etc/cfu_last_fwpath"
raeFile="/overlay/usr/bin/ntgr_ra_dce"
funjsqDir="/overlay/data/funjsq/"
userspaceCrashDir="/overlay/userspace_crash/"
lighttpdSuUserFile="/overlay/etc/lighttpd/lighttpdsuper.user"
lighttpdAdmUserFile="/overlay/etc/lighttpd/lighttpdadmin.user"
lighttpdGuUserFile="/overlay/etc/lighttpd/lighttpdguest.user"
#RAX40-1237 , generate new certificate for HTTPS SOAP API after factory default .
CertsCheckFirstBoot="/opt/lantiq/etc/.certchk"

#if [ -f "$file" ]
#then
#    sed -i 's/^.*url.redirect = ( "^(\/(?!(ramain.htm/url.redirect = ( "^(\/(?!(ramain.htm/g' "$file"; sync; sleep 1;
#fi
if [ -f "$dnsmasqFile" ]
then
    rm -f "$dnsmasqFile"; 
fi

if [ -f "$multiLangVerFile" ]
then
    rm -f "$multiLangVerFile";
    rm -f "$multiLangVerDataFile"; 
fi

if [ -f "$dlnaFile" ]
then
    rm -f "$dlnaFile";
fi

if [ -f "$upnpFile" ]
then
    rm -f "$upnpFile";
fi

if [ -f "$systemFile" ]
then
    rm -f "$systemFile"; 
fi

if [ -f "$lighttpdFile" ]
then
    rm -f "$lighttpdFile";
fi

if [ -f "$PSDFile" ]
then
    rm -f "$PSDFile";
fi

if [ -f "$RADebugFile" ]
then
    rm -f "$RADebugFile";
fi

if [ -f "$xAgentDebugFile" ]
then
    rm -f "$xAgentDebugFile";
fi

#if [ -f "$wifiRadioscript" ]
#then
#    rm -f "$wifiRadioscript";
#fi
if [ -d "$wifiScriptsDir" ]
then
    rm -rf "$wifiScriptsDir";
fi

if [ -f "$passwd" ]
then
    rm -f "$passwd";
fi

if [ -f "$needhash" ]
then
    echo "0" > "$needhash";
fi

if [ -d "$dalDir" ]
then
    rm -irf "$dalDir";
fi

if [ -d "$d2Dir" ]
then
    rm -irf "$d2Dir";
fi


if [ -f "$cfuFile" ]
then
    rm -f "$cfuFile";
fi

if [ -f "$raeFile" ]
then
    rm -f "$raeFile";
fi

if [ -d "$funjsqDir" ]
then
    rm -rf "$funjsqDir";
fi

if [ -d "$userspaceCrashDir" ]
then
    rm -rf "$userspaceCrashDir";
fi

if [ -f "$lighttpdSuUserFile" ]
then
    rm -rf "$lighttpdSuUserFile";
fi

if [ -f "$lighttpdAdmUserFile" ]
then
    rm -rf "$lighttpdAdmUserFile";
fi

if [ -f "$lighttpdGuUserFile" ]
then
    rm -rf "$lighttpdGuUserFile";
fi

rm -f /overlay/etc/fwLastChecked.txt
rm -f /overlay/etc/RA_installByGuiApp

if [ -f "$CertsCheckFirstBoot" ]
then
    rm -rf "$CertsCheckFirstBoot";
    #generate new certificate when time synchronized
    scapiutil get_key;
fi


/opt/lantiq/usr/sbin/readycloud_nvram restore

sync; sleep 1;

source /usr/sbin/factorycfg.sh
