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
function makeRequest(url, content) 
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
    http_request.onreadystatechange = alertContents;
    http_request.open('POST', url, true);
    http_request.send(content);
}

function alertContents() 
{
    if (http_request.readyState == 4){
        if (http_request.status == 200){
			window.location.reload();// refresh
        }else {
            //alert(JS_msg6);
        }
    }
}

function checkDate(str)
{
	//Tue Nov 27 17:24:00 UTC 2012
	//Thu Nov  1 17:47:00 UTC 2012
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var week = [MM_sun, MM_mon, MM_tue, MM_wed, MM_thu, MM_fri, MM_sat];
	var s1;
	var s2;
	if ((str.substring(8,9)) == " "){
		s1=str.substring(0,8);
		s2=str.substring(9,str.length);
		str=s1.concat(s2);
	}
	else {
		str = str;
	}
	
	var t = str.split(" ");	
	for (var j=0; j<12; j++){
		if (t[1] == month[j]) t[1] = j + 1;
	}
	
	return t[1] + "/" + t[2] + "/" + t[5] + " " + t[3];
}

function formCheck()
{
	if (document.NTP.NTPClientEnabled.checked == true) {
		if (!isEmpty(document.NTP.NTPServerIP.value)){
			alert(MM_ntp_server+JS_msg139);
			return false;
		}
		
		if (!ipUrlCheck(document.NTP.NTPServerIP.value, MM_ntp_server))	
			return false;
		if (document.NTP.NTPSync.value == "")
		{
			alert(JS_msg180);
			return false;
		}
		else if (!numberCheck(document.NTP.NTPSync.value, MM_ntp_time))
			return false;
	}
	
	return true;
}

function updateState()
{
	if (document.NTP.NTPClientEnabled.checked == true) {
		document.NTP.NTPServerIP.disabled = false;
		document.NTP.NTPSync.disabled = false;
	}
	else {
		document.NTP.NTPServerIP.disabled = true;
		document.NTP.NTPSync.disabled = true;
	}
}

