#!/bin/sh
. /lib/functions.sh
. /usr/share/libubox/jshn.sh

#local wifiGuiRegion_ipLocationCountry_Mapping = {
#["US"] = "US", --United State.
#["AS"] = "US", --America Samoa.
#["GU"] = "US", --Guam.
#["MP"] = "US", --Northern Mariana Islands.
#["PR"] = "US", --Puerto Rico.
#["UM"] = "US", --United States Minor Outlying Islands.
#["VI"] = "US", --Virgin Islands.
#["TW"] = "TW", --Taiwan
#"CA"] = "CA" --Canada
#}

wifiGuiRegion_ipLocationCountry_Mapping() {
    country=$(uci -P /var/state get ipLocation.info.country)

    if [ "$country" == "US" ] || [ "$country" == "AS" ] || [ "$country" == "GU" ] || [ "$country" == "MP" ] || [ "$country" == "PR" ] || [ "$country" == "UM" ] || [ "$country" == "VI" ]; then
        new_region="US"
    elif [ "$country" == "TW" ]; then
        new_region="$country"
    elif [ "$country" == "CA" ]; then
        new_region="$country"
    else
        new_region="CA"
    fi

    echo "$new_region"
}

check_wifi_needToRestart() {
    blank_state=$(uci get netgear.system.blank_state)
    if [ "$blank_state" == "0" ]; then
        new_region=$(wifiGuiRegion_ipLocationCountry_Mapping)
        wifi_region=$(uci get NTGR_WiFi.rax0.wifiRegion)
        if [ "$new_region" != "$wifi_region" ]; then
            echo "geo-location detect region changed ($wifi_region ->$new_region)"> /dev/console
            uci set NTGR_WiFi.ra0.wifiRegion="$new_region"
            uci set NTGR_WiFi.rax0.wifiRegion="$new_region"
            uci commit NTGR_WiFi
            /etc/init.d/wifi restart &
        fi
    fi
}

#$1 is to indicate the WAN connection up or not.
[ "$1" == "0" ] &&
{
    exit
} || {
    sleep 1
    while [ 1 ]
    do
        xagent_id=$(d2 -s xagentcfg[0].x_agent_id)
        xagent_claimCode=$(d2 -s xagentcfg[0].x_agent_claim_code)
        xCloud_reachable=$(ping -c 1 -q devicelocation.ngxcld.com | grep "packets received" | awk -F ' ' '{printf $4}')
        #echo -e "\n\033[31m\$xagent_id=$xagent_id\033[0m\n" > /dev/console ##For debug.
        #echo -e "\n\033[31m\$xagent_claimCode=$xagent_claimCode\033[0m\n" > /dev/console ##For debug.
        #echo -e "\n\033[31m\$xCloud_reachable=$xCloud_reachable\033[0m\n" > /dev/console ##For debug.
        ## PegaBU6, YochengLian, 2022.06.13, also check the devicelocation.ngxcld.com is reachable then doing the geo-location query service. These 3 parameters have timing issue.
        ## We must make sure they are all of ready.
        if [ -n "$xagent_id" ] && [ -n "$xagent_claimCode" ] && [ "$xCloud_reachable" -ge 1 ]; then
            break
        else
            sleep 5
        fi
    done
    #echo "xagent_id=$xagent_id" > /dev/console #for debug.
    #echo "xagent_claimCode=$xagent_claimCode" > /dev/console #for debug.
    ##curl --cacert /opt/xagent/certs/ca-bundle-mega.crt -H "Authorization: SD6HH9E0-3520-318-204135278:N3K9JQDG6EF7XSHH7JYJZ7" https://devicelocation.ngxcld.com/device-location/resolve ##example.
    AuthInfo="Authorization:"$xagent_id":"$xagent_claimCode
    cmd="curl -H $AuthInfo --cacert /opt/xagent/certs/ca-bundle-mega.crt --url https://devicelocation.ngxcld.com/device-location/resolve"
    #$2 is for test/debug purpose, follow SKU_Consolidation_V0.8_5_2022050.pptx page 20, provide console command and let user can "manually input WAN IP address".
    if [ -n "$2" ]; then
        consumerIp="x-Consumer-ip:$2"
        #echo "consumerIp=$consumerIp" > /dev/console #for debug.
        cmd="curl -H $AuthInfo -H $consumerIp --cacert /opt/xagent/certs/ca-bundle-mega.crt --url https://devicelocation.ngxcld.com/device-location/resolve"
    fi
    #echo "cmd=$cmd" > /dev/console #for debug.
    #echo "AuthInfo=$AuthInfo" > /dev/console #for debug.

    ##result example of Netgear device-location resolving service:
    #  "_type": "ExtendedLocation",
    #  "zoneOffset": 28800,
    #  "timeZone": "Asia/Taipei",
    #  "country": "TW",
    #  "region": "HSQ",
    #  "city": "Hsinchu",
    #  "ip": "60.251.203.7",
    #  "isp": "Chunghwa Telecom"
    json_init
    json_load "$($cmd)"

    json_get_var result_country country
    json_get_var result_region region
    json_get_var result_zoneOffset zoneOffset
    json_get_var result_timeZone timeZone
    json_get_var result_city city
    json_get_var result_isp isp
    json_get_var result_publicIp ip

    #echo "result_country=$result_country" > /dev/console #For debug.
    #echo "result_region=$result_region" > /dev/console #For debug.
    #echo "result_zoneOffset=$result_zoneOffset" > /dev/console #For debug.
    #echo "result_timeZone=$result_timeZone" > /dev/console #For debug.
    #echo "result_city=$result_city" > /dev/console #For debug.
    #echo "result_isp=$result_isp" > /dev/console #For debug.
    #echo "result_publicIp=$result_publicIp" > /dev/console #For debug.
    uci -P /var/state revert ipLocation
    uci -P /var/state set ipLocation.info.country="$result_country"
    uci -P /var/state set ipLocation.info.region="$result_region"
    uci -P /var/state set ipLocation.info.zoneOffset="$result_zoneOffset"
    uci -P /var/state set ipLocation.info.timeZone="$result_timeZone"
    uci -P /var/state set ipLocation.info.city="$result_city"
    uci -P /var/state set ipLocation.info.isp="$result_isp"
    uci -P /var/state set ipLocation.info.publicIp="$result_publicIp"

    #Matt, 2022/11/16. Follow Spec to restart Wi-Fi
    if [ -n "$result_country" ]; then
        check_wifi_needToRestart
    fi
    exit
}

