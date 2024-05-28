# fastpath setting for brcm

# $1=status, $2=init/reset
nat_hw_enable() {
	echo "do nothing in nat_hw_enable" > /dev/console
    # echo nat_hw_enable $@ > /dev/console
}
