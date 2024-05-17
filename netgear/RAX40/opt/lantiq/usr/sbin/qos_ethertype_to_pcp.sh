#!/bin/sh
switch_cli GSW_QOS_PORT_REMARKING_CFG_SET nPortId=5 dev=1 eDSCP_IngressRemarkingEnable=0 bDSCP_EgressRemarkingEnable=0 bPCP_IngressRemarkingEnable=1 bPCP_EgressRemarkingEnable=0 bSTAG_PCP_IngressRemarkingEnable=0 bSTAG_DEI_IngressRemarkingEnable=0 bSTAG_PCP_DEI_EgressRemarkingEnable=0

switch_cli GSW_QOS_SVLAN_CLASS_PCP_PORT_SET dev=1 nPortId=15 nTrafficClass=7 nCPCP=0 nSPCP=0
switch_cli GSW_QOS_SVLAN_CLASS_PCP_PORT_SET dev=1 nPortId=15 nTrafficClass=6 nCPCP=7 nSPCP=7


switch_cli dev=1 GSW_PCE_RULE_WRITE pattern.nIndex=128 pattern.bEnable=1 pattern.bPortIdEnable=1 pattern.nPortId=5 pattern.bEtherTypeEnable=1 pattern.nEtherType=0x0806 action.eTrafficClassAction=2 action.nTrafficClassAlternate=0x7
switch_cli dev=1 GSW_PCE_RULE_WRITE pattern.nIndex=129 pattern.bEnable=1 pattern.bPortIdEnable=1 pattern.nPortId=5 pattern.bEtherTypeEnable=1 pattern.nEtherType=0x8864 action.eTrafficClassAction=2 action.nTrafficClassAlternate=0x6