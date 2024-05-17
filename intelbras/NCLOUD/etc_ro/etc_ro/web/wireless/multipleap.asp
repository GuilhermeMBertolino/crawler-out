<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var mssid2 = "<% getCfgToHTML(1, "SSID2"); %>";
var mssid3 = "<% getCfgToHTML(1, "SSID3"); %>";
var security_mode = '<% getCfgGeneral(1, "AuthMode"); %>';
var encryp_type = '<% getCfgGeneral(1, "EncrypType"); %>';
var default_key_id = '<% getCfgGeneral(1, "DefaultKeyID"); %>';
var wep_keyType = '<% getCfgGeneral(1, "Key1Type"); %>';
var keyRekeyInterval = '<% getCfgGeneral(1, "RekeyInterval"); %>';

function formCheck()
{
	if (document.multi_form.mssid_2.value != "" && document.multi_form.mssid_3.value != "") {//no del
		document.multi_form.bssid_num.value = 3;
		document.multi_form.set_mssid_index.value = 3;
		document.multi_form.mssid2.value = document.multi_form.mssid_2.value;
		document.multi_form.mssid3.value = document.multi_form.mssid_3.value;
		
		document.multi_form.wlan_security_mode.value = security_mode;
		document.multi_form.wlan_encryp_type.value = encryp_type;
		document.multi_form.wlan_default_key_id.value = default_key_id;		
		document.multi_form.wlan_wep_keyType.value = wep_keyType;
		document.multi_form.wlan_wpa_keyRenewalInterval.value = keyRekeyInterval;
	}
	else if (document.multi_form.mssid_2.value == "" && document.multi_form.mssid_3.value != "") {//del ra1
		document.multi_form.bssid_num.value = 2;
		document.multi_form.set_mssid_index.value = 2;
		document.multi_form.del_mssid_index.value = 1;
		document.multi_form.mssid2.value = document.multi_form.mssid_3.value;
		document.multi_form.mssid3.value = "";
		
		document.multi_form.wlan_security_mode.value = security_mode.split(";")[0] + ";" + security_mode.split(";")[2] + ";OPEN";
		document.multi_form.wlan_encryp_type.value = encryp_type.split(";")[0] + ";" + encryp_type.split(";")[2] + ";NONE";
		document.multi_form.wlan_default_key_id.value = default_key_id.split(";")[0] + ";" + default_key_id.split(";")[2] + ";0";		
		document.multi_form.wlan_wep_keyType.value = wep_keyType.split(";")[0] + ";" + wep_keyType.split(";")[2] + ";0";
		document.multi_form.wlan_wpa_keyRenewalInterval.value = keyRekeyInterval.split(";")[0] + ";" + keyRekeyInterval.split(";")[2] + ";3600";
	}
	else if (document.multi_form.mssid_2.value != "" && document.multi_form.mssid_3.value == "") {//del ra2
		document.multi_form.bssid_num.value = 2;
		document.multi_form.set_mssid_index.value = 1;
		document.multi_form.del_mssid_index.value = 2;
		document.multi_form.mssid2.value = document.multi_form.mssid_2.value;
		document.multi_form.mssid3.value = "";
		
		document.multi_form.wlan_security_mode.value = security_mode.split(";")[0] + ";" + security_mode.split(";")[1] + ";OPEN";
		document.multi_form.wlan_encryp_type.value = encryp_type.split(";")[0] + ";" + encryp_type.split(";")[1] + ";NONE";
		document.multi_form.wlan_default_key_id.value = default_key_id.split(";")[0] + ";" + default_key_id.split(";")[1] + ";0";		
		document.multi_form.wlan_wep_keyType.value = wep_keyType.split(";")[0] + ";" + wep_keyType.split(";")[1] + ";0";
		document.multi_form.wlan_wpa_keyRenewalInterval.value = keyRekeyInterval.split(";")[0] + ";" + keyRekeyInterval.split(";")[1] + ";3600";
	}
	else {//del ra1 & ra2
		document.multi_form.bssid_num.value = 1;
		document.multi_form.set_mssid_index.value = 0;
		document.multi_form.del_mssid_index.value = 0;
		document.multi_form.mssid2.value = "";
		document.multi_form.mssid3.value = "";
		
		document.multi_form.wlan_security_mode.value = security_mode.split(";")[0] + ";OPEN;OPEN";
		document.multi_form.wlan_encryp_type.value = encryp_type.split(";")[0] + ";NONE;NONE";
		document.multi_form.wlan_default_key_id.value = default_key_id.split(";")[0] + ";0;0";		
		document.multi_form.wlan_wep_keyType.value = wep_keyType.split(";")[0] + ";0;0";
		document.multi_form.wlan_wpa_keyRenewalInterval.value = keyRekeyInterval.split(";")[0] + ";3600;3600";
	}
		
	return true;
}

