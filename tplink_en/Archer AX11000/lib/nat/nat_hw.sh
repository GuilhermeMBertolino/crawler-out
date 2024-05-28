# fastpath setting for brcm

# $1=status, $2=init/reset
nat_hw_enable() {
    #echo nat_hw_enable $@ > /dev/console

    if [ $1 = "1" ];then
        # flow_fwd  fastpath
        fcctl enable
    else
        # flow_fwd  host
        fcctl disable
        fcctl flush
    fi
}
