﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html xmlns:v>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
<meta HTTP-EQUIV="Expires" CONTENT="-1">
<title><#944#> - Home Security</title>
<link rel="stylesheet" type="text/css" href="css/basic.css">
<link rel="stylesheet" type="text/css" href="index_style.css">
<link rel="stylesheet" type="text/css" href="form_style.css">
<script type="text/javascript" src="/state.js"></script>
<script type="text/javascript" src="/popup.js"></script>
<script type="text/javascript" src="/general.js"></script>
<script type="text/javascript" src="/help.js"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/switcherplugin/jquery.iphone-switch.js"></script>
<script type="text/javascript" src="/form.js"></script>
<script type="text/javascript" src="/js/httpApi.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/asus_eula.js"></script>
<style>
.weakness{
width:650px;
height:590px;
position:absolute;
background: rgba(0,0,0,0.8);
z-index:10;
margin-left:300px;
border-radius:10px;
display: none;
}
.weakness_router_status{
text-align:center;
font-size:18px;
padding:10px;
font-weight:bold;
}
.weakness_status{
width:90%;
background-color:#BEBEBE;
color:#000;border-collapse:separate !important;
border-radius:10px;
}
.weakness_status th{
text-align:left;
border-bottom:1px solid #4D595D;
padding-left:15px;
font-size:14px;
}
.weakness_status td{
border-bottom:1px solid #4D595D;
width:100px;
}
.weakness_status td>div{
/*background-color:#FF7575;*/ /*#1CFE16 for Yes button*/
border-radius:10px;
text-align:center;
padding:3px 0px;
width:100px;
}
.status_no{
background-color:#FF7575;
}
.status_no a{
text-decoration:underline;
}
.status_no_risk{
background-color:#EF9800;
}
.status_no_risk a{
text-decoration:underline;
}
.status_yes{
background-color:#1CFE16;
}
.alertpreference{
width:650px;
height:350px;
position:absolute;
background: rgba(0,0,0,0.9);
z-index:10;
margin-left:260px;
border-radius:10px;
padding:15px 10px 20px 10px;
display: none;
}
</style>
<script>
if(usb_support) addNewScript("/disk_functions.js");
window.onresize = function() {
if(document.getElementById("weakness_div") != null){
if(document.getElementById("weakness_div").style.display == "block") {
cal_panel_block("weakness_div", 0.25);
}
}
if(document.getElementById("alert_preference") != null){
if(document.getElementById("alert_preference").style.display == "block") {
cal_panel_block("alert_preference", 0.25);
}
}
}
var ctf_disable = '<% nvram_get("ctf_disable"); %>';
var ctf_fa_mode = '<% nvram_get("ctf_fa_mode"); %>';
var danger_count = 0;
var risk_count = 0;
var safe_count = 0;
function initial(){
show_menu();
var faq_href = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=139";
$("#faq").attr("href", faq_href);
if(document.form.wrs_protect_enable.value == '1'){
shadeHandle('1');
}
else{
shadeHandle('0');
}
getEventTime();
getEventData();
check_weakness();
$("#all_security_btn").hide();
if(!ASUS_EULA.status("tm"))
ASUS_EULA.config(eula_confirm, cancel);
}
function getEventTime(){
var time = document.form.wrs_mals_t.value*1000;
var mals_date = transferTimeFormat(time);
$("#mali_time").html(mals_date);
time = document.form.wrs_vp_t.value*1000;
var vp_date = transferTimeFormat(time);
$("#vp_time").html(vp_date);
time = document.form.wrs_cc_t.value*1000;
var cc_date = transferTimeFormat(time);
$("#infected_time").html(cc_date);
}
function transferTimeFormat(time){
if(time == 0){
return "";
}
var t = new Date();
t.setTime(time);
var year = t.getFullYear();
var month = t.getMonth() + 1;
if(month < 10){
month = "0" + month;
}
var date = t.getDate();
if(date < 10){
date = "0" + date;
}
var hour = t.getHours();
if(hour < 10){
hour = "0" + hour;
}
var minute = t.getMinutes();
if(minute < 10){
minute = "0" + minute;
}
var date_format = "Since " + year + "/" + month + "/" + date + " " + hour + ":" + minute;
return date_format;
}
function getEventData(type, date, event){
$.ajax({
url: '/getAiProtectionEvent.asp?type=' + type + '&date=' + date + '&event=' + event,
dataType: 'script',
error: function(xhr) {
setTimeout("getEventData(type, date, event);", 1000);
},
success: function(response){
var mali_count = event_count.mals_n;
var vp_count = event_count.vp_n;
var infected_count = event_count.cc_n;
$("#mali_count").html(mali_count);
$("#vp_count").html(vp_count);
$("#infected_count").html(infected_count);
}
});
}
function applyRule(){
var t = new Date();
var timestamp = t.getTime();
if(document.form.wrs_mals_t.value == "0"){
document.form.wrs_mals_t.value = timestamp.toString().substring(0, 10);
}
if(document.form.wrs_vp_t.value == "0"){
document.form.wrs_vp_t.value = timestamp.toString().substring(0, 10);
}
if(document.form.wrs_cc_t.value == "0"){
document.form.wrs_cc_t.value = timestamp.toString().substring(0, 10);
}
if(ctf_disable == 0 && ctf_fa_mode == 2){
if(!confirm("<#1754#>")){
return false;
}
else{
document.form.action_script.value = "reboot";
document.form.action_wait.value = "<% nvram_get("reboot_time"); %>";
}
}
if(reset_wan_to_fo.change_status)
reset_wan_to_fo.change_wan_mode(document.form);
showLoading();
document.form.submit();
}
function showWeaknessTable(){
cal_panel_block("weakness_div", 0.25);
$('#weakness_div').fadeIn();
}
function check_weakness(){
check_login_name_password();
check_wireless_password();
check_wireless_encryption();
check_WPS();
check_upnp();
check_wan_access();
check_ping_form_wan();
check_dmz();
check_port_trigger();
check_port_forwarding();
check_ftp_anonymous();
check_samba_anonymous();
check_TM_feature();
if(danger_count != 0){
$("#router_scan_count").html(danger_count);
$("#router_scan_count").css("backgroundColor", "#ED1C24");
$("#router_scan_state").html("<#1378#>");
}
else if(risk_count != 0){
$("#router_scan_count").html(risk_count);
$("#router_scan_count").css("backgroundColor", "#EF9800");
$("#router_scan_state").html("<#1380#>");
}
else if(safe_count != 0){
$("#router_scan_count").html(safe_count);
$("#router_scan_count").css("backgroundColor", "#24A628");
$("#router_scan_state").html("<#1381#>");
}
}
function close_weakness_status(){
$('#weakness_div').fadeOut(100);
}
function enable_whole_security(){
if(!confirm("<#1410#>")){
return false;
}
var action_script_temp = "";
var wan0_upnp_enable = document.form.wan0_upnp_enable.value;
var wan1_upnp_enable = document.form.wan1_upnp_enable.value;
var wan_access_enable = document.form.misc_http_x.value;
var wan_ping_enable = document.form.misc_ping_x.value;
var port_trigger_enable = document.form.autofw_enable_x.value;
var port_forwarding_enable = document.form.vts_enable_x.value;
var ftp_account_mode = document.form.st_ftp_mode.value;
var samba_account_mode = document.form.st_samba_mode.value;
var wrs_cc_enable = document.form.wrs_cc_enable.value;
var wrs_vp_enable = document.form.wrs_vp_enable.value;
var wrs_mals_enable = document.form.wrs_mals_enable.value;
var wps_enable = document.form.wps_enable.value;
var restart_wan = 0;
var restart_time = 0;
var restart_firewall = 0;
var restart_wrs = 0;
var restart_wireless = 0;
var restart_samba = 0;
var restart_ftp = 0;
if(wps_enable == 1){
document.form.wps_enable.value = 0;
document.form.wps_sta_pin.value = "";
document.form.wps_enable.disabled = false;
document.form.wps_sta_pin.disabled = false;
restart_wireless = 1;
document.form.action_wait.value = "20";
}
if(wan0_upnp_enable == 1 || wan1_upnp_enable == 1){
document.form.wan0_upnp_enable.value = 0;
document.form.wan1_upnp_enable.value = 0;
document.form.wan0_upnp_enable.disabled = false;
document.form.wan1_upnp_enable.disabled = false;
restart_wan = 1;
}
if(wan_access_enable ==1){
document.form.misc_http_x.value = 0;
document.form.misc_http_x.disabled = false;;
restart_time = 1;
}
if(wan_ping_enable == 1){
document.form.misc_ping_x.value = 0;
document.form.misc_ping_x.disabled = false;
restart_firewall = 1;
}
if(document.form.dmz_ip.value != ""){
document.form.dmz_ip.value = "";
document.form.dmz_ip.disabled = false;
restart_firewall = 1;
}
if(port_trigger_enable == 1){
document.form.autofw_enable_x.value = 0;
document.form.autofw_enable_x.disabled = false;
restart_firewall = 1;
}
if(port_forwarding_enable == 1){
document.form.vts_enable_x.value = 0;
document.form.vts_enable_x.disabled = false;
restart_firewall = 1;
}
if(ftp_account_mode == 1){
document.form.st_ftp_mode.value = 2;
document.form.st_ftp_force_mode.value = 2;
document.form.st_ftp_mode.disabled = false;
document.form.st_ftp_force_mode.disabled = false;
restart_ftp = 1
}
if(samba_account_mode == 1){
document.form.st_samba_mode.value = 4;
document.form.st_samba_force_mode.value = 4;
document.form.st_samba_mode.disabled = false;
document.form.st_samba_force_mode.disabled = false;
restart_samba = 1;
}
if(wrs_cc_enable == 0){
document.form.wrs_cc_enable.value = 1;
restart_firewall = 1;
restart_wrs = 1;
}
if(wrs_vp_enable == 0){
document.form.wrs_vp_enable.value = 1;
restart_firewall = 1;
restart_wrs = 1;
}
if(wrs_mals_enable == 0){
document.form.wrs_mals_enable.value = 1;
restart_firewall = 1;
restart_wrs = 1;
}
if(restart_wan == 1){
if(action_script_temp == "")
action_script_temp += "restart_wan_if";
else
action_script_temp += ";restart_wan_if";
}
if(restart_time == 1){
if(action_script_temp == "")
action_script_temp =+ "restart_time";
else
action_script_temp += ";restart_time";
}
if(restart_wrs == 1){
if(action_script_temp == "")
action_script_temp += "restart_wrs";
else
action_script_temp += ";restart_wrs";
}
if(restart_firewall == 1){
if(action_script_temp == "")
action_script_temp += "restart_firewall";
else
action_script_temp += ";restart_firewall";
}
if(restart_wireless == 1){
if(action_script_temp == ""){
action_script_temp += "restart_wireless";
}
else{
action_script_temp += ";restart_wireless";
}
}
if(restart_samba == 1 && restart_ftp == 1){
if(action_script_temp == "")
action_script_temp += "restart_ftpsamba";
else
action_script_temp += ";restart_ftpsamba";
}
else{
if(restart_samba == 1){
if(action_script_temp == "")
action_script_temp += "restart_samba";
else
action_script_temp += ";restart_samba";
}
if(restart_ftp == 1){
if(action_script_temp == "")
action_script_temp += "restart_ftpd";
else
action_script_temp += ";restart_ftpd";
}
}
document.form.action_script.value = action_script_temp;
document.form.submit();
}
function check_login_name_password(){
if(<% check_acorpw(); %> == 1){
danger_count++;
document.getElementById('login_password').innerHTML = "<a href='Advanced_System_Content.asp' target='_blank'><#274#></a>";
document.getElementById('login_password').className = "status_no";
document.getElementById('login_password').onmouseover = function(){overHint(10);}
document.getElementById('login_password').onmouseout = function(){nd();}
}
else{
safe_count++;
document.getElementById('login_password').innerHTML = "<#275#>";
document.getElementById('login_password').className = "status_yes";
}
}
function check_wireless_password(){
var nScore = <% check_passwd_strength("wl_key"); %>;
var oScore = document.getElementById("score");
if (nScore >= 0 && nScore < 20) { sComplexity = "<#567#>"; }
else if (nScore >= 20 && nScore < 40) { sComplexity = "<#568#>"; }
else if (nScore >= 40 && nScore < 60) { sComplexity = "<#569#>"; }
else if (nScore >= 60 && nScore < 80) { sComplexity = "<#570#>"; }
else if (nScore >= 80 && nScore <= 100) { sComplexity = "<#571#>"; }
if(nScore >= 0 && nScore < 40){
danger_count++;
document.getElementById('score').className = "status_no";
}
else if(nScore >= 0 && nScore < 40){
risk_count++;
document.getElementById('score').className = "status_no_risk";
}
else if(nScore >= 60 && nScore <= 100){
safe_count++;
document.getElementById('score').className = "status_yes";
}
oScore.innerHTML = sComplexity;
if(document.getElementById('score').className == "status_no")
{
document.getElementById('score').onmouseover = function(){overHint(11);}
document.getElementById('score').onmouseout = function(){nd();}
}
}
function check_wireless_encryption(){
if(<% check_wireless_encryption(); %> == "1"){
safe_count++;
document.getElementById('wireless_encryption').innerHTML = "<#570#>";
document.getElementById('wireless_encryption').className = "status_yes";
}
else{
danger_count++;
document.getElementById('wireless_encryption').innerHTML = "<a href='Advanced_Wireless_Content.asp' target='_blank'><#568#></a>";
document.getElementById('wireless_encryption').className = "status_no";
document.getElementById('wireless_encryption').onmouseover = function(){overHint(12);}
document.getElementById('wireless_encryption').onmouseout = function(){nd();}
}
}
function check_WPS(){
var wps_enable = document.form.wps_enable.value;
if(wps_enable == 0){
safe_count++;
document.getElementById('wps_status').innerHTML = "<#275#>";
document.getElementById('wps_status').className = "status_yes";
}
else{
risk_count++;
document.getElementById('wps_status').innerHTML = "<a href='Advanced_WWPS_Content.asp' target='_blank'><#274#></a>";
document.getElementById('wps_status').className = "status_no_risk";
document.getElementById('wps_status').onmouseover = function(){overHint(25);}
document.getElementById('wps_status').onmouseout = function(){nd();}
}
}
function check_upnp(){
var wan0_upnp_enable = document.form.wan0_upnp_enable.value;
var wan1_upnp_enable = document.form.wan1_upnp_enable.value;
if(dualwan_enabled){
if(wan0_upnp_enable == 0 && wan1_upnp_enable == 0){
safe_count++;
document.getElementById('upnp_service').innerHTML = "<#275#>";
document.getElementById('upnp_service').className = "status_yes";
}
else{
risk_count++;
document.getElementById('upnp_service').onclick = function(){
function change_wan_unit(unit){
FormActions("apply.cgi", "change_wan_unit", "", "");
document.form.wan_unit.value = unit;
document.form.wan_unit.disabled = false;
document.form.current_page.value="Advanced_WAN_Content.asp";
document.form.target = "";
document.form.submit();
}
if(wan0_upnp_enable == "1")
change_wan_unit(0);
else
change_wan_unit(1);
}
document.getElementById('upnp_service').innerHTML = "<a><#274#></a>";
document.getElementById('upnp_service').className = "status_no_risk";
document.getElementById('upnp_service').onmouseover = function(){overHint(13);}
document.getElementById('upnp_service').onmouseout = function(){nd();}
}
}
else{
if(wan0_upnp_enable == 0){
safe_count++;
document.getElementById('upnp_service').innerHTML = "<#275#>";
document.getElementById('upnp_service').className = "status_yes";
}
else{
risk_count++;
document.getElementById('upnp_service').innerHTML = "<a href='Advanced_WAN_Content.asp' target='_blank'><#274#></a>";
document.getElementById('upnp_service').className = "status_no_risk";
document.getElementById('upnp_service').onmouseover = function(){overHint(13);}
document.getElementById('upnp_service').onmouseout = function(){nd();}
}
}
}
function check_wan_access(){
var wan_access_enable = document.form.misc_http_x.value;
if(wan_access_enable == 0){
safe_count++;
document.getElementById('access_from_wan').innerHTML = "<#275#>";
document.getElementById('access_from_wan').className = "status_yes";
}
else{
risk_count++;
document.getElementById('access_from_wan').innerHTML = "<a href='Advanced_System_Content.asp' target='_blank'><#274#></a>";
document.getElementById('access_from_wan').className = "status_no_risk";
document.getElementById('access_from_wan').onmouseover = function(){overHint(14);}
document.getElementById('access_from_wan').onmouseout = function(){nd();}
}
}
function check_ping_form_wan(){
var wan_ping_enable = document.form.misc_ping_x.value;
if(wan_ping_enable == 0){
safe_count++;
document.getElementById('ping_from_wan').innerHTML = "<#275#>";
document.getElementById('ping_from_wan').className = "status_yes";
}
else{
risk_count++;
document.getElementById('ping_from_wan').innerHTML = "<a href='Advanced_BasicFirewall_Content.asp' target='_blank'><#274#></a>";
document.getElementById('ping_from_wan').className = "status_no_risk";
document.getElementById('ping_from_wan').onmouseover = function(){overHint(15);}
document.getElementById('ping_from_wan').onmouseout = function(){nd();}
}
}
function check_dmz(){
if(document.form.dmz_ip.value == ""){
safe_count++;
document.getElementById('dmz_service').innerHTML = "<#275#>";
document.getElementById('dmz_service').className = "status_yes";
}
else{
risk_count++;
document.getElementById('dmz_service').innerHTML = "<a href='Advanced_Exposed_Content.asp' target='_blank'><#274#></a>";
document.getElementById('dmz_service').className = "status_no_risk";
document.getElementById('dmz_service').onmouseover = function(){overHint(16);}
document.getElementById('dmz_service').onmouseout = function(){nd();}
}
}
function check_port_trigger(){
var port_trigger_enable = document.form.autofw_enable_x.value;
if(port_trigger_enable == 0){
safe_count++;
document.getElementById('port_tirgger').innerHTML = "<#275#>";
document.getElementById('port_tirgger').className = "status_yes";
}
else{
risk_count++;
document.getElementById('port_tirgger').innerHTML = "<a href='Advanced_PortTrigger_Content.asp' target='_blank'><#274#></a>";
document.getElementById('port_tirgger').className = "status_no_risk";
document.getElementById('port_tirgger').onmouseover = function(){overHint(17);}
document.getElementById('port_tirgger').onmouseout = function(){nd();}
}
}
function check_port_forwarding(){
var port_forwarding_enable = document.form.vts_enable_x.value;
if(port_forwarding_enable == 0){
safe_count++;
document.getElementById('port_forwarding').innerHTML = "<#275#>";
document.getElementById('port_forwarding').className = "status_yes";
}
else{
risk_count++;
document.getElementById('port_forwarding').innerHTML = "<a href='Advanced_VirtualServer_Content.asp' target='_blank'><#274#></a>";
document.getElementById('port_forwarding').className = "status_no_risk";
document.getElementById('port_forwarding').onmouseover = function(){overHint(18);}
document.getElementById('port_forwarding').onmouseout = function(){nd();}
}
}
function check_ftp_anonymous(){
var ftp_account_mode = document.form.st_ftp_mode.value; //1: shared mode, 2: account mode
if(ftp_account_mode == 1){
risk_count++;
document.getElementById('ftp_account').innerHTML = "<a href='Advanced_AiDisk_ftp.asp' target='_blank'><#274#></a>";
document.getElementById('ftp_account').className = "status_no_risk";
document.getElementById('ftp_account').onmouseover = function(){overHint(19);}
document.getElementById('ftp_account').onmouseout = function(){nd();}
}
else{
safe_count++;
document.getElementById('ftp_account').innerHTML = "<#275#>";
document.getElementById('ftp_account').className = "status_yes";
}
}
function check_samba_anonymous(){
var samba_account_mode = document.form.st_samba_mode.value; //1: shared mode, 4: account mode
if(samba_account_mode == 1){
risk_count++;
document.getElementById('samba_account').innerHTML = "<a href='Advanced_AiDisk_samba.asp' target='_blank'><#274#></a>";
document.getElementById('samba_account').className = "status_no_risk";
document.getElementById('samba_account').onmouseover = function(){overHint(20);}
document.getElementById('samba_account').onmouseout = function(){nd();}
}
else{
safe_count++;
document.getElementById('samba_account').innerHTML = "<#275#>";
document.getElementById('samba_account').className = "status_yes";
}
}
function check_TM_feature(){
var wrs_cc_enable = document.form.wrs_cc_enable.value;
var wrs_vp_enable = document.form.wrs_vp_enable.value;
var wrs_mals_enable = document.form.wrs_mals_enable.value;
if(wrs_mals_enable == 1){
safe_count++;
document.getElementById('wrs_service').innerHTML = "<#275#>";
document.getElementById('wrs_service').className = "status_yes";
}
else{
risk_count++;
document.getElementById('wrs_service').innerHTML = "<a href='AiProtection_HomeProtection.asp' target='_blank'><#274#></a>";
document.getElementById('wrs_service').className = "status_no_risk";
document.getElementById('wrs_service').onmouseover = function(){overHint(21);}
document.getElementById('wrs_service').onmouseout = function(){nd();}
}
if(wrs_vp_enable == 1){
safe_count++;
document.getElementById('vp_service').innerHTML = "<#275#>";
document.getElementById('vp_service').className = "status_yes";
}
else{
risk_count++;
document.getElementById('vp_service').innerHTML = "<a href='AiProtection_HomeProtection.asp' target='_blank'><#274#></a>";
document.getElementById('vp_service').className = "status_no_risk";
document.getElementById('vp_service').onmouseover = function(){overHint(22);}
document.getElementById('vp_service').onmouseout = function(){nd();}
}
if(wrs_cc_enable == 1){
safe_count++;
document.getElementById('cc_service').innerHTML = "<#275#>";
document.getElementById('cc_service').className = "status_yes";
}
else{
risk_count++;
document.getElementById('cc_service').innerHTML = "<a href='AiProtection_HomeProtection.asp' target='_blank'><#274#></a>";
document.getElementById('cc_service').className = "status_no_risk";
document.getElementById('cc_service').onmouseover = function(){overHint(23);}
document.getElementById('cc_service').onmouseout = function(){nd();}
}
}
function cancel(){
refreshpage();
}
function eula_confirm(){
document.form.TM_EULA.value = 1;
document.form.wrs_protect_enable.value = "1";
document.form.action_wait.value = "15";
applyRule();
}
function switch_control(_status){
if(_status) {
if(reset_wan_to_fo.check_status()) {
if(ASUS_EULA.check("tm")){
document.form.wrs_protect_enable.value = "1";
shadeHandle("1");
applyRule();
}
}
else
cancel();
}
else {
document.form.wrs_protect_enable.value = "0";
shadeHandle("0");
applyRule();
}
}
function show_alert_preference(){
cal_panel_block("alert_preference", 0.25);
check_smtp_server_type();
parse_wrs_mail_bit();
$('#alert_preference').fadeIn(300);
document.getElementById('mail_address').value = document.form.PM_MY_EMAIL.value;
document.getElementById('mail_password').value = document.form.PM_SMTP_AUTH_PASS.value;
}
function close_alert_preference(){
$('#alert_preference').fadeOut(100);
}
var smtpList = new Array();
smtpList = [
{smtpServer: "smtp.gmail.com", smtpPort: "587", smtpDomain: "gmail.com"},
{smtpServer: "smtp.aol.com", smtpPort: "587", smtpDomain: "aol.com"},
{smtpServer: "smtp.qq.com", smtpPort: "587", smtpDomain: "qq.com"},
{smtpServer: "smtp.163.com", smtpPort: "25", smtpDomain: "163.com"},
{end: 0}
];
function apply_alert_preference(){
var address_temp = document.getElementById('mail_address').value;
var account_temp = document.getElementById('mail_address').value.split("@");
var authpass_temp = document.getElementById('mail_password').value;
var mail_bit = 0;
var server_index = document.getElementById("mail_provider").value;
if(address_temp == "") {
alert("Please input the mail account!");
return;
}
if(authpass_temp == "") {
alert("Please input the mail password!");
return;
}
if(address_temp.indexOf('@') != -1){
if(account_temp[1] != "gmail.com" && account_temp[1] != "aol.com" && account_temp[1] != "qq.com" && account_temp[1] != "163.com"){
alert("Wrong mail domain");
document.getElementById('mail_address').focus();
return false;
}
if (document.form.PM_MY_EMAIL.value != address_temp || document.form.PM_MY_AUTH_PASS.value != authpass_temp)
document.form.action_script.value += ";email_conf;send_confirm_mail";
document.form.PM_MY_EMAIL.value = address_temp;
}
else{
if (document.form.PM_MY_EMAIL.value != address_temp || document.form.PM_MY_AUTH_PASS.value != authpass_temp)
document.form.action_script.value += ";email_conf;send_confirm_mail";
document.form.PM_MY_EMAIL.value = account_temp[0] + "@" +smtpList[server_index].smtpDomain;
}
if(document.getElementById("mal_website_item").checked)
mail_bit += 1;
if(document.getElementById("vp_item").checked)
mail_bit += 2;
if(document.getElementById("cc_item").checked)
mail_bit += 4;
document.form.wrs_mail_bit.value = mail_bit;
document.form.PM_SMTP_AUTH_USER.value = account_temp[0];
document.form.PM_SMTP_AUTH_PASS.value = document.getElementById('mail_password').value;
document.form.PM_SMTP_SERVER.value = smtpList[server_index].smtpServer;
document.form.PM_SMTP_PORT.value = smtpList[server_index].smtpPort;
$('#alert_preference').fadeOut(100);
document.form.submit();
}
function parse_wrs_mail_bit(){
var quot = document.form.wrs_mail_bit.value;
var mail_bit_array = new Array();
for(i=0;i<3;i++){
mail_bit_array[i] = quot%2;
quot = parseInt(quot/2);
}
document.getElementById("mal_website_item").checked = mail_bit_array[0] == 1 ? true : false;
document.getElementById("vp_item").checked = mail_bit_array[1] == 1 ? true : false;
document.getElementById("cc_item").checked = mail_bit_array[2] == 1 ? true : false;
}
function check_smtp_server_type(){
for(i = 0;i < smtpList.length; i++){
if(smtpList[i].smtpServer == document.form.PM_SMTP_SERVER.value){
document.getElementById("mail_provider").value = i;
break;
}
}
}
function shadeHandle(flag){
if(flag == "0"){
$("#mals_shade").css("display", "");
$("#mals_count_shade").css("display", "");
$("#vp_shade").css("display", "");
$("#vp_count_shade").css("display", "");
$("#cc_shade").css("display", "");
$("#infected_count_shade").css("display", "");
}
else{
$("#mals_shade").css("display", "none");
$("#mals_count_shade").css("display", "none");
$("#vp_shade").css("display", "none");
$("#vp_count_shade").css("display", "none");
$("#cc_shade").css("display", "none");
$("#infected_count_shade").css("display", "none");
}
}
</script>
</head>
<body onload="initial();" onunload="unload_body();" class="bg">
<div id="TopBanner"></div>
<div id="Loading" class="popup_bg"></div>
<div id="hiddenMask" class="popup_bg" style="z-index:999;">
<table cellpadding="5" cellspacing="0" id="dr_sweet_advise" class="dr_sweet_advise" align="center"></table>
<!--[if lte IE 6.5.]><script>alert("<#1465#>");</script><![endif]-->
</div>
<div id="weakness_div" class="weakness">
<table style="width:99%;">
<tr>
<td>
<div class="weakness_router_status"><#1348#></div>
</td>
</tr>
<tr>
<td>
<div>
<table class="weakness_status" cellspacing="0" cellpadding="4" align="center">
<tr>
<th><#1350#> -</th>
<td>
<div id="login_password"></div>
</td>
</tr>
<tr>
<th><#1351#> -</th>
<td>
<div id="score"></div>
</td>
</tr>
<tr>
<th><#1352#> -</th>
<td>
<div id="wireless_encryption"></div>
</td>
</tr>
<tr>
<th>WPS disabled -</th>
<td>
<div id="wps_status"></div>
</td>
</tr>
<tr>
<th><#1353#> -</th>
<td>
<div id="upnp_service"></div>
</td>
</tr>
<tr>
<th><#1354#> -</th>
<td>
<div id="access_from_wan"></div>
</td>
</tr>
<tr>
<th><#1355#> -</th>
<td>
<div id="ping_from_wan"></div>
</td>
</tr>
<tr>
<th><#1356#> -</th>
<td>
<div id="dmz_service"></div>
</td>
</tr>
<tr>
<th><#1357#> -</th>
<td>
<div id="port_tirgger"></div>
</td>
</tr>
<tr>
<th><#1358#> -</th>
<td>
<div id="port_forwarding"></div>
</td>
</tr>
<tr>
<th><#1359#> -</th>
<td>
<div id="ftp_account"></div>
</td>
</tr>
<tr>
<th><#1360#> -</th>
<td>
<div id="samba_account"></div>
</td>
</tr>
<tr>
<th><#1361#> -</th>
<td>
<div id="wrs_service"></div>
</td>
</tr>
<tr>
<th><#1362#> -</th>
<td>
<div id="vp_service"></div>
</td>
</tr>
<tr>
<th><#1300#> -</th>
<td>
<div id="cc_service"></div>
</td>
</tr>
</table>
</div>
</td>
</tr>
<tr>
<td>
<table style="margin-top:10px;margin-left:auto;margin-right:auto;">
<tr>
<td>
<input class="button_gen" type="button" onclick="close_weakness_status();" value="<#1762#>">
</td>
<td>
<input id="all_security_btn" class="button_gen" type="button" onclick="enable_whole_security();" value="<#1787#>">
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
<div id="alert_preference" class="eula_panel_container border-container" style="width: 600px; margin-top: -200px;position: fixed; display: block;background:rgba(0,0,0,0.9);display:none;">
<div class="border-corner border-corner-top-left"></div>
<div class="border-corner border-corner-bottom-left"></div>
<div class="flexbox title-container">
<div class="title-symbol"></div>
<div class="title-content"><#1296#></div>
</div>
<div id="tm_eula_content">
<div style="margin-bottom: 6px;"><#1344#></div>
<div class="flexbox flex-a-center" style="margin: 12px 0;">
<div style="width: 150px;margin-right: 18px;font-size: 14px;font-family: Xolonium;color: #848C98"><#3158#></div>
<div class="select-container">
<select name="" id="mail_provider">
<option value="0">Google</option>
<option value="1">AOL</option>
<option value="2">QQ</option>
<option value="3">163</option>
</select>
<div class="select-arrow">
<div></div>
</div>
</div>
</div>
<div class="flexbox flex-a-center" style="margin: 12px 0;">
<div style="width: 150px;margin-right: 18px;font-size: 14px;font-family: Xolonium;color: #848C98">Email</div>
<div>
<input type="type" class="input-container" id="mail_address">
</div>
</div>
<div class="flexbox flex-a-center" style="margin: 12px 0;">
<div style="width: 150px;margin-right: 18px;font-size: 14px;font-family: Xolonium;color: #848C98"><#2438#></div>
<div>
<input type="password" class="input-container" id="mail_password" maxlength="50" autocorrect="off" autocapitalize="off">
</div>
</div>
<div class="flexbox flex-a-center" style="margin: 12px 0;">
<div style="width: 150px;margin-right: 18px;font-size: 14px;font-family: Xolonium;color: #848C98"><#3000#></div>
<div>
<div class="flexbox checkbox-container">
<div>
<input id="mal_website_item" type="checkbox">
<label for="mal_website_item">
<div></div>
</label>
</div>
<div class="checkbox-desc"><#1387#></div>
</div>
<div class="flexbox checkbox-container">
<div>
<input id="vp_item" type="checkbox">
<label for="vp_item">
<div></div>
</label>
</div>
<div class="checkbox-desc"><#1407#></div>
</div>
<div class="flexbox checkbox-container">
<div>
<div>
<input type="checkbox" id="mal_website_item">
<span style="color: #FFF;"><#1387#></span>
</div>
<div>
<input type="checkbox" id="vp_item">
<span style="color: #FFF;"><#1407#></span>
</div>
<div>
<input type="checkbox" id="cc_item">
<span style="color: #FFF;"><#1300#></span>
</div>
</div>
<div class="checkbox-desc"><#1300#></div>
</div>
</div>
</div>
</div>
<div class="divide-line"></div>
<div class="control-field">
<div class="button-container button-container-sm" onclick="close_alert_preference();">
<div class="button-icon icon-cancel"></div>
<div class="button-text"><#1762#></div>
</div>
<div class="button-container button-container-sm" onclick="apply_alert_preference();">
<div class="button-icon button-icon-check"></div>
<div class="button-text"><#284#></div>
</div>
</div>
</div>
<iframe name="hidden_frame" id="hidden_frame" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="form" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="productid" value="<% nvram_get("productid"); %>">
<input type="hidden" name="current_page" value="AiProtection_HomeProtection.asp">
<input type="hidden" name="next_page" value="">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_wait" value="4">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="restart_wrs;restart_firewall">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>" disabled>
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="wrs_mals_enable" value="<% nvram_get("wrs_mals_enable"); %>">
<input type="hidden" name="wrs_cc_enable" value="<% nvram_get("wrs_cc_enable"); %>">
<input type="hidden" name="wrs_vp_enable" value="<% nvram_get("wrs_vp_enable"); %>">
<input type="hidden" name="wan0_upnp_enable" value="<% nvram_get("wan0_upnp_enable"); %>" disabled>
<input type="hidden" name="wan1_upnp_enable" value="<% nvram_get("wan1_upnp_enable"); %>" disabled>
<input type="hidden" name="wan_unit" value="<% nvram_get("wan_unit"); %>" disabled>
<input type="hidden" name="misc_http_x" value="<% nvram_get("misc_http_x"); %>" disabled>
<input type="hidden" name="misc_ping_x" value="<% nvram_get("misc_ping_x"); %>" disabled>
<input type="hidden" name="dmz_ip" value="<% nvram_get("dmz_ip"); %>" disabled>
<input type="hidden" name="autofw_enable_x" value="<% nvram_get("autofw_enable_x"); %>" disabled>
<input type="hidden" name="vts_enable_x" value="<% nvram_get("vts_enable_x"); %>" disabled>
<input type="hidden" name="wps_enable" value="<% nvram_get("wps_enable"); %>" disabled>
<input type="hidden" name="wps_sta_pin" value="<% nvram_get("wps_sta_pin"); %>" disabled>
<input type="hidden" name="TM_EULA" value="<% nvram_get("TM_EULA"); %>">
<input type="hidden" name="PM_SMTP_SERVER" value="<% nvram_get("PM_SMTP_SERVER"); %>">
<input type="hidden" name="PM_SMTP_PORT" value="<% nvram_get("PM_SMTP_PORT"); %>">
<input type="hidden" name="PM_MY_EMAIL" value="<% nvram_get("PM_MY_EMAIL"); %>">
<input type="hidden" name="PM_SMTP_AUTH_USER" value="<% nvram_get("PM_SMTP_AUTH_USER"); %>">
<input type="hidden" name="PM_SMTP_AUTH_PASS" value="">
<input type="hidden" name="wrs_mail_bit" value="<% nvram_get("wrs_mail_bit"); %>">
<input type="hidden" name="st_ftp_force_mode" value="<% nvram_get("st_ftp_force_mode"); %>" disabled>
<input type="hidden" name="st_ftp_mode" value="<% nvram_get("st_ftp_mode"); %>" disabled>
<input type="hidden" name="st_samba_force_mode" value="<% nvram_get("st_samba_force_mode"); %>" disabled>
<input type="hidden" name="st_samba_mode" value="<% nvram_get("st_samba_mode"); %>" disabled>
<input type="hidden" name="wrs_mals_t" value="<% nvram_get("wrs_mals_t"); %>" >
<input type="hidden" name="wrs_vp_t" value="<% nvram_get("wrs_vp_t"); %>" >
<input type="hidden" name="wrs_cc_t" value="<% nvram_get("wrs_cc_t"); %>" >
<input type="hidden" name="wrs_protect_enable" value="<% nvram_get("wrs_protect_enable"); %>" >
<table class="content" align="center" cellpadding="0" cellspacing="0" >
<tr>
<td width="17">&nbsp;</td>
<td valign="top" width="202">
<div id="mainMenu"></div>
<div id="subMenu"></div>
</td>
<td valign="top">
<div id="tabMenu" class="submenuBlock"></div>
<table width="98%" border="0" align="left" cellpadding="0" cellspacing="0" class="content_bg">
<tr>
<td valign="top" >
<table width="730px" border="0" cellpadding="4" cellspacing="0" class="FormTitle" id="FormTitle">
<tbody>
<tr>
<td valign="top">
<div>&nbsp;</div>
<div>
<table width="730px">
<tr>
<td align="left">
<span class="formfonttitle"><#1390#></span>
</td>
</tr>
</table>
</div>
<div style="margin: 10px 0 10px 5px;" class="splitLine"></div>
<div id="PC_desc">
<table width="700px" style="margin-left:25px;">
<tr>
<td>
<img id="guest_image" src="/images/New_ui/HomeProtection.png">
</td>
<td>&nbsp;&nbsp;</td>
<td style="font-size:14px;">
<table>
<tr>
<td>
<div style="width:430px"><#1345#></div>
<div style="width:430px"><a id="faq" style="text-decoration:underline;" href="" target="_blank"><#1390#> FAQ</a></div>
</td>
<td>
<div style="width:100px;height:48px;margin-left:-40px;background-image:url('images/New_ui/tm_logo.png');"></div>
</td>
</tr>
<tr>
<td rowspan="2">
<div>
<img src="/images/New_ui/Home_Protection_Scenario.png">
</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
<div style="margin:10px;">
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="FormTable">
<tr>
<th><#1769#> <#1390#></th>
<td>
<div align="center" class="left" style="width:94px; float:left; cursor:pointer;" id="radio_protection_enable"></div>
<div class="iphone_switch_container" style="height:32px; width:74px; position: relative; overflow: hidden">
<script type="text/javascript">
$('#radio_protection_enable').iphoneSwitch('<% nvram_get("wrs_protect_enable"); %>',
function(){
switch_control(1);
},
function(){
switch_control(0);
}
);
</script>
</div>
</td>
</tr>
</table>
</div>
<div style="margin-top:5px;">
<table style="width:99%;border-collapse:collapse;">
<tr class="block_bg block_line" style="height:120px;">
<td style="border-radius:10px 0px 0px 10px;">
<div style="text-align:center;background: url('/images/New_ui/AiProtection_01.png');width:34px;height:34px;margin: 0 5px;"></div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="padding:10px;">
<div style="font-size:18px;text-shadow:1px 1px 0px black;"><#1348#></div>
<div style="font-size: 14px;color:#FC0;height:auto;padding-top:5px;"><#1349#></div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="width:20%;">
<div style="display: flex; justify-content: center; align-items: center;">
<input class="button_gen" type="button" onclick="showWeaknessTable();" value="<#1785#>">
</div>
</td>
<td>
<div class="line_vertical"></div>
</td>
<td style="width:20%;border-radius:0px 10px 10px 0px;">
<div id="router_scan_status" style="text-align:center;">
<div id="router_scan_count" style="width:50px;height:50px;background-color:#ED1C24;border-radius:50%;margin-left:45px;line-height: 50px;font-size:30px;"></div>
<div id="router_scan_state" style="font-size: 16px;padding-top:5px;"></div>
</div>
</td>
</tr>
<tr style="height:10px;"></tr>
<tr class="block_bg block_line" style="height:120px;">
<td style="border-radius:10px 0px 0px 10px;">
<div style="text-align:center;background: url('/images/New_ui/AiProtection_02.png');width:34px;height:34px;margin: 0 5px;"></div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="padding:10px;cursor:pointer;" onclick="location.href='AiProtection_MaliciousSitesBlocking.asp'">
<div>
<div style="font-size:18px;text-shadow:1px 1px 0px black;"><#1387#></div>
<div style="font-size: 14px;color:#FC0;height:auto;padding-top:5px;"><#1386#></div>
</div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="width:20%;">
<div style="position:relative; display: flex; justify-content: center; align-items: center;">
<div id="mals_shade" style="position:absolute;width:140px;height:115px;background-color:#505050;opacity:0.6;z-index:5;display:none"></div>
<div align="center" class="left" style="width:94px; float:left; cursor:pointer;" id="radio_mals_enable"></div>
<div class="iphone_switch_container" style="height:32px; position: relative; overflow: hidden">
<script type="text/javascript">
$('#radio_mals_enable').iphoneSwitch('<% nvram_get("wrs_mals_enable"); %>',
function(){
document.form.wrs_mals_enable.value = 1;
applyRule();
},
function(){
document.form.wrs_mals_enable.value = 0;
applyRule();
}
);
</script>
</div>
</div>
</td>
<td >
<div class="line_vertical"></div>
</td>
<td style="width:20%;border-radius:0px 10px 10px 0px;cursor:pointer;">
<div style="position:relative; display: flex; justify-content: center; align-items: center" onclick="location.href='AiProtection_MaliciousSitesBlocking.asp'">
<div id="mals_count_shade" style="position:absolute;width:140px;height:115px;background-color:#505050;opacity:0.6;z-index:5; display:none"></div>
<div style="text-align:center;">
<div id="mali_count" style="width:45px;height:45px;margin:0 auto;line-height: 45px;font-size:38px;color:#FC0;text-shadow:1px 1px 0px black"></div>
<div style="font-size: 16px;"><#1379#></div>
<div id="mali_time" style="color:#A1A7A8"></div>
</div>
</div>
</td>
</tr>
<tr style="height:10px;"></tr>
<tr class="block_bg block_line" style="height:120px;">
<td style="border-radius:10px 0px 0px 10px;">
<div style="text-align:center;background: url('/images/New_ui/AiProtection_02.png');width:34px;height:34px;margin: 0 5px;"></div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="padding:10px;cursor:pointer;" onclick="location.href='AiProtection_IntrusionPreventionSystem.asp'">
<div>
<div style="font-size:18px;text-shadow:1px 1px 0px black;"><#1407#></div>
<div style="font-size: 14px;color:#FC0;height:auto;padding-top:5px;"><#1408#></div>
</div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="width:20%;">
<div style="position:relative; display: flex; justify-content: center; align-items: center;">
<div id="vp_shade" style="position:absolute;width:140px;height:115px;background-color:#505050;opacity:0.6;z-index:5; display:none"></div>
<div align="center" class="left" style="width:94px; float:left; cursor:pointer;" id="radio_vp_enable"></div>
<div class="iphone_switch_container" style="height:32px; position: relative; overflow: hidden">
<script type="text/javascript">
$('#radio_vp_enable').iphoneSwitch('<% nvram_get("wrs_vp_enable"); %>',
function(){
document.form.wrs_vp_enable.value = 1;
applyRule();
},
function(){
document.form.wrs_vp_enable.value = 0;
applyRule();
}
);
</script>
</div>
</div>
</td>
<td >
<div class="line_vertical"></div>
</td>
<td style="width:20%;border-radius:0px 10px 10px 0px;cursor:pointer;">
<div style="position:relative; display: flex; justify-content: center; align-items: center" onclick="location.href='AiProtection_IntrusionPreventionSystem.asp'">
<div id="vp_count_shade" style="position:absolute;width:140px;height:115px;background-color:#505050;opacity:0.6;z-index:5; display:none"></div>
<div style="text-align:center;">
<div id="vp_count" style="width:45px;height:45px;margin:0 auto;line-height: 45px;font-size:38px;color:#FC0;text-shadow:1px 1px 0px black"></div>
<div style="font-size: 16px;"><#1379#></div>
<div id="vp_time" style="color:#A1A7A8"></div>
</div>
</div>
</td>
</tr>
<tr style="height:10px;"></tr>
<tr class="block_bg" style="height:120px;">
<td style="border-radius:10px 0px 0px 10px;">
<div style="text-align:center;background: url('/images/New_ui/AiProtection_03.png');width:34px;height:34px;margin: 0 5px;"></div>
</td>
<td width="6px">
<div class="line_vertical"></div>
</td>
<td style="padding:10px;cursor:pointer" onclick="location.href='AiProtection_InfectedDevicePreventBlock.asp'">
<div style="font-size:18px;text-shadow:1px 1px 0px black;"><#1300#></div>
<div style="font-size: 14px;color:#FC0;height:auto;;padding-top:5px;"><#1299#></div>
</td>
<td>
<div class="line_vertical"></div>
</td>
<td style="width:20%;">
<div style="position:relative; display: flex; justify-content: center; align-items: center;">
<div id="cc_shade" style="position:absolute;width:140px;height:115px;background-color:#505050;opacity:0.6;z-index:5; display:none"></div>
<div align="center" class="left" style="width:94px; float:left; cursor:pointer;" id="radio_cc_enable"></div>
<div class="iphone_switch_container" style="height:32px; position: relative; overflow: hidden">
<script type="text/javascript">
$('#radio_cc_enable').iphoneSwitch('<% nvram_get("wrs_cc_enable"); %>',
function(){
document.form.wrs_cc_enable.value = 1;
applyRule();
},
function(){
document.form.wrs_cc_enable.value = 0;
applyRule();
}
);
</script>
</div>
</div>
</td>
<td>
<div class="line_vertical"></div>
</td>
<td style="width:20%;border-radius:0px 10px 10px 0px;cursor:pointer;">
<div style="position:relative; display: flex; justify-content: center; align-items: center" onclick="location.href='AiProtection_InfectedDevicePreventBlock.asp'">
<div id="infected_count_shade" style="position:absolute;width:140px;height:115px;background-color:#505050;opacity:0.6;z-index:5; display:none"></div>
<div style="text-align:center;">
<div id="infected_count" style="width:45px;height:45px;margin:0 auto;line-height: 45px;font-size:38px;color:#FC0;text-shadow:1px 1px 0px black"></div>
<div style="font-size: 16px;"><#1379#></div>
<div id="infected_time" style="color:#A1A7A8"></div>
</div>
</div>
</td>
</tr>
</table>
</div>
<div style=";margin:20px 0;text-align:right">
<div style="display:inline-block">
<input class="button_gen" type="button" onclick="show_alert_preference();" value="<#1296#>">
</div>
</div>
<div style="width:96px;height:44px;margin: 10px 0 0 600px;background-image:url('images/New_ui/TrendMirco_logo.svg');background-size: 100%;"></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</td>
<td width="10" align="center" valign="top">&nbsp;</td>
</tr>
</table>
<div id="footer"></div>
</form>
</body>
</html>

