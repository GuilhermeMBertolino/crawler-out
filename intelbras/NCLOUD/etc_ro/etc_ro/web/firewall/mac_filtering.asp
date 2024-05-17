<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var rules_num = <% getMacRuleNumsASP(); %>;
var all_str = '<% getCfgGeneral(1, "MacFilterRules"); %>';
var entries = new Array();
var entries2 = new Array();
var mac_action = 1*<% getCfgGeneral(1, "MacFilterAction"); %>;
var sch_week="<% getCfgGeneral(1, "MacFiltersWeek"); %>";
var sch_timestart="<% getCfgGeneral(1, "MacFiltersTimeStart"); %>";
var sch_timeend="<% getCfgGeneral(1, "MacFiltersTimeEnd"); %>";

function deleteClick()
{
    for(i=0; i< rules_num; i++)	{
		var tmp = eval("document.macFilterDelete.delRule"+i);
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
	
	if (!macCheck(document.macFilter.mac_address.value, MM_macaddr))  
		return false; 
		
	var p = all_str.split(";");
	for (var i=0; i<p.length; i++){
		v = p[i].split(",");
		for (var j=0; j<v.length; j++){			
			if (document.macFilter.mac_address.value.toLowerCase()==v[j].toLowerCase()) {
				alert(JS_msg9);
				return false;
			}
		}
	}

	if (document.macFilter.comment.value!="") {
		if (!commCheck(document.macFilter.comment.value, MM_comment))  
			return false;
	}

	if(scheduleWeekCheck(form)) return false;
	if(scheduleTimeCheck(form))	return false;
	scheduleSyncTime(form);	
	form.submit();
	disableAllButton();
	return true;
}

function Load_Setting()
{
	if (mac_action == 1)
		document.BasicSettings.defaultFirewallPolicy.selectedIndex = 1;
	else
		document.BasicSettings.defaultFirewallPolicy.selectedIndex = 0;
		
	updateState();
}

function updateState()
{    
    if (! rules_num ){
 		disableButton(document.macFilterDelete.deleteSelFilterPort);
 		disableButton(document.macFilterDelete.reset);
	} else{
        enableButton(document.macFilterDelete.deleteSelFilterPort);
        enableButton(document.macFilterDelete.reset);
	}

	if (document.BasicSettings.macFilterEnabled.options.selectedIndex == 1){
		enableTextField(document.macFilter.mac_address);
		enableTextField(document.macFilter.macscan);
		enableTextField(document.macFilter.comment);
		enableButton(document.macFilter.apply);
		enableButton(document.macFilter.reset);
		enableTextField(document.BasicSettings.defaultFirewallPolicy);
	} else{
		disableTextField(document.macFilter.mac_address);
		disableTextField(document.macFilter.macscan);
		disableTextField(document.macFilter.comment);
		disableButton(document.macFilter.apply);
		disableButton(document.macFilter.reset);
		disableTextField(document.BasicSettings.defaultFirewallPolicy);
	}


	document.macFilter.week_1.disabled = true;
	document.macFilter.week_2.disabled = true;
	document.macFilter.week_3.disabled = true;
	document.macFilter.week_4.disabled = true;
	document.macFilter.week_5.disabled = true;
	document.macFilter.week_6.disabled = true;
	document.macFilter.week_7.disabled = true;
	document.macFilter.time_h1.disabled = true;
	document.macFilter.time_h2.disabled = true;
	document.macFilter.time_m1.disabled = true;
	document.macFilter.time_m2.disabled = true;
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
	xml.open('POST', '/goform/macBasicSettings', true);
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
<form method=post name="BasicSettings" action=/goform/macBasicSettings>
<input type="hidden" name="submit-url" value="/firewall/mac_filtering.asp">
<input type="hidden" name="firewallEnabled">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_macf)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_macf)</script>:</td>
<td><select onChange="updateState()" name="macFilterEnabled">
<option value=0 <% getMacFilterEnableASP(0); %>><script>dw(MM_disable)</script></option>
<option value=1 <% getMacFilterEnableASP(1); %>><script>dw(MM_enable)</script></option>
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

<form method=post name="macFilter" action=/goform/macFilter>
<input type="hidden" name="submit-url" value="/firewall/mac_filtering.asp">
<input type="hidden" name="CurTime1">
<input type="hidden" name="CurTime2">
<!--Schedule Start-->
<div style="display:none">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_schedule)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_schedule_week)</script> :</td>
<td><input type="checkbox" name="week_all" checked value="ON" onClick="scheduleWeek(this.form)">Todos &nbsp;&nbsp;&nbsp;&nbsp;
<input type="checkbox" name="week_1" checked value="ON">Seg 
<input type="checkbox" name="week_2" checked value="ON">Ter
<input type="checkbox" name="week_3" checked value="ON">Quar 
<input type="checkbox" name="week_4" checked value="ON">Qui		
<input type="checkbox" name="week_5" checked value="ON">Sex 
<input type="checkbox" name="week_6" checked value="ON">Sab 
<input type="checkbox" name="week_7" checked value="ON">Dom</td>
</tr>
<tr>
<td class="thead"><script>dw(MM_schedule_time)</script> :</td>
<td><input type="checkbox" name="time_all" checked value="ON" onClick="scheduleTime(this.form)">Todos &nbsp;&nbsp;&nbsp;&nbsp;
<input type="text" size="3" maxlength="2" name="time_h1" value="00">:<input type="text" size="3" maxlength="2" name="time_m1" value="00"> - 
<input type="text" size="3" maxlength="2" name="time_h2" value="23">:<input type="text" size="3" maxlength="2" name="time_m2" value="59"> (HH:MM)</td>
</tr>
</table>
</div>
<!--Schedule end-->
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" name="mac_address" maxlength="17" value=""><script>dw('<input name="macscan" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"Mac_scan.asp#flag=6\")>')</script></td>
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
<form action=/goform/macFilterDelete method=POST name="macFilterDelete">
<input type="hidden" name="submit-url" value="/firewall/mac_filtering.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="3"><script>dw(MM_macf_list)</script>:<script>document.write(JS_msg115);</script></td></tr>
<tr class="title4" align=center>
<td><b>ID.</b></td>
<td><b><script>dw(MM_macaddr)</script></b></td>
<!--<td><b><script>dw(MM_week)</script></b></td>-->
<!--<td><b><script>dw(MM_schtime)</script></b></td>-->
<td><b><script>dw(MM_comment)</script></b></td>
</tr>
<script language="javascript">
var i;
if(all_str.length){
	entries = all_str.split(";");
	for(i=0; i<entries.length; i++){
		entries2 = entries[i].split(",");
		document.write("<tr align=center><td> &nbsp; ");
		document.write(i+1);
		document.write("<input type=checkbox name=delRule"+i+"></td>");
		document.write("<td>"+ entries2[0] +"</td>");
		//document.write("<td>"+ scheduleShowWeek(entries2[1]) +"</td>");
		//document.write("<td>"+ entries2[2] +"</td>");
		document.write("<td>"+ entries2[3] +"</td>");
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
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelFilterPort" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
