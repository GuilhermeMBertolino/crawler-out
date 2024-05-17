<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var HiddenSSID  = '<% getCfgZero(1, "HideSSID"); %>';
var APIsolated = '<% getCfgZero(1, "NoForwarding"); %>';
var mbssidapisolated = '<% getCfgZero(1, "NoForwardingBTNBSSID"); %>';
var mssidb = "<% getMBSSIDBuilt(); %>";
var countrycode = '<% getCfgGeneral(1, "CountryCode"); %>';
var bgProtection = '<% getCfgZero(1, "BGProtection"); %>';
var beaconInterval = '<% getCfgZero(1, "BeaconPeriod"); %>';
var dtimValue = '<% getCfgZero(1, "DtimPeriod"); %>';
var fragmentThreshold = '<% getCfgZero(1, "FragThreshold"); %>';
var rtsThreshold = '<% getCfgZero(1, "RTSThreshold"); %>';
var shortPreamble = '<% getCfgZero(1, "TxPreamble"); %>';
var shortSlot = '<% getCfgZero(1, "ShortSlot"); %>';
var txBurst = '<% getCfgZero(1, "TxBurst"); %>';
var pktAggregate = '<% getCfgZero(1, "PktAggregate"); %>';
var autoprovision = '<% getCfgZero(1, "AutoProvisionEn"); %>';
var wmmCapable = '<% getCfgZero(1, "WmmCapable"); %>';
var APSDCapable = '<% getCfgZero(1, "APSDCapable"); %>';
var DLSCapable = '<% getCfgZero(1, "DLSCapable"); %>';
var wirelessMode = '<% getCfgZero(1, "WirelessMode"); %>';
var ieee80211h  = '<% getCfgZero(1, "IEEE80211H"); %>';
var txPower = '<% getCfgZero(1, "TxPower"); %>';
var DLSBuilt = '<% getDLSBuilt(); %>';
var m2uBuilt = '<% getWlanM2UBuilt(); %>';
var autoproBuilt = '<% getAutoProvisionBuilt(); %>';
var m2uEnabled = '<% getCfgZero(1, "M2UEnabled"); %>';
var dfsb = '<% getDFSBuilt(); %>';
var carrierib = '<% getCarrierBuilt(); %>';
var rvtb = '<% getRVTBuilt(); %>';
var txbfb = '<% getTxBfBuilt(); %>';
var etxbf = '<% getCfgZero(1, "ETxBfEnCond"); %>';
var itxbf = '<% getCfgZero(1, "ITxBfEn"); %>';

function getRvtEnb()
{
	var rvt = '<% getCfgZero(1, "RVT"); %>';
	var rx = '<% getCfgZero(1, "HT_RxStream"); %>';
	var tx = '<% getCfgZero(1, "HT_TxStream"); %>';
	var gi = '<% getCfgZero(1, "HT_GI"); %>';
	var vt = '<% getCfgZero(1, "VideoTurbine"); %>';

	if (rvt == "1" && rx == "1" && tx == "1" && vt == "1" && gi == "0") 
		return true;
	else
		return false;
}

function rvt_switch()
{
	if (document.advanced_form.rvt[0].checked) {
		if (document.advanced_form.txbf.options.length == 4) {
			document.advanced_form.txbf.remove(3);
			document.advanced_form.txbf.remove(2);
			document.advanced_form.txbf.remove(1);
		}
	}
	else {
		if (document.advanced_form.txbf.options.length == 1){
			var y = document.createElement('option');
			y.text = "Explicit TxBF";
			y.value = "2";
			try {
				document.advanced_form.txbf.add(y, null); // standards compliant
			} 
			catch(ex) {
				document.advanced_form.txbf.add(y); // IE only
			}

			y = document.createElement('option');
			y.text = "Implicit TxBf";
			y.value = "1";
			try {
				document.advanced_form.txbf.add(y, null);
			} 
			catch(ex) {
				document.advanced_form.txbf.add(y);
			}

			y = document.createElement('option');
			y.text = "Disable";
			y.value = "0";
			try {
				document.advanced_form.txbf.add(y, null);
			} 
			catch(ex) {
				document.advanced_form.txbf.add(y);
			}
		}
	}
}

