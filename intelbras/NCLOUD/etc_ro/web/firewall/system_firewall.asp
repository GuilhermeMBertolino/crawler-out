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
	document.sysFirewall.pingFrmWANFilterEnabled.options.selectedIndex = 1*<% getCfgGeneral(1, "WANPingFilter"); %>;
	document.sysFirewall.spiFWEnabled.options.selectedIndex = 1*<% getCfgGeneral(1, "SPIFWEnabled"); %>;
	document.sysFirewall.blockPortScanEnabled.options.selectedIndex = 1*<% getCfgGeneral(1, "BlockPortScan"); %>;
	document.sysFirewall.blockSynFloodEnabled.options.selectedIndex = 1*<% getCfgGeneral(1, "BlockSynFlood"); %>;
	document.sysFirewall.l2tpPT.options.selectedIndex = 1*<% getCfgZero(1, "l2tpPassThru"); %>;	
	document.sysFirewall.pptpPT.options.selectedIndex = 1*<% getCfgZero(1, "pptpPassThru"); %>;
	document.sysFirewall.ipsecPT.options.selectedIndex = 1*<% getCfgZero(1, "ipsecPassThru"); %>;
}
</script>
</head>
<body onLoad="Load_Setting()" onselectstart="return false";>
<table width=700><tr><td>
<form method=post name="sysFirewall" action=/goform/websSysFirewall>
<input type="hidden" name="submit-url" value="/firewall/system_firewall.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_sys_firewall)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_discard_wanping)</script>:</td>
<td><select name="pingFrmWANFilterEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_block_port_scan)</script>:</td>
<td><select name="blockPortScanEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr style="display:none">
<td class="thead" ><script>dw(MM_block_syn_flood)</script>:</td>
<td><select name="blockSynFloodEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_spi_firewall)</script>:</td>
<td><select name="spiFWEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1 selected><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_l2tp_passthrough)</script>:</td>
<td><select name="l2tpPT">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>  
<tr style="display:none">
<td class="thead"><script>dw(MM_pptp_passthrough)</script>:</td>
<td><select name="pptpPT">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_ipsec_passthrough)</script>:</td>
<td><select name="ipsecPT">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
