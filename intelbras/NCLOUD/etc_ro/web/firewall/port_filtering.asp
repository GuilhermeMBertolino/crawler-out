<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var rules_num = <% getIPPortRuleNumsASP(); %>;
var lanIP = "<% getLanIp(); %>";
var lanMask = "<% getLanNetmask(); %>";
var all_str = '<% getCfgGeneral(1, "IPPortFilterRules"); %>';
var ipport_action = 1*<% getCfgGeneral(1, "IPPortFilterAction"); %>;

function deleteClick()
{
    for(i=0; i< rules_num; i++)	{
		var tmp = eval("document.ipportFilterDelete.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function formCheck(form)
{
	if (rules_num >= 10){
		alert(JS_msg22);
		return false;
	}
	
	if (document.ipportFilter.sip_address.value == ""){
		alert(JS_msg150);
		return false;
	}
	
	if (document.ipportFilter.sip_address.value != ""){
		if (!ipCheck(document.ipportFilter.sip_address.value, MM_ipaddr)) 
			return false;

		if (!subnetCheck(document.ipportFilter.sip_address.value, lanMask, lanIP)) {
			alert(JS_msg20);
			document.ipportFilter.sip_address.focus();
			return false;
		}

		if (document.ipportFilter.sip_address.value == lanIP) {
			alert(JS_msg102);
			document.ipportFilter.sip_address.focus();
			return false;		
		} 
	}	
	
	if (document.ipportFilter.dFromPort.value == "" && document.ipportFilter.dToPort.value == ""){
		document.ipportFilter.dFromPort.value = 1;
		document.ipportFilter.dToPort.value   = 65535;
		return true;
	}	
	
	if ((document.BasicSettings.portFilterEnabled.options.selectedIndex == 0) && 
		(document.ipportFilter.sip_address.value == "" && document.ipportFilter.dFromPort.value == ""))
		return true;
		
	if (!portCheck(document.ipportFilter.dFromPort.value, MM_1st_port)) 
		return false;
		
	if (document.ipportFilter.dToPort.value != ""){
		if (!portCheck(document.ipportFilter.dToPort.value, MM_2nd_port)) 
			return false;
			
		if (!portRangeCheck(document.ipportFilter.dFromPort.value,document.ipportFilter.dToPort.value)) {
			alert(JS_msg27);
			document.ipportFilter.dFromPort.focus();
			return false;
		}
	}	

	if (document.ipportFilter.dFromPort.value == "" && document.ipportFilter.dToPort.value != ""){
		alert(JS_msg2);
		return false;
	}	
	var p = all_str.split(";");
	for (var i=0; i<p.length; i++){
		v = p[i].split(",");
		for (var j=0; j<v.length; j++){	
			if (document.ipportFilter.sip_address.value == v[0]) {
				if (document.ipportFilter.dToPort.value != "") {
					var pf = Number(document.ipportFilter.dFromPort.value);
					var pt = Number(document.ipportFilter.dToPort.value);
					var v6 = Number(v[6]);
					var v7 = Number(v[7]);
					
					if (pf == v6 || pf == v7 || pt == v6 || pt == v7) {
						alert(JS_msg9);
						return false;
					}
					
					if (pf < v6 && pt > v6) {
						alert(JS_msg9);
						return false;
					}
					
					if (pf > v6 && pf < v7) {
						alert(JS_msg9);
						return false;
					}
				}
				else {
					var pf = Number(document.ipportFilter.dFromPort.value);
					var v6 = Number(v[6]);
					var v7 = Number(v[7]);
					if (pf == v6 || pf == v7) {
						alert(JS_msg9);
						return false;
					}
				
					if (pf > v6 && pf < v7) {
						alert(JS_msg9);
						return false;
					}
				}
			}
		}
	}

	if (document.ipportFilter.comment.value!="") {
		if (!commCheck(document.ipportFilter.comment.value, MM_comment))  
			return false;
	}
	form.submit();
	disableAllButton();
	return true;
}
	
function updateState()
{
    if (! rules_num ){
 		disableButton(document.ipportFilterDelete.deleteSelFilterPort);
 		disableButton(document.ipportFilterDelete.reset);
	} else{
        enableButton(document.ipportFilterDelete.deleteSelFilterPort);
        enableButton(document.ipportFilterDelete.reset);
	}

	if (document.BasicSettings.portFilterEnabled.options.selectedIndex == 1){
		//InitializeTimer();	// update packet count

		enableTextField(document.ipportFilter.mac_address);
		enableTextField(document.ipportFilter.dip_address);
		enableTextField(document.ipportFilter.sip_address);
		enableTextField(document.ipportFilter.protocol);
		enableTextField(document.ipportFilter.sFromPort);
		enableTextField(document.ipportFilter.sToPort);
		enableTextField(document.ipportFilter.action);
		enableTextField(document.ipportFilter.comment);
		enableButton(document.ipportFilter.apply);
		enableButton(document.ipportFilter.reset);	
		enableTextField(document.BasicSettings.defaultFirewallPolicy);
	} else{
		disableTextField(document.ipportFilter.mac_address);
		disableTextField(document.ipportFilter.dip_address);
		disableTextField(document.ipportFilter.sip_address);
		disableTextField(document.ipportFilter.protocol);
		disableTextField(document.ipportFilter.action);
		disableTextField(document.ipportFilter.comment);
		disableButton(document.ipportFilter.apply);
		disableButton(document.ipportFilter.reset);	
		disableButton(document.BasicSettings.defaultFirewallPolicy);
	}
}

function Load_Setting()
{
	if (ipport_action == 1)
		document.BasicSettings.defaultFirewallPolicy.selectedIndex = 1;
	else
		document.BasicSettings.defaultFirewallPolicy.selectedIndex = 0;
		
	updateState();
}

var xml = false;
function portFilterSubmit(value)
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
	xml.open('POST', '/goform/ipportBasicSettings', true);
	xml.send('firewallEnabled='+value);
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
<form method=post name="BasicSettings" action=/goform/ipportBasicSettings>
<input type="hidden" name="submit-url" value="/firewall/port_filtering.asp">
<input type="hidden" name="firewallEnabled">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_ipportf)</script></td></tr>
<tr><td><hr></td></tr>
</table>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_ipportf)</script>:</td>
<td><select onChange="updateState()" name="portFilterEnabled">
<option value=0 <% getIPPortFilterEnableASP(0); %>><script>dw(MM_disable)</script></option>
<option value=1 <% getIPPortFilterEnableASP(1); %>><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_default_policy)</script>:</td>
<td><select name="defaultFirewallPolicy">
<option value=0><script>dw(MM_allow)</script></option>
<option value=1><script>dw(MM_deny)</script></option>
</select></td>
</tr>
</table>
<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" name=apply >')</script>
</td>
</tr>
</table>
</form>