function Load_Setting()
{
	if (HiddenSSID == 0)
		document.advanced_form.broadcastssid[0].checked = true;
	else
		document.advanced_form.broadcastssid[1].checked = true;
	
	if (APIsolated == 1)
		document.advanced_form.apisolated[0].checked = true;
	else
		document.advanced_form.apisolated[1].checked = true;	
	
	document.advanced_form.mbssidapisolated.disabled = true;
	if (mssidb == "1"){
		document.advanced_form.mbssidapisolated.disabled = false;
		if (mbssidapisolated == "1")
			document.advanced_form.mbssidapisolated[0].checked = true;
		else
			document.advanced_form.mbssidapisolated[1].checked = true;
	}
		
	if (countrycode == "US")
		document.advanced_form.country_code.options.selectedIndex = 0;
	else if (countrycode == "JP")
		document.advanced_form.country_code.options.selectedIndex = 1;
	else if (countrycode == "FR")
		document.advanced_form.country_code.options.selectedIndex = 2;
	else if (countrycode == "TW")
		document.advanced_form.country_code.options.selectedIndex = 3;
	else if (countrycode == "BR")
		document.advanced_form.country_code.options.selectedIndex = 4;
	else if (countrycode == "HK")
		document.advanced_form.country_code.options.selectedIndex = 5;
	else if (countrycode == "CN")
		document.advanced_form.country_code.options.selectedIndex = 6;
		
	document.advanced_form.bg_protection.options.selectedIndex = 1*bgProtection;

	if ((wirelessMode == 2) || (wirelessMode == 8))
		; //document.advanced_form.basic_rate.disabled = true;
	else
		document.advanced_form.ieee_80211h.disabled = true;

	document.advanced_form.beacon.value = 1*beaconInterval;
	document.advanced_form.dtim.value = 1*dtimValue;
	document.advanced_form.fragment.value = 1*fragmentThreshold;
	document.advanced_form.rts.value = 1*rtsThreshold;
	document.advanced_form.tx_power.value = 1*txPower;

	if (1*shortPreamble == 1)
		document.advanced_form.short_preamble[0].checked = true;
	else
		document.advanced_form.short_preamble[1].checked = true;

	if (1*shortSlot == 1)
		document.advanced_form.short_slot[0].checked = true;
	else
		document.advanced_form.short_slot[1].checked = true;

	if (1*txBurst == 1)
		document.advanced_form.tx_burst[0].checked = true;
	else
		document.advanced_form.tx_burst[1].checked = true;

	if (1*pktAggregate == 1)
		document.advanced_form.pkt_aggregate[0].checked = true;
	else
		document.advanced_form.pkt_aggregate[1].checked = true;

	if (autoproBuilt == "1") {
		document.getElementById("div_AutoPro").style.display = "";
		document.advanced_form.auto_provision.disabled = false;
		if (autoprovision == "1")
			document.advanced_form.auto_provision[0].checked = true;
		else
			document.advanced_form.auto_provision[1].checked = true;
	} 
	else {
		document.getElementById("div_AutoPro").style.display = "none";
		document.advanced_form.auto_provision.disabled = true;
	}

	if (1*ieee80211h == 1)
		document.advanced_form.ieee_80211h[0].checked = true;
	else
		document.advanced_form.ieee_80211h[1].checked = true;

	ieee80211h_switch();
	if (dfsb == "1" && ieee80211h == 1){
		var rdregion = '<% getCfgGeneral(1, "RDRegion"); %>';
		if (rdregion == "CE")
			document.advanced_form.rd_region.options.selectedIndex = 2;
		else if (rdregion == "JAP")
			document.advanced_form.rd_region.options.selectedIndex = 1;
		else
			document.advanced_form.rd_region.options.selectedIndex = 0;
	}

	if (1*carrierib == 1){
		document.getElementById("div_carrier_detect").style.display = "";
		document.advanced_form.carrier_detect.disabled = false;
		var carrierebl = '<% getCfgZero(1, "CarrierDetect"); %>';
		if (carrierebl == "1")
			document.advanced_form.carrier_detect[0].checked = true;
		else
			document.advanced_form.carrier_detect[1].checked = true;
	}
	else{
		document.getElementById("div_carrier_detect").style.display = "none";
		document.advanced_form.carrier_detect.disabled = true;
	}

	if (1*rvtb == 1){
		document.getElementById("div_rvt").style.display = "";
		document.advanced_form.rvt.disabled = false;
		if (getRvtEnb())
			document.advanced_form.rvt[0].checked = true;
		else
			document.advanced_form.rvt[1].checked = true;
	}
	else{
		document.getElementById("div_rvt").style.display = "none";
		document.advanced_form.rvt.disabled = true;
	}

	if (1*txbfb == 1){
		document.getElementById("div_txbf").style.display = "";
		document.advanced_form.txbf.disabled = false;
		if (etxbf == "1" && itxbf == "1")
			document.advanced_form.txbf.options.selectedIndex = 0;
		else if (etxbf == "1")
			document.advanced_form.txbf.options.selectedIndex = 1;
		else if (itxbf == "1")
			document.advanced_form.txbf.options.selectedIndex = 2;
		else
			document.advanced_form.txbf.options.selectedIndex = 3;
	}
	else{
		document.getElementById("div_txbf").style.display = "none";
		document.advanced_form.txbf.disabled = true;
	}

	if (wmmCapable.indexOf("1") >= 0)
		document.advanced_form.wmm_capable[0].checked = true;
	else
		document.advanced_form.wmm_capable[1].checked = true;

	wmm_capable_enable_switch();

	if (1*APSDCapable == 1)
		document.advanced_form.apsd_capable[0].checked = true;
	else
		document.advanced_form.apsd_capable[1].checked = true;

	if (1*DLSBuilt == 1){
		if (1*DLSCapable == 1)
			document.advanced_form.dls_capable[0].checked = true;
		else
			document.advanced_form.dls_capable[1].checked = true;
	}

	//multicase to unicast converter
	document.getElementById("div_m2u").style.display = "none";
	if (1*m2uBuilt == 1) {
		document.getElementById("div_m2u").style.display = "none";//by chenfei, hidden

		if (1*m2uEnabled == 1)
			document.advanced_form.m2u_enable[0].checked = true;
		else
			document.advanced_form.m2u_enable[1].checked = true;
	}
}

