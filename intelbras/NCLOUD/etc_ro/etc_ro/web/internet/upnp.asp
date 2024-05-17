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
	document.upnpCfg.upnpEnbl.options.selectedIndex = 1*<% getCfgZero(1, "upnpEnabled"); %>;
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="upnpCfg" action="/goform/setUpnp">
<input type="hidden" name="submit-url" value="/internet/upnp.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_upnp_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead">UPnP:</td>
<td><select name="upnpEnbl">
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

<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="6"><script>dw(MM_upnp_list)</script></td></tr>
<tr class="title4" align=center>
<td><b>ID</b></td>
<td><b><script>dw(MM_protocol)</script></b></td>
<td><b><script>dw(MM_external_port)</script></b></td>
<td><b><script>dw(MM_ipaddr)</script></b></td>
<td><b><script>dw(MM_internal_port)</script></b></td>
<td><b><script>dw(MM_status)</script></b></td>
<td><b><script>dw(MM_comment)</script></b></td>
</tr>
<% getUpnpTable(); %>
</table>

</td></tr></table>
</body></html>
