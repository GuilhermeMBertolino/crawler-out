#!/bin/sh
echo ===== wl ver ======
wl ver
echo ===== wl country ======
wl country
echo ===== wl -i wl1 +assoc +error +apsta ======
wl msglevel +assoc +error +apsta
echo ===== wl -i wl1 apsta_dbg 13 ======
wl apsta_dbg 13

while :
do
    sleep 5
    echo ====================================================START=================================================
    date +"%Y%m%d %H:%M:%S"
    echo ===== wl -i wl1 chanim_stats ======
    wl -i wl1 chanim_stats
    echo ===== wl -i wl1 autho_sta_list ======
    wl -i wl1 autho_sta_list
    echo ===== wl -i wl1 nrate ======
    wl -i wl1 nrate
    echo ===== wl -i wl1 pktq_stats C: A: P: ======
    wl -i wl1 pktq_stats C: A: P:
    echo ===== wl -i wl1 counters ======
    wl -i wl1 counters
    echo ===== wl -i wl1 reset_cnts ======
    wl -i wl1 reset_cnts
    echo ===== wl -i wl1 dump bsscfg ======
    wl -i wl1 dump bsscfg
    echo ====================================================END=================================================
done

    
    
    
    
    
    
    
    
    
    
    

#while true; do date; wl -i wl1 chanim_stats; echo 5G:;wl -i wl1 autho_sta_list; wl -i wl1 nrate; wl -i wl1 pktq_stats C: A: P:; wl -i wl1 counters; wl -i wl1 reset_cnts; wl -i wl1 dump bsscfg; sleep 5; done
