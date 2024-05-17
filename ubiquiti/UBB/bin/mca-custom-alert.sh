#!/bin/sh
num_key=0
num_value=0
rc=0
dry=false
json_tmp_file=
json_output=

usage () {
    echo "generate a custom json formate payload and send out the payload as a notification"
    echo "-k: input key.   ex: UAP-arp-table"
    echo "-v: input value. ex: \"\$(cat /proc/net/arp)\""
    echo "-d: dry run, only generate the json payload and will not send out the notification"
    echo "mca-custom-alert.sh -k \"key1\" -v \"value1\" -k \"key2\" -v \"value2\" ..."
}

error_out() {
    logger -p 7 -t "mca-custom-alert" "$*"
    exit 1
}

exit_if_default() {
    [ ! -r /proc/ubnthal/status/IsDefault ] && error_out "ubnthal not found"

    local isDefault=`cat /proc/ubnthal/status/IsDefault`
    [ "$isDefault" == "true" ] && error_out "not sending event in default state"
}

if [ $# -eq 0 ];then
    usage
    exit 0
fi

exit_if_default

json_output="{"
while getopts ":k:v:hdf:" opt; do
    case $opt in
        k)
            num_key=$((num_key+1))
            JSON_KEY=$(echo "$OPTARG" | tr '\n' ' '| sed 's/.$//')
            ;;
        v)
            num_value=$((num_value+1))
            if [ "$num_value" != "$num_key" ];then
                echo "wrong number of the key or the value"
                exit 1
            fi
            JSON_VALUE=$(echo "$OPTARG" | tr '\n' ' '| sed 's/.$//')
            json_output="${json_output}\"${JSON_KEY}\":\"${JSON_VALUE}\","
            ;;
        h)
            usage
            exit 0
            ;;
        f)
            which base64 > /dev/null
            if [ "$?"  -ne 0 ]; then
                echo "No base64 tool"
                exit 1
            fi

            num_value=$((num_value+1))
            if [ "$num_value" != "$num_key" ]; then
                echo "wrong number of the key or the value"
                exit 1
            fi
            JSON_VALUE=`base64 $OPTARG`
            json_output="${json_output}\"${JSON_KEY}\":\"${JSON_VALUE}\","
            ;;
        d)
            dry=true
            ;;
        \?)
            echo "invalid option: -$OPTARG"
            usage
            exit 1
            ;;
    esac
done

if [ "$num_value" != "$num_key" ];then
    echo "wrong number of the key or the value"
    exit 1
fi

json_tmp_file=$(mktemp /tmp/output.XXXXXX)
echo ${json_output} | sed 's/.$/}/' >> ${json_tmp_file}
if [ "$dry" = "true" ]; then
    cat ${json_tmp_file}
    rm ${json_tmp_file}
    exit 0
fi
mca-ctrl -q -t event -f ${json_tmp_file}

if [ "$?" != "0" ]; then
    echo "failed send out the event!"
    rc=1
fi

sleep 1
rm ${json_tmp_file}
exit ${rc}
