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
var user = opener.document.forms[0].selectUser.value;
var pw = opener.document.forms[0].selectPassword.value;
var ftp = opener.document.forms[0].selectFtp.value;
var smb = opener.document.forms[0].selectSmb.value;
var ftpb = '<% getFtpBuilt(); %>';
var smbb = '<% getSmbBuilt(); %>';

function Load_Setting()
{
	document.getElementById("div_ftp").style.display = "none";
	document.getElementById("div_smb").style.display = "none";
	document.storage_edituser.edituser_ftp[0].disabled = true;
	document.storage_edituser.edituser_ftp[1].disabled = true;
	document.storage_edituser.edituser_smb[0].disabled = true;
	document.storage_edituser.edituser_smb[1].disabled = true;
	document.storage_edituser.edituser_pw.value = pw;
	
	if (ftpb == "1") {
		document.getElementById("div_ftp").style.display = "";
		document.storage_edituser.edituser_ftp[0].disabled = false;
		document.storage_edituser.edituser_ftp[1].disabled = false;
		if (ftp == "1")
			document.storage_edituser.edituser_ftp[0].checked = true;
		else
			document.storage_edituser.edituser_ftp[1].checked = true;
	}
	if (smbb == "1") {
		document.getElementById("div_smb").style.display = "";
		document.storage_edituser.edituser_smb[0].disabled = false;
		document.storage_edituser.edituser_smb[1].disabled = false;
		if (smb == "1")
			document.storage_edituser.edituser_smb[0].checked = true;
		else
			document.storage_edituser.edituser_smb[1].checked = true;
	}
}

function formCheck()
{
	return true;
}

function submit_apply()
{
	if (formCheck() == true){
		document.storage_edituser.hiddenIndex.value = index;
		document.storage_edituser.submit();
		window.close();
	}
}

function editUserClose()
{
	opener.location.reload();
}
</script>
</head>
<body onLoad="Load_Setting()" onUnload="editUserClose()">
<table width=600><tr><td>
<form method=post name="storage_edituser" action="/goform/StorageEditUser">
<input type="hidden" name="submit-url" value="/usb/storage_user_admin.asp">
<input type=hidden name=hiddenIndex value="">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_user_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><script language="javascript">document.write(user);</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type="password" name="edituser_pw" maxlength="16" value=""></td>
</tr>
<tr id="div_ftp" style="display:none"> 
<td class="thead"><script>dw(MM_ftp_srv_settings)</script>:</td>
<td><input type=radio name=edituser_ftp value="1"><script>dw(MM_yes)</script>
<input type=radio name=edituser_ftp value="0" checked><script>dw(MM_no)</script></td>
</tr>
<tr id="div_smb" style="display:none"> 
<td class="thead"><script>dw(MM_smb_settings)</script>:</td>
<td><input type=radio name=edituser_smb value="1"><script>dw(MM_yes)</script>
<input type=radio name=edituser_smb value="0" checked><script>dw(MM_no)</script></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="window.close()">')</script>
</td>
</tr>
</table
></form>

</td></tr></table>
</body></html>