function Load_Setting()
{
	var tz = "<% getCfgGeneral(1, "TZ"); %>";
	var ntp_client_enabled = 1*'<% getCfgZero(1, "NTPClientEnabled"); %>';
	
	if (tz == "UCT_-11")
		document.NTP.time_zone.options.selectedIndex = 0;
	else if (tz == "UCT_-10")
		document.NTP.time_zone.options.selectedIndex = 1;
	else if (tz == "NAS_-09")
		document.NTP.time_zone.options.selectedIndex = 2;
	else if (tz == "PST_-08")
		document.NTP.time_zone.options.selectedIndex = 3;
	else if (tz == "MST_-07")
		document.NTP.time_zone.options.selectedIndex = 4;
	else if (tz == "CST_-06")
		document.NTP.time_zone.options.selectedIndex = 5;
	else if (tz == "UCT_-06")
		document.NTP.time_zone.options.selectedIndex = 6;
	else if (tz == "UCT_-05")
		document.NTP.time_zone.options.selectedIndex = 7;
	else if (tz == "EST_-05")
		document.NTP.time_zone.options.selectedIndex = 8;
	else if (tz == "AST_-04")
		document.NTP.time_zone.options.selectedIndex = 9;
	else if (tz == "UCT_-04")
		document.NTP.time_zone.options.selectedIndex = 10;
	else if (tz == "UCT_-03")
		document.NTP.time_zone.options.selectedIndex = 11;
	else if (tz == "EBS_-03")
		document.NTP.time_zone.options.selectedIndex = 12;
	else if (tz == "NOR_-02")
		document.NTP.time_zone.options.selectedIndex = 13;
	else if (tz == "EUT_-01")
		document.NTP.time_zone.options.selectedIndex = 14;
	else if (tz == "UCT_000")
		document.NTP.time_zone.options.selectedIndex = 15;
	else if (tz == "GMT_000")
		document.NTP.time_zone.options.selectedIndex = 16;
	else if (tz == "MET_001")
		document.NTP.time_zone.options.selectedIndex = 17;
	else if (tz == "MEZ_001")
		document.NTP.time_zone.options.selectedIndex = 18;
	else if (tz == "UCT_001")
		document.NTP.time_zone.options.selectedIndex = 19;
	else if (tz == "EET_002")
		document.NTP.time_zone.options.selectedIndex = 20;
	else if (tz == "SAS_002")
		document.NTP.time_zone.options.selectedIndex = 21;
	else if (tz == "IST_003")
		document.NTP.time_zone.options.selectedIndex = 22;
	else if (tz == "MSK_003")
		document.NTP.time_zone.options.selectedIndex = 23;
	else if (tz == "UCT_004")
		document.NTP.time_zone.options.selectedIndex = 24;
	else if (tz == "UCT_005")
		document.NTP.time_zone.options.selectedIndex = 25;
	else if (tz == "UCT_006")
		document.NTP.time_zone.options.selectedIndex = 26;
	else if (tz == "UCT_007")
		document.NTP.time_zone.options.selectedIndex = 27;
	else if (tz == "CST_008")
		document.NTP.time_zone.options.selectedIndex = 28;
	else if (tz == "CCT_008")
		document.NTP.time_zone.options.selectedIndex = 29;
	else if (tz == "SST_008")
		document.NTP.time_zone.options.selectedIndex = 30;
	else if (tz == "AWS_008")
		document.NTP.time_zone.options.selectedIndex = 31;
	else if (tz == "JST_009")
		document.NTP.time_zone.options.selectedIndex = 32;
	else if (tz == "KST_009")
		document.NTP.time_zone.options.selectedIndex = 33;
	else if (tz == "UCT_010")
		document.NTP.time_zone.options.selectedIndex = 34;
	else if (tz == "AES_010")
		document.NTP.time_zone.options.selectedIndex = 35;
	else if (tz == "UCT_011")
		document.NTP.time_zone.options.selectedIndex = 36;
	else if (tz == "UCT_012")
		document.NTP.time_zone.options.selectedIndex = 37;
	else if (tz == "NZS_012")
		document.NTP.time_zone.options.selectedIndex = 38;
	
	document.getElementById("div_current_time").innerHTML = checkDate("<% getCurrentTimeASP(); %>");
	
	if (ntp_client_enabled == 1)
		document.NTP.NTPClientEnabled.checked = true;
		
	updateState();
}