function formCheck()
{
	//if(document.advanced_form.beacon.value==""){alert();return false;}
	if(document.advanced_form.beacon.value == "")
	{
		alert(MM_beacon+" "+JS_msg174);
		document.advanced_form.beacon.focus();
		return false;
	}
	else if (!numberRangeCheck(document.advanced_form.beacon.value, 20, 999, MM_beacon)) 
		return false;	
	
	if(document.advanced_form.dtim.value == "")
	{
		alert(MM_data_beacon_rate+" "+JS_msg174);
		document.advanced_form.dtim.focus();
		return false;
	}
	else if (!numberRangeCheck(document.advanced_form.dtim.value, 1, 255, MM_data_beacon_rate)) 
		return false;
	
	if(document.advanced_form.fragment.value == "")
	{
		alert(MM_fragment+" "+JS_msg174);
		document.advanced_form.fragment.focus();
		return false;
	}
	else if (!numberRangeCheck(document.advanced_form.fragment.value, 256, 2346, MM_fragment)) 
		return false;	
	
	if(document.advanced_form.rts.value == "")
	{
		alert(MM_rts+" "+JS_msg174);
		document.advanced_form.rts.focus();
		return false;
	}
	else if (!numberRangeCheck(document.advanced_form.rts.value, 1, 2347, MM_rts)) 
		return false;
	
	if(document.advanced_form.tx_power.value == "")
	{
		alert(MM_tx_tower+" "+JS_msg174);
		document.advanced_form.tx_power.focus();
		return false;
	}
	else if (!numberRangeCheck(document.advanced_form.tx_power.value, 1, 100, MM_tx_tower)) 
		return false;	

	return true;
}

