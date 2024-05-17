<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var wpsenable  = '<% getCfgZero(1, "WscModeOption"); %>';
var ht_disallow_tkip = '<% getCfgZero(1, "HT_DisallowTKIP"); %>';
var key_interval = '<% getCfgGeneral(1, "RekeyInterval"); %>';
var security_mode = '<% getCfgGeneral(1, "AuthMode"); %>';
var encryp_type = '<% getCfgGeneral(1, "EncrypType"); %>';
var wep_key_type = '<% getCfgGeneral(1, "Key1Type"); %>';
var wep_key = '<% getCfgGeneral(1, "Key1Str1"); %>';
var wpa_key = '<% getCfgGeneral(1, "WPAPSK1"); %>';
var default_key_id = '<% getCfgGeneral(1, "DefaultKeyID"); %>';

function check_wpa()
{
	if (document.security_form.cipher[0].checked != true && 
	   	document.security_form.cipher[1].checked != true &&
	   	document.security_form.cipher[2].checked != true){
	   	alert(JS_msg78);
	   	return false;
	}

	// there is no tkip-aes mixed mode in WPA-PSK.
	if (document.security_form.security_mode.value == "WPAPSK" && document.security_form.cipher[2].checked == true){
		document.security_form.cipher[0].checked = true;
		document.security_form.cipher[1].checked = false;
		document.security_form.cipher[2].checked = false;
	}
	
	if (!numberCheck(document.security_form.keyRenewalInterval.value, MM_key_renewal_interval)) 
		return false;
					
	if (ht_disallow_tkip == "1" && document.security_form.cipher[0].checked)
		alert(JS_msg80);
	
	return true;
}

function check_wep()
{
	var keylength = document.security_form.wep_key.value.length;	
	if (keylength == 0){ 
		alert(JS_msg52);
		return false;
	}
	
	if (keylength != 0){
		if (document.security_form.WEPSelect.options.selectedIndex == 0){
			if (keylength != 5 && keylength != 13) {
				alert(JS_msg53);
				return false;
			}
			
			if (!stringCheck(document.security_form.wep_key.value, MM_password))
				return false;
		}
		if (document.security_form.WEPSelect.options.selectedIndex == 1){
			if (keylength != 10 && keylength != 26) {
				alert(JS_msg54);
				return false;
			}
			
			if (!hexCheck(document.security_form.wep_key.value, MM_password))
				return false;
		}
	}
	
	if (ht_disallow_tkip == "1")
		alert(JS_msg80);
	
	return true;
}

function formCheck()
{
	var securitymode = document.security_form.security_mode.value;
	if (securitymode == "NONE"){
		if (wpsenable != "0") 
			alert(JS_msg69);
	}
	else if (securitymode == "WEPOPEN"){
		if (!check_wep())  
			return false;
		
		if (wpsenable != "0") 
			alert(JS_msg70);
	} 
	else if (securitymode == "WPAPSK" || securitymode == "WPA2PSK" || securitymode == "WPAPSKWPA2PSK" /* || security_mode == 5 */) {
		var wpakey = document.security_form.passphrase.value;
		if (wpakey.length < 8)	{
			alert(JS_msg71);
			return false;
		}
		
		if (!stringCheck(document.security_form.passphrase.value, MM_password))
			return false;
		
		if (wpakey.length == 64 && !hexCheck(document.security_form.passphrase.value, MM_password)) {
			alert(JS_msg72);
			return false;
		}
		
		if (check_wpa() == false)  
			return false;
	}

	return true;
}

function securityMode()
{
	document.getElementById("div_wep").style.display = "none";
	document.getElementById("div_wpa").style.display = "none";
	document.getElementById("div_wpa_algorithms").style.display = "none";
	document.getElementById("wpa_passphrase").style.display = "none";
	document.getElementById("wpa_key_renewal_interval").style.display = "none";
	document.security_form.cipher[0].disabled = true;
	document.security_form.cipher[1].disabled = true;
	document.security_form.cipher[2].disabled = true;
	document.security_form.passphrase.disabled = true;
	document.security_form.keyRenewalInterval.disabled = true;

	var security_mode = document.security_form.security_mode.value;
	if (security_mode == "WEPOPEN"){
		document.getElementById("div_wep").style.display = "";
	}
	else if (security_mode == "WPAPSK" || security_mode == "WPA2PSK" || security_mode == "WPAPSKWPA2PSK"){
		document.getElementById("div_wpa").style.display = "";
		document.getElementById("div_wpa_algorithms").style.display = "";
		document.security_form.cipher[0].disabled = false;
		document.security_form.cipher[1].disabled = false;

		// deal with TKIP-AES mixed mode
		if (security_mode == "WPA2PSK" || security_mode == "WPAPSKWPA2PSK")
			document.security_form.cipher[2].disabled = false;

		document.getElementById("wpa_passphrase").style.display = "";
		document.getElementById("wpa_key_renewal_interval").style.display = "";
		document.security_form.passphrase.disabled = false;
		document.security_form.keyRenewalInterval.disabled = false;
	}
}