function syncWithHost()
{
	var currentTime = new Date();

	var seconds = currentTime.getSeconds();
	var minutes = currentTime.getMinutes();
	var hours = currentTime.getHours();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();

	var seconds_str = " ";
	var minutes_str = " ";
	var hours_str = " ";
	var month_str = " ";
	var day_str = " ";
	var year_str = " ";

	if(seconds < 10)
		seconds_str = "0" + seconds;
	else
		seconds_str = ""+seconds;

	if(minutes < 10)
		minutes_str = "0" + minutes;
	else
		minutes_str = ""+minutes;

	if(hours < 10)
		hours_str = "0" + hours;
	else
		hours_str = ""+hours;

	if(month < 10)
		month_str = "0" + month;
	else
		month_str = ""+month;

	if(day < 10)
		day_str = "0" + day;
	else
		day_str = day;

	var tmp = month_str + day_str + hours_str + minutes_str + year + " ";
	makeRequest("/goform/NTPSyncWithHost", tmp);
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method="post" name="NTP" action="/goform/NTP">
<input type="hidden" name="submit-url" value="/adm/ntp.asp">
<input type="hidden" name="ntpcurrenttime" value="<% getCurrentTimeASP(); %>">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_ntp_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_current_time)</script>:</td>
<td><span id="div_current_time"></span></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_sync_time)</script>:</td>
<td><script>dw('<input type="button" value="'+BT_sync_time+'" name="manNTPSyncWithHost" onClick="syncWithHost()">')</script></td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td class="thead"><script>dw(MM_time_zone)</script>:</td>
<td><select name="time_zone">
<option value="UCT_-11">(GMT-11:00) <script>dw(MM_ntp1)</script></option>
<option value="UCT_-10">(GMT-10:00) <script>dw(MM_ntp2)</script></option>
<option value="NAS_-09">(GMT-09:00) <script>dw(MM_ntp3)</script></option>
<option value="PST_-08">(GMT-08:00) <script>dw(MM_ntp4)</script></option>
<option value="MST_-07">(GMT-07:00) <script>dw(MM_ntp5)</script></option>
<option value="CST_-06">(GMT-06:00) <script>dw(MM_ntp6)</script></option>
<option value="UCT_-06">(GMT-06:00) <script>dw(MM_ntp7)</script></option>
<option value="UCT_-05">(GMT-05:00) <script>dw(MM_ntp8)</script></option>
<option value="EST_-05">(GMT-05:00) <script>dw(MM_ntp9)</script></option>
<option value="AST_-04">(GMT-04:00) <script>dw(MM_ntp10)</script></option>
<option value="UCT_-04">(GMT-04:00) <script>dw(MM_ntp11)</script></option>
<option value="UCT_-03">(GMT-03:00) <script>dw(MM_ntp12)</script></option>
<option value="EBS_-03">(GMT-03:00) <script>dw(MM_ntp13)</script></option>
<option value="NOR_-02">(GMT-02:00) <script>dw(MM_ntp14)</script></option>
<option value="EUT_-01">(GMT-01:00) <script>dw(MM_ntp15)</script></option>
<option value="UCT_000">(GMT) <script>dw(MM_ntp16)</script></option>
<option value="GMT_000">(GMT) <script>dw(MM_ntp17)</script></option>
<option value="MET_001">(GMT+01:00) <script>dw(MM_ntp18)</script></option>
<option value="MEZ_001">(GMT+01:00) <script>dw(MM_ntp19)</script></option>
<option value="UCT_001">(GMT+01:00) <script>dw(MM_ntp20)</script></option>
<option value="EET_002">(GMT+02:00) <script>dw(MM_ntp21)</script></option>
<option value="SAS_002">(GMT+02:00) <script>dw(MM_ntp22)</script></option>
<option value="IST_003">(GMT+03:00) <script>dw(MM_ntp23)</script></option>
<option value="MSK_003">(GMT+03:00) <script>dw(MM_ntp24)</script></option>
<option value="UCT_004">(GMT+04:00) <script>dw(MM_ntp25)</script></option>
<option value="UCT_005">(GMT+05:00) <script>dw(MM_ntp26)</script></option>
<option value="UCT_006">(GMT+06:00) <script>dw(MM_ntp27)</script></option>
<option value="UCT_007">(GMT+07:00) <script>dw(MM_ntp28)</script></option>
<option value="CST_008">(GMT+08:00) <script>dw(MM_ntp29)</script></option>
<option value="CCT_008">(GMT+08:00) <script>dw(MM_ntp30)</script></option>
<option value="SST_008">(GMT+08:00) <script>dw(MM_ntp31)</script></option>
<option value="AWS_008">(GMT+08:00) <script>dw(MM_ntp32)</script></option>
<option value="JST_009">(GMT+09:00) <script>dw(MM_ntp33)</script></option>
<option value="KST_009">(GMT+09:00) <script>dw(MM_ntp34)</script></option>
<option value="UCT_010">(GMT+10:00) <script>dw(MM_ntp35)</script></option>
<option value="AES_010">(GMT+10:00) <script>dw(MM_ntp36)</script></option>
<option value="UCT_011">(GMT+11:00) <script>dw(MM_ntp37)</script></option>
<option value="UCT_012">(GMT+12:00) <script>dw(MM_ntp38)</script></option>
<option value="NZS_012">(GMT+12:00) <script>dw(MM_ntp39)</script></option>
</select></td>
</tr>
<tr>
  <td class="thead">&nbsp;</td>
  <td><input type="checkbox" name="NTPClientEnabled" value="ON" onClick="updateState()"> <script>dw(MM_ntp_client_update)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_ntp_server)</script></td>
  <td><input type="text" class="text" maxlength="64" name="NTPServerIP" value="<% getCfgGeneral(1, "NTPServerIP"); %>">&nbsp;&nbsp;<font color="#808080">ex:&nbsp;time.nist.gov, time.windows.com</font></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_ntp_time)</script>:</td>
  <td><input type="text" name="NTPSync" size="3" maxlength="5" value="<% getCfgGeneral(1, "NTPSync"); %>"> <script>dw(MM_hour)</script></td>
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
