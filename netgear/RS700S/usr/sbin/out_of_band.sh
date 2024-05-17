BSS_PARAMS_OCT_RECOMMENDED=0x01
BSS_PARAMS_SAME_SSID=0x02
BSS_PARAMS_MBSSID=0x04
BSS_PARAMS_TRANSMITTED_BSSID=0x08
BSS_PARAMS_ESS_MEMBER_WITH_2G_5G=0x10
BSS_PARAMS_UPR_ACTIVE=0x20
BSS_PARAMS_COLOCATED_AP=0x40

INTF2G=wl0
echo $INTF2G
INTF5G=wl1
echo $INTF5G 
INTF6G=wl2
echo $INTF6G 
_BSSID=$(wl -i $INTF6G bssid)
echo $_BSSID
_CHANSPEC=$(wl -i $INTF6G chanspec | awk '{print $1}')
echo $_CHANSPEC
_RCLASS=$(wl -i $INTF6G rclass $_CHANSPEC | sed 's/rclass=//g')
echo $_RCLASS
_CH=$(wl -i $INTF6G channel | grep current | awk '{print $4}')
echo $_CH
_PT=$(wl -i $INTF6G phytype)
echo $_PT
_SSID6G=$(wl -i $INTF6G ssid | awk '{print $3}' | sed 's/"//g')
echo $_SSID6G
_CSPEC=$(wl -i $INTF6G chanspec | awk '{print $2}' | sed 's/(//g' | sed 's/)//g')
echo $_CSPEC
_PREFERENCE=254
echo $_PREFERENCE

_BSS_PARAMS=$(($BSS_PARAMS_COLOCATED_AP | $BSS_PARAMS_ESS_MEMBER_WITH_2G_5G))
NBR_CAP_6G=$(wl -i $INTF6G nbr_discovery_cap | awk '{print $1}')
if [ -n "$NBR_CAP_6G" ] && [ "$(( $NBR_CAP_6G & 0x20 ))" != "0" ]; then
	_BSS_PARAMS=$(($_BSS_PARAMS | $BSS_PARAMS_UPR_ACTIVE))
fi

MBSSID_6G=$(wl -i $INTF6G mbssid)
echo $MBSSID_6G
MBSSID_6G_STATUS=$(echo $MBSSID_6G | awk '{print $2}' | sed 's/Status:\[//g' | sed 's/\].*//g')
echo $MBSSID_6G_STATUS
if [ "$MBSSID_6G" == '-1' ] || [ "$MBSSID_6G_STATUS" == '-1' ] || [ "$MBSSID_6G_STATUS" == '1' ]; then
	_BSS_PARAMS=$(($_BSS_PARAMS | $BSS_PARAMS_MBSSID))

	BSS_TRANS=$(wl -i $INTF6G bss_trans)
	if [ "$BSS_TRANS" == '1' ]; then
		_BSS_PARAMS=$(($_BSS_PARAMS | $BSS_PARAMS_TRANSMITTED_BSSID))
	fi

	# For *188.25010, replace with 'transmit_bss'
	BSS_TRANS=$(wl -i $INTF6G transmit_bss)
	if [ "$BSS_TRANS" == '1' ]; then
		_BSS_PARAMS=$(($_BSS_PARAMS | $BSS_PARAMS_TRANSMITTED_BSSID))
	fi
fi

_BSS_PARAMS_2G=$_BSS_PARAMS
_BSS_PARAMS_5G=$_BSS_PARAMS

_SSID2G=$(wl -i $INTF2G ssid | awk '{print $3}' | sed 's/"//g')
if [ "$_SSID2G" == "$_SSID6G"  ]; then
	_BSS_PARAMS_2G=$(($_BSS_PARAMS_2G | $BSS_PARAMS_SAME_SSID))
fi
_SSID5G=$(wl -i $INTF5G ssid | awk '{print $3}' | sed 's/"//g')
if [ "$_SSID5G" == "$_SSID6G"  ]; then
	_BSS_PARAMS_5G=$(($_BSS_PARAMS_5G | $BSS_PARAMS_SAME_SSID))
fi

echo $_BSS_PARAMS_2G
echo $_BSS_PARAMS_5G

echo $_BSSID 255 $_RCLASS $_CH $_PT $_SSID6G $_CSPEC $_PREFERENCE $_BSS_PARAMS_2G
wl -i $INTF2G down; wl -i $INTF2G rrm 2; wl -i $INTF2G up
wl -i $INTF2G rrm_nbr_add_nbr $_BSSID 255 $_RCLASS $_CH $_PT $_SSID6G $_CSPEC $_PREFERENCE $_BSS_PARAMS_2G
wl -i $INTF2G rrm_nbr_list
wl -i $INTF2G nbr_discovery_cap 1
wl -i $INTF2G oce enable 1
echo $_BSSID 255 $_RCLASS $_CH $_PT $_SSID6G $_CSPEC $_PREFERENCE $_BSS_PARAMS_5G
wl -i $INTF5G down; wl -i $INTF5G rrm 2; wl -i $INTF5G up
wl -i $INTF5G rrm_nbr_add_nbr $_BSSID 255 $_RCLASS $_CH $_PT $_SSID6G $_CSPEC $_PREFERENCE $_BSS_PARAMS_5G
wl -i $INTF5G rrm_nbr_list
wl -i $INTF5G nbr_discovery_cap 1
wl -i $INTF5G oce enable 1

