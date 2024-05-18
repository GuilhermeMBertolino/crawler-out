#!/bin/sh
# Copyright (C) 2015 zengwei <zengwei@tp-link.com>
FW_LIBDIR=${FW_LIBDIR:-/lib/firewall}

. $FW_LIBDIR/fw.sh


#amule complete process
amule_complete() {
	[ -e /lib/offline_download/offline_download_op.lua ] && lua /lib/offline_download/offline_download_op.lua update "amule" $1 "complete"
}

# $1:family
# $2:table
# $3:chain
# $4:key-word
fw_check() {
	local list=$(fw list $1 $2 $3)
    (echo $list | grep -- "$4" > /dev/null 2>&1)&&return 1||return 0
}

_s_add() {
  
    local fam tab chn tgt pos
    local i
    for i in fam tab chn tgt pos; do
        if [ "$1" -a "$1" != '{' ]; then
            eval "$i='$1'"
            shift
        else
            eval "$i=-"
        fi
    done
    fw_check $fam $tab $chn "-A $chn${2:+ $2} -j $tgt"
    [ x$? != x1 ] && fw add $fam $tab $chn "$tgt" $pos "$@"
}

fw_s_add() {
  
    local fam tab chn tgt pos
    local i
    for i in fam tab chn tgt pos; do
        if [ "$1" -a "$1" != '{' ]; then
            eval "$i='$1'"
            shift
        else
            eval "$i=-"
        fi
    done
    
    if [[ x$fam == x"i" ]]; then
       _s_add "4" $tab $chn "$tgt" $pos "$@"
       _s_add "6" $tab $chn "$tgt" $pos "$@"
    else
        _s_add $fam $tab $chn "$tgt" $pos "$@"
    fi
}

_s_del() {

    local fam tab chn tgt pos
    local i
    for i in fam tab chn tgt pos; do
        if [ "$1" -a "$1" != '{' ]; then
            eval "$i='$1'"
            shift
        else
            eval "$i=-"
        fi
    done

    fw_check $fam $tab $chn "-A $chn${2:+ $2} -j $tgt"
    while [ x$? == x1 ]; do
        fw del $fam $tab $chn "$tgt" $pos "$@"
        fw_check $fam $tab $chn "-A $chn${2:+ $2} -j $tgt"
    done
}

fw_s_del() {
  
    local fam tab chn tgt pos
    local i
    for i in fam tab chn tgt pos; do
        if [ "$1" -a "$1" != '{' ]; then
            eval "$i='$1'"
            shift
        else
            eval "$i=-"
        fi
    done
    
    if [[ x$fam == x"i" ]]; then
       _s_del "4" $tab $chn "$tgt" $pos "$@"
       _s_del "6" $tab $chn "$tgt" $pos "$@"
    else
        _s_del $fam $tab $chn "$tgt" $pos "$@"
    fi
}

offl_fw_access(){
	local rule="-p $1 -m $1 --dport $2"
    fw_s_add 4 f input_wan ACCEPT 1 { "$rule" }
}

offl_fw_block(){
    local rule="-p $1 -m $1 --dport $2"
    fw_s_del 4 f input_wan ACCEPT { "$rule" }
}
