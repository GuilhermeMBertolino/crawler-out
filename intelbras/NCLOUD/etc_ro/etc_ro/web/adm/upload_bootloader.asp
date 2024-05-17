<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
document.write('<div id="loading" style="display: none;"><br><br><br>Uploading the bootloader file.<br><br>Please be patient and don\'t remove usb device if it presented...</div>');

var _singleton = 0;
function formBootloaderCheck()
{
	if (_singleton)
		return false;
		
	if (document.UploadBootloader.filename.value == "")
	{
		alert(JS_msg12);
		return false;
	}

	//document.UploadBootloader.UploadBootloaderSubmit.disabled = true;
	document.getElementById("loading").style.display="block";
	_singleton = 1;
	return true;
}

function Load_Setting()
{
    document.UploadBootloader.UploadBootloaderSubmit.disabled = false;
	document.getElementById("loading").style.display="none";
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title">Upgrade Bootloader</td></tr>
<tr><td>Upgrade the bootloader to obtain new functionality. It takes about 1 minute to upload & upgrade flash and be patient please. Caution! A corrupted image will hang up the system.</td></tr>
<tr><td>&nbsp;</td></tr>
</table>

<form method="post" name="UploadBootloader" action="/cgi-bin/upload_bootloader.cgi" enctype="multipart/form-data">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
  <tr>
    <td class="thead">Bootloader file:</td>
    <td><input name="filename" size="20" maxlength="256" type="file"> <input type="submit" value="Upgrade" class=button name="UploadBootloaderSubmit" onClick="return formBootloaderCheck();"></td>
  </tr>
</table>
</form>

</td></tr></table>
</body></html>
