<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function reloadfileCheck()
{
	var str=document.ImportSettings.filename.value;
	if (str == "") { 
		alert(JS_msg7);
		return false;
	} 
	
	if (str.toLowerCase().indexOf(".dat") == -1) {
		alert(JS_msg8);
		return false;
	}
	return true;
}
</script>
</head>
<body>
<table width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_system_config)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<form method="post" name="ExportSettings" action="/cgi-bin/ExportSettings.sh">
  <tr>
    <td class="thead"><script>dw(MM_save_config_file)</script>:</td>
    <td><script>dw('<input type="submit" class=button value="'+BT_save+'" name="Export">')</script></td>
  </tr>
</form>

<form method="post" name="ImportSettings" action="/cgi-bin/upload_settings.cgi" enctype="multipart/form-data">
  <tr>
    <td class="thead"><script>dw(MM_update_config_file)</script>:</td>
    <td><input type="File" name="filename" size="20" maxlength="256"> 
    <script>dw('<input type=submit class=button value="'+BT_update+'" onClick="return reloadfileCheck()">')</script></td>
  </tr>
</form>
</table>

</td></tr></table>
</body></html>
