<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var superdmzbuilt = "<% getSuperDMZBuilt(); %>";
var dmz_enable = "<% getCfgGeneral(1, "DMZEnable"); %>";
var dmz_tcpport80 = "<% getCfgGeneral(1, "DMZAvoidTCPPort80"); %>";
var lanIP = "<% getLanIp(); %>";
var lanMask = "<% getLanNetmask(); %>";

function updateState()
{
	if (document.DMZ.DMZEnabled.options.selectedIndex == 0){
		document.DMZ.DMZAddress.disabled = true;
		document.DMZ.DMZTCPPort80.disabled = true;
	} else{
		document.DMZ.DMZAddress.disabled = false;
		document.DMZ.DMZTCPPort80.disabled = false;
	}
}

function formCheck()
{
	if (!document.DMZ.DMZEnabled.options.selectedIndex) 
		return true;
	
	if (document.DMZ.DMZEnabled.options.selectedIndex == 1) {
		if (!ipCheck(document.DMZ.DMZAddress.value, MM_dmz_host_ip)) 
			return false;
		
		if (!subnetCheck(document.DMZ.DMZAddress.value, lanMask, lanIP)) {
			alert(JS_msg20);
			document.DMZ.DMZAddress.focus();
			return false;
		}

		if (document.DMZ.DMZAddress.value == lanIP) {
			alert(JS_msg102);
			document.DMZ.DMZAddress.focus();
			return false;		
		}
	} else if (document.DMZ.DMZEnabled.options.selectedIndex == 2) {
		if (!macCheck(document.DMZ.DMZAddress.value, MM_dmz_host_ip)) 
			return false;
	}
	
	document.DMZ.DMZTCPPort80.value = document.DMZ.DMZTCPPort80.checked ? "1": "0";	
	return true;
}

function Load_Setting()
{
	document.DMZ.DMZTCPPort80.checked = false;
	document.DMZ.DMZTCPPort80.value = "0";
	if (dmz_enable == "0"){
		document.DMZ.DMZEnabled.options.selectedIndex = 0;
		document.DMZ.DMZTCPPort80.disabled = true;
		document.DMZ.DMZAddress.disabled = true;
	} else{
		document.DMZ.DMZAddress.disabled = false;
		document.DMZ.DMZTCPPort80.disabled = false;
		
		if (dmz_enable == "1")
			document.DMZ.DMZEnabled.options.selectedIndex = 1;
		else if (dmz_enable == "2")
			document.DMZ.DMZEnabled.options.selectedIndex = 2;

		if (dmz_tcpport80 != "" &&dmz_tcpport80 != "0"){
			document.DMZ.DMZTCPPort80.value = "1";
			document.DMZ.DMZTCPPort80.checked = true;
		}
	}

	if (superdmzbuilt != "1")
		document.DMZ.DMZEnabled.options[2] = null;
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="DMZ" action=/goform/DMZ>
<input type="hidden" name="submit-url" value="/firewall/dmz.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1>
<tr><td class="title"><script>dw(MM_dmz_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead">DMZ:</td>
<td><select onChange="updateState()" name="DMZEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
<option value=2>Super DMZ</option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_dmz_host_ip)</script>:</td>
<td><input type="text" name="DMZAddress" value="<% getCfgGeneral(1, "DMZIPAddress"); %>"><span style="display:none"> <input type=checkbox name="DMZTCPPort80" value="0"> Use port 80</span></td>
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