function open_wmm_window()
{
	window.open("wmm.asp","WMM_Parameters_List","toolbar=no, location=yes, scrollbars=yes, resizable=no, width=700, height=480")
}

function wmm_capable_enable_switch()
{
	document.getElementById("div_apsd_capable").style.display = "none";
	document.advanced_form.apsd_capable.disabled = true;
	document.getElementById("div_dls_capable").style.display = "none";
	document.advanced_form.dls_capable.disabled = true;

	if (document.advanced_form.wmm_capable[0].checked == true){
		document.getElementById("div_apsd_capable").style.display = "";
		document.advanced_form.apsd_capable.disabled = false;
		if (1*DLSBuilt == 1){
			document.getElementById("div_dls_capable").style.display = "";
			document.advanced_form.dls_capable.disabled = false;
		}
	}
}

function ieee80211h_switch()
{
	if (dfsb == "1" && document.advanced_form.ieee_80211h[0].checked == true){
		document.getElementById("div_dfs_rdregion").style.display = "";
		document.advanced_form.rd_region.disabled = false;
	}
	else{
		document.getElementById("div_dfs_rdregion").style.display = "none";
		document.advanced_form.rd_region.disabled = true;
	}
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name=advanced_form action="/goform/wirelessAdvanced">
<input type="hidden" name="submit-url" value="/wireless/advanced.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_advanced_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_broadcast_ssid)</script>:</td>
<td><input type=radio name=broadcastssid value="0" checked><script>dw(MM_enable)</script>
<input type=radio name=broadcastssid value="1"><script>dw(MM_disable)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_isolated)</script> de AP:</td>
<td><input type=radio name=apisolated value="1"><script>dw(MM_enable)</script>
<input type=radio name=apisolated value="0" checked><script>dw(MM_disable)</script> <script>dw(MM_isolated_single_ap)</script></td>
</tr>
<tr style="display:none"> 
<td class="thead"><script>dw(MM_multiple)</script> AP <script>dw(MM_isolated)</script>:</td>
<td><input type=radio name=mbssidapisolated value="1"><script>dw(MM_enable)</script>
<input type=radio name=mbssidapisolated value="0" checked><script>dw(MM_disable)</script> <script>dw(MM_isolated_multiple_ap)</script></td>
</tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1 style="display:none"> 
<tr style="display:none">
<td class="thead"><script>dw(MM_country_code)</script>:</td>
<td><select name="country_code">
<option value="US"><script>dw(MM_united_states)</script></option>
<option value="JP"><script>dw(MM_japan)</script></option>
<option value="FR"><script>dw(MM_france)</script></option>
<option value="TW"><script>dw(MM_taiwan)</script></option>
<option value="BR"><script>dw(MM_brazil)</script></option>
<option value="HK"><script>dw(MM_hongkong)</script></option>
<option value="CN"><script>dw(MM_china)</script></option>
</select></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_bgp_mode)</script>:</td>
<td><select name="bg_protection">
<option value=0 selected><script>dw(MM_auto)</script></option>
<option value=1><script>dw(MM_on)</script></option>
<option value=2><script>dw(MM_off)</script></option>
</select></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_beacon)</script>:</td>
<td><input type=text name=beacon size=5 maxlength=3 value="100"> ms 
<font color="#808080">(<script>dw(MM_range)</script> 20 - 999, <script>dw(MM_default)</script> 100)</font></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_data_beacon_rate)</script>(DTIM):</td>
<td><input type=text name=dtim size=5 maxlength=3 value="1"> ms 
<font color="#808080">(<script>dw(MM_range)</script> 1 - 255, <script>dw(MM_default)</script> 1)</font></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_fragment)</script>:</td>
<td><input type=text name=fragment size=5 maxlength=4 value=""> 
<font color="#808080">(<script>dw(MM_range)</script> 256 - 2346, <script>dw(MM_default)</script> 2346)</font></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_rts)</script>:</td>
<td><input type=text name=rts size=5 maxlength=4 value=""> 
<font color="#808080">(<script>dw(MM_range)</script> 1 - 2347, <script>dw(MM_default)</script> 2347)</font></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_tx_tower)</script>:</td>
<td><input type=text name=tx_power size=5 maxlength=3 value="100">% 
<font color="#808080">(<script>dw(MM_range)</script> 1 - 100, <script>dw(MM_default)</script> 100)</font></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_short_preamble)</script>:</td>
<td><input type=radio name=short_preamble value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=short_preamble value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_short_slot)</script>:</td>
<td><input type=radio name=short_slot value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=short_slot value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none">
<td class="thead">Tx Burst:</td>
<td><input type=radio name=tx_burst value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=tx_burst value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_pkt_agg)</script>:</td>
<td><input type=radio name=pkt_aggregate value="1"><script>dw(MM_enable)</script>
<input type=radio name=pkt_aggregate value="0" checked><script>dw(MM_enable)</script></td>
</tr>
<tr id="div_AutoPro"> 
<td class="thead">Auto Provision:</td>
<td><input type=radio name=auto_provision value="1"><script>dw(MM_enable)</script>
<input type=radio name=auto_provision value="0" checked><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none"> 
<td class="thead"><script>dw(MM_ieee802_11h)</script>:</td>
<td><input type=radio name=ieee_80211h value="1" onClick="ieee80211h_switch()"><script>dw(MM_enable)</script>
<input type=radio name=ieee_80211h value="0" checked onClick="ieee80211h_switch()"><script>dw(MM_disable)</script>
<font color="#808080">(<script>dw(MM_aband)</script>)</font></td>
</tr>
<tr id="div_dfs_rdregion">
<td class="thead">DFS RDRegion:</td>
<td><select name="rd_region">
<option value="FCC">FCC</option>
<option value="JAP">JAP</option>
<option value="CE">CE</option>
</select></td>
</tr>
<tr id="div_carrier_detect">
<td class="thead">Carrier Detect:</td>
<td><input type="radio" name="carrier_detect" value="1"><script>dw(MM_enable)</script>
<input type="radio" name="carrier_detect" value="0" checked><script>dw(MM_disable)</script></td>
</tr>
<tr id="div_rvt">
<td class="thead">RVT:</td>
<td><input type="radio" name="rvt" value="1"><script>dw(MM_enable)</script>
<input type="radio" name="rvt" value="0" checked><script>dw(MM_disable)</script></td>
</tr>
<tr id="div_txbf">
<td class="thead">Tx Beamforming:</td>
<td><select name="txbf">
<option value="3">Both</option>
<option value="2">Explicit TxBF</option>
<option value="1">Implicit TxBF</option>
<option value="0" selected><script>dw(MM_disable)</script></option>
</select></td>
</tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1 style="display:none"> 
<tr> 
<td class="thead"><script>dw(MM_wmm_capable)</script>:</td>
<td><input type=radio name=wmm_capable value="1" onClick="wmm_capable_enable_switch()" checked><script>dw(MM_enable)</script>
<input type=radio name=wmm_capable value="0" onClick="wmm_capable_enable_switch()"><script>dw(MM_disable)</script></td>
</tr>
<tr id="div_apsd_capable">
<td class="thead"><script>dw(MM_apsd_capable)</script>:</td>
<td><input type=radio name=apsd_capable value="1"><script>dw(MM_enable)</script>
<input type=radio name=apsd_capable value="0" checked><script>dw(MM_disable)</script></td>
</tr>
<tr id="div_dls_capable">
<td class="thead">DLS Capable:</td>
<td><input type=radio name=dls_capable value="1"><script>dw(MM_enable)</script>
<input type=radio name=dls_capable value="0" checked><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none"> 
<td class="thead"><script>dw(MM_wmm_parameters)</script>:</td>
<td><script>dw('<input type=button class=button3 name="wmm_list" value="'+MM_wmm_configureation+'" onClick="open_wmm_window()">')</script></td>
</tr>
<tr id="div_m2u"> 
<td class="thead"><script>dw(MM_multicast_to_unicast)</script>:</td>
<td><input type=radio name="m2u_enable" value="1"><script>dw(MM_enable)</script>
<input type=radio name="m2u_enable" value="0"><script>dw(MM_disable)</script></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" onClick="return formCheck()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
