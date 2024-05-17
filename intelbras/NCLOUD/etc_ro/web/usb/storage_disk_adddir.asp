<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var part_count = 0;

function formCheck()
{
	if (!blankCheckDir(document.disk_adddir.adddir_name.value, MM_dir_name)) 
		return false;
	
	if (!stringCheck(document.disk_adddir.adddir_name.value, MM_dir_name)) 
		return false;
//	if (!checkStringValue(document.disk_adddir.adddir_name.value, MM_dir_name)){ 
//		alert(JS_msg187);
//		return false;
//	}
	if (part_count <= 0){
		alert(JS_msg41);
		return false;
	}else if (part_count == 1){
		if (document.disk_adddir.disk_part.checked == false){
			alert(JS_msg35);
			return false;
		}
	}else if (part_count > 1){
		for(i=0;i<part_count;i++){
			if (document.disk_adddir.disk_part[i].checked == true)
				break;
		}
		if (i == part_count){
			alert(JS_msg35);
			return false;
		}
	}
	
	return true;
}

function submit_apply()
{
	if (formCheck() == true){
		document.disk_adddir.hiddenButton.value = "add";
		document.disk_adddir.submit();
		//opener.location.reload();
		//alert('ok');
		setTimeout("window.close()",300);
	}
}

function addDirClose()
{
	opener.location.reload();
}
</script>
</head>
<body onUnload="addDirClose()">
<table width=600><tr><td>
<form method=post name="disk_adddir" action="/goform/storageDiskAdm">
<input type="hidden" name="submit-url" value="/usb/storage_disk_admin.asp">
<input type="hidden" name="hiddenButton" value="">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_disk_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_dir_name)</script>:</td>
<td><input type=text name=adddir_name maxlength=16 value=""></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr class="title4" align=center>
<td></td>
<!--
<td><b><script>dw(MM_partition)</script></b></td>
-->
<td><b><script>dw(MM_path)</script></b></td>
</tr>
<% ShowPartition(); %>
<script language="javascript">
part_count = parseInt('<% getCount(1, "AllPart"); %>');
</script>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply();"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_close+'" onClick="window.close()">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
