﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html xmlns:v>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
<meta HTTP-EQUIV="Expires" CONTENT="-1">
<link rel="shortcut icon" href="images/favicon.png">
<link rel="icon" href="images/favicon.png">
<title><#944#> - <#479#></title>
<link rel="stylesheet" type="text/css" href="index_style.css">
<link rel="stylesheet" type="text/css" href="form_style.css">
<link rel="stylesheet" type="text/css" href="usp_style.css">
<link rel="stylesheet" type="text/css" href="pwdmeter.css">
<link rel="stylesheet" type="text/css" href="other.css">
<link rel="stylesheet" type="text/css" href="css/confirm_block.css">
<script type="text/javascript" src="/js/confirm_block.js"></script>
<script type="text/javascript" src="/state.js"></script>
<script type="text/javascript" src="/help.js"></script>
<script type="text/javascript" src="/general.js"></script>
<script type="text/javascript" src="/popup.js"></script>
<script type="text/javascript" src="/md5.js"></script>
<script type="text/javascript" src="/validator.js"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/switcherplugin/jquery.iphone-switch.js"></script>
<script type="text/javascript" src="/js/httpApi.js"></script>
<style>
.warning_msg{
color: #FC0;
margin: 2px 0 0 8px;
}
.wpa_psk_container{
display: flex;
align-items: center;
}
.pwdmeter_container{
margin-left: 5px;
outline: 0px;
}
.short_pwdmeter{
width: 110px;
}
</style>
<script><% wl_get_parameter(); %>
$(function () {
if(amesh_support && (isSwMode("rt") || isSwMode("ap")) && ameshRouter_support) {
addNewScript('/require/modules/amesh.js');
}
});
wl_channel_list_2g = '<% channel_list_2g(); %>';
wl_channel_list_5g = '<% channel_list_5g(); %>';
wl_channel_list_5g_2 = '<% channel_list_5g_2(); %>';
wl_channel_list_60g = '<% channel_list_60g(); %>';
var acs_ch13_support = (function(){
var ch_2g = JSON.parse(wl_channel_list_2g);
for(var element of ch_2g){
if(element > 11){
return true;
}
}
return false;
})();
var wl_unit_value = '<% nvram_get("wl_unit"); %>';
var wl_subunit_value = '<% nvram_get("wl_subunit"); %>';
var wlc_band_value = '<% nvram_get("wlc_band"); %>';
var cur_control_channel = [<% wl_control_channel(); %>][0];
var cur_edmg_channel = [<% wl_edmg_channel(); %>][0];
var wlc0_ssid = '<% nvram_get("wlc0_ssid"); %>';
var wlc1_ssid = '<% nvram_get("wlc1_ssid"); %>';
var wifison_ready = httpApi.nvramGet(["wifison_ready"]).wifison_ready;
var wl_bw_160 = '<% nvram_get("wl1_bw_160"); %>';
var enable_bw_160 = (wl_bw_160 == 1) ? true : false;
var wl_wpa_psk_org = decodeURIComponent("<% nvram_char_to_ascii("WLANConfig11b", "wl_wpa_psk"); %>");
var faq_fref = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=150";
var faq_href_hide_ssid = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=162";
var nvram = httpApi.nvramGet([
'wl0_nmode_x',
'wl1_nmode_x',
'wl0_channel',
'wl1_channel',
'wl0_bw',
'wl1_bw',
'wl0_nctrlsb',
'wl1_nctrlsb',
'wl0_auth_mode_x',
'wl1_auth_mode_x'], true)
function initial(){
show_menu();
if (he_frame_support) {
$("#band0_he_mode_faq > a") //for string tag: WLANConfig11b_HE_Frame_Mode_faq
.attr('target', '_blank')
.attr('style', 'color:#FC0;text-decoration:underline;')
.attr('href', faq_fref);
$("#band1_he_mode_faq > a") //for string tag: WLANConfig11b_HE_Frame_Mode_faq
.attr('target', '_blank')
.attr('style', 'color:#FC0;text-decoration:underline;')
.attr('href', faq_fref);
if(nvram['wl0_nmode_x'] == '0'){
document.getElementById('band0_he_mode_field').style.display = '';
}
else{
document.getElementById('band0_he_mode_field').style.display = 'none';
}
if(nvram['wl1_nmode_x'] == '0'){
document.getElementById('band1_he_mode_field').style.display = '';
}
else{
document.getElementById('band1_he_mode_field').style.display = 'none';
}
}
if(vht160_support){
$("#band1_enable_160mhz").attr("checked", enable_bw_160);
document.getElementById('band1_enable_160_field').style.display = '';
}
if(mbo_support){
document.getElementById('band0_mbo_field').style.display = '';
document.getElementById('band1_mbo_field').style.display = '';
}
wireless_mode_change(document.form.wl_nmode_x);
regen_band(document.form.wl_unit);
regen_5G_mode(document.form.wl_nmode_x, wl_unit);
if(lantiq_support){
checkWLReady();
}
if((isSwMode("re") || isSwMode("mb")) && (wl_unit_value == wlc_band_value) && wl_subunit_value != '1' && !concurrep_support){
_change_wl_unit(wl_unit_value);
}
if(isSwMode("re") && concurrep_support && wl_subunit_value != '1'){
_change_wl_unit(wl_unit_value);
}
if(isSwMode("ew")){
if(wlc_express == "1"){
document.form.wl_unit.innerHTML = '<option class="content_input_fd" value="1" selected="">5 GHz</option>';
if(wl_unit_value != 1) _change_wl_unit();
}
else if(wlc_express == "2"){
document.form.wl_unit.innerHTML = '<option class="content_input_fd" value="0" selected="">2.4 GHz</option>';
if(wl_unit_value != 0) _change_wl_unit();
}
}
if(band5g_support && band5g_11ac_support && document.form.wl_unit.value >= 1){
}else if(band5g_support && document.form.wl_unit.value >= 1){
}
if(!(band5g_support && band5g_11ac_support && document.form.wl_unit.value >= 1)){
document.form.wl_nmode_x.remove(3); //remove "N/AC Mixed" for NON-AC router and NOT in 5G
}
if(vht160_support && wl_unit_value != '0' && wl_unit_value != '3'){
document.getElementById('enable_160_field').style.display = "";
}
if('<% nvram_get("wl_nmode_x"); %>' == "2")
inputCtrl(document.form.wl_bw, 0);
if(wl_unit_value == '0')
check_channel_2g();
else if(wl_unit_value == '3')
insertChannelOption_60g();
else
insertExtChannelOption_5g();
if(isSwMode("re")){
if((wlc0_ssid != "" && wl_unit_value == "0") || (wlc1_ssid != "" && wl_unit_value == "1")){
document.getElementById('wl_bw_field').style.display = "none";
document.getElementById('wl_channel_field').style.display = "none";
document.getElementById('wl_nctrlsb_field').style.display = "none";
}
}
limit_auth_method();
wl_auth_mode_change(1);
if(wpa3_support){
var confirm_flag = 0;
var confirm_content = "";
if(!band6g_support || wl_unit != '2'){ // not for 6 GHz
confirm_flag=1;
confirm_content += "<b>WPA3-Personal</b><br>";
confirm_content += "<#4008#><br><br>";
confirm_content += "<b>WPA2/WPA3-Personal</b><br>";
confirm_content += "<#4009#><br><br>";
confirm_content += "<b>WPA2-Personal</b><br>";
confirm_content += "<#4010#><br><br>";
confirm_content += "<b>WPA-Auto-Personal</b><br>";
confirm_content += "<#4011#>";
$(".setup_help_icon").show();
$(".setup_help_icon").click(
function() {
if(confirm_flag==1){
if($(".confirm_block").length > 0){
$(".confirm_block").remove();
}
if(window.scrollTo)
window.scrollTo(0,0);
htmlbodyforIE = document.getElementsByTagName("html");
htmlbodyforIE[0].style.overflow = "hidden";
$("#Loading").css('visibility', 'visible');
$("#loadingBlock").css('visibility', 'hidden');
confirm_asus({
title: "<#4004#>",
contentA: confirm_content,
contentC: "",
left_button: "Hidden",
left_button_callback: function(){
},
left_button_args: {},
right_button: "<#1779#>",
right_button_callback: function(){
confirm_cancel();
htmlbodyforIE = document.getElementsByTagName("html");
htmlbodyforIE[0].style.overflow = "";
$("#Loading").css('visibility', 'hidden');
return false;
},
right_button_args: {},
iframe: "",
margin: "100px 0px 0px 25px",
note_display_flag: 0
});
$(".confirm_block").css( "zIndex", 10001 );
}
}
);
}
}
if(optimizeXbox_support){
document.getElementById("band0_optimizexbox_span").style.display = "";
document.form.wl_optimizexbox_ckb.checked = ('<% nvram_get("wl_optimizexbox"); %>' == 1) ? true : false;
}
document.form.wl_ssid.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_ssid"); %>');
document.form.wl_wpa_psk.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_wpa_psk"); %>');
document.form.wl_key1.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_key1"); %>');
document.form.wl_key2.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_key2"); %>');
document.form.wl_key3.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_key3"); %>');
document.form.wl_key4.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_key4"); %>');
document.form.wl_phrase_x.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl_phrase_x"); %>');
document.form.wl_channel.value = document.form.wl_channel_orig.value;
document.form.band0_ssid.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl0_ssid"); %>');
document.form.band0_wpa_psk.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl0_wpa_psk"); %>');
document.form.band01_ssid.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl0_ssid"); %>');
document.form.band01_wpa_psk.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl0_wpa_psk"); %>');
document.form.band1_ssid.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl1_ssid"); %>');
document.form.band1_wpa_psk.value = decodeURIComponent('<% nvram_char_to_ascii("", "wl1_wpa_psk"); %>');
if (band60g_support && document.form.wl_unit.value == '3')
document.form.wl_edmg_channel.value = document.form.wl_edmg_channel_orig.value;
if(document.form.wl_wpa_psk.value.length <= 0)
document.form.wl_wpa_psk.value = "<#3992#>";
if(document.form.wl_unit[0].selected == true)
document.getElementById("wl_gmode_checkbox").style.display = "";
if(document.form.wl_nmode_x.value=='1'){
document.form.wl_gmode_check.checked = false;
document.getElementById("wl_gmode_check").disabled = true;
}
else{
document.form.wl_gmode_check.checked = true;
document.getElementById("wl_gmode_check").disabled = false;
}
if(is_unit_24g(wl_unit_value)){
if(document.form.wl_gmode_protection.value == "auto"){
document.form.wl_gmode_check.checked = true;
}
else{
document.form.wl_gmode_check.checked = false;
}
document.getElementById("wl_gmode_checkbox").style.display = "";
if(disable11b_support){
if(document.form.band0_rateset_check.value == "ofdm"){
document.form.band0_rateset_check.checked = true;
}
else{
document.form.band0_rateset_check.checked = false;
}
wl_mode_change(document.form.band0_nmode_x.value);
}
}
if(disable11b_support){
if(document.form.band01_rateset_check.value == "ofdm"){
document.form.band01_rateset_check.checked = true;
}
else{
document.form.band01_rateset_check.checked = false;
}
band01_mode_change(document.form.band01_nmode_x.value);
}
handle_11ac_80MHz();
genBWTable('0');
genBWTable('1');
if(isSwMode("re") || isSwMode("mb"))
document.form.wl_subunit.value = (wl_unit_value == wlc_band_value) ? 1 : -1;
document.getElementById('WPS_hideSSID_hint').innerHTML = "<#4199#>";
if("<% nvram_get("wl_closed"); %>" == 1 && (isSwMode("rt") || isSwMode("ap"))){
document.getElementById('WPS_hideSSID_hint').style.display = "";
}
if(band60g_support && wl_unit_value == '3'){//60G, remove unsupported items and show wigig items
document.getElementById("wl_closed_field").style.display = "none";
inputCtrl(document.form.wl_nmode_x, 0);
inputCtrl(document.form.wl_nctrlsb, 0);
if(he_frame_support){
$("#he_mode_field").hide();
}
document.getElementById("wl_edmg_field").style.display = "";
if (document.form.wl_edmg_channel.value == '0' && cur_edmg_channel && cur_edmg_channel[wl_unit_value] != '0'){
ajax_wl_edmg_channel();
document.getElementById("auto_edmg_channel").style.display = "";
document.getElementById("auto_edmg_channel").innerHTML = "Current EDMG channel: " + cur_edmg_channel[wl_unit_value];
}
}else{
document.getElementById("wl_edmg_field").style.display = "none";
}
if(document.form.wl_channel.value == '0' && cur_control_channel){
ajax_wl_channel();
document.getElementById("auto_channel").style.display = "";
document.getElementById("auto_channel").innerHTML = "Current control channel: " + cur_control_channel[wl_unit_value];
}
if(concurrep_support && (isSwMode("re") || isSwMode("ew"))){
inputCtrl(document.form.wl_nmode_x, 0);
document.form.wl_subunit.disabled = false;
document.form.wl_subunit.value = 1;
}
var skip_channel_2g = '<% nvram_get("skip_channel_2g"); %>';
var skip_channel_5g = '<% nvram_get("skip_channel_5g"); %>';
if(acs_ch13_support){
document.getElementById("band0_acs_ch13_checkbox").style.display = "";
}
if(skip_channel_5g == "band1" && wl_unit_value == "1"){
document.getElementById("acs_band1_checkbox").style = "";
}
else if(skip_channel_5g == "band3" && wl_unit_value == "1"){
document.getElementById("acs_band3_checkbox").style = "";
}
else if((wl_channel_list_5g.indexOf('56') != -1 || wl_channel_list_5g.indexOf('100') != -1)){
document.getElementById("band1_dfs_checkbox").style = "";
}
if((Qcawifi_support || Rawifi_support ) && document.form.wl_channel.value == '0'){
if((wl_unit == '1' && has_dfs_channel(wl_channel_list_5g)) || (wl_unit == '2' && has_dfs_channel(wl_channel_list_5g_2))){
document.getElementById('dfs_checkbox').style.display = "";
check_DFS_support(document.form.acs_dfs_checkbox);
}
if(amesh_support && httpApi.hasAiMeshNode() && !wl_info.band5g_2_support){
var _wl_channel_list_5g = '<% channel_list_5g(); %>';
if((wl_unit == '1' && has_dfs_channel(_wl_channel_list_5g))){
document.getElementById('dfs_checkbox').style.display = "";
check_DFS_support(document.form.acs_dfs_checkbox);
}
}
}
if(smart_connect_support && (isSwMode("rt") || isSwMode("ap"))){
var flag = '<% get_parameter("flag"); %>';
var smart_connect_flag_t;
document.getElementById("smartcon_enable_field").style.display = "";
if(flag == '')
smart_connect_flag_t = '<% nvram_get("smart_connect_x"); %>';
else
smart_connect_flag_t = flag;
document.form.smart_connect_x.value = smart_connect_flag_t;
if(smart_connect_flag_t == 0)
document.form.smart_connect_t.value = 1;
else
document.form.smart_connect_t.value = smart_connect_flag_t;
enableSmartCon(smart_connect_flag_t);
}
if(wifison_ready == "1")
document.getElementById("wl_unit_field").style.display = "none";
if(is_RU_sku){
var ch_orig = parseInt(document.form.wl_channel_orig.value);
var _ch = ch_orig;
var _array = [36, 44, 52, 60, 100, 108, 116, 124, 132, 140, 149, 157];
if(document.form.wl_nmode_x.value == 0 || document.form.wl_nmode_x.value == 8){ // Auto or N/AC mixed
if(document.form.wl_bw.value == 3){ // 80 MHz
for(i=0; i<_array.length; i+=2){
if(ch_orig >= _array[i] && ch_orig <= (_array[i]+12)){
_ch = _array[i];
}
}
}
else if(document.form.wl_bw.value == 2){ // 40 MHz
for(i=0; i<_array.length; i++){
if(ch_orig >= _array[i] && ch_orig <= (_array[i]+4)){
_ch = _array[i];
}
}
}
document.form.wl_channel.value = _ch;
}
}
controlHideSSIDHint();
$("<div>")
.attr({"id": "ssid_msg"})
.addClass("warning_msg")
.appendTo($("#ssid_setting"));
$("#wl_ssid").keyup(function(){
validator.ssidCheck($("#"+this.id), $("#ssid_msg"));
});
$("input[name='wl_wpa_psk']").parent().parent().append(Get_Component_PWD_Strength_Meter());
$("#scorebarBorder").addClass("pwdmeter_container short_pwdmeter");
$("#scorebarBorder *").addClass("short_pwdmeter");
chkPass(wl_wpa_psk_org, "");
$("input[name='wl_wpa_psk']").keyup(function(e){
chkPass(this.value, "");
})
if(band5g_11ax_support){
}
genAuthMethod('01', nvram['wl0_nmode_x']);
genAuthMethod('0', nvram['wl0_nmode_x']);
genAuthMethod('1', nvram['wl1_nmode_x']);
handle_bandwidth('0', nvram['wl0_bw']);
handle_bandwidth('1', nvram['wl1_bw']);
if(acs_ch13_support){
handleAcsCh13(document.form.band0_channel.value);
}
handleAcsDfs(document.form.band1_channel.value);
if('<% nvram_get("wl0_gmode_protection"); %>' == 'auto'){
document.getElementById('band0_gmode_check').checked = true;
}
else if('<% nvram_get("wl0_gmode_protection"); %>' == 'off'){
document.getElementById('band0_gmode_check').checked = false;
}
if(document.form.band0_nmode_x.value == '0' || document.form.band0_nmode_x.value == '2'){
document.getElementById('band0_gmode_check').disabled = false;
}
else if(document.form.band0_nmode_x.value == '1'){
document.getElementById('band0_gmode_check').disabled = true;
}
if(is_KR_sku){
if(document.form.smart_connect_x.value == '1'){
$("#band01_auth_mode_x option[value='open']").remove();
}
else{
$("#band0_auth_mode_x option[value='open']").remove();
$("#band1_auth_mode_x option[value='open']").remove();
}
}
}
function genBWTable(_unit, wl_nmode){
if (!Rawifi_support && !Qcawifi_support && based_modelid != "BLUECAVE")
return;
if(_unit == '0' || _unit == '01'){
cur = '<% nvram_get("wl0_bw"); %>';
}
else if(_unit == '1'){
cur = '<% nvram_get("wl1_bw"); %>';
}
var bws = new Array();
var bwsDesc = new Array();
var array_80m = new Array();
var array_160m = new Array();
if(wl_nmode == 2){
if(based_modelid == "BLUECAVE"){
bws = [1];
bwsDesc = ["20 MHz"];
}
else{
bws = [0];
bwsDesc = ["20 MHz"];
}
inputCtrl(document.form.wl_bw,1);
document.getElementById("wl_bw_field").style.display = "none";
}
else if(_unit == 0 || (_unit != 0 && wl_nmode == 1)){// 2G or 5G N only
if(based_modelid == "BLUECAVE"){
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
}
else{
bws = [1, 0, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
}
}
else if (band60g_support && _unit == 3){
var ary = [], auto = [1], autoDesc = ["2.16"];
var bws = [6], bwsDesc = ["2.16 GHz"];
var ch_list = eval('<% channel_list_60g(); %>');
/* Generate all possible bandwidth */
for (var i = 7; i <= max_band60g_wl_bw; ++i) {
if ((wigig_bw = wl_bw_to_wigig_bw(i)) <= 2160)
continue;
ary = filter_60g_edmg_channel_by_bw(ch_list, wigig_bw);
if (!ary.length)
continue;
bws.push(i);
bwsDesc.push((wigig_bw / 1000) + " GHz");
autoDesc[0] = autoDesc[0] + "/" + (wigig_bw / 1000);
}
autoDesc[0] += " GHz";
if (bws.length > 1) {
bws = auto.concat(bws);
bwsDesc = autoDesc.concat(bwsDesc);
}
if (bws.indexOf(parseInt(cur)) == -1)
cur = bws[0];
}
else{
if(based_modelid == "BLUECAVE"){
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
else{
bws = [1, 0, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
if(wl_nmode == 8 || (_unit != 0 && wl_nmode == 0)){// N/AC mixed or 5G Auto
var nband = "<% nvram_get("wl_nband"); %>";
if(isArray(wl_channel_list_5g)){
if(nband == "4"){
array_80m = filter_6g_channel_by_bw(wl_channel_list_5g, 80);
array_160m = filter_6g_channel_by_bw(wl_channel_list_5g, 160);
}else{
array_80m = filter_5g_channel_by_bw(wl_channel_list_5g, 80);
array_160m = filter_5g_channel_by_bw(wl_channel_list_5g, 160);
}
}else{
start = wl_channel_list_5g.lastIndexOf("[");
end = wl_channel_list_5g.indexOf("]");
if (end == -1)
end = wl_channel_list_5g.length;
ch = wl_channel_list_5g.slice(start + 1, end);
if(nband == "4"){
array_80m = filter_6g_channel_by_bw(ch.split(","), 80);
array_160m = filter_6g_channel_by_bw(ch.split(","), 160);
}else{
array_80m = filter_5g_channel_by_bw(ch.split(","), 80);
array_160m = filter_5g_channel_by_bw(ch.split(","), 160);
}
}
if(vht80_80_support && array_80m.length/4 >= 2){
bws.push(4);
bwsDesc.push("80+80 MHz");
}
if(vht160_support && array_160m.length/4 >= 1 && enable_bw_160){
bwsDesc[0] = "20/40/80/160 MHz";
bws.push(5);
bwsDesc.push("160 MHz");
}
else if(array_160m.length/4 < 1){
document.getElementById('enable_160_field').style.display = 'none';
}
else{
bwsDesc[0] = "20/40/80 MHz";
}
}
}
if(_unit == '0'){
add_options_x2(document.form.band0_bw, bwsDesc, bws, cur);
}
else if(_unit == '1'){
add_options_x2(document.form.band1_bw, bwsDesc, bws, cur);
}
if (band60g_support && _unit == 3)
insertChannelOption_60g();
}
function check_channel_2g(){
var wmode = document.form.wl_nmode_x.value;
var CurrentCh = document.form.wl_channel_orig.value;
if(is_high_power && auto_channel == 1){
CurrentCh = document.form.wl_channel_orig.value = 0;
}
wl_channel_list_2g = eval('<% channel_list_2g(); %>');
if(wl_channel_list_2g[0] != "<#241#>")
wl_channel_list_2g.splice(0,0,"0");
var ch_v2 = new Array();
for(var i=0; i<wl_channel_list_2g.length; i++){
ch_v2[i] = wl_channel_list_2g[i];
}
if(ch_v2[0] == "0")
wl_channel_list_2g[0] = "<#241#>";
add_options_x2(document.form.wl_channel, wl_channel_list_2g, ch_v2, CurrentCh);
var option_length = document.form.wl_channel.options.length;
if(wmode == "0"||wmode == "1"){
if((lantiq_support && document.form.wl_bw.value != "1") || (!lantiq_support && document.form.wl_bw.value != "0")){
var x = document.form.wl_nctrlsb;
var length = document.form.wl_nctrlsb.options.length;
if (length > 1){
x.selectedIndex = 1;
x.remove(x.selectedIndex);
}
if ((CurrentCh >=1) && (CurrentCh <= 4)){
x.options[0].text = "<#4044#>";
x.options[0].value = "lower";
}
else if ((CurrentCh >= 5) && (CurrentCh <= 7)){
x.options[0].text = "<#4044#>";
x.options[0].value = "lower";
add_option(document.form.wl_nctrlsb, "<#4045#>", "upper");
if (document.form.wl_nctrlsb_old.value == "upper")
document.form.wl_nctrlsb.options.selectedIndex=1;
if(is_high_power && CurrentCh == 5) // for high power model, Jieming added at 2013/08/19
document.form.wl_nctrlsb.remove(1);
else if(is_high_power && CurrentCh == 7)
document.form.wl_nctrlsb.remove(0);
}
else if ((CurrentCh >= 8) && (CurrentCh <= 10)){
x.options[0].text = "<#4045#>";
x.options[0].value = "upper";
if (option_length >=14){
add_option(document.form.wl_nctrlsb, "<#4044#>", "lower");
if (document.form.wl_nctrlsb_old.value == "lower")
document.form.wl_nctrlsb.options.selectedIndex=1;
}
}
else if (CurrentCh >= 11){
x.options[0].text = "<#4045#>";
x.options[0].value = "upper";
}
else{
x.options[0].text = "<#241#>";
x.options[0].value = "1";
}
}
else{
inputCtrl(document.form.wl_nctrlsb, 0);
}
}
else{
inputCtrl(document.form.wl_nctrlsb, 0);
}
}
function mbss_display_ctrl(){
if(multissid_support){
for(var i=1; i<multissid_count+1; i++)
add_options_value(document.form.wl_subunit, i, wl_subunit_value);
}
else
document.getElementById("wl_subunit_field").style.display = "none";
if(document.form.wl_subunit.value != 0){
document.getElementById("wl_bw_field").style.display = "none";
document.getElementById("wl_channel_field").style.display = "none";
document.getElementById("wl_nctrlsb_field").style.display = "none";
}
else
document.getElementById("wl_bss_enabled_field").style.display = "none";
}
function add_options_value(o, arr, orig){
if(orig == arr)
add_option(o, "mbss_"+arr, arr, 1);
else
add_option(o, "mbss_"+arr, arr, 0);
}
function applyRule(){
var confirm_flag = 0;
var confirm_content = "";
if(lantiq_support && wave_ready != 1){
alert("Please wait a minute for wireless ready");
return false;
}
var auth_mode = document.form.wl_auth_mode_x.value;
if(document.form.wl_wpa_psk.value == "<#3992#>")
document.form.wl_wpa_psk.value = "";
if(validForm()){
if(amesh_support && (isSwMode("rt") || isSwMode("ap")) && ameshRouter_support) {
if(document.form.smart_connect_x.value == '1'){
if(!check_wl_auth_support($("select[name=band01_auth_mode_x] option:selected"), wl_unit))
return false;
else {
var wl_parameter = {
"original" : {
"ssid" : decodeURIComponent('<% nvram_char_to_ascii("", "wl_ssid"); %>'),
"psk" : decodeURIComponent('<% nvram_char_to_ascii("", "wl_wpa_psk"); %>')
},
"current": {
"ssid" : document.form.wl_ssid.value,
"psk" : document.form.wl_wpa_psk.value
}
};
if(!AiMesh_confirm_msg("Wireless_SSID_PSK", wl_parameter))
return false;
}
}
else{
if(!check_wl_auth_support($("select[name=band0_auth_mode_x] option:selected"), 0) || !check_wl_auth_support($("select[name=band1_auth_mode_x] option:selected"), 1))
return false;
else {
var wl_parameter = {
"original" : {
"ssid" : decodeURIComponent('<% nvram_char_to_ascii("", "wl_ssid"); %>'),
"psk" : decodeURIComponent('<% nvram_char_to_ascii("", "wl_wpa_psk"); %>')
},
"current": {
"ssid" : document.form.wl_ssid.value,
"psk" : document.form.wl_wpa_psk.value
}
};
if(!AiMesh_confirm_msg("Wireless_SSID_PSK", wl_parameter))
return false;
}
}
var radio_value = (document.form.band0_closed[0].checked || document.form.band1_closed[0].checked) ? 1 : 0;
if(document.form.wps_enable.value == 1) {
if(radio_value) {
confirm_flag=7;
confirm_content="<#1110#>";
}
}
else {
if(radio_value) {
confirm_flag=6;
confirm_content="<#1109#>";
}
}
}
else {
if((document.form.band0_closed[0].checked || document.form.band1_closed[0].checked) && document.form.wps_enable.value == 1 && (isSwMode("rt") || isSwMode("ap"))){
confirm_flag=1;
confirm_content="<#3990#>";
}
}
if(document.form.wps_enable.value == 1){ //disable WPS if choose WEP or WPA/TKIP Encryption
if(wps_multiband_support && (document.form.wps_multiband.value == 1 || document.form.wps_band.value == wl_unit_value)){ //Ralink, Qualcomm Atheros
if(document.form.wl_auth_mode_x.value == "open" && document.form.wl_wep_x.value == "0"){
if(!confirm("<#3991#>"))
return false;
}
if( document.form.wl_auth_mode_x.value == "shared"
|| document.form.wl_auth_mode_x.value == "psk" || document.form.wl_auth_mode_x.value == "wpa"
|| document.form.wl_auth_mode_x.value == "open" && (document.form.wl_wep_x.value == "1" || document.form.wl_wep_x.value == "2")){ //open wep case
if(confirm("<#3989#>")){
document.form.wps_enable.value = "0";
}
else{
return false;
}
}
}
else{ //Broadcom
if(document.form.wl_auth_mode_x.value == "open" && document.form.wl_wep_x.value == "0"){
if(!confirm("<#3991#>"))
return false;
}
if( document.form.wl_auth_mode_x.value == "shared"
|| document.form.wl_auth_mode_x.value == "psk" || document.form.wl_auth_mode_x.value == "wpa"
|| document.form.wl_auth_mode_x.value == "open" && (document.form.wl_wep_x.value == "1" || document.form.wl_wep_x.value == "2")){ //open wep case
if(confirm("<#3989#>")){
document.form.wps_enable.value = "0";
}
else{
return false;
}
}
}
}
if(vht160_support){
document.form.wl_bw_160.value = $("#enable_160mhz").prop("checked") ? 1 : 0;
}
document.form.wps_config_state.value = "1";
if((auth_mode == "shared" || auth_mode == "wpa" || auth_mode == "wpa2" || auth_mode == "wpawpa2" || auth_mode == "radius" ||
((auth_mode == "open") && !(document.form.wl_wep_x.value == "0")))
&& document.form.wps_mode.value == "enabled")
document.form.wps_mode.value = "disabled";
if(auth_mode == "wpa" || auth_mode == "wpa2" || auth_mode == "wpawpa2" || auth_mode == "radius"){
if(based_modelid != "BRT-AC828"){
document.form.next_page.value = "/Advanced_WSecurity_Content.asp";
}
}
var mbo = document.form.wl_mbo_enable.value;
if(auth_mode == 'sae'){
document.form.wl_mfp.value = '2';
}
else if(auth_mode == 'psk2sae' && document.form.wl_mfp.value == '0'){
document.form.wl_mfp.value = '1';
}
else if(auth_mode == 'psk2' || auth_mode == 'pskpsk2' || auth_mode == 'wpa2' || auth_mode == 'wpawpa2'){
if(mbo_support && mbo == '1' && document.form.wl_mfp.value == '0'){
document.form.wl_mfp.value = '1';
}
}
if(Bcmwifi_support) {
if(document.form.wl_nmode_x.value != "2" && wl_unit_value == "0")
document.form.wl_gmode_protection.value = "auto";
}
else {
if(document.form.wl_nmode_x.value == "1" && wl_unit_value == "0")
document.form.wl_gmode_protection.value = "off";
}
/* Viz 2012.08.15 seems ineeded
inputCtrl(document.form.wl_crypto, 1);
inputCtrl(document.form.wl_wpa_psk, 1);
inputCtrl(document.form.wl_wep_x, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key2, 1);
inputCtrl(document.form.wl_key3, 1);
inputCtrl(document.form.wl_key4, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey, 1);*/
if(isSwMode("re") || isSwMode("mb"))
document.form.action_wait.value = "5";
if (Qcawifi_support) {
document.form.action_wait.value = "30";
}
else if (Rawifi_support) {
document.form.action_wait.value = "20";
}
if(smart_connect_support && (isSwMode("rt") || isSwMode("ap")) && document.form.smart_connect_x.value == "1"){
if(isSupport("amas_fronthaul_network")){
if(isSupport("triband")){
if(smart_connect_flag_t != document.form.smart_connect_x.value){//SC change to 1
if(dwb_info.mode && wl_unit != dwb_info.band){//current wl_unit maybe is 0 or 1
var nvramSet_obj = {"action_mode":"apply"};
nvramSet_obj["wl"+dwb_info.band+"_closed"] = "1";
httpApi.nvramSet(nvramSet_obj);
}
}
}
}
}
if (document.form.band01_twt.value == "1" && document.form.band01_11ax.value == "0")
document.form.band01_twt.value = "0";
if (document.form.band0_twt.value == "1" && document.form.band0_11ax.value == "0")
document.form.band01_twt.value = "0";
if (document.form.band1_twt.value == "1" && document.form.band1_11ax.value == "0")
document.form.band01_twt.value = "0";
if (document.form.wl_twt.value == "1" && document.form.wl_11ax.value == "0")
document.form.wl_twt.value = "0";
var reboot_time = eval("<% get_default_reboot_time(); %>");
var lan_ipaddr = "<% nvram_get("lan_ipaddr"); %>";
if(confirm_flag==1 || confirm_flag==7){
if($(".confirm_block").length > 0){
$(".confirm_block").remove();
}
if(window.scrollTo)
window.scrollTo(0,0);
htmlbodyforIE = document.getElementsByTagName("html");
htmlbodyforIE[0].style.overflow = "hidden";
$("#Loading").css('visibility', 'visible');
$("#loadingBlock").css('visibility', 'hidden');
confirm_asus({
title: "<#4094#>",
contentA: confirm_content+"<br><br><#1116#> <#1099#>",
contentC: "",
left_button: "<#1779#>",
left_button_callback: function(){
if(confirm_flag==1 || confirm_flag==7){
document.form.wps_enable.value = "0";
}
confirm_cancel();
htmlbodyforIE = document.getElementsByTagName("html");
htmlbodyforIE[0].style.overflow = "";
$("#loadingBlock").css('visibility', 'visible');
showLoading();
document.form.submit();
},
left_button_args: {},
right_button: "<#287#>",
right_button_callback: function(){
confirm_cancel();
htmlbodyforIE = document.getElementsByTagName("html");
htmlbodyforIE[0].style.overflow = "";
$("#Loading").css('visibility', 'hidden');
return false;
},
right_button_args: {},
iframe: "",
margin: "100px 0px 0px 25px",
note_display_flag: 0
});
$(".confirm_block").css( "zIndex", 10001 );
$("#ssid_hide_faq").attr('target', '_blank')
.attr('style', 'color:#FFCC00;text-decoration:underline;')
.attr("href", faq_href_hide_ssid);
}
else{
showLoading();
var postObj = {
"action_mode":"apply",
'rc_service': 'restart_wireless',
'smart_connect_x': document.form.smart_connect_x.value,
"action_wait": document.form.action_wait.value,
};
var variable = {}
if(document.form.smart_connect_x.value == '0'){
variable['wl0_ssid'] = document.form.band0_ssid.value;
variable['wl0_closed'] = document.form.band0_closed.value;
variable['wl0_nmode_x'] = document.form.band0_nmode_x.value;
if(document.form.band0_nmode_x.value == '0'){
variable['wl0_rateset'] = document.form.band0_rateset_check.checked ? 'ofdm' : 'default';
variable['wl0_11ax'] = document.form.band0_11ax.value;
}
variable['wl0_gmode_protection'] = document.form.band0_gmode_check.checked ? 'auto' : 'off';
variable['wl0_mbo_enable'] = document.form.band0_mbo_enable.value;
variable['wl0_twt'] = document.form.band0_twt.value;
variable['wl0_bw'] = document.form.band0_bw.value;
variable['wl0_channel'] = document.form.band0_channel.value;
variable['wl0_nctrlsb'] = document.form.band0_nctrlsb.value;
variable['wl0_auth_mode_x'] = document.form.band0_auth_mode_x.value;
if(document.form.band0_auth_mode_x.value == 'psk' || document.form.band0_auth_mode_x.value == 'psk2'
|| document.form.band0_auth_mode_x.value == 'sae' || document.form.band0_auth_mode_x.value == 'pskpsk2'
|| document.form.band0_auth_mode_x.value == 'psk2sae'){
variable['wl0_crypto'] = document.form.band0_crypto.value;
variable['wl0_wpa_psk'] = document.form.band0_wpa_psk.value;
variable['wl0_mfp'] = document.form.wl0_mfp.value;
variable['wl0_wpa_gtk_rekey'] = document.form.band0_wpa_gtk_rekey.value;
}
else if(document.form.band0_auth_mode_x.value == 'wpa' || document.form.band0_auth_mode_x.value == 'wpa2'
|| document.form.band0_auth_mode_x.value == 'wpawpa2'){
variable['wl0_crypto'] = document.form.band0_crypto.value;
variable['wl0_wpa_psk'] = document.form.band0_wpa_psk.value;
variable['wl0_mfp'] = document.form.wl0_mfp.value;
variable['wl0_wpa_gtk_rekey'] = document.form.band0_wpa_gtk_rekey.value;
variable['wl0_radius_ipaddr'] = document.form.band0_radius_ipaddr.value;
variable['wl0_radius_port'] = document.form.band0_radius_port.value;
variable['wl0_radius_key'] = document.form.band0_radius_key.value;
}
else if(document.form.band0_auth_mode_x.value == 'open' && document.form.band0_wep_x.value == '0'){
variable['wl0_wep_x'] = document.form.band0_wep_x.value;
}
else if((document.form.band0_auth_mode_x.value == 'open' && document.form.band0_wep_x.value != '0')
|| document.form.band0_auth_mode_x.value == 'shared'){
variable['wl0_wep_x'] = document.form.band0_wep_x.value;
variable['wl0_key'] = document.form.band0_key.value;
variable['wl0_key1'] = document.form.band0_key1.value;
variable['wl0_key2'] = document.form.band0_key2.value;
variable['wl0_key3'] = document.form.band0_key3.value;
variable['wl0_key4'] = document.form.band0_key4.value;
variable['wl0_phrase_x'] = document.form.band0_phrase_x.value;
}
else if(document.form.band0_auth_mode_x.value == 'radius'){
variable['wl0_radius_ipaddr'] = document.form.band0_radius_ipaddr.value;
variable['wl0_radius_port'] = document.form.band0_radius_port.value;
variable['wl0_radius_key'] = document.form.band0_radius_key.value;
}
variable['wl1_ssid'] = document.form.band1_ssid.value;
variable['wl1_closed'] = document.form.band1_closed.value;
variable['wl1_nmode_x'] = document.form.band1_nmode_x.value;
if(document.form.band1_nmode_x.value == '0'){
variable['wl1_11ax'] = document.form.band1_11ax.value;
}
variable['wl1_mbo_enable'] = document.form.band1_mbo_enable.value;
variable['wl1_twt'] = document.form.band1_twt.value;
variable['wl1_bw'] = document.form.band1_bw.value;
variable['wl1_bw_160'] = document.getElementById('band1_enable_160mhz').checked ? '1' : '0';
variable['wl1_channel'] = document.form.band1_channel.value;
if(document.form.band1_channel.value == '0'){
variable['acs_dfs'] = document.form.band1_acs_dfs_checkbox.checked ? '1' : '0';
}
variable['wl1_auth_mode_x'] = document.form.band1_auth_mode_x.value;
if(document.form.band1_auth_mode_x.value == 'psk' || document.form.band1_auth_mode_x.value == 'psk2'
|| document.form.band1_auth_mode_x.value == 'sae' || document.form.band1_auth_mode_x.value == 'pskpsk2'
|| document.form.band1_auth_mode_x.value == 'psk2sae'){
variable['wl1_crypto'] = document.form.band1_crypto.value;
variable['wl1_wpa_psk'] = document.form.band1_wpa_psk.value;
variable['wl1_mfp'] = document.form.wl1_mfp.value;
variable['wl1_wpa_gtk_rekey'] = document.form.band1_wpa_gtk_rekey.value;
}
else if(document.form.band1_auth_mode_x.value == 'wpa' || document.form.band1_auth_mode_x.value == 'wpa2'
|| document.form.band1_auth_mode_x.value == 'wpawpa2'){
variable['wl1_crypto'] = document.form.band1_crypto.value;
variable['wl1_wpa_psk'] = document.form.band1_wpa_psk.value;
variable['wl1_mfp'] = document.form.wl1_mfp.value;
variable['wl1_wpa_gtk_rekey'] = document.form.band1_wpa_gtk_rekey.value;
variable['wl1_radius_ipaddr'] = document.form.band1_radius_ipaddr.value;
variable['wl1_radius_port'] = document.form.band1_radius_port.value;
variable['wl1_radius_key'] = document.form.band1_radius_key.value;
}
else if(document.form.band1_auth_mode_x.value == 'open' && document.form.band1_wep_x.value == '0'){
variable['wl1_wep_x'] = document.form.band1_wep_x.value;
}
else if((document.form.band1_auth_mode_x.value == 'open' && document.form.band1_wep_x.value != '0')
|| document.form.band1_auth_mode_x.value == 'shared'){
variable['wl1_wep_x'] = document.form.band1_wep_x.value;
variable['wl1_key'] = document.form.band1_key.value;
variable['wl1_key1'] = document.form.band1_key1.value;
variable['wl1_key2'] = document.form.band1_key2.value;
variable['wl1_key3'] = document.form.band1_key3.value;
variable['wl1_key4'] = document.form.band1_key4.value;
variable['wl1_phrase_x'] = document.form.band1_phrase_x.value;
}
else if(document.form.band1_auth_mode_x.value == 'radius'){
variable['wl1_radius_ipaddr'] = document.form.band1_radius_ipaddr.value;
variable['wl1_radius_port'] = document.form.band1_radius_port.value;
variable['wl1_radius_key'] = document.form.band1_radius_key.value;
}
}
else if(document.form.smart_connect_x.value == '1'){
variable['wl0_ssid'] = document.form.band01_ssid.value;
variable['wl1_ssid'] = document.form.band01_ssid.value;
variable['wl0_closed'] = document.form.band01_closed.value;
variable['wl1_closed'] = document.form.band01_closed.value;
variable['wl0_nmode_x'] = document.form.band01_nmode_x.value;
variable['wl1_nmode_x'] = document.form.band01_nmode_x.value;
if(document.form.band01_nmode_x.value == '0'){
variable['wl0_rateset'] = document.form.band01_rateset_check.checked ? 'ofdm' : 'default';
variable['wl0_11ax'] = document.form.band01_11ax.value;
variable['wl1_11ax'] = document.form.band01_11ax.value;
}
variable['wl0_mbo_enable'] = document.form.band01_mbo_enable.value;
variable['wl1_mbo_enable'] = document.form.band01_mbo_enable.value;
variable['wl0_twt'] = document.form.band01_twt.value;
variable['wl1_twt'] = document.form.band01_twt.value;
variable['wl0_auth_mode_x'] = document.form.band01_auth_mode_x.value;
variable['wl1_auth_mode_x'] = document.form.band01_auth_mode_x.value;
if(document.form.band01_auth_mode_x.value == 'psk' || document.form.band01_auth_mode_x.value == 'psk2'
|| document.form.band01_auth_mode_x.value == 'sae' || document.form.band01_auth_mode_x.value == 'pskpsk2'
|| document.form.band01_auth_mode_x.value == 'psk2sae'){
variable['wl0_crypto'] = document.form.band01_crypto.value;
variable['wl1_crypto'] = document.form.band01_crypto.value;
variable['wl0_wpa_psk'] = document.form.band01_wpa_psk.value;
variable['wl1_wpa_psk'] = document.form.band01_wpa_psk.value;
variable['wl0_mfp'] = document.form.wl01_mfp.value;
variable['wl1_mfp'] = document.form.wl01_mfp.value;
variable['wl0_wpa_gtk_rekey'] = document.form.band01_wpa_gtk_rekey.value;
variable['wl1_wpa_gtk_rekey'] = document.form.band01_wpa_gtk_rekey.value;
}
else if(document.form.band01_auth_mode_x.value == 'wpa' || document.form.band01_auth_mode_x.value == 'wpa2'
|| document.form.band01_auth_mode_x.value == 'wpawpa2'){
variable['wl0_crypto'] = document.form.band01_crypto.value;
variable['wl1_crypto'] = document.form.band01_crypto.value;
variable['wl0_wpa_psk'] = document.form.band01_wpa_psk.value;
variable['wl1_wpa_psk'] = document.form.band01_wpa_psk.value;
variable['wl0_mfp'] = document.form.wl01_mfp.value;
variable['wl1_mfp'] = document.form.wl01_mfp.value;
variable['wl0_wpa_gtk_rekey'] = document.form.band01_wpa_gtk_rekey.value;
variable['wl1_wpa_gtk_rekey'] = document.form.band01_wpa_gtk_rekey.value;
variable['wl0_radius_ipaddr'] = document.form.band01_radius_ipaddr.value;
variable['wl1_radius_ipaddr'] = document.form.band01_radius_ipaddr.value;
variable['wl0_radius_port'] = document.form.band01_radius_port.value;
variable['wl1_radius_port'] = document.form.band01_radius_port.value;
variable['wl0_radius_key'] = document.form.band01_radius_key.value;
variable['wl1_radius_key'] = document.form.band01_radius_key.value;
}
else if(document.form.band01_auth_mode_x.value == 'open' && document.form.band01_wep_x.value == '0'){
variable['wl0_wep_x'] = document.form.band01_wep_x.value;
variable['wl1_wep_x'] = document.form.band01_wep_x.value;
}
else if((document.form.band01_auth_mode_x.value == 'open' && document.form.band01_wep_x.value != '0')
|| document.form.band01_auth_mode_x.value == 'shared'){
variable['wl0_wep_x'] = document.form.band01_wep_x.value;
variable['wl1_wep_x'] = document.form.band01_wep_x.value;
variable['wl0_key'] = document.form.band01_key.value;
variable['wl1_key'] = document.form.band01_key.value;
variable['wl0_key1'] = document.form.band01_key1.value;
variable['wl1_key1'] = document.form.band01_key1.value;
variable['wl0_key2'] = document.form.band01_key2.value;
variable['wl1_key2'] = document.form.band01_key2.value;
variable['wl0_key3'] = document.form.band01_key3.value;
variable['wl1_key3'] = document.form.band01_key3.value;
variable['wl0_key4'] = document.form.band01_key4.value;
variable['wl1_key4'] = document.form.band01_key4.value;
variable['wl0_phrase_x'] = document.form.band01_phrase_x.value;
variable['wl1_phrase_x'] = document.form.band01_phrase_x.value;
}
else if(document.form.band01_auth_mode_x.value == 'radius'){
variable['wl0_radius_ipaddr'] = document.form.band01_radius_ipaddr.value;
variable['wl1_radius_ipaddr'] = document.form.band01_radius_ipaddr.value;
variable['wl0_radius_port'] = document.form.band01_radius_port.value;
variable['wl1_radius_port'] = document.form.band01_radius_port.value;
variable['wl0_radius_key'] = document.form.band01_radius_key.value;
variable['wl1_radius_key'] = document.form.band01_radius_key.value;
}
variable['wl0_bw'] = document.form.band0_bw.value;
variable['wl1_bw'] = document.form.band1_bw.value;
variable['wl0_channel'] = document.form.band0_channel.value;
variable['wl0_nctrlsb'] = document.form.band0_nctrlsb.value;
variable['wl1_nctrlsb'] = document.form.band1_nctrlsb.value;
variable['wl1_bw_160'] = document.getElementById('band1_enable_160mhz').checked ? '1' : '0';
variable['wl1_channel'] = document.form.band1_channel.value;
if(document.form.band1_channel.value == '0'){
variable['acs_dfs'] = document.form.band1_acs_dfs_checkbox.checked ? '1' : '0';
}
}
if(acs_ch13_support && document.form.band0_channel.value == '0'){
variable['acs_ch13'] = document.getElementById('band0_acs_ch13').checked ? '1' : '0';
}
postObj = Object.assign(postObj, variable);
rc_time = 60;
httpApi.nvramSet(postObj, function(response){
var restart_needed_time = this.restart_needed_time; // restart wireless time
if (restart_needed_time) {
var tmp_rc_time = parseInt(restart_needed_time);
if (!isNaN(tmp_rc_time) && tmp_rc_time > 0 && tmp_rc_time < 300) {
rc_time = tmp_rc_time;
}
}
showLoading(rc_time, "waiting");
setTimeout(function(){
setInterval(function(){
var http = new XMLHttpRequest
http.onreadystatechange=function(){
if(http.readyState==4 && http.status==200){
top.location.href="/Advanced_Wireless_Content.asp"
}
},
http.open("GET","/httpd_check.xml",!0);
http.send(null);
}, 3000);
}, 10000);
});
}
}
}
function validForm(){
var auth_mode = document.form.wl_auth_mode_x.value;
if(!validator.stringSSID(document.form.wl_ssid))
return false;
if(sw_mode != 2){
if(!check_NOnly_to_GN()){
autoFocus('wl_nmode_x');
return false;
}
}
if(document.form.wl_wep_x.value != "0")
if(!validate_wlphrase('WLANConfig11b', 'wl_phrase_x', document.form.wl_phrase_x))
return false;
if(auth_mode == "psk" || auth_mode == "psk2" || auth_mode == "pskpsk2" || auth_mode == "sae" || auth_mode == "psk2sae"){ //2008.08.04 lock modified
if(is_KR_sku){
if(document.form.smart_connect_x.value == '1'){
if(!validator.psk_KR(document.form.band01_wpa_psk))
return false;
}
else{
if(!validator.psk_KR(document.form.band0_wpa_psk))
return false;
if(!validator.psk_KR(document.form.band1_wpa_psk))
return false;
}
}
else{
if(document.form.smart_connect_x.value == '1'){
if(!validator.psk(document.form.band01_wpa_psk))
return false;
}
else{
if(!validator.psk(document.form.band0_wpa_psk))
return false;
if(!validator.psk(document.form.band1_wpa_psk))
return false;
}
}
var is_common_string = check_common_string(document.form.wl_wpa_psk.value, "wpa_key");
if(is_common_string){
if(!confirm("<#410#>")){
document.form.wl_wpa_psk.focus();
document.form.wl_wpa_psk.select();
return false;
}
}
if(!validator.range(document.form.wl_wpa_gtk_rekey, 0, 2592000))
return false;
}
else if(auth_mode == "wpa" || auth_mode == "wpa2" || auth_mode == "wpawpa2"){
if(!validator.range(document.form.wl_wpa_gtk_rekey, 0, 2592000))
return false;
}
else{
var cur_wep_key = eval('document.form.wl_key'+document.form.wl_key.value);
if(auth_mode != "radius" && !validator.wlKey(cur_wep_key))
return false;
}
if(isSupport("triband") && dwb_info.mode) {
var jsonPara = {};
jsonPara["edit_wl_unit"] = wl_unit;
jsonPara["edit_wl_ssid"] = document.form.wl_ssid.value;
jsonPara["dwb_unit"] = dwb_info.band;
jsonPara["smart_connect"] = document.form.smart_connect_x.value;
var ssid_array = [];
ssid_array.push(httpApi.nvramGet(["wl0_ssid"]).wl0_ssid);
if(wl_info.band5g_support)
ssid_array.push(httpApi.nvramGet(["wl1_ssid"]).wl1_ssid);
if(wl_info.band5g_2_support || wl_info.band6g_support)
ssid_array.push(httpApi.nvramGet(["wl2_ssid"]).wl2_ssid);
jsonPara["current_ssid"] = ssid_array;
if(!validator.dwb_check_wl_setting(jsonPara)) {
alert("The fronthaul SSID is the same as the backhaul SSID.");/* untranslated */
return false;
}
}
return true;
}
function done_validating(action){
refreshpage();
}
function validate_wlphrase(s, v, obj){
if(!validator.string(obj)){
is_wlphrase(s, v, obj);
return(false);
}
return true;
}
function disableAdvFn(){
for(var i=18; i>=3; i--)
document.getElementById("WLgeneral").deleteRow(i);
}
function _change_wl_unit(val){
if (band60g_support && he_frame_support) {
if (document.form.wl_unit.value == '3') {
$("#he_mode_field").hide();
}
else {
}
}
if(!concurrep_support && (isSwMode("re") || isSwMode("mb")) && val == wlc_band_value)
document.form.wl_subunit.value = 1;
else
document.form.wl_subunit.value = -1;
if(concurrep_support && (isSwMode("re") || isSwMode("mb") || isSwMode("ew")))
document.form.wl_subunit.value = 1;
change_wl_unit();
}
function clean_input(obj){
if(obj.value == "<#3992#>")
obj.value = "";
}
function check_NOnly_to_GN(){
if(document.form.wl_nmode_x.value == "0" || document.form.wl_nmode_x.value == "1"){
if(wl_unit_value == "1" || wl_unit_value == "2"){ //5G
for(var i=0;i<gn_array_5g.length;i++){
if(gn_array_5g[i][0] == "1" && (gn_array_5g[i][3] == "tkip" || gn_array_5g[i][5] == "1" || gn_array_5g[i][5] == "2")){
if(document.form.wl_nmode_x.value == "0")
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4182#>';
else{
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4186#>';
}
document.getElementById('wl_NOnly_note').style.display = "";
return false;
}
}
}
else if(wl_unit_value == "0"){ //2.4G
for(var i=0;i<gn_array_2g.length;i++){
if(gn_array_2g[i][0] == "1" && (gn_array_2g[i][3] == "tkip" || gn_array_2g[i][5] == "1" || gn_array_2g[i][5] == "2")){
if(document.form.wl_nmode_x.value == "0")
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4182#>';
else
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4186#>';
document.getElementById('wl_NOnly_note').style.display = "";
return false;
}
}
}
}
document.getElementById('wl_NOnly_note').style.display = "none";
return true;
}
function high_power_auto_channel(){
if(is_high_power){
if(document.form.wl_channel.value == 1){
if(confirm("<#4012#>")){
document.form.wl_channel.value = 2;
}
else if(!(confirm("<#4013#>"))){
document.form.wl_channel.value = 2;
}
}
else if(document.form.wl_channel.value == 11){
if(confirm("<#4014#>")){
document.form.wl_channel.value = 10;
}
else if(!(confirm("<#4015#>"))){
document.form.wl_channel.value = 10;
}
}
if(document.form.wl_channel.value == 0)
document.form.AUTO_CHANNEL.value = 1;
else
document.form.AUTO_CHANNEL.value = 0;
}
}
function check_DFS_support(obj){
if(obj.checked)
document.form.acs_dfs.value = 1;
else
document.form.acs_dfs.value = 0;
}
function check_acs_band1_support(obj){
if(obj.checked)
document.form.acs_band1.value = 1;
else
document.form.acs_band1.value = 0;
}
function check_acs_band3_support(obj){
if(obj.checked)
document.form.acs_band3.value = 1;
else
document.form.acs_band3.value = 0;
}
function check_acs_ch13_support(obj){
if(obj.checked)
document.form.acs_ch13.value = 1;
else
document.form.acs_ch13.value = 0;
}
function checkWLReady(){
$.ajax({
url: '/ajax_wl_ready.asp',
dataType: 'script',
error: function(xhr) {
setTimeout("checkWLReady();", 1000);
},
success: function(response){
if(wave_ready != 1){
$("#lantiq_ready").show();
setTimeout("checkWLReady();", 1000);
}
else{
$("#lantiq_ready").hide();
}
}
});
}
function enableSmartCon(val){
document.form.smart_connect_x.value = val;
var value = new Array();
var desc = new Array();
band0_channel = '<% nvram_get("wl0_channel"); %>';
band1_channel = '<% nvram_get("wl1_channel"); %>';
if(isSupport("triband") && dwb_info.mode) {
desc = ["<#3353#> (2.4GHz and 5GHz)"];
value = ["1"];
add_options_x2(document.form.smart_connect_t, desc, value, val);
}
else {
if(based_modelid=="RT-AC5300" || based_modelid=="GT-AC5300"){
desc = ["<#3354#> (2.4GHz, 5GHz-1 and 5GHz-2)", "5GHz Smart Connect (5GHz-1 and 5GHz-2)"];
value = ["1", "2"];
add_options_x2(document.form.smart_connect_t, desc, value, val);
}
else if(based_modelid =="RT-AC3200" || based_modelid =="RT-AC95U"){
desc = ["<#3354#> (2.4GHz, 5GHz-1 and 5GHz-2)"];
value = ["1"];
add_options_x2(document.form.smart_connect_t, desc, value, val);
}
else if(based_modelid == "RT-AC88U" || based_modelid == "RT-AC86U" || based_modelid == "GT-AC2900" || based_modelid == "RT-AC3100" || based_modelid == "BLUECAVE" || based_modelid == "MAP-AC1750" || based_modelid == "RT-AX89U" || based_modelid == "GT-AXY16000" || based_modelid.substring(0,7) == "RT-AC59" || based_modelid == "XD4S"){
desc = ["<#3353#> (2.4GHz and 5GHz)"];
value = ["1"];
add_options_x2(document.form.smart_connect_t, desc, value, val);
}
}
if (Qcawifi_support || Rawifi_support) {
document.getElementById("smartcon_rule_link").style.display = "none";
if(val == 0){
document.getElementById("smart_connect_field").style.display = "none";
}else if(val > 0){
document.getElementById("smart_connect_field").style.display = "";
}
}
if(based_modelid=="RT-AC5300" ||
based_modelid=="GT-AC5300" ||
based_modelid=="RT-AC3200" ||
based_modelid=="RT-AC88U" ||
based_modelid == "RT-AC86U" ||
based_modelid == "GT-AC2900" ||
based_modelid == "RT-AC3100" ||
based_modelid == "RT-AC95U" ||
based_modelid == "MAP-AC1750" ||
based_modelid.substring(0,7) == "RT-AC59" ||
based_modelid == "RT-AX89U" ||
based_modelid == "GT-AXY16000" ||
based_modelid == "XD4S" ||
based_modelid == "BLUECAVE"){
document.getElementById("smartcon_rule_link").style.display = "none";
if(val == 0){
document.getElementById("smart_connect_field").style.display = "none";
}else if(val > 0){
document.getElementById("smart_connect_field").style.display = "";
}
}
if((val == 0 || (val == 2 && wl_unit == 0)) || (dwb_info.mode && wl_unit == dwb_info.band)){
document.form.wl_nmode_x.disabled = "";
if(document.form.wl_unit[0].selected == true){
document.getElementById("wl_gmode_checkbox").style.display = "";
}
if(band5g_11ac_support){
regen_5G_mode(document.form.wl_nmode_x, wl_unit);
}else{
free_options(document.form.wl_nmode_x);
document.form.wl_nmode_x.options[0] = new Option("<#241#>", 0);
document.form.wl_nmode_x.options[1] = new Option("N only", 1);
document.form.wl_nmode_x.options[2] = new Option("Legacy", 2);
}
change_wl_nmode(document.form.wl_nmode_x);
document.getElementById('band01_table').style.display = 'none';
document.getElementById('band0_ssid_field').style.display = '';
document.getElementById('band0_closed_field').style.display = '';
document.getElementById('band0_nmode_x_field').style.display = '';
document.getElementById('band0_he_mode_field').style.display = '';
document.getElementById('band0_mbo_field').style.display = '';
document.getElementById('band0_twt_field').style.display = '';
document.getElementById('band0_auth_mode_x_field').style.display = '';
auth_mehtod_change(0, document.form.band0_auth_mode_x.value);
document.getElementById('band1_ssid_field').style.display = '';
document.getElementById('band1_closed_field').style.display = '';
document.getElementById('band1_nmode_x_field').style.display = '';
document.getElementById('band1_he_mode_field').style.display = '';
document.getElementById('band1_mbo_field').style.display = '';
document.getElementById('band1_twt_field').style.display = '';
document.getElementById('band1_auth_mode_x_field').style.display = '';
auth_mehtod_change(1, document.form.band1_auth_mode_x.value);
if (band0_channel == '0') {
$('#band0_auto_channel').show();
$('#band0_auto_channel').html('<#3988#>: ' + cur_control_channel[0]);
}
if (band1_channel == '0') {
$('#band1_auto_channel').show();
$('#band1_auto_channel').html('<#3988#>: ' + cur_control_channel[1]);
}
}else{
document.getElementById("wl_unit_field").style.display = "none";
document.getElementById('band01_table').style.display = '';
document.getElementById('band0_ssid_field').style.display = 'none';
document.getElementById('band0_closed_field').style.display = 'none';
document.getElementById('band0_nmode_x_field').style.display = 'none';
document.getElementById('band0_he_mode_field').style.display = 'none';
document.getElementById('band0_mbo_field').style.display = 'none';
document.getElementById('band0_twt_field').style.display = 'none';
document.getElementById('band0_auth_mode_x_field').style.display = 'none';
document.getElementById('band0_crypto_field').style.display = 'none';
document.getElementById('band0_wpa_psk_key_field').style.display = 'none';
document.getElementById('band0_mfp_field').style.display = 'none';
document.getElementById('band0_gtk_field').style.display = 'none';
document.getElementById('band0_wep_x_field').style.display = 'none';
document.getElementById('band0_key_field').style.display = 'none';
document.getElementById('band0_key1_filed').style.display = 'none';
document.getElementById('band0_key2_filed').style.display = 'none';
document.getElementById('band0_key3_filed').style.display = 'none';
document.getElementById('band0_key4_filed').style.display = 'none';
document.getElementById('band0_phrase_filed').style.display = 'none';
document.getElementById('band0_radius_ipaddr_field').style.display = 'none';
document.getElementById('band0_radius_port_field').style.display = 'none';
document.getElementById('band0_radius_key_field').style.display = 'none';
document.getElementById('band1_ssid_field').style.display = 'none';
document.getElementById('band1_closed_field').style.display = 'none';
document.getElementById('band1_nmode_x_field').style.display = 'none';
document.getElementById('band1_he_mode_field').style.display = 'none';
document.getElementById('band1_mbo_field').style.display = 'none';
document.getElementById('band1_twt_field').style.display = 'none';
document.getElementById('band1_auth_mode_x_field').style.display = 'none';
document.getElementById('band1_crypto_field').style.display = 'none';
document.getElementById('band1_wpa_psk_key_field').style.display = 'none';
document.getElementById('band1_mfp_field').style.display = 'none';
document.getElementById('band1_gtk_field').style.display = 'none';
document.getElementById('band1_wep_x_field').style.display = 'none';
document.getElementById('band1_key_field').style.display = 'none';
document.getElementById('band1_key1_filed').style.display = 'none';
document.getElementById('band1_key2_filed').style.display = 'none';
document.getElementById('band1_key3_filed').style.display = 'none';
document.getElementById('band1_key4_filed').style.display = 'none';
document.getElementById('band1_phrase_filed').style.display = 'none';
document.getElementById('band1_radius_ipaddr_field').style.display = 'none';
document.getElementById('band1_radius_port_field').style.display = 'none';
document.getElementById('band1_radius_key_field').style.display = 'none';
if (band0_channel == '0') {
$('#band0_auto_channel').show();
$('#band0_auto_channel').html('<#3988#>: ' + cur_control_channel[0]);
}
if (band1_channel == '0') {
$('#band1_auto_channel').show();
$('#band1_auto_channel').html('<#3988#>: ' + cur_control_channel[1]);
}
}
if(based_modelid=="RT-AC5300" || based_modelid=="GT-AC5300" || based_modelid=="RT-AC3200")
_change_smart_connect(val);
if(isSupport("amas_fronthaul_network")){
if(isSupport("triband")){
var wl_closed = httpApi.nvramGet(["wl_closed"]).wl_closed;
if(wl_closed != undefined && wl_closed != ""){
$('input:radio[name=wl_closed]').each(function(){$(this).prop('checked', false);});
$('input:radio[name=wl_closed][value="' + wl_closed + '"]').click();
}
if(dwb_info.mode && wl_unit == dwb_info.band){
if(smart_connect_flag_t != val && val == "1"){
$('input:radio[name=wl_closed]').each(function(){$(this).prop('checked', false);});
$('input:radio[name=wl_closed][value=1]').click();
}
}
}
}
controlHideSSIDHint();
if(is_KR_sku){
if(document.form.smart_connect_x.value == '1'){
$("#band01_auth_mode_x option[value='open']").remove();
}
else{
$("#band0_auth_mode_x option[value='open']").remove();
$("#band1_auth_mode_x option[value='open']").remove();
}
}
}
function enable_160MHz(obj){
cur = '<% nvram_get("wl1_bw"); %>';
var bws = new Array();
var bwsDesc = new Array();
if(obj.checked){
bws = [1, 0, 2, 3, 5];
bwsDesc = ["20/40/80/160 MHz", "20 MHz", "40 MHz", "80 MHz", "160 MHz"];
enable_bw_160 = true;
if(cur == '5'){
document.form.band1_acs_dfs_checkbox.disabled = true;
}
}
else{
bws = [1, 0, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
enable_bw_160 = false;
document.form.band1_acs_dfs_checkbox.disabled = false;
}
add_options_x2(document.form.band1_bw, bwsDesc, bws, cur);
insertExtChannelOption();
}
function __regen_auto_option(obj,val){
free_options(obj);
obj.options[0] = new Option("<#241#>", val);
obj.selectedIndex = 0;
}
function regen_auto_option(obj){
var value = 0;
if(obj.name === 'wl_bw' && (Rawifi_support || Qcawifi_support)){
value = 1;
}
__regen_auto_option(obj, value);
}
var wl_unit = <% nvram_get("wl_unit"); %>;
function regen_5G_mode(obj,flag){ //please sync to initial() : //Change wireless mode help desc
free_options(obj);
if(flag == 1 || flag == 2){
if(based_modelid == "RT-AC87U"){
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N only", 1);
}
else if(no_vht_support){ //Hide 11AC/80MHz from GUI
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N only", 1);
obj.options[2] = new Option("Legacy", 2);
}
else if(band5g_11ax_support){
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N/AC/AX mixed", 8);
obj.options[2] = new Option("Legacy", 2);
}
else{
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N only", 1);
obj.options[2] = new Option("N/AC mixed", 8);
obj.options[3] = new Option("Legacy", 2);
}
}
else{
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N only", 1);
obj.options[2] = new Option("Legacy", 2);
}
obj.value = '<% nvram_get("wl_nmode_x"); %>';
}
function wl_mode_change(mode){
if(mode == '0'){
document.form.band0_rateset_check.disabled = false;
document.getElementById("band0_rateset_checkbox").style.display = "";
}
else{
document.form.band0_rateset_check.disabled = true;
document.getElementById("band0_rateset_checkbox").style.display = "none";
}
}
function band01_mode_change(mode){
if(mode == '0'){
document.form.band01_rateset_check.disabled = false;
document.getElementById("band01_rateset_checkbox").style.display = "";
}
else{
document.form.band01_rateset_check.disabled = true;
document.getElementById("band01_rateset_checkbox").style.display = "none";
}
}
function wl_disable11b(obj){
if(obj.checked){
document.form.band0_rateset_check.value = 'ofdm';
}
else{
document.form.band0_rateset_check.value = 'default';
}
}
function band01_disable11b(obj){
if(obj.checked){
document.form.band01_rateset_check.value = 'ofdm';
}
else{
document.form.band01_rateset_check.value = 'default';
}
}
function change_wl_nmode(o){
if(Bcmwifi_support) {
if(o.value == '2')
inputCtrl(document.form.wl_gmode_check, 1);
else {
inputCtrl(document.form.wl_gmode_check, 0);
document.form.wl_gmode_check.checked = true;
}
}
else {
if(o.value=='1') /* Jerry5: to be verified */
inputCtrl(document.form.wl_gmode_check, 0);
else
inputCtrl(document.form.wl_gmode_check, 1);
}
if (he_frame_support) {
if (o.value == '0' && !(band60g_support && document.form.wl_unit.value == '3')) {
}
else {
$("#he_mode_field").hide();
}
}
limit_auth_method();
if(o.value == "3"){
document.form.wl_wme.value = "on";
}
if(wl_unit == '0')
check_channel_2g();
else if(wl_unit == '3')
insertChannelOption_60g();
else
insertExtChannelOption_5g();
genBWTable(wl_unit);
}
function he_frame_mode(obj) {
if (obj.value == "0" && wl_unit != 0) {
$("#enable_160mhz")[0].checked = false
enable_160MHz($("#enable_160mhz")[0]);
document.form.acs_dfs_checkbox.checked = false;
document.form.acs_dfs.value = 0;
}
if (obj.value == "0") {
document.form.wl_twt.value = "0";
document.form.band01_twt.value = "0";
document.form.band0_twt.value = "0";
document.form.band1_twt.value = "0";
}
}
function controlHideSSIDHint() {
$("#dwb_band_hide_hint").hide();
if(isSupport("triband") && dwb_info.mode){
if(dwb_info.band == wl_unit){
if(document.form.smart_connect_x.value != "1" && ($('input:radio[name=wl_closed]:checked').val() == "1"))
$("#dwb_band_hide_hint").show();
}
}
}
function ajax_wl_channel(){
$.ajax({
url: '/ajax_wl_channel.asp',
dataType: 'script',
error: function(xhr) {
setTimeout("ajax_wl_channel();", 1000);
},
success: function(response){
$('#band0_auto_channel').html('<#3988#>: ' + cur_control_channel[0]);
$('#band1_auto_channel').html('<#3988#>: ' + cur_control_channel[1]);
setTimeout("ajax_wl_channel();", 5000);
}
});
}
function ajax_wl_edmg_channel(){
$.ajax({
url: '/ajax_wl_edmg_channel.asp',
dataType: 'script',
error: function(xhr) {
setTimeout("ajax_wl_edmg_channel();", 1000);
},
success: function(response){
$("#auto_edmg_channel").html("Current EDMG Channel: " + cur_edmg_channel[wl_unit]); /* untranslated */
setTimeout("ajax_wl_edmg_channel();", 5000);
}
});
}
function handleMFP(){
if(mbo_support) {
if (document.form.smart_connect_x.value == '1') {
if (document.form.band01_mbo_enable.value == '1' && document.form.wl01_mfp.value == '0')
$('#band01_mbo_notice').show();
else
$('#band01_mbo_notice').hide();
} else {
if (document.form.wl_mbo_enable.value == '1' && document.form.wl_mfp.value == '0')
$('#mbo_notice').show();
else
$('#mbo_notice').hide();
if (document.form.band0_mbo_enable.value == '1' && document.form.wl0_mfp.value == '0')
$('#band0_mbo_notice').show();
else
$('#band0_mbo_notice').hide();
if (document.form.band1_mbo_enable.value == '1' && document.form.wl1_mfp.value == '0')
$('#band1_mbo_notice').show();
else
$('#band1_mbo_notice').hide();
}
}
else{
$('#mbo_notice').hide();
$('#band01_mbo_notice').hide();
$('#band0_mbo_notice').hide();
$('#band1_mbo_notice').hide();
}
}
wl0_channel = httpApi.hookGet('channel_list_2g', true);
wl1_channel = httpApi.hookGet('channel_list_5g', true);
var wl0 = {
"channel_20m": wl0_channel,
"channel_40m": wl0_channel,
}
var wl1 = {
"channel_20m": [],
"channel_40m": [],
"channel_80m": [],
"channel_160m": []
}
for(var i=0;i<wl1_channel.length;i++){
var ch = wl1_channel[i];
wl1["channel_20m"].push(ch);
if(ch == '36'){
if(wl1_channel.indexOf(40) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '40'){
if(wl1_channel.indexOf(36) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '44'){
if(wl1_channel.indexOf(48) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(48) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '48'){
if(wl1_channel.indexOf(44) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '52'){
if(wl1_channel.indexOf(56) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '56'){
if(wl1_channel.indexOf(52) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(60) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '60'){
if(wl1_channel.indexOf(64) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(64) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '64'){
if(wl1_channel.indexOf(60) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(36) != -1 && wl1_channel.indexOf(40) != -1 && wl1_channel.indexOf(44) != -1 && wl1_channel.indexOf(48) != -1
&& wl1_channel.indexOf(52) != -1 && wl1_channel.indexOf(56) != -1 && wl1_channel.indexOf(60) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '100'){
if(wl1_channel.indexOf(104) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '104'){
if(wl1_channel.indexOf(100) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '108'){
if(wl1_channel.indexOf(112) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(112) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '112'){
if(wl1_channel.indexOf(108) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '116'){
if(wl1_channel.indexOf(120) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '120'){
if(wl1_channel.indexOf(116) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(124) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '124'){
if(wl1_channel.indexOf(128) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(128) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '128'){
if(wl1_channel.indexOf(124) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(100) != -1 && wl1_channel.indexOf(104) != -1 && wl1_channel.indexOf(108) != -1 && wl1_channel.indexOf(112) != -1
&& wl1_channel.indexOf(116) != -1 && wl1_channel.indexOf(120) != -1 && wl1_channel.indexOf(124) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '132'){
if(wl1_channel.indexOf(136) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(136) != -1 && wl1_channel.indexOf(140) != -1 && wl1_channel.indexOf(144) != -1){
wl1['channel_80m'].push(ch);
}
}
else if(ch == '136'){
if(wl1_channel.indexOf(132) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(132) != -1 && wl1_channel.indexOf(140) != -1 && wl1_channel.indexOf(144) != -1){
wl1['channel_80m'].push(ch);
}
}
else if(ch == '140'){
if(wl1_channel.indexOf(144) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(132) != -1 && wl1_channel.indexOf(136) != -1 && wl1_channel.indexOf(144) != -1){
wl1['channel_80m'].push(ch);
}
}
else if(ch == '144'){
if(wl1_channel.indexOf(140) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(132) != -1 && wl1_channel.indexOf(136) != -1 && wl1_channel.indexOf(140) != -1){
wl1['channel_80m'].push(ch);
}
}
else if(ch == '149'){
if(wl1_channel.indexOf(153) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '153'){
if(wl1_channel.indexOf(149) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '157'){
if(wl1_channel.indexOf(161) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(161) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '161'){
if(wl1_channel.indexOf(157) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '165'){
if(wl1_channel.indexOf(169) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '169'){
if(wl1_channel.indexOf(165) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(173) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '173'){
if(wl1_channel.indexOf(177) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(177) != -1){
wl1['channel_160m'].push(ch);
}
}
else if(ch == '177'){
if(wl1_channel.indexOf(173) != -1){
wl1['channel_40m'].push(ch);
}
if(wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1){
wl1['channel_80m'].push(ch);
}
if(wl1_channel.indexOf(149) != -1 && wl1_channel.indexOf(153) != -1 && wl1_channel.indexOf(157) != -1 && wl1_channel.indexOf(161) != -1
&& wl1_channel.indexOf(165) != -1 && wl1_channel.indexOf(169) != -1 && wl1_channel.indexOf(173) != -1){
wl1['channel_160m'].push(ch);
}
}
}
function handle_bandwidth(unit, value){
var bwValTransform = [];
if(Bcmwifi_support){
bwValTransform = ['auto', '20m', '40m', '80m', '80+80m', '160m', '320m'];
}
else{
bwValTransform = ['20m', 'auto', '40m', '80m', '80+80m', '160m', '320m'];
}
var bw = bwValTransform[value];
if(bw == '20m'){
if(unit == '0'){
genChannel('0', value)
document.getElementById('band0_nctrlsb_field').style.display = 'none';
}
else if(unit == '1'){
genChannel('1', value)
document.getElementById('band1_nctrlsb_field').style.display = 'none';
}
else if(unit == '01'){
document.getElementById('band01_nctrlsb_field').style.display = 'none';
}
}
else{
if(unit == '0'){
genChannel('0', value)
document.getElementById('band0_nctrlsb_field').style.display = '';
}
else if(unit == '1'){
genChannel('1', value)
document.getElementById('band1_nctrlsb_field').style.display = '';
if(document.form.band1_bw.value == '5' && enable_bw_160){
document.form.band1_acs_dfs_checkbox.checked = true;
document.form.band1_acs_dfs_checkbox.disabled = true;
}
else{
document.form.band1_acs_dfs_checkbox.disabled = false;
}
}
else if(unit == '01'){
document.getElementById('band01_nctrlsb_field').style.display = '';
}
}
}
function genChannel(unit, bwValue){
var bwValTransform = [];
if(Bcmwifi_support){
bwValTransform = ['auto', '20m', '40m', '80m', '80+80m', '160m', '320m'];
}
else{
bwValTransform = ['20m', 'auto', '40m', '80m', '80+80m', '160m', '320m'];
}
var option = '<option value="0"><#241#></option>';
if(unit == '0'){
var wl0ChNvram = nvram['wl0_channel'];
var bw = bwValTransform[bwValue];
if(bw == 'auto'){
for(var i=0;i<wl0.channel_20m.length;i++){
var ch = wl0.channel_20m[i];
option += `<option value="${ch}" ${wl0ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
else if(bw == '20m'){
for(var i=0;i<wl0.channel_20m.length;i++){
var ch = wl0.channel_20m[i];
option += `<option value="${ch}" ${wl0ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
else if(bw == '40m'){
for(var i=0;i<wl0.channel_40m.length;i++){
var ch = wl0.channel_40m[i];
option += `<option value="${ch}" ${wl0ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
genExtChannel('0', wl0ChNvram, bwValue);
document.querySelector('[name="band0_channel"]').innerHTML = option;
}
else if(unit == '1'){
var wl1ChNvram = nvram['wl1_channel'];
var bw = bwValTransform[bwValue];
if(bw == 'auto'){
for(var i=0;i<wl1.channel_20m.length;i++){
var ch = wl1.channel_20m[i];
option += `<option value="${ch}" ${wl1ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
else if(bw == '160m'){
for(var i=0;i<wl1.channel_160m.length;i++){
var ch = wl1.channel_160m[i];
option += `<option value="${ch}" ${wl1ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
else if(bw == '80m'){
for(var i=0;i<wl1.channel_80m.length;i++){
var ch = wl1.channel_80m[i];
option += `<option value="${ch}" ${wl1ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
else if(bw == '40m'){
for(var i=0;i<wl1.channel_40m.length;i++){
var ch = wl1.channel_40m[i];
option += `<option value="${ch}" ${wl1ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
else if(bw == '20m'){
for(var i=0;i<wl1.channel_20m.length;i++){
var ch = wl1.channel_20m[i];
option += `<option value="${ch}" ${wl1ChNvram == ch? 'selected' : ''}>${ch}</option>`;
}
}
genExtChannel('1', wl1ChNvram, bwValue);
document.querySelector('[name="band1_channel"]').innerHTML = option;
if(document.form.band1_channel.value == '0' && document.form.band1_bw.value == '5'){
document.form.band1_acs_dfs_checkbox.checked = true;
document.form.band1_acs_dfs_checkbox.disabled = true;
document.getElementById('band1_dfs_checkbox').style.display = '';
}else{
document.form.band1_acs_dfs_checkbox.disabled = false;
}
}
}
function genExtChannel(unit, channel, bwValue){
var bwValTransform = [];
if(Bcmwifi_support){
bwValTransform = ['auto', '20m', '40m', '80m', '80+80m', '160m', '320m'];
}
else{
bwValTransform = ['20m', 'auto', '40m', '80m', '80+80m', '160m', '320m'];
}
var bw = bwValTransform[bwValue];
var option = '<option value="lower"><#241#></option>';
if(unit == '0'){
if((bw == 'auto' || bw == '40m') && channel != '0'){
var chLength = wl0_channel.length;
var chNumber = parseInt(channel);
var extChNvram = nvram['wl0_nctrlsb'];
if((chNumber - 4) > 0 && (chNumber + 4) <= chLength){
option = `<option value="lower" ${extChNvram == 'lower' ? 'selected' : ''}>Above</option>`;
option += `<option value="upper" ${extChNvram == 'upper' ? 'selected' : ''}>Below</option>`;
}
else if((chNumber - 4) <= 0){
option = `<option value="lower">Above</option>`;
}
else if((chNumber + 4) > chLength){
option = `<option value="upper">Below</option>`;
}
}
document.querySelector('[name="band0_nctrlsb"]').innerHTML = option;
}
}
function genAuthMethod(unit, wlMode){
var option = '';
if(unit == '0'){
var wlAuthModeNvram = nvram['wl0_auth_mode_x'];
option += `<option value="open" ${wlAuthModeNvram == 'open' ? 'selected' : ''}>Open System</option>`;
if(wlMode == '2'){
option += `<option value="shared" ${wlAuthModeNvram == 'shared' ? 'selected' : ''}>Shared Key</option>`;
option += `<option value="psk" ${wlAuthModeNvram == 'psk' ? 'selected' : ''}>WPA-Personal</option>`;
}
option += `<option value="psk2" ${wlAuthModeNvram == 'psk2' ? 'selected' : ''}>WPA2-Personal</option>`;
if(wpa3_support){
option += `<option value="sae" ${wlAuthModeNvram == 'sae' ? 'selected' : ''}>WPA3-Personal</option>`;
}
option += `<option value="pskpsk2" ${wlAuthModeNvram == 'pskpsk2' ? 'selected' : ''}>WPA-Auto-Personal</option>`;
if(wpa3_support){
option += `<option value="psk2sae" ${wlAuthModeNvram == 'psk2sae' ? 'selected' : ''}>WPA2/WPA3-Personal</option>`;
}
if(wlMode == '2'){
option += `<option value="wpa" ${wlAuthModeNvram == 'wpa' ? 'selected' : ''}>WPA-Enterprise</option>`;
}
option += `<option value="wpa2" ${wlAuthModeNvram == 'wpa2' ? 'selected' : ''}>WPA2-Enterprise</option>`;
option += `<option value="wpawpa2" ${wlAuthModeNvram == 'wpawpa2' ? 'selected' : ''}>WPA-Auto-Enterprise</option>`;
if(wlMode == '2'){
option += `<option value="radius" ${wlAuthModeNvram == 'radius' ? 'selected' : ''}>Radius with 802.1x</option>`;
}
document.querySelector('[name="band0_auth_mode_x"]').innerHTML = option;
genBWTable('0', document.form.band0_nmode_x.value);
if(wlMode == '0'){
document.form.band0_rateset_check.disabled = false;
document.getElementById("band0_rateset_checkbox").style.display = "";
document.getElementById("band0_he_mode_field").style.display = "";
}
else{
document.getElementById("band0_rateset_checkbox").style.display = "none";
document.getElementById("band0_he_mode_field").style.display = "none";
}
if(wlMode == '0' || wlMode == '2'){
document.getElementById('band0_gmode_check').disabled = false;
}
else{
document.getElementById('band0_gmode_check').checked = true;
document.getElementById('band0_gmode_check').disabled = true;
}
genWpaCrypto('0', wlAuthModeNvram);
auth_mehtod_change('0', wlAuthModeNvram);
}
else if(unit == '1'){
var wlAuthModeNvram = nvram['wl1_auth_mode_x'];
option += `<option value="open" ${wlAuthModeNvram == 'open' ? 'selected' : ''}>Open System</option>`;
if(wlMode == '2'){
option += `<option value="shared" ${wlAuthModeNvram == 'shared' ? 'selected' : ''}>Shared Key</option>`;
option += `<option value="psk" ${wlAuthModeNvram == 'psk' ? 'selected' : ''}>WPA-Personal</option>`;
}
option += `<option value="psk2" ${wlAuthModeNvram == 'psk2' ? 'selected' : ''}>WPA2-Personal</option>`;
if(wpa3_support){
option += `<option value="sae" ${wlAuthModeNvram == 'sae' ? 'selected' : ''}>WPA3-Personal</option>`;
}
option += `<option value="pskpsk2" ${wlAuthModeNvram == 'pskpsk2' ? 'selected' : ''}>WPA-Auto-Personal</option>`;
if(wpa3_support){
option += `<option value="psk2sae" ${wlAuthModeNvram == 'psk2sae' ? 'selected' : ''}>WPA2/WPA3-Personal</option>`;
}
if(wlMode == '2'){
option += `<option value="wpa" ${wlAuthModeNvram == 'wpa' ? 'selected' : ''}>WPA-Enterprise</option>`;
}
option += `<option value="wpa2" ${wlAuthModeNvram == 'wpa2' ? 'selected' : ''}>WPA2-Enterprise</option>`;
option += `<option value="wpawpa2" ${wlAuthModeNvram == 'wpawpa2' ? 'selected' : ''}>WPA-Auto-Enterprise</option>`;
if(wlMode == '2'){
option += `<option value="radius" ${wlAuthModeNvram == 'radius' ? 'selected' : ''}>Radius with 802.1x</option>`;
}
if(wlMode == '2'){
document.getElementById('band1_enable_160_field').style.display = 'none'
}
else{
if(vht160_support){
document.getElementById('band1_enable_160_field').style.display = '';
}
}
document.querySelector('[name="band1_auth_mode_x"]').innerHTML = option;
genBWTable('1', document.form.band1_nmode_x.value);
if(wlMode == '0'){
document.getElementById("band1_he_mode_field").style.display = "";
}
else{
document.getElementById("band1_he_mode_field").style.display = "none";
}
genWpaCrypto('1', wlAuthModeNvram);
auth_mehtod_change('1', wlAuthModeNvram);
}
else if(unit == '01'){
var wlAuthModeNvram = nvram['wl0_auth_mode_x'];
option += `<option value="open" ${wlAuthModeNvram == 'open' ? 'selected' : ''}>Open System</option>`;
if(wlMode == '2'){
option += `<option value="shared" ${wlAuthModeNvram == 'shared' ? 'selected' : ''}>Shared Key</option>`;
option += `<option value="psk" ${wlAuthModeNvram == 'psk' ? 'selected' : ''}>WPA-Personal</option>`;
}
option += `<option value="psk2" ${wlAuthModeNvram == 'psk2' ? 'selected' : ''}>WPA2-Personal</option>`;
if(wpa3_support){
option += `<option value="sae" ${wlAuthModeNvram == 'sae' ? 'selected' : ''}>WPA3-Personal</option>`;
}
option += `<option value="pskpsk2" ${wlAuthModeNvram == 'pskpsk2' ? 'selected' : ''}>WPA-Auto-Personal</option>`;
if(wpa3_support){
option += `<option value="psk2sae" ${wlAuthModeNvram == 'psk2sae' ? 'selected' : ''}>WPA2/WPA3-Personal</option>`;
}
if(wlMode == '2'){
option += `<option value="wpa" ${wlAuthModeNvram == 'wpa' ? 'selected' : ''}>WPA-Enterprise</option>`;
}
option += `<option value="wpa2" ${wlAuthModeNvram == 'wpa2' ? 'selected' : ''}>WPA2-Enterprise</option>`;
option += `<option value="wpawpa2" ${wlAuthModeNvram == 'wpawpa2' ? 'selected' : ''}>WPA-Auto-Enterprise</option>`;
if(wlMode == '2'){
option += `<option value="radius" ${wlAuthModeNvram == 'radius' ? 'selected' : ''}>Radius with 802.1x</option>`;
}
document.querySelector('[name="band01_auth_mode_x"]').innerHTML = option;
genBWTable('0', document.form.band0_nmode_x.value);
genBWTable('1', document.form.band1_nmode_x.value);
if(wlMode == '0'){
document.form.band01_rateset_check.disabled = false;
document.getElementById("band01_rateset_checkbox").style.display = "";
document.getElementById("band01_he_mode_field").style.display = "";
}
else{
document.getElementById("band01_rateset_checkbox").style.display = "none";
document.getElementById("band01_he_mode_field").style.display = "none";
}
auth_mehtod_change('01', wlAuthModeNvram);
genWpaCrypto('01', wlAuthModeNvram);
}
}
function auth_mehtod_change(unit, value){
if(value == 'open'){
if(unit == '0'){
var wepCyptoValue = document.querySelector('[name="band0_wep_x"]').value;
document.getElementById('band0_crypto_field').style.display = 'none';
document.getElementById('band0_wpa_psk_key_field').style.display = 'none';
document.getElementById('band0_mfp_field').style.display = 'none';
document.getElementById('band0_gtk_field').style.display = 'none';
if(document.form.band01_nmode_x.value == '2'){
document.getElementById('band0_wep_x_field').style.display = '';
}else{
document.querySelector('[name="band0_wep_x"]').value = '0';
wepCyptoValue = '0';
document.getElementById('band0_wep_x_field').style.display = 'none';
}
if(wepCyptoValue == '0'){
document.getElementById('band0_key_field').style.display = 'none';
document.getElementById('band0_key1_filed').style.display = 'none';
document.getElementById('band0_key2_filed').style.display = 'none';
document.getElementById('band0_key3_filed').style.display = 'none';
document.getElementById('band0_key4_filed').style.display = 'none';
document.getElementById('band0_phrase_filed').style.display = 'none';
}
else{
document.getElementById('band0_key_field').style.display = '';
document.getElementById('band0_key1_filed').style.display = '';
document.getElementById('band0_key2_filed').style.display = '';
document.getElementById('band0_key3_filed').style.display = '';
document.getElementById('band0_key4_filed').style.display = '';
document.getElementById('band0_phrase_filed').style.display = '';
}
document.getElementById('band0_radius_ipaddr_field').style.display = 'none';
document.getElementById('band0_radius_port_field').style.display = 'none';
document.getElementById('band0_radius_key_field').style.display = 'none';
}
else if(unit == '1'){
var wepCyptoValue = document.querySelector('[name="band1_wep_x"]').value;
document.getElementById('band1_crypto_field').style.display = 'none';
document.getElementById('band1_wpa_psk_key_field').style.display = 'none';
document.getElementById('band1_mfp_field').style.display = 'none';
document.getElementById('band1_gtk_field').style.display = 'none';
if(document.form.band01_nmode_x.value == '2'){
document.getElementById('band1_wep_x_field').style.display = '';
}else{
document.querySelector('[name="band1_wep_x"]').value = '0';
wepCyptoValue = '0';
document.getElementById('band1_wep_x_field').style.display = 'none';
}
if(wepCyptoValue == '0'){
document.getElementById('band1_key_field').style.display = 'none';
document.getElementById('band1_key1_filed').style.display = 'none';
document.getElementById('band1_key2_filed').style.display = 'none';
document.getElementById('band1_key3_filed').style.display = 'none';
document.getElementById('band1_key4_filed').style.display = 'none';
document.getElementById('band1_phrase_filed').style.display = 'none';
}
else{
document.getElementById('band1_key_field').style.display = '';
document.getElementById('band1_key1_filed').style.display = '';
document.getElementById('band1_key2_filed').style.display = '';
document.getElementById('band1_key3_filed').style.display = '';
document.getElementById('band1_key4_filed').style.display = '';
document.getElementById('band1_phrase_filed').style.display = '';
}
document.getElementById('band1_radius_ipaddr_field').style.display = 'none';
document.getElementById('band1_radius_port_field').style.display = 'none';
document.getElementById('band1_radius_key_field').style.display = 'none';
}
else if(unit == '01'){
var wepCyptoValue = document.querySelector('[name="band01_wep_x"]').value;
document.getElementById('band01_crypto_field').style.display = 'none';
document.getElementById('band01_wpa_psk_key_field').style.display = 'none';
document.getElementById('band01_mfp_field').style.display = 'none';
document.getElementById('band01_gtk_field').style.display = 'none';
if(document.form.band01_nmode_x.value == '2'){
document.getElementById('band01_wep_x_field').style.display = '';
}else{
document.querySelector('[name="band01_wep_x"]').value = '0';
wepCyptoValue = '0';
document.getElementById('band01_wep_x_field').style.display = 'none';
}
if(wepCyptoValue == '0'){
document.getElementById('band01_key_field').style.display = 'none';
document.getElementById('band01_key1_filed').style.display = 'none';
document.getElementById('band01_key2_filed').style.display = 'none';
document.getElementById('band01_key3_filed').style.display = 'none';
document.getElementById('band01_key4_filed').style.display = 'none';
document.getElementById('band01_phrase_filed').style.display = 'none';
}
else{
document.getElementById('band01_key_field').style.display = '';
document.getElementById('band01_key1_filed').style.display = '';
document.getElementById('band01_key2_filed').style.display = '';
document.getElementById('band01_key3_filed').style.display = '';
document.getElementById('band01_key4_filed').style.display = '';
document.getElementById('band01_phrase_filed').style.display = '';
}
document.getElementById('band01_radius_ipaddr_field').style.display = 'none';
document.getElementById('band01_radius_port_field').style.display = 'none';
document.getElementById('band01_radius_key_field').style.display = 'none';
}
}
else if(value == 'psk' || value == 'psk2' || value == 'sae' || value == 'pskpsk2' || value == 'psk2sae'
|| value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
if(unit == '0'){
document.getElementById('band0_crypto_field').style.display = '';
if(value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
document.getElementById('band0_wpa_psk_key_field').style.display = 'none';
}
else{
document.getElementById('band0_wpa_psk_key_field').style.display = '';
}
if(value == 'psk' || value == 'wpa'){
document.getElementById('band0_mfp_field').style.display = 'none';
}
else{
document.getElementById('band0_mfp_field').style.display = '';
}
document.getElementById('band0_gtk_field').style.display = '';
document.getElementById('band0_wep_x_field').style.display = 'none';
document.getElementById('band0_key_field').style.display = 'none';
document.getElementById('band0_key1_filed').style.display = 'none';
document.getElementById('band0_key2_filed').style.display = 'none';
document.getElementById('band0_key3_filed').style.display = 'none';
document.getElementById('band0_key4_filed').style.display = 'none';
document.getElementById('band0_phrase_filed').style.display = 'none';
if(value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
document.getElementById('band0_radius_ipaddr_field').style.display = '';
document.getElementById('band0_radius_port_field').style.display = '';
document.getElementById('band0_radius_key_field').style.display = '';
}
else{
document.getElementById('band0_radius_ipaddr_field').style.display = 'none';
document.getElementById('band0_radius_port_field').style.display = 'none';
document.getElementById('band0_radius_key_field').style.display = 'none';
}
genWpaCrypto('0', value);
genMFP('0', value, '<% nvram_get("wl0_mfp");%>');
}
else if(unit == '1'){
document.getElementById('band1_crypto_field').style.display = '';
if(value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
document.getElementById('band1_wpa_psk_key_field').style.display = 'none';
}
else{
document.getElementById('band1_wpa_psk_key_field').style.display = '';
}
if(value == 'psk' || value == 'wpa'){
document.getElementById('band1_mfp_field').style.display = 'none';
}
else{
document.getElementById('band1_mfp_field').style.display = '';
}
document.getElementById('band1_gtk_field').style.display = '';
document.getElementById('band1_wep_x_field').style.display = 'none';
document.getElementById('band1_key_field').style.display = 'none';
document.getElementById('band1_key1_filed').style.display = 'none';
document.getElementById('band1_key2_filed').style.display = 'none';
document.getElementById('band1_key3_filed').style.display = 'none';
document.getElementById('band1_key4_filed').style.display = 'none';
document.getElementById('band1_phrase_filed').style.display = 'none';
if(value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
document.getElementById('band1_radius_ipaddr_field').style.display = '';
document.getElementById('band1_radius_port_field').style.display = '';
document.getElementById('band1_radius_key_field').style.display = '';
}
else{
document.getElementById('band1_radius_ipaddr_field').style.display = 'none';
document.getElementById('band1_radius_port_field').style.display = 'none';
document.getElementById('band1_radius_key_field').style.display = 'none';
}
genWpaCrypto('1', value);
genMFP('1', value, '<% nvram_get("wl1_mfp");%>');
}
else if(unit == '01'){
document.getElementById('band01_crypto_field').style.display = '';
if(value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
document.getElementById('band01_wpa_psk_key_field').style.display = 'none';
}
else{
document.getElementById('band01_wpa_psk_key_field').style.display = '';
}
if(value == 'psk' || value == 'wpa'){
document.getElementById('band01_mfp_field').style.display = 'none';
}
else{
document.getElementById('band01_mfp_field').style.display = '';
}
document.getElementById('band01_gtk_field').style.display = '';
document.getElementById('band01_wep_x_field').style.display = 'none';
document.getElementById('band01_key_field').style.display = 'none';
document.getElementById('band01_key1_filed').style.display = 'none';
document.getElementById('band01_key2_filed').style.display = 'none';
document.getElementById('band01_key3_filed').style.display = 'none';
document.getElementById('band01_key4_filed').style.display = 'none';
document.getElementById('band01_phrase_filed').style.display = 'none';
if(value == 'wpa' || value == 'wpa2' || value == 'wpawpa2'){
document.getElementById('band01_radius_ipaddr_field').style.display = '';
document.getElementById('band01_radius_port_field').style.display = '';
document.getElementById('band01_radius_key_field').style.display = '';
}
else{
document.getElementById('band01_radius_ipaddr_field').style.display = 'none';
document.getElementById('band01_radius_port_field').style.display = 'none';
document.getElementById('band01_radius_key_field').style.display = 'none';
}
genWpaCrypto('01', value);
genMFP('01', value, '<% nvram_get("wl0_mfp");%>');
}
}
else if(value == 'shared'){
if(unit == '0'){
document.getElementById('band0_crypto_field').style.display = 'none';
document.getElementById('band0_wpa_psk_key_field').style.display = 'none';
document.getElementById('band0_mfp_field').style.display = 'none';
document.getElementById('band0_gtk_field').style.display = 'none';
document.getElementById('band0_wep_x_field').style.display = '';
document.getElementById('band0_key_field').style.display = '';
document.getElementById('band0_key1_filed').style.display = '';
document.getElementById('band0_key2_filed').style.display = '';
document.getElementById('band0_key3_filed').style.display = '';
document.getElementById('band0_key4_filed').style.display = '';
document.getElementById('band0_phrase_filed').style.display = '';
document.getElementById('band0_radius_ipaddr_field').style.display = 'none';
document.getElementById('band0_radius_port_field').style.display = 'none';
document.getElementById('band0_radius_key_field').style.display = 'none';
}
else if(unit == '1'){
document.getElementById('band1_crypto_field').style.display = 'none';
document.getElementById('band1_wpa_psk_key_field').style.display = 'none';
document.getElementById('band1_mfp_field').style.display = 'none';
document.getElementById('band1_gtk_field').style.display = 'none';
document.getElementById('band1_wep_x_field').style.display = '';
document.getElementById('band1_key_field').style.display = '';
document.getElementById('band1_key1_filed').style.display = '';
document.getElementById('band1_key2_filed').style.display = '';
document.getElementById('band1_key3_filed').style.display = '';
document.getElementById('band1_key4_filed').style.display = '';
document.getElementById('band1_phrase_filed').style.display = '';
document.getElementById('band1_radius_ipaddr_field').style.display = 'none';
document.getElementById('band1_radius_port_field').style.display = 'none';
document.getElementById('band1_radius_key_field').style.display = 'none';
}
else if(unit == '01'){
document.getElementById('band01_crypto_field').style.display = 'none';
document.getElementById('band01_wpa_psk_key_field').style.display = 'none';
document.getElementById('band01_mfp_field').style.display = 'none';
document.getElementById('band01_gtk_field').style.display = 'none';
document.getElementById('band01_wep_x_field').style.display = '';
document.getElementById('band01_key_field').style.display = '';
document.getElementById('band01_key1_filed').style.display = '';
document.getElementById('band01_key2_filed').style.display = '';
document.getElementById('band01_key3_filed').style.display = '';
document.getElementById('band01_key4_filed').style.display = '';
document.getElementById('band01_phrase_filed').style.display = '';
document.getElementById('band01_radius_ipaddr_field').style.display = 'none';
document.getElementById('band01_radius_port_field').style.display = 'none';
document.getElementById('band01_radius_key_field').style.display = 'none';
}
}else if(value == 'radius'){
if(unit == '0'){
document.getElementById('band0_crypto_field').style.display = 'none';
document.getElementById('band0_wpa_psk_key_field').style.display = 'none';
document.getElementById('band0_mfp_field').style.display = 'none';
document.getElementById('band0_gtk_field').style.display = 'none';
document.getElementById('band0_wep_x_field').style.display = 'none';
document.getElementById('band0_key_field').style.display = 'none';
document.getElementById('band0_key1_filed').style.display = 'none';
document.getElementById('band0_key2_filed').style.display = 'none';
document.getElementById('band0_key3_filed').style.display = 'none';
document.getElementById('band0_key4_filed').style.display = 'none';
document.getElementById('band0_phrase_filed').style.display = 'none';
document.getElementById('band0_radius_ipaddr_field').style.display = '';
document.getElementById('band0_radius_port_field').style.display = '';
document.getElementById('band0_radius_key_field').style.display = '';
}
else if(unit == '1'){
document.getElementById('band1_crypto_field').style.display = 'none';
document.getElementById('band1_wpa_psk_key_field').style.display = 'none';
document.getElementById('band1_mfp_field').style.display = 'none';
document.getElementById('band1_gtk_field').style.display = 'none';
document.getElementById('band1_wep_x_field').style.display = 'none';
document.getElementById('band1_key_field').style.display = 'none';
document.getElementById('band1_key1_filed').style.display = 'none';
document.getElementById('band1_key2_filed').style.display = 'none';
document.getElementById('band1_key3_filed').style.display = 'none';
document.getElementById('band1_key4_filed').style.display = 'none';
document.getElementById('band1_phrase_filed').style.display = 'none';
document.getElementById('band1_radius_ipaddr_field').style.display = '';
document.getElementById('band1_radius_port_field').style.display = '';
document.getElementById('band1_radius_key_field').style.display = '';
}
else if(unit == '01'){
document.getElementById('band01_crypto_field').style.display = 'none';
document.getElementById('band01_wpa_psk_key_field').style.display = 'none';
document.getElementById('band01_mfp_field').style.display = 'none';
document.getElementById('band01_gtk_field').style.display = 'none';
document.getElementById('band01_wep_x_field').style.display = 'none';
document.getElementById('band01_key_field').style.display = 'none';
document.getElementById('band01_key1_filed').style.display = 'none';
document.getElementById('band01_key2_filed').style.display = 'none';
document.getElementById('band01_key3_filed').style.display = 'none';
document.getElementById('band01_key4_filed').style.display = 'none';
document.getElementById('band01_phrase_filed').style.display = 'none';
document.getElementById('band01_radius_ipaddr_field').style.display = '';
document.getElementById('band01_radius_port_field').style.display = '';
document.getElementById('band01_radius_key_field').style.display = '';
}
}
}
function genWpaCrypto(unit, authType){
var option = '';
if(authType == 'psk' || authType == 'wpa'){
option += '<option value="tkip">TKIP</option>';
}
else if(authType == 'psk2' || authType == 'wpa2' || authType == 'sae' || authType == 'psk2sae'){
option += '<option value="aes">AES</option>';
}
else if(authType == 'pskpsk2' || authType == 'wpawpa2'){
option += '<option value="aes">AES</option>';
option += '<option value="tkip+aes">TKIP+AES</option>';
}
if(unit == '0'){
document.querySelector('[name="band0_crypto"]').innerHTML = option;
}
else if(unit == '1'){
document.querySelector('[name="band1_crypto"]').innerHTML = option;
}
else if(unit == '01'){
document.querySelector('[name="band01_crypto"]').innerHTML = option;
}
}
function genMFP(unit , authType, mfpValue){
var option = '';
if(authType == 'psk2' || authType == 'wpa2'){
option += '<option value="0"><#4072#></option>';
option += '<option value="1"><#4128#></option>';
option += '<option value="2"><#4129#></option>';
}
else if(authType == 'sae'){
option += '<option value="2"><#4129#></option>';
}
else if(authType == 'psk2sae'){
option += '<option value="1"><#4128#></option>';
option += '<option value="2"><#4129#></option>';
}
else if(authType == 'pskpsk2' || authType == 'wpawpa2'){
option += '<option value="0"><#4072#></option>';
option += '<option value="1"><#4128#></option>';
}
if(unit == '0'){
document.querySelector('[name="wl0_mfp"]').innerHTML = option;
if(document.querySelector('[name="wl0_mfp"]').querySelector('[value="'+mfpValue+'"]')){
document.querySelector('[name="wl0_mfp"]').value = mfpValue;
}
}
else if(unit == '1'){
document.querySelector('[name="wl1_mfp"]').innerHTML = option;
if(document.querySelector('[name="wl1_mfp"]').querySelector('[value="'+mfpValue+'"]')){
document.querySelector('[name="wl1_mfp"]').value = mfpValue;
}
}
else if(unit == '01'){
document.querySelector('[name="wl01_mfp"]').innerHTML = option;
if(document.querySelector('[name="wl01_mfp"]').querySelector('[value="'+mfpValue+'"]')){
document.querySelector('[name="wl01_mfp"]').value = mfpValue;
}
}
}
function handleAcsDfs(channel){
if(channel == '0' && (wl_channel_list_5g.indexOf('56') != -1 || wl_channel_list_5g.indexOf('100') != -1)){
document.getElementById('band1_dfs_checkbox').style.display = '';
}
else{
document.getElementById('band1_dfs_checkbox').style.display = 'none';
}
}
function handleAcsCh13(channel){
if(acs_ch13_support && channel == '0'){
document.getElementById('band0_acs_ch13_checkbox').style.display = '';
}
else{
document.getElementById('band0_acs_ch13_checkbox').style.display = 'none';
}
}
</script>
</head>
<body onload="initial();" onunLoad="return unload_body();" class="bg">
<div id="TopBanner"></div>
<div id="Loading" class="popup_bg"></div>
<div id="hiddenMask" class="popup_bg">
<table cellpadding="4" cellspacing="0" id="dr_sweet_advise" class="dr_sweet_advise" align="center">
<tr>
<td>
<div class="drword" id="drword"><#467#> <#464#>...
<br/>
<div id="disconnect_hint" style="display:none;"><#465#></div>
<br/>
</div>
<div id="wireless_client_detect" style="margin-left:10px;position:absolute;display:none;width:400px;">
<img src="images/loading.gif">
<div style="margin:-55px 0 0 75px;"><#791#></div>
</div>
<div class="drImg"><img src="images/alertImg.png"></div>
<div style="height:100px; "></div>
</td>
</tr>
</table>
<!--[if lte IE 6.5]><iframe class="hackiframe"></iframe><![endif]-->
</div>
<iframe name="hidden_frame" id="hidden_frame" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="form" action="/start_apply2.htm" target="hidden_frame">
<input type="hidden" name="productid" value="<% nvram_get("productid"); %>">
<input type="hidden" name="current_page" value="Advanced_Wireless_Content.asp">
<input type="hidden" name="next_page" value="Advanced_Wireless_Content.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_mode" value="apply_new">
<input type="hidden" name="action_script" value="restart_wireless">
<input type="hidden" name="action_wait" value="5">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="wl_country_code" value="<% nvram_get("wl0_country_code"); %>" disabled>
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="wps_mode" value="<% nvram_get("wps_mode"); %>">
<input type="hidden" name="wps_config_state" value="<% nvram_get("wps_config_state"); %>">
<input type="hidden" name="wl_key1_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key1"); %>">
<input type="hidden" name="wl_key2_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key2"); %>">
<input type="hidden" name="wl_key3_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key3"); %>">
<input type="hidden" name="wl_key4_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key4"); %>">
<input type="hidden" name="wl_phrase_x_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_phrase_x"); %>">
<input type="hidden" maxlength="15" size="15" name="x_RegulatoryDomain" value="<% nvram_get("x_RegulatoryDomain"); %>" readonly="1">
<input type="hidden" name="wl_gmode_protection" value="<% nvram_get("wl_gmode_protection"); %>">
<input type="hidden" name="wl_wme" value="<% nvram_get("wl_wme"); %>">
<input type="hidden" name="wl_mode_x" value="<% nvram_get("wl_mode_x"); %>">
<input type="hidden" name="wl_nctrlsb_old" value="<% nvram_get("wl_nctrlsb"); %>">
<input type="hidden" name="wl_key_type" value='<% nvram_get("wl_key_type"); %>'> <input type="hidden" name="wl_channel_orig" value='<% nvram_get("wl_channel"); %>'>
<input type="hidden" name="wl_edmg_channel_orig" value='<% nvram_get("wl_edmg_channel"); %>' disabled>
<input type="hidden" name="AUTO_CHANNEL" value='<% nvram_get("AUTO_CHANNEL"); %>'>
<input type="hidden" name="wl_wep_x_orig" value='<% nvram_get("wl_wep_x"); %>'>
<input type="hidden" name="wl_optimizexbox" value='<% nvram_get("wl_optimizexbox"); %>'>
<input type="hidden" name="wl_bw_160" value='<% nvram_get("wl_bw_160"); %>'>
<input type="hidden" name="wl_subunit" value='-1'>
<input type="hidden" name="acs_dfs" value='<% nvram_get("acs_dfs"); %>'>
<input type="hidden" name="acs_band1" value='<% nvram_get("acs_band1"); %>'>
<input type="hidden" name="acs_band3" value='<% nvram_get("acs_band3"); %>'>
<input type="hidden" name="acs_ch13" value='<% nvram_get("acs_ch13"); %>'>
<input type="hidden" name="wps_enable" value="<% nvram_get("wps_enable"); %>">
<input type="hidden" name="wps_band" value="<% nvram_get("wps_band_x"); %>" disabled>
<input type="hidden" name="wps_multiband" value="<% nvram_get("wps_multiband"); %>" disabled>
<input type="hidden" name="w_Setting" value="1">
<input type="hidden" name="wl_rateset" value="<% nvram_get("wl_rateset"); %>" >
<input type="hidden" name="w_apply" value="1">
<input type="hidden" name="smart_connect_x" value="<% nvram_get("smart_connect_x"); %>">
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
<td align="left" valign="top" >
<table width="760px" border="0" cellpadding="4" cellspacing="0" class="FormTitle" id="FormTitle">
<tbody>
<tr>
<td bgcolor="#4D595D" valign="top">
<div>&nbsp;</div>
<div class="formfonttitle"><#478#> - <#479#></div>
<div style="margin:10px 0 10px 5px;" class="splitLine"></div>
<div class="formfontdesc"><#1026#></div>
<div id="lantiq_ready" style="display:none;color:#FC0;margin-left:5px;font-size:13px;">Wireless is setting...</div>
<table width="99%" border="1" align="center" cellpadding="4" cellspacing="0" id="WLgeneral" class="FormTable">
<tr id="smartcon_enable_field" style="display:none;">
<th width="30%"><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0,27);"><#3356#></a></th>
<td>
<div id="smartcon_enable_block" style="display:none;">
<span style="color:#FFF;" id="smart_connect_enable_word">&nbsp;&nbsp;</span>
<input type="button" name="enableSmartConbtn" id="enableSmartConbtn" value="" class="button_gen" onClick="enableSmartCon();">
<br>
</div>
<div id="radio_smartcon_enable" class="left" style="width: 94px;display:table-cell;"></div><div id="smartcon_rule_link" style="display:table-cell; vertical-align: middle;"><a href="Advanced_Smart_Connect.asp" style="font-family:Lucida Console;color:#FC0;text-decoration:underline;cursor:pointer;"><#3359#></a></div>
<div class="clear"></div>
<script type="text/javascript">
var flag = '<% get_parameter("flag"); %>';
var smart_connect_flag_t;
if(flag == '')
smart_connect_flag_t = '<% nvram_get("smart_connect_x"); %>';
else
smart_connect_flag_t = flag;
$('#radio_smartcon_enable').iphoneSwitch( smart_connect_flag_t > 0,
function() {
if(based_modelid != "RT-AC5300" && based_modelid != "GT-AC5300" && based_modelid !="RT-AC3200" && based_modelid != "RT-AC88U" && based_modelid != "RT-AC86U" && based_modelid != "GT-AC2900" && based_modelid != "RT-AC3100" && based_modelid != "BLUECAVE" && based_modelid != "MAP-AC1750" && based_modelid != "RT-AC95U" && based_modelid != "RT-AX89U" && based_modelid != "GT-AXY16000")
enableSmartCon(1);
else{
if(document.form.smart_connect_t.value)
enableSmartCon(document.form.smart_connect_t.value);
else
enableSmartCon(smart_connect_flag_t);
}
},
function() {
enableSmartCon(0);
}
);
</script>
</td>
</tr>
<tr id="smart_connect_field" style="display:none">
<th><#3351#></th>
<td id="smart_connect_switch">
<select name="smart_connect_t" class="input_option" onChange="enableSmartCon(this.value);">
<option class="content_input_fd" value="1" >Dual-Band Smart Connect (2.4 GHz and 5 GHz)</optio>
</select>
</td>
</tr>
<tr id="wl_unit_field" style="display:none">
<th><#2466#></th>
<td>
<select name="wl_unit" class="input_option" onChange="_change_wl_unit(this.value);">
<option class="content_input_fd" value="0" <% nvram_match("wl_unit", "0","selected"); %>>2.4 GHz</option>
<option class="content_input_fd" value="1" <% nvram_match("wl_unit", "1","selected"); %>>5 GHz</option>
<option class="content_input_fd" value="1" <% nvram_match("wl_unit", "2","selected"); %>>5GHz-2</option>
</select>
</td>
</tr>
<!--tr id="wl_subunit_field" style="display:none">
<th>Multiple SSID index</th>
<td>
<select name="wl_subunit" class="input_option" onChange="change_wl_unit();">
<option class="content_input_fd" value="0" <% nvram_match("wl_subunit", "0","selected"); %>>Primary</option>
</select>
<select id="wl_bss_enabled_field" name="wl_bss_enabled" class="input_option" onChange="mbss_switch();">
<option class="content_input_fd" value="0" <% nvram_match("wl_bss_enabled", "0","selected"); %>><#4072#></option>
<option class="content_input_fd" value="1" <% nvram_match("wl_bss_enabled", "1","selected"); %>><#4071#></option>
</select>
</td>
</tr-->
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 1);"><#660#></a></th>
<td id="ssid_setting">
<input type="text" maxlength="33" class="input_32_table" id="wl_ssid" name="wl_ssid" value="<% nvram_get("wl_ssid"); %>" onkeypress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="wl_closed_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 2);"><#4094#></a></th>
<td>
<input type="radio" value="1" name="wl_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl_closed', '1')" <% nvram_match("wl_closed", "1", "checked"); %>><#275#>
<input type="radio" value="0" name="wl_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl_closed', '0')" <% nvram_match("wl_closed", "0", "checked"); %>><#274#>
<span id="WPS_hideSSID_hint" style="display:none;"></span>
<br>
<span id="dwb_band_hide_hint"><#59#></span>
</td>
</tr>
<tr style="display:none">
<th><a id="band0_mode_desc" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 4);"><#4135#></a></th>
<td>
<select name="wl_nmode_x" class="input_option" onChange="wireless_mode_change(this);">
<option value="0" <% nvram_match("wl_nmode_x", "0","selected"); %>><#241#></option>
<option value="1" <% nvram_match("wl_nmode_x", "1","selected"); %>>N Only</option>
<option value="2" <% nvram_match("wl_nmode_x", "2","selected"); %>>Legacy</option>
<option value="8" <% nvram_match("wl_nmode_x", "8","selected"); %>>N/AC Mixed</option>
</select>
<span id="wl_optimizexbox_span" style="display:none"><input type="checkbox" name="wl_optimizexbox_ckb" id="wl_optimizexbox_ckb" value="<% nvram_get("wl_optimizexbox"); %>" onclick="document.form.wl_optimizexbox.value=(this.checked==true)?1:0;"> <#4137#></input></span>
<span id="wl_gmode_checkbox" style="display:none;"><input type="checkbox" name="wl_gmode_check" id="wl_gmode_check" value="" onClick="wl_gmode_protection_check();"> <#4136#></input></span>
<span id="wl_rateset_checkbox" style="display:none;"><input type="checkbox" name="wl_rateset_check" id="wl_rateset_check" value="<% nvram_get("wl_rateset"); %>" onClick="wl_disable11b(this);">Disable 11b</span>
<span id="wl_nmode_x_hint" style="display:none;"><br><#4183#><br></span>
<span id="wl_NOnly_note" style="display:none;"></span>
<!-- [N only] is not compatible with current guest network authentication method(TKIP or WEP), Please go to <a id="gn_link" href="/Guest_network.asp?af=wl_NOnly_note" target="_blank" style="color:#FFCC00;font-family:Lucida Console;text-decoration:underline;">guest network</a> and change the authentication method. -->
</td>
</tr>
<tr id="he_mode_field" style="display:none">
<th>
<a id="he_mode_text" class="hintstyle" href="javascript:void(0);" onClick=""><#4046#></a>
</th>
<td>
<div style="display:flex;align-items: center;">
<select name="wl_11ax" class="input_option" onChange="he_frame_mode(this);">
<option value="1" <% nvram_match("wl_11ax", "1" ,"selected"); %> ><#4071#></option>
<option value="0" <% nvram_match("wl_11ax", "0" ,"selected"); %> ><#4072#></option>
</select>
<span id="he_mode_faq" style="padding: 0 10px"><#4047#></span>
</div>
</td>
</tr>
<tr id="mbo_field" style="display:none">
<th>
<a class="hintstyle"><#4001#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="wl_mbo_enable" class="input_option" onChange="handleMFP();">
<option value="1" <% nvram_match("wl_mbo_enable", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl_mbo_enable", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="twt_field" style="display:none">
<th>
<a class="hintstyle"><#4062#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="wl_twt" class="input_option">
<option value="1" <% nvram_match("wl_twt", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl_twt", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="wl_bw_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 14);"><#4019#></a></th>
<td>
<select name="wl_bw" class="input_option" onChange="insertExtChannelOption();">
<option class="content_input_fd" value="1" <% nvram_match("wl_bw", "1","selected"); %>>20/40/80 MHz</option>
<option class="content_input_fd" value="0" <% nvram_match("wl_bw", "0","selected"); %>>20 MHz</option>
<option class="content_input_fd" value="2" <% nvram_match("wl_bw", "2","selected"); %>>40 MHz</option>
<option class="content_input_fd" value="3" <% nvram_match("wl_bw", "3","selected"); %>>80 MHz</option>
</select>
<span id="enable_160_field" style="display:none"><input type="checkbox" onclick="enable_160MHz(this);" id="enable_160mhz">Enable 160 MHz</span>
</td>
</tr>
<tr id="wl_channel_field" style="display:none">
<th><a id="wl_channel_select" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 3);"><#951#></a></th>
<td>
<select name="wl_channel" class="input_option" onChange="high_power_auto_channel();insertExtChannelOption();"></select>
<span id="auto_channel" style="display:none;margin-left:10px;"></span><br>
<div style="margin-top:5px">
<div><span id="dfs_checkbox" style="display:none"><input type="checkbox" onClick="check_DFS_support(this);" name="acs_dfs_checkbox" <% nvram_match("acs_dfs", "1", "checked"); %>><#4039#></input></span></div>
<div><span id="acs_band1_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_band1_support(this);" <% nvram_match("acs_band1", "1", "checked"); %>><#4037#></input></span></div>
<div><span id="acs_band3_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_band3_support(this);" <% nvram_match("acs_band3", "1", "checked"); %>><#4038#></input></span></div>
<div><span id="acs_ch13_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_ch13_support(this);" <% nvram_match("acs_ch13", "1", "checked"); %>><#4036#></input></span></div>
</div>
</td>
</tr>
<tr id="wl_edmg_field" style="display:none">
<th><a id="wl_edmg_select" class="hintstyle" href="javascript:void(0);">EDMG channel</a></th>
<td>
<select name="wl_edmg_channel" class="input_option">
<option class="content_input_fd" value="0" <% nvram_match("wl_edmg_channel", "0","selected"); %>><#241#></option>
</select>
<span id="auto_edmg_channel" style="display:none;margin-left:10px;"></span><br>
</td>
</tr>
<tr id="wl_nctrlsb_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);"><#4043#></a></th>
<td>
<select name="wl_nctrlsb" class="input_option">
<option value="lower" <% nvram_match("wl_nctrlsb", "lower", "selected"); %>>lower</option>
<option value="upper"<% nvram_match("wl_nctrlsb", "upper", "selected"); %>>upper</option>
</select>
</td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 5);"><#4004#></a></th>
<td>
<select name="wl_auth_mode_x" class="input_option" onChange="authentication_method_change(this);">
<option value="open" <% nvram_match("wl_auth_mode_x", "open", "selected"); %>>Open System</option>
<option value="shared" <% nvram_match("wl_auth_mode_x", "shared", "selected"); %>>Shared Key</option>
<option value="psk" <% nvram_match("wl_auth_mode_x", "psk", "selected"); %>>WPA-Personal</option>
<option value="psk2" <% nvram_match("wl_auth_mode_x", "psk2", "selected"); %>>WPA2-Personal</option>
<option value="sae" <% nvram_match("wl_auth_mode_x", "sae", "selected"); %>>WPA3-Personal</option>
<option value="pskpsk2" <% nvram_match("wl_auth_mode_x", "pskpsk2","selected"); %>>WPA-Auto-Personal</option>
<option value="psk2sae" <% nvram_match("wl_auth_mode_x", "psk2sae","selected"); %>>WPA2/WPA3-Personal</option>
<option value="wpa" <% nvram_match("wl_auth_mode_x", "wpa", "selected"); %>>WPA-Enterprise</option>
<option value="wpa2" <% nvram_match("wl_auth_mode_x", "wpa2", "selected"); %>>WPA2-Enterprise</option>
<option value="wpawpa2" <% nvram_match("wl_auth_mode_x", "wpawpa2","selected"); %>>WPA-Auto-Enterprise</option>
<option value="radius" <% nvram_match("wl_auth_mode_x", "radius", "selected"); %>>Radius with 802.1x</option>
</select>
<div class="setup_help_icon" style="display:none;"></div>
</td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 6);"><#956#></a></th>
<td>
<select name="wl_crypto" class="input_option">
<option value="aes" <% nvram_match("wl_crypto", "aes", "selected"); %>>AES</option>
<option value="tkip+aes" <% nvram_match("wl_crypto", "tkip+aes", "selected"); %>>TKIP+AES</option>
</select>
</td>
</tr>
<tr id="wpa_psk_key_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 7);"><#4146#></a></th>
<td>
<div class="wpa_psk_container">
<div><input type="text" name="wl_wpa_psk" maxlength="64" class="input_32_table" value="<% nvram_get("wl_wpa_psk"); %>" autocorrect="off" autocapitalize="off"></div>
</div>
</td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 9);"><#4069#></a></th>
<td>
<select name="wl_wep_x" class="input_option" onChange="wepCryptoChange(this);">
<option value="0" <% nvram_match("wl_wep_x", "0", "selected"); %>><#950#></option>
<option value="1" <% nvram_match("wl_wep_x", "1", "selected"); %>>WEP-64bits</option>
<option value="2" <% nvram_match("wl_wep_x", "2", "selected"); %>>WEP-128bits</option>
</select>
<span name="key_des"></span>
</td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 10);"><#952#></a></th>
<td>
<select name="wl_key" class="input_option" onChange="wep_key_index_change(this);">
<option value="1" <% nvram_match("wl_key", "1","selected"); %>>1</option>
<option value="2" <% nvram_match("wl_key", "2","selected"); %>>2</option>
<option value="3" <% nvram_match("wl_key", "3","selected"); %>>3</option>
<option value="4" <% nvram_match("wl_key", "4","selected"); %>>4</option>
</select>
</td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4064#></th>
<td><input type="text" name="wl_key1" id="wl_key1" maxlength="27" class="input_25_table" value="<% nvram_get("wl_key1"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4065#></th>
<td><input type="text" name="wl_key2" id="wl_key2" maxlength="27" class="input_25_table" value="<% nvram_get("wl_key2"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4066#></th>
<td><input type="text" name="wl_key3" id="wl_key3" maxlength="27" class="input_25_table" value="<% nvram_get("wl_key3"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4067#></th>
<td><input type="text" name="wl_key4" id="wl_key4" maxlength="27" class="input_25_table" value="<% nvram_get("wl_key4"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 8);"><#4142#></a></th>
<td>
<input type="text" name="wl_phrase_x" maxlength="64" class="input_32_table" value="<% nvram_get("wl_phrase_x"); %>" onKeyUp="return is_wlphrase('WLANConfig11b', 'wl_phrase_x', this);" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,1);">
<#3996#></a>
</th>
<td>
<input type="text" maxlength="39" class="input_32_table" name="wl_radius_ipaddr" value='<% nvram_get("wl_radius_ipaddr"); %>' onKeyPress="return validator.isIPAddr(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,2);">
<#4000#></a>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" name="wl_radius_port" value='<% nvram_get("wl_radius_port"); %>' onkeypress="return validator.isNumber(this,event)" autocorrect="off" autocapitalize="off"/>
</td>
</tr>
<tr style="display:none">
<th >
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,3);">
<#3998#></a>
</th>
<td>
<input type="password" maxlength="64" class="input_32_table" name="wl_radius_key" value="<% nvram_get("wl_radius_key"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr style="display:none">
<th><#4127#></th>
<td>
<select name="wl_mfp" class="input_option" onchange="handleMFP();">
<option value="0" <% nvram_match("wl_mfp", "0", "selected"); %>><#4072#></option>
<option value="1" <% nvram_match("wl_mfp", "1", "selected"); %>><#4128#></option>
<option value="2" <% nvram_match("wl_mfp", "2", "selected"); %>><#4129#></option>
</select>
<span id="mbo_notice_wpa3" style="display:none">*If the Authentication Method is WPA3-Personal, the Protected Management Frames will be Required.</span>
<span id="mbo_notice_combo" style="display:none">*If the Authentication Method is WPA2/WPA3-Personal, the Protected Management Frames will be Capable.</span>
<span id="mbo_notice" style="display:none"><#4002#></span>
</td>
</tr>
<tr style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 11);"><#4157#></a></th>
<td><input type="text" maxlength="7" name="wl_wpa_gtk_rekey" class="input_6_table" value='<% nvram_get("wl_wpa_gtk_rekey"); %>' onKeyPress="return validator.isNumber(this,event);" autocorrect="off" autocapitalize="off"></td>
</tr>
</table>
<table width="99%" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable" id="band01_table">
<thead>
<tr id="band01_title_field">
<td colspan="2">2.4/5 GHz</td>
</tr>
</thead>
<tr id="band01_ssid_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 1);"><#660#></a></th>
<td>
<input type="text" maxlength="32" class="input_32_table" name="band01_ssid" value="<% nvram_get("wl0_ssid"); %>" onkeypress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band01_closed_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 2);"><#4094#></a></th>
<td>
<input type="radio" value="1" name="band01_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl0_closed', '1')" <% nvram_match("wl0_closed", "1", "checked"); %>><#275#>
<input type="radio" value="0" name="band01_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl0_closed', '0')" <% nvram_match("wl0_closed", "0", "checked"); %>><#274#>
<!-- <span id="dwb_band_hide_hint"><#59#></span> -->
</td>
</tr>
<tr>
<th><a id="band01_mode_desc" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 4);"><#4135#></a></th>
<td>
<select name="band01_nmode_x" class="input_option" onChange="genAuthMethod('01', this.value);">
<option value="0" <% nvram_match("wl0_nmode_x", "0","selected"); %>><#241#></option>
<option value="8" <% nvram_match("wl0_nmode_x", "8","selected"); %>>N/AC Mixed</option>
<option value="2" <% nvram_match("wl0_nmode_x", "2","selected"); %>>Legacy</option>
</select>
<span id="band01_rateset_checkbox"><input type="checkbox" name="band01_rateset_check" id="band01_rateset_check" value="<% nvram_get("wl0_rateset"); %>" onClick="band01_disable11b(this);">Disable 11b</span>
<!-- [N only] is not compatible with current guest network authentication method(TKIP or WEP), Please go to <a id="gn_link" href="/Guest_network.asp?af=wl_NOnly_note" target="_blank" style="color:#FFCC00;font-family:Lucida Console;text-decoration:underline;">guest network</a> and change the authentication method. -->
</td>
</tr>
<tr id="band01_he_mode_field" style="">
<th>
<a id="band01_he_mode_text" class="hintstyle" href="javascript:void(0);" onClick=""><#4046#></a>
</th>
<td>
<div style="display:flex;align-items: center;">
<select name="band01_11ax" class="input_option" onChange="he_frame_mode(this);">
<option value="1" <% nvram_match("wl0_11ax", "1" ,"selected"); %> ><#4071#></option>
<option value="0" <% nvram_match("wl0_11ax", "0" ,"selected"); %> ><#4072#></option>
</select>
<span id="band0_he_mode_faq" style="padding: 0 10px"><#4047#></span>
</div>
</td>
</tr>
<tr id="band01_mbo_field" style="">
<th>
<a class="hintstyle"><#4001#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="band01_mbo_enable" class="input_option" >
<option value="1" <% nvram_match("wl0_mbo_enable", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl0_mbo_enable", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="band01_twt_field" style="">
<th>
<a class="hintstyle"><#4062#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="band01_twt" class="input_option">
<option value="1" <% nvram_match("wl0_twt", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl0_twt", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 5);"><#4004#></a></th>
<td>
<select id="band01_auth_mode_x" name="band01_auth_mode_x" class="input_option" onChange="auth_mehtod_change('01', this.value);">
<option value="open" <% nvram_match("wl0_auth_mode_x", "open", "selected"); %>>Open System</option>
<option value="shared" <% nvram_match("wl0_auth_mode_x", "shared", "selected"); %>>Shared Key</option>
<option value="psk" <% nvram_match("wl0_auth_mode_x", "psk", "selected"); %>>WPA-Personal</option>
<option value="psk2" <% nvram_match("wl0_auth_mode_x", "psk2", "selected"); %>>WPA2-Personal</option>
<option value="sae" <% nvram_match("wl0_auth_mode_x", "sae", "selected"); %>>WPA3-Personal</option>
<option value="pskpsk2" <% nvram_match("wl0_auth_mode_x", "pskpsk2","selected"); %>>WPA-Auto-Personal</option>
<option value="psk2sae" <% nvram_match("wl0_auth_mode_x", "psk2sae","selected"); %>>WPA2/WPA3-Personal</option>
<option value="wpa" <% nvram_match("wl0_auth_mode_x", "wpa", "selected"); %>>WPA-Enterprise</option>
<option value="wpa2" <% nvram_match("wl0_auth_mode_x", "wpa2", "selected"); %>>WPA2-Enterprise</option>
<option value="wpawpa2" <% nvram_match("wl0_auth_mode_x", "wpawpa2","selected"); %>>WPA-Auto-Enterprise</option>
<option value="radius" <% nvram_match("wl0_auth_mode_x", "radius", "selected"); %>>Radius with 802.1x</option>
</select>
<div class="setup_help_icon" style="display:none;"></div>
</td>
</tr>
<tr id="band01_crypto_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 6);"><#956#></a></th>
<td>
<select name="band01_crypto" class="input_option">
<option value="aes" <% nvram_match("wl0_crypto", "aes", "selected"); %>>AES</option>
<option value="tkip+aes" <% nvram_match("wl0_crypto", "tkip+aes", "selected"); %>>TKIP+AES</option>
</select>
</td>
</tr>
<tr id="band01_wpa_psk_key_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 7);"><#4146#></a></th>
<td>
<div class="wpa_psk_container">
<div><input type="text" name="band01_wpa_psk" maxlength="64" class="input_32_table" value="" autocorrect="off" autocapitalize="off"></div>
</div>
</td>
</tr>
<tr id="band01_mfp_field" style="">
<th><#4127#></th>
<td>
<select name="wl01_mfp" class="input_option" onchange="handleMFP();">
<option value="0" <% nvram_match("wl0_mfp", "0", "selected"); %>><#4072#></option>
<option value="1" <% nvram_match("wl0_mfp", "1", "selected"); %>><#4128#></option>
<option value="2" <% nvram_match("wl0_mfp", "2", "selected"); %>><#4129#></option>
</select>
<span id="band01_mbo_notice_wpa3" style="display:none">*If the Authentication Method is WPA3-Personal, the Protected Management Frames will be Required.</span>
<span id="band01_mbo_notice_combo" style="display:none">*If the Authentication Method is WPA2/WPA3-Personal, the Protected Management Frames will be Capable.</span>
<span id="band01_mbo_notice" style="display:none"><#4002#></span>
</td>
</tr>
<tr id="band01_gtk_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 11);"><#4157#></a></th>
<td><input type="text" maxlength="7" name="band01_wpa_gtk_rekey" class="input_6_table" value='<% nvram_get("wl0_wpa_gtk_rekey"); %>' onKeyPress="return validator.isNumber(this,event);" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band01_wep_x_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 9);"><#4069#></a></th>
<td>
<select name="band01_wep_x" class="input_option" onChange="auth_mehtod_change('01', document.querySelector('[name=\'band01_auth_mode_x\']').value);">
<option value="0" <% nvram_match("wl0_wep_x", "0", "selected"); %>><#950#></option>
<option value="1" <% nvram_match("wl0_wep_x", "1", "selected"); %>>WEP-64bits</option>
<option value="2" <% nvram_match("wl0_wep_x", "2", "selected"); %>>WEP-128bits</option>
</select>
<span name="key_des"></span>
</td>
</tr>
<tr id="band01_key_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 10);"><#952#></a></th>
<td>
<select name="band01_key" class="input_option" onChange="wep_key_index_change(this);">
<option value="1" <% nvram_match("wl0_key", "1","selected"); %>>1</option>
<option value="2" <% nvram_match("wl0_key", "2","selected"); %>>2</option>
<option value="3" <% nvram_match("wl0_key", "3","selected"); %>>3</option>
<option value="4" <% nvram_match("wl0_key", "4","selected"); %>>4</option>
</select>
</td>
</tr>
<tr id="band01_key1_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4064#></th>
<td><input type="text" name="band01_key1" id="band01_key1" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key1"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band01_key2_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4065#></th>
<td><input type="text" name="band01_key2" id="band01_key2" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key2"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band01_key3_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4066#></th>
<td><input type="text" name="band01_key3" id="band01_key3" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key3"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band01_key4_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4067#></th>
<td><input type="text" name="band01_key4" id="band01_key4" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key4"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band01_phrase_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 8);"><#4142#></a></th>
<td>
<input type="text" name="band01_phrase_x" maxlength="64" class="input_32_table" value="<% nvram_get("wl0_phrase_x"); %>" onKeyUp="return is_wlphrase('WLANConfig11b', 'wl_phrase_x', this);" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band01_radius_ipaddr_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,1);">
<#3996#></a>
</th>
<td>
<input type="text" maxlength="39" class="input_32_table" name="band01_radius_ipaddr" value='<% nvram_get("wl0_radius_ipaddr"); %>' onKeyPress="return validator.isIPAddr(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band01_radius_port_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,2);">
<#4000#></a>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" name="band01_radius_port" value='<% nvram_get("wl0_radius_port"); %>' onkeypress="return validator.isNumber(this,event)" autocorrect="off" autocapitalize="off"/>
</td>
</tr>
<tr id="band01_radius_key_field" style="display:none">
<th >
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,3);">
<#3998#></a>
</th>
<td>
<input type="password" maxlength="64" class="input_32_table" name="band01_radius_key" value="<% nvram_get("wl0_radius_key"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
</table>
<table width="99%" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable">
<thead>
<tr id="band0_title_field">
<td colspan="2">2.4 GHz</td>
</tr>
</thead>
<tr id="band0_ssid_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 1);"><#660#></a></th>
<td>
<input type="text" maxlength="32" class="input_32_table" name="band0_ssid" value="<% nvram_get("wl0_ssid"); %>" onkeypress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band0_closed_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 2);"><#4094#></a></th>
<td>
<input type="radio" value="1" name="band0_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl0_closed', '1')" <% nvram_match("wl0_closed", "1", "checked"); %>><#275#>
<input type="radio" value="0" name="band0_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl0_closed', '0')" <% nvram_match("wl0_closed", "0", "checked"); %>><#274#>
<!-- <span id="dwb_band_hide_hint"><#59#></span> -->
</td>
</tr>
<tr id="band0_nmode_x_field">
<th><a id="band0_mode_desc" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 4);"><#4135#></a></th>
<td>
<select name="band0_nmode_x" class="input_option" onChange="genAuthMethod('0', this.value);">
<option value="0" <% nvram_match("wl0_nmode_x", "0","selected"); %>><#241#></option>
<option value="1" <% nvram_match("wl0_nmode_x", "1","selected"); %>>N Only</option>
<option value="2" <% nvram_match("wl0_nmode_x", "2","selected"); %>>Legacy</option>
</select>
<span id="band0_optimizexbox_span" style="display:none"><input type="checkbox" name="band0_optimizexbox_ckb" id="band0_optimizexbox_ckb" value="<% nvram_get("wl0_optimizexbox"); %>" onclick="document.form.wl_optimizexbox.value=(this.checked==true)?1:0;"> <#4137#></input></span>
<span id="band0_gmode_checkbox"><input type="checkbox" name="band0_gmode_check" id="band0_gmode_check" value="" onClick="wl_gmode_protection_check();"> <#4136#></input></span>
<span id="band0_rateset_checkbox" style="display:none;"><input type="checkbox" name="band0_rateset_check" id="band0_rateset_check" value="<% nvram_get("wl0_rateset"); %>" onClick="wl_disable11b(this);">Disable 11b</span>
<span id="band0_nmode_x_hint" style="display:none;"><br><#4183#><br></span>
<span id="band0_NOnly_note" style="display:none;"></span>
<!-- [N only] is not compatible with current guest network authentication method(TKIP or WEP), Please go to <a id="gn_link" href="/Guest_network.asp?af=wl_NOnly_note" target="_blank" style="color:#FFCC00;font-family:Lucida Console;text-decoration:underline;">guest network</a> and change the authentication method. -->
</td>
</tr>
<tr id="band0_he_mode_field" style="display:none">
<th>
<a id="band0_he_mode_text" class="hintstyle" href="javascript:void(0);" onClick=""><#4046#></a>
</th>
<td>
<div style="display:flex;align-items: center;">
<select name="band0_11ax" class="input_option" onChange="he_frame_mode(this);">
<option value="1" <% nvram_match("wl0_11ax", "1" ,"selected"); %> ><#4071#></option>
<option value="0" <% nvram_match("wl0_11ax", "0" ,"selected"); %> ><#4072#></option>
</select>
<span id="band0_he_mode_faq" style="padding: 0 10px"><#4047#></span>
</div>
</td>
</tr>
<tr id="band0_mbo_field" style="display:none">
<th>
<a class="hintstyle"><#4001#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="band0_mbo_enable" class="input_option" onChange="handleMFP();">
<option value="1" <% nvram_match("wl0_mbo_enable", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl0_mbo_enable", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="band0_twt_field" style="display:none">
<th>
<a class="hintstyle"><#4062#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="band0_twt" class="input_option">
<option value="1" <% nvram_match("wl0_twt", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl0_twt", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="band0_bandwidth_field">
<th><#4019#></th>
<td>
<select name="band0_bw" class="input_option" onChange="handle_bandwidth(0, this.value)">
<option value="1" <% nvram_match("wl0_bw", "1","selected"); %>>20/40 MHz</option>
<option value="0" <% nvram_match("wl0_bw", "0","selected"); %>>20 MHz</option>
<option value="2" <% nvram_match("wl0_bw", "2","selected"); %>>40 MHz</option>
</select>
</td>
</tr>
<tr id="band0_channel_field">
<th><a id="band0_channel_select" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 3);"><#951#></a></th>
<td>
<select name="band0_channel" class="input_option" onChange="high_power_auto_channel();insertExtChannelOption();genExtChannel('0', this.value, document.querySelector('[name=\'band0_bw\']').value);handleAcsCh13(this.value);"></select>
<span id="band0_auto_channel" style="display:none;margin-left:10px;"></span><br>
<div style="margin-top:5px">
<div><span id="band0_acs_ch13_checkbox" style="display:none;"><input id="band0_acs_ch13" type="checkbox" onClick="check_acs_ch13_support(this);" <% nvram_match("acs_ch13", "1", "checked"); %>><#4036#></input></span></div>
</div>
</td>
</tr>
<tr id="band0_nctrlsb_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);"><#4043#></a></th>
<td>
<select name="band0_nctrlsb" class="input_option">
<option value="lower" <% nvram_match("wl0_nctrlsb", "lower", "selected"); %>>lower</option>
<option value="upper"<% nvram_match("wl0_nctrlsb", "upper", "selected"); %>>upper</option>
</select>
</td>
</tr>
<tr id="band0_auth_mode_x_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 5);"><#4004#></a></th>
<td>
<select id="band0_auth_mode_x" name="band0_auth_mode_x" class="input_option" onChange="auth_mehtod_change(0, this.value);">
<option value="open" <% nvram_match("wl0_auth_mode_x", "open", "selected"); %>>Open System</option>
<option value="shared" <% nvram_match("wl0_auth_mode_x", "shared", "selected"); %>>Shared Key</option>
<option value="psk" <% nvram_match("wl0_auth_mode_x", "psk", "selected"); %>>WPA-Personal</option>
<option value="psk2" <% nvram_match("wl0_auth_mode_x", "psk2", "selected"); %>>WPA2-Personal</option>
<option value="sae" <% nvram_match("wl0_auth_mode_x", "sae", "selected"); %>>WPA3-Personal</option>
<option value="pskpsk2" <% nvram_match("wl0_auth_mode_x", "pskpsk2","selected"); %>>WPA-Auto-Personal</option>
<option value="psk2sae" <% nvram_match("wl0_auth_mode_x", "psk2sae","selected"); %>>WPA2/WPA3-Personal</option>
<option value="wpa" <% nvram_match("wl0_auth_mode_x", "wpa", "selected"); %>>WPA-Enterprise</option>
<option value="wpa2" <% nvram_match("wl0_auth_mode_x", "wpa2", "selected"); %>>WPA2-Enterprise</option>
<option value="wpawpa2" <% nvram_match("wl0_auth_mode_x", "wpawpa2","selected"); %>>WPA-Auto-Enterprise</option>
<option value="radius" <% nvram_match("wl0_auth_mode_x", "radius", "selected"); %>>Radius with 802.1x</option>
</select>
<div class="setup_help_icon" style="display:none;"></div>
</td>
</tr>
<tr id="band0_crypto_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 6);"><#956#></a></th>
<td>
<select name="band0_crypto" class="input_option">
<option value="aes" <% nvram_match("wl0_crypto", "aes", "selected"); %>>AES</option>
<option value="tkip+aes" <% nvram_match("wl0_crypto", "tkip+aes", "selected"); %>>TKIP+AES</option>
</select>
</td>
</tr>
<tr id="band0_wpa_psk_key_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 7);"><#4146#></a></th>
<td>
<div class="wpa_psk_container">
<div><input type="text" name="band0_wpa_psk" maxlength="64" class="input_32_table" value="" autocorrect="off" autocapitalize="off"></div>
</div>
</td>
</tr>
<tr id="band0_mfp_field" style="">
<th><#4127#></th>
<td>
<select name="wl0_mfp" class="input_option" onchange="handleMFP();">
<option value="0" <% nvram_match("wl0_mfp", "0", "selected"); %>><#4072#></option>
<option value="1" <% nvram_match("wl0_mfp", "1", "selected"); %>><#4128#></option>
<option value="2" <% nvram_match("wl0_mfp", "2", "selected"); %>><#4129#></option>
</select>
<span id="band0_mbo_notice_wpa3" style="display:none">*If the Authentication Method is WPA3-Personal, the Protected Management Frames will be Required.</span>
<span id="band0_mbo_notice_combo" style="display:none">*If the Authentication Method is WPA2/WPA3-Personal, the Protected Management Frames will be Capable.</span>
<span id="band0_mbo_notice" style="display:none"><#4002#></span>
</td>
</tr>
<tr id="band0_gtk_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 11);"><#4157#></a></th>
<td><input type="text" maxlength="7" name="band0_wpa_gtk_rekey" class="input_6_table" value='<% nvram_get("wl0_wpa_gtk_rekey"); %>' onKeyPress="return validator.isNumber(this,event);" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band0_wep_x_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 9);"><#4069#></a></th>
<td>
<select name="band0_wep_x" class="input_option" onChange="auth_mehtod_change('0', document.querySelector('[name=\'band0_auth_mode_x\']').value);">
<option value="0" <% nvram_match("wl0_wep_x", "0", "selected"); %>><#950#></option>
<option value="1" <% nvram_match("wl0_wep_x", "1", "selected"); %>>WEP-64bits</option>
<option value="2" <% nvram_match("wl0_wep_x", "2", "selected"); %>>WEP-128bits</option>
</select>
<span name="key_des"></span>
</td>
</tr>
<tr id="band0_key_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 10);"><#952#></a></th>
<td>
<select name="band0_key" class="input_option" onChange="wep_key_index_change(this);">
<option value="1" <% nvram_match("wl0_key", "1","selected"); %>>1</option>
<option value="2" <% nvram_match("wl0_key", "2","selected"); %>>2</option>
<option value="3" <% nvram_match("wl0_key", "3","selected"); %>>3</option>
<option value="4" <% nvram_match("wl0_key", "4","selected"); %>>4</option>
</select>
</td>
</tr>
<tr id="band0_key1_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4064#></th>
<td><input type="text" name="band0_key1" id="band0_key1" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key1"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band0_key2_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4065#></th>
<td><input type="text" name="band0_key2" id="band0_key2" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key2"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band0_key3_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4066#></th>
<td><input type="text" name="band0_key3" id="band0_key3" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key3"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band0_key4_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4067#></th>
<td><input type="text" name="band0_key4" id="band0_key4" maxlength="27" class="input_25_table" value="<% nvram_get("wl0_key4"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band0_phrase_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 8);"><#4142#></a></th>
<td>
<input type="text" name="band0_phrase_x" maxlength="64" class="input_32_table" value="<% nvram_get("wl0_phrase_x"); %>" onKeyUp="return is_wlphrase('WLANConfig11b', 'wl_phrase_x', this);" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band0_radius_ipaddr_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,1);">
<#3996#></a>
</th>
<td>
<input type="text" maxlength="39" class="input_32_table" name="band0_radius_ipaddr" value='<% nvram_get("wl0_radius_ipaddr"); %>' onKeyPress="return validator.isIPAddr(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band0_radius_port_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,2);">
<#4000#></a>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" name="band0_radius_port" value='<% nvram_get("wl0_radius_port"); %>' onkeypress="return validator.isNumber(this,event)" autocorrect="off" autocapitalize="off"/>
</td>
</tr>
<tr id="band0_radius_key_field" style="display:none">
<th >
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,3);">
<#3998#></a>
</th>
<td>
<input type="password" maxlength="64" class="input_32_table" name="band0_radius_key" value="<% nvram_get("wl0_radius_key"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<thead>
<tr id="band1_title_field">
<td colspan="2">5 GHz</td>
</tr>
</thead>
<tr id="band1_ssid_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 1);"><#660#></a></th>
<td>
<input type="text" maxlength="32" class="input_32_table" name="band1_ssid" value="<% nvram_get("wl1_ssid"); %>" onkeypress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band1_closed_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 2);"><#4094#></a></th>
<td>
<input type="radio" value="1" name="band1_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl1_closed', '1')" <% nvram_match("wl1_closed", "1", "checked"); %>><#275#>
<input type="radio" value="0" name="band1_closed" class="input" onClick="return change_common_radio(this, 'WLANConfig11b', 'wl1_closed', '0')" <% nvram_match("wl1_closed", "0", "checked"); %>><#274#>
<!-- <span id="dwb_band_hide_hint"><#59#></span> -->
</td>
</tr>
<tr id="band1_nmode_x_field">
<th><a id="band1_mode_desc" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 4);"><#4135#></a></th>
<td>
<select name="band1_nmode_x" class="input_option" onChange="genAuthMethod('1', this.value);">
<option value="0" <% nvram_match("wl1_nmode_x", "0","selected"); %>><#241#></option>
<option value="8" <% nvram_match("wl1_nmode_x", "8","selected"); %>>N/AC Mixed</option>
<option value="2" <% nvram_match("wl1_nmode_x", "2","selected"); %>>Legacy</option>
</select>
<span id="band1_optimizexbox_span" style="display:none"><input type="checkbox" name="band1_optimizexbox_ckb" id="band1_optimizexbox_ckb" value="<% nvram_get("wl1_optimizexbox"); %>" onclick="document.form.wl_optimizexbox.value=(this.checked==true)?1:0;"> <#4137#></input></span>
<span id="band1_gmode_checkbox" style="display:none;"><input type="checkbox" name="band1_gmode_check" id="band1_gmode_check" value="" onClick="wl_gmode_protection_check();"> <#4136#></input></span>
<span id="band1_rateset_checkbox" style="display:none;"><input type="checkbox" name="band1_rateset_check" id="band1_rateset_check" value="<% nvram_get("wl1_rateset"); %>" onClick="wl_disable11b(this);">Disable 11b</span>
<span id="band1_nmode_x_hint" style="display:none;"><br><#4183#><br></span>
<span id="band1_NOnly_note" style="display:none;"></span>
<!-- [N only] is not compatible with current guest network authentication method(TKIP or WEP), Please go to <a id="gn_link" href="/Guest_network.asp?af=wl_NOnly_note" target="_blank" style="color:#FFCC00;font-family:Lucida Console;text-decoration:underline;">guest network</a> and change the authentication method. -->
</td>
</tr>
<tr id="band1_he_mode_field" style="display:none">
<th>
<a id="band1_he_mode_text" class="hintstyle" href="javascript:void(0);" onClick=""><#4046#></a>
</th>
<td>
<div style="display:flex;align-items: center;">
<select name="band1_11ax" class="input_option" onChange="he_frame_mode(this);">
<option value="1" <% nvram_match("wl1_11ax", "1" ,"selected"); %> ><#4071#></option>
<option value="0" <% nvram_match("wl1_11ax", "0" ,"selected"); %> ><#4072#></option>
</select>
<span id="band1_he_mode_faq" style="padding: 0 10px"><#4047#></span>
</div>
</td>
</tr>
<tr id="band1_mbo_field" style="display:none">
<th>
<a class="hintstyle"><#4001#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="band1_mbo_enable" class="input_option" onChange="handleMFP();">
<option value="1" <% nvram_match("wl1_mbo_enable", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl1_mbo_enable", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="band1_twt_field" style="display:none">
<th>
<a class="hintstyle"><#4062#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="band1_twt" class="input_option">
<option value="1" <% nvram_match("wl1_twt", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl1_twt", "0","selected"); %>><#4072#></option>
</select>
</div>
</td>
</tr>
<tr id="band1_bandwidth_field">
<th><#4019#></th>
<td>
<select name="band1_bw" class="input_option" onChange="handle_bandwidth(1, this.value)">
<option value="1" <% nvram_match("wl1_bw", "1","selected"); %>>20/40/80/160 MHz</option>
<option value="0" <% nvram_match("wl1_bw", "0","selected"); %>>20 MHz</option>
<option value="2" <% nvram_match("wl1_bw", "2","selected"); %>>40 MHz</option>
<option value="3" <% nvram_match("wl1_bw", "3","selected"); %>>80 MHz</option>
<option value="5" <% nvram_match("wl1_bw", "5","selected"); %>>160 MHz</option>
</select>
<span id="band1_enable_160_field" style="display:none"><input type="checkbox" onclick="enable_160MHz(this);" id="band1_enable_160mhz">Enable 160 MHz</span>
</td>
</tr>
<tr id="band1_channel_field">
<th><a id="band1_channel_select" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 3);"><#951#></a></th>
<td>
<select name="band1_channel" class="input_option" onChange="high_power_auto_channel();insertExtChannelOption();handleAcsDfs(this.value);"></select>
<span id="band1_auto_channel" style="display:none;margin-left:10px;"></span><br>
<div style="margin-top:5px">
<div><span id="band1_dfs_checkbox" style="display:none"><input type="checkbox" onClick="check_DFS_support(this);" name="band1_acs_dfs_checkbox" <% nvram_match("acs_dfs", "1", "checked"); %>><#4039#></input></span></div>
<div><span id="band1_acs_band1_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_band1_support(this);" <% nvram_match("acs_band1", "1", "checked"); %>><#4037#></input></span></div>
<div><span id="band1_acs_band3_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_band3_support(this);" <% nvram_match("acs_band3", "1", "checked"); %>><#4038#></input></span></div>
</div>
</td>
</tr>
<tr id="band1_nctrlsb_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);"><#4043#></a></th>
<td>
<select name="band1_nctrlsb" class="input_option">
<option><#241#></option>
</select>
</td>
</tr>
<tr id="band1_auth_mode_x_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 5);"><#4004#></a></th>
<td>
<select id="band1_auth_mode_x" name="band1_auth_mode_x" class="input_option" onChange="auth_mehtod_change(1, this.value);">
<option value="open" <% nvram_match("wl1_auth_mode_x", "open", "selected"); %>>Open System</option>
<option value="shared" <% nvram_match("wl1_auth_mode_x", "shared", "selected"); %>>Shared Key</option>
<option value="psk" <% nvram_match("wl1_auth_mode_x", "psk", "selected"); %>>WPA-Personal</option>
<option value="psk2" <% nvram_match("wl1_auth_mode_x", "psk2", "selected"); %>>WPA2-Personal</option>
<option value="sae" <% nvram_match("wl1_auth_mode_x", "sae", "selected"); %>>WPA3-Personal</option>
<option value="pskpsk2" <% nvram_match("wl1_auth_mode_x", "pskpsk2","selected"); %>>WPA-Auto-Personal</option>
<option value="psk2sae" <% nvram_match("wl1_auth_mode_x", "psk2sae","selected"); %>>WPA2/WPA3-Personal</option>
<option value="wpa" <% nvram_match("wl1_auth_mode_x", "wpa", "selected"); %>>WPA-Enterprise</option>
<option value="wpa2" <% nvram_match("wl1_auth_mode_x", "wpa2", "selected"); %>>WPA2-Enterprise</option>
<option value="wpawpa2" <% nvram_match("wl1_auth_mode_x", "wpawpa2","selected"); %>>WPA-Auto-Enterprise</option>
<option value="radius" <% nvram_match("wl1_auth_mode_x", "radius", "selected"); %>>Radius with 802.1x</option>
</select>
<div class="setup_help_icon" style="display:none;"></div>
</td>
</tr>
<tr id="band1_crypto_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 6);"><#956#></a></th>
<td>
<select name="band1_crypto" class="input_option">
<option value="aes" <% nvram_match("wl1_crypto", "aes", "selected"); %>>AES</option>
<option value="tkip+aes" <% nvram_match("wl1_crypto", "tkip+aes", "selected"); %>>TKIP+AES</option>
</select>
</td>
</tr>
<tr id="band1_wpa_psk_key_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 7);"><#4146#></a></th>
<td>
<div class="wpa_psk_container">
<div><input type="text" name="band1_wpa_psk" maxlength="64" class="input_32_table" value="" autocorrect="off" autocapitalize="off"></div>
</div>
</td>
</tr>
<tr id="band1_mfp_field" style="">
<th><#4127#></th>
<td>
<select name="wl1_mfp" class="input_option" onchange="handleMFP();">
<option value="0" <% nvram_match("wl1_mfp", "0", "selected"); %>><#4072#></option>
<option value="1" <% nvram_match("wl1_mfp", "1", "selected"); %>><#4128#></option>
<option value="2" <% nvram_match("wl1_mfp", "2", "selected"); %>><#4129#></option>
</select>
<span id="band1_mbo_notice_wpa3" style="display:none">*If the Authentication Method is WPA3-Personal, the Protected Management Frames will be Required.</span>
<span id="band1_mbo_notice_combo" style="display:none">*If the Authentication Method is WPA2/WPA3-Personal, the Protected Management Frames will be Capable.</span>
<span id="band1_mbo_notice" style="display:none"><#4002#></span>
</td>
</tr>
<tr id="band1_gtk_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 11);"><#4157#></a></th>
<td><input type="text" maxlength="7" name="band1_wpa_gtk_rekey" class="input_6_table" value='<% nvram_get("wl1_wpa_gtk_rekey"); %>' onKeyPress="return validator.isNumber(this,event);" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band1_wep_x_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 9);"><#4069#></a></th>
<td>
<select name="band1_wep_x" class="input_option" onChange="wepCryptoChange('1', this.value);">
<option value="0" <% nvram_match("wl1_wep_x", "0", "selected"); %>><#950#></option>
<option value="1" <% nvram_match("wl1_wep_x", "1", "selected"); %>>WEP-64bits</option>
<option value="2" <% nvram_match("wl1_wep_x", "2", "selected"); %>>WEP-128bits</option>
</select>
<span name="key_des"></span>
</td>
</tr>
<tr id="band1_key_field" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 10);"><#952#></a></th>
<td>
<select name="band1_key" class="input_option" onChange="wep_key_index_change(this);">
<option value="1" <% nvram_match("wl1_key", "1","selected"); %>>1</option>
<option value="2" <% nvram_match("wl1_key", "2","selected"); %>>2</option>
<option value="3" <% nvram_match("wl1_key", "3","selected"); %>>3</option>
<option value="4" <% nvram_match("wl1_key", "4","selected"); %>>4</option>
</select>
</td>
</tr>
<tr id="band1_key1_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4064#></th>
<td><input type="text" name="band1_key1" id="band1_key1" maxlength="27" class="input_25_table" value="<% nvram_get("wl1_key1"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band1_key2_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4065#></th>
<td><input type="text" name="band1_key2" id="band1_key2" maxlength="27" class="input_25_table" value="<% nvram_get("wl1_key2"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band1_key3_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4066#></th>
<td><input type="text" name="band1_key3" id="band1_key3" maxlength="27" class="input_25_table" value="<% nvram_get("wl1_key3"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band1_key4_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4067#></th>
<td><input type="text" name="band1_key4" id="band1_key4" maxlength="27" class="input_25_table" value="<% nvram_get("wl1_key4"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr id="band1_phrase_filed" style="display:none">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 8);"><#4142#></a></th>
<td>
<input type="text" name="band1_phrase_x" maxlength="64" class="input_32_table" value="<% nvram_get("wl1_phrase_x"); %>" onKeyUp="return is_wlphrase('WLANConfig11b', 'wl_phrase_x', this);" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band1_radius_ipaddr_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,1);">
<#3996#></a>
</th>
<td>
<input type="text" maxlength="39" class="input_32_table" name="band1_radius_ipaddr" value='<% nvram_get("wl1_radius_ipaddr"); %>' onKeyPress="return validator.isIPAddr(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="band1_radius_port_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,2);">
<#4000#></a>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" name="band1_radius_port" value='<% nvram_get("wl1_radius_port"); %>' onkeypress="return validator.isNumber(this,event)" autocorrect="off" autocapitalize="off"/>
</td>
</tr>
<tr id="band1_radius_key_field" style="display:none">
<th >
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,3);">
<#3998#></a>
</th>
<td>
<input type="password" maxlength="64" class="input_32_table" name="band1_radius_key" value="<% nvram_get("wl1_radius_key"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
</table>
<div class="apply_gen">
<input type="button" id="applyButton" class="button_gen" value="<#284#>" onclick="applyRule();">
</div>
</td>
</tr>
</tbody>
</table>
</td>
</form>
</tr>
</table>
</td>
<td width="10" align="center" valign="top"></td>
</tr>
</table>
<div id="footer"></div>
<script>
(function() {
if(isSwMode("rt") || isSwMode("ap")) {
if('<% nvram_get("wl_unit"); %>' == "-1" || '<% nvram_get("wl_subunit"); %>' != "-1") {
change_wl_unit();
}
}
})();
</script>
</body>
</html>

