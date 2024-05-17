<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function Load_Setting()
{
	var bridge_mode = 1*<% getCfgZero(1, "BridgeMode"); %>;
	var mac_pt = <% getMacPtBuilt(); %>;	
	document.opMode.bridgeMode.options.selectedIndex = bridge_mode;	
	document.getElementById("div_wds_setting").style.display = "none";
	document.getElementById("div_apclient_setting").style.display = "none";
	
	if (bridge_mode == 1 || bridge_mode == 2 || bridge_mode == 4)//apclient
		document.getElementById("div_apclient_setting").style.display = "";
	else if (bridge_mode == 3)//wds
		document.getElementById("div_wds_setting").style.display = "";

	if (mac_pt == 0)
		document.opMode.bridgeMode.options[4] = null;
}

function updateBridge()
{
	document.getElementById("div_wds_setting").style.display = "none";
	document.getElementById("div_apclient_setting").style.display = "none";
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="opMode" action="/goform/wirelessOpMode">
<input type="hidden" name="submit-url" value="/wireless/opmode.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_bridge_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_mode)</script>:</td>
<td><select name="bridgeMode" onChange="updateBridge()">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_bridge_mode)</script></option>
<option value="2"><script>dw(MM_repeater_mode)</script></option>
<option value="3"><script>dw(MM_wds_mode)</script></option>
<option value="4"><script>dw(MM_mac_passthrough)</script></option>
</select></td>
</tr>  
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" name=apply> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<span id="div_wds_setting">
<iframe width="700" height="0" id="WDS_Page" name="WDS_Page" src="wds.asp" frameborder="0" marginheight="0" scrolling="no"> </iframe>
</span>

<span id="div_apclient_setting">
<iframe width="700" height="0" id="APClient_Page" name="APClient_Page" src="apcli.asp" frameborder="0" marginheight="0" scrolling="no"> </iframe>
</span>

</td></tr></table>
</body></html>
