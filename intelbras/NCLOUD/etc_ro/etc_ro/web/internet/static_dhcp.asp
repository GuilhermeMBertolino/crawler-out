<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var rules_num = <% getStaticDhcpRuleNumsASP(); %>;
var lanIP = "<% getLanIp(); %>";
var lanMask = "<% getLanNetmask(); %>";
var entries = new Array();
var all_str = "<% getCfgGeneral(1, "staticDhcpRules"); %>";

function Load_Setting()
{
    updateState();
}

function deleteClick()
{
	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.staticDhcpDelete.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function formCheck()
{
	if (rules_num >= 10) {
		alert(JS_msg22);
		return false;
	}
	
	if ((document.staticDhcpBasicSettings.dhcpEnabled.options.selectedIndex == 0) && 
		(document.staticDhcp.mac_address.value == "" && document.staticDhcp.ip_address.value == ""))
		return true;
	
	if (!macCheck(document.staticDhcp.mac_address.value, MM_macaddr)) 
		return false;	
	
	if (document.staticDhcp.ip_address.value == "" && document.staticDhcp.mac_address.value == "")		
		return true;
			
	if (!ipCheck(document.staticDhcp.ip_address.value, MM_ipaddr)) 
		return false;
	
	if (!subnetCheck(document.staticDhcp.ip_address.value, lanMask, lanIP)) {
		alert(JS_msg20);
		document.staticDhcp.ip_address.focus();
		return false;
	}
	
	if (document.staticDhcp.ip_address.value==lanIP){
	 	alert(JS_msq204);
		return false;
	}	
	
	var p = all_str.split(";");
	for(var i=0; i<p.length; i++) {
		v = p[i].split(",");
		for(var j=0; j<v.length; j++) {			
			if ( (document.staticDhcp.mac_address.value==v[j]) ||
				 (document.staticDhcp.mac_address.value.toLowerCase()==v[j].toLowerCase()) ||
				 (document.staticDhcp.ip_address.value==v[j]) )	{
				alert(JS_msg9);
				return false;
			}
		}
	}
	   
   	return true;
}

function updateState()
{
    if (!rules_num) {
 		disableButton(document.staticDhcpDelete.deleteSelStaticDhcp);
 		disableButton(document.staticDhcpDelete.reset);
	} else {
        enableButton(document.staticDhcpDelete.deleteSelStaticDhcp);
        enableButton(document.staticDhcpDelete.reset);
	}
	
    if (document.staticDhcpBasicSettings.dhcpEnabled.options.selectedIndex == 1) {
		enableTextField(document.staticDhcp.mac_address);
		enableTextField(document.staticDhcp.macscan);
		enableTextField(document.staticDhcp.ip_address);
		enableButton(document.staticDhcp.apply);
        enableButton(document.staticDhcp.reset);
	} else {
		disableTextField(document.staticDhcp.mac_address);
		disableTextField(document.staticDhcp.macscan);
		disableTextField(document.staticDhcp.ip_address);
		disableButton(document.staticDhcp.apply);
 		disableButton(document.staticDhcp.reset);
	}
}

var xml = false;
function staticDhcpSubmit(value)
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
	xml.open('POST', '/goform/staticDhcpBasicSettings', true);
	xml.send('staticDhcpEnabled='+value);
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
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="staticDhcpBasicSettings" action=/goform/staticDhcpBasicSettings>
<input type="hidden" name="submit-url" value="/internet/static_dhcp.asp">
<input type="hidden" name="staticDhcpEnabled">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_static_dhcp)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_static_dhcp)</script>:</td>
<td><select onChange="updateState();staticDhcpSubmit(this.value)" name="dhcpEnabled">
<option value=0 <% getStaticDhcpEnableASP(0); %>><script>dw(MM_disable)</script></option>
<option value=1 <% getStaticDhcpEnableASP(1); %>><script>dw(MM_enable)</script></option>
</select></td>
</tr>
</table>
</form>

<form method=post name="staticDhcp" action=/goform/staticDhcp>
<input type="hidden" name="submit-url" value="/internet/static_dhcp.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" maxlength="17" name="mac_address" value=""><script>dw('<input name="macscan" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"../firewall/Mac_scan.asp#flag=5\")>')</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input type="text" maxlength="15" name="ip_address"></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" name=apply onClick="return formCheck()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<br>
<form action=/goform/staticDhcpDelete method=POST name="staticDhcpDelete">
<input type="hidden" name="submit-url" value="/internet/static_dhcp.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="3"><script>dw(MM_static_dhcp_list)</script>:<script>document.write(JS_msg1);</script></td></tr>
<tr class="title4" align=center>
<td><b>ID.</b></td>
<td><b><script>dw(MM_macaddr)</script></b></td>
<td><b><script>dw(MM_ipaddr)</script></b></td>
</tr>
<% showStaticDhcpRulesASP(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelStaticDhcp" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
