<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="wps_timer.js"></script>
<script language="javascript">
var http_request = false;
function makeRequest(url, content) 
{
	http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
			http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) {
		alert(JS_msg5);
		return false;
	}
	http_request.onreadystatechange = alertContents;
	http_request.open('POST', url, true);
	http_request.send(content);
}

function alertContents() 
{
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			WPSUpdateHTML( http_request.responseText);
		} else {
			//alert(JS_msg6);
		}
	}
}

function GenPINSubmit()
{
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert(JS_msg5);
        return false;
    }
    http_request.onreadystatechange = doGenPIN;
    http_request.open('POST', '/goform/GenPIN', true);
    http_request.send('n\a');
}

function doGenPIN()
{
    if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			window.location.reload();
		} else {
			//alert(JS_msg89);
		}
	}
}

function setPINModeSubmit()
{
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert(JS_msg5);
        return false;
    }
    http_request.onreadystatechange = doSetPINMode;
    http_request.open('POST', '/goform/setPINMode', true);
    http_request.send('n\a');
}

function doSetPINMode()
{
    if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			window.location.reload();
		} else {
			//alert(JS_msg89);
		}
	}
}

function WPSUpdateHTML(str)
{
	var all_str = new Array();
	all_str = str.split("\n");

	if (all_str[0] == "1" || all_str[0] == "0")
		document.getElementById("WPSConfigured").innerHTML = MM_no;
	else if (all_str[0] == "2")
		document.getElementById("WPSConfigured").innerHTML = MM_yes;
	else
		document.getElementById("WPSConfigured").innerHTML = MM_unknown;
	
	document.getElementById("WPSSSID").innerHTML = all_str[1].replace(eval("/ /gi"),'&nbsp;');

	if ((all_str[2] == "Open") && (all_str[3] == "None"))
		document.getElementById("WPSAuthMode").innerHTML = MM_none;
	else if ((all_str[2] == "Open") && (all_str[3] == "WEP"))
		document.getElementById("WPSAuthMode").innerHTML = MM_open_system;
	else if ((all_str[2] == "Shared") && (all_str[3] == "WEP"))
		document.getElementById("WPSAuthMode").innerHTML = MM_shared_key;
	else
		document.getElementById("WPSAuthMode").innerHTML = "WPA/WPA2-PSK";		
		//document.getElementById("WPSAuthMode").innerHTML = all_str[2];

	if (all_str[3] == "None")
		document.getElementById("WPSEncryptype").innerHTML = MM_none;
	else
		document.getElementById("WPSEncryptype").innerHTML = all_str[3];
		
	document.getElementById("WPSDefaultKeyIndex").innerHTML = all_str[4];
	
	if (all_str[3] == "None") {
		document.getElementById("div_encryp_type").style.display = "none";
		document.getElementById("div_default_key").style.display = "none";
		document.getElementById("div_key").style.display = "none";
	}
	else if (all_str[3] == "WEP") {	//WEP, hex/ascii
		document.getElementById("div_encryp_type").style.display = "";
		document.getElementById("div_default_key").style.display = "none";
		var wep_key_type = "<% getCfgGeneral(1, "Key1Type"); %>";	
		if (wep_key_type == 0) {//hex
			document.getElementById("div_key").style.display = "none";
			document.getElementById("WPSKeyType").innerHTML = "("+MM_hex+")";
		} 
		else {//ascii
			document.getElementById("div_key").style.display = "none";
			document.getElementById("WPSKeyType").innerHTML = "("+MM_ascii+")";
		}
	}
	else {//WPA
		document.getElementById("div_encryp_type").style.display = "";
		document.getElementById("div_default_key").style.display = "";
		document.getElementById("div_key").style.display = "";
		document.getElementById("WPSKeyType").innerHTML = "";
	}
	document.getElementById("WPSWPAKey").innerHTML = all_str[5];

	if (all_str[6] == "Idle")
		document.getElementById("WPSCurrentStatus").innerHTML = MM_idle;
	else if (all_str[6] == "Not used")
		document.getElementById("WPSCurrentStatus").innerHTML = MM_notused;
	else if(all_str[6] == "WPS falhou")
		document.getElementById("WPSCurrentStatus").innerHTML = MM_wps_fail;
	else if(all_str[6] == "Configurado")
		document.getElementById("WPSCurrentStatus").innerHTML = MM_wps_success;
	else if(all_str[6] == "Received M2D")
		document.getElementById("WPSCurrentStatus").innerHTML = MM_wps_reci;
	else
		document.getElementById("WPSCurrentStatus").innerHTML = all_str[6];
}

function updateWPS()
{
	makeRequest("/goform/updateWPS", "ra0");
/*
	document.WPSConfig.WPSEnable.disabled = false;
	document.WPS.GenPIN.disabled = false;
	document.WPS.PINPBCRadio[0].disabled = false;
	document.WPS.PINPBCRadio[1].disabled = false;
	document.WPS.PIN.disabled = false;
	document.WPS.submitWPS.disabled = false;
*/
}

function ValidateChecksum(PIN)
{
    var accum = 0;
    var tmp_str = PIN.replace("-", "");
    var pincode = tmp_str.replace(" ", "");

    document.WPS.PIN.value = pincode;
    if (pincode.length == 4)
	    return 1;
    if (pincode.length != 8)
	    return 0;
    
    accum += 3 * (parseInt(pincode / 10000000) % 10);
    accum += 1 * (parseInt(pincode / 1000000) % 10);
    accum += 3 * (parseInt(pincode / 100000) % 10);
    accum += 1 * (parseInt(pincode / 10000) % 10);
    accum += 3 * (parseInt(pincode / 1000) % 10);
    accum += 1 * (parseInt(pincode / 100) % 10);
    accum += 3 * (parseInt(pincode / 10) % 10);
    accum += 1 * (parseInt(pincode / 1) % 10);

    return ((accum % 10) == 0);
}

