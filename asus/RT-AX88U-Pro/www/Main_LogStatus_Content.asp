﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
<meta HTTP-EQUIV="Expires" CONTENT="-1">
<link rel="shortcut icon" href="images/favicon.png">
<link rel="icon" href="images/favicon.png">
<title><#869#> - <#437#></title>
<link rel="stylesheet" type="text/css" href="index_style.css">
<link rel="stylesheet" type="text/css" href="form_style.css">
<script language="JavaScript" type="text/javascript" src="/state.js"></script>
<script language="JavaScript" type="text/javascript" src="/general.js"></script>
<script language="JavaScript" type="text/javascript" src="/popup.js"></script>
<script language="JavaScript" type="text/javascript" src="/help.js"></script>
<script type="text/javascript" language="JavaScript" src="/validator.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/jquery.js"></script>
<script>
function showclock(){
JS_timeObj.setTime(systime_millsec);
systime_millsec += 1000;
JS_timeObj2 = JS_timeObj.toString();
JS_timeObj2 = JS_timeObj2.substring(0,3) + ", " +
JS_timeObj2.substring(4,10) + " " +
checkTime(JS_timeObj.getHours()) + ":" +
checkTime(JS_timeObj.getMinutes()) + ":" +
checkTime(JS_timeObj.getSeconds()) + " " +
/*JS_timeObj.getFullYear() + " GMT" +
timezone;*/ // Viz remove GMT timezone 2011.08
JS_timeObj.getFullYear();
document.getElementById("system_time").innerHTML = JS_timeObj2;
setTimeout("showclock()", 1000);
if(navigator.appName.indexOf("Microsoft") >= 0)
document.getElementById("textarea").style.width = "99%";
}
function showbootTime(){
Days = Math.floor(boottime / (60*60*24));
Hours = Math.floor((boottime / 3600) % 24);
Minutes = Math.floor(boottime % 3600 / 60);
Seconds = Math.floor(boottime % 60);
document.getElementById("boot_days").innerHTML = Days;
document.getElementById("boot_hours").innerHTML = Hours;
document.getElementById("boot_minutes").innerHTML = Minutes;
document.getElementById("boot_seconds").innerHTML = Seconds;
boottime += 1;
setTimeout("showbootTime()", 1000);
}
function clearLog(){
document.form1.target = "hidden_frame";
document.form1.action_mode.value = " Clear ";
document.form1.submit();
location.reload();
}
function showDST(){
var system_timezone_dut = "<% nvram_get("time_zone"); %>";
if(system_timezone_dut.search("DST") >= 0 && "<% nvram_get("time_zone_dst"); %>" == "1"){
document.getElementById('dstzone').style.display = "";
document.getElementById('dstzone').innerHTML = "<#295#>";
}
}
function initial(){
show_menu();
showclock();
showbootTime();
showDST();
document.getElementById('textarea').scrollTop = 9999999;//make Scroll_y bottom
setTimeout(get_log_data, 100);
}
function applySettings(){
var dot_array = document.config_form.log_ipaddr.value.split(".");
var valid_ipv4 = true;
var asIPv4_flag = 0;
if(dot_array.length==4){
for(var i=0;i<4;i++){
if(validator.integer(dot_array[i])){
asIPv4_flag++;
}
}
}
var alert_str1 = "";
if(asIPv4_flag==4){ //All four groups are numbers, see it as IPv4
valid_ipv4 = validator.validIPForm(document.config_form.log_ipaddr, 0);
}
else{
if(document.config_form.log_ipaddr.value != ""){
alert_str1 = validator.domainName(document.config_form.log_ipaddr);
}
}
if(!valid_ipv4){
document.getElementById("alert_msg1").style.display = "none";
document.config_form.log_ipaddr.focus();
document.config_form.log_ipaddr.select();
return;
}
else if(alert_str1!=""){
showtext(document.getElementById("alert_msg1"), alert_str1);
document.getElementById("alert_msg1").style.display = "";
document.config_form.log_ipaddr.focus();
document.config_form.log_ipaddr.select();
return;
}
else{
document.getElementById("alert_msg1").style.display = "none";
document.config_form.submit();
}
}
var filter = [
"already exist in UDB, can't add it",
"not mesh client, can't update it's ip",
"not exist in UDB, can't update it",
"send_redir_page"
]
$.getJSON("https://nw-dlcdnet.asus.com/plugin/js/logFilter.json", function(data){
filter = filter.concat(data.filter);
})
var height = 0;
function get_log_data(){
var h = 0;
$.ajax({
url: '/appGet.cgi?hook=nvram_dump(\"syslog.log\",\"syslog.sh\")',
dataType: 'text',
error: function(xhr){
setTimeout(get_log_data, 1000);
},
success: function(response){
var logString = htmlEnDeCode.htmlEncode(response.toString().slice(26,-4));
h = $("#textarea").scrollTop();
var _log = '';
if(!(height > 0 && h < height)){
var _string = logString.split('\n');
for(var i=0;i<_string.length;i++){
var found = filter.find(function(e){
return (_string[i].indexOf(e) != -1)
});
if(!found){
_log += _string[i] + '\n';
}
}
document.getElementById("textarea").innerHTML = _log;
$("#textarea").animate({ scrollTop: 9999999 }, "slow");
setTimeout('height = $("#textarea").scrollTop();', 500);
}
setTimeout(get_log_data, 3000);
}
});
}
</script>
</head>
<body onload="initial();" onunLoad="return unload_body();" class="bg">
<div id="TopBanner"></div>
<div id="Loading" class="popup_bg"></div>
<iframe name="hidden_frame" id="hidden_frame" src="" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="form" action="apply.cgi" target="hidden_frame">
<input type="hidden" name="current_page" value="Main_LogStatus_Content.asp">
<input type="hidden" name="next_page" value="Main_LogStatus_Content.asp">
<input type="hidden" name="group_id" value="">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_mode" value="">
<input type="hidden" name="action_wait" value="">
<input type="hidden" name="first_time" value="">
<input type="hidden" name="action_script" value="">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
</form>
<table class="content" align="center" cellpadding="0" cellspacing="0">
<tr>
<td width="17">&nbsp;</td>
<td valign="top" width="202">
<div id="mainMenu"></div>
<div id="subMenu"></div>
</td>
<td valign="top">
<div id="tabMenu" class="submenuBlock"></div>
<table width="98%" border="0" align="left" cellpadding="0" cellspacing="0">
<tr>
<td align="left" valign="top">
<table width="760px" border="0" cellpadding="5" cellspacing="0" bordercolor="#6b8fa3" class="FormTitle" id="FormTitle">
<tr>
<td bgcolor="#4D595D" colspan="3" valign="top">
<div>&nbsp;</div>
<div class="formfonttitle"><#773#> - <#437#></div>
<div style="margin:10px 0 10px 5px;" class="splitLine"></div>
<div class="formfontdesc"><#2275#></div>
<form method="post" name="config_form" action="start_apply.htm" target="hidden_frame">
<input type="hidden" name="current_page" value="Main_LogStatus_Content.asp">
<input type="hidden" name="next_page" value="Main_LogStatus_Content.asp">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="restart_logger">
<input type="hidden" name="action_wait" value="5">
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="FormTable">
<tr>
<th width="20%"><#296#></th>
<td>
<span id="system_time" class="devicepin" style="color:#FFFFFF;"></span>
<br><span id="dstzone" style="display:none;margin-left:5px;color:#FFFFFF;"></span>
</td>
</tr>
<tr>
<th><#2274#></a></th>
<td><span id="boot_days"></span> <#1729#> <span id="boot_hours"></span> <#2346#> <span id="boot_minutes"></span> <#2743#> <span id="boot_seconds"></span> <#3196#></td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(11,1)"><#2662#></a></th>
<td>
<input type="text" maxlength="64" class="input_30_table" name="log_ipaddr" value="<% nvram_get("log_ipaddr"); %>" onKeyPress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
<br/><span id="alert_msg1" class="hint-color"></span>
</td>
</tr>
<tr>
<th><#2664#></th>
<td>
<input type="text" class="input_6_table" maxlength="5" name="log_port" onKeyPress="return validator.isNumber(this,event);" autocorrect="off" autocapitalize="off" value='<% nvram_get("log_port"); %>'>
<div class="hint-color"><#2663#></div>
</td>
</tr>
</table>
</form>
<div class="apply_gen" style="margin-top: 5px; text-align: center;"><input class="button_gen" onclick="applySettings();" type="button" value="<#209#>" /></div>
<div style="margin-top:8px">
<textarea cols="63" rows="27" wrap="off" readonly="readonly" id="textarea" class="textarea_ssh_table" style="width:99%; font-family:'Courier New', Courier, mono; font-size:11px;"></textarea>
</div>
<div>
<table class="apply_gen">
<tr class="apply_gen" valign="top">
<td width="50%" align="right">
<form method="post" name="form1" action="apply.cgi">
<input type="hidden" name="current_page" value="Main_LogStatus_Content.asp">
<input type="hidden" name="action_mode" value=" Clear ">
<input type="submit" onClick="onSubmitCtrl(this, ' Clear ')" value="<#1686#>" class="button_gen">
</form>
</td>
<td width="50%" align="left">
<form method="post" name="form2" action="syslog.txt">
<input type="submit" onClick="onSubmitCtrl(this, ' Save ');" value="<#1705#>" class="button_gen">
</form>
</td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
<td width="10" align="center" valign="top"></td>
</tr>
</table>
<div id="footer"></div>
</body>
</html>

