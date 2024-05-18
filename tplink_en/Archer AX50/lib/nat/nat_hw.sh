# fastpath setting for brcm

# $1=status, $2=init/reset
nat_hw_enable() {
    # echo nat_hw_enable $@ > /dev/console
    # we do not set during init

    if [ $1 = "1" ];then
		echo "[ hw_nat] Enable..." > /dev/console
		[ -f '/etc/init.d/hnat-start' ] && /etc/init.d/hnat-start start > /dev/console
    else
		echo "[ hw_nat] Disable..." > /dev/console
		[ -f '/etc/init.d/hnat-start' ] && /etc/init.d/hnat-start stop > /dev/console
    fi
	
	#if [ $2 = "reset" ];then
	#	echo 'reboot by nat boost.' > /dev/console
	#	reboot
	#fi	
}
