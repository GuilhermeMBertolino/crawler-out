<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var rules_num = <% getIpQosRuleNumsASP(); %>;
var lanIP = "<% getLanIp(); %>";
var lanMask = "<% getLanNetmask(); %>";
var max_length = 99999999;

function Load_Setting()
{
	if (!rules_num) {
 		disableButton(document.ipQosDelete.deleteSelQos);
 		disableButton(document.ipQosDelete.reset);
	} else {
        enableButton(document.ipQosDelete.deleteSelQos);
        enableButton(document.ipQosDelete.reset);
	}
			
	updateState();
}

function deleteClick()
{
   	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.ipQosDelete.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function formCheck()
{
	if (document.ipQosBasicSettings.qosEnabled.options.selectedIndex == 1) {	
		if (!numberRangeCheck(document.ipQosBasicSettings.manualUplinkSpeed.value, 100, max_length, MM_total_uplink_speed)) 
			return false;
		
		if (!numberRangeCheck(document.ipQosBasicSettings.manualDownlinkSpeed.value, 100, max_length, MM_total_downlink_speed)) 
			return false;
	}
	
	return true;
}
	
function addClick()
{
	if ( rules_num >= 10 ) {
		alert(JS_msg22);
		return false;
	}
	
	if (document.ipQosBasicSettings.qosEnabled.options.selectedIndex == 1){
		if (!ipCheck(document.ipQos.ipStart.value, MM_sipaddr)) 
			return false;
		
		if (!subnetCheck(document.ipQos.ipStart.value, lanMask, lanIP)) {
			alert(JS_msg20);
			document.ipQos.ipStart.focus();
			return false;
		}
		
		if (!ipCheck(document.ipQos.ipEnd.value, MM_eipaddr)) 
			return false;

		if (!subnetCheck(document.ipQos.ipEnd.value, lanMask, lanIP)) {
			alert(JS_msg20);
			document.ipQos.ipEnd.focus();
			return false;
		}
		
		if (!clientRangeCheck(document.ipQos.ipStart.value, document.ipQos.ipEnd.value)) {
			alert(JS_msg24);
			document.ipQos.ipStart.focus();
			return false;
		}
		
		if ((document.ipQos.ipStart.value == lanIP) || (document.ipQos.ipEnd.value == lanIP)) {
			alert(JS_msg26);
			document.ipQos.ipStart.focus();
			return false;		
		}
		
		if (!numberRangeCheck2(document.ipQos.bandwidth.value, 1, max_length, MM_upload_bw)) 
			return false;
			
		if (!numberRangeCheck3(document.ipQos.bandwidth_downlink.value, 1, max_length, MM_download_bw)) 
			return false;

		if (document.ipQos.comment.value!="") {
			if (!commCheck(document.ipQos.comment.value, MM_comment))  
				return false;
		}	
	}
	return true;
}

function updateState()
{
	if (document.ipQosBasicSettings.qosEnabled.options.selectedIndex==1) {  	
		enableTextField(document.ipQosBasicSettings.manualUplinkSpeed);
		enableTextField(document.ipQosBasicSettings.manualDownlinkSpeed);
		enableTextField(document.ipQos.ipStart);
		enableTextField(document.ipQos.ipEnd);
		enableTextField(document.ipQos.bandwidth);
		enableTextField(document.ipQos.bandwidth_downlink);
		enableTextField(document.ipQos.comment);		
		enableButton(document.ipQos.apply);
		enableButton(document.ipQos.reset);
	} else {
		disableTextField(document.ipQosBasicSettings.manualUplinkSpeed);
		disableTextField(document.ipQosBasicSettings.manualDownlinkSpeed);
		disableTextField(document.ipQos.ipStart);
		disableTextField(document.ipQos.ipEnd);
		disableTextField(document.ipQos.bandwidth);
		disableTextField(document.ipQos.bandwidth_downlink);
		disableTextField(document.ipQos.comment);		
		disableButton(document.ipQos.apply);
		disableButton(document.ipQos.reset);
	}
}
</script>
</head>

<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form action=/goform/ipQosBasicSettings method=POST name="ipQosBasicSettings">
<input type="hidden" value="/internet/qos.asp" name="submit-url">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_qos)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead">Controle de Banda:</td>
<td><select onChange="updateState()" name="qosEnabled">
<option value="0" <% getIpQosEnableASP(0); %>><script>dw(MM_disable)</script></option>
<option value="1" <% getIpQosEnableASP(1); %>><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr>
<td class=thead><script>dw(MM_total_uplink_speed)</script>:</td>
<td><input type="text" name="manualUplinkSpeed" size="8" maxlength="8"  value="<% getCfgGeneral(1, "ManualUplinkSpeed"); %>" > (Kbps)</td>
</tr>
<tr>
<td class=thead><script>dw(MM_total_downlink_speed)</script>:</td>
<td><input type="text" name="manualDownlinkSpeed" size="8" maxlength="8"  value="<% getCfgGeneral(1, "ManualDownlinkSpeed"); %>" > (Kbps)</td>
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

<form action=/goform/ipQos method=POST name="ipQos">
<input type="hidden" value="/internet/qos.asp" name="submit-url">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input type="text" name="ipStart" maxlength="15" value=""> - <input type="text" name="ipEnd" maxlength="15" value=""></td>
</tr>
<tr>
<td class=thead><script>dw(MM_upload_bw)</script>:</td>
<td><input type="text" name="bandwidth" size="8" maxlength="8"> (Kbps)</td>
</tr>
<tr>
<td class=thead><script>dw(MM_download_bw)</script>:</td>
<td><input type="text" name="bandwidth_downlink" size="8" maxlength="8"> (Kbps)</td>
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
<script>dw('<input type=submit class=button value="'+BT_apply+'" name=apply onClick="return addClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<br>
<form action=/goform/ipQosDelete method=POST name="ipQosDelete">
<input type="hidden" value="/internet/qos.asp" name="submit-url">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="5"><script>dw(MM_ip_qos_list)</script>:<script>document.write(JS_msg1);</script></td></tr>
<tr class="title4" align=center>
<td><b>ID.</b></td>
<td><b><script>dw(MM_ipaddr)</script></b></td>
<td><b><script>dw(MM_upload_bw)</script></b></td>
<td><b><script>dw(MM_download_bw)</script></b></td>
<td><b><script>dw(MM_comment)</script></b></td>
</tr>
<% showIpQosRulesASP(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelQos" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
