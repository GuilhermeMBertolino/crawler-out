<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/ajax.js"></script>
<script language="javascript">
var usb_state = 1*"<% getInfo(1, "usbStatus"); %>";
var ftpenabled = '<% getCfgZero(1, "FtpEnabled"); %>';
var smbenabled = '<% getCfgZero(1, "SmbEnabled"); %>';
var bt_enable = "<% getCfgGeneral(1, "TorrentEnabled"); %>";
var dlna_enable =  '<% getCfgGeneral(1, "DlnaEnabled"); %>';
var itunes_enable = '<% getCfgGeneral(1, "iTunesEnable"); %>';
var anonymous = '<% getCfgZero(1, "FtpAnonymous"); %>';
var ftpname = '<% getCfgGeneral(1, "FtpName"); %>';
var port = '<% getCfgGeneral(1, "FtpPort"); %>';
var maxsessions = '<% getCfgGeneral(1, "FtpMaxSessions"); %>';
var adddir = '<% getCfgZero(1, "FtpAddDir"); %>';
var rename = '<% getCfgZero(1, "FtpRename"); %>';
var remove = '<% getCfgZero(1, "FtpRemove"); %>';
var readfile = '<% getCfgZero(1, "FtpRead"); %>';
var writefile = '<% getCfgZero(1, "FtpWrite"); %>';
var download = '<% getCfgZero(1, "FtpDownload"); %>';
var upload = '<% getCfgZero(1, "FtpUpload"); %>';
var all_str = "<% getCfgGeneral(1, "AdmUsers"); %>";
var rules_num = <% FtpRuleNums(); %>;
var portStatus=0;
var firstwizard= '<% getCfgGeneral(1, "FirstWizard"); %>';

function Load_Setting()
{
	if(!ftpenabled) checkPort();
	else portStatus=1;
	if (usb_state == 0) {
		document.getElementById("div_no_usbdivice").style.display = "";
		document.getElementById("div_usbdivice").style.display = "none";
	} else {
		document.getElementById("div_no_usbdivice").style.display = "none";
		document.getElementById("div_usbdivice").style.display = "";
	}
	
	document.storage_ftp.ftp_anonymous[0].disabled = true;
	document.storage_ftp.ftp_anonymous[1].disabled = true;
	document.storage_ftp.ftp_name.disabled = true;
	document.storage_ftp.ftp_port.disabled = true;
	document.storage_ftp.ftp_max_sessions.disabled = true;
	document.storage_ftp.ftp_adddir[0].disabled = true;
	document.storage_ftp.ftp_adddir[1].disabled = true;
	document.storage_ftp.ftp_rename[0].disabled = true;
	document.storage_ftp.ftp_rename[1].disabled = true;
	document.storage_ftp.ftp_remove[0].disabled = true;
	document.storage_ftp.ftp_remove[1].disabled = true;
	document.storage_ftp.ftp_read[0].disabled = true;
	document.storage_ftp.ftp_read[1].disabled = true;
	document.storage_ftp.ftp_write[0].disabled = true;
	document.storage_ftp.ftp_write[1].disabled = true;
	document.storage_ftp.ftp_download[0].disabled = true;
	document.storage_ftp.ftp_download[1].disabled = true;
	document.storage_ftp.ftp_upload[0].disabled = true;
	document.storage_ftp.ftp_upload[1].disabled = true;
	document.del_ftp.add.disabled = true;
	document.del_ftp.del.disabled = true;

	if (ftpenabled == "1") {
		document.storage_ftp.ftp_enabled[0].checked = true;
		document.storage_ftp.ftp_anonymous[0].disabled = false;
		document.storage_ftp.ftp_anonymous[1].disabled = false;
		//document.getElementById("ftpinfo").style.display = "";
		if (anonymous == 1)
			document.storage_ftp.ftp_anonymous[0].checked = true;
		else
			document.storage_ftp.ftp_anonymous[1].checked = true;
		
		document.storage_ftp.ftp_name.disabled = false;
		document.storage_ftp.ftp_name.value = ftpname;

		document.storage_ftp.ftp_port.disabled = false;
		document.storage_ftp.ftp_port.value = port;

		document.storage_ftp.ftp_max_sessions.disabled = false;
		document.storage_ftp.ftp_max_sessions.value = maxsessions;

		document.storage_ftp.ftp_adddir[0].disabled = false;
		document.storage_ftp.ftp_adddir[1].disabled = false;
		if (adddir == 1)
			document.storage_ftp.ftp_adddir[0].checked = true;
		else
			document.storage_ftp.ftp_adddir[1].checked = true;

		document.storage_ftp.ftp_rename[0].disabled = false;
		document.storage_ftp.ftp_rename[1].disabled = false;
		if (rename == 1)
			document.storage_ftp.ftp_rename[0].checked = true;
		else
			document.storage_ftp.ftp_rename[1].checked = true;
		
		document.storage_ftp.ftp_remove[0].disabled = false;
		document.storage_ftp.ftp_remove[1].disabled = false;
		if (remove == 1)
			document.storage_ftp.ftp_remove[0].checked = true;
		else
			document.storage_ftp.ftp_remove[1].checked = true;

		document.storage_ftp.ftp_read[0].disabled = false;
		document.storage_ftp.ftp_read[1].disabled = false;
		if (readfile == 1)
			document.storage_ftp.ftp_read[0].checked = true;
		else
			document.storage_ftp.ftp_read[1].checked = true;

		document.storage_ftp.ftp_write[0].disabled = false;
		document.storage_ftp.ftp_write[1].disabled = false;
		if (writefile == 1)
			document.storage_ftp.ftp_write[0].checked = true;
		else
			document.storage_ftp.ftp_write[1].checked = true;

		document.storage_ftp.ftp_download[0].disabled = false;
		document.storage_ftp.ftp_download[1].disabled = false;
		if (download == 1)
			document.storage_ftp.ftp_download[0].checked = true;
		else
			document.storage_ftp.ftp_download[1].checked = true;

		document.storage_ftp.ftp_upload[0].disabled = false;
		document.storage_ftp.ftp_upload[1].disabled = false;
		if (upload == 1)
			document.storage_ftp.ftp_upload[0].checked = true;
		else
			document.storage_ftp.ftp_upload[1].checked = true;

		document.del_ftp.add.disabled = false;
		document.del_ftp.del.disabled = false;
	} else {
		document.storage_ftp.ftp_enabled[1].checked = true;
		//document.getElementById("ftpinfo").style.display = "none";
	}
}