function delMBSSID(ssid_index)
{
	if (ssid_index == 1) {
		document.multi_form.mssid_2.value = "";
		document.multi_form.mssid2.value = mssid3;
		document.multi_form.mssid3.value = "";
		document.multi_form.bssid_num.value = 2;
		document.multi_form.del_mssid_index.value = 1;
		
		document.multi_form.wlan_security_mode.value = security_mode.split(";")[0] + ";" + security_mode.split(";")[2] + ";OPEN";
		document.multi_form.wlan_encryp_type.value = encryp_type.split(";")[0] + ";" + encryp_type.split(";")[2] + ";NONE";
		document.multi_form.wlan_default_key_id.value = default_key_id.split(";")[0] + ";" + default_key_id.split(";")[2] + ";0";		
		document.multi_form.wlan_wep_keyType.value = wep_keyType.split(";")[0] + ";" + wep_keyType.split(";")[2] + ";0";
		document.multi_form.wlan_wpa_keyRenewalInterval.value = keyRekeyInterval.split(";")[0] + ";" + keyRekeyInterval.split(";")[2] + ";3600";
	}
	else {
		document.multi_form.mssid_3.value = "";
		document.multi_form.mssid2.value = mssid2;
		document.multi_form.mssid3.value = "";
		document.multi_form.bssid_num.value = 2;
		document.multi_form.del_mssid_index.value = 2;
		
		document.multi_form.wlan_security_mode.value = security_mode.split(";")[0] + ";" + security_mode.split(";")[1] + ";OPEN";
		document.multi_form.wlan_encryp_type.value = encryp_type.split(";")[0] + ";" + encryp_type.split(";")[1] + ";NONE";
		document.multi_form.wlan_default_key_id.value = default_key_id.split(";")[0] + ";" + default_key_id.split(";")[1] + ";0";		
		document.multi_form.wlan_wep_keyType.value = wep_keyType.split(";")[0] + ";" + wep_keyType.split(";")[1] + ";0";
		document.multi_form.wlan_wpa_keyRenewalInterval.value = keyRekeyInterval.split(";")[0] + ";" + keyRekeyInterval.split(";")[1] + ";3600";
	}	
		
	return true;	
}

function setWlanSecurity(ssid_index)
{
	window.location.href = "multi_security.asp#flag="+ssid_index;
}

function Load_Setting()
{
	if (mssid2 == "") {
		document.multi_form.ssid1_sec.disabled  = true;
		document.multi_form.ssid1_del.disabled  = true;
	}
	else {
		document.multi_form.ssid1_sec.disabled  = false;
		document.multi_form.ssid1_del.disabled  = false;
	}
		
	if (mssid3 == "") {	
		document.multi_form.ssid2_sec.disabled  = true;
		document.multi_form.ssid2_del.disabled  = true;
	}
	else {
		document.multi_form.ssid2_sec.disabled  = false;
		document.multi_form.ssid2_del.disabled  = false;
	}
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name=multi_form action="/goform/wirelessMultipleap">
<input type="hidden" name="submit-url" value="/wireless/multipleap.asp">
<input type="hidden" name="bssid_num">
<input type="hidden" name="set_mssid_index">
<input type="hidden" name="del_mssid_index">
<input type="hidden" name="mssid2" value="<% getCfgToHTML(1, "SSID2"); %>">
<input type="hidden" name="mssid3" value="<% getCfgToHTML(1, "SSID3"); %>">
<input type="hidden" name="wlan_security_mode">
<input type="hidden" name="wlan_encryp_type">
<input type="hidden" name="wlan_default_key_id">
<input type="hidden" name="wlan_wep_keyType">
<input type="hidden" name="wlan_wpa_keyRenewalInterval">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_multiple_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead">Nome da Rede (SSID) 1:</td>
<td><input type=text name=mssid_2 maxlength=32 value="<% getCfgToHTML(1, "SSID2"); %>">&nbsp;&nbsp;<script>dw('<input type=submit class=button name="ssid1_del" value="'+BT_remove+'" onClick="delMBSSID(1)">')</script>&nbsp;&nbsp;<script>dw('<input type=button class=button name="ssid1_sec" value="'+BT_security_setting+'" onClick="setWlanSecurity(1)">')</script></td>
</tr>
<tr> 
<td class="thead">Nome da Rede (SSID) 2:</td>
<td><input type=text name=mssid_3 maxlength=32 value="<% getCfgToHTML(1, "SSID3"); %>">&nbsp;&nbsp;<script>dw('<input type=submit class=button name="ssid2_del" value="'+BT_remove+'" onClick="delMBSSID(2)">')</script>&nbsp;&nbsp;<script>dw('<input type=button class=button name="ssid2_sec" value="'+BT_security_setting+'" onClick="setWlanSecurity(2)">')</script></td>
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
