#!/bin/sh

usage()
{
    value_param=""
    [ "$arg_num" -eq 3 ] && value_param=" {value}"
    echo "Usage: $0 {radio index 0|1} {param}${value_param}"
    exit 1
}

arg_num_nvram_append=3
nvram_append()
{
    # Add a ;<val> at the end of the given param
    sed -i "/^$2=/s/$/;$3/" "$1"
}

arg_num_nvram_get=2
nvram_get()
{
    # print only the first value
    sed -n "/^$2=/{s/^$2=//p;q}" "$1"
}

arg_num_nvram_set=3
nvram_set()
{
    # Remove duplicates and update the value (or append it)
    local tmp_dat=$(mktemp "$(dirname "$1")/nvram_set_XXXXXX")
    awk -v seen=0 "/^$2=/ {
        if (seen == 0) {
            print \"$2=$3\";
            seen = 1;
        }
        next;
    }
    { print }
    END {
        if (seen == 0) {
            print \"$2=$3\";
        }
    }" "$1" > "$tmp_dat" || true
    mv "$tmp_dat" "$1"
}

script=$(basename $0)
action=${script%%.sh}
valid_cmds="nvram_append.sh nvram_get.sh nvram_set.sh"

arg_num=-1
is_valid=false
for valid_cmd in $valid_cmds; do
    if [ "$script" = "$valid_cmd" ]; then
        is_valid=true
        eval "arg_num=\$arg_num_$action"
        break
    fi
done
if ! $is_valid; then
    echo "nvram_cmd.sh: invalid cmd ${script}"
    echo "    valid cmds [${valid_cmds}]"
    exit 1
fi

if [ "$#" -ne "$arg_num" ]; then
    echo "Illegal number of parameters"
    usage
fi


radio=`grep radio$1.name /proc/ubnthal/system.info|cut -d = -f 2`
band=$1
shift
case "$radio" in
    MT7603)
        dat_file=/etc/Wireless/RT2860/RT2860.dat
        ;;
    MT7615)
        dat_file=/etc/Wireless/iNIC/iNIC_ap.dat
        ;;
    MT7915)
        dat_file=/etc/wireless/mediatek/mt7915.2.dat
        ;;
    MT7622)
        dat_file=/etc/wireless/mediatek/mt7622.1.dat
        ;;
    MT7981)
        dat_file=/etc/wireless/mediatek/mt7981.dbdc.b$band.dat
        ;;
    *)
        usage
        exit 1
esac
$action "$dat_file" "$@"
