<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var index = opener.document.forms[0].selectIndex.value;
var dir_name = opener.document.forms[0].selectDir.value;
var allowuser = opener.document.forms[0].selectPermit.value;
var path = opener.document.forms[0].selectPath.value;

function submit_apply()
{
	document.smb_editdir.hidden_index.value = opener.document.forms[0].selectIndex.value;
	document.smb_editdir.submit();
	opener.location.reload();
	window.close();
}

function editDirClose()
{
	opener.location.reload();
}
</script>
</head>
<body onUnload="editDirClose()">
<table width=600><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_edit_smb_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<form method=post name="smb_editdir" action="/goform/SmbDirEdit">
<input type="hidden" name="submit-url" value="/usb/smb_srv.asp">
<input type=hidden name=hidden_index value="">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_dir_name)</script>:</td>
<td><script language="javascript">document.write(dir_name);</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_path)</script>:</td>
<td><script language="javascript">document.write(path);</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_access_user)</script>:</td>
<td>
<script language="javascript">
for (i=1;i<=8;i++){
	var user = eval('opener.document.forms[0].hidden_user'+i+'.value');
	if (user != ""){
		var items = "";
		items += user;
		if (allowuser.indexOf(user) >= 0)
			items += "<input type=\"checkbox\" name=\"allow_user\" value=\""+user+"\" checked>";
		else
			items += "<input type=\"checkbox\" name=\"allow_user\" value=\""+user+"\">";
		document.write(items);
	}
}
</script>
</td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_close+'" onClick="window.close()">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
