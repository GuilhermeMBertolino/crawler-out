<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var http_request = false;
function macCloneMacFillSubmit()
{
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert(JS_msg5);
        return false;
    }
    http_request.onreadystatechange = doFillMyMAC;
    http_request.open('POST', '/goform/getMyMAC', true);
    http_request.send('n\a');
}

function doFillMyMAC()
{
    if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			document.getElementById("macCloneMac").value = http_request.responseText;
		} else {
			alert(JS_msg89);
		}
	}
}

function macCloneSwitch()
{
	if (document.clonemac.macCloneEnbl.options.selectedIndex == 1)
		document.getElementById("macCloneMacRow").style.display = "";
	else
		document.getElementById("macCloneMacRow").style.display = "none";
}

function formCheck()
{
	if (document.clonemac.macCloneEnbl.options.selectedIndex == 1) {
		if (!macCheck(document.clonemac.macCloneMac.value, MM_macaddr))  
			return false;
	}

	return true;
}

function Load_Setting()
{
	var clone_mode = "<% getCfgZero(1, "macCloneEnabled"); %>";
	if (clone_mode == 1) {
		document.clonemac.macCloneEnbl.options.selectedIndex = 1;
		document.clonemac.macCloneMac.value = "<% getCfgGeneral(1, "macCloneMac"); %>";
	} else {
		document.clonemac.macCloneEnbl.options.selectedIndex = 0;
		document.clonemac.macCloneMac.value = "";
	}
	
	macCloneSwitch();
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="clonemac" action="/goform/setCloneMac">
<input type="hidden" name="submit-url" value="/internet/clone_mac.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_clone_mac_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_clone_mac)</script>:</td>
<td><select name="macCloneEnbl" onChange="macCloneSwitch()">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr id="macCloneMacRow">
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input name="macCloneMac" id="macCloneMac" maxlength=17 value=""> 
<script>dw('<input type="button" class=button value="'+BT_clone_mac+'" onClick="macCloneMacFillSubmit();">')</script></td>
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
</form>

</td></tr></table>
</body></html>
