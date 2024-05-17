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
	var rm = "<% getCfgGeneral(1, "RemoteManagement"); %>";
	if (rm == "1")
		document.remote.remoteManagementEnabled.options.selectedIndex = 1;
	else
		document.remote.remoteManagementEnabled.options.selectedIndex = 0;

	updateState();
}

function updateState()
{
	if (document.remote.remoteManagementEnabled.options.selectedIndex==1) {  	
		enableTextField(document.remote.port);
	} else {
		disableTextField(document.remote.port);
	}
}

function formCheck()
{
	if (!portCheck(document.remote.port.value, MM_port))
		return false;
	
	return true;
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="remote" action=/goform/websSysRemote>
<input type="hidden" name="submit-url" value="/firewall/remote.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_remote_set)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_remote)</script>:</td>
<td><select onChange="updateState()" name="remoteManagementEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr>
<td class=thead><script>dw(MM_port)</script>:</td>
<td><input type="text" size=5 name="port" maxlength="5" value="<% getCfgGeneral(1, "RemoteManagementPort"); %>"></td>
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