function onWEPSelect()
{
	if (document.security_form.WEPSelect.selectedIndex==0)
		document.security_form.wep_key.maxLength=13;
	else
		document.security_form.wep_key.maxLength=26;
}

function Load_Setting()
{
	if (encryp_type.split(";")[0] == "NONE")
		document.security_form.security_mode.selectedIndex = 0;
	else if (encryp_type.split(";")[0] == "WEP") {
		document.security_form.security_mode.selectedIndex = 1;
		document.security_form.WEPSelect.value = wep_key_type.split(";")[0];
	}
	else {
		if (security_mode.split(";")[0] == "WPAPSK")
			document.security_form.security_mode.selectedIndex = 2;
		else if (security_mode.split(";")[0] == "WPA2PSK")
			document.security_form.security_mode.selectedIndex = 3;
		else if (security_mode.split(";")[0] == "WPAPSKWPA2PSK")
			document.security_form.security_mode.selectedIndex = 4;
			
		if (encryp_type.split(";")[0] == "TKIP")
			document.security_form.cipher[0].checked = true;
		else if (encryp_type.split(";")[0] == "AES")
			document.security_form.cipher[1].checked = true;
		else if (encryp_type.split(";")[0] == "TKIPAES")
			document.security_form.cipher[2].checked = true;
		
		document.security_form.keyRenewalInterval.value = key_interval.split(";")[0];
	}
		
	
	onWEPSelect();
	securityMode();
	
	document.security_form.security_mode2.value = security_mode.split(";")[1];
	document.security_form.encryp_type2.value = encryp_type.split(";")[1];
	document.security_form.default_key_id2.value = default_key_id.split(";")[1];
	document.security_form.WEPSelect2.value = wep_key_type.split(";")[1];
	document.security_form.keyRenewalInterval2.value = key_interval.split(";")[1];
	
	document.security_form.security_mode3.value = security_mode.split(";")[2];
	document.security_form.encryp_type3.value = encryp_type.split(";")[2];
	document.security_form.default_key_id3.value = default_key_id.split(";")[2];
	document.security_form.WEPSelect3.value = wep_key_type.split(";")[2];
	document.security_form.keyRenewalInterval3.value = key_interval.split(";")[2];
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method="post" name="security_form" action="/goform/wirelessSecurity">
<input type="hidden" name="submit-url" value="/wireless/security.asp">
<input type="hidden" name="multi_flag" value="0">
<input type="hidden" name="security_mode2">
<input type="hidden" name="encryp_type2">
<input type="hidden" name="default_key_id2">
<input type="hidden" name="WEPSelect2">
<input type="hidden" name="keyRenewalInterval2">

<input type="hidden" name="security_mode3">
<input type="hidden" name="encryp_type3">
<input type="hidden" name="default_key_id3">
<input type="hidden" name="WEPSelect3">
<input type="hidden" name="keyRenewalInterval3">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_security_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_ssid)</script>:</td>
<td><% getCfgToHTML(1, "SSID1"); %></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_security_mode)</script>:</td>
<td><select name="security_mode" onChange="securityMode()">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEPOPEN"><script>dw("WEP")</script></option>
<option value="WPAPSK"><script>dw("WPA-PSK")</script></option>
<option value="WPA2PSK"><script>dw("WPA2-PSK")</script></option>
<option value="WPAPSKWPA2PSK"><script>dw("WPA/WPA2-PSK")</script></option>
</select></td>
</tr>
</table>
<table id="div_wep" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_key_type)</script>:</td>
<td><input name="wep_key" maxlength="26" value="<% getCfgGeneral(1, "Key1Str1"); %>"> <select name="WEPSelect" onChange="onWEPSelect()"> 
<option value="1"><script>dw(MM_ascii)</script></option>
<option value="0"><script>dw(MM_hex)</script></option>
</select></td>
</tr>
</table>

<table id="div_wpa" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr id="div_wpa_algorithms" style="display:none">
<td class="thead"><script>dw(MM_wpa_alg)</script>:</td>
<td><input name="cipher" value="TKIP" type="radio">TKIP
<input name="cipher" value="AES" type="radio" checked>AES
<input name="cipher" value="TKIPAES" type="radio">TKIP+AES</td>
</tr>
<tr id="wpa_passphrase" style="display:none">
<td class="thead"><script>dw(MM_passphrase)</script>:</td>
<td><input name="passphrase" maxlength="64" value="<% getCfgGeneral(1, "WPAPSK1"); %>"></td>
</tr>
<tr id="wpa_key_renewal_interval" style="display:none">
<td class="thead"><script>dw(MM_key_renewal_interval)</script>:</td>
<td><input name="keyRenewalInterval" size="6" maxlength="4" value="3600"> <script>dw(MM_seconds)</script></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type="submit" class="button" value="'+BT_apply+'" onClick="return formCheck()"> &nbsp; &nbsp;\
<input type="button" class="button" value="'+BT_reset+'" onClick="window.location.reload();" >')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