function formCheck()
{
	if (document.storage_ftp.ftp_enabled[0].checked == true) {
		if (!blankCheck(document.storage_ftp.ftp_name.value, MM_ftp_name, JS_msg58)) 
			return false;
		
		if (!portCheck(document.storage_ftp.ftp_port.value, MM_ftp_port)) 
			return false;
		else if(!portStatus)
		{
			alert(JS_msg176);
			return false;
		}	
		
		if (document.storage_ftp.ftp_max_sessions.value.length==0){ 
			alert(JS_msg211);
			return false;		
		}
		if (!numberCheck(document.storage_ftp.ftp_max_sessions.value, MM_ftp_max_sessions)) 
			return false;

		if (!numberRangeCheck(document.storage_ftp.ftp_max_sessions.value, 1, 5, MM_ftp_max_sessions))
			return false;
		//checkUsbSer(ftp,smb,torrent,dlna,iTunes)
		if(0==ftpenabled){
			if(checkUsbSer(ftpenabled,smbenabled,bt_enable,dlna_enable,itunes_enable)){
				return false;
			}
		}
	}

	return true;
}

function ftp_enable_switch()
{
	if (document.storage_ftp.ftp_enabled[1].checked == true) {
		document.storage_ftp.ftp_anonymous[0].disabled = true;
		document.storage_ftp.ftp_anonymous[1].disabled = true;
		document.storage_ftp.ftp_name.disabled = true;
		document.storage_ftp.ftp_port.disabled = true;
		document.storage_ftp.ftp_max_sessions.disabled = true;
		document.storage_ftp.ftp_adddir[0].disabled = true;
		document.storage_ftp.ftp_adddir[1].disabled = true;
		document.storage_ftp.ftp_rename[0].disabled = true;
		document.storage_ftp.ftp_rename[1].disabled = true;
		document.storage_ftp.ftp_remove[0].disabled = true;
		document.storage_ftp.ftp_remove[1].disabled = true;
		document.storage_ftp.ftp_read[0].disabled = true;
		document.storage_ftp.ftp_read[1].disabled = true;
		document.storage_ftp.ftp_write[0].disabled = true;
		document.storage_ftp.ftp_write[1].disabled = true;
		document.storage_ftp.ftp_download[0].disabled = true;
		document.storage_ftp.ftp_download[1].disabled = true;
		document.storage_ftp.ftp_upload[0].disabled = true;
		document.storage_ftp.ftp_upload[1].disabled = true;
//		document.getElementById("ftpinfo").style.display = "none";
		document.del_ftp.add.disabled = true;
		document.del_ftp.del.disabled = true;
	} else {
		document.storage_ftp.ftp_anonymous[0].disabled = false;
		document.storage_ftp.ftp_anonymous[1].disabled = false;
		document.storage_ftp.ftp_name.disabled = false;
		document.storage_ftp.ftp_port.disabled = false;
		document.storage_ftp.ftp_max_sessions.disabled = false;
		document.storage_ftp.ftp_adddir[0].disabled = false;
		document.storage_ftp.ftp_adddir[1].disabled = false;
		document.storage_ftp.ftp_rename[0].disabled = false;
		document.storage_ftp.ftp_rename[1].disabled = false;
		document.storage_ftp.ftp_remove[0].disabled = false;
		document.storage_ftp.ftp_remove[1].disabled = false;
		document.storage_ftp.ftp_read[0].disabled = false;
		document.storage_ftp.ftp_read[1].disabled = false;
		document.storage_ftp.ftp_write[0].disabled = false;
		document.storage_ftp.ftp_write[1].disabled = false;
		document.storage_ftp.ftp_download[0].disabled = false;
		document.storage_ftp.ftp_download[1].disabled = false;
		document.storage_ftp.ftp_upload[0].disabled = false;
		document.storage_ftp.ftp_upload[1].disabled = false;
//		document.getElementById("ftpinfo").style.display = "";
		document.del_ftp.add.disabled = false;
		document.del_ftp.del.disabled = false;
	}
}

