<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var count = 1;
var maxvol = parseInt('<% getMaxVol(); %>');

function Load_Setting()
{
	document.disk_parted.part2_vol.disabled = true;
	document.disk_parted.part3_vol.disabled = true;
}

function formCheck()
{
	switch(document.disk_parted.max_part.value)
	{
		case "4":
		case "3":
			if (!numberRangeCheck(document.disk_parted.part3_vol.value, 1, 100000, MM_partition+" 3")) 
				return false;
			
			maxvol -= document.disk_parted.part3_vol.value;
		case "2":
			if (!numberRangeCheck(document.disk_parted.part2_vol.value, 1, 100000, MM_partition+" 2")) 
				return false;
				
			maxvol -= document.disk_parted.part2_vol.value;
		default:
			if (!numberRangeCheck(document.disk_parted.part1_vol.value, 1, 100000, MM_partition+" 1")) 
				return false;

			maxvol -= document.disk_parted.part1_vol.value;
	}
	
	if (0 >= maxvol) {
		alert(JS_msg45);
		return false;
	}
	
	return true;
}

function parted_count_switch()
{
	document.disk_parted.part2_vol.disabled = true;
	document.disk_parted.part3_vol.disabled = true;
	switch(document.disk_parted.max_part.value)
	{
		case "4":
		case "3":
			document.disk_parted.part3_vol.disabled = false;
		case "2":
			document.disk_parted.part2_vol.disabled = false;
		default:
			document.disk_parted.part1_vol.disabled = false;
	}
}

function submit_apply()
{
	if (formCheck() == true)
		document.disk_parted.submit();

	window.opener.Load_Setting();
	window.close();
}

function editDirClose()
{
	opener.location.reload();
}
</script>
</head>
<body onLoad="Load_Setting()" onUnload="editDirClose()">
<table width=600><tr><td>
<form method=post name="disk_parted" action="/goform/storageDiskPart">
<input type="hidden" name="submit-url" value="/usb/storage_disk_admin.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_disk_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1>
<tr>
<td class="thead"><script>dw(MM_max_volume)</script>:</td>
<script language="javascript">document.write("<td>"+maxvol+" MB</td>");</script>
<tr>
<td class="thead"><script>dw(MM_partition)</script> No.</td>
<td><select name="max_part" onChange="parted_count_switch()">
<option value="1" selected>1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_partition)</script>:</td>
<td><script>dw(MM_volume)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_partition)</script> 1:</td>
<td><input type="text" size="5" maxlength="5" name="part1_vol">M</td>
</tr>
<tr>
<td class="thead"><script>dw(MM_partition)</script> 2:</td>
<td><input type="text" size="5" maxlength="5" name="part2_vol">M</td>
</tr>
<tr>
<td class="thead"><script>dw(MM_partition)</script> 3:</td>
<td><input type="text" size="5" maxlength="5" name="part3_vol">M</td>
</tr>
<tr>
<td class="thead"><script>dw(MM_partition)</script> 4:</td>
<td><input type="text" size="5" maxlength="5" name="part4_vol" value="rest" readonly></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="window.close()()">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
