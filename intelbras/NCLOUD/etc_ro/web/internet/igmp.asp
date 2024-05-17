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
	document.igmpCfg.igmpEnbl.options.selectedIndex = 1*<% getCfgZero(1, "igmpEnabled"); %>;
}

function resetForm()
{
	location=location; 
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="igmpCfg" action="/goform/setIgmp">
<input type="hidden" name="submit-url" value="/internet/igmp.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_igmp)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_igmp_proxy)</script>:</td>
<td><select name="igmpEnbl">
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
<tr><td class="title3" colspan="6">Lista de Grupos</td></tr>
<tr class="title4" align=center>
<td><b>No.</b></td>
<td><b><script>dw(MM_mac_group)</script></b></td>
<td><b><script>dw(MM_ip_group)</script></b></td>
<td><b><script>dw(MM_ip_host)</script></b></td>
<td><b><script>dw(MM_port)</script></b></td>
<td><b><script>dw(MM_status)</script></b></td>
</tr>
<% getIgmpTable(); %>
</table>

</td></tr></table>
</body></html>
