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
var entries2 = new Array();
var all_str = "<% getCfgGeneral(1, "websURLFilters"); %>";
var sch_week="<% getCfgGeneral(1, "websURLFiltersWeek"); %>";
var sch_timestart="<% getCfgGeneral(1, "websURLFiltersTimeStart"); %>";
var sch_timeend="<% getCfgGeneral(1, "websURLFiltersTimeEnd"); %>";
var lanIP = "<% getLanIp(); %>";
var lanMASK = "<% getLanNetmask(); %>";

function Load_Setting()
{
	if (!rules_num) {
 		disableButton(document.websURLFilterDelete.deleteSelUrl);
 		disableButton(document.websURLFilterDelete.reset);
	} else {
        enableButton(document.websURLFilterDelete.deleteSelUrl);
        enableButton(document.websURLFilterDelete.reset);
	}
	
	updateState();

	document.websURLFilter.week_1.disabled = true;
	document.websURLFilter.week_2.disabled = true;
	document.websURLFilter.week_3.disabled = true;
	document.websURLFilter.week_4.disabled = true;
	document.websURLFilter.week_5.disabled = true;
	document.websURLFilter.week_6.disabled = true;
	document.websURLFilter.week_7.disabled = true;
	document.websURLFilter.time_h1.disabled = true;
	document.websURLFilter.time_h2.disabled = true;
	document.websURLFilter.time_m1.disabled = true;
	document.websURLFilter.time_m2.disabled = true;
}

function deleteWebsURLClick()
{
	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.websURLFilterDelete.DR"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function AddWebsURLFilterClick(form)
{
	if (rules_num >= 10) {
		alert(JS_msg22);
		return false;
	}

	if (document.websURLFilter.addURLFilter.value==""){
		alert(JS_msg205);
		return false;
	}
	
	if(document.websURLFilter.urlip_Start.value != ""){	
		if (!ipCheck(document.websURLFilter.urlip_Start.value, MM_sipaddr)) 
			return false;
		if (!subnetCheck(document.websURLFilter.urlip_Start.value, lanMASK, lanIP)) {
			alert(JS_msg28);
			document.websURLFilter.urlip_Start.focus();
			return false;
		}
	}

	if(document.websURLFilter.urlip_End.value != ""){
		if (!ipCheck(document.websURLFilter.urlip_End.value, MM_eipaddr)) 
			return false;	
		if (!subnetCheck(document.websURLFilter.urlip_End.value, lanMASK, lanIP)) {
			alert(JS_msg29);
			document.websURLFilter.urlip_End.focus();
			return false;
		}
	}

	if(document.websURLFilter.urlip_Start.value != "" && document.websURLFilter.urlip_End.value != ""){
		if (!clientRangeCheck(document.websURLFilter.urlip_Start.value, document.websURLFilter.urlip_End.value)) {
			alert(JS_msg30);
			document.websURLFilter.urlip_Start.focus();
			return false;
		}
	}
	
	var p = all_str.split(";");
	for (var i=0; i<p.length; i++){
		v = p[i].split(",");
		for (var j=0; j<v.length; j++){			
			if (document.websURLFilter.addURLFilter.value==v[j]) {
				alert(JS_msg9);
				return false;
			}
		}
	}
	var tmpstr=document.websURLFilter.addURLFilter.value;
	document.websURLFilter.addURLFilter.value=tmpstr.replace(/(https|http|ftp|rtsp|mms):\/\//,"");
	
	if (scheduleWeekCheck(form)) return false;
	if (scheduleTimeCheck(form)) return false;
	scheduleSyncTime(form);
	form.submit();
	disableAllButton();
	return true;
}

function updateState()
{
	if (document.websURLBasicSettings.URLFilterEnabled.options.selectedIndex == 1) {
		enableTextField(document.websURLFilter.addURLFilter);
		enableTextField(document.websURLFilter.urlip_Start);
		enableTextField(document.websURLFilter.urlip_End);
		enableButton(document.websURLFilter.apply);
		enableButton(document.websURLFilter.reset);
	} else {
		disableTextField(document.websURLFilter.addURLFilter);
		disableTextField(document.websURLFilter.urlip_Start);
		disableTextField(document.websURLFilter.urlip_End);
		disableButton(document.websURLFilter.apply);
		disableButton(document.websURLFilter.reset);
	}
}

var xml = false;
function urlFilterSubmit(value)
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
	xml.open('POST', '/goform/websURLBasicSettings', true);
	xml.send('webURLEnabled='+value);
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
<form method=post name="websURLBasicSettings" action=/goform/websURLBasicSettings>
<input type="hidden" name="submit-url" value="/firewall/url_filtering.asp">
<input type="hidden" name="webURLEnabled">
<table width=100% border=0 cellpadding=3 cellspacing=1>
<tr><td class="title"><script>dw(MM_urlf)</script></td></tr> 
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_urlf)</script>:</td>
<td><select onChange="updateState();urlFilterSubmit(this.value)" name="URLFilterEnabled">
<option value=0 <% getWebURLEnableASP(0); %>><script>dw(MM_disable)</script></option>
<option value=1 <% getWebURLEnableASP(1); %>><script>dw(MM_enable)</script></option>
</select></td>
</tr>
</table>
</form>

<form action=/goform/websURLFilter method=POST name="websURLFilter">
<input type="hidden" name="submit-url" value="/firewall/url_filtering.asp">
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
<td class="thead"><script>dw(MM_url_address)</script>:</td>
<td><input name="addURLFilter" maxlength="128" type="text"> </td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input name="urlip_Start" maxlength=15 > - <input name="urlip_End" maxlength=15 ></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" name=apply onClick="return AddWebsURLFilterClick(this.form)"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name=reset onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<form action=/goform/websURLFilterDelete method=POST name="websURLFilterDelete">
<input type="hidden" name="submit-url" value="/firewall/url_filtering.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="3"><script>dw(MM_urlf_list)</script>:<script>document.write(JS_msg51);</script></td></tr>
<tr class="title4" align=center>
<td><b>ID.</b></td>
<td><b><script>dw(MM_url_address)</script></b></td>
<td><b>IP</b></td>
<!--<td><b><script>dw(MM_week)</script></b></td>-->
<!--<td><b><script>dw(MM_schtime)</script></b></td>-->
</tr>
<script language="javascript">
var i;
if(all_str.length){
	entries = all_str.split(";");
	for(i=0; i<entries.length; i++){
		entries2 = entries[i].split(",");
		document.write("<tr align=center><td>");
		document.write(i+1);
		document.write("<input type=checkbox name=DR"+i+"></td>");
		document.write("<td>"+ entries2[0] +"</td>");
		document.write("<td>"+ urlShowIp(entries2[1],entries2[2]) +"</td>");
		//document.write("<td>"+ scheduleShowWeek(entries2[3]) +"</td>");
		//document.write("<td>"+ entries2[4] +"</td>");
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
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelUrl" onClick="return deleteWebsURLClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
