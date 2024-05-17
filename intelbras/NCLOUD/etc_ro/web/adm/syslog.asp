<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var syslogEnabled = 1*'<% getCfgZero(1, "syslogEnabled"); %>';
function clearLogClick()
{
	return true;
}

function refreshLogClick()
{
	window.location.reload();
}

function updateState()
{
	if (document.syslog.syslogEnbl.options.selectedIndex == 1) {
		document.getElementById("clear_syslog").disabled = false;
		document.getElementById("refresh_syslog").disabled = false;
	}
	else {
		document.getElementById("clear_syslog").disabled = true;
		document.getElementById("refresh_syslog").disabled = true;
	}
}

function Load_Setting()
{
	document.syslog.syslogEnbl.options.selectedIndex = syslogEnabled;
	updateState();
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="syslog" action="/goform/setSyslog">
<input type="hidden" name="submit-url" value="/adm/syslog.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_syslog)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_syslog)</script>:</td>
<td><select name="syslogEnbl" onChange="updateState()">
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


<form method="post" name="clearLog" action="/goform/clearlog">
<input type="hidden" name="submit-url" value="/adm/syslog.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td><textarea name="syslog" id="syslog" style="font-size:9pt;width:95%" rows="20" wrap="off" readonly="1"><% showSyslog(); %></textarea></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type="submit" class=button id="clear_syslog" value="'+BT_clear+'" onClick="clearLogClick();"> &nbsp; &nbsp;\
<input type="button" class=button id="refresh_syslog" value="'+BT_refresh+'" onClick="refreshLogClick();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
