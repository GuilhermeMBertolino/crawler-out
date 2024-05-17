<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var lanIP = "<% getLanIp(); %>";
var lanMASK = "<% getLanNetmask(); %>";
var netip = lanIP.replace(/\.\d{1,3}$/,".");

function dhcpTypeSwitch()
{
	if (document.lanCfg.lanDhcpType.options.selectedIndex == 1)	{
		document.getElementById("dhcpclient").style.display = "";
		//document.getElementById("gateway").style.display = "";
		//document.getElementById("lease").style.display = "";
		//document.getElementById("pridns").style.display = "";
	}
	else {
		document.getElementById("dhcpclient").style.display = "none";
		//document.getElementById("gateway").style.display = "none";
		//document.getElementById("lease").style.display = "none";
		//document.getElementById("pridns").style.display = "none";
	}
}

function Load_Setting()
{
	document.lanCfg.lanDhcpType.options.selectedIndex = 1*<% getCfgZero(1, "dhcpEnabled"); %>;
	dhcpTypeSwitch();
}

function formCheck()
{
	if (document.lanCfg.lanDhcpType.options.selectedIndex == 1) {
		if (!ipCheck(document.lanCfg.dhcpStart.value, "DHCP "+MM_sipaddr)) 
			return false;
		
		if (!subnetCheck(document.lanCfg.dhcpStart.value, lanMASK, lanIP)) {
			alert(JS_msg28);
			document.lanCfg.dhcpStart.focus();
			return false;
		}
		
		if (!ipCheck(document.lanCfg.dhcpEnd.value, "DHCP "+MM_eipaddr)) 
			return false;
		
		if (!subnetCheck(document.lanCfg.dhcpEnd.value, lanMASK, lanIP)) {
			alert(JS_msg29);
			document.lanCfg.dhcpEnd.focus();
			return false;
		}
		
		if (!clientRangeCheck(document.lanCfg.dhcpStart.value, document.lanCfg.dhcpEnd.value)) {
			alert(JS_msg30);
			document.lanCfg.dhcpStart.focus();
			return false;
		}
		
		if ((document.lanCfg.dhcpStart.value == lanIP) || (document.lanCfg.dhcpEnd.value == lanIP)) {
			alert(JS_msg31);
			document.lanCfg.dhcpStart.focus();
			return false;		
		}

		if (!ipCheck(document.lanCfg.dhcpGateway.value, MM_default_gateway)) 
			return false;

		if (!ipCheck(document.lanCfg.dhcpPriDns.value, MM_pridns)) 
			return false;			
			
		if (!subnetCheck(document.lanCfg.dhcpGateway.value, lanMASK, lanIP)) {
			alert(JS_msg153);
			document.lanCfg.dhcpGateway.focus();
			return false;
		}
		if (document.lanCfg.dhcpLease.value == "")
		{
			alert(MM_lease_time+" "+JS_msg174);
			document.lanCfg.dhcpLease.focus();
			return false;
		}
		if (!numberRangeCheck(document.lanCfg.dhcpLease.value, 60, 86400, MM_lease_time)) 
			return false;
	}
	
	return true;
}

function dhcpClientClick(url)
{
	if (document.lanCfg.lanDhcpType.options.selectedIndex == 1)
		openWindow(url, 'DHCPTbl', 700, 400);
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="lanCfg" action="/goform/setDhcp">
<input type="hidden" name="submit-url" value="/internet/dhcp.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_dhcp_server_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_dhcp_server)</script>:</td>
<td><select name="lanDhcpType" onChange="dhcpTypeSwitch();">
<option value="DISABLE"><script>dw(MM_disable)</script></option>
<option value="SERVER"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr id="dhcpclient">
<td class="thead"><script>dw(MM_dhcppool)</script>:</td>
<td><input name="dhcpStart" maxlength=15 value="<% getCfgGeneral(1, "dhcpStart"); %>"> - <input name="dhcpEnd" maxlength=15 value="<% getCfgGeneral(1, "dhcpEnd"); %>"> <script>dw('<input type="hidden" class="button" value="'+MM_client_list+'" onClick=dhcpClientClick(\"dhcpcliinfo.asp\")>')</script></td>
<tr id="gateway" style="display:none">
<td class="thead"><script>dw(MM_default_gateway)</script></td>
<td><input name="dhcpGateway" maxlength=15 value="<% getCfgGeneral(1, "dhcpGateway"); %>"></td>
</tr>
<tr id="pridns" style="display:none">
<td class="thead"><script>dw(MM_pridns)</script>:</td>
<td><input name="dhcpPriDns" maxlength=15 value="<% getCfgGeneral(1, "dhcpPriDns"); %>"></td>
</tr>
<tr id="lease" style="display:none">
<td class="thead"><script>dw(MM_lease_time)</script>:</td>
<td><input name="dhcpLease" size="8" maxlength=8 value="<% getCfgGeneral(1, "dhcpLease"); %>"> <script>dw(MM_seconds)</script> (60-86400)</td>
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