function deleteClick()
{
   	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.del_ftp.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg35);
	return false;
}

function open_diradd_window()
{
	var cnt = 0;
	var p = all_str.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		if(q[2] == 1)
			cnt++;
	}

	if(rules_num == 10){
		alert(JS_msg37);
		return false;
	}
	
	if(cnt == 0 && anonymous == 0 ){
		alert(JS_msg162);
		return false;
	}
	
	window.open("ftp_adddir.asp","Ftp_Dir_Add","toolbar=no, location=no, scrollbars=yes, resizable=no, width=640, height=440");
}

function resultFun(data){
	if(data==1){
		portStatus=0;
	}else{
		portStatus=1;
	}
}
function errorFun(readyState,status){
}

function checkPort(){
	var frm = document.getElementById("portcheckfrm");
	if(document.storage_ftp.ftp_enabled[0].checked)
		frm.enabled.value=document.storage_ftp.ftp_enabled[0].value;
	else
		frm.enabled.value=document.storage_ftp.ftp_enabled[1].value;
	frm.port.value=document.storage_ftp.ftp_port.value;
	Ajax.getInstance('/goform/checkPort','',0,resultFun,errorFun);Ajax.post(frm);
}


function checkPort2(){
	if(document.storage_ftp.ftp_port.value !=port)
	checkPort();
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
<form method=post name=storage_ftp action="/goform/Ftp_Init">
<input type="hidden" name="submit-url" value="/usb/ftp_srv.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_ftp_srv_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_function)</script> FTP:</td>
<td><input type=radio name=ftp_enabled value="1" onClick="ftp_enable_switch();checkPort2();"><script>dw(MM_enable)</script>
<input type=radio name=ftp_enabled value="0" onClick="ftp_enable_switch();checkPort2();" checked><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_ftp_name)</script>:</td>
<td><input type=text name=ftp_name maxlength=16 value="NCLOUD">.com</td>
</tr>
<tr style="display:none;"> 
<td class="thead" style="display:none;"><script>dw(MM_ftp_anonymous_login)</script>:</td>
<td style="display:none;"><input type=radio name=ftp_anonymous value="1"><script>dw(MM_enable)</script>
<input type=radio name=ftp_anonymous value="0" checked><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_port)</script>:</td>
<td><input type=text name=ftp_port size=5 maxlength=5 value="21" onChange="checkPort();"> (1-65535)</td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_max_sessions)</script>:</td>
<td><input type=text name=ftp_max_sessions size=2 maxlength=2 value="5"> (1-5)</td>
</tr>
</table>

<table style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_ftp_create_dir)</script>:</td>
<td><input type=radio name=ftp_adddir value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_adddir value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_rename_file_dir)</script>:</td>
<td><input type=radio name=ftp_rename value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_rename value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_remove_file_dir)</script>:</td>
<td><input type=radio name=ftp_remove value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_remove value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_readfile)</script>:</td>
<td><input type=radio name=ftp_read value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_read value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_writefile)</script>:</td>
<td><input type=radio name=ftp_write value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_write value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_download_capability)</script>:</td>
<td><input type=radio name=ftp_download value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_download value="0"><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ftp_upload_capability)</script>:</td>
<td><input type=radio name=ftp_upload value="1" checked><script>dw(MM_enable)</script>
<input type=radio name=ftp_upload value="0"><script>dw(MM_disable)</script></td>
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
</form>

<br>
<form method=post name=del_ftp action="/goform/Ftp_Del">
<input type="hidden" name="submit-url" value="/usb/ftp_srv.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td colspan="3"><b><script>dw(MM_sharing_dir_list)</script></b></td></tr>
<tr class="title4" align=center>
<td>&nbsp;</td>
<td><b><script>dw(MM_allows_users)</script></b></td>
<td><b><script>dw(MM_dir_name)</script></b></td>    
</tr>
<% Ftp_Show(); %>
<tr>
<td colspan="3">
<script>dw('<input type=button class="button" name="add" value="'+BT_add+'" onClick="open_diradd_window()"> &nbsp; &nbsp;\
<input type="submit" class="button"  onClick="return deleteClick()" name="del" value="'+BT_delete+'">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
<form method=post id="portcheckfrm" action="/goform/checkPort" style="display:none;">
<input type=text name="enabled" value="">
<input type=text name="port" value="">
</form>
</body></html>
