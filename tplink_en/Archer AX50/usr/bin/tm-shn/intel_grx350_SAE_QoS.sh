# Intel GRX350 SAE + TC[ifb1] + RPS  acceleration
#!/bin/sh

#QoS device interface
dev_wan=eth1
dev_lan=ifb1
#Config phyical Lan inteface
phy_lan1=eth0_1
phy_lan2=eth0_2
phy_lan3=eth0_3
phy_lan4=eth0_4
#Wireless interface 2.4G/5G
wl_1=wlan0
wl_2=wlan2

#bandwidth 3750kbp is 30Mbps
#bandwidth 6250kbps is 50Mbps
ceil_up=3750kbps
ceil_dl=6250kbps

high_dev=192.168.1.100
nor_dev=192.168.2.101
mid_dev=192.168.2.102
low_dev=192.168.2.103

#----- Intel SW FP + TC + ifb + RPS -----------
# 以下由TP-link 當啟用Trend iQoS 即需自行啟用SAE + RPS 
#enable the SW acceleration
echo disable > /proc/ppa/pae/accel
echo disable > /proc/ppa/mpe/accel
ppacmd setppefp -f 0
#ppacmd setswfp -f 1
ifconfig ifb1 up

#enable the RPS(Receive Packet Steering) feature, make 3 CPUs handle with the packet forwarding:
echo 4096 > /sys/class/net/eth0_1/queues/rx-0/rps_flow_cnt  
# ( 7 is 111, the bitmap of the 3 CPUs)
echo 7 > /sys/class/net/eth0_1/queues/rx-0/rps_cpus 

echo 4096 > /sys/class/net/eth0_2/queues/rx-0/rps_flow_cnt  
echo 7 > /sys/class/net/eth0_2/queues/rx-0/rps_cpus 

echo 4096 > /sys/class/net/eth0_3/queues/rx-0/rps_flow_cnt  
echo 7 > /sys/class/net/eth0_3/queues/rx-0/rps_cpus 

echo 4096 > /sys/class/net/eth0_4/queues/rx-0/rps_flow_cnt  
echo 7 > /sys/class/net/eth0_4/queues/rx-0/rps_cpus
 
echo 4096 > /sys/class/net/wlan0/queues/rx-0/rps_flow_cnt  
echo 7 > /sys/class/net/wlan0/queues/rx-0/rps_cpus 

echo 4096 > /sys/class/net/wlan2/queues/rx-0/rps_flow_cnt  
echo 7 > /sys/class/net/wlan2/queues/rx-0/rps_cpus 

echo 4096 > /sys/class/net/eth1/queues/rx-0/rps_flow_cnt
echo 7 > /sys/class/net/eth1/queues/rx-0/rps_cpus

echo 32768 > /proc/sys/net/core/rps_sock_flow_entries

# 以下由TP-link 當啟用Trend iQoS 即需自行啟用TC command 
#------------------------- ifb1 ------------------------
tc qdisc del dev $phy_lan1 root 2>/dev/null
tc qdisc del dev $phy_lan2 root 2>/dev/null
tc qdisc del dev $phy_lan3 root 2>/dev/null
tc qdisc del dev $phy_lan4 root 2>/dev/null
tc qdisc del dev $wl_1 root 2>/dev/null
tc qdisc del dev $wl_2 root 2>/dev/null

tc qdisc add dev $phy_lan1 root handle 1: htb
tc filter add dev $phy_lan1 parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $dev_lan
tc qdisc add dev $phy_lan2 root handle 1: htb
tc filter add dev $phy_lan2 parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $dev_lan
tc qdisc add dev $phy_lan3 root handle 1: htb
tc filter add dev $phy_lan3 parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $dev_lan
tc qdisc add dev $phy_lan4 root handle 1: htb
tc filter add dev $phy_lan4 parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $dev_lan
tc qdisc add dev $wl_1 root handle 1: htb
tc filter add dev $wl_1 parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $dev_lan
tc qdisc add dev $wl_2 root handle 1: htb
tc filter add dev $wl_2 parent 1: protocol all u32 match u32 0 0 action mirred egress redirect dev $dev_lan