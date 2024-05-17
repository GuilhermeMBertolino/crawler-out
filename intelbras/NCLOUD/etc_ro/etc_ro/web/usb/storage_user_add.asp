<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var ftpb = '<% getFtpBuilt(); %>';
var smbb = '<% getSmbBuilt(); %>';
var usrFile = '<% getUsrFileBuilt(); %>';
var all_str = "<% getCfgGeneral(1, "AdmUsers"); %>";
var root = "<% getCfgGeneral(1, "Login"); %>";

function Load_Setting()
{
	document.getElementById("div_ftp").style.display = "none";
	document.getElementById("div_smb").style.display = "none";
	document.getElementById("div_usr_file").style.display = "none";
	document.storage_adduser.adduser_ftp[0].disabled = true;
	document.storage_adduser.adduser_ftp[1].disabled = true;
	document.storage_adduser.adduser_smb[0].disabled = true;
	document.storage_adduser.adduser_smb[1].disabled = true;
	document.storage_adduser.adduser_file[0].disabled = true;
	document.storage_adduser.adduser_file[1].disabled = true;
	
	if (ftpb == "1") {
		document.getElementById("div_ftp").style.display = "";
		document.storage_adduser.adduser_ftp[0].disabled = false;
		document.storage_adduser.adduser_ftp[1].disabled = false;
	} 
	if (smbb == "1") {
		document.getElementById("div_smb").style.display = "";
		document.storage_adduser.adduser_smb[0].disabled = false;
		document.storage_adduser.adduser_smb[1].disabled = false;
	}
	if (usrFile == "1")
	{
		document.getElementById("div_usr_file").style.display = "";
		document.storage_adduser.adduser_file[0].disabled = false;
		document.storage_adduser.adduser_file[1].disabled = false;
	}
}

function formCheck()
{
	if (!blankUserCheck2(document.storage_adduser.adduser_name.value, JS_msg170)) 
		return false;
	
	if (!blankCheck(document.storage_adduser.adduser_pw.value, "", JS_msg166)) 
		return false;
	
	if (!stringCheck(document.storage_adduser.adduser_name.value, MM_username)) 
		return false;

	var p = all_str.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		if(q[0] == document.storage_adduser.adduser_name.value){
			alert(JS_msg163);
			return false
		}
	}

	if(document.storage_adduser.adduser_name.value == "anonymous" || document.storage_adduser.adduser_name.value == root){
		alert(JS_msg163);
		return false;
	}
	
	if(document.storage_adduser.adduser_file[0].checked){
	       var h = 0;
	       if(part_count == 1){
	       	if (document.storage_adduser.disk_part.checked == true)
	       		h=1;
	       }
	       else{
	       	for(i=0;i<part_count;i++)
			{
				if (document.storage_adduser.disk_part[i].checked == true){
					h = 1;
					break;
				}
			}
	       }

		if (!h)
		{
			alert(JS_msg164);
			return false;
		}
	}
	return true;
}

function addUserClose()
{
	opener.location.reload();
}

function submit_apply()
{
	if (formCheck() == true) {
		document.storage_adduser.submit();
		disableAllButton();	
   		setTimeout("window.close()",300);
		//window.close();
	}
}
</script>
</head>
<body onLoad="Load_Setting()" onUnload="addUserClose()">
<table width=600><tr><td>
<form method=post name="storage_adduser" action="/goform/StorageAddUser">
<input type="hidden" name="submit-url" value="/usb/storage_user_admin.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_user_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><input type=text name=adduser_name maxlength=16 value=""></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type="password" name="adduser_pw" maxlength="16" value=""></td>
</tr>
<tr id="div_ftp" style="display:none"> 
<td class="thead"><script>dw(MM_ftp_srv_settings)</script>:</td>
<td><input type=radio name=adduser_ftp value="1" checked><script>dw(MM_yes)</script>
<input type=radio name=adduser_ftp value="0" ><script>dw(MM_no)</script></td>
</tr>
<tr id="div_smb" style="display:none"> 
<td class="thead"><script>dw(MM_smb_settings)</script>:</td>
<td><input type=radio name=adduser_smb value="1" checked><script>dw(MM_yes)</script>
<input type=radio name=adduser_smb value="0" ><script>dw(MM_no)</script></td>
</tr>
<tr id="div_usr_file" style="display:none"> 
<td class="thead"><script>dw(MM_usr_file)</script>:</td>
<td><input type=radio name=adduser_file value="1" checked><script>dw(MM_yes)</script>
<input type=radio name=adduser_file value="0" ><script>dw(MM_no)</script></td>
</tr>
</table>
<table width=60% border=0 cellpadding=3 cellspacing=3>
<td class="thead"><script>dw(MM_choose)</script>:</td>
<% ShowPartition2(); %>
<script language="javascript">
part_count = parseInt('<% getCount(1, "AllPart"); %>');
</script>
</table>
<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()"> &nbsp; &nbsp;\
<input type=button class=button value="'+MM_usb_close+'" onClick="window.close()">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
