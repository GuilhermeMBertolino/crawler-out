<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var usb_state = 1*'<% getInfo(1, "usbStatus"); %>';
var user0 = '<% getCfgGeneral(1, "Login"); %>';
var guest = '<% getCfgZero(1, "FtpAnonymous"); %>';
var rules_num = <% StorageGetUserNum(); %>;
var firstwizard= '<% getCfgGeneral(1, "FirstWizard"); %>';

function Load_Setting()
{
	if (usb_state == 0) {
		document.getElementById("div_no_usbdivice").style.display = "";
		document.getElementById("div_usbdivice").style.display = "none";
	} else {
		document.getElementById("div_no_usbdivice").style.display = "none";
		document.getElementById("div_usbdivice").style.display = "";
	}
}

function deleteClick()
{
   	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.storage_user_adm.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg35);
	return false;
}

function submit_apply(parm)
{
	if (deleteClick()){
		document.storage_user_adm.hiddenButton.value = parm;
		document.storage_user_adm.submit();
	}
}

function open_useradd_window()
{
	if(rules_num == 10){
		alert(JS_msg37);
		return false;
	}
	
	window.open("storage_user_add.asp","Storage_User_Add","toolbar=no, location=no, scrollbars=yes, resizable=no, width=640, height=440");
}

</script>
</head>

<body onLoad="Load_Setting()">
<table id="div_no_usbdivice" style="display:none" width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td><img src="../graphics/warning.gif" align="absmiddle">&nbsp;&nbsp;
<script>dw(JS_msg148)</script>&nbsp;&nbsp;
<script>dw('<input type=button class=button value="'+BT_refresh+'" onClick="window.location.reload()">')</script></td></tr>
</table>
</td></tr></table>

<table id="div_usbdivice" width=700><tr><td>
<form method=post name=storage_user_adm action="/goform/StorageDelUser">
<input type="hidden" name="submit-url" value="/usb/storage_user_admin.asp">
<input type=hidden name=hiddenButton value="">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_user_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr class="title4" align=center>
<td><b>ID.</b></td>
<td><b><script>dw(MM_username)</script></b></td>
<td><b><script>dw(MM_allow_to_use_ftp)</script></b></td>
<td ><b><script>dw(MM_allow_to_use_smb)</script></b></td>
<td ><b>Criar pasta do usuário</b></td>
</tr>
<script>
if (firstwizard == "0"){
	document.write("<tr align=center><td>"+"--"+"</td><td>"+user0+"</td><td>");
	document.write(MM_yes+"</td><td>");
	document.write(MM_yes+"</td><td>");
	document.write("--"+"</td><tr>");
}
//if (guest == "1")
//	document.write("<tr align=center><td>"+"--"+"</td><td>"+"anonymous"+"</td><td>"+MM_yes+"</td><td>"+MM_no+"</td><td>"+"--"+"</td><tr>");
//else
//	document.write("<tr align=center><td>"+"--"+"</td><td>"+"anonymous"+"</td><td>"+MM_no+"</td><td>"+MM_no+"</td><td>"+"--"+"</td><tr>");
</script>
<% StorageShowUser(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw(' <input type="button" class="button" value='+BT_add+' onClick="open_useradd_window()">&nbsp;&nbsp;\
<input type="button" class="button" value="'+BT_delete+'" onClick=submit_apply(\"delete\")>')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
