
----Common MTK wifi related definitions----
MTK_2GWIFI_DEVNAME = "MT7915D\.1\.1"
MTK_5GWIFI_DEVNAME = "MT7915D\.1\.2"

MTK_DEF_2G_PRIMARY_IFNAME = "ra0"
MTK_DEF_5G_PRIMARY_IFNAME = "rax0"

MTK_DEF_2G_GUEST_IFNAME = "ra1"
MTK_DEF_5G_GUEST_IFNAME = "rax1"

MTK_DEF_2G_CLIENT_IFNAME = "apcli0"
MTK_DEF_5G_CLIENT_IFNAME = "apclix0"

--If L1 profile no change, these two definitions should be kept.--
MTK_2GWIFI_PROFILE = "\/etc\/wireless\/mediatek\/mt7915\.dbdc\.b0\.dat"
MTK_5GWIFI_PROFILE = "\/etc\/wireless\/mediatek\/mt7915\.dbdc\.b1\.dat"

MT_WIFI_KERNEL_MODULE_PATH = "\/lib\/modules\/4\.4\.198\/mt_wifi\.ko"

----Netgear related definitions----
NTGR_WIFI_UCI_CONFIG_NAME = "NTGR_WiFi"
NTGR_WIFI_MAX_BSS_NUM = 2 --Max BSS number of each wifi device--

----Project related definitions----
LAN_DEF_BRIDGE_INTF_NAME = "br-lan"
LAN_PORT_BASE_INTF_NAME = "eth0"

