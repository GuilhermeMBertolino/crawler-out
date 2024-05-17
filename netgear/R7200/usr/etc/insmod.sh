#!/bin/sh
#
/bin/echo "==============insmod start" > /dev/console
# insert modules
#/sbin/insmod /lib/modules/bcm_enet.ko
#/sbin/insmod /lib/modules/vnet.ko
#/sbin/insmod /lib/modules/atmapi.ko
#/sbin/insmod /lib/modules/blaa_dd.ko
#/sbin/insmod /lib/modules/adsldd.ko
#/sbin/insmod /lib/modules/br2684.ko
/sbin/insmod /lib/modules/led_pb_api.ko
/sbin/insmod /lib/modules/led_hw.ko
/sbin/insmod /lib/modules/2.6.30.9/kernel/fs/jbd2/jbd2.ko
/sbin/insmod /lib/modules/2.6.30.9/kernel/fs/ext4/ext4.ko
#/sbin/insmod /lib/modules/sc_blink.ko
#/sbin/insmod /lib/modules/ipt_psd.ko
#/sbin/insmod /lib/modules/ipt_random.ko
#/sbin/insmod /lib/modules/ipt_REJECT.ko
/sbin/insmod /lib/modules/ipt_condition.ko
#/sbin/insmod /lib/modules/ct_mgr.ko
#/sbin/insmod /lib/modules/ipt_PNAT.ko
/sbin/insmod /lib/modules/ipt_http_string.ko
/sbin/insmod /lib/modules/ipt_dnshj.ko
/sbin/insmod /lib/modules/ipt_DLOG.ko
/sbin/insmod /lib/modules/ipt_macblock_dnshj.ko
/sbin/insmod /lib/modules/xt_ct_dir.ko

/sbin/insmod /lib/modules/cnapt_core.ko
/sbin/insmod /lib/modules/cnapt.ko
#/sbin/insmod /lib/modules/cui.ko
/sbin/insmod /lib/modules/cpt.ko
/sbin/insmod /lib/modules/cpm.ko
/sbin/insmod /lib/modules/calg.ko
/sbin/insmod /lib/modules/cdmz.ko
/sbin/insmod /lib/modules/cudp.ko
/sbin/insmod /lib/modules/hairpin.ko
/sbin/insmod /lib/modules/natlimit.ko

#add for arp protect, static arp table and reject arp reply from lan PC to DUT
/sbin/insmod /lib/modules/arp_protect_enable.ko 

#insert rtsp alg modules, may need stun arguments later
#/sbin/insmod /lib/modules/nf_conntrack_rtsp.ko
#/sbin/insmod /lib/modules/nf_nat_rtsp.ko

#
#insert SPI firewall module into the Linux Kernel
#
/sbin/insmod /lib/modules/common.ko
/sbin/insmod /lib/modules/firewall_block.ko
/sbin/insmod /lib/modules/fake_source_dos.ko
/sbin/insmod /lib/modules/psd_and_special_udp_dos.ko
/sbin/insmod /lib/modules/tcp_syn_dos.ko
/sbin/insmod /lib/modules/clamp_total_session_for_one_src.ko
/sbin/insmod /lib/modules/others_dos.ko

# mike add wifi modules
#/sbin/insmod /lib/modules/2.6.22/kernel/drivers/net/emf/emf.ko
#/sbin/insmod /lib/modules/2.6.22/kernel/drivers/net/igs/igs.ko
#/sbin/insmod /lib/modules/2.6.22/kernel/drivers/net/wl/wl.ko
#/sbin/insmod /lib/modules/wifi_statistics.ko


#MT7610e 11ac driver
/sbin/insmod /lib/modules/2.6.36/kernel/drivers/net/wireless/MT7610_ap/MT7610_ap.ko

# MT7612e 11ac driver
/sbin/insmod /lib/modules/2.6.36/kernel/drivers/net/wireless/rlt_wifi_ap/rlt_wifi.ko

# load storage driver late to make system prepare things like nvram done 
# then make usb device plug event happen
/sbin/insmod /lib/modules/2.6.36/kernel/drivers/usb/storage/usb-storage.ko
/sbin/insmod /lib/modules/2.6.36/kernel/drivers/usb/serial/usbserial_filter.ko


/bin/echo "==============insmod finish" > /dev/console
