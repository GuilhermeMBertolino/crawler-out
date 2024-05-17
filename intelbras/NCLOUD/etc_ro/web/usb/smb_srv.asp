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
var ftpenabled = '<% getCfgZero(1, "FtpEnabled"); %>';
var smbenabled = '<% getCfgZero(1, "SmbEnabled"); %>';
var bt_enable = "<% getCfgGeneral(1, "TorrentEnabled"); %>";
var dlna_enable =  '<% getCfgGeneral(1, "DlnaEnabled"); %>';
var itunes_enable = '<% getCfgGeneral(1, "iTunesEnable"); %>';
var rules_num = <% SmbRuleNums(); %>;
var all_str = "<% getCfgGeneral(1, "AdmUsers"); %>";

function Load_Setting()
{
	if (usb_state == 0){
		document.getElementById("div_no_usbdivice").style.display = "";
		document.getElementById("div_usbdivice").style.display = "none";
	}else{
		document.getElementById("div_no_usbdivice").style.display = "none";
		document.getElementById("div_usbdivice").style.display = "";
	}
	
	if (smbenabled == "1"){
		document.storage_smb.smb_enabled[0].checked = true;

	}else{
		document.storage_smb.smb_enabled[1].checked = true;
	}
	
	smb_enable_switch();
}

function deleteClick()
{
   	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.storage_smb.delRule"+i);
		if(tmp.checked == true)
			return true;		
	}
	alert(JS_msg35);
	return false;
}

function formCheck()
{
	if (document.storage_smb.smb_enabled[0].checked == true){
		if (!blankCheck(document.storage_smb.smb_workgroup.value, "", JS_msg157)) 
			return false;
			
		if (!checkStringValue3(document.storage_smb.smb_workgroup.value)) {
			alert(JS_msg212);
			return false;
		}
				
		if (!blankCheck(document.storage_smb.smb_netbios.value, "", JS_msg144)) 
			return false;
		if(0==smbenabled){
			if(checkUsbSer(ftpenabled,smbenabled,bt_enable,dlna_enable,itunes_enable)){
				return false;
			}
		}			
	}

	document.storage_smb.hiddenButton.value = "apply";
	return true;
}

function smb_enable_switch()
{
	if (document.storage_smb.smb_enabled[1].checked == true){
		document.storage_smb.smb_workgroup.disabled = true;
		document.storage_smb.smb_netbios.disabled = true;
		document.storage_smb.add.disabled = true;
		document.storage_smb.del.disabled = true;
	}else{
		document.storage_smb.smb_workgroup.disabled = false;
		document.storage_smb.smb_netbios.disabled = false;
		document.storage_smb.add.disabled = false;
		document.storage_smb.del.disabled = false;
	}
}

function open_diradd_window()
{
	var cnt = 0;
	var p = all_str.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		if(q[3] == 1)
			cnt++;
	}

	if(rules_num == 10){
		alert(JS_msg37);
		return false;
	}
	
	if(cnt == 0){
		alert(JS_msg162);
		return false;
	}
	
	window.open("smb_adddir.asp","Samba_Dir_Add","toolbar=no, location=no, scrollbars=yes, resizable=no, width=640, height=440");
}
function submit_apply()
{
	if (deleteClick()){
		document.storage_smb.hiddenButton.value = "delete";
		document.storage_smb.submit();
	}
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
<form method=post name=storage_smb action="/goform/Smb_Init">
<input type="hidden" name="submit-url" value="/usb/smb_srv.asp">
<input type=hidden name=hiddenButton value="">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_smb_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_function)</script> SAMBA:</td>
<td><input type=radio name=smb_enabled value="1" onClick="smb_enable_switch()"><script>dw(MM_enable)</script>
<input type=radio name=smb_enabled value="0" onClick="smb_enable_switch()" checked><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_workgroup)</script>:</td>
<td><input type=text name=smb_workgroup maxlength=16 value='<% getCfgGeneral(1, "HostName"); %>'></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_netbios)</script>:</td>
<td><input type=text name=smb_netbios maxlength=16 value='<% getCfgGeneral(1, "SmbNetBIOS"); %>'></td>
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

<br>
<table id="smbinfo" width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="4"><script>dw(MM_sharing_dir_list)</script></td></tr>
<tr class="title4" align=center>
<td>&nbsp;</td>
<td><b><script>dw(MM_allows_users)</script></b></td>
<td><b><script>dw(MM_dir_path)</script></b></td>
<td><b><script>dw(MM_dir_name)</script></b></td>
</tr>
<tbody id="smbdir">
<% Smb_Show(); %>
</tbody>
<tr>
<td colspan="4">
<script>dw('<input type=button name="add" class="button" value="'+BT_add+'" onClick="open_diradd_window()"> &nbsp; &nbsp;\
<input type=button class="button" name="del" value="'+BT_delete+'" onClick=submit_apply()>')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
