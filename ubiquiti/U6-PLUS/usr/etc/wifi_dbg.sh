#!/bin/sh

# Wi-Fi debug info dump script

show_usage() (
    echo "Usage: wifi_dbg.sh <options>"
    echo ""
    echo "    -w|--wcid : specific wcid (default: 1)"
    echo "    -m|--mac  : infer wcid by mac address of a client"
    echo "    -e|--end  : how many times we collect information (default: 5)"
    echo "    -h|--help : show help message"
)

resolve_wcid_by_mac() (
    mac="$1"
    # flush dmesg
    dmesg -c > /dev/null
    iwpriv rai0 show stainfo
    out=$(dmesg | grep -i "${mac}" | sed 's/\[[^]]*\]//g' | awk '{print $4}')
    if [ -z "${out}" ]; then
        echo 0
    else
        echo "${out}"
    fi
)

# default config
end=5
wcid=1

# parse arguments
for i in "$@"
do
case "${i}" in
    -w|--wcid)
        wcid="$2"
        shift
        shift
        ;;
    -m|--mac)
        mac="$2"
        shift
        shift
        ;;
    -e|--end)
        end="$2"
        shift
        shift
        ;;
    -h|--help)
        show_usage
        exit 0
esac
done

if [ -z "${wcid+x}" ] && [ -z "${mac+x}" ]; then
    show_usage
    exit 0
fi

if [ -n "${mac}" ]; then
    wcid=$(resolve_wcid_by_mac "${mac}")
    if [ "${wcid}" -eq "0" ]; then
        echo "cannot find ${mac}"
        exit 0
    fi
    echo "mac:${mac} -> wcid:${wcid}"
fi
echo Dump debug info and wcid "${wcid}" for "${end}" sec.

# flush dmesg
dmesg -c > /dev/null

# Run mpstat
mpstat 1 -P ALL &
pid=$!

iwpriv rai0 mac 7C060204
iwpriv rai0 show core_dump

for var in $(seq 1 "${end}");
do
    iwpriv rai0 show stainfo
    iwpriv rai0 stat
    iwpriv rai0 set ResetCounter=0
    iwpriv rai0 show pseinfo
    iwpriv rai0 show pleinfo
    iwpriv rai0 show mibinfo
    iwpriv rai0 show trinfo
    iwpriv rai0 show RuRainfo="${wcid}"-0-0-1
    iwpriv rai0 show eap_stats="${wcid}"
    iwpriv rai0 show fw_dbg_info

    dmesg -c
    sleep 1
done

# kill mpstat
kill -9 "${pid}"
