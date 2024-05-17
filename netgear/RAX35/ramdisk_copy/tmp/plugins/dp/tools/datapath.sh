#!/bin/sh
#GWIP-L -> 1
#GSWIP-R -> 2
#CBM/TMU -> 3
#DMA -> 4
#PPA -> 5

ENGINE1_COMMANDS=1,8
ENGINE2_COMMANDS=2
ENGINE3_COMMANDS=3,4,5,6,7,8
ENGINE4_RX_COMMANDS=1,2,3,4,5,6
ENGINE4_TX_COMMANDS=7,8,9,10,11,12
ENGINE5_COMMANDS=4,6,7,8,9,10,11,12

E1=1-"($ENGINE1_COMMANDS)"
E2=1-"($ENGINE2_COMMANDS)"
E3=3-"($ENGINE3_COMMANDS)"
E4_RX=4-"($ENGINE4_RX_COMMANDS)"
E4_TX=4-"($ENGINE4_TX_COMMANDS)"
E5=5-"($ENGINE5_COMMANDS)"


#LAN to WAN
#ETH Fastpath: ETH LAN->ETH WAN

#Non-Accelerated:
#-----------------
#Engines flow:
# GSWIP-L --> GSWIP-R -- > CBM/TMU -- > MPE FW -- > CBM/TMU -- > CBM Driver -- > Datapath driver (dp_rx) -- > Ethernet driver (LAN )-- > Linux network stack -- >
# Ethernet driver  ( WAN ) -- > Datapath driver (dp_xmit) -- > CBM/TMU -- > GSWIP-R
LANWANETHNA(){
echo $E1:$E4_RX:$E4_TX:$E2:$E4_RX:$E3:$E3:$E4_TX:$E2:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-L --> GSWIP-R -- > CBM/TMU -- > GSWIP-R
LANWANETHPA(){
echo $E1:$E2:$E3:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-L --> GSWIP-R -- > CBM/TMU -- > MPE-FW -- > CBM/TMU -- > GSWIP-R
LANWANETHMP(){
echo $E1:$E2:$E3:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#ETH WAN to LAN
#ETH Fastpath: ETH WAN->ETH LAN

#Non-Accelerated:
		
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > MPE FW -- > CBM/TMU -- > CBM Driver -- > Ethernet driver (LAN )-- > Linux network stack -- >
# Ethernet driver  ( WAN )-- > Datapath driver (dp_rx) --> Datapath driver (dp_xmit) -- > CBM/TMU -- > GSWIP-L
WANETHLANNA(){
echo $E2:$E3:$E1:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R --> CBM/TMU -- > GSWIP-L
WANETHLANPA(){
echo $E2:$E3:$E1:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R --> CBM/TMU -- > MPE-FW -- > CBM/TMU -- > GSWIP-L
WANETHLANMP(){
echo $E2:$E3:$E1:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#WAVE400 to ETH WAN
#ETH Fastpath: WAVE400->ETH WAN

#Non-Accelerated:
		
#Engines flow:
# STA -- > WAVE400 DRIVER -- > DIRECT PATH DRIVER -- > DATA PATH DRIVER(dp_xmit) -- > CBM/TMU -- > GSWIP-R-- > CBM/TMU -- >
# MPE FW(ACC)-- > CBM/TMU --> CBM driver  -- > DATA PATH DIRVER(dp_rx) -- > DIRECT PATH DRIVER -- > WAVE400 DIRVER -- > LINUX NETWORK STACK -- > 
# Ethernet Driver(WAN)  -- > Datapath Driver(dp_xmit) -- > CBM/TMU -- > GSWIP-R
WAVE400WANETHNA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# STA -- > WAVE400 DRIVER -- > DIRECT PATH DRIVER -- > DATA PATH DRIVER(dp_xmit) -- > CBM/TMU -- > GSWIP-R-- > CBM/TMU -- > GSWIP-R
WAVE400WANETHPA(){
echo $E2:$E3:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# STA -- > WAVE400 DRIVER -- > DIRECT PATH DRIVER -- > DATA PATH DRIVER(dp_xmit) -- > CBM/TMU -- > GSWIP-R-- > CBM/TMU -- > MPE-FW -- > CBM/TMU -- > GSWIP-R
WAVE400WANETHMP(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#ETH WAN to WAVE400
#ETH Fastpath: ETH-WAN -> WAVE400

#Non-Accelerated:
		
#Engines flow:
#  GSWIP-R-- > CBM/TMU -- > MPE FW(ACC)-- > CBM/TMU --> CBM driver  -- > DATA PATH DIRVER(dp_rx) -- > DIRECT PATH DRIVER -- > 
# Ethernet Driver(WAN)  -- > Linux Network Stack -- > Wave400 driver -- > STA
WANETHWAVE400NA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > CBM Driver -- > Datapath Driver(dp_rx) -- > Directpath Driver -- > Wave400 driver -- > STA 
WANETHWAVE400PA(){
echo $E2:$E3:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > MPE-FW -- > CBM/TMU -- > CBM Driver -- > Datapath Driver(dp_rx) -- > Directpath Driver -- > Wave400 driver -- > STA
WANETHWAVE400MP(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#WAVE500 to ETH WAN
#WLAN Fastpath: WAVE500->ETH WAN

#Non-Accelerated:
		
#Engines flow:
# STA -- > WAVE500 HW/FW -- > GSWIP-R-- > CBM/TMU -- >  MPE FW(ACC)-- > CBM/TMU --> CBM driver  -- > DATA PATH DIRVER(dp_rx) -- > WAVE500 Datapath Driver
# --> WAVE500 DIRVER -- > LINUX NETWORK STACK -- >  Ethernet Driver(WAN)  -- > Datapath Driver(dp_xmit) -- > CBM/TMU -- > GSWIP-R
WAVE500WANETHNA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# STA -- > WAVE500 HW/FW -- > GSWIP-R-- > CBM/TMU -- > GSWIP-R
WAVE500WANETHPA(){
echo $E2:$E3:$E5 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# STA -- > WAVE500 HW/FW -- > GSWIP-R-- > CBM/TMU -- > MPE-FW -- > CBM/TMU -- > GSWIP-R 
WAVE500WANETHMP(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#ETH WAN to WAVE500
#ETH Fastpath: ETH-WAN -> WAVE500

#Non-Accelerated:
		
#Engines flow:
#  GSWIP-R-- > CBM/TMU -- > MPE FW(ACC)-- > CBM/TMU --> CBM driver  -- > DATA PATH DIRVER(dp_rx) -- > 
# Ethernet Driver(WAN)  -- > Linux Network Stack -- > Wave500 driver -- > Wave500 Datapath driver -- > 
# Datapath Driver(dp_xmit) -- > CBM Driver -- > CBM/TMU -- > WAVE500 HW/FW -- > STA
WANETHWAVE500NA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > WAVE500 HW/FW -- > STA 
WANETHWAVE500PA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > MPE-FW (ACC) -- > CBM/TMU -- > WAVE500 HW/FW -- > STA
WANETHWAVE500MP(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#QCA to ETH WAN
#Directling: QCA ->ETH WAN

#Non-Accelerated:
		
#Engines flow:
# QCA HW -- > DL FW RX -- > DL Driver -- > Directpath Driver -- > Datapath Driver(dp_xmit) -- > CBM/TMU -- >  GSWIP-R -- >
# CBM/TMU --> MPE FW  -- > CBM/TMU -- > CBM Driver -- > Datapath Driver(dp_rx) -- > Directpath Driver -- > 
# QCA Driver -- > LINUX NETWORK STACK -- >  Ethernet Driver(WAN)  -- > Datapath Driver(dp_xmit) -- > CBM/TMU -- > GSWIP-R
QCAWANETHNA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# QCA HW -- > DL FW RX -- > DL Driver -- > Directpath Driver -- > Datapath Driver(dp_xmit) -- > CBM/TMU -- > GSWIP-R -- > CBM/TMU -- > GSWIP-R
QCAWANETHPA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# QCA HW -- > DL FW RX -- > DL Driver -- > Directpath Driver -- > Datapath Driver(dp_xmit) -- > CBM/TMU -- > GSWIP-R -- > CBM/TMU -- > MPE FW --> CBM/TMU -- > GSWIP-R
QCAWANETHMP(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#ETH WAN to QCA 
#ETH Fastpath: ETH-WAN -> QCA

#Non-Accelerated:
		
#Engines flow:
# GSWIP-R-- > CBM/TMU -- > MPE FW(ACC)-- > CBM/TMU --> CBM driver  -- > DATA PATH DIRVER(dp_rx) -- > 
# Ethernet Driver(WAN)  -- > Linux Network Stack -- > QCA driver -- > DL driver -- > 
# Datapath Driver(dp_xmit) -- > CBM Driver -- > CBM/TMU -- > MPE FW (DL)
WANETHQCANA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > MPE FW (DL)
WANETHQCAPA(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-R -- > CBM/TMU -- > MPE-FW (ACC) -- > CBM/TMU -- > MPE FW (DL) 
WANETHQCAMP(){
echo $E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#LAN to DSL 
#DSL Fastpath: ETH LAN->DSL/VRX318

#Non-Accelerated:
#-----------------
#Engines flow:
# GSWIP-L --> GSWIP-R -- > CBM/TMU -- > MPE FW -- > CBM/TMU -- > CBM Driver -- > Datapath driver (dp_rx) -- > Ethernet driver (LAN )-- > Linux network stack -- >
# VRX318 driver  ( DSL ) -- > Datapath driver (dp_xmit) -- > CBM/TMU -- > PPE FW -- > DSL
LANETHVRX318NA(){
echo $E1:$E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-L --> GSWIP-R -- > CBM/TMU -- > PPE FW -> DSL 
LANETHVRX318PA(){
echo $E1:$E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
# GSWIP-L --> GSWIP-R -- > CBM/TMU -- > MPE-FW -- > CBM/TMU -- > PPE FW -> DSL 
LANETHVRX318MP(){
echo $E1:$E2:$E3 > /tmp/plugins/dp/tools/test1.plugin
}

#DSL/VRX318 to LAN
#DSL Fastpath: DSL/VRX318 ->ETH LAN

#Non-Accelerated:
		
#Engines flow:
# DSL -- > PPE FW -- > CBM/TMU -- > GSWIP-R --> CBM/TMU --> MPE FW -- > CBM/TMU -- > CBM Driver -- > Datapath driver (dp_rx) --> VRX318 driver (DSL)-- > 
# Linux network stack -- >  Ethernet driver  ( LAN )-- > Datapath driver (dp_xmit) -- > CBM/TMU -- > GSWIP-L
VRX318LANETHNA(){
echo $E2:$E3:$E1 > /tmp/plugins/dp/tools/test1.plugin
}

#PAE-Accelerated:
#-----------------
#Engines flow:
# DSL -- > PPE FW -- > CBM/TMU -- > GSWIP-R --> CBM/TMU -- > GSWIP-L
VRX318LANETHPA(){
echo $E2:$E3:$E1 > /tmp/plugins/dp/tools/test1.plugin
}

#MPE-Accelerated:
#-----------------
#Engines flow:
#DSL -- > PPE FW -- > CBM/TMU -- > GSWIP-R --> CBM/TMU -- > MPE-FW -- > CBM/TMU -- > GSWIP-L
VRX318LANETHMP(){
echo $E2:$E3:$E1 > /tmp/plugins/dp/tools/test1.plugin
}

