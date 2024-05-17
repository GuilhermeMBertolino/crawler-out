<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var rules_num = <% vpnRuleNumsASP(); %>;
var lanIP = "<% getLanIp(); %>";
var lanMask = "<% getLanNetmask(); %>";
var mppe = 1*<% getCfgGeneral(1, "VpnMppe"); %>;
var mppc = 1*<% getCfgGeneral(1, "VpnMppc"); %>;
var all_str1 = "<% getCfgGeneral(1, "VpnRules"); %>";
var all_str2 = "<% vpnGetDhcpListIp(); %>";
var vpnEn = 1*<% getCfgGeneral(1, "VpnEnable"); %>;

function Load_Setting()
{
	if (!rules_num) {
 		disableButton(document.vpnDelete.deleteSelRule);
 		disableButton(document.vpnDelete.reset);
	} else {
       	enableButton(document.vpnDelete.deleteSelRule);
        enableButton(document.vpnDelete.reset);
	}

	if (mppe == 1)
		document.vpnBasicSettings.mppe.selectedIndex = 1;
	else
		document.vpnBasicSettings.mppe.selectedIndex = 0;

	if (mppc == 1)
		document.vpnBasicSettings.mppc.selectedIndex = 1;
	else
		document.vpnBasicSettings.mppc.selectedIndex = 0;

	if(vpnEn == 1){
		enableTextField(document.vpnConfig.vpn_user);
		enableTextField(document.vpnConfig.vpn_password);
		enableTextField(document.vpnConfig.vpn_ip);
		enableTextField(document.vpnConfig.comment);
		enableButton(document.vpnConfig.apply);
		enableButton(document.vpnConfig.reset);
	}
	else{
		disableTextField(document.vpnConfig.vpn_user);
		disableTextField(document.vpnConfig.vpn_password);
		disableTextField(document.vpnConfig.vpn_ip);
		disableTextField(document.vpnConfig.comment);
		disableButton(document.vpnConfig.apply);
		disableButton(document.vpnConfig.reset);
	}
	
	updateState();
}

function updateState()
{
	if (document.vpnBasicSettings.vpnEnabled.options.selectedIndex==1) {  	
		enableTextField(document.vpnBasicSettings.mppe);
		enableTextField(document.vpnBasicSettings.mppc);
	} else {
		disableTextField(document.vpnBasicSettings.mppe);
		disableTextField(document.vpnBasicSettings.mppc);
	}
}

function deleteClick()
{
   	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.vpnDelete.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function formCheck(form)
{
	if (rules_num >= 5){
		alert(JS_msg101);
		return false;
	}
	
	if (!blankCheck(document.vpnConfig.vpn_user.value, "", JS_msg165)) 
		return false;
	if (!checkStringValue2(document.vpnConfig.vpn_user.value)) {
		alert(JS_msg188);
		return false;
	}
	if (!blankCheck(document.vpnConfig.vpn_password.value, "", JS_msg166)) 
		return false;
	if (!checkStringValue2(document.vpnConfig.vpn_password.value, "", JS_msg166)) {
		alert(JS_msg189);
		return false;
	}
	if (!ipCheck(document.vpnConfig.vpn_ip.value, MM_vpnip)) 
		return false;

	var p = all_str1.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		
		if(q[0] == document.vpnConfig.vpn_user.value){
			alert(JS_msg97);
			document.vpnConfig.vpn_user.focus();
			return false;
		}
		
		if(q[2] == document.vpnConfig.vpn_ip.value)	{
			alert(JS_msg99);
			document.vpnConfig.vpn_ip.focus();
			return false;
		}
	}

	var p2 = all_str2.split("#");
	for(i=0;i<p2.length;i++){
		if(p2[i] == document.vpnConfig.vpn_ip.value){
			alert(JS_msg100);
			document.vpnConfig.vpn_ip.focus();
			return false;	
		}
	}
	form.submit();
	disableAllButton();	
	return true;
}
</script>
</head>

<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form action=/goform/vpnBasicSettings method=POST name="vpnBasicSettings">
<input type="hidden" value="/internet/vpn.asp" name="submit-url">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_vpn_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_vpn_settings)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_vpn_settings)</script>:</td>
<td><select onChange="updateState()" name="vpnEnabled">
<option value="0" <% vpnEnableASP(0); %>><script>dw(MM_disable)</script></option>
<option value="1" <% vpnEnableASP(1); %>><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr>
<td class=thead><script>dw(MPPE_Encryption)</script>:</td>
<td><select size="1" name="mppe">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr>
<td class=thead><script>dw(MPPC_Compress)</script>:</td>
<td><select size="1" name="mppc">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<form action=/goform/vpnConfig method=POST name="vpnConfig">
<input type="hidden" value="/internet/vpn.asp" name="submit-url">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_vpnuser)</script>:</td>
<td><input name="vpn_user" maxlength="15" ></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_vpnpassword)</script>:</td>
<td><input name="vpn_password" maxlength="15" ></td>
</tr>
<tr>
<tr>
<td class="thead"><script>dw(MM_vpnip)</script>:</td>
<td><input name="vpn_ip" maxlength="15" ></td>
</tr>
<tr>
<td class=thead><script>dw(MM_comment)</script>:</td>
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

<form action=/goform/vpnDelete method=POST name="vpnDelete">
<input type="hidden" value="/internet/vpn.asp" name="submit-url">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="5"><script>dw(MM_vpnList)</script>:<script>document.write(JS_msg116);</script></td></tr>
<tr class="title4" align=center>
<td><b>No.</b></td>
<td><b><script>dw(MM_vpnuser)</script></b></td>
<td><b><script>dw(MM_vpnpassword)</script></b></td>
<td><b><script>dw(MM_vpnip)</script></b></td>
<td><b><script>dw(MM_comment)</script></b></td>
</tr>
<% vpnshowRulesASP(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelRule" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
