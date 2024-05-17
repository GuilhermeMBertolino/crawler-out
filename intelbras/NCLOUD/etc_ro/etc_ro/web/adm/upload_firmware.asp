<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
document.write('<div id="loading" style="display: none;"><br>'+JS_msg90+'<br></div>');

function uploadFirmwareCheck()
{
	if (document.UploadFirmware.filename.value == ""){
		alert(JS_msg10);
		return false;
	}

    document.getElementById("loading").style.display="block";
	return true;
}

function Load_Setting()
{
	document.getElementById("loading").style.display="none";
}

function checkDate(str)
{
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var week = [MM_sun, MM_mon, MM_tue, MM_wed, MM_thu, MM_fri, MM_sat];
	
	if ((str.substring(4,5)) == " ")
		str = str.replace(" ","");
	else
		str = str;
	
	var t = str.split(" ");	
	for (var j=0; j<12; j++) {
		if (t[0] == month[j]) 
			t[0] = j + 1;
	}
	
	return t[2] + "-" + t[0] + "-" + t[1];
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method="post" name="UploadFirmware" action="/cgi-bin/upload.cgi" enctype="multipart/form-data">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_upload_firmware)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_current_firmware)</script>:</td>
<td><% getSdkVersion(); %></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_firmware_date)</script>:</td>
<td><script>dw(checkDate("<% getSysBuildTime(); %>"));</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_select_firmware_file)</script>:</td>
<td><input type="file" name="filename" size="20" maxlength="256"></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type="submit" value="'+BT_upgrade+'" class=button name="UploadFirmwareSubmit" onClick="return uploadFirmwareCheck();"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
