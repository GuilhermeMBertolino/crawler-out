<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var rules_num = 0;
var entries = new Array();
var all_str = '<% getCfgGeneral(1, "AccessControlList0"); %>';
var AccessPolicyEnabled = '<% getCfgGeneral(1, "AccessPolicy0"); %>';

function Load_Setting()
{
	if (!rules_num) {
 		disableButton(document.wirelessMacfilterDelete.deleteSelMac);
 		disableButton(document.wirelessMacfilterDelete.reset);
	}
	else{
        enableButton(document.wirelessMacfilterDelete.deleteSelMac);
        enableButton(document.wirelessMacfilterDelete.reset);
	}
	
	document.BasicSettings.enabled.value = AccessPolicyEnabled;
}

function deleteClick()
{
	for (i=0; i< rules_num; i++) {
		var tmp = eval("document.wirelessMacfilterDelete.DR"+i);
		if (tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function addClick()
{
	if (rules_num >= 20) {
		alert(JS_msg23);
		return false;
	}	

	if (!macCheck(document.wirelessMacfilter.mac_address.value, MM_macaddr)) 
		return false;	
	
	var p = all_str.split(";");
	for(var j=0; j<p.length; j++){			
		if ( (document.wirelessMacfilter.mac_address.value==p[j]) || (document.wirelessMacfilter.mac_address.value.toLowerCase()==p[j].toLowerCase())) {
			alert(JS_msg9);
			return false;
		}
	}	
   	
	return true;
}

var xml = false;
function macFilterSubmit(value)
{
	xml = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        xml = new XMLHttpRequest();
        if (xml.overrideMimeType) {
            xml.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            xml = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
            xml = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!xml) {
        alert(JS_msg5);
        return false;
    }
    xml.onreadystatechange = doChange;
	xml.open('POST', '/goform/wirelessMacfilter', true);
	xml.send('AccessPolicyEnabled='+value);
}

function doChange()
{
    if (xml.readyState == 4){
		if (xml.status == 200){
			window.location.reload();
		} else {
			//alert(JS_msg6);
		}
	}
}

function resetForm()
{
	location=location; 
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width="700"><tr><td>
<form method=post name="BasicSettings" action="/goform/wirelessMacfilter">
<input type="hidden" name="submit-url" value="/wireless/macfilter.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1>
<tr><td class="title"><script>dw(MM_wireless_mac_list)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_auth_mode)</script></td>
<td><select onChange="macFilterSubmit(this.value)" name="enabled">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_allow)</script></option>
<option value="2"><script>dw(MM_deny)</script></option>
</select></td>
</tr>
</table>
</form>

<form method=post name="wirelessMacfilter" action="/goform/wirelessMacfilterAdd">
<input type="hidden" name="submit-url" value="/wireless/macfilter.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1>
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" name="mac_address" maxlength="17"><script>dw('<input name="macscan" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"../firewall/Mac_scan.asp#flag=7\")>')</script></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td><script>dw('<input type=submit class=button value="'+BT_apply+'" name=apply onClick="return addClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script></td>
</tr>
</table>
</form>

<form method=post name="wirelessMacfilterDelete" action="/goform/wirelessMacfilterDelete">
<input type="hidden" name="submit-url" value="/wireless/macfilter.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="2"><script>dw(MM_wireless_mac_list)</script>:<script>document.write(JS_msg68);</script></td></tr>
<tr class="title4" align=center>
<td><b>No.</b></td>
<td><b><script>dw(MM_macaddr)</script></b></td>
</tr>
<script language="javascript">
var i;        
if (all_str.length) {
	entries = all_str.split(";");
	for (i=0; i<entries.length; i++) {
		document.write("<tr align=center>\n<td><input type=checkbox name=DR"+i+"></td>");
		document.write("<td>"+ entries[i] +"</td>");
		document.write("</tr>\n");
	}
	
	rules_num = entries.length;
}
</script>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelMac" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>