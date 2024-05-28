#!/bin/sh
#get the service token
TOKEN_PATH="/tmp/cloud/cloud_token_config"
cloud_getDevToken config

get_config(){
    device_token=$(sed -n '1p' "$TOKEN_PATH")
    device_type="WIRELESSROUTER"
    device_id=$(getfirm DEV_ID)
    device_model=$(getfirm MODEL)
    fw_ver=$(getfirm SOFTVERSION)
    url=$(sed -n '2p' "$TOKEN_PATH")
    body_json='{
        "deviceToken": "'"${device_token}"'",
        "deviceType": "'"${device_type}"'",
        "functionNameList": ["speedTest"], 
        "deviceId": "'"${device_id}"'",
        "deviceModel": "'"${device_model}"'",
        "fwVer": "'"${fw_ver}"'"
    }'

    response=$(curl --cacert "/etc/certificate/2048_newroot.cer" \
    --connect-timeout 5 \
    -X POST -H "Content-Type: application/json" \
    -d "${body_json}" "${url}/v1/cloud-config/get-device-configuration")

    echo $response
}

parse_json(){
    
    code=$(echo "$1" | sed -n 's/.*"code":[[:space:]]*\([0-9]\+\).*/\1/p')

    #message=$(echo "$1" | sed -n 's/.*"message":[[:space:]]*"\([^"]*\)".*/\1/p')

    ######################
    ##exception handling##
    ######################
    if [ "$code" -eq 0 ]
    then
        #success
        cache_ttl=$(echo "$1" | sed -n 's/.*"cacheTTLForDevice":[[:space:]]*\([0-9]\+\).*/\1/p')

        is_available=$(echo "$1" | sed -n 's/.*"isServiceAvailable":\([^,}]\+\).*/\1/p')

        exp_time_stamp=$(echo "$1" | sed -n 's/.*"expirationTimestamp":[[:space:]]*\([0-9]\+\).*/\1/p')

        cache_ttl=$((cache_ttl/1000))
        exp_time_stamp=$((exp_time_stamp/1000))
        cache_exp_time=$(($(date +%s)+$cache_ttl))
        exp_time=$(date -u -d "@$exp_time_stamp" +"%Y/%m/%d")
        #save config to flash
        uci set speed_test.service_status.cache_exp_time="${cache_exp_time}"
        uci set speed_test.service_status.is_avail="${is_available}"
        uci set speed_test.service_status.exp_time="${exp_time}"
        uci commit
    else
        echo "error"
    fi
}
if [ ! -f "$TOKEN_PATH" ];
then
    #echo "token does not exist"
    exit 0
else
    response=$(get_config)
    parse_json "$response"
fi