#! /bin/sh
switch_cli dev=1 GSW_VLAN_PORT_CFG_SET nPortId=15 nPortVId=1015 eVLAN_MemberViolation=1 eAdmitMode=2 bTVM=0
switch_cli dev=1 GSW_VLAN_PORT_CFG_SET nPortId=5 nPortVId=110 eVLAN_MemberViolation=1 eAdmitMode=2 bTVM=0
switch_cli dev=1 GSW_VLAN_PORT_CFG_SET nPortId=2 nPortVId=210 eVLAN_MemberViolation=1 eAdmitMode=2 bTVM=0
switch_cli dev=1 GSW_VLAN_PORT_CFG_SET nPortId=3 nPortVId=0 eVLAN_MemberViolation=1 eAdmitMode=2 bTVM=0
switch_cli dev=1 GSW_VLAN_PORT_CFG_SET nPortId=4 nPortVId=1 eAdmitMode=1 bTVM=0

#switch_cli dev=1 GSW_PCE_EG_VLAN_CFG_SET nPortId=15 bEgVidEna=1 eEgVLANmode=1 nEgStartVLANIdx=240
#switch_cli dev=1 GSW_PCE_EG_VLAN_CFG_SET nPortId=5 bEgVidEna=1 eEgVLANmode=1 nEgStartVLANIdx=80
#switch_cli dev=1 GSW_PCE_EG_VLAN_CFG_SET nPortId=2 bEgVidEna=1 eEgVLANmode=1 nEgStartVLANIdx=32
#switch_cli dev=1 GSW_PCE_EG_VLAN_CFG_SET nPortId=3 bEgVidEna=1 eEgVLANmode=1 nEgStartVLANIdx=48
#switch_cli dev=1 GSW_PCE_EG_VLAN_CFG_SET nPortId=4 bEgVidEna=1 eEgVLANmode=1 nEgStartVLANIdx=64

switch_cli dev=1 GSW_VLAN_ID_CREATE nVId=1015 nFId=0
switch_cli dev=1 GSW_VLAN_ID_CREATE nVId=110 nFId=0
switch_cli dev=1 GSW_VLAN_ID_CREATE nVId=210 nFId=0
switch_cli dev=1 GSW_VLAN_ID_CREATE nVId=0 nFId=0

switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1015 nPortId=0 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1015 nPortId=15 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1015 nPortId=5 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1015 nPortId=2 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1015 nPortId=3 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1015 nPortId=4 bVLAN_TagEgress=0

switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=110 nPortId=0 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=110 nPortId=15 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=110 nPortId=5 bVLAN_TagEgress=0

switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=210 nPortId=0 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=210 nPortId=15 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=210 nPortId=2 bVLAN_TagEgress=0

switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=0 nPortId=0 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=0 nPortId=15 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=0 nPortId=3 bVLAN_TagEgress=0

switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1 nPortId=0 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1 nPortId=15 bVLAN_TagEgress=0
switch_cli dev=1 GSW_VLAN_PORT_MEMBER_ADD nVId=1 nPortId=4 bVLAN_TagEgress=0

switch_cli dev=1 GSW_PCE_EG_VLAN_ENTRY_WRITE nIndex=144 bEgVLAN_Action=1 bEgCVidRem_Action=1 bEgCVidIns_Action=1 nEgCVid=1015
switch_cli dev=1 GSW_PCE_EG_VLAN_ENTRY_WRITE nIndex=90 bEgVLAN_Action=1 bEgCVidRem_Action=1 bEgCVidIns_Action=1 nEgCVid=110
switch_cli dev=1 GSW_PCE_EG_VLAN_ENTRY_WRITE nIndex=36 bEgVLAN_Action=1 bEgCVidRem_Action=1 bEgCVidIns_Action=1 nEgCVid=210
switch_cli dev=1 GSW_PCE_EG_VLAN_ENTRY_WRITE nIndex=54 bEgVLAN_Action=1 bEgCVidRem_Action=1 bEgCVidIns_Action=1 nEgCVid=0
switch_cli dev=1 GSW_PCE_EG_VLAN_ENTRY_WRITE nIndex=72 bEgVLAN_Action=1 bEgCVidRem_Action=1

