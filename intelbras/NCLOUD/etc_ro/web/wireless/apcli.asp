<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function SecurityModeSwitch()
{
	document.getElementById("div_apcli_key1").style.display = "none";
	document.getElementById("div_aplci_enc").style.display = "none";
	document.getElementById("div_apcli_wpapsk").style.display = "none";
	
	var mode = document.apcli_form.apcli_mode;
	if (mode.selectedIndex == 1) {
		document.getElementById("div_apcli_key1").style.display = "";
	}	
	else if (mode.selectedIndex >= 2) {
		document.getElementById("div_aplci_enc").style.display = "";
		document.getElementById("div_apcli_wpapsk").style.display = "";
	}
}

function Load_Setting()
{
	var mode = '<% getCfgGeneral(1, "ApCliAuthMode"); %>';
	var enc = '<% getCfgGeneral(1, "ApCliEncrypType"); %>';

	if (mode == "OPEN" && enc == "NONE")
		document.apcli_form.apcli_mode.options.selectedIndex = 0;//None
	else if (enc == "WEP")
		document.apcli_form.apcli_mode.options.selectedIndex = 1;//WEP
	else if (mode == "WPAPSK")
		document.apcli_form.apcli_mode.options.selectedIndex = 2;//WPAPSK
	else if (mode == "WPA2PSK")
		document.apcli_form.apcli_mode.options.selectedIndex = 3;//WPA2PSK

	SecurityModeSwitch();
	
	document.apcli_form.apcli_key1type.value = 1*'<% getCfgGeneral(1, "ApCliKey1Type"); %>';
	
	if (enc == "TKIP")
		document.apcli_form.apcli_enc.options.selectedIndex = 0;//TKIP
	else if (enc == "AES")
		document.apcli_form.apcli_enc.options.selectedIndex = 1;//AES
}

function formCheck()
{
	if (!ssidCheck(document.apcli_form.apcli_ssid.value, MM_ssid)) 
		return false;

	if (document.apcli_form.apcli_bssid.value != '') 
		if (!macCheck(document.apcli_form.apcli_bssid.value, MM_macaddr))  
			return false;

	if (document.apcli_form.apcli_mode.options.selectedIndex == 1) {
		var wepkey = document.apcli_form.apcli_key1.value;
		if (wepkey.length == 0){
			alert(JS_msg52);
			return false;
		}
	
		if (document.apcli_form.apcli_key1type.options.selectedIndex == 0) {
			if (wepkey.length != 5 && wepkey.length != 13) {
				alert(JS_msg53);
				return false;
				
				if (!stringCheck(wepkey, MM_password))
					return false;
			}
		}
	}
	else if (document.apcli_form.apcli_mode.options.selectedIndex >= 2) {
		var wpakey = document.apcli_form.apcli_wpapsk.value;
		if (wpakey.length < 8){
			alert(JS_msg17);
			return false;
		}
		
		if (!stringCheck(wpakey, MM_password))
			return false;
	}
		
	return true;
}

function resetForm()
{
	location=location; 
}

function open_search_ap() 
{ 
	window.open("site_survey.asp", "newwindow", "height=550, width=700, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no"); 
} 

function opera()
{
	var i;
	var a = window.parent.document.getElementsByTagName('iframe');  
	for (var i=0; i<a.length; i++){  
		if (a[i].name == self.name) {  
			a[i].height = document.body.scrollHeight; 
			return;  
		}  
	}  
}
</script>
</head>
<body onLoad="opera();Load_Setting()">
<table width=700><tr><td>
<form method=post name=apcli_form action="/goform/wirelessApcli">
<input type="hidden" name="submit-url" value="/wireless/apcli.asp">
<input type="hidden" name="apcli_channel" value="<% getCfgGeneral(1, "Channel"); %>">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_repeater_status)</script>:</td>
<td><script>dw(<% getInfo(1, "apcliStatus"); %>)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_ssid)</script>:</td>
<td><input type=text name="apcli_ssid" size=32 maxlength=32 value="<% getCfgToHTML(1, "ApCliSsid"); %>"> <script>dw('<input type=button class=button name="search_AP" value='+BT_search_ap+' onClick="open_search_ap()">')</script></td>
</tr>
<tr> 
<td class="thead">BSSID (<script>dw(MM_macaddr)</script>):</td>
<td><input type=text name="apcli_bssid" size=17 maxlength=17 value="<% getCfgGeneral(1, "ApCliBssid"); %>"> (<script>dw(MM_optional)</script>)</td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_security_mode)</script>:</td>
<td><select name="apcli_mode" onChange="SecurityModeSwitch();">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEP">WEP</option>
<option value="WPAPSK">WPAPSK</option>
<option value="WPA2PSK">WPA2PSK</option>
</select></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_encryp_type)</script>:</td>
<td><select name="apcli_key1type"> 
<option value="1"><script>dw(MM_ascii)</script></option>
<option value="0"><script>dw(MM_hex)</script></option>
</select></td>
</tr>
<tr id="div_apcli_key1">
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input name="apcli_key1" maxlength="26" value="<% getCfgGeneral(1, "ApCliKey1Str"); %>"></td>
</tr>
<tr id="div_aplci_enc">
<td class="thead"><script>dw(MM_encryp_type)</script>:</td>
<td><select name="apcli_enc">
<option value="TKIP">TKIP</option>
<option value="AES">AES</option></select></td>
</tr>
<tr id="div_apcli_wpapsk"> 
<td class="thead"><script>dw(MM_passphrase)</script>:</td>
<td><input type=text name="apcli_wpapsk" size=32 maxlength=64 value="<% getCfgGeneral(1, "ApCliWPAPSK"); %>"></td>
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