<form method=post name="ipportFilter" action=/goform/ipportFilter>
<input type="hidden" name="submit-url" value="/firewall/port_filtering.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" name="mac_address" maxlength="17"></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_destip)</script>:</td>
<td><input type="text" name="dip_address" maxlength="15"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input type="text" name="sip_address" maxlength="15"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_protocol)</script>:</td>
<td><select name="protocol">
<!--<option value="None"><script>dw(MM_none)</script></option>-->
<option value="TCP">TCP</option>
<option value="UDP">UDP</option>
<option value="ALL">TCP/UDP</option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_portrange)</script>:</td>
<td><input type="text" size="5" name="dFromPort" maxlength="5"> - <input type="text" size="5" name="dToPort" maxlength="5"> (1-65535)</td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_sport_range)</script>:</td>
<td><input type="text" size="5" name="sFromPort" maxlength="5"> - <input type="text" size="5" name="sToPort" maxlength="5"> (1-65535)</td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_action)</script>:</td>
<td><select name="action">
<option value="Drop"><script>dw(MM_drop)</script></option>
<option value="Accept"><script>dw(MM_accept)</script></option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_comment)</script>:</td>
<td><input type="text" name="comment" maxlength="10"></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" name=apply onClick="return formCheck(this.form)"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<br>
<form action=/goform/ipportFilterDelete method=POST name="ipportFilterDelete">
<input type="hidden" name="submit-url" value="/firewall/port_filtering.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="6"><script>dw(MM_ipportf_list)</script>:<script>document.write(JS_msg51);</script></td></tr>
<tr class="title4" align=center>
<td><b>ID.</b></td>
<td><b><script>dw(MM_ipaddr)</script></b></td>
<td><b><script>dw(MM_protocol)</script></b></td>
<td><b><script>dw(MM_portrange)</script></b></td>
<td><b><script>dw(MM_comment)</script></b></td>
</tr>
<% showIPPortFilterRulesASP(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelFilterPort" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
