#!/bin/sh

WIFI_2G_IFNAME=wl0
WIFI_5G_IFNAME=wl1
WIFI_5G2_IFNAME=wl2
WIFI_BH_IFNAME=wl2.1


QUERY_LOOP=1
QUERY_5G2=0
MESH_TYPE=0
IFNAME=wl0

if [ $# -eq 3 ]; then
    QUERY_LOOP=$1
    QUERY_5G2=$2
    MESH_TYPE=$3
fi

if [ $# -eq 2 ]; then
    QUERY_LOOP=$1
    QUERY_5G2=$2
fi

if [ $# -eq 1 ]; then
    QUERY_LOOP=$1
fi

if [ $MESH_TYPE -eq 1 ]; then
    #satellite
    if [ $QUERY_5G2 -eq 1 ]; then
        #tri band mesh
        WIFI_BH_IFNAME=wl2.1
    else
        #dual band mesh 
        WIFI_BH_IFNAME=wl1.2
    fi
else
    #base
    if [ $QUERY_5G2 -eq 1 ]; then
        #tri band mesh
        WIFI_BH_IFNAME=wl2
    else
        #dual band mesh 
        WIFI_BH_IFNAME=wl1.1
    fi
fi

loop_commands () {
    echo ====================================================START=================================================
    date +"%Y%m%d %H:%M:%S"
    echo ===== wl -i $IFNAME rate ======
    wl -i $IFNAME rate
    echo ===== wl -i $IFNAME nrate ======
    wl -i $IFNAME nrate
    echo ===== wl -i $IFNAME chanim_stats ======
    wl -i $IFNAME chanim_stats
#    echo ===== wl -i $IFNAME assoclist ======
#    wl -i $IFNAME assoclist
    echo ===== wl -i $IFNAME bs_data ======
    wl -i $IFNAME bs_data
    echo ===== wl -i $IFNAME sta_info all ======
    wl -i $IFNAME sta_info all
    echo ===== wl -i $IFNAME chanim_stats ======
    wl -i $IFNAME chanim_stats
    echo ===== wl -i $IFNAME autho_sta_list ======
    wl -i $IFNAME autho_sta_list
#    echo ===== wl -i $IFNAME pktq_stats C: A: P: ======
#    wl -i $IFNAME pktq_stats C: A: P:
    echo ===== wl -i $IFNAME counters ======
    wl -i $IFNAME counters
    echo ===== wl -i $IFNAME reset_cnts ======
    wl -i $IFNAME reset_cnts
#    echo ===== wl -i $IFNAME dump bsscfg ======
#    wl -i $IFNAME dump bsscfg
#    echo ===== wl -i $IFNAME dump ampdu ======
#    wl -i $IFNAME dump ampdu
#    echo ===== wl -i $IFNAME dump_clear ampdu ======
#    wl -i $IFNAME dump_clear ampdu
    echo ====================================================END=================================================
}


dump_interface () {
    echo "================================="
    echo "dump $IFNAME"
    echo "================================="

    loop_commands
}

dump_interface_satellite () {
    IFNAME=wl1.1
    echo "================================="
    echo "dump $IFNAME"
    echo "================================="

    loop_commands

}


echo ============QUERY_LOOP = $QUERY_LOOP 
echo ============QUERY_5G2 = $QUERY_5G2
echo ============MESH_TYPE = $MESH_TYPE

echo ===== wl -i ver ======
wl -i $IFNAME ver
echo ===== wl country ======
wl -i $IFNAME country
echo ===== wl -i wl1 +assoc +error ======
wl -i $IFNAME msglevel +assoc +error 
#echo ===== wl -i wl1 apsta_dbg 13 ======
#wl -i $IFNAME apsta_dbg 13



if [[ $QUERY_LOOP -eq 1 ]]; then
# loop
    while true; do
        IFNAME=$WIFI_2G_IFNAME
        dump_interface
        IFNAME=$WIFI_5G_IFNAME
        dump_interface
        if [[ $QUERY_5G2 -eq 1 ]]; then
            IFNAME=$WIFI_5G2_IFNAME
            dump_interface
        fi
        if [[ $MESH_TYPE -eq 1 ]]; then
            IFNAME=$WIFI_BH_IFNAME
            dump_interface
        fi
    done
else
# execute 1 time
    IFNAME=$WIFI_2G_IFNAME
    dump_interface
    IFNAME=$WIFI_5G_IFNAME
    dump_interface
    if [[ $QUERY_5G2 -eq 1 ]]; then
        IFNAME=$WIFI_5G2_IFNAME
        dump_interface
    fi
    if [[ $MESH_TYPE -eq 1 ]]; then
        dump_interface_satellite
    fi

    if [[ $MESH_TYPE -eq 1 ]]; then
        IFNAME=$WIFI_BH_IFNAME
        dump_interface
    fi
fi

#while true; do date; wl -i wl1 chanim_stats; echo 5G:;wl -i wl1 autho_sta_list; wl -i wl1 nrate; wl -i wl1 pktq_stats C: A: P:; wl -i wl1 counters; wl -i wl1 reset_cnts; wl -i wl1 dump bsscfg; sleep 5; done
