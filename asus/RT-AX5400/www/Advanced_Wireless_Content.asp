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
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/js/httpApi.js"></script>
<script type="text/javascript" src="/state.js"></script>
<script type="text/javascript" src="/js/device.js"></script>
<script type="text/javascript" src="/help.js"></script>
<script type="text/javascript" src="/general.js"></script>
<script type="text/javascript" src="/popup.js"></script>
<script type="text/javascript" src="/md5.js"></script>
<script type="text/javascript" src="/chanspec.js"></script>
<script type="text/javascript" src="/validator.js"></script>
<script type="text/javascript" src="/switcherplugin/jquery.iphone-switch.js"></script>
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
<script>
<% wl_get_parameter(); %>
$(function () {
if(amesh_support && (isSwMode("rt") || isSwMode("ap")) && ameshRouter_support) {
addNewScript('/require/modules/amesh.js');
}
});
wl_channel_list_2g = <% channel_list_2g(); %>;
wl_channel_list_5g = <% channel_list_5g(); %>;
var meshBackhaulAutoSupport = false;
if(based_modelid == 'XT8PRO' || based_modelid == 'BM68'){
meshBackhaulAutoSupport = true;
}
var unii4Support = (function(){
wl_channel_list_5g_2 = <% channel_list_5g_2(); %>;
if(wl_nband_array[1] == '1'){
for(item of wl_channel_list_5g){
if(parseInt(item) > 165){
return true;
}
}
}
if(wl_nband_array[2] == '1'){
for(item of wl_channel_list_5g_2){
if(parseInt(item) > 165){
return true;
}
}
}
return false;
})();
var cur_control_channel = [<% wl_control_channel(); %>][0];
var reboot_needed_time = eval("<% get_default_reboot_time(); %>");
var wl_unit = <% nvram_get("wl_unit"); %>;
var country = '';
if(wl_unit == '1')
country = '<% nvram_get("wl1_country_code"); %>';
else
country = '<% nvram_get("wl0_country_code"); %>';
var wl_bw_160 = '<% nvram_get("wl_bw_160"); %>';
var enable_bw_160 = (wl_bw_160 == 1) ? true : false;
var wl_reg_mode = '<% nvram_get("wl_reg_mode"); %>';
var wl_wpa_psk_org = decodeURIComponent("<% nvram_char_to_ascii("WLANConfig11b", "wl_wpa_psk"); %>");
var faq_href1 = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=150";
var faq_href2 = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=151";
var faq_href3 = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=149";
var faq_href_hide_ssid = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=162";
function initial(){
show_menu();
if(band5g_11ac_support){
regen_5G_mode(document.form.wl_nmode_x, wl_unit)
}
if(he_frame_support){
if(based_modelid != 'RT-AX92U' || (wl_unit != '0' && wl_unit != '1')){
$("#he_mode_field").show();
}
$("#he_mode_faq_link") //for string tag: WLANConfig11b_HE_Frame_Mode_faq
.attr('target', '_blank')
.attr('style', 'color:#FC0;text-decoration:underline;')
.attr('href', faq_href1);
}
if(bw_160_support){
$("#enable_160mhz").attr("checked", enable_bw_160);
}
if(mbo_support){
$('#mbo_field').show();
}
genBWTable(wl_unit);
if(concurrent_pap){
if((sw_mode == 2 || sw_mode == 4) && '<% nvram_get("wl_subunit"); %>' != '1')
_change_wl_unit(wl_unit);
}
else if((sw_mode == 2 || sw_mode == 4) && wl_unit == '<% nvram_get("wlc_band"); %>' && '<% nvram_get("wl_subunit"); %>' != '1')
_change_wl_unit(wl_unit);
if(band5g_support && band5g_11ac_support && document.form.wl_unit[1].selected == true){ //AC 5G
if(based_modelid == "RT-AC87U"){
document.getElementById('wl_mode_desc').onclick=function(){return openHint(1, 6)};//#WLANConfig11b_x_Mode_itemdescAC2#
}
else if(based_modelid == "DSL-AC68U" || based_modelid == "RT-AC68U" || based_modelid == "RT-AC68A" || based_modelid == "4G-AC68U" ||
based_modelid == "RT-AC56U" || based_modelid == "RT-AC56S" || based_modelid == "RT-AC53U"){
document.getElementById('wl_mode_desc').onclick=function(){return openHint(1, 7)};//#WLANConfig11b_x_Mode_itemdescAC3#
}
else{
document.getElementById('wl_mode_desc').onclick=function(){return openHint(1, 5)};//#WLANConfig11b_x_Mode_itemdescAC#
}
if(no_vht_support){ //Hide 11AC/80MHz from GUI
document.getElementById('wl_mode_desc').onclick=function(){return openHint(1, 4)};
}
}
else if(band5g_support && document.form.wl_unit[1].selected == true){ //N 5G
document.getElementById('wl_mode_desc').onclick=function(){return openHint(1, 4)};
}
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
document.getElementById("wl_optimizexbox_span").style.display = "";
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
regen_band(document.form.wl_unit);
if(document.form.wl_unit[0].selected == true){
document.getElementById("wl_gmode_checkbox").style.display = "";
}
if(tmo_support)
tmo_wl_nmode();
if(document.form.wl_nmode_x.value=='1'){
document.form.wl_gmode_check.checked = false;
document.getElementById("wl_gmode_check").disabled = true;
}
else{
document.form.wl_gmode_check.checked = true;
document.getElementById("wl_gmode_check").disabled = false;
}
if(wl_unit == '0'){
if(document.form.wl_gmode_protection.value == "auto"){
document.form.wl_gmode_check.checked = true;
}
else{
document.form.wl_gmode_check.checked = false;
}
document.getElementById("wl_gmode_checkbox").style.display = "";
if(disable11b_support){
if(document.form.wl_rateset.value == "ofdm"){
document.form.wl_rateset_check.checked = true;
}
else{
document.form.wl_rateset_check.checked = false;
}
wl_mode_change(document.form.wl_nmode_x.value);
}
}
if(!band5g_support)
document.getElementById("wl_unit_field").style.display = "none";
if(sw_mode == 2 || sw_mode == 4){
if(concurrent_pap)
document.form.wl_subunit.value = 1;
else
document.form.wl_subunit.value = (wl_unit == '<% nvram_get("wlc_band"); %>') ? 1 : -1;
}
change_wl_nmode(document.form.wl_nmode_x);
var is_RU_sku = ('<% nvram_get("location_code"); %>'.indexOf("RU") != -1);
if(wl_info[wl_unit].bw_160_support){
document.getElementById('enable_160_field').style.display = "";
if((based_modelid == 'GT-AX11000' || based_modelid == 'RT-AX92U' || based_modelid == 'RT-AX95Q' || based_modelid == 'XT8PRO' || based_modelid == 'BM68' || based_modelid == 'XT8_V2' || based_modelid == 'GT-AXE11000' || based_modelid == 'GT-AX11000_PRO' || based_modelid == 'ET12' || based_modelid == 'XT12' || based_modelid == 'GT-AXE16000') && wl2.channel_160m == "" && wl_unit == '2'){
document.getElementById('enable_160_field').style.display = "none";
}
}
if((is_UA_sku || is_RU_sku) && !Qcawifi_support && !Rawifi_support && !sdk_5){
if(document.form.wl_channel.value == '0' && wl_unit == '1'){
document.getElementById('acs_band3_checkbox').style.display = "";
}
}
else if(based_modelid == 'RT-AX88U' || based_modelid == 'GT-AX11000' || (based_modelid == 'RT-AX92U' && wl_unit == '2') || (based_modelid == 'GT-AC2900' && wl_unit == '1') || ((based_modelid == 'RT-AX58U' || based_modelid == 'RT-AX58U_V2' || based_modelid == "BR63" || based_modelid == 'RT-AX3000N' || based_modelid == 'TUF-AX3000' || based_modelid == 'TUF-AX3000_V2' || based_modelid == 'TUF-AX5400' || based_modelid == "TUF-AX5400_V2" || based_modelid == "RT-AX5400" || based_modelid == "DSL-AX82U" || based_modelid == "RT-AX82U" || based_modelid == "RT-AX82U_V2" || based_modelid == "GS-AX3000" || based_modelid == "GS-AX5400") && wl_unit == '1') || based_modelid == 'GT-AXE11000' || based_modelid == "GT-AX6000" || based_modelid == 'GT-AX11000_PRO' || based_modelid == 'ET12' || based_modelid == 'XT12' || based_modelid == 'GT-AXE16000' || (based_modelid == 'RT-AXE7800' && wl_unit != '0') || (based_modelid == 'GT10' && wl_unit != '0') || (based_modelid == 'RT-AX9000' && wl_unit != '0')){
if(bw_160_support){
document.getElementById('enable_160_field').style.display = "";
$("#enable_160mhz").attr("checked", enable_bw_160);
}
if(document.form.wl_channel.value == '0' && ((wl_unit == '1' && based_modelid != 'RT-AX92U') || wl_unit == '2')){
document.getElementById('dfs_checkbox').style.display = "";
check_DFS_support(document.form.acs_dfs_checkbox);
}
}
else if(country == "EU"){ //display checkbox of DFS channel under 5GHz
if(based_modelid == "RT-AC68U" || based_modelid == "RT-AC68A" || based_modelid == "4G-AC68U" || based_modelid == "DSL-AC68U"
|| based_modelid == "RT-AC87U"
|| based_modelid == "RT-AX92U"
|| (based_modelid == "RT-AC66U" && wl1_dfs == "1") //0: A2 not support, 1: B0 support
|| based_modelid == "RT-N66U"){
if(document.form.wl_channel.value == '0' && wl_unit == '1'){
document.getElementById('dfs_checkbox').style.display = "";
check_DFS_support(document.form.acs_dfs_checkbox);
}
}
}
if(wl_unit == '2' && band5g2_support){
if(document.form.acs_band3.value == '1'){
document.form.acs_dfs_checkbox.checked = true;
}
else{
document.form.acs_dfs_checkbox.checked = false;
}
}
if(band6g_support && wl_unit == '2'){
document.getElementById('psc6g_field').style.display = "";
}
if(wl_info[wl_unit].dfs_support){
if(document.form.wl_channel.value == '0'){
document.getElementById('dfs_checkbox').style.display = "";
check_DFS_support(document.form.acs_dfs_checkbox);
}
}
else if((is_UA_sku || is_RU_sku) && !Qcawifi_support && !Rawifi_support && !sdk_5){
if(document.form.wl_channel.value == '0' && wl_unit == '1'){
document.getElementById('acs_band3_checkbox').style.display = "";
}
}
else if(country == "US" || country == "SG"){ //display checkbox of band1 channel under 5GHz
if(based_modelid == "RT-AC68U" || based_modelid == "RT-AC68A" || based_modelid == "4G-AC68U" || based_modelid == "DSL-AC68U"
|| based_modelid == "RT-AC56U" || based_modelid == "RT-AC56S"
|| based_modelid == "RT-N18U"
|| based_modelid == "RT-AC66U"
|| based_modelid == "RT-N66U"
|| based_modelid == "RT-AC53U"){
if(document.form.wl_channel.value == '0' && wl_unit == '1')
document.getElementById('acs_band1_checkbox').style.display = "";
}
}
else if((odmpid == "RT-AC66U_B1" || odmpid == "RT-AC1750_B1" || odmpid == "RT-N66U_C1" || odmpid == "RT-AC1900U" || odmpid == "RP-AC1900" || odmpid == "RT-AC67U") && country == "AU"){
if(document.form.wl_channel.value == '0' && wl_unit == '1'){
document.getElementById('dfs_checkbox').style.display = "";
check_DFS_support(document.form.acs_dfs_checkbox);
}
}
if(wl_channel_list_2g.length == '14'){
if(!Qcawifi_support && !Rawifi_support){
if(document.form.wl_channel.value == '0' && wl_unit == '0' && document.form.wl_channel.length == '14')
$('#acs_ch13_checkbox').show();
}
}
var smart_connect_flag_t = '';
if(smart_connect_support && (isSwMode("rt") || isSwMode("ap"))){ //get select before and control setting
var flag = '<% get_parameter("flag"); %>';
smart_connect_flag_t = (flag=='')?document.form.smart_connect_x.value:flag;
document.getElementById("smartcon_enable_field").style.display = "";
if(wl_info.band2g_support && wl_info.band5g_support && (wl_info.band5g_2_support || wl_info.band6g_support))
inputCtrl(document.form.smart_connect_t, 1);
document.form.smart_connect_t.value = (smart_connect_flag_t == 0)?1:smart_connect_flag_t;
gen_fronthaul_ap(smart_connect_flag_t);
enableSmartCon(smart_connect_flag_t, "initial");
}
if(history.pushState != undefined) history.pushState("", document.title, window.location.pathname);
if(document.form.wl_channel.value == '0'){
if(cur_control_channel == undefined)
return true;
document.getElementById("auto_channel").style.display = "";
ajax_wl_channel();
var temp = "";
if(smart_connect_flag_t == "1"){ //Tri-Band Smart Connect
if(isSupport("triband") && dwb_info.mode) {
if(wl_unit == dwb_info.band) {
temp = cur_control_channel[dwb_info.band];
}
else {
for(var i = 0; i < cur_control_channel.length; i += 1) {
if(i == dwb_info.band)
continue;
if(temp != "")
temp += ", ";
temp += cur_control_channel[i];
}
}
}
else {
temp = cur_control_channel[0] + ", " + cur_control_channel[1];
if(wl_info.band5g_2_support || wl_info.band6g_support)
temp += ", " + cur_control_channel[2];
}
}
else if(smart_connect_flag_t == "2"){ //5 GHz Smart Connect
if(wl_unit == "0")
temp = cur_control_channel[0];
else
temp = cur_control_channel[1] + ", " + cur_control_channel[2];
}
else //smart_connect_flag_t == 0, disable Smart Connect
temp = cur_control_channel[wl_unit];
document.getElementById("auto_channel").innerHTML = "<#3988#>: " + temp;
}
/* Smart Connect, separate wireless settings*/
if(smart_connect_flag_t == '0' || smart_connect_flag_t == ''){
$('#band_separate').hide();
}
else if(smart_connect_flag_t == '1'){
separateGenBWTable('0');
separateGenBWTable('1');
band0_channel = '<% nvram_get("wl0_chanspec"); %>';
band1_channel = '<% nvram_get("wl1_chanspec"); %>';
if (band0_channel == '0') {
$('#band0_autoChannel').show();
$('#band0_autoChannel').html('Current Control Channel: ' + cur_control_channel[0]);
}
if (band1_channel == '0') {
$('#band1_autoChannel').show();
$('#band1_autoChannel').html('Current Control Channel: ' + cur_control_channel[1]);
}
if(wl_info.band5g2_support || wl_info.band6g_support){
band2_channel = '<% nvram_get("wl2_chanspec"); %>';
separateGenBWTable('2');
if (band2_channel == '0') {
$('#band2_autoChannel').show();
$('#band2_autoChannel').html('Current Control Channel: ' + cur_control_channel[2]);
}
}
}
else if(smart_connect_flag_t == '2'){
if(wl_unit == '0'){
$('#band_separate').hide();
}
else{
separateGenBWTable('1');
band1_channel = '<% nvram_get("wl1_chanspec"); %>';
if (band1_channel == '0') {
$('#band1_autoChannel').show();
$('#band1_autoChannel').html('Current Control Channel: ' + cur_control_channel[1]);
}
if (wl_info.band5g2_support || wl_info.band6g_support) {
band2_channel = '<% nvram_get("wl2_chanspec"); %>';
separateGenBWTable('2');
if (band2_channel == '0') {
$('#band2_autoChannel').show();
$('#band2_autoChannel').html('Current Control Channel: ' + cur_control_channel[2]);
}
}
}
}
controlHideSSIDHint();
controlAXOnlyHint();
if(band5g_11ax_support){
if(based_modelid != 'RT-AX92U' || (wl_unit != '0' && wl_unit != '1')){
$("#twt_field").show();
}
}
if(band6g_support){
$("#psc_faq_link") //for string tag: PSC_Faq
.attr("target", "_blank")
.attr("style", "color:#FC0;text-decoration:underline;")
.attr("href", faq_href2);
}
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
if(meshBackhaulAutoSupport && document.form.fh_ap_enabled){
if(document.form.fh_ap_enabled.value === '1'){
document.form.fh_ap_enabled.value = '0';
document.querySelector('#fh_connection_hint').style.display = '';
document.querySelector('#fh_connection_hint_checkbox').checked = true;
}
else if(document.form.fh_ap_enabled.value === '0'){
document.querySelector('#fh_connection_hint').style.display = '';
document.querySelector('#fh_connection_hint_checkbox').checked = false;
}
else if(document.form.fh_ap_enabled.value === '2'){
document.querySelector('#fh_connection_hint').style.display = 'none';
document.querySelector('#fh_connection_hint_checkbox').checked = false;
}
}
if(unii4Support ){
if(wl_unit == '1' && !band5g2_support && document.form.wl_channel.value == '0'){
document.querySelector('#acs_unii4_field').style.display = '';
}
else if(band5g2_support){
if(wl_unit == '1' && band6g_support && document.form.wl_channel.value == '0'){
document.querySelector('#acs_unii4_field').style.display = '';
}
else if(wl_unit == '2' && document.form.wl_channel.value == '0'){
document.querySelector('#acs_unii4_field').style.display = '';
document.querySelector('#band2_acs_unii4_field').style.display = '';
}
}
}
}
function wl_mode_change(mode){
if(wl_unit == '0'){
if(mode == '0'){
document.form.wl_rateset.disabled = false;
document.getElementById("wl_rateset_checkbox").style.display = "";
}
else{
document.form.wl_rateset.disabled = true;
document.getElementById("wl_rateset_checkbox").style.display = "none";
}
}
}
function wl_disable11b(obj){
if(obj.checked){
document.form.wl_rateset.value = 'ofdm';
}
else{
document.form.wl_rateset.value = 'default';
}
}
function cal_panel_block(obj){
var blockmarginLeft;
if (window.innerWidth)
winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
winWidth = document.body.clientWidth;
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
winWidth = document.documentElement.clientWidth;
}
if(winWidth >1050){
winPadding = (winWidth-1050)/2;
winWidth = 1105;
blockmarginLeft= (winWidth*0.2)+winPadding;
}
else if(winWidth <=1050){
blockmarginLeft= (winWidth)*0.2 + document.body.scrollLeft;
}
document.getElementById(obj).style.marginLeft = blockmarginLeft+"px";
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
if(he_frame_support){
if(o.value == '0'){
if (based_modelid != 'RT-AX92U' || (wl_unit != '0' && wl_unit != '1')) {
$("#he_mode_field").show();
}
}
else if(o.value == '9'){ // AX only
$("#he_mode_field").show();
}
else{
$("#he_mode_field").hide();
}
}
limit_auth_method();
if(o.value == "3"){
document.form.wl_wme.value = "on";
}
wl_chanspec_list_change();
genBWTable(wl_unit);
controlAXOnlyHint();
}
function genBWTable(_unit){
cur = '<% nvram_get("wl_bw"); %>';
var bws = new Array();
var bwsDesc = new Array();
if(document.form.wl_nmode_x.value == 2){
bws = [1];
bwsDesc = ["20 MHz"];
if(tmo_support && _unit == 0){ // for 2.4G B/G Mixed
inputCtrl(document.form.wl_bw,0);
}
else{
inputCtrl(document.form.wl_bw,1);
}
}
else if(_unit == 0){
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
if(tmo_support){
if(document.form.wl_nmode_x.value == 6 || document.form.wl_nmode_x.value == 5){ // B only or G only
inputCtrl(document.form.wl_bw,0);
}
else{
inputCtrl(document.form.wl_bw,1);
}
}
}
else{
if(tmo_support){
if(document.form.wl_nmode_x.value == 7){ // A only
inputCtrl(document.form.wl_bw,0);
}
else{
inputCtrl(document.form.wl_bw,1);
if(document.form.wl_nmode_x.value == 0 || document.form.wl_nmode_x.value == 3){ // Auto or AC only
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
else{ // N only or A/N Mixed
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
}
}
}
else{
if (!band5g_11ac_support){ //for RT-N66U SDK 6.x
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
}
else if (based_modelid == "RT-AC87U"){
if(document.form.wl_nmode_x.value == 1){
bws = [1, 2];
bwsDesc = ["20 MHz", "40 MHz"];
}else{
bws = [1, 2, 3];
bwsDesc = ["20 MHz", "40 MHz", "80 MHz"];
}
}
else if (based_modelid == "GT-AC9600"){
if(document.form.wl_nmode_x.value == 1){
bws = [1, 2];
bwsDesc = ["20 MHz", "40 MHz"];
}else{
bws = [1, 2, 3, 5];
bwsDesc = ["20 MHz", "40 MHz", "80 MHz", "160 MHz"];
}
}
else if((based_modelid == "DSL-AC68U" || based_modelid == "RT-AC68U" || based_modelid == "RT-AC68A" || based_modelid == "4G-AC68U" ||
based_modelid == "RT-AC56U" || based_modelid == "RT-AC56S" ||
based_modelid == "RT-AC66U" ||
based_modelid == "RT-AC3200" ||
based_modelid == "RT-AC3100" || based_modelid == "RT-AC88U" || based_modelid == "RT-AX88U" || based_modelid == "RT-AC86U" || based_modelid == "GT-AC2900" ||
based_modelid == "RT-AC5300" || based_modelid == "GT-AC5300" || based_modelid == "GT-AX11000" || based_modelid == "RT-AX92U" || based_modelid == "RT-AX95Q" || based_modelid == "XT8PRO" || based_modelid == "BM68" || based_modelid == "XT8_V2" || based_modelid == "RT-AXE95Q" || based_modelid == "ET8PRO" || based_modelid == "ET8_V2" || based_modelid == "RT-AX56_XD4" || based_modelid == "XD4PRO" || based_modelid == "CT-AX56_XD4" || based_modelid == "RT-AX58U" || based_modelid == 'RT-AX58U_V2' || based_modelid == "BR63" || based_modelid == 'RT-AX3000N' || based_modelid == "TUF-AX3000" || based_modelid == 'TUF-AX3000_V2' || based_modelid == 'TUF-AX5400' || based_modelid == "TUF-AX5400_V2" || based_modelid == "RT-AX5400" || based_modelid == "DSL-AX82U" || based_modelid == "RT-AX82U" || based_modelid == "RT-AX82U_V2" || based_modelid == "RT-AX56U" || based_modelid == "GT-AXE11000" || based_modelid == "GS-AX3000" || based_modelid == "GS-AX5400" || based_modelid == "GT-AX6000" || based_modelid == 'GT-AX11000_PRO' || based_modelid == 'ET12' || based_modelid == 'XT12' || based_modelid == 'GT-AXE16000' || based_modelid == "RT-AXE7800" || based_modelid == "GT10" || based_modelid == "RT-AX9000" || based_modelid == "RT-AC53U" || based_modelid == "XC5" || based_modelid == "EBA63") && document.form.wl_nmode_x.value == 1){ //N only
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
}
else{
if(no_vht_support){ //Hide 11AC/80MHz from GUI
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
}
else if(band5g_11ax_support || bw_160_support){
if(enable_bw_160){
if( (wl_unit == 1 && wl1.channel_160m == '') ||(wl_unit == 2 && wl2.channel_160m == '')){
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
else{
bws = [0, 1, 2, 3, 5];
bwsDesc = ["20/40/80/160 MHz", "20 MHz", "40 MHz", "80 MHz", "160 MHz"];
}
}
else{
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
}
else{
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
}
}
}
add_options_x2(document.form.wl_bw, bwsDesc, bws, cur);
wl_chanspec_list_change();
}
function mbss_display_ctrl(){
if(multissid_support){
for(var i=1; i<multissid_count+1; i++)
add_options_value(document.form.wl_subunit, i, '<% nvram_get("wl_subunit"); %>');
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
function detect_qtn_ready(){
if(qtn_state_t != "1")
setTimeout('detect_qtn_ready();', 1000);
else
document.form.submit();
}
function applyRule(){
var confirm_flag = 0;
var confirm_content = "";
var auth_mode = document.form.wl_auth_mode_x.value;
var auth_mode_ori = '<% nvram_get("wl_auth_mode_x"); %>';
if(document.form.wl_wpa_psk.value == "<#3992#>"){
document.form.wl_wpa_psk.value = "";
}
if(validForm()){
if(amesh_support && (isSwMode("rt") || isSwMode("ap")) && ameshRouter_support) {
if(!check_wl_auth_support($("select[name=wl_auth_mode_x] option:selected"), wl_unit))
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
var radio_value = (document.form.wl_closed[0].checked) ? 1 : 0;
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
if(document.form.wl_closed[0].checked && document.form.wps_enable.value == 1 && (isSwMode("rt") || isSwMode("ap"))){
confirm_flag=1;
confirm_content="<#3990#>";
}
}
if(document.form.wps_enable.value == 1){
if(document.form.wps_dualband.value == "1" || document.form.wl_unit.value == document.form.wps_band.value){ //9: RT-AC87U dual band WPS
if(document.form.wl_auth_mode_x.value == "open" && document.form.wl_wep_x.value == "0"){
if(!confirm("<#3991#>"))
return false;
}
if( document.form.wl_auth_mode_x.value == "shared"
|| document.form.wl_auth_mode_x.value == "psk" || document.form.wl_auth_mode_x.value == "wpa"
|| document.form.wl_auth_mode_x.value == "open" && (document.form.wl_wep_x.value == "1" || document.form.wl_wep_x.value == "2")){ //open wep case
if(!confirm("<#3989#>"))
return false;
document.form.wps_enable.value = "0";
}
}
else{
if(document.form.wl_auth_mode_x.value == "open" && document.form.wl_wep_x.value == "0"){
if(!confirm("<#3991#>"))
return false;
}
}
}
if(bw_160_support){
document.form.wl_bw_160.value = $("#enable_160mhz").prop("checked") ? 1 : 0;
}
document.form.wps_config_state.value = "1";
if((auth_mode == "shared" || auth_mode == "wpa" || auth_mode == "wpa2" || auth_mode == "wpawpa2" || auth_mode == "radius"
||((auth_mode == "open") && !(document.form.wl_wep_x.value == "0")))
&& document.form.wps_mode.value == "enabled"){
document.form.wps_mode.value = "disabled";
}
if(auth_mode == "wpa" || auth_mode == "wpa2" || auth_mode == "wpawpa2" || auth_mode == "radius"){
document.form.next_page.value = "/Advanced_WSecurity_Content.asp";
}
var mbo = document.form.wl_mbo_enable.value;
if(auth_mode == 'sae' || auth_mode == 'owe'){
document.form.wl_mfp.value = '2';
}
else if(auth_mode == 'psk2sae' && document.form.wl_mfp.value == '0'){
document.form.wl_mfp.value = '1';
}
else if(auth_mode == 'psk2' || auth_mode == 'pskpsk2' || auth_mode == 'wpa2' || auth_mode == 'wpawpa2'){
if(mbo_support && mbo == '1' && document.form.wl_mfp.value == '0'){
document.form.wl_mfp.value = '1';
}
if(auth_mode == 'pskpsk2' && document.form.wl_mfp.value == '2' && (band5g_11ax_support || based_modelid == 'RT-AC68U_V4')){
document.form.wl_mfp.value = '1';
}
}
if(Bcmwifi_support) {
if(document.form.wl_nmode_x.value != "2" && wl_unit == "0")
document.form.wl_gmode_protection.value = "auto";
}
else {
if(document.form.wl_nmode_x.value == "1" && wl_unit == "0")
document.form.wl_gmode_protection.value = "off";
}
if(sw_mode == 2 || sw_mode == 4){
document.form.action_wait.value = "5";
}
if(document.form.wl_bw.value == 1){ // 20MHz
document.form.wl_chanspec.value = document.form.wl_channel.value;
}
else{
if(document.form.wl_channel.value == 0) // Auto case
document.form.wl_chanspec.value = document.form.wl_channel.value;
else{
if(tmo_support && (document.form.wl_nmode_x.value == 6 || document.form.wl_nmode_x.value == 5 || document.form.wl_nmode_x.value == 2 || document.form.wl_nmode_x.value == 7)){ // B only, G only, B/G Mixed, A only
document.form.wl_chanspec.value = document.form.wl_channel.value;
}
else{
document.form.wl_chanspec.value = document.form.wl_channel.value + document.form.wl_nctrlsb.value;
}
}
}
if(country == "US" && dfs_US_support && wl_unit == "1"){
if(document.form.wl_channel.value == "0"){
if(document.form.acs_dfs_checkbox.checked){
document.form.wl1_dfs.value = "1";
document.form.acs_dfs.value = "1";
}
else{
document.form.wl1_dfs.value = "0";
document.form.acs_dfs.value = "0";
}
}
if(wl1_dfs != document.form.wl1_dfs.value){
document.form.action_script.value = "reboot";
document.form.action_wait.value = reboot_needed_time;
}
}
if(country == "EU" && based_modelid == "RT-AC87U" && wl_unit == '1'){ //Interlocking setting to enable 'wl1_80211h' in EU RT-AC87U under 5GHz
if(document.form.wl_channel.value == '0' && document.form.acs_dfs.value == '1') //Auto channel with DFS channel
document.form.wl1_80211h.value = "1";
}
if(smart_connect_support && (isSwMode("rt") || isSwMode("ap")) && document.form.smart_connect_x.value != 0){ //apply smart connect setting
document.form.smart_connect_x.value = document.form.smart_connect_t.value;
if(document.form.smart_connect_x.value == '1') {
if(isSupport("triband") && dwb_info.mode && (dwb_info.band == wl_unit))
document.form.wl_unit.value = wl_unit;
else
document.form.wl_unit.value = 0;
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
}
if(document.form.smart_connect_x.value != '0'){
if(document.form.smart_connect_t.value == '1'){
document.form.wl0_bw.value = document.form.band0_bw.value;
if(document.form.band0_channel.value == '0'){
document.form.band0_extChannel.value = '';
}
if(document.form.wl0_bw.value == '1'){
document.form.wl0_chanspec.value = document.form.band0_channel.value;
}
else{
document.form.wl0_chanspec.value = document.form.band0_channel.value + document.form.band0_extChannel.value;
}
if($('#band0_acs_ch13').is(':visible')){
if($("#band0_acs_ch13_checkbox").is(':checked')){
document.form.acs_ch13.value = 1;
}
else{
document.form.acs_ch13.value = 0;
}
}
document.form.wl1_bw.value = document.form.band1_bw.value;
document.form.wl1_chanspec.value = document.form.band1_channel.value;
if($('#band1_acsDFS').is(':visible')){
if(band6g_support){
if($('#band1_acsDFS_checkbox').is(':checked')){
document.form.acs_dfs.value = 1;
document.form.acs_band3.value = 1;
}
else{
document.form.acs_dfs.value = 0;
document.form.acs_band3.value = 0;
}
}
else{
if($('#band1_acsDFS_checkbox').is(':checked')){
document.form.acs_dfs.value = 1;
}
else{
document.form.acs_dfs.value = 0;
}
}
}
if(wl_unit == 2 && band5g2_support){
if($('#dfs_checkbox').is(':visible')){
document.form.acs_dfs.disabled = true;
if(document.form.acs_dfs_checkbox.checked){
document.form.acs_band3.value = "1";
}
else{
document.form.acs_band3.value = "0";
}
}
}
if ($('#band1_160').is(':checked')) {
document.form.wl1_bw_160.value = 1;
}
else {
document.form.wl1_bw_160.value = 0;
}
if(wl_info.band5g_2_support || wl_info.band6g_support){
document.form.wl2_bw.value = document.form.band2_bw.value;
document.form.wl2_chanspec.value = document.form.band2_channel.value;
if ($('#band2_acsDFS').is(':visible')) {
if ($('#band2_acsDFS_checkbox').is(':checked')) {
document.form.acs_band3.value = 1;
}
else {
document.form.acs_band3.value = 0;
}
}
if ($('#band2_acs_unii4_field').is(':visible')) {
if ($('#band2_acs_unii4_checkbox').is(':checked')) {
document.form.acs_unii4.value = 1;
}
else {
document.form.acs_unii4.value = 0;
}
}
else if ($('#acs_unii4_checkbox').is(':visible')) {
if ($('#acs_unii4_checkbox').is(':checked')) {
document.form.acs_unii4.value = 1;
}
else {
document.form.acs_unii4.value = 0;
}
}
if ($('#band2_160').is(':checked')) {
document.form.wl2_bw_160.value = 1;
}
else {
document.form.wl2_bw_160.value = 0;
}
if(band6g_support && $('#band2_psc6g_checkbox').is(':checked')){
document.form.psc6g.value = 1;
}
else{
document.form.psc6g.value = 0;
}
}
}
else if(document.form.smart_connect_t.value == '2'){
document.form.wl1_bw.value = document.form.band1_bw.value;
document.form.wl1_chanspec.value = document.form.band1_channel.value;
if ($('#band1_acsDFS').is(':visible')) {
if ($('#band1_acsDFS_checkbox').is(':checked')) {
document.form.acs_dfs.value = 1;
}
else {
document.form.acs_dfs.value = 0;
}
}
if ($('#band1_160').is(':checked')) {
document.form.wl1_bw_160.value = 1;
}
else {
document.form.wl1_bw_160.value = 0;
}
document.form.wl2_bw.value = document.form.band2_bw.value;
document.form.wl2_chanspec.value = document.form.band2_channel.value;
if ($('#band2_acsDFS').is(':visible')) {
if ($('#band2_acsDFS_checkbox').is(':checked')) {
document.form.acs_band3.value = 1;
}
else {
document.form.acs_band3.value = 0;
}
}
if ($('#band2_acs_unii4_field').is(':visible')) {
if ($('#band2_acs_unii4_checkbox').is(':checked')) {
document.form.acs_unii4.value = 1;
}
else {
document.form.acs_unii4.value = 0;
}
}
else if ($('#acs_unii4_checkbox').is(':visible')) {
if ($('#acs_unii4_checkbox').is(':checked')) {
document.form.acs_unii4.value = 1;
}
else {
document.form.acs_unii4.value = 0;
}
}
if ($('#band2_160').is(':checked')) {
document.form.wl2_bw_160.value = 1;
}
else {
document.form.wl2_bw_160.value = 0;
}
if(band6g_support && $('#band2_psc6g_checkbox').is(':checked')){
document.form.psc6g.value = 1;
}
else{
document.form.psc6g.value = 0;
}
}
}
else{
if(wl_unit == '2' && band6g_support){
if(document.getElementById('psc6g_checkbox').checked){
document.form.psc6g.value = "1";
}
else{
document.form.psc6g.value = "0";
}
}
else if(wl_unit == '2' && band5g2_support){
document.form.acs_dfs.disabled = true;
if(document.form.acs_dfs_checkbox.checked){
document.form.acs_band3.value = "1";
}
else{
document.form.acs_band3.value = "0";
}
if(document.getElementById('acs_unii4_checkbox').checked){
document.form.acs_unii4.value = "1";
}
else{
document.form.acs_unii4.value = "0";
}
}
else if(wl_unit == '1' && band6g_support){
if(document.form.acs_dfs_checkbox.checked){
document.form.acs_dfs.value = "1";
document.form.acs_band3.value = "1";
}
else{
document.form.acs_dfs.value = "0";
document.form.acs_band3.value = "0";
}
}
}
if(meshBackhaulAutoSupport && document.form.fh_ap_enabled){
if(document.form.fh_ap_enabled.value === '0' && document.querySelector('#fh_connection_hint_checkbox').checked){
document.form.fh_ap_enabled.value = '1';
}
}
if(confirm_flag==1 || confirm_flag==7 || confirm_flag==6){
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
if (based_modelid == "RT-AC87U" && wl_unit == "1"){
stopFlag = '0';
detect_qtn_ready();
}
else{
if(document.querySelector('#fh_ap_enabled') && !$('.fronthaul_ap').is(':visible') && wl_unit == dwb_info.band){
document.querySelector('#fh_ap_enabled').value = '0';
}
document.form.submit();
}
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
if (based_modelid == "RT-AC87U" && wl_unit == "1"){
stopFlag = '0';
detect_qtn_ready();
}
else{
if(document.querySelector('#fh_ap_enabled') && !$('.fronthaul_ap').is(':visible') && wl_unit == dwb_info.band){
document.querySelector('#fh_ap_enabled').value = '0';
}
document.form.submit();
}
}
}
}
function validForm(){
var auth_mode = document.form.wl_auth_mode_x.value;
if(!validator.stringSSID(document.form.wl_ssid))
return false;
if(!check_NOnly_to_GN()){
autoFocus('wl_nmode_x');
return false;
}
if(document.form.wl_wep_x.value != "0")
if(!validate_wlphrase('WLANConfig11b', 'wl_phrase_x', document.form.wl_phrase_x))
return false;
if(auth_mode == "psk" || auth_mode == "psk2" || auth_mode == "pskpsk2" || auth_mode == "sae" || auth_mode == "psk2sae"){ //2008.08.04 lock modified
if(is_KR_sku){
if(!validator.psk_KR(document.form.wl_wpa_psk))
return false;
}
else{
if(!validator.psk(document.form.wl_wpa_psk))
return false;
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
return false;
}
return true;
}
function disableAdvFn(){
for(var i=18; i>=3; i--)
document.getElementById("WLgeneral").deleteRow(i);
}
function _change_wl_unit(val){
if(sw_mode == 2 || sw_mode == 4){
if(concurrent_pap)
document.form.wl_subunit.value = 1;
else
document.form.wl_subunit.value = (val == '<% nvram_get("wlc_band"); %>') ? 1 : -1;
}
if(smart_connect_support && (isSwMode("rt") || isSwMode("ap")))
document.form.current_page.value = "Advanced_Wireless_Content.asp?flag=" + document.form.smart_connect_x.value;
change_wl_unit();
}
function _change_smart_connect(val){
current_band = wl_unit;
document.getElementById("wl_unit_field").style.display = "";
var band_desc = new Array();
var band_value = new Array();
if(val == 0){
band_value = [0, 1, 2];
if(band6g_support){
band_desc = ['2.4 GHz', '5 GHz', '6 GHz'];
}else{
band_desc = ['2.4 GHz', '5 GHz-1', '5 GHz-2'];
}
}else if(val == 1){
if(dwb_info.mode) {
band_value = [0, 2];
if(band6g_support){
band_desc = ['2.4 GHz, 5 GHz', '6 GHz (Backhaul)'];
}else{
band_desc = ['2.4 GHz, 5 GHz-1', '5 GHz-2 (Backhaul)'];
}
if(isSupport("amas_fronthaul_network")){
if(dwb_info.band == wl_unit){
if($("#fh_ap_enabled").val() != undefined && $("#fh_ap_enabled").val() != ""){
if($("#fh_ap_enabled").val() == "2")
band_desc = ['2.4 GHz, 5 GHz-1, 5 GHz-2', '5 GHz-2 (Backhaul)'];
}
}
else{
var fh_ap_enabled = httpApi.nvramGet(["fh_ap_enabled"]).fh_ap_enabled;
if(fh_ap_enabled == "2")
band_desc = ['2.4 GHz, 5 GHz-1, 5 GHz-2', '5 GHz-2 (Backhaul)'];
}
}
}
else {
document.getElementById("wl_unit_field").style.display = "none";
band_value = [0];
if(band6g_support){
band_desc = ['2.4 GHz, 5 GHz and 6 GHz'];
}else{
band_desc = ['2.4 GHz, 5 GHz-1 and 5 GHz-2'];
}
}
}else if(val == 2){
band_value = [0, 1];
if(band6g_support){
band_desc = ['2.4 GHz', '5 GHz and 6 GHz'];
}else{
band_desc = ['2.4 GHz', '5 GHz-1 and 5 GHz-2'];
}
}
add_options_x2(document.form.wl_unit, band_desc, band_value, current_band);
}
function checkBW(){
if(wifilogo_support)
return false;
if(document.form.wl_channel.value != 0 && document.form.wl_bw.value == 0){ //Auto but set specific channel
if(document.form.wl_channel.value == "165") // channel 165 only for 20MHz
document.form.wl_bw.selectedIndex = 1;
else if(wl_unit == 0) //2.4GHz for 40MHz
document.form.wl_bw.selectedIndex = 2;
else{ //5GHz else for 80MHz
if(band5g_11ac_support)
document.form.wl_bw.selectedIndex = 3;
else
document.form.wl_bw.selectedIndex = 2;
if (wl_channel_list_5g.getIndexByValue("165") >= 0 ) // rm option 165 if not Auto
document.form.wl_channel.remove(wl_channel_list_5g.getIndexByValue("165"));
}
}
}
function check_NOnly_to_GN(){
if(document.form.wl_nmode_x.value == "0" || document.form.wl_nmode_x.value == "1"){
if(wl_unit == "1"){ //5G
for(var i=0;i<gn_array_5g.length;i++){
if(gn_array_5g[i][0] == "1" && (gn_array_5g[i][3] == "tkip" || gn_array_5g[i][5] == "1" || gn_array_5g[i][5] == "2")){
if(document.form.wl_nmode_x.value == "0")
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4182#>';
else{
if(band5g_11ac_support)
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4185#>';
else
document.getElementById('wl_NOnly_note').innerHTML = '<br>* <#4186#>';
}
document.getElementById('wl_NOnly_note').style.display = "";
return false;
}
}
}
else if(wl_unit == "0"){ //2.4G
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
if(based_modelid == "RT-AX92U" && flag == 1){
obj.options[1] = new Option("N/AC mixed", 8);
obj.options[2] = new Option("Legacy", 2);
}
else{
obj.options[1] = new Option("AX only", 9);
obj.options[2] = new Option("N/AC/AX mixed", 8);
obj.options[3] = new Option("Legacy", 2);
}
}
else{
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N/AC mixed", 8);
obj.options[2] = new Option("Legacy", 2);
}
}
else{
obj.options[0] = new Option("<#241#>", 0);
obj.options[1] = new Option("N only", 1);
obj.options[2] = new Option("Legacy", 2);
}
obj.value = '<% nvram_get("wl_nmode_x"); %>';
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
function tmo_wl_nmode(){
var tmo2nmode = [["0", "<#241#>"],["6", "B Only"],["5", "G Only"],["1", "N Only"],["2", "B/G Mixed"],["4", "G/N Mixed"]];
var tmo5nmode = [["0", "<#241#>"],["7", "A Only"],["1", "N Only"],["3", "AC Only"],["4", "A/N Mixed"]];
free_options(document.form.wl_nmode_x);
if(wl_unit == "0"){ //2.4GHz
for(var i = 0; i < tmo2nmode.length; i++){
add_option(document.form.wl_nmode_x,tmo2nmode[i][1], tmo2nmode[i][0],(document.form.wl_nmode_x_orig.value == tmo2nmode[i][0]));
}
}
else{ //5GHz
for(var i = 0; i < tmo5nmode.length; i++){
add_option(document.form.wl_nmode_x,tmo5nmode[i][1], tmo5nmode[i][0],(document.form.wl_nmode_x_orig.value == tmo5nmode[i][0]));
}
}
}
function enableSmartCon(val, isInitial){
if(isSupport("amas_fronthaul_network") && $(".fronthaul_ap").length > 0){
if(isInitial != "initial"){
$(".fronthaul_ap").hide();
if(val == "1"){
if(dwb_info.mode == "1" && wl_unit == dwb_info.band)
$(".fronthaul_ap").show();
if($("#fh_ap_enabled option[value='2']").length > 0)
$("#fh_ap_enabled").val(2);
}
else{
if($("#fh_ap_enabled option[value='0']").length > 0)
$("#fh_ap_enabled").val(0);
}
}
}
document.form.smart_connect_x.value = val;
var value = new Array();
var desc = new Array();
if(isSupport("triband") && dwb_info.mode) {
desc = ["<#3354#>"];
value = ["1"];
if(isSupport("amas_fronthaul_network")){
if(dwb_info.mode == "1" && wl_unit == dwb_info.band){
if($("#fh_ap_enabled").val() != undefined && $("#fh_ap_enabled").val() != ""){
if($("#fh_ap_enabled").val() == "2")
desc = ["<#3354#>"];
}
}
else{
var fh_ap_enabled = httpApi.nvramGet(["fh_ap_enabled"]).fh_ap_enabled;
if(fh_ap_enabled == "2")
desc = ["<#3354#>"];
}
}
}
else {
if(wl_info.band2g_support && wl_info.band5g_support && (wl_info.band5g_2_support || wl_info.band6g_support)){
if(band6g_support){
desc = ["<#3354#> (2.4 GHz, 5 GHz and 6 GHz)"];
value = ["1"];
}
else{
desc = ["<#3354#> (2.4 GHz, 5 GHz-1 and 5 GHz-2)", "5 GHz Smart Connect (5 GHz-1 and 5 GHz-2)"];
value = ["1", "2"];
}
}
else if(wl_info.band2g_support && wl_info.band5g_support){
desc = ["<#3353#> (2.4 GHz and 5 GHz)"];
value = ["1"];
}
}
add_options_x2(document.form.smart_connect_t, desc, value, val);
$("#he_mode_field").hide();
if(val == 0){
document.getElementById("smart_connect_field").style.display = "none";
document.getElementById("smartcon_rule_link").style.display = "none";
if(wl_unit != 0){
if(wl_info[wl_unit].bw_160_support){
$("#enable_160_field").show();
if((based_modelid == 'GT-AX11000' || based_modelid == 'RT-AX92U' || based_modelid == 'RT-AX95Q' || based_modelid == 'XT8PRO' || based_modelid == 'BM68' || based_modelid == 'XT8_V2' || based_modelid == 'RT-AXE95Q' || based_modelid == 'ET8PRO' || based_modelid == 'ET8_V2' || based_modelid == 'GT-AXE11000' || based_modelid == 'GT-AX11000_PRO' || based_modelid == 'ET12' || based_modelid == 'XT12' || based_modelid == 'GT-AXE16000') && wl2.channel_160m == '' && wl_unit == '2'){
$("#enable_160_field").hide();
}
}
if(wl_info[wl_unit].dfs_support){
$("#dfs_checkbox").show();
}
else{
$("#dfs_checkbox").hide();
}
$('#acs_ch13_checkbox').hide();
}
else {
if (!Qcawifi_support && !Rawifi_support) {
if (document.form.wl_channel.value == '0' && wl_unit == '0' && document.form.wl_channel.length == '14'){
$('#acs_ch13_checkbox').show();
}
}
$("#dfs_checkbox").hide();
}
if(he_frame_support){
if(based_modelid != 'RT-AX92U' || (wl_unit != '0' && wl_unit != '1')){
$("#he_mode_field").show();
}
}
$("#band_separate").hide();
inputCtrl(document.form.wl_bw, 1);
inputCtrl(document.form.wl_channel, 1);
inputCtrl(document.form.wl_nctrlsb, 1);
document.form.wl0_bw.disabled = true;
document.form.wl1_bw.disabled = true;
document.form.wl2_bw.disabled = true;
document.form.wl0_chanspec.disabled = true;
document.form.wl1_chanspec.disabled = true;
document.form.wl2_chanspec.disabled = true;
document.form.wl1_bw_160.disabled = true;
document.form.wl2_bw_160.disabled = true;
}else if(val > 0){
document.getElementById("smart_connect_field").style.display = "";
document.getElementById("smartcon_rule_link").style.display = "table-cell";
$("#enable_160_field").hide();
if ((wl_unit == '0' && val == '2') || based_modelid == "RT-AC3200" || ((based_modelid == "RT-AX92U" || based_modelid == "RT-AX95Q" || based_modelid == "XT8PRO" || based_modelid == "BM68" || based_modelid == "XT8_V2" || based_modelid == "RT-AXE95Q" || based_modelid == "ET8PRO" || based_modelid == "ET8_V2") && country != "EU" && wl_unit == "1")) {
$("#dfs_checkbox").hide();
}
else {
$("#dfs_checkbox").show();
}
if((wl_unit == '0' && val == '2')){
if (!Qcawifi_support && !Rawifi_support) {
if (document.form.wl_channel.value == '0' && wl_unit == '0' && document.form.wl_channel.length == '14'){
$('#acs_ch13_checkbox').show();
}
}
}
if(dwb_info.mode && wl_unit == dwb_info.band && wl_unit != 0 && bw_160_support) {
$("#enable_160_field").show();
if((based_modelid == 'GT-AX11000' || based_modelid == 'RT-AX92U' || based_modelid == 'RT-AX95Q' || based_modelid == 'XT8PRO' || based_modelid == 'BM68' || based_modelid == 'XT8_V2' || based_modelid == 'RT-AXE95Q' || based_modelid == 'ET8PRO' || based_modelid == 'ET8_V2' || based_modelid == 'GT-AXE11000' || based_modelid == 'GT-AX11000_PRO' || based_modelid == 'ET12' || based_modelid == 'XT12' || based_modelid == 'GT-AXE16000') && wl2.channel_160m == '' && wl_unit == '2'){
$("#enable_160_field").hide();
}
}
/*Separate Wireless Settings*/
$("#band_separate").show();
if(val == '1'){
separateGenBWTable('0');
separateGenBWTable('1');
band0_channel = '<% nvram_get("wl0_chanspec"); %>';
band1_channel = '<% nvram_get("wl1_chanspec"); %>';
if(wl_info['1'].bw_160_support){
$('#band1_160_field').show();
}
if(he_frame_support){
if(based_modelid != 'RT-AX92U' || (wl_unit != '0' && wl_unit != '1')){
$("#he_mode_field").show();
}
else if(based_modelid == 'RT-AX92U' && !dwb_info.mode){
$("#he_mode_field").show();
}
}
if (band0_channel == '0') {
$('#band0_autoChannel').show();
$('#band0_autoChannel').html('Current Control Channel: ' + cur_control_channel[0]);
}
if (band1_channel == '0') {
$('#band1_autoChannel').show();
$('#band1_autoChannel').html('Current Control Channel: ' + cur_control_channel[1]);
}
if (wl_info.band5g_2_support || wl_info.band6g_support) {
band2_channel = '<% nvram_get("wl2_chanspec"); %>';
separateGenBWTable('2');
if(wl_info['2'].bw_160_support){
$('#band2_160_field').show();
}
if (band2_channel == '0') {
$('#band2_autoChannel').show();
$('#band2_autoChannel').html('Current Control Channel: ' + cur_control_channel[2]);
}
}
$('#band0_title_field').show();
$('#band0_bandwidth_field').show();
$('#band0_channel_field').show();
$('#band0_extChannel_field').show();
inputCtrl(document.form.wl_bw, 0);
inputCtrl(document.form.wl_channel, 0);
inputCtrl(document.form.wl_nctrlsb, 0);
document.form.wl0_bw.disabled = false;
document.form.wl1_bw.disabled = false;
document.form.wl2_bw.disabled = false;
document.form.wl0_chanspec.disabled = false;
document.form.wl1_chanspec.disabled = false;
document.form.wl2_chanspec.disabled = false;
document.form.wl1_bw_160.disabled = false;
document.form.wl2_bw_160.disabled = false;
if(wl_info.band5g_2_support || wl_info.band6g_support){
if(band6g_support){
$('#5ghz_title').html('5 GHz');
}
else{
$('#5ghz_title').html('5 GHz-1');
}
if(dwb_info.mode){
$('#band2_title_field').hide();
$('#band2_bandwidth_field').hide();
$('#band2_channel_field').hide();
$('#band2_extChannel_field').hide();
if(wl_unit == '2'){
inputCtrl(document.form.wl_bw, 1);
inputCtrl(document.form.wl_channel, 1);
inputCtrl(document.form.wl_nctrlsb, 1);
document.form.wl0_bw.disabled = true;
document.form.wl1_bw.disabled = true;
document.form.wl2_bw.disabled = true;
document.form.wl0_chanspec.disabled = true;
document.form.wl1_chanspec.disabled = true;
document.form.wl2_chanspec.disabled = true;
document.form.wl1_bw_160.disabled = true;
document.form.wl2_bw_160.disabled = true;
$("#band_separate").hide();
}
}
else{
if(band6g_support){
$('#5g2_title').html('6 GHz');
}
$('#band2_title_field').show();
$('#band2_bandwidth_field').show();
$('#band2_channel_field').show();
$('#band2_extChannel_field').show();
}
}
}
else if(val == '2'){
if(wl_unit == '0'){
inputCtrl(document.form.wl_bw, 1);
inputCtrl(document.form.wl_channel, 1);
inputCtrl(document.form.wl_nctrlsb, 1);
document.form.wl0_bw.disabled = true;
document.form.wl1_bw.disabled = true;
document.form.wl2_bw.disabled = true;
document.form.wl0_chanspec.disabled = true;
document.form.wl1_chanspec.disabled = true;
document.form.wl2_chanspec.disabled = true;
document.form.wl1_bw_160.disabled = true;
document.form.wl2_bw_160.disabled = true;
$("#band_separate").hide();
if(he_frame_support){
if(based_modelid != 'RT-AX92U' || (wl_unit != '0' && wl_unit != '1')){
$("#he_mode_field").show();
}
}
}
else{
separateGenBWTable('1');
band1_channel = '<% nvram_get("wl1_chanspec"); %>';
if (wl_info['1'].bw_160_support) {
$('#band1_160_field').show();
}
if (band1_channel == '0') {
$('#band1_autoChannel').show();
$('#band1_autoChannel').html('Current Control Channel: ' + cur_control_channel[1]);
}
if (wl_info.band5g_2_support || wl_info.band6g_support) {
band2_channel = '<% nvram_get("wl2_chanspec"); %>';
separateGenBWTable('2');
if (wl_info['2'].bw_160_support) {
$('#band2_160_field').show();
}
if (band2_channel == '0') {
$('#band2_autoChannel').show();
$('#band2_autoChannel').html('Current Control Channel: ' + cur_control_channel[2]);
}
}
if(he_frame_support){
$("#he_mode_field").show();
}
inputCtrl(document.form.wl_bw, 0);
inputCtrl(document.form.wl_channel, 0);
inputCtrl(document.form.wl_nctrlsb, 0);
document.form.wl0_bw.disabled = true;
document.form.wl1_bw.disabled = false;
document.form.wl2_bw.disabled = false;
document.form.wl0_chanspec.disabled = true;
document.form.wl1_chanspec.disabled = false;
document.form.wl2_chanspec.disabled = false;
document.form.wl1_bw_160.disabled = false;
document.form.wl2_bw_160.disabled = false;
$("#band_separate").show();
$('#band0_title_field').hide();
$('#band0_bandwidth_field').hide();
$('#band0_channel_field').hide();
$('#band0_extChannel_field').hide();
$('#band1_title_field').show();
$('#band1_bandwidth_field').show();
$('#band1_channel_field').show();
$('#band1_extChannel_field').show();
if(band6g_support){
$('#5g2_title').html('6 GHz');
}
$('#band2_title_field').show();
$('#band2_bandwidth_field').show();
$('#band2_channel_field').show();
$('#band2_extChannel_field').show();
}
}
$("#dfs_checkbox").hide();
document.form.acs_dfs.value = 0;
}
if((val == 0 || (val == 2 && wl_unit == 0)) || (dwb_info.mode && wl_unit == dwb_info.band)){
document.getElementById("wl_unit_field").style.display = "";
document.form.wl_nmode_x.disabled = "";
if(document.form.wl_unit[0].selected == true){
document.getElementById("wl_gmode_checkbox").style.display = "";
}
if(band5g_11ac_support){
regen_5G_mode(document.form.wl_nmode_x, wl_unit)
}else{
free_options(document.form.wl_nmode_x);
document.form.wl_nmode_x.options[0] = new Option("<#241#>", 0);
document.form.wl_nmode_x.options[1] = new Option("N only", 1);
document.form.wl_nmode_x.options[2] = new Option("Legacy", 2);
}
change_wl_nmode(document.form.wl_nmode_x);
}else{
document.getElementById("wl_unit_field").style.display = "none";
regen_auto_option(document.form.wl_nmode_x);
document.getElementById("wl_gmode_checkbox").style.display = "none";
regen_auto_option(document.form.wl_bw);
regen_auto_option(document.form.wl_channel);
regen_auto_option(document.form.wl_nctrlsb);
}
if(wl_info.band2g_support && wl_info.band5g_support && (wl_info.band5g_2_support || wl_info.band6g_support))
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
}
function regen_auto_option(obj){
free_options(obj);
obj.options[0] = new Option("<#241#>", 0);
obj.selectedIndex = 0;
}
function enable_160MHz(obj){
cur = '<% nvram_get("wl_bw"); %>';
var bws = new Array();
var bwsDesc = new Array();
if(obj.checked){
bws = [0, 1, 2, 3, 5];
bwsDesc = ["20/40/80/160 MHz", "20 MHz", "40 MHz", "80 MHz", "160 MHz"];
enable_bw_160 = true;
document.form.acs_dfs_checkbox.checked = true;
check_DFS_support(document.form.acs_dfs_checkbox);
}
else{
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
enable_bw_160 = false;
}
add_options_x2(document.form.wl_bw, bwsDesc, bws, cur);
wl_chanspec_list_change();
change_channel(document.form.wl_channel);
}
function he_frame_mode(obj) {
if (obj.value == '0' && wl_unit != 0) {
$("#enable_160mhz")[0].checked = false
enable_160MHz($("#enable_160mhz")[0]);
document.form.acs_dfs_checkbox.checked = false;
document.form.acs_dfs.value = 0;
}
}
var band1_enable_bw_160 = '<% nvram_get("wl1_bw_160"); %>';
var band2_enable_bw_160 = '<% nvram_get("wl2_bw_160"); %>';
function separateGenBWTable(unit){
var bws = new Array();
var bwsDesc = new Array();
var curChannel = '0';
var curBandwidth = '0';
if(unit == '0'){
bws = [0, 1, 2];
bwsDesc = ["20/40 MHz", "20 MHz", "40 MHz"];
curBandwidth = '<% nvram_get("wl0_bw"); %>';
curChannel = '<% nvram_get("wl0_chanspec"); %>';
add_options_x2(document.form.band0_bw, bwsDesc, bws, curBandwidth);
}
else if(unit == '1'){
curBandwidth = '<% nvram_get("wl1_bw"); %>';
curChannel = '<% nvram_get("wl1_chanspec"); %>';
if (band5g_11ax_support) {
if (band1_enable_bw_160 == '1') {
if (wl1.channel_160m == '') {
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
else {
bws = [0, 1, 2, 3, 5];
bwsDesc = ["20/40/80/160 MHz", "20 MHz", "40 MHz", "80 MHz", "160 MHz"];
}
}
else {
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
}
else {
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
add_options_x2(document.form.band1_bw, bwsDesc, bws, curBandwidth);
}
else if(unit == '2'){
curBandwidth = '<% nvram_get("wl2_bw"); %>';
curChannel = '<% nvram_get("wl2_chanspec"); %>';
if (band5g_11ax_support) {
if (band2_enable_bw_160 == '1') {
if (wl2.channel_160m == '') {
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
else {
bws = [0, 1, 2, 3, 5];
bwsDesc = ["20/40/80/160 MHz", "20 MHz", "40 MHz", "80 MHz", "160 MHz"];
}
}
else {
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
}
else {
bws = [0, 1, 2, 3];
bwsDesc = ["20/40/80 MHz", "20 MHz", "40 MHz", "80 MHz"];
}
add_options_x2(document.form.band2_bw, bwsDesc, bws, curBandwidth);
}
separateGenChannel(unit, curChannel, curBandwidth);
}
function separateEnable_160MHz(obj){
if(obj.id == 'band1_160'){
band1_enable_bw_160 = obj.checked ? 1 : 0;
separateGenBWTable('1');
}
else if(obj.id == 'band2_160'){
band2_enable_bw_160 = obj.checked ? 1 : 0;
separateGenBWTable('2');
}
}
function separateGenChannel(unit, channel, bandwidth){
var channel_2g = JSON.parse('<% channel_list_2g(); %>');
var channel_5g_1 = JSON.parse('<% channel_list_5g(); %>');
var channel_5g_2 = JSON.parse('<% channel_list_5g_2(); %>');
var channel_2g_val = JSON.parse('<% channel_list_2g(); %>');
var channel_5g_1_val = new Array;
var channel_5g_2_val = new Array;
var band1_curChannel = '<% nvram_get("wl1_chanspec"); %>';
var band2_curChannel = '<% nvram_get("wl2_chanspec"); %>';
var curChannel = channel;
var curBandwidth = bandwidth;
if(unit == '0'){
var extend_channel = new Array;
var extend_channel_value = new Array;
var band0_curCtrlChannel = 0;
var band0_curExtChannel = 0;
if (curChannel.search('[ul]') != -1) {
band0_curExtChannel = curChannel.slice(-1); //current control channel
band0_curCtrlChannel = curChannel.split(band0_curExtChannel)[0]; //current extension channel direction
}
else {
band0_curCtrlChannel = curChannel;
}
if(channel_2g.length == '11'){
$('#band0_acs_ch13').hide();
if(band0_curCtrlChannel == 0){
extend_channel = ["<#241#>"];
extend_channel_value = ["0"];
}
else if(band0_curCtrlChannel >= 1 && band0_curCtrlChannel <= 4){
extend_channel = ["<#4044#>"];
extend_channel_value = ["l"];
}
else if (band0_curCtrlChannel >= 5 && band0_curCtrlChannel <= 7) {
extend_channel = ["<#4044#>", "<#4045#>"];
extend_channel_value = ["l", "u"];
}
else if (band0_curCtrlChannel >= 8 && band0_curCtrlChannel <= 11) {
extend_channel = ["<#4045#>"];
extend_channel_value = ["u"];
}
}
else if(channel_2g.length == '13'){
$('#band0_acs_ch13').hide();
if (band0_curCtrlChannel == 0) {
extend_channel = ["<#241#>"];
extend_channel_value = ["0"];
$('#band0_acs_ch13').show();
}
else if (band0_curCtrlChannel >= 1 && band0_curCtrlChannel <= 4) {
extend_channel = ["<#4044#>"];
extend_channel_value = ["l"];
}
else if (band0_curCtrlChannel >= 5 && band0_curCtrlChannel <= 9) {
extend_channel = ["<#4044#>", "<#4045#>"];
extend_channel_value = ["l", "u"];
}
else if (band0_curCtrlChannel >= 10 && band0_curCtrlChannel <= 13) {
extend_channel = ["<#4045#>"];
extend_channel_value = ["u"];
}
}
add_options_x2(document.form.band0_extChannel, extend_channel, extend_channel_value, band0_curExtChannel);
if (curBandwidth == '0' || curBandwidth == '2') {
$('#band0_extChannel_field').show();
}
else if (curBandwidth == '1') {
$('#band0_extChannel_field').hide();
}
channel_2g.unshift('<#241#>');
channel_2g_val.unshift('0');
add_options_x2(document.form.band0_channel, channel_2g, channel_2g_val, band0_curCtrlChannel);
}
else if(unit == '1'){
if(curBandwidth == '0'){
$('#band1_extChannel_field').show();
if(amesh_support && httpApi.hasAiMeshNode() && !wl_info.band5g_2_support){
var _wl_channel = new Array();
channel_5g_1 = [];
for(j=1; j<mesh_5g.auto.chanspec.length; j++){
channel_5g_1.push(mesh_5g.auto.chanlist[j]);
channel_5g_1_val.push(mesh_5g.auto.chanspec[j]);
}
}
else{
loop_auto: for (i = 0; i < channel_5g_1.length; i++) {
var _cur_channel = parseInt(channel_5g_1[i]);
if (band1_enable_bw_160 == '1') {
for (j = 0; j < wl1.channel_160m.length; j++) {
if (wl1.channel_160m[j].indexOf(_cur_channel) != -1) {
channel_5g_1_val[i] = _cur_channel + "/160";
continue loop_auto;
}
}
}
for (j = 0; j < wl1.channel_80m.length; j++) {
if (wl1.channel_80m[j].indexOf(_cur_channel) != -1) {
channel_5g_1_val[i] = _cur_channel + "/80";
continue loop_auto;
}
}
for (j = 0; j < wl1.channel_40m.length; j++) {
if (wl1.channel_40m[j].indexOf(_cur_channel) != -1) {
channel_5g_1_val[i] = wlextchannel_fourty(_cur_channel);
continue loop_auto;
}
}
for (j = 0; j < wl1.channel_20m.length; j++) {
if (wl1.channel_20m[j].indexOf(_cur_channel) != -1) {
channel_5g_1_val[i] = _cur_channel.toString();
continue loop_auto;
}
}
}
}
}
else if(curBandwidth == '5'){
$('#band1_extChannel_field').show();
var _wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode() && !wl_info.band5g_2_support){
channel_5g_1 = [];
for(j=1; j<mesh_5g.chan_160m.chanspec.length; j++){
channel_5g_1.push(mesh_5g.chan_160m.chanlist[j]);
channel_5g_1_val.push(mesh_5g.chan_160m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_1.length; i++) {
var _cur_channel = parseInt(channel_5g_1[i]);
var _reg = new RegExp("^" + _cur_channel);
for (j = 0; j < wl1.channel_160m.length; j++) {
if (wl1.channel_160m[j].match(_reg) != null) {
_wl_channel.push(_cur_channel.toString());
channel_5g_1_val.push(_cur_channel + "/160");
}
}
}
channel_5g_1 = _wl_channel;
}
}
else if(curBandwidth == '3'){
$('#band1_extChannel_field').show();
var _wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode() && !wl_info.band5g_2_support){
channel_5g_1 = [];
for(j=1; j<mesh_5g.chan_80m.chanspec.length; j++){
channel_5g_1.push(mesh_5g.chan_80m.chanlist[j]);
channel_5g_1_val.push(mesh_5g.chan_80m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_1.length; i++) {
var _cur_channel = parseInt(channel_5g_1[i]);
var _reg = new RegExp("^" + _cur_channel);
for (j = 0; j < wl1.channel_80m.length; j++) {
if (wl1.channel_80m[j].match(_reg) != null) {
_wl_channel.push(_cur_channel.toString());
channel_5g_1_val.push(_cur_channel + "/80");
}
}
}
channel_5g_1 = _wl_channel;
}
}
else if(curBandwidth == '2'){
$('#band1_extChannel_field').show();
_wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode() && !wl_info.band5g_2_support){
channel_5g_1 = [];
for(j=1; j<mesh_5g.chan_40m.chanspec.length; j++){
channel_5g_1.push(mesh_5g.chan_40m.chanlist[j]);
channel_5g_1_val.push(mesh_5g.chan_40m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_1.length; i++) {
var _cur_channel = parseInt(channel_5g_1[i]);
var _reg = new RegExp("^" + _cur_channel);
for (j = 0; j < wl1.channel_40m.length; j++) {
if (wl1.channel_40m[j].match(_reg) != null) {
_wl_channel.push(_cur_channel.toString());
channel_5g_1_val.push(wlextchannel_fourty(_cur_channel));
}
}
}
channel_5g_1 = _wl_channel;
}
}
else {
$('#band1_extChannel_field').hide();
_wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode() && !wl_info.band5g_2_support){
channel_5g_1 = [];
for(j=1; j<mesh_5g.chan_20m.chanspec.length; j++){
channel_5g_1.push(mesh_5g.chan_20m.chanlist[j]);
channel_5g_1_val.push(mesh_5g.chan_20m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_1.length; i++) {
var _cur_channel = parseInt(channel_5g_1[i]);
_wl_channel.push(_cur_channel.toString());
channel_5g_1_val.push(_cur_channel);;
}
}
}
channel_5g_1.unshift('<#241#>');
channel_5g_1_val.unshift('0');
add_options_x2(document.form.band1_channel, channel_5g_1, channel_5g_1_val, band1_curChannel);
if (document.form.band1_channel.value == '0') {
if(channel_5g_1.indexOf('56') != -1 || channel_5g_1.indexOf('100') != -1){
$('#band1_acsDFS').show();
if(curBandwidth == '5'){
document.form.band1_acsDFS_checkbox.checked = true;
document.form.band1_acsDFS_checkbox.disabled = true;
}
else{
document.form.band1_acsDFS_checkbox.disabled = false;
}
}
else{
$('#band1_acsDFS').hide();
}
}
else {
$('#band1_acsDFS').hide();
}
}
else if(unit == '2'){
if(band6g_support){ // due to GT-AXE11000 does not support
if(document.getElementById('band2_psc6g_checkbox').checked){
channel_5g_2 = ['37', '53', '69', '85', '101', '117', '133', '149', '165', '181', '197', '213'];
}
for(var i=channel_5g_2.length-1; i>=0; i--){
var _channel = parseInt(channel_5g_2[i]);
if(_channel < 30 || _channel > 221){
channel_5g_2.splice(i, 1);
}
}
$('#band2_psc6g').show();
}
if (curBandwidth == '0') {
$('#band2_extChannel_field').show();
if(amesh_support && httpApi.hasAiMeshNode()){
var _wl_channel = new Array();
channel_5g_2 = [];
for(j=1; j<mesh_5g2.auto.chanspec.length; j++){
channel_5g_2.push(mesh_5g2.auto.chanlist[j]);
channel_5g_2_val.push(mesh_5g2.auto.chanspec[j]);
}
}
else{
loop_auto: for (i = 0; i < channel_5g_2.length; i++) {
var _cur_channel = parseInt(channel_5g_2[i]);
if (band2_enable_bw_160 == '1') {
for (j = 0; j < wl2.channel_160m.length; j++) {
if (wl2.channel_160m[j].indexOf(_cur_channel) != -1) {
if(band6g_support){
channel_5g_2_val[i] = "6g" + _cur_channel + "/160";
}
else{
channel_5g_2_val[i] = _cur_channel + "/160";
}
continue loop_auto;
}
}
}
for (j = 0; j < wl2.channel_80m.length; j++) {
if (wl2.channel_80m[j].indexOf(_cur_channel) != -1) {
if(band6g_support){
channel_5g_2_val[i] = "6g" + _cur_channel + "/80";
}
else{
channel_5g_2_val[i] = _cur_channel + "/80";
}
continue loop_auto;
}
}
for (j = 0; j < wl2.channel_40m.length; j++) {
if (wl2.channel_40m[j].indexOf(_cur_channel) != -1) {
if(band6g_support){
channel_5g_2_val[i] = "6g" + _cur_channel + "/40";
}
else{
channel_5g_2_val[i] = wlextchannel_fourty(_cur_channel);
}
continue loop_auto;
}
}
for (j = 0; j < wl2.channel_20m.length; j++) {
if (wl2.channel_20m[j].indexOf(_cur_channel) != -1) {
if(band6g_support){
channel_5g_2_val[i] = "6g" + _cur_channel.toString();
}
else{
channel_5g_2_val[i] = _cur_channel.toString();
}
continue loop_auto;
}
}
}
}
}
else if (curBandwidth == '5') {
$('#band2_extChannel_field').show();
var _wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode()){
channel_5g_2 = [];
for(j=1; j<mesh_5g2.chan_160m.chanspec.length; j++){
channel_5g_2.push(mesh_5g2.chan_160m.chanlist[j]);
channel_5g_2_val.push(mesh_5g2.chan_160m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_2.length; i++) {
var _cur_channel = parseInt(channel_5g_2[i]);
var _reg = new RegExp("^" + _cur_channel);
for (j = 0; j < wl2.channel_160m.length; j++) {
if(band6g_support){
if (wl2.channel_160m[j].includes('6g' + _cur_channel + '/160')) {
_wl_channel.push(_cur_channel.toString());
channel_5g_2_val.push("6g" + _cur_channel + "/160");
}
}
else{
if (wl2.channel_160m[j].match(_reg) != null) {
_wl_channel.push(_cur_channel.toString());
channel_5g_2_val.push(_cur_channel + "/160");
}
}
}
}
channel_5g_2 = _wl_channel;
}
}
else if (curBandwidth == '3') {
$('#band2_extChannel_field').show();
var _wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode()){
channel_5g_2 = [];
for(j=1; j<mesh_5g2.chan_80m.chanspec.length; j++){
channel_5g_2.push(mesh_5g2.chan_80m.chanlist[j]);
channel_5g_2_val.push(mesh_5g2.chan_80m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_2.length; i++) {
var _cur_channel = parseInt(channel_5g_2[i]);
var _reg = new RegExp("^" + _cur_channel);
for (j = 0; j < wl2.channel_80m.length; j++) {
if(band6g_support){
if (wl2.channel_80m[j].includes('6g' + _cur_channel + '/80')) {
_wl_channel.push(_cur_channel.toString());
channel_5g_2_val.push("6g" + _cur_channel + "/80");
}
}
else{
if (wl2.channel_80m[j].match(_reg) != null) {
_wl_channel.push(_cur_channel.toString());
channel_5g_2_val.push(_cur_channel + "/80");
}
}
}
}
channel_5g_2 = _wl_channel;
}
}
else if (curBandwidth == '2') {
$('#band2_extChannel_field').show();
_wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode()){
channel_5g_2 = [];
for(j=1; j<mesh_5g2.chan_40m.chanspec.length; j++){
channel_5g_2.push(mesh_5g2.chan_40m.chanlist[j]);
channel_5g_2_val.push(mesh_5g2.chan_40m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_2.length; i++) {
var _cur_channel = parseInt(channel_5g_2[i]);
var _reg = new RegExp("^" + _cur_channel);
for (j = 0; j < wl2.channel_40m.length; j++) {
if(band6g_support){
if (wl2.channel_40m[j].includes('6g' + _cur_channel + '/40')) {
_wl_channel.push(_cur_channel.toString());
channel_5g_2_val.push("6g" + _cur_channel + "/40");
}
}
else{
if (wl2.channel_40m[j].match(_reg) != null) {
_wl_channel.push(_cur_channel.toString());
channel_5g_2_val.push(wlextchannel_fourty(_cur_channel));
}
}
}
}
channel_5g_2 = _wl_channel;
}
}
else{
$('#band2_extChannel_field').hide();
_wl_channel = new Array();
if(amesh_support && httpApi.hasAiMeshNode()){
channel_5g_2 = [];
for(j=1; j<mesh_5g2.chan_20m.chanspec.length; j++){
channel_5g_2.push(mesh_5g2.chan_20m.chanlist[j]);
channel_5g_2_val.push(mesh_5g2.chan_20m.chanspec[j]);
}
}
else{
for (i = 0; i < channel_5g_2.length; i++) {
var _cur_channel = parseInt(channel_5g_2[i]);
_wl_channel.push(_cur_channel.toString());
if(band6g_support){
channel_5g_2_val.push("6g" + _cur_channel);
}
else{
channel_5g_2_val.push(_cur_channel.toString());
}
}
}
}
channel_5g_2.unshift('<#241#>');
channel_5g_2_val.unshift('0');
add_options_x2(document.form.band2_channel, channel_5g_2, channel_5g_2_val, band2_curChannel);
if (document.form.band2_channel.value == '0') {
if(channel_5g_2.indexOf('100') != -1){
$('#band2_acsDFS').show();
if(document.form.band2_bw.value == '5'){
document.form.band2_acsDFS_checkbox.checked = true;
document.form.band2_acsDFS_checkbox.disabled = true;
}
else{
document.form.band2_acsDFS_checkbox.disabled = false;
}
}
else{
$('#band2_acsDFS').hide();
}
if(!band6g_support && channel_5g_2.indexOf('169') != -1){
$('#band2_acs_unii4_field').show();
}
else{
$('#band2_acs_unii4_field').hide();
}
}
else {
$('#band2_acsDFS').hide();
}
}
}
function separateBWHandler(unit, bw){
var curChannel = '0';
if (unit == '0') {
curChannel = '<% nvram_get("wl0_chanspec"); %>';
if(bw == '0' || bw == '2'){
$('#band0_extChannel_field').show();
}
else if(bw == '1'){
$('#band0_extChannel_field').hide();
}
}
else if(unit == '1'){
curChannel = '<% nvram_get("wl1_chanspec"); %>';
if (bw == '0' || bw == '2') {
$('#band1_extChannel_field').show();
}
else if (bw == '1') {
$('#band1_extChannel_field').hide();
}
}
else if(unit == '2'){
curChannel = '<% nvram_get("wl0_chanspec"); %>';
if (bw == '0' || bw == '2') {
$('#band2_extChannel_field').show();
}
else if (bw == '1') {
$('#band2_extChannel_field').hide();
}
}
separateGenChannel(unit, curChannel, bw);
}
function separateChannelHandler(unit, channel){
var channel_2g = JSON.parse('<% channel_list_2g(); %>');
var channel_5g_1 = JSON.parse('<% channel_list_5g(); %>');
var channel_5g_2 = JSON.parse('<% channel_list_5g_2(); %>');
var curCtrlChannel = channel;
var extend_channel = new Array;
var extend_channel_value = new Array;
if(unit == '0'){
$('#band0_acs_ch13').hide();
if (channel_2g.length == '11') {
if (curCtrlChannel == 0) {
extend_channel = ["<#241#>"];
extend_channel_value = ["0"];
}
else if (curCtrlChannel >= 1 && curCtrlChannel <= 4) {
extend_channel = ["<#4044#>"];
extend_channel_value = ["l"];
}
else if (curCtrlChannel >= 5 && curCtrlChannel <= 7) {
extend_channel = ["<#4044#>", "<#4045#>"];
extend_channel_value = ["l", "u"];
}
else if (curCtrlChannel >= 8 && curCtrlChannel <= 11) {
extend_channel = ["<#4045#>"];
extend_channel_value = ["u"];
}
}
else if (channel_2g.length == '13') {
if (curCtrlChannel == 0) {
extend_channel = ["<#241#>"];
extend_channel_value = ["0"];
$('#band0_acs_ch13').show();
}
else if (curCtrlChannel >= 1 && curCtrlChannel <= 4) {
extend_channel = ["<#4044#>"];
extend_channel_value = ["l"];
}
else if (curCtrlChannel >= 5 && curCtrlChannel <= 9) {
extend_channel = ["<#4044#>", "<#4045#>"];
extend_channel_value = ["l", "u"];
}
else if (curCtrlChannel >= 10 && curCtrlChannel <= 13) {
extend_channel = ["<#4045#>"];
extend_channel_value = ["u"];
}
}
add_options_x2(document.form.band0_extChannel, extend_channel, extend_channel_value, curCtrlChannel);
}
else if (unit == '1') {
if (curCtrlChannel == '0') {
if(channel_5g_1.indexOf('56') != -1 || channel_5g_1.indexOf('100') != -1){
$('#band1_acsDFS').show();
if(document.form.band1_bw.value == '5'){
document.form.band1_acsDFS_checkbox.checked = true;
document.form.band1_acsDFS_checkbox.disabled = true;
}
else{
document.form.band1_acsDFS_checkbox.disabled = false;
}
}
else{
$('#band1_acsDFS').hide();
}
}
else {
$('#band1_acsDFS').hide();
}
}
else if (unit == '2') {
if (curCtrlChannel == '0') {
if(channel_5g_2.indexOf('100') != -1){
$('#band2_acsDFS').show();
if(document.form.band2_bw.value == '5'){
document.form.band2_acsDFS_checkbox.checked = true;
document.form.band2_acsDFS_checkbox.disabled = true;
}
else{
document.form.band2_acsDFS_checkbox.disabled = false;
}
}
else{
$('#band2_acsDFS').hide();
}
if(!band6g_support && channel_5g_2.indexOf('169') != -1){
$('#band2_acs_unii4_field').show();
}
else{
$('#band2_acs_unii4_field').hide();
}
}
else {
$('#band2_acsDFS').hide();
$('#band2_acs_unii4_field').hide();
}
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
function controlAXOnlyHint() {
if(document.form.wl_nmode_x.value == "9")
$("#wl_AXOnly_note").show();
else
$("#wl_AXOnly_note").hide();
}
function ajax_wl_channel(){
$.ajax({
url: '/ajax_wl_channel.asp',
dataType: 'script',
error: function(xhr) {
setTimeout("ajax_wl_channel();", 1000);
},
success: function(response){
$("#auto_channel").html("<#3988#>: " + cur_control_channel[wl_unit]);
setTimeout("ajax_wl_channel();", 5000);
}
});
}
function handleMFP(){
if(mbo_support && document.form.wl_mbo_enable.value == '1' && document.form.wl_mfp.value == '0'){
$('#mbo_notice').show();
}
else{
$('#mbo_notice').hide();
}
}
function handleAiMeshBackhaul(value){
var fh_ap_enabled = '<% nvram_get("fh_ap_enabled"); %>';
if(value === '2'){
if(meshBackhaulAutoSupport){
document.querySelector('#fh_connection_hint').style.display = 'none';
document.querySelector('#fh_ap_enabled').value = '2';
}
if(unii4Support){
document.querySelector('#acs_unii4_checkbox').checked = false;
}
}
else if(value === '0'){
if(meshBackhaulAutoSupport){
document.querySelector('#fh_connection_hint').style.display = '';
}
if(unii4Support){
if(fh_ap_enabled === '1'){
document.querySelector('#acs_unii4_checkbox').checked = false;
if(meshBackhaulAutoSupport){
document.querySelector('#fh_connection_hint_checkbox').checked = true;
}
}
else{
document.querySelector('#acs_unii4_checkbox').checked = true;
if(meshBackhaulAutoSupport){
document.querySelector('#fh_connection_hint_checkbox').checked = false;
}
}
}
}
}
function handleFhConnectionHint(value){
if(value){
if(document.querySelector('#fh_ap_enabled')){
document.querySelector('#fh_ap_enabled').value = '0';
}
if(unii4Support){
document.querySelector('#acs_unii4_checkbox').checked = false;
}
}
else{
if(document.querySelector('#fh_ap_enabled')){
document.querySelector('#fh_ap_enabled').value = '0';
}
if(unii4Support){
document.querySelector('#acs_unii4_checkbox').checked = true;
}
}
}
function handleUNII4Hint(value){
if(value){
alert("<#4041#>");
}
}
function gen_fronthaul_ap(_value){
if(isSupport("amas_fronthaul_network")){
$(".fronthaul_ap").remove();
var get_cfg_clientlist = httpApi.hookGet("get_cfg_clientlist", true);
if(get_cfg_clientlist[0] != undefined){
var $selectObj = $("<select/>").attr({"id":"fh_ap_enabled", "name":"fh_ap_enabled"}).addClass("input_option");
if(meshBackhaulAutoSupport || unii4Support) {
$selectObj.attr('onChange', 'handleAiMeshBackhaul(this.value)');
}
var select_node_capability = httpApi.aimesh_get_node_capability(get_cfg_clientlist[0]);
if(select_node_capability.fronthaul_ap_option_on)
$selectObj.append($('<option>', {value: "2", text: "<#1169#>"}));
/*
if(select_node_capability.fronthaul_ap_option_auto)
$selectObj.append($('<option>', {value: "1", text: "<#241#>"}));
*/
if(select_node_capability.fronthaul_ap_option_off)
$selectObj.append($('<option>', {value: "0", text: "<#1170#>"}));
if(meshBackhaulAutoSupport ){
$selectObj.append($('<option>', {value: "1", text: "", hidden: true}));
}
if($selectObj.find("option").length > 0){
var $trObj = $("<tr>").addClass("fronthaul_ap");
var $thObj = $("<th>").html("<#1168#>");
var $tdObj = $("<td>");
$trObj.append($thObj).append($tdObj.append($selectObj));
if(meshBackhaulAutoSupport ){
var fh_connect_obj ='<div id="fh_connection_hint" style="color:#FC0;"><input id="fh_connection_hint_checkbox" type="checkbox" onchange="handleFhConnectionHint(this.checked)"><#1171#></div>';
$trObj.append($thObj).append($tdObj.append(fh_connect_obj));
}
$("#wl_ssid_field").after($trObj);
var fh_ap_enabled = httpApi.nvramGet(["fh_ap_enabled"]).fh_ap_enabled;
if(fh_ap_enabled != "" && $selectObj.children("option[value=" + fh_ap_enabled + "]").length > 0)
$selectObj.val(fh_ap_enabled);
$selectObj.unbind("change");
$selectObj.change(function(){
if(document.form.smart_connect_x.value == "1"){
/*
if(dwb_info.band == wl_unit){
var value = ["1"];
var desc = ["<#3353#> (2.4 GHz and 5 GHz)"];
if($(this).val() == "2")
desc = ["<#3354#>"];
add_options_x2(document.form.smart_connect_t, desc, value, "1");
}
*/
_change_smart_connect("1");
}
});
}
if(dwb_info.mode == "1" && _value == "1" && dwb_info.band == wl_unit)
$(".fronthaul_ap").show();
else
$(".fronthaul_ap").hide();
}
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
<script>
</script>
<iframe name="hidden_frame" id="hidden_frame" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="autochannelform" action="/start_apply2.htm" target="hidden_frame">
<input type="hidden" name="productid" value="<% nvram_get("productid"); %>">
<input type="hidden" name="current_page" value="Advanced_Wireless_Content.asp">
<input type="hidden" name="next_page" value="Advanced_Wireless_Content.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_mode" value="apply_new">
<input type="hidden" name="action_script" value="restart_wireless">
<input type="hidden" name="action_wait" value="10">
<input type="hidden" name="wl_country_code" value="<% nvram_get("wl0_country_code"); %>" disabled>
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="wl_chanspec" value="">
<input type="hidden" name="wl_unit" value="">
<input type="hidden" name="force_change" value="<% nvram_get("force_change"); %>">
</form>
<form method="post" name="form" action="/start_apply2.htm" target="hidden_frame">
<input type="hidden" name="productid" value="<% nvram_get("productid"); %>">
<input type="hidden" name="current_page" value="Advanced_Wireless_Content.asp">
<input type="hidden" name="next_page" value="Advanced_Wireless_Content.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_mode" value="apply_new">
<input type="hidden" name="action_script" value="restart_wireless">
<input type="hidden" name="action_wait" value="10">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="wl_country_code" value="<% nvram_get("wl0_country_code"); %>" disabled>
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="wps_mode" value="<% nvram_get("wps_mode"); %>">
<input type="hidden" name="wps_config_state" value="<% nvram_get("wps_config_state"); %>">
<input type="hidden" name="wl_ssid_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_ssid"); %>">
<input type="hidden" name="wlc_ure_ssid_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wlc_ure_ssid"); %>" disabled>
<input type="hidden" name="wl_key1_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key1"); %>">
<input type="hidden" name="wl_key2_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key2"); %>">
<input type="hidden" name="wl_key3_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key3"); %>">
<input type="hidden" name="wl_key4_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_key4"); %>">
<input type="hidden" name="wl_phrase_x_org" value="<% nvram_char_to_ascii("WLANConfig11b", "wl_phrase_x"); %>">
<input type="hidden" maxlength="15" size="15" name="x_RegulatoryDomain" value="<% nvram_get("x_RegulatoryDomain"); %>" readonly="1">
<input type="hidden" name="wl_gmode_protection" value="<% nvram_get("wl_gmode_protection"); %>">
<input type="hidden" name="wl_wme" value="<% nvram_get("wl_wme"); %>">
<input type="hidden" name="wl_mode_x" value="<% nvram_get("wl_mode_x"); %>">
<input type="hidden" name="wl_nmode_x_orig" value="<% nvram_get("wl_nmode_x"); %>">
<input type="hidden" name="wl_nctrlsb_old" value="<% nvram_get("wl_nctrlsb"); %>">
<input type="hidden" name="wl_key_type" value='<% nvram_get("wl_key_type"); %>'> <input type="hidden" name="wl_channel_orig" value='<% nvram_get("wl_channel"); %>'>
<input type="hidden" name="wl_chanspec" value=''>
<input type="hidden" name="wl_wep_x_orig" value='<% nvram_get("wl_wep_x"); %>'>
<input type="hidden" name="wl_optimizexbox" value='<% nvram_get("wl_optimizexbox"); %>'>
<input type="hidden" name="wl_bw_160" value='<% nvram_get("wl_bw_160"); %>'>
<input type="hidden" name="wl0_bw" value='<% nvram_get("wl0_bw"); %>'>
<input type="hidden" name="wl1_bw" value='<% nvram_get("wl1_bw"); %>'>
<input type="hidden" name="wl2_bw" value='<% nvram_get("wl2_bw"); %>'>
<input type="hidden" name="wl0_chanspec" value='<% nvram_get("wl0_chanspec"); %>'>
<input type="hidden" name="wl1_chanspec" value='<% nvram_get("wl1_chanspec"); %>'>
<input type="hidden" name="wl2_chanspec" value='<% nvram_get("wl2_chanspec"); %>'>
<input type="hidden" name="wl1_bw_160" value='<% nvram_get("wl1_bw_160"); %>'>
<input type="hidden" name="wl2_bw_160" value='<% nvram_get("wl2_bw_160"); %>'>
<input type="hidden" name="wl_subunit" value='-1'>
<input type="hidden" name="wl1_dfs" value='<% nvram_get("wl1_dfs"); %>'>
<input type="hidden" name="acs_dfs" value='<% nvram_get("acs_dfs"); %>'>
<input type="hidden" name="acs_band1" value='<% nvram_get("acs_band1"); %>'>
<input type="hidden" name="acs_band3" value='<% nvram_get("acs_band3"); %>'>
<input type="hidden" name="acs_ch13" value='<% nvram_get("acs_ch13"); %>'>
<input type="hidden" name="psc6g" value='<% nvram_get("psc6g"); %>'>
<input type="hidden" name="acs_unii4" value='<% nvram_get("acs_unii4"); %>'>
<input type="hidden" name="wps_enable" value="<% nvram_get("wps_enable"); %>">
<input type="hidden" name="wps_band" value="<% nvram_get("wps_band_x"); %>">
<input type="hidden" name="wps_dualband" value="<% nvram_get("wps_dualband"); %>">
<input type="hidden" name="smart_connect_x" value="<% nvram_get("smart_connect_x"); %>">
<input type="hidden" name="wl1_80211h" value="<% nvram_get("wl1_80211h"); %>" >
<input type="hidden" name="wl_rateset" value="<% nvram_get("wl_rateset"); %>" >
<input type="hidden" name="w_Setting" value="1">
<input type="hidden" name="w_apply" value="1">
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
<div style="margin: 10px 0 10px 5px" class="splitLine"></div>
<div class="formfontdesc"><#1026#></div>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" id="WLgeneral" class="FormTable">
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
var smart_connect_flag_t = (flag=='')?document.form.smart_connect_x.value:flag;
$('#radio_smartcon_enable').iphoneSwitch( smart_connect_flag_t > 0,
function() {
if(document.form.smart_connect_t.value)
enableSmartCon(document.form.smart_connect_t.value);
else
enableSmartCon(smart_connect_flag_t);
},
function() {
enableSmartCon(0);
}
);
</script>
</td>
</tr>
<tr id="smart_connect_field" style="display:none;">
<th><#3351#></th>
<td id="smart_connect_switch">
<select name="smart_connect_t" class="input_option" onChange="enableSmartCon(this.value);">
<option class="content_input_fd" value="1" >Tri-band Smart Connect (2.4 GHz, 5 GHz-1 and 5 GHz-2)</optio>
<option class="content_input_fd" value="2">5 GHz Smart Connect (5 GHz-1 and 5 GHz-2)</option>
</select>
</td>
</tr>
<tr id="wl_unit_field">
<th><#2466#></th>
<td>
<select name="wl_unit" class="input_option" onChange="_change_wl_unit(this.value);">
<option class="content_input_fd" value="0" <% nvram_match("wl_unit", "0","selected"); %>>2.4 GHz</option>
<option class="content_input_fd" value="1" <% nvram_match("wl_unit", "1","selected"); %>>5 GHz</option>
<option class="content_input_fd" value="1" <% nvram_match("wl_unit", "2","selected"); %>>5 GHz-2</option>
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
<tr id="wl_ssid_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 1);"><#660#></a></th>
<td id="ssid_setting">
<input type="text" maxlength="33" class="input_32_table" id="wl_ssid" name="wl_ssid" value="<% nvram_get("wl_ssid"); %>" onkeypress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 2);"><#4094#></a></th>
<td>
<input type="radio" value="1" name="wl_closed" class="input" <% nvram_match("wl_closed", "1", "checked"); %>><#275#>
<input type="radio" value="0" name="wl_closed" class="input" <% nvram_match("wl_closed", "0", "checked"); %>><#274#>
<br>
<span id="dwb_band_hide_hint"><#59#></span>
</td>
</tr>
<tr>
<th><a id="wl_mode_desc" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 4);"><#4135#></a></th>
<td>
<select name="wl_nmode_x" class="input_option" onChange="change_wl_nmode(this);check_NOnly_to_GN();wl_mode_change(this.value);">
<option value="0" <% nvram_match("wl_nmode_x", "0","selected"); %>><#241#></option>
<option value="1" <% nvram_match("wl_nmode_x", "1","selected"); %>>N Only</option>
<option value="2" <% nvram_match("wl_nmode_x", "2","selected"); %>>Legacy</option>
</select>
<span id="wl_optimizexbox_span" style="display:none"><input type="checkbox" name="wl_optimizexbox_ckb" id="wl_optimizexbox_ckb" value="<% nvram_get("wl_optimizexbox"); %>" onclick="document.form.wl_optimizexbox.value=(this.checked==true)?1:0;"> <#4137#></span>
<span id="wl_gmode_checkbox" style="display:none;"><input type="checkbox" name="wl_gmode_check" id="wl_gmode_check" value="" onClick="wl_gmode_protection_check();"> <#4136#></span>
<span id="wl_rateset_checkbox" style="display:none;"><input type="checkbox" name="wl_rateset_check" id="wl_rateset_check" value="<% nvram_get("wl_rateset"); %>" onClick="wl_disable11b(this);">Disable 11b</span>
<span id="wl_nmode_x_hint" style="display:none;"><br><#4183#><br></span>
<span id="wl_NOnly_note" style="display:none;"></span>
<br>
<span id="wl_AXOnly_note" style="display:none;"><#4187#></span>
<!-- [N + AC] is not compatible with current guest network authentication method(TKIP or WEP), Please go to <a id="gn_link" href="/Guest_network.asp?af=wl_NOnly_note" target="_blank" style="color:#FFCC00;font-family:Lucida Console;text-decoration:underline;">guest network</a> and change the authentication method. -->
</td>
</tr>
<tr id="he_mode_field" style="display:none">
<th>
<a id="he_mode_text" class="hintstyle"><#4046#></a>
</th>
<td>
<div style="width:465px;display:flex;align-items: center;">
<select name="wl_11ax" class="input_option" onChange="he_frame_mode(this);">
<option value="1" <% nvram_match("wl_11ax", "1","selected"); %>><#4071#></option>
<option value="0" <% nvram_match("wl_11ax", "0","selected"); %>><#4072#></option>
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
<tr id="wl_bw_field">
<th><#4019#></th>
<td>
<select name="wl_bw" class="input_option" style="width:150px;" onChange="wl_chanspec_list_change();">
<option class="content_input_fd" value="0" <% nvram_match("wl_bw", "0","selected"); %>>20 MHz</option>
<option class="content_input_fd" value="1" <% nvram_match("wl_bw", "1","selected"); %>>20/40 MHz</option>
<option class="content_input_fd" value="2" <% nvram_match("wl_bw", "2","selected"); %>>40 MHz</option>
</select>
<span id="enable_160_field" style="display:none"><input type="checkbox" onClick="enable_160MHz(this);" id="enable_160mhz" ><#4017#></span>
</td>
</tr>
<tr>
<th>
<a id="wl_channel_select" class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 3);"><#951#></a>
</th>
<td>
<select name="wl_channel" class="input_option" onChange="change_channel(this);"></select>
<span id="auto_channel" style="display:none;margin-left:10px;"></span><br>
<div><span id="dfs_checkbox" style="display:none"><input type="checkbox" onClick="check_DFS_support(this);" name="acs_dfs_checkbox" <% nvram_match("acs_dfs", "1", "checked"); %>><#4039#></span></div>
<div><span id="acs_band1_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_band1_support(this);" <% nvram_match("acs_band1", "1", "checked"); %>><#4037#></span></div>
<div><span id="acs_band3_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_band3_support(this);" <% nvram_match("acs_band3", "1", "checked"); %>><#4038#></span></div>
<div><span id="acs_ch13_checkbox" style="display:none;"><input type="checkbox" onClick="check_acs_ch13_support(this);" <% nvram_match("acs_ch13", "1", "checked"); %>><#4036#></span></div>
<div><span id="psc6g_field" style="display:none;"><input id="psc6g_checkbox" type="checkbox" onClick="wl_chanspec_list_change();" <% nvram_match("psc6g", "1", "checked"); %>><#4462#> <#4463#></span></div>
<div><span id="acs_unii4_field" style="display:none;"><input id="acs_unii4_checkbox" type="checkbox" onClick="handleUNII4Hint(this.checked)" <% nvram_match("acs_unii4", "1", "checked"); %>><#4040#></span></div>
</td>
</tr>
<tr id="wl_nctrlsb_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);"><#4043#></a></th>
<td>
<select name="wl_nctrlsb" class="input_option">
<option value=""></option>
<option value=""></option>
</select>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 5);"><#4004#></a></th>
<td>
<div>
<select name="wl_auth_mode_x" class="input_option" onChange="authentication_method_change(this);">
<option value="open" <% nvram_match("wl_auth_mode_x", "open", "selected"); %>>Open System</option>
<option value="shared" <% nvram_match("wl_auth_mode_x", "shared", "selected"); %>>Shared Key</option>
<option value="psk" <% nvram_match("wl_auth_mode_x", "psk", "selected"); %>>WPA-Personal</option>
<option value="psk2" <% nvram_match("wl_auth_mode_x", "psk2", "selected"); %>>WPA2-Personal</option>
<option value="owe" <% nvram_match("wl_auth_mode_x", "owe", "selected"); %>><#4464#></option>
<option value="sae" <% nvram_match("wl_auth_mode_x", "sae", "selected"); %>>WPA3-Personal</option>
<option value="pskpsk2" <% nvram_match("wl_auth_mode_x", "pskpsk2","selected"); %>>WPA-Auto-Personal</option>
<option value="psk2sae" <% nvram_match("wl_auth_mode_x", "psk2sae","selected"); %>>WPA2/WPA3-Personal</option>
<option value="wpa" <% nvram_match("wl_auth_mode_x", "wpa", "selected"); %>>WPA-Enterprise</option>
<option value="wpa2" <% nvram_match("wl_auth_mode_x", "wpa2", "selected"); %>>WPA2-Enterprise</option>
<option value="wpa3" <% nvram_match("wl_auth_mode_x", "wpa3", "selected"); %>>WPA3-Enterprise</option>
<option value="wpawpa2" <% nvram_match("wl_auth_mode_x", "wpawpa2","selected"); %>>WPA-Auto-Enterprise</option>
<option value="wpa2wpa3" <% nvram_match("wl_auth_mode_x", "wpa2wpa3","selected"); %>>WPA2/WPA3 Enterprise</option>
<option value="suite-b" <% nvram_match("wl_auth_mode_x", "suite-b","selected"); %>>WPA3 Enterprise 192-bit</option>
<option value="radius" <% nvram_match("wl_auth_mode_x", "radius", "selected"); %>>Radius with 802.1x</option>
</select>
</div>
<div class="setup_help_icon" style="display:none;"></div>
<div id="no_wp3_hint" style="display:none">
<span><#1113#></span>
<script>
$("#wpa3FaqLink")
.attr("target", "_blank")
.attr("href", faq_href3)
.css({"color": "#FC0", "text-decoration": "underline"})
</script>
</div>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 6);"><#956#></a></th>
<td>
<select name="wl_crypto" class="input_option">
<option value="aes" <% nvram_match("wl_crypto", "aes", "selected"); %>>AES</option>
<option value="tkip+aes" <% nvram_match("wl_crypto", "tkip+aes", "selected"); %>>TKIP+AES</option>
</select>
</td>
</tr>
<tr id="wpa_psk_key_field">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 7);"><#4146#></a></th>
<td>
<div class="wpa_psk_container">
<div><input type="password" name="wl_wpa_psk" maxlength="64" class="input_32_table" value="<% nvram_get("wl_wpa_psk"); %>" autocorrect="off" autocapitalize="off" onfocus="plainPasswordSwitch(this, 'focus')" onblur="plainPasswordSwitch(this, 'blur')"></div>
</div>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 9);"><#4069#></a></th>
<td>
<select name="wl_wep_x" class="input_option" onChange="wep_encryption_change(this);">
<option value="0" <% nvram_match("wl_wep_x", "0", "selected"); %>><#950#></option>
<option value="1" <% nvram_match("wl_wep_x", "1", "selected"); %>>WEP-64bits</option>
<option value="2" <% nvram_match("wl_wep_x", "2", "selected"); %>>WEP-128bits</option>
</select>
<span name="key_des"></span>
</td>
</tr>
<tr>
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
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4064#></th>
<td><input type="text" name="wl_key1" id="wl_key1" maxlength="32" class="input_32_table" value="<% nvram_get("wl_key1"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4065#></th>
<td><input type="text" name="wl_key2" id="wl_key2" maxlength="32" class="input_32_table" value="<% nvram_get("wl_key2"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4066#></th>
<td><input type="text" name="wl_key3" id="wl_key3" maxlength="32" class="input_32_table" value="<% nvram_get("wl_key3"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 18);"><#4067#></th>
<td><input type="text" name="wl_key4" id="wl_key4" maxlength="32" class="input_32_table" value="<% nvram_get("wl_key4"); %>" onKeyUp="return change_wlkey(this, 'WLANConfig11b');" autocorrect="off" autocapitalize="off"></td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 8);"><#4142#></a></th>
<td>
<input type="text" name="wl_phrase_x" maxlength="64" class="input_32_table" value="<% nvram_get("wl_phrase_x"); %>" onKeyUp="return is_wlphrase('WLANConfig11b', 'wl_phrase_x', this);" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr >
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,1);">
<#3996#></a>
</th>
<td>
<input type="text" maxlength="39" class="input_32_table" name="wl_radius_ipaddr" value='<% nvram_get("wl_radius_ipaddr"); %>' onKeyPress="return validator.isIPAddr(this, event)" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr>
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(2,2);">
<#4000#></a>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" name="wl_radius_port" value='<% nvram_get("wl_radius_port"); %>' onkeypress="return validator.isNumber(this,event)" autocorrect="off" autocapitalize="off"/>
</td>
</tr>
<tr>
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
<span id="mbo_notice_combo_legacy" style="display:none">*If the Authentication Method is WPA/WPA2-Personal, the Protected Management Frames will be Capable.</span>
<span id="mbo_notice" style="display:none"><#4002#></span>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 11);"><#4157#></a></th>
<td><input type="text" maxlength="7" name="wl_wpa_gtk_rekey" class="input_6_table" value="<% nvram_get("wl_wpa_gtk_rekey"); %>" onKeyPress="return validator.isNumber(this,event);" autocorrect="off" autocapitalize="off"></td>
</tr>
</table>
<table id="band_separate" width="100%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="FormTable" style="margin-top:5px">
<thead>
<tr id="band0_title_field">
<td colspan="2">2.4 GHz</td>
</tr>
</thead>
<tr id="band0_bandwidth_field">
<th><#4019#></th>
<td>
<select name="band0_bw" class="input_option" onChange="separateBWHandler('0', this.value)"></select>
</td>
</tr>
<tr id="band0_channel_field">
<th><#951#></th>
<td>
<select name="band0_channel" class="input_option" onChange="separateChannelHandler('0', this.value);"></select>
<span id="band0_autoChannel" style="display:none;margin-left:10px;">Current Control Channel</span><br>
<span id="band0_acs_ch13"><input id="band0_acs_ch13_checkbox" type="checkbox" <%
nvram_match("acs_ch13", "1" , "checked" ); %>><#4036#></span>
</td>
</tr>
<tr id="band0_extChannel_field">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);">
<#4043#>
</a>
</th>
<td>
<select name="band0_extChannel" class="input_option"></select>
</td>
</tr>
<thead>
<tr>
<td id="5ghz_title" colspan="2">5 GHz</td>
</tr>
</thead>
<tr>
<th><#4019#></th>
<td>
<select name="band1_bw" class="input_option" onChange="separateBWHandler('1', this.value);"></select>
<span id="band1_160_field" style="display:none"><input id="band1_160" type="checkbox" onClick="separateEnable_160MHz(this);" <%
nvram_match("wl1_bw_160", "1" , "checked" ); %>>
<#4017#>
</span>
</td>
</tr>
<tr>
<th><#951#></th>
<td>
<select name="band1_channel" class="input_option" onChange="separateChannelHandler('1', this.value);"></select>
<span id="band1_autoChannel" style="display:none;margin-left:10px;">Current Control Channel</span><br>
<span id="band1_acsDFS"><input id="band1_acsDFS_checkbox" type="checkbox" <%
nvram_match("acs_dfs", "1" , "checked" ); %>><#4039#></span>
</td>
</tr>
<tr id="band1_extChannel_field">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);">
<#4043#>
</a>
</th>
<td>
<select class="input_option">
<option value=""><#241#></option>
</select>
</td>
</tr>
<thead>
<tr id="band2_title_field" style="display:none">
<td id="5g2_title" colspan="2">5 GHz-2</td>
</tr>
</thead>
<tr id="band2_bandwidth_field" style="display:none">
<th><#4019#></th>
<td>
<select name="band2_bw" class="input_option" onChange="separateBWHandler('2', this.value);"></select>
<span id="band2_160_field" style="display:none"><input id="band2_160" type="checkbox" onClick="separateEnable_160MHz(this);" <%
nvram_match("wl2_bw_160", "1" , "checked" ); %>>
<#4017#>
</span>
</td>
</tr>
<tr id="band2_channel_field" style="display:none">
<th><#951#></th>
<td>
<select name="band2_channel" class="input_option" onChange="separateChannelHandler('2', this.value);"></select>
<span id="band2_autoChannel" style="display:none;margin-left:10px;">Current Control Channel</span><br>
<span id="band2_acsDFS"><input id="band2_acsDFS_checkbox" type="checkbox" <% nvram_match("acs_band3", "1" , "checked" ); %>><#4039#></span>
<span id="band2_psc6g" style="display:none"><input id="band2_psc6g_checkbox" type="checkbox" onclick="separateGenChannel('2', document.form.band2_channel.value, document.form.band2_bw.value);" <% nvram_match("psc6g", "1" , "checked" ); %>><#4462#> <#4463#></span>
<span id="band2_acs_unii4_field" style="display:none;"><br><input id="band2_acs_unii4_checkbox" type="checkbox" onClick="handleUNII4Hint(this.checked)" <% nvram_match("acs_unii4", "1", "checked"); %>><#4040#></span>
</td>
</tr>
<tr id="band2_extChannel_field" style="display:none">
<th>
<a class="hintstyle" href="javascript:void(0);" onClick="openHint(0, 15);">
<#4043#>
</a>
</th>
<td>
<select class="input_option">
<option value=""><#241#></option>
</select>
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