function PINPBCFormCheck()
{
	if (document.WPS.PINPBCRadio[1].checked) { // PIN
		if (!blankCheck(document.WPS.PIN.value, "", JS_msg58))
			return false;

		if (!ValidateChecksum(document.WPS.PIN.value)) {
			alert(JS_msg85);
			document.WPS.PIN.focus();
			return false;
		}
	} 
	return true;
}

function onPINPBCRadioClick()
{
	if (document.WPS.PINPBCRadio[1].checked == true) {// PIN
		document.getElementById("div_wps_pin").style.display = "none";//hidden
		document.getElementById("div_wps_pbc_submit").style.display = "none";//hidden
		document.getElementById("div_wps_pin_submit").style.display = "";
		document.WPS.PIN.disabled = false;
		document.WPS.submitWPS.disabled = true;
		document.WPS.submitWPSPIN.disabled = false;
	}
	else {
		document.getElementById("div_wps_pin").style.display = "none";
		document.getElementById("div_wps_pbc_submit").style.display = "";
		document.getElementById("div_wps_pin_submit").style.display = "none";//hidden
		document.WPS.PIN.disabled = true;
		document.WPS.submitWPS.disabled = false;
		document.WPS.submitWPSPIN.disabled = true;
	}
}

function Load_Setting()
{
	var wpsenable = "<% getCfgZero(1, "WscModeOption"); %>";
	var wpsmode = "<% getCfgZero(1, "WscMode"); %>";
	if (wpsenable == "0"){
		document.getElementById("WPSEnable").options.selectedIndex = 0;
		document.getElementById("div_wps_status").style.display = "none";
		document.getElementById("div_wps_tips").style.display = "none";
		document.getElementById("div_wps_config").style.display = "none";
	}
	else{
		document.getElementById("WPSEnable").options.selectedIndex = 1;
		document.getElementById("div_wps_status").style.display = "";
		document.getElementById("div_wps_tips").style.display = "";
		document.getElementById("div_wps_config").style.display = "";
		updateWPS();
		InitializeTimer(3);
	}
	if (wpsmode == "2")
		document.WPS.PINPBCRadio[0].checked = true;
	else
		document.WPS.PINPBCRadio[1].checked = true;
	
	onPINPBCRadioClick();
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method="post" name="WPSConfig" action="/goform/WPSSetup">
<input type="hidden" name="submit-url" value="/wps/wps.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_wps_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_wps_mode)</script>:</td>
<td><select id="WPSEnable" name="WPSEnable">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select> </td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td><script>dw('<input type=submit class=button value="'+BT_apply+'">')</script></td>
</tr>
</table>
</form>

<table id="div_wps_status" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_wps_current_status)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_wps_current_status)</script>:</td>
<td> <span id="WPSCurrentStatus"> </span> </td>
</tr>
<tr>
<td class="thead">WPS <script>dw(MM_configured)</script>:</td>
<td> <span id="WPSConfigured"> </span> </td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ssid)</script>:</td>
<td> <span id="WPSSSID"> </span> </td>
</tr>
<tr>
<td class="thead"><script>dw(MM_security_mode)</script>:</td>
<td> <span id="WPSAuthMode"> </span> </td>
</tr>
<tr id="div_encryp_type" style="display:none">
<td class="thead"><script>dw(MM_encryp_type)</script>:</td>
<td> <span id="WPSEncryptype"> </span> </td> 
</tr>
<tr id="div_default_key" style="display:none">
<td class="thead"><script>dw(MM_default_key)</script>:</td>
<td> <span id="WPSDefaultKeyIndex"> </span> </td>
</tr>
<tr id="div_key" style="display:none">
<td class="thead"><script>dw(MM_password)</script><span id="WPSKeyType"> </span>:</td>
<td> <span id="WPSWPAKey"> </span> </td>
</tr>
</table>
<table id="div_wps_tips" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td colspan="2" style="font-weight:bold; color:#FF0000"><script>dw(JS_msg147)</script></td>
</tr>
</table>

<br>
<form method="post" name="WPS" action="/goform/WPS">
<input type="hidden" name="submit-url" value="/wps/wps.asp">
<input type="hidden" name="pinmode">
<table id="div_wps_config" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2"><script>dw(MM_wps_configuration)</script></td>
</tr>
<tr>
<td><input name="PINPBCRadio" value="2" type="radio" checked onClick="onPINPBCRadioClick()"> <script>dw(MM_pbcmode)</script></td>
</tr>
<tr>
<td><input name="PINPBCRadio" value="1" type="radio" onClick="onPINPBCRadioClick()"> <script>dw(MM_pinmode)</script>: <% getPINASP(); %> &nbsp;&nbsp;&nbsp;&nbsp;
<script>dw('<input type=button class="button" value="'+BT_generate+'" name="GenPIN" onClick="GenPINSubmit()">')</script></td>
</tr>
<tr id="div_wps_pin" style="display:none">
<td><script>dw(JS_msg146)</script>: <input type="text" value="" name="PIN" size="8" maxlength="8"></td>
</tr>
<tr id="div_wps_pbc_submit">
<td><script>dw('<input type="submit" class=button value='+BT_apply+' name="submitWPS">')</script></td>
</tr>
<tr id="div_wps_pin_submit" style="display:none">
<td><script>dw('<input type="button" class=button value='+BT_apply+' name="submitWPSPIN" onClick="setPINModeSubmit()">')</script></td>
</tr>
</table>
</form>
 
</td></tr></table>
</body></html>
