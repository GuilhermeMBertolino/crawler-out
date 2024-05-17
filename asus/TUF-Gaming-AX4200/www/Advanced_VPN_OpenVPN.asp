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
<title><#944#> - <#258#></title>
<link rel="stylesheet" type="text/css" href="index_style.css">
<link rel="stylesheet" type="text/css" href="form_style.css">
<link rel="stylesheet" type="text/css" href="menu_style.css">
<link rel="stylesheet" type="text/css" href="pwdmeter.css">
<script language="JavaScript" type="text/javascript" src="/help.js"></script>
<script language="JavaScript" type="text/javascript" src="/state.js"></script>
<script language="JavaScript" type="text/javascript" src="/general.js"></script>
<script language="JavaScript" type="text/javascript" src="/popup.js"></script>
<script language="JavaScript" type="text/javascript" src="/validator.js"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/switcherplugin/jquery.iphone-switch.js"></script>
<script language="JavaScript" type="text/javascript" src="/form.js"></script>
<script type="text/javascript" src="/js/httpApi.js"></script>
<style type="text/css">
.contentM_qis{
width:740px;
margin-top:280px;
margin-left:380px;
position:absolute;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
z-index:200;
background-color:#2B373B;
box-shadow: 3px 3px 10px #000;
display:none;
/*behavior: url(/PIE.htc);*/
}
.QISform_wireless{
width:600px;
font-size:12px;
color:#FFFFFF;
margin-top:10px;
*margin-left:10px;
}
.QISform_wireless th{
padding-left:10px;
*padding-left:30px;
font-size:12px;
font-weight:bolder;
color: #FFFFFF;
text-align:left;
}
.description_down{
margin-top:10px;
margin-left:10px;
padding-left:5px;
font-weight:bold;
line-height:140%;
color:#ffffff;
}
#client_pwd_strength{
margin-top: 6px;
display: flex;
justify-content: center;
}
.renewLoadingIcon{
background-image: url(/images/InternetScan.gif);
width: 125px;
height: 33px;
background-repeat: no-repeat;
background-position: 50%;
display: none;
}
</style>
<script>
window.onresize = function() {
if(document.getElementById("tlsKey_panel") != null){
if(document.getElementById("tlsKey_panel").style.display == "block")
cal_panel_block("tlsKey_panel", 0.15);
}
}
<% wanlink(); %>
<% vpn_server_get_parameter(); %>;
var enable_samba = '<% nvram_get("enable_samba"); %>';
var vpn_server_clientlist_array_ori = '<% nvram_char_to_ascii("","vpn_serverx_clientlist"); %>';
var vpn_server_clientlist_array = decodeURIComponent(vpn_server_clientlist_array_ori);
var openvpn_unit = '<% nvram_get("vpn_server_unit"); %>';
var vpn_server_enable = '<% nvram_get("VPNServer_enable"); %>';
var open_vpn_enable = vpn_server_enable;
var service_state = "";
if (openvpn_unit == '1')
service_state = '<% nvram_get("vpn_server1_state"); %>';
else if (openvpn_unit == '2')
service_state = '<% nvram_get("vpn_server2_state"); %>';
else
service_state = false;
var openvpnd_connected_clients = [];
var openvpn_clientlist_array = decodeURIComponent('<% nvram_char_to_ascii("", "vpn_server_ccd_val"); %>');
var ciphersarray = [
["AES-128-CBC"],
["AES-192-CBC"],
["AES-256-CBC"],
["AES-128-GCM"],
["AES-192-GCM"],
["AES-256-GCM"],
["BF-CBC"],
["CAST5-CBC"],
["CAMELLIA-128-CBC"],
["CAMELLIA-192-CBC"],
["CAMELLIA-256-CBC"],
["DES-CBC"],
["DES-EDE-CBC"],
["DES-EDE3-CBC"],
["DESX-CBC"],
["IDEA-CBC"],
["RC2-40-CBC"],
["RC2-64-CBC"],
["RC2-CBC"],
["RC5-CBC"],
["SEED-CBC"]
];
var hmacarray = [
["MD 5", "MD5"],
["SHA 1", "SHA1"],
["SHA 224", "SHA224"],
["SHA 256", "SHA256"],
["SHA 384", "SHA384"],
["SHA 512", "SHA512"],
["RIPEMD 160", "RIPEMD160"],
["RSA MD4", "RSA-MD4"]
];
var wans_mode ='<% nvram_get("wans_mode"); %>';
var faq_href_windows = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=119";
var faq_href_macOS = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=120";
var faq_href_iPhone = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=121";
var faq_href_android = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=122";
var faq_href_port_forwarding = "https://nw-dlcdnet.asus.com/support/forward.html?model=&type=Faq&lang="+ui_lang+"&kw=&num=118";
function initial(){
var current_server_igncrt = "<% nvram_get("vpn_server_igncrt"); %>";
var currentcipher = "<% nvram_get("vpn_server_cipher"); %>";
show_menu();
formShowAndHide(vpn_server_enable, "openvpn");
/*Advanced Setting start */
allowed_openvpn_clientlist();
add_option(document.form.vpn_server_cipher, "Default","default",(currentcipher == "default"));
add_option(document.form.vpn_server_cipher, "None","none",(currentcipher == "none"));
for(var i = 0; i < ciphersarray.length; i += 1){
add_option(document.form.vpn_server_cipher, ciphersarray[i][0], ciphersarray[i][0], (currentcipher == ciphersarray[i][0]));
}
var currentHMAC = '<% nvram_get("vpn_server_digest"); %>';
for(var i = 0; i < hmacarray.length; i += 1) {
add_option(document.form.vpn_server_digest, hmacarray[i][0], hmacarray[i][1], (currentHMAC == hmacarray[i][1]));
}
setRadioValue(document.form.vpn_server_x_eas, ((document.form.vpn_serverx_eas.value.indexOf(''+(openvpn_unit)) >= 0) ? "1" : "0"));
setRadioValue(document.form.vpn_server_x_dns, ((document.form.vpn_serverx_dns.value.indexOf(''+(openvpn_unit)) >= 0) ? "1" : "0"));
enable_server_igncrt(current_server_igncrt);
update_cipher();
update_digest();
/*Advanced Setting end */
var vpn_server_array = { "PPTP" : ["PPTP", "Advanced_VPN_PPTP.asp"], "OpenVPN" : ["OpenVPN", "Advanced_VPN_OpenVPN.asp"], "IPSEC" : ["IPSec VPN", "Advanced_VPN_IPSec.asp"]};
if(!pptpd_support) {
delete vpn_server_array.PPTP;
}
if(!openvpnd_support) {
delete vpn_server_array.OpenVPN;
}
if(!ipsec_srv_support) {
delete vpn_server_array.IPSEC;
}
$('#divSwitchMenu').html(gen_switch_menu(vpn_server_array, "OpenVPN"));
setTimeout("show_warning_message();", 1000);
document.getElementById("faq_windows").href=faq_href_windows;
document.getElementById("faq_macOS").href=faq_href_macOS;
document.getElementById("faq_iPhone").href=faq_href_iPhone;
document.getElementById("faq_android").href=faq_href_android;
if((wan_proto == "v6plus" || wan_proto == "ocnvc") && s46_ports_check_flag && array_ipv6_s46_ports.length > 1){
$(".setup_info_icon.basic").click(
function() {
if($("#s46_ports_content").is(':visible'))
$("#s46_ports_content").fadeOut();
else{
var position1 = $(".setup_info_icon.basic").position();
pop_s46_ports(position1);
}
}
);
$("#vpn_server_port_basic").focus(
function() {
var position2_text = $("#vpn_server_port_basic").position();
pop_s46_ports(position2_text);
}
);
$(".setup_info_icon.adv").click(
function() {
if($("#s46_ports_content").is(':visible'))
$("#s46_ports_content").fadeOut();
else{
var position2 = $(".setup_info_icon.adv").position();
pop_s46_ports(position2);
}
}
);
$("#vpn_server_port_adv").focus(
function() {
var position2_text = $("#vpn_server_port_adv").position();
pop_s46_ports(position2_text);
}
);
$(".setup_info_icon.basic").show();
$("#portSuggestionBasic").hide();
$(".setup_info_icon.adv").hide();
$("#portSuggestionAdvanced").hide();
}
updateVpnServerClientAccess();
$("#client_pwd_strength").append(Get_Component_PWD_Strength_Meter());
if($("[name='vpn_server_clientlist_password']").val() == "")
$("#client_pwd_strength").css("display", "none");
else
chkPass($("[name='vpn_server_clientlist_password']").val(), "", $("#client_pwd_strength"));
$("[name='vpn_server_clientlist_password']").keyup(function(){
chkPass($(this).val(), "", $("#client_pwd_strength"));
});
$("[name='vpn_server_clientlist_password']").blur(function(){
if($(this).val() == "")
$("#client_pwd_strength").css("display", "none");
});
}
var MAX_RETRY_NUM = 5;
var external_ip_retry_cnt = MAX_RETRY_NUM;
function show_warning_message(){
if(realip_support && (based_modelid == "BRT-AC828"|| wans_mode != "lb")){
if(realip_state != "2" && external_ip_retry_cnt > 0){
if( external_ip_retry_cnt == MAX_RETRY_NUM )
get_real_ip();
else
setTimeout("get_real_ip();", 3000);
}
else if(realip_state != "2"){
if(validator.isPrivateIP(wanlink_ipaddr())){
document.getElementById("privateIP_notes").innerHTML = "<#3791#>";
document.getElementById("privateIP_notes").style.display = "";
document.getElementById("faq_port_forwarding").href=faq_href_port_forwarding; //this id is include in string : #vpn_privateIP_hint#
}
}
else{
if(!external_ip){
document.getElementById("privateIP_notes").innerHTML = "<#3791#>";
document.getElementById("privateIP_notes").style.display = "";
document.getElementById("faq_port_forwarding").href=faq_href_port_forwarding; //this id is include in string : #vpn_privateIP_hint#
}
}
}
else if(validator.isPrivateIP(wanlink_ipaddr())){
document.getElementById("privateIP_notes").innerHTML = "<#3791#>";
document.getElementById("privateIP_notes").style.display = "";
document.getElementById("faq_port_forwarding").href=faq_href_port_forwarding; //this id is include in string : #vpn_privateIP_hint#
}
}
function get_real_ip(){
$.ajax({
url: 'get_real_ip.asp',
dataType: 'script',
error: function(xhr){
get_real_ip();
},
success: function(response){
external_ip_retry_cnt--;
show_warning_message();
}
});
}
function formShowAndHide(server_enable, server_type) {
if(server_enable == 1 && server_type == "openvpn"){ //General Screen
document.getElementById("trVPNServerMode").style.display = "";
document.getElementById("selSwitchMode").value = "1";
document.getElementById("trServerPortBasic").style.display = "";
document.getElementById("trRSAEncryptionBasic").style.display = ("<% nvram_get("vpn_server_crypt"); %>" == "secret")?"none":"";
document.getElementById("trClientWillUseVPNToAccess").style.display = "";
document.getElementById('OpenVPN_setting').style.display = ("<% nvram_get("vpn_server_crypt"); %>" == "secret")?"none":"";
if(vpn_server_enable == '0') {
$('*[data-group="cert_btn"]').hide();
}
else {
$('*[data-group="cert_btn"]').show();
}
document.getElementById("divAdvanced").style.display = "none";
if(service_state == false || service_state != '2')
document.getElementById('export_div').style.display = "none";
if(!email_support)
document.getElementById('exportViaEmail').style.display = "none";
showopenvpnd_clientlist();
update_vpn_client_state();
openvpnd_connected_status();
check_vpn_server_state();
document.getElementById("divApply").style.display = "";
updateVpnServerClientAccess();
}
else{
document.getElementById("trVPNServerMode").style.display = "none";
document.getElementById("trServerPortBasic").style.display = "none";
document.getElementById("trRSAEncryptionBasic").style.display = "none";
document.getElementById("trClientWillUseVPNToAccess").style.display = "none";
$('*[data-group="cert_btn"]').hide();
document.getElementById("OpenVPN_setting").style.display = "none";
document.getElementById("divAdvanced").style.display = "none";
}
}
function openvpnd_connected_status(){
var rule_num = document.getElementById("openvpnd_clientlist_table").rows.length;
var username_status = "";
for(var x=0; x < rule_num; x++){
var ind = x;
username_status = "conn"+ind;
if(openvpnd_connected_clients.length >0){
if(document.getElementById(username_status)) {
document.getElementById(username_status).innerHTML = '<#308#>';
}
for(var y=0; y<openvpnd_connected_clients.length; y++){
if(document.getElementById("openvpnd_clientlist_table").rows[x].cells[1].title == openvpnd_connected_clients[y].username){
document.getElementById(username_status).innerHTML = '<a class="hintstyle2" href="javascript:void(0);" onClick="showOpenVPNClients(\''+openvpnd_connected_clients[y].username+'\');"><#277#></a>';
break;
}
}
}else if(document.getElementById(username_status)){
document.getElementById(username_status).innerHTML = '<#308#>';
}
}
}
function applyRule(){
var validForm = function() {
if(document.getElementById("selSwitchMode").value =="1"){
if(!validator.numberRange(document.form.vpn_server_port_basic, 1, 65535)) {
return false;
}
else if(isPortConflict(document.form.vpn_server_port_basic.value, "openvpn")){
alert(isPortConflict(document.form.vpn_server_port_basic.value, "openvpn"));
document.form.vpn_server_port_basic.focus();
return false;
}
else{
if((wan_proto == "v6plus" || wan_proto == "ocnvc") && s46_ports_check_flag && array_ipv6_s46_ports.length > 1){
if (!validator.range_s46_ports(document.form.vpn_server_port_basic, "none")){
if(!confirm(port_confirm)){
document.form.vpn_server_port_basic.focus();
return false;
}
}
}
document.form.vpn_server_port.value = document.form.vpn_server_port_basic.value;
}
}
else if(document.getElementById("selSwitchMode").value =="2"){
if(!validator.numberRange(document.form.vpn_server_port_adv, 1, 65535)) {
return false;
}
else if(isPortConflict(document.form.vpn_server_port_adv.value, "openvpn")){
alert(isPortConflict(document.form.vpn_server_port_adv.value, "openvpn"));
document.form.vpn_server_port_adv.focus();
return false;
}
else{
if((wan_proto == "v6plus" || wan_proto == "ocnvc") && s46_ports_check_flag && array_ipv6_s46_ports.length > 1){
if (!validator.range_s46_ports(document.form.vpn_server_port_adv, "none")){
if(!confirm(port_confirm)){
document.form.vpn_server_port_adv.focus();
return false;
}
}
}
document.form.vpn_server_port.value = document.form.vpn_server_port_adv.value;
}
}
/*!-- rm 2017/06/28
if(!validator.numberRange(document.form.vpn_server_poll, 0, 1440)) {
return false;
}
*/
if(!validator.numberRange(document.form.vpn_server_reneg, -1, 99999)) {
return false;
}
if(isSupport("ipv6")){
var ipv6_service = httpApi.nvramGet(["ipv6_service"]).ipv6_service;
if(ipv6_service != "disabled"){
var vpn_server_ip6 = $('input[name="vpn_server_ip6"]:checked').val();
if(vpn_server_ip6 == "1"){
var vpn_server_if = $('select[name=vpn_server_if] option').filter(':selected').val();
var vpn_server_crypt = $('select[name=vpn_server_crypt] option').filter(':selected').val();
var ip_RegExp = {
"IPv6" : "^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$",
"IPv6_CIDR" : "^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))(\/([0-9]|[1-9][0-9]|1[01][0-9]|12[0-8]))$"
};
var valid_IP_CIDR = function(addr, type, mode){
var result = true;
var IP = new RegExp(ip_RegExp[type],"gi");
var IP_CIDR = new RegExp(ip_RegExp[type + "_CIDR"], "gi");
if(mode == "0"){
if(!IP.test(addr)){
result = false;
}
}
else if(mode == "1"){
if(!IP_CIDR.test(addr)){
result = false;
}
}
return result;
};
if(vpn_server_if == "tun" && vpn_server_crypt == "tls"){
if(!valid_IP_CIDR($("input[name='vpn_server_sn6']").val(), "IPv6", "1")){
alert($("input[name='vpn_server_sn6']").val() + " <#428#>");
$("input[name='vpn_server_sn6']").focus()
return false;
}
}
else if(vpn_server_if == "tun" && vpn_server_crypt == "secret"){
if(!valid_IP_CIDR($("input[name='vpn_server_local6']").val(), "IPv6", "0")){
alert($("input[name='vpn_server_local6']").val() + " <#428#>");
$("input[name='vpn_server_local6']").focus()
return false;
}
if(!valid_IP_CIDR($("input[name='vpn_server_remote6']").val(), "IPv6", "0")){
alert($("input[name='vpn_server_remote6']").val() + " <#428#>");
$("input[name='vpn_server_remote6']").focus()
return false;
}
}
}
}
}
return true;
};
if(!validForm())
return false;
var confirmFlag = true;
/* Advanced setting start */
var check_openvpn_conflict = function () { //if conflict with LAN ip & DHCP ip pool & static
var origin_lan_ip = '<% nvram_get("lan_ipaddr"); %>';
var lan_ip_subnet = origin_lan_ip.split(".")[0]+"."+origin_lan_ip.split(".")[1]+"."+origin_lan_ip.split(".")[2]+".";
var lan_ip_end = parseInt(origin_lan_ip.split(".")[3]);
var pool_start = '<% nvram_get("dhcp_start"); %>';
var pool_end = '<% nvram_get("dhcp_end"); %>';
var dhcp_staticlists = '<% nvram_get("dhcp_staticlist"); %>'.replace(/&#62/g, ">").replace(/&#60/g, "<");
var staticclist_row = dhcp_staticlists.split('<');
var netmask_obj = document.form.vpn_server_nm;
var vpnSubnet = document.form.vpn_server_sn;
var pool_start = '<% nvram_get("dhcp_start"); %>';
var pool_subnet = pool_start.split(".")[0]+"."+pool_start.split(".")[1]+"."+pool_start.split(".")[2]+".";
if(document.form.vpn_server_if.value == 'tun'){
if(vpnSubnet.value == ""){
alert("<#414#>");
vpnSubnet.focus();
vpnSubnet.select();
return false;
}
if(!validator.ipRange(vpnSubnet, "")){
vpnSubnet.focus();
vpnSubnet.select();
return false;
}
var openvpn_server_subnet = vpnSubnet.value.split(".")[0]
+ "." + vpnSubnet.value.split(".")[1]
+ "." + vpnSubnet.value.split(".")[2]
+ ".";
if(origin_lan_ip == vpnSubnet.value) {
alert("<#3725#> " + origin_lan_ip);
vpnSubnet.focus();
vpnSubnet.select();
return false;
}
if(lan_ip_subnet == openvpn_server_subnet) {
alert("<#3723#>"+pool_start+" ~ "+pool_end);
vpnSubnet.focus();
vpnSubnet.select();
return false;
}
if(!validator.maskRange("255.255.0.0", "255.255.255.248", netmask_obj.value)) {
alert("Netmask range must be 255.255.0.0 (/16) ~ 255.255.255.248 (/29)");
netmask_obj.focus();
netmask_obj.select();
return false;
}
if(!validator.subnetAndMaskCombination(vpnSubnet.value, netmask_obj.value)) {
alert(vpnSubnet.value + " / " + netmask_obj.value + " combination is invalid");
vpnSubnet.focus();
vpnSubnet.select();
return false;
}
}
else if(document.form.vpn_server_if.value == 'tap' && document.form.vpn_server_dhcp.value == '0'){
if(!validator.isLegalIP(document.form.vpn_server_r1, "")){
document.form.vpn_server_r1.focus();
document.form.vpn_server_r1.select();
return false;
}
if(document.form.vpn_server_r1.value.split(".")[3] == 255){ //*.*.*.255 can't be IP in the IP pool
alert(document.form.vpn_server_r1.value + " <#428#>");
document.form.vpn_server_r1.focus();
document.form.vpn_server_r1.select();
return false;
}
if(!validator.isLegalIP(document.form.vpn_server_r2, "")){
document.form.vpn_server_r2.focus();
document.form.vpn_server_r2.select();
return false;
}
if(document.form.vpn_server_r2.value.split(".")[3] == 255){ //*.*.*.255 can't be IP in the IP pool
alert(document.form.vpn_server_r2.value + " <#428#>");
document.form.vpn_server_r2.focus();
document.form.vpn_server_r2.select();
return false;
}
var openvpn_clients_start_subnet = document.form.vpn_server_r1.value.split(".")[0] + "."
+ document.form.vpn_server_r1.value.split(".")[1] + "."
+ document.form.vpn_server_r1.value.split(".")[2] + ".";
var openvpn_clients_end_subnet = document.form.vpn_server_r2.value.split(".")[0] + "."
+ document.form.vpn_server_r2.value.split(".")[1] + "."
+ document.form.vpn_server_r2.value.split(".")[2] + ".";
var openvpn_clients_start_ip = parseInt(document.form.vpn_server_r1.value.split(".")[3]);
var openvpn_clients_end_ip = parseInt(document.form.vpn_server_r2.value.split(".")[3]);
if( (lan_ip_subnet == openvpn_clients_start_subnet || lan_ip_subnet == openvpn_clients_end_subnet)
&& (lan_ip_end >= openvpn_clients_start_ip && lan_ip_end <= openvpn_clients_end_ip)) {
alert("<#3725#> "+origin_lan_ip);
document.form.vpn_server_r1.focus();
document.form.vpn_server_r1.select();
return false;
}
if(openvpn_clients_end_ip < openvpn_clients_start_ip){
alert(document.form.vpn_server_r2.value + " <#428#>");
document.form.vpn_server_r2.focus();
document.form.vpn_server_r2.select();
return false;
}
if(pool_subnet != openvpn_clients_start_subnet) {
alert(document.form.vpn_server_r1.value + " <#428#>");
document.form.vpn_server_r1.focus();
document.form.vpn_server_r1.select();
return false;
}
if(pool_subnet != openvpn_clients_end_subnet) {
alert(document.form.vpn_server_r2.value + " <#428#>");
document.form.vpn_server_r2.focus();
document.form.vpn_server_r2.select();
return false;
}
if(dhcp_staticlists != "") {
for(var i = 1; i < staticclist_row.length; i +=1 ) {
var static_ip = staticclist_row[i].split('>')[1];
var static_subnet = static_ip.split(".")[0]+"."+static_ip.split(".")[1]+"."+static_ip.split(".")[2]+".";
var static_end = parseInt(static_ip.split(".")[3]);
if(static_subnet != openvpn_clients_start_subnet) {
alert(document.form.vpn_server_r1.value + " <#428#>");
document.form.vpn_server_r1.focus();
document.form.vpn_server_r1.select();
return false;
}
if(static_subnet != openvpn_clients_end_subnet) {
alert(document.form.vpn_server_r2.value + " <#428#>");
document.form.vpn_server_r2.focus();
document.form.vpn_server_r2.select();
return false;
}
}
}
}
return true;
};
/* Advanced setting end */
if(confirmFlag && check_openvpn_conflict() ) {
document.openvpnTLSKeyForm.vpn_crt_server1_ca.disabled = true;
document.openvpnTLSKeyForm.vpn_crt_server1_crt.disabled = true;
document.openvpnTLSKeyForm.vpn_crt_server1_key.disabled = true;
document.openvpnTLSKeyForm.vpn_crt_server1_dh.disabled = true;
document.openvpnTLSKeyForm.vpn_crt_server1_crl.disabled = true;
document.openvpnStaticKeyForm.vpn_crt_server1_static.disabled = true;
var get_group_value = function () {
var rule_num = document.getElementById("openvpnd_clientlist_table").rows.length;
var item_num = document.getElementById("openvpnd_clientlist_table").rows[0].cells.length;
var tmp_value = "";
for(var i = 1; i < rule_num; i += 1) {
tmp_value += "<"
for(var j = 1; j < item_num - 1; j += 1) {
tmp_value += document.getElementById("openvpnd_clientlist_table").rows[i].cells[j].title;
if(j != item_num - 2)
tmp_value += ">";
}
}
if(tmp_value == "<"+"<#2550#>" || tmp_value == "<")
tmp_value = "";
return tmp_value;
};
if(document.form.VPNServer_enable.value == "1") {
document.form.action_script.value = "restart_openvpnd;restart_chpass";
document.form.vpn_serverx_clientlist.value = get_group_value();
/* Advanced setting start */
if(document.getElementById("server_reneg").style.display == "none")
document.form.vpn_server_reneg.disabled = true;
var getAdvancedValue = function () {
var client_num = document.getElementById("openvpn_clientlist_table").rows.length;
var item_num = document.getElementById("openvpn_clientlist_table").rows[0].cells.length;
var tmp_value = "";
for(var i = 0; i < client_num; i += 1) {
tmp_value += "<1>";
for(var j = 0; j < item_num - 1; j += 1) {
if (j == 3)
tmp_value += (document.getElementById("openvpn_clientlist_table").rows[i].cells[j].innerHTML == "Yes" ? 1 : 0);
else
tmp_value += document.getElementById("openvpn_clientlist_table").rows[i].cells[j].innerHTML;
if(j != item_num - 2)
tmp_value += ">";
}
}
if(tmp_value == "<"+"<#2550#>" || tmp_value == "<1>")
tmp_value = "";
document.form.vpn_server_ccd_val.value = tmp_value;
tmp_value = "";
for (var i = 1; i < 3; i += 1) {
if (i == openvpn_unit) {
if(getRadioValue(document.form.vpn_server_x_eas) == 1)
tmp_value += ""+i+",";
}
else{
if(document.form.vpn_serverx_eas.value.indexOf(''+(i)) >= 0)
tmp_value += ""+i+","
}
}
document.form.vpn_serverx_eas.value = tmp_value;
tmp_value = "";
for (var i = 1; i < 3; i += 1) {
if (i == openvpn_unit) {
if (getRadioValue(document.form.vpn_server_x_dns) == 1)
tmp_value += ""+i+",";
} else {
if (document.form.vpn_serverx_dns.value.indexOf(''+(i)) >= 0)
tmp_value += ""+i+","
}
}
if (tmp_value != document.form.vpn_serverx_dns.value) {
document.form.action_script.value += ";restart_dnsmasq";
document.form.vpn_serverx_dns.value = tmp_value;
}
}();
/* Advanced setting end */
if (enable_samba == 1)
document.form.action_script.value += ";restart_samba";
}
else { //disable server
document.form.action_script.value = "stop_openvpnd";
if (enable_samba == 1)
document.form.action_script.value += ";restart_samba";
document.form.vpn_serverx_clientlist.value = get_group_value();
}
handle_ipv6_submit_settings();
showLoading();
document.form.submit();
}
}
function addRow(obj, head){
if(head == 1)
vpn_server_clientlist_array += "<" /*&#60*/
else
vpn_server_clientlist_array += ">" /*&#62*/
vpn_server_clientlist_array += obj.value;
obj.value = "";
}
function validForm(){
var valid_username = document.form.vpn_server_clientlist_username;
var valid_password = document.form.vpn_server_clientlist_password;
if(valid_username.value == "") {
alert("<#414#>");
valid_username.focus();
return false;
}
else if(!Block_chars(valid_username, [" ", "@", "*", "+", "|", ":", "?", "<", ">", ",", ".", "/", ";", "[", "]", "\\", "=", "\"", "&", "#" ])) {
return false;
}
if(valid_password.value == "") {
alert("<#414#>");
valid_password.focus();
return false;
}
else if(!Block_chars(valid_password, ["<", ">", "&"])) {
return false;
}
return true;
}
function addRow_Group(upper){
var username_obj = document.form.vpn_server_clientlist_username;
var password_obj = document.form.vpn_server_clientlist_password;
var rule_num = document.getElementById("openvpnd_clientlist_table").rows.length;
var item_num = document.getElementById("openvpnd_clientlist_table").rows[0].cells.length;
if(rule_num >= upper) {
alert("<#2628#> " + upper + " <#2629#>");
return false;
}
if(validForm()){
if(item_num >= 2) {
for(var i = 0; i < rule_num; i += 1) {
if(username_obj.value == document.getElementById("openvpnd_clientlist_table").rows[i].cells[1].title) {
alert("<#2621#>");
username_obj.focus();
username_obj.select();
return false;
}
}
}
addRow(username_obj ,1);
addRow(password_obj, 0);
showopenvpnd_clientlist();
openvpnd_connected_status();
$("#client_pwd_strength").css("display", "none");
}
}
function del_Row(rowdata){
var i = rowdata.parentNode.parentNode.rowIndex;
document.getElementById("openvpnd_clientlist_table").deleteRow(i);
var vpn_server_clientlist_value = "";
var rowLength = document.getElementById("openvpnd_clientlist_table").rows.length;
for(var k = 1; k < rowLength; k += 1){
for(var j=1; j < document.getElementById("openvpnd_clientlist_table").rows[k].cells.length - 1; j += 1) {
if(j == 1)
vpn_server_clientlist_value += "<";
else {
vpn_server_clientlist_value += document.getElementById("openvpnd_clientlist_table").rows[k].cells[1].title;
vpn_server_clientlist_value += ">";
vpn_server_clientlist_value += document.getElementById("openvpnd_clientlist_table").rows[k].cells[2].title;
}
}
}
vpn_server_clientlist_array = vpn_server_clientlist_value;
if(vpn_server_clientlist_array == "") {
showopenvpnd_clientlist();
openvpnd_connected_status();
}
}
var overlib_str2 = new Array(); //Viz add 2013.10 for record longer VPN client username/pwd for OpenVPN
var overlib_str3 = new Array(); //Viz add 2013.10 for record longer VPN client username/pwd for OpenVPN
function showopenvpnd_clientlist(){
var vpn_server_clientlist_row = vpn_server_clientlist_array.split('<');
var code = "";
code +='<table width="100%" cellspacing="0" cellpadding="4" align="center" class="list_table" id="openvpnd_clientlist_table">';
code +='<tr id="row0"><td width="15%" id="conn0"></td><td width="35%" title="<% nvram_get("http_username"); %>"><% nvram_get("http_username"); %></td><td width="35%" style="text-align:center;">-</td><td width="15%" style="text-align:center;">-</td></tr>';
if(vpn_server_clientlist_row.length > 1){
for(var i = 1; i < vpn_server_clientlist_row.length; i++){
overlib_str2[i] = "";
overlib_str3[i] = "";
code +='<tr id="row'+i+'">';
var vpn_server_clientlist_col = vpn_server_clientlist_row[i].split('>');
code +='<td width="15%" id="conn'+i+'"></td>';
for(var j = 0; j < vpn_server_clientlist_col.length; j++){
if(j == 0){
if(vpn_server_clientlist_col[0].length >32){
overlib_str2[i] += vpn_server_clientlist_col[0];
vpn_server_clientlist_col[0] = vpn_server_clientlist_col[0].substring(0, 30)+"...";
code +='<td width="35%" title="'+htmlEnDeCode.htmlEncode(overlib_str2[i])+'">'+ htmlEnDeCode.htmlEncode(vpn_server_clientlist_col[0]) +'</td>';
}else{
code +='<td width="35%" title="'+htmlEnDeCode.htmlEncode(vpn_server_clientlist_col[0])+'">'+ htmlEnDeCode.htmlEncode(vpn_server_clientlist_col[0]) +'</td>';
}
}
else if(j ==1){
overlib_str3[i] += vpn_server_clientlist_col[1];
code +='<td width="35%" title="'+overlib_str3[i]+'" style="text-align:center;pointer-events:none;">-</td>';
}
}
code +='<td width="15%">';
code +='<input class="remove_btn" onclick="del_Row(this, \'openvpnd\');" value=""/></td></tr>';
}
}
code +='</table>';
document.getElementById("openvpnd_clientlist_Block").innerHTML = code;
}
function parseOpenVPNClients(client_status){ //192.168.123.82:46954 10.8.0.6 pine\n
openvpnd_connected_clients = [];
var Loginfo = client_status;
if (Loginfo == "") {return;}
Loginfo = Loginfo.replace('\r\n', '\n');
Loginfo = Loginfo.replace('\n\r', '\n');
Loginfo = Loginfo.replace('\r', '\n');
var lines = Loginfo.split('\n');
for (i = 0; i < lines.length; i++){
var fields = lines[i].split(' ');
if ( fields.length != 3 ) continue;
openvpnd_connected_clients.push({
"username": htmlEnDeCode.htmlEncode(fields[2]),
"remoteIP": htmlEnDeCode.htmlEncode(fields[0]),
"VPNIP": htmlEnDeCode.htmlEncode(fields[1])
});
}
}
function showOpenVPNClients(uname){
var statusmenu = "";
var statustitle = "";
statustitle += "<div style=\"text-decoration:underline;\">VPN IP ( Remote IP )</div>";
_caption = statustitle;
for (i = 0; i < openvpnd_connected_clients.length; i++){
if(uname == openvpnd_connected_clients[i].username){
statusmenu += "<div>"+openvpnd_connected_clients[i].VPNIP+" \t( "+openvpnd_connected_clients[i].remoteIP+" )</div>";
}
}
return overlib(statusmenu, WIDTH, 260, OFFSETX, -360, LEFT, STICKY, CAPTION, _caption, CLOSETITLE, '');
}
function check_vpn_server_state(){
if(vpn_server_enable == '1' && service_state != '2'){
document.getElementById('export_div').style.display = "none";
document.getElementById('openvpn_initial').style.display = "";
update_vpn_server_state();
}
}
function update_vpn_server_state() {
$.ajax({
url: '/ajax_openvpn_server.asp',
dataType: 'script',
error: function(xhr) {
setTimeout("update_vpn_server_state();", 1000);
},
success: function() {
if(vpnd_state != '2' && (vpn_server1_errno == '1' || vpn_server1_errno == '2')){
document.getElementById('openvpn_initial').style.display = "none";
document.getElementById('openvpn_error_message').innerHTML = "<span><#3756#></span>";
document.getElementById('openvpn_error_message').style.display = "";
}
else if(vpnd_state != '2' && vpn_server1_errno == '4'){
document.getElementById('openvpn_initial').style.display = "none";
document.getElementById('openvpn_error_message').innerHTML = "<span><#3757#></span>";
document.getElementById('openvpn_error_message').style.display = "";
}
else if(vpnd_state != '2' && vpn_server1_errno == '5'){
document.getElementById('openvpn_initial').style.display = "none";
document.getElementById('openvpn_error_message').innerHTML = "<span><#3758#></span>";
document.getElementById('openvpn_error_message').style.display = "";
}
else if((vpnd_state == '-1' && vpn_server1_errno == '0') || (vpnd_state != '2' && vpn_server1_errno == '7')){
document.getElementById('openvpn_initial').style.display = "none";
document.getElementById('openvpn_error_message').innerHTML = "<span><#3759#></span>";
document.getElementById('openvpn_error_message').style.display = "";
}
else if(vpnd_state != '2'){
setTimeout("update_vpn_server_state();", 1000);
}
else{ // OpenVPN server ready , vpn_server1_state==2
setTimeout("location.href='Advanced_VPN_OpenVPN.asp';", 1000);
return;
}
}
});
}
function showMailPanel(){
var checker = {
server: document.mailConfigForm.PM_SMTP_SERVER.value,
mailPort: document.mailConfigForm.PM_SMTP_PORT.value,
user: document.mailConfigForm.PM_SMTP_AUTH_USER.value,
pass: document.mailConfigForm.PM_SMTP_AUTH_PASS.value,
end: 0
}
if(checker.server == "" || checker.mailPort == "" || checker.user == "" || checker.pass == ""){
$("#mailConfigPanelContainer").fadeIn(300);
$("#mailSendPanelContainer").fadeOut(300);
}
else{
$("#mailConfigPanelContainer").fadeOut(300);
$("#mailSendPanelContainer").fadeIn(300);
}
}
function switchMode(mode){
if(mode == "1"){ //general setting
document.getElementById("trServerPortBasic").style.display = "";
document.getElementById("trRSAEncryptionBasic").style.display = ("<% nvram_get("vpn_server_crypt"); %>" == "secret")?"none":"";
document.getElementById("trClientWillUseVPNToAccess").style.display = "";
document.getElementById('OpenVPN_setting').style.display = ("<% nvram_get("vpn_server_crypt"); %>" == "secret")?"none":"";
if(vpn_server_enable == '0') {
$('*[data-group="cert_btn"]').hide();
}
else {
$('*[data-group="cert_btn"]').show();
}
document.getElementById("divAdvanced").style.display = "none";
updateVpnServerClientAccess();
if((wan_proto == "v6plus" || wan_proto == "ocnvc") && s46_ports_check_flag && array_ipv6_s46_ports.length > 1){
if($("#s46_ports_content").is(':visible'))
$("#s46_ports_content").fadeOut();
$(".setup_info_icon.basic").show();
$(".setup_info_icon.adv").hide();
}
}
else{
document.getElementById("trServerPortBasic").style.display = "none";
document.getElementById("trRSAEncryptionBasic").style.display = "none";
document.getElementById("trClientWillUseVPNToAccess").style.display = "none";
document.getElementById("OpenVPN_setting").style.display = "none";
$('*[data-group="cert_btn"]').hide();
document.getElementById("divAdvanced").style.display = "";
if((wan_proto == "v6plus" || wan_proto == "ocnvc") && s46_ports_check_flag && array_ipv6_s46_ports.length > 1){
if($("#s46_ports_content").is(':visible'))
$("#s46_ports_content").fadeOut();
$(".setup_info_icon.basic").hide();
$(".setup_info_icon.adv").show();
}
}
}
/* Advanced Setting start */
function change_vpn_unit(val){
FormActions("apply.cgi", "change_vpn_server_unit", "", "");
document.form.target = "";
document.form.submit();
}
function update_visibility(){
var auth = document.form.vpn_server_crypt.value;
var iface = document.form.vpn_server_if.value;
var hmac = document.form.vpn_server_hmac.value;
var dhcp = getRadioValue(document.form.vpn_server_dhcp);
var dns = getRadioValue(document.form.vpn_server_x_dns);
if(auth != "tls")
ccd = 0;
else
ccd = getRadioValue(document.form.vpn_server_ccd);
showhide("server_authhmac", (auth != "secret"));
showhide("server_snnm", ((auth == "tls") && (iface == "tun")));
showhide("server_plan", ((auth == "tls") && (iface == "tun")));
showhide("server_rgw", (auth == "tls"));
showhide("server_local", ((auth == "secret") && (iface == "tun")));
showhide("server_reneg", (auth != "secret")); //add by Viz 2014.06
showhide("server_ccd", (auth == "tls"));
showhide("server_c2c", ccd);
showhide("server_ccd_excl", ccd);
showhide("openvpn_client_table", ccd);
showhide("openvpn_clientlist_Block", ccd);
showhide("server_pdns", ((auth == "tls") && (dns == 1)));
showhide("server_dhcp",((auth == "tls") && (iface == "tap")));
showhide("server_range", ((dhcp == 0) && (auth == "tls") && (iface == "tap")));
showhide("server_tls_crypto_text", (auth == "tls")); //add by Viz
showhide("server_static_crypto_text", (auth == "secret")); //add by Viz
update_visibility_ipv6();
}
function set_Keys(auth) {
cal_panel_block("tlsKey_panel", 0.15);
updateCRTValue(auth);
if(auth == 'tls') {
$("#tlsKey_panel").fadeIn(300);
}
else if(auth == 'secret') {
$("#staticKey_panel").fadeIn(300);
}
}
function updateCRTValue(auth){
$.ajax({
url: '/ajax_openvpn_server.asp',
dataType: 'script',
timeout: 1500,
error: function(xhr){
setTimeout("updateCRTValue('"+auth+"');",1000);
},
success: function(){
if(auth == "tls") {
document.openvpnTLSKeyForm.edit_vpn_crt_server1_ca.value = vpn_crt_server1_ca[0].replace(/&#10/g, "\n").replace(/&#13/g, "\r");
document.openvpnTLSKeyForm.edit_vpn_crt_server1_crt.value = vpn_crt_server1_crt[0].replace(/&#10/g, "\n").replace(/&#13/g, "\r");
document.openvpnTLSKeyForm.edit_vpn_crt_server1_key.value = vpn_crt_server1_key[0].replace(/&#10/g, "\n").replace(/&#13/g, "\r");
document.openvpnTLSKeyForm.edit_vpn_crt_server1_dh.value = vpn_crt_server1_dh[0].replace(/&#10/g, "\n").replace(/&#13/g, "\r");
document.openvpnTLSKeyForm.edit_vpn_crt_server1_crl.value = vpn_crt_server1_crl[0].replace(/&#10/g, "\n").replace(/&#13/g, "\r");
}
else if(auth == "secret") {
document.openvpnStaticKeyForm.edit_vpn_crt_server1_static.value = vpn_crt_server1_static[0].replace(/&#10/g, "\n").replace(/&#13/g, "\r");
}
}
})
}
function addRow_Group_Advanced(upper){
var client_num = document.getElementById("openvpn_clientlist_table").rows.length;
var item_num = document.getElementById("openvpn_clientlist_table").rows[0].cells.length;
if(client_num >= upper){
alert("<#2628#> " + upper + " <#2629#>");
return false;
}
if(document.form.vpn_clientlist_commonname_0.value==""){
alert("<#414#>");
document.form.vpn_clientlist_commonname_0.focus();
document.form.vpn_clientlist_commonname_0.select();
return false;
}
if(document.form.vpn_clientlist_subnet_0.value==""){
alert("<#414#>");
document.form.vpn_clientlist_subnet_0.focus();
document.form.vpn_clientlist_subnet_0.select();
return false;
}
if(document.form.vpn_clientlist_netmask_0.value==""){
alert("<#414#>");
document.form.vpn_clientlist_netmask_0.focus();
document.form.vpn_clientlist_netmask_0.select();
return false;
}
if(item_num >=2){
for(i=0; i<client_num; i++){
if(document.form.vpn_clientlist_commonname_0.value.toLowerCase() == document.getElementById("openvpn_clientlist_table").rows[i].cells[0].innerHTML.toLowerCase()
&& document.form.vpn_clientlist_subnet_0.value == document.getElementById("openvpn_clientlist_table").rows[i].cells[1].innerHTML
&& document.form.vpn_clientlist_netmask_0.value == document.getElementById("openvpn_clientlist_table").rows[i].cells[2].innerHTML){
alert('<#2621#>');
document.form.vpn_clientlist_commonname_0.focus();
document.form.vpn_clientlist_commonname_0.select();
return false;
}
}
}
do_addRow_Group();
}
function do_addRow_Group(){
addRowAdvanced(document.form.vpn_clientlist_commonname_0 ,1);
addRowAdvanced(document.form.vpn_clientlist_subnet_0, 0);
addRowAdvanced(document.form.vpn_clientlist_netmask_0, 0);
addRowAdvanced(document.form.vpn_clientlist_push_0, 0);
document.form.vpn_clientlist_push_0.value="0"; //reset selection
allowed_openvpn_clientlist();
}
function addRowAdvanced(obj, head){
if(head == 1)
openvpn_clientlist_array += "<1>";
else
openvpn_clientlist_array += ">";
openvpn_clientlist_array += obj.value;
obj.value = "";
}
function allowed_openvpn_clientlist(){
var openvpn_clientlist_row = openvpn_clientlist_array.split('<');
var code = "";
code +='<table width="100%" cellspacing="0" cellpadding="4" align="center" class="list_table" id="openvpn_clientlist_table">';
if(openvpn_clientlist_row.length == 1)
code +='<tr><td style="color:#FFCC00;" colspan="6"><#2550#></td>';
else{
for(var i = 1; i < openvpn_clientlist_row.length; i++){
code +='<tr id="row'+i+'">';
var openvpn_clientlist_col = openvpn_clientlist_row[i].split('>');
var wid=[0, 36, 20, 20, 12];
for (var j = 1; j < openvpn_clientlist_col.length; j++){
if (j == 4)
code +='<td width="'+wid[j]+'%">'+ ((openvpn_clientlist_col[j] == 1 || openvpn_clientlist_col[j] == 'Yes') ? 'Yes' : 'No') +'</td>';
else
code +='<td width="'+wid[j]+'%">'+ openvpn_clientlist_col[j] +'</td>';
}
code +='<td width="12%">';
code +='<input class="remove_btn" onclick="del_openvpnRow(this);" value=""/></td>';
}
}
code +='</table>';
document.getElementById("openvpn_clientlist_Block").innerHTML = code;
}
function del_openvpnRow(r) {
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("openvpn_clientlist_table").deleteRow(i);
var openvpn_clientlist_value = "";
var rowLength = document.getElementById("openvpn_clientlist_table").rows.length;
for(var k = 0; k < rowLength; k += 1) {
for(var j = 0; j < document.getElementById("openvpn_clientlist_table").rows[k].cells.length - 1; j += 1){
if(j == 0)
openvpn_clientlist_value += "<1>";
else
openvpn_clientlist_value += ">";
openvpn_clientlist_value += document.getElementById("openvpn_clientlist_table").rows[k].cells[j].innerHTML;
}
}
openvpn_clientlist_array = openvpn_clientlist_value;
if(openvpn_clientlist_array == "")
allowed_openvpn_clientlist();
}
function cancel_Key_panel(auth) {
if(auth == 'tls') {
this.FromObject ="0";
$("#tlsKey_panel").fadeOut(300);
}
else if(auth == 'secret') {
this.FromObject ="0";
$("#staticKey_panel").fadeOut(300);
}
}
function save_keys(auth) {
if(auth == 'tls') {
document.openvpnTLSKeyForm.vpn_crt_server1_ca.value = document.openvpnTLSKeyForm.edit_vpn_crt_server1_ca.value;
document.openvpnTLSKeyForm.vpn_crt_server1_crt.value = document.openvpnTLSKeyForm.edit_vpn_crt_server1_crt.value;
document.openvpnTLSKeyForm.vpn_crt_server1_key.value = document.openvpnTLSKeyForm.edit_vpn_crt_server1_key.value;
document.openvpnTLSKeyForm.vpn_crt_server1_dh.value = document.openvpnTLSKeyForm.edit_vpn_crt_server1_dh.value;
document.openvpnTLSKeyForm.vpn_crt_server1_crl.value = document.openvpnTLSKeyForm.edit_vpn_crt_server1_crl.value;
document.openvpnTLSKeyForm.vpn_crt_server1_ca.disabled = false;
document.openvpnTLSKeyForm.vpn_crt_server1_crt.disabled = false;
document.openvpnTLSKeyForm.vpn_crt_server1_key.disabled = false;
document.openvpnTLSKeyForm.vpn_crt_server1_dh.disabled = false;
document.openvpnTLSKeyForm.vpn_crt_server1_crl.disabled = false;
document.openvpnTLSKeyForm.submit();
cancel_Key_panel('tls');
}
else if(auth == 'secret') {
document.openvpnStaticKeyForm.vpn_crt_server1_static.value = document.openvpnStaticKeyForm.edit_vpn_crt_server1_static.value;
document.openvpnStaticKeyForm.vpn_crt_server1_static.disabled = false;
document.openvpnStaticKeyForm.submit();
cancel_Key_panel('secret');
}
}
/* Advanced Setting end */
function update_vpn_client_state() {
$.ajax({
url: '/ajax_openvpn_client_status.xml',
dataType: 'xml',
error: function(xml) {
setTimeout("update_vpn_client_state();", 1000);
},
success: function(xml) {
var vpnserverXML = xml.getElementsByTagName("vpnserver");
var client_status = vpnserverXML[0].firstChild.nodeValue;
parseOpenVPNClients(client_status);
openvpnd_connected_status();
setTimeout("update_vpn_client_state();", 3000);
}
});
}
function enable_server_igncrt(flag){
document.form.vpn_server_crypt.style.display = (flag==1)?"none":"";
document.form.vpn_server_crypt.value = (flag==1)?"tls":"<% nvram_get("vpn_server_crypt"); %>";
update_visibility();
document.getElementById("Hint_fixed_tls_crypto").style.display = (flag==1)?"":"none";
document.getElementById("Fixed_tls_crypto").style.display = (flag==1)?"":"none";
document.getElementById("allowed_client_name").innerHTML = (flag==1)?"<#3690#>":"Common Name(CN)";
}
function vpnServerTlsKeysize(_obj) {
document.form.vpn_server_tls_keysize.value = _obj.value;
setRadioValue(document.form.vpn_server_tls_keysize_basic, _obj.value);
setRadioValue(document.form.vpn_server_tls_keysize_adv, _obj.value);
}
function update_cipher() {
$("#cipher_hint").css("display", "none");
var cipher = document.form.vpn_server_cipher.value;
if(cipher == "default")
$("#cipher_hint").css("display", "");
}
function update_digest() {
$("#digest_hint").css("display", "none");
var digest = document.form.vpn_server_digest.value;
if(digest == "MD5" || digest == "RSA-MD4")
$("#digest_hint").css("display", "");
}
function vpnServerClientAccess() {
var vpn_server_client_access = getRadioValue(document.form.vpn_server_client_access);
switch(parseInt(vpn_server_client_access)) {
case 0 :
setRadioValue(document.form.vpn_server_plan, 1);
setRadioValue(document.form.vpn_server_rgw, 0);
setRadioValue(document.form.vpn_server_x_dns, 0);
setRadioValue(document.form.vpn_server_pdns, 0);
$(".client_access_custom").css("display", "none");
break;
case 1 :
setRadioValue(document.form.vpn_server_plan, 1);
setRadioValue(document.form.vpn_server_rgw, 1);
setRadioValue(document.form.vpn_server_x_dns, 1);
setRadioValue(document.form.vpn_server_pdns, 1);
$(".client_access_custom").css("display", "none");
break;
}
update_visibility();
}
function updateVpnServerClientAccess() {
var vpn_server_plan = getRadioValue(document.form.vpn_server_plan);
var vpn_server_rgw = getRadioValue(document.form.vpn_server_rgw);
var vpn_server_x_dns = getRadioValue(document.form.vpn_server_x_dns);
var vpn_server_pdns = getRadioValue(document.form.vpn_server_pdns);
if(vpn_server_plan == "1" && vpn_server_rgw == "0" && vpn_server_x_dns == "0" && vpn_server_pdns == "0") {
setRadioValue(document.form.vpn_server_client_access, 0);
$(".client_access_custom").css("display", "none");
}
else if(vpn_server_plan == "1" && vpn_server_rgw == "1" && vpn_server_x_dns == "1" && vpn_server_pdns == "1") {
setRadioValue(document.form.vpn_server_client_access, 1);
$(".client_access_custom").css("display", "none");
}
else {
setRadioValue(document.form.vpn_server_client_access, 2);
$(".client_access_custom").css("display", "");
}
}
function exportCert() {
location.href = 'server_ovpn.cert';
}
function renewCert() {
$("#renewCertToLocal").hide();
$(".renewLoadingIcon").show();
httpApi.nvramSet({
"vpn_crt_server1_ca" : "",
"vpn_crt_server1_crt" : "",
"vpn_crt_server1_key" : "",
"vpn_crt_server1_dh" : "",
"vpn_crt_server1_crl" : "",
"rc_service": "restart_openvpnd",
"action_mode": "apply"
}, function(){
var count = 0;
var timer = 10;
var interval_check = setInterval(function(){
var vpn_server1_state = httpApi.nvramGet(["vpn_server1_state"], true).vpn_server1_state;
if(vpn_server1_state == "2"){
clearInterval(interval_check);
$("#renewCertToLocal").show();
$(".renewLoadingIcon").hide();
alert("Update certification successfully, please export new OpenVPN configuration file and install in your VPN client.");/* untranslated */
}
else{
count++;
if(count >= timer){
clearInterval(interval_check);
$("#renewCertToLocal").show();
$(".renewLoadingIcon").hide();
alert("<#3848#>");
}
}
}, 2000);
});
}
function selectImportFile() {
document.import_cert_form.import_cert_file.click();
}
function importCert() {
var import_file = document.import_cert_form.import_cert_file.value;
var import_subname = import_file.substring(import_file.indexOf('.') + 1);
if(import_subname != 'cert') {
alert("<#3307#>");
document.import_cert_form.import_cert_file.value = "";
return false;
}
showLoading();
document.import_cert_form.submit();
}
function callback_upload_cert(_flag) {
if(_flag) {
var waiting_time = parseInt(document.form.action_wait.value);
showLoading(waiting_time);
setTimeout(function(){location.reload();}, waiting_time*1000);
}
else {
alert("<#3292#>");
hideLoading();
}
}
function update_visibility_ipv6(){
if(isSupport("ipv6")){
var ipv6_service = httpApi.nvramGet(["ipv6_service"]).ipv6_service;
if(ipv6_service == "disabled"){
$('*[data-group="ipv6_settings"]').remove();
}
else{
$('*[data-group="ipv6_settings"]').hide();
var vpn_server_if = $('select[name=vpn_server_if] option').filter(':selected').val();
if(vpn_server_if != "tap"){
$("#server_ipv6_mode").show();
var vpn_server_ip6 = $('input[name="vpn_server_ip6"]:checked').val();
if(vpn_server_ip6 == "1"){
$("#server_ipv6_nat").show();
if(isSupport("ipv6nat")){
$("input[name=vpn_server_nat6]").attr("disabled", false);
$("#ipv6nat_hint").hide();
}
else{
$("input[name=vpn_server_nat6][value=0]").attr("checked", "checked");
$("input[name=vpn_server_nat6][value=1]").attr("disabled", true);
$("#ipv6nat_hint").show();
}
var vpn_server_crypt = $('select[name=vpn_server_crypt] option').filter(':selected').val();
if(vpn_server_if == "tun" && vpn_server_crypt == "tls"){
$("#server_ipv6_snnm").show();
}
else if(vpn_server_if == "tun" && vpn_server_crypt == "secret"){
$("#server_ipv6_local").show();
}
}
else{
$("#server_ipv6_snnm, #server_ipv6_local, #server_ipv6_nat").hide();
}
}
}
}
else{
$('*[data-group="ipv6_settings"]').remove();
}
}
function handle_ipv6_submit_settings(){
if(isSupport("ipv6")){
var ipv6_service = httpApi.nvramGet(["ipv6_service"]).ipv6_service;
if(ipv6_service != "disabled"){
$('*[data-group="ipv6_settings"]').find(":input").attr("disabled", true);
var vpn_server_if = $('select[name=vpn_server_if] option').filter(':selected').val();
if(vpn_server_if != "tap"){
if(document.form.VPNServer_enable.value == "1"){
$("input[name='vpn_server_ip6']").attr("disabled", false);
var vpn_server_ip6 = $('input[name="vpn_server_ip6"]:checked').val();
if(vpn_server_ip6 == "1"){
$("input[name='vpn_server_nat6']").attr("disabled", false);
var vpn_server_crypt = $('select[name=vpn_server_crypt] option').filter(':selected').val();
if(vpn_server_if == "tun" && vpn_server_crypt == "tls"){
$("input[name='vpn_server_sn6']").attr("disabled", false);
}
else if(vpn_server_if == "tun" && vpn_server_crypt == "secret"){
$("input[name='vpn_server_local6'], input[name='vpn_server_remote6']").attr("disabled", false);
}
}
}
}
}
}
}
</script>
</head>
<body onload="initial();" class="bg">
<div id="tlsKey_panel" class="contentM_qis">
<table class="QISform_wireless" border=0 align="center" cellpadding="5" cellspacing="0">
<form method="post" name="openvpnTLSKeyForm" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="current_page" value="Advanced_VPN_OpenVPN.asp">
<input type="hidden" name="next_page" value="Advanced_VPN_OpenVPN.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="flag" value="background">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="saveNvram">
<input type="hidden" name="action_wait" value="1">
<input type="hidden" name="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="vpn_crt_server1_ca" value="" disabled>
<input type="hidden" name="vpn_crt_server1_crt" value="" disabled>
<input type="hidden" name="vpn_crt_server1_key" value="" disabled>
<input type="hidden" name="vpn_crt_server1_dh" value="" disabled>
<input type="hidden" name="vpn_crt_server1_crl" value="" disabled>
<tr>
<div class="description_down"><#3777#></div>
</tr>
<tr>
<div style="margin-left:30px; margin-top:10px;">
<p><#3768#> <span style="color:#FFCC00;">----- BEGIN xxx ----- </span>/<span style="color:#FFCC00;"> ----- END xxx -----</span> <#3769#>
<p><#3770#>
</div>
<div style="margin:5px;*margin-left:-5px;width: 730px; height: 2px;" class="splitLine"></div>
</tr>
<tr>
<td valign="top">
<table width="700px" border="0" cellpadding="4" cellspacing="0">
<tbody>
<tr>
<td valign="top">
<table width="100%" id="page1_tls" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable">
<tr>
<th><#3766#></th>
<td>
<textarea rows="8" class="textarea_ssh_table" name="edit_vpn_crt_server1_ca" cols="65" maxlength="3999"></textarea>
</td>
</tr>
<tr>
<th><#3771#></th>
<td>
<textarea rows="8" class="textarea_ssh_table" name="edit_vpn_crt_server1_crt" cols="65" maxlength="3999"></textarea>
</td>
</tr>
<tr>
<th><#3775#></th>
<td>
<textarea rows="8" class="textarea_ssh_table" name="edit_vpn_crt_server1_key" cols="65" maxlength="3999"></textarea>
</td>
</tr>
<tr>
<th><#3767#></th>
<td>
<textarea rows="8" class="textarea_ssh_table" name="edit_vpn_crt_server1_dh" cols="65" maxlength="3999"></textarea>
</td>
</tr>
<tr>
<th>Certificate Revocation List (Optional)</th>
<td>
<textarea rows="8" class="textarea_ssh_table" name="edit_vpn_crt_server1_crl" cols="65" maxlength="3999"></textarea>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
<div style="margin-top:5px;width:100%;text-align:center;">
<input class="button_gen" type="button" onclick="cancel_Key_panel('tls');" value="<#287#>">
<input class="button_gen" type="button" onclick="save_keys('tls');" value="<#1780#>">
</div>
</td>
</tr>
</form>
</table>
</div>
<div id="staticKey_panel" class="contentM_qis" style="box-shadow: 3px 3px 10px #000;">
<table class="QISform_wireless" border=0 align="center" cellpadding="5" cellspacing="0">
<form method="post" name="openvpnStaticKeyForm" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="current_page" value="Advanced_VPN_OpenVPN.asp">
<input type="hidden" name="next_page" value="Advanced_VPN_OpenVPN.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="flag" value="background">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="saveNvram">
<input type="hidden" name="action_wait" value="1">
<input type="hidden" name="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="vpn_crt_server1_static" value="<% nvram_get("vpn_crt_server1_static"); %>" disabled>
<tr>
<div class="description_down"><#3777#></div>
</tr>
<tr>
<div style="margin-left:30px; margin-top:10px;">
<p><#3768#> <span style="color:#FFCC00;">----- BEGIN xxx ----- </span>/<span style="color:#FFCC00;"> ----- END xxx -----</span> <#3769#>
<p><#3770#>
</div>
<div style="margin:5px;*margin-left:-5px;width: 730px; height: 2px;" class="splitLine"></div>
</tr>
<tr>
<td valign="top">
<table width="700px" border="0" cellpadding="4" cellspacing="0">
<tbody>
<tr>
<td valign="top">
<table width="100%" id="page1_static" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable">
<tr>
<th><#3776#></th>
<td>
<textarea rows="8" class="textarea_ssh_table" name="edit_vpn_crt_server1_static" cols="65" maxlength="3999"></textarea>
</td>
</tr>
</table>
<div style="margin-top:5px;width:100%;text-align:center;">
<input class="button_gen" type="button" onclick="cancel_Key_panel('secret');" value="<#287#>">
<input class="button_gen" type="button" onclick="save_keys('secret');" value="<#1780#>">
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</form>
</table>
</div>
<div id="TopBanner"></div>
<div id="Loading" class="popup_bg"></div>
<iframe name="hidden_frame" id="hidden_frame" src="" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="form" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="current_page" value="Advanced_VPN_OpenVPN.asp">
<input type="hidden" name="next_page" value="Advanced_VPN_OpenVPN.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_wait" value="10">
<input type="hidden" name="action_script" value="">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="VPNServer_enable" value="<% nvram_get("VPNServer_enable"); %>">
<input type="hidden" name="VPNServer_mode" value="<% nvram_get("VPNServer_mode"); %>">
<input type="hidden" name="vpn_serverx_clientlist" value="">
<input type="hidden" name="vpn_serverx_eas" value="<% nvram_get("vpn_serverx_eas"); %>">
<input type="hidden" name="vpn_serverx_dns" value="<% nvram_get("vpn_serverx_dns"); %>">
<input type="hidden" name="vpn_server_ccd_val" value="">
<input type="hidden" name="vpn_server_tls_keysize" value="<% nvram_get("vpn_server_tls_keysize"); %>">
<input type="hidden" name="vpn_server_port" value="<% nvram_get("vpn_server_port"); %>">
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
<td valign="top" >
<table width="760px" border="0" cellpadding="4" cellspacing="0" class="FormTitle" id="FormTitle" >
<tbody>
<tr>
<td bgcolor="#4D595D" valign="top">
<div>&nbsp;</div>
<div class="formfonttitle"><#258#> - OpenVPN</div>
<div id="divSwitchMenu" style="margin-top:-40px;float:right;"></div>
<div style="margin:10px 0 10px 5px;" class="splitLine"></div>
<div id="privateIP_notes" class="formfontdesc" style="display:none;color:#FFCC00;"></div>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="FormTable">
<thead>
<tr>
<td colspan="2"><#3470#></td>
</tr>
</thead>
<tr>
<th><#3729#></th>
<td>
<div align="center" class="left" style="width:94px; float:left; cursor:pointer;" id="radio_VPNServer_enable"></div>
<script type="text/javascript">
$('#radio_VPNServer_enable').iphoneSwitch(open_vpn_enable,
function(){
document.form.VPNServer_enable.value = "1";
formShowAndHide(1, "openvpn");
},
function(){
document.form.VPNServer_enable.value = "0";
formShowAndHide(0, "openvpn");
}
);
</script>
</td>
</tr>
<tr id="trVPNServerMode">
<th><#882#></th>
<td>
<select id="selSwitchMode" onchange="switchMode(this.options[this.selectedIndex].value)" class="input_option">
<option value="1" selected><#479#></option>
<option value="2"><#477#></option>
</select>
</td>
</tr>
<tr id="trServerPortBasic">
<th><#4000#>
<div class="setup_info_icon basic" style="display:none;"></div>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" id="vpn_server_port_basic" name="vpn_server_port_basic" onKeyPress="return validator.isNumber(this,event);" value="<% nvram_get("vpn_server_port"); %>" autocorrect="off" autocapitalize="off">
<div id="portSuggestionBasic" style="color: #FFCC00;"><#3392#></div>
</td>
</tr>
<tr id="trRSAEncryptionBasic">
<th><#3244#></th>
<td>
<input type="radio" name="vpn_server_tls_keysize_basic" id="vpn_server_tls_keysize_basic_0" class="input" value="0" <% nvram_match_x("", "vpn_server_tls_keysize", "0", "checked"); %> onchange="vpnServerTlsKeysize(this);">
<label for='vpn_server_tls_keysize_basic_0'>1024 bit</label>
<input type="radio" name="vpn_server_tls_keysize_basic" id="vpn_server_tls_keysize_basic_1" class="input" value="1" <% nvram_match_x("", "vpn_server_tls_keysize", "1", "checked"); %> onchange="vpnServerTlsKeysize(this);">
<label for='vpn_server_tls_keysize_basic_1'>2048 bit</label>
</td>
</tr>
<tr id="trClientWillUseVPNToAccess">
<th><#3714#></th>
<td>
<input type="radio" name="vpn_server_client_access" id="vpn_server_client_access_local" class="input" value="0" onchange="vpnServerClientAccess();">
<label for="vpn_server_client_access_local"><#3715#></label>
<input type="radio" name="vpn_server_client_access" id="vpn_server_client_access_both" class="input" value="1" onchange="vpnServerClientAccess();">
<label for="vpn_server_client_access_both"><#3716#></label>
<input type="radio" name="vpn_server_client_access" id="vpn_server_client_access_custom" class="input client_access_custom" value="2" onchange="vpnServerClientAccess();">
<label for="vpn_server_client_access_custom" class="client_access_custom"><#1794#></label>
</td>
</tr>
<tr id="openvpn_export" style="display:none;" data-group="cert_btn">
<th><#3731#></th>
<td>
<div id="export_div">
<input id="exportToLocal" class="button_gen" type="button" value="<#1628#>" />
<input id="exportViaEmail" class="button_gen" type="button" value="via Email" style="display:none;"/></div>
<script type="text/javascript">
document.getElementById("exportToLocal").onclick = function(){
location.href = 'client.ovpn';
}
document.getElementById("exportViaEmail").onclick = function(){
showMailPanel();
}
</script>
<div id="openvpn_initial" style="display:none;margin-left:5px;">
<span>
<#3763#>
<img src="images/InternetScan.gif" />
</span>
</div>
<div id="openvpn_error_message" style="display:none;margin-left:5px;"></div>
</td>
</tr>
<tr id="openvpn_re_cert" style="display:none;" data-group="cert_btn">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(33,2);"><#3842#></a></th>
<td>
<input id="renewCertToLocal" class="button_gen" type="button" value="<#295#>" onClick="renewCert();"/>
<div class="renewLoadingIcon"></div>
</td>
</tr>
</table>
<div data-group="cert_btn" style="margin-top:14px;">
<div class="formfontdesc">
When you would restore or replace router, you can keep original certification of OpenVPN server via Export Current Certification and import it to new router.</div>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="FormTable">
<thead>
<tr>
<td colspan="2">Certification Tranfer</td></tr>
</thead>
<tr id="openvpn_export_cert" style="display:none;" data-group="cert_btn">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,27);"><#3732#></a></th>
<td>
<input id="exportCertToLocal" class="button_gen" type="button" value="<#1628#>" onClick="exportCert();"/>
</td>
</tr>
<tr id="openvpn_import_cert" style="display:none;" data-group="cert_btn">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,28);"><#3733#></a></th>
<td>
<input class="button_gen" type="button" value="<#1789#>" onClick="selectImportFile();"/>
</td>
</tr>
</table>
</div>
<div id="OpenVPN_setting" style="display:none;margin-top:8px;">
<div class="formfontdesc">
<#3750#>&nbsp;<#3752#>&nbsp;<#3753#>&nbsp;<#3751#><br>
<ol>
<li><a id="faq_windows" href="" target="_blank" style="text-decoration:underline;">Windows</a></li>
<li><a id="faq_macOS" href="" target="_blank" style="text-decoration:underline;">Mac OS</a></li>
<li><a id="faq_iPhone" href="" target="_blank" style="text-decoration:underline;">iPhone/iPad</a></li>
<li><a id="faq_android" href="" target="_blank" style="text-decoration:underline;">Android</a></li>
</ol>
</div>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable_table" style="margin-top:8px;">
<thead>
<tr>
<td colspan="4"><#3691#>&nbsp;(<#2768#>&nbsp;16)</td>
</tr>
</thead>
<tr>
<th><#586#></th>
<th><#3690#></th>
<th><#2438#></th>
<th><#2767#></th>
</tr>
<tr>
<td width="15%" style="text-align:center;">-
</td>
<td width="35%">
<input type="text" class="input_25_table" maxlength="64" name="vpn_server_clientlist_username" onKeyPress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
</td>
<td width="35%">
<input type="text" class="input_25_table" maxlength="64" name="vpn_server_clientlist_password" onKeyPress="return validator.isString(this, event)" autocorrect="off" autocapitalize="off">
<div id="client_pwd_strength"></div>
</td>
<td width="15%">
<div><input type="button" class="add_btn" onClick="addRow_Group(16);" value=""></div>
</td>
</tr>
</table>
<div id="openvpnd_clientlist_Block"></div>
</div>
<div id="divAdvanced" style="display:none;margin-top:8px;">
<div class="formfontdesc">
<p><#3752#><br />
<p><#3760#><br />
<p><#3761#><br />
<p><#3762#>
</div>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="FormTable" style="margin-top:8px;">
<thead>
<tr>
<td colspan="2"><#477#></td>
</tr>
</thead>
<tr style="display:none;">
<th>Select server instance</th>
<td>
<select name="vpn_server_unit" class="input_option" onChange="change_vpn_unit(this.value);">
<option value="1" <% nvram_match("vpn_server_unit","1","selected"); %> >Server 1</option>
<option value="2" <% nvram_match("vpn_server_unit","2","selected"); %> >Server 2</option>
</select>
</td>
</tr>
<tr style="display:none;">
<th>Service state</th>
<td>
<div class="left" style="width:94px; float:left; cursor:pointer;" id="radio_service_enable"></div>
<script type="text/javascript">
if (openvpn_unit == '1')
var service_state_advanced = (<% sysinfo("pid.vpnserver1"); %> > 0);
else if (openvpn_unit == '2')
var service_state_advanced = (<% sysinfo("pid.vpnserver2"); %> > 0);
else
var service_state_advanced = false;
$('#radio_service_enable').iphoneSwitch(service_state_advanced,
function() {
document.form.action_script.value = "start_vpnserver"+openvpn_unit;
parent.showLoading();
document.form.submit();
},
function() {
document.form.action_script.value = "stop_vpnserver"+openvpn_unit;
parent.showLoading();
document.form.submit();
}
);
</script>
<span>Warning: any unsaved change will be lost.</span>
</td>
</tr>
<tr style="display:none;">
<th>Start with WAN</th>
<td>
<input type="radio" name="vpn_server_x_eas" class="input" value="1"><#275#>
<input type="radio" name="vpn_server_x_eas" class="input" value="0"><#274#>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,4);"><#3764#></a></th>
<td>
<select name="vpn_server_if" class="input_option" onChange="update_visibility();">
<option value="tap" <% nvram_match("vpn_server_if","tap","selected"); %> >TAP</option>
<option value="tun" <% nvram_match("vpn_server_if","tun","selected"); %> >TUN</option>
</select>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,5);"><#2543#></a></th>
<td>
<select name="vpn_server_proto" class="input_option">
<option value="tcp-server" <% nvram_match("vpn_server_proto","tcp-server","selected"); %> >TCP</option>
<option value="udp" <% nvram_match("vpn_server_proto","udp","selected"); %> >UDP</option>
</select>
</td>
</tr>
<tr>
<th><#4000#>
<div class="setup_info_icon adv" style="display:none;"></div>
</th>
<td>
<input type="text" maxlength="5" class="input_6_table" id="vpn_server_port_adv" name="vpn_server_port_adv" onKeyPress="return validator.isNumber(this,event);" value="<% nvram_get("vpn_server_port"); %>" autocorrect="off" autocapitalize="off">
<div id="portSuggestionAdvanced" style="color: #FFCC00;"><#3392#></div>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,15);"><#3784#></a></th>
<td>
<input type="radio" name="vpn_server_x_dns" class="input" value="1" onclick="update_visibility();"><#275#>
<input type="radio" name="vpn_server_x_dns" class="input" value="0" onclick="update_visibility();"><#274#>
</td>
</tr>
<tr id="server_pdns">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,16);"><#3738#></a></th>
<td>
<input type="radio" name="vpn_server_pdns" class="input" value="1" <% nvram_match_x("", "vpn_server_pdns", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_pdns" class="input" value="0" <% nvram_match_x("", "vpn_server_pdns", "0", "checked"); %>><#274#>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,17);"><#3755#></a></th>
<td>
<select name="vpn_server_cipher" class="input_option" onChange="update_cipher();"></select>
<span id="cipher_hint" class="hint-color">(Default : BF-CBC)</span>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,26);"><#3742#></a></th>
<td>
<select name="vpn_server_digest" class="input_option" onChange="update_digest();"></select>
<span id="digest_hint" class="hint-color">(Not recommended)</span>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,18);"><#3747#></a></th>
<td>
<select name="vpn_server_comp" class="input_option">
<option value="-1" <% nvram_match("vpn_server_comp","-1","selected"); %> ><#4072#></option>
<option value="no" <% nvram_match("vpn_server_comp","no","selected"); %> ><#950#></option>
<option value="yes" <% nvram_match("vpn_server_comp","yes","selected"); %> ><#4071#></option>
<option value="adaptive" <% nvram_match("vpn_server_comp","adaptive","selected"); %> ><#982#></option>
<option value="lz4" <% nvram_match("vpn_server_comp","lz4","selected"); %> >LZ4</option>
</select>
</td>
</tr>
<!-- rm 2017/06/28 tr>
<th><#500#></th>
<td>
<select name="vpn_server_firewall" class="input_option">
<option value="auto" <% nvram_match("vpn_server_firewall","auto","selected"); %> ><#241#></option>
<option value="external" <% nvram_match("vpn_server_firewall","external","selected"); %> ><#2016#></option>
<option value="custom" <% nvram_match("vpn_server_firewall","custom","selected"); %> ><#1794#></option>
</select>
</td>
</tr-->
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,9);"><#3740#></a></th>
<td>
<input type="radio" name="vpn_server_igncrt" class="input" value="1" onchange="enable_server_igncrt(this.value);" <% nvram_match_x("", "vpn_server_igncrt", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_igncrt" class="input" value="0" onchange="enable_server_igncrt(this.value);" <% nvram_match_x("", "vpn_server_igncrt", "0", "checked"); %>><#274#>
<span id="Hint_fixed_tls_crypto" style="display:none;"><#3741#></span>
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,7);"><#3739#></a></th>
<td>
<select name="vpn_server_crypt" class="input_option" onChange="update_visibility();">
<option value="tls" <% nvram_match("vpn_server_crypt","tls","selected"); %> >TLS</option>
<option value="secret" <% nvram_match("vpn_server_crypt","secret","selected"); %> >Static Key</option>
</select>
<span id="Fixed_tls_crypto" style="color:#FFFFFF;display:none;">TLS</span>
<span id="server_tls_crypto_text" onclick="set_Keys('tls');" style="text-decoration:underline;cursor:pointer;"><#3780#></span>
<span id="server_static_crypto_text" onclick="set_Keys('secret');" style="text-decoration:underline;cursor:pointer;"><#3780#></span>
<!-- rm 2017/06/28 span id="server_custom_crypto_text"><#3779#></span-->
</td>
</tr>
<tr>
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,8);"><#3244#></a></th>
<td>
<input type="radio" name="vpn_server_tls_keysize_adv" id="vpn_server_tls_keysize_adv_0" class="input" value="0" <% nvram_match_x("", "vpn_server_tls_keysize", "0", "checked"); %> onchange="vpnServerTlsKeysize(this);">
<label for='vpn_server_tls_keysize_adv_0'>1024 bit</label>
<input type="radio" name="vpn_server_tls_keysize_adv" id="vpn_server_tls_keysize_adv_1" class="input" value="1" <% nvram_match_x("", "vpn_server_tls_keysize", "1", "checked"); %> onchange="vpnServerTlsKeysize(this);">
<label for='vpn_server_tls_keysize_adv_1'>2048 bit</label>
</td>
</tr>
<tr id="server_authhmac">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,10);"><#3743#></a></th>
<td>
<select name="vpn_server_hmac" class="input_option">
<option value="-1" <% nvram_match("vpn_server_hmac","-1","selected"); %> ><#4072#></option>
<option value="2" <% nvram_match("vpn_server_hmac","2","selected"); %> >Bi-directional</option>
<option value="0" <% nvram_match("vpn_server_hmac","0","selected"); %> >Incoming (0)</option>
<option value="1" <% nvram_match("vpn_server_hmac","1","selected"); %> >Incoming (1)</option>
</select>
<span class="hint-color">(TLS-Auth)</span>
</td>
</tr>
<tr id="server_snnm">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,11);"><#3786#></a></th>
<td>
<input type="text" maxlength="15" class="input_15_table" name="vpn_server_sn" onkeypress="return validator.isIPAddr(this, event);" value="<% nvram_get("vpn_server_sn"); %>" autocorrect="off" autocapitalize="off">
<input type="text" maxlength="15" class="input_15_table" name="vpn_server_nm" onkeypress="return validator.isIPAddr(this, event);" value="<% nvram_get("vpn_server_nm"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="server_ipv6_mode" data-group="ipv6_settings">
<th>Enable IPv6 Server mode</th><td>
<input type="radio" name="vpn_server_ip6" class="input" value="1" onclick="update_visibility_ipv6();" <% nvram_match_x("", "vpn_server_ip6", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_ip6" class="input" value="0" onclick="update_visibility_ipv6();" <% nvram_match_x("", "vpn_server_ip6", "0", "checked"); %>><#274#>
</td>
</tr>
<tr id="server_ipv6_nat" data-group="ipv6_settings">
<th>Enable NAT IPv6</th><td>
<input type="radio" name="vpn_server_nat6" class="input" value="1" <% nvram_match_x("", "vpn_server_nat6", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_nat6" class="input" value="0" <% nvram_match_x("", "vpn_server_nat6", "0", "checked"); %>><#274#>
<br>
<span id="ipv6nat_hint" class="hint-color">The router does not support NAT IPv6 and all your VPN clients would get a global IPv6 allocated address.</span>
</td>
</tr>
<tr id="server_ipv6_snnm" data-group="ipv6_settings">
<th>IPv6 <#3786#></th>
<td>
<input type="text" maxlength="43" class="input_22_table" name="vpn_server_sn6" value="<% nvram_get("vpn_server_sn6"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="server_dhcp">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,13);"><#3754#></a></th>
<td>
<input type="radio" name="vpn_server_dhcp" class="input" value="1" onclick="update_visibility();" <% nvram_match_x("", "vpn_server_dhcp", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_dhcp" class="input" value="0" onclick="update_visibility();" <% nvram_match_x("", "vpn_server_dhcp", "0", "checked"); %>><#274#>
</td>
</tr>
<tr id="server_range">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,14);"><#3745#></a></th>
<td>
<input type="text" maxlength="15" class="input_15_table" name="vpn_server_r1" onkeypress="return validator.isIPAddr(this, event);" value="<% nvram_get("vpn_server_r1"); %>" autocorrect="off" autocapitalize="off">
<input type="text" maxlength="15" class="input_15_table" name="vpn_server_r2" onkeypress="return validator.isIPAddr(this, event);" value="<% nvram_get("vpn_server_r2"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="server_local">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,12);"><#3778#></a></th>
<td>
<input type="text" maxlength="15" class="input_15_table" name="vpn_server_local" onkeypress="return validator.isIPAddr(this, event);" value="<% nvram_get("vpn_server_local"); %>" autocorrect="off" autocapitalize="off">
<input type="text" maxlength="15" class="input_15_table" name="vpn_server_remote" onkeypress="return validator.isIPAddr(this, event);" value="<% nvram_get("vpn_server_remote"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr id="server_ipv6_local" data-group="ipv6_settings">
<th>IPv6 <#3778#></th>
<td>
<input type="text" maxlength="39" class="input_22_table" name="vpn_server_local6" value="<% nvram_get("vpn_server_local6"); %>" autocorrect="off" autocapitalize="off">
<input type="text" maxlength="39" class="input_22_table" name="vpn_server_remote6" value="<% nvram_get("vpn_server_remote6"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<!-- rm 2017/06/28 tr>
<th><#3781#></th>
<td>
<input type="text" maxlength="4" class="input_6_table" name="vpn_server_poll" onKeyPress="return validator.isNumber(this,event);" value="<% nvram_get("vpn_server_poll"); %>" autocorrect="off" autocapitalize="off"> <#2817#>
<span style="color:#FC0">(<#4226#>)</span>
</td>
</tr-->
<tr id="server_plan">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,2);"><#3782#></a></th>
<td>
<input type="radio" name="vpn_server_plan" class="input" value="1" <% nvram_match_x("", "vpn_server_plan", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_plan" class="input" value="0" <% nvram_match_x("", "vpn_server_plan", "0", "checked"); %>><#274#>
</td>
</tr>
<tr id="server_rgw">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,3);"><#3783#></a></th>
<td>
<input type="radio" name="vpn_server_rgw" class="input" value="1" <% nvram_match_x("", "vpn_server_rgw", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_rgw" class="input" value="0" <% nvram_match_x("", "vpn_server_rgw", "0", "checked"); %>><#274#>
</td>
</tr>
<tr id="server_reneg">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,19);"><#3787#></a></th>
<td>
<input type="text" maxlength="5" class="input_6_table" name="vpn_server_reneg" value="<% nvram_get("vpn_server_reneg"); %>" autocorrect="off" autocapitalize="off"> <#3270#>
<span class="hint-color">(<#3301#> : -1)</span>
</td>
</tr>
<tr id="server_ccd">
<th><#3785#></th>
<td>
<input type="radio" name="vpn_server_ccd" class="input" value="1" onclick="update_visibility();" <% nvram_match_x("", "vpn_server_ccd", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_ccd" class="input" value="0" onclick="update_visibility();" <% nvram_match_x("", "vpn_server_ccd", "0", "checked"); %>><#274#>
</td>
</tr>
<tr id="server_c2c">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,20);"><#3744#></a></th>
<td>
<input type="radio" name="vpn_server_c2c" class="input" value="1" <% nvram_match_x("", "vpn_server_c2c", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_c2c" class="input" value="0" <% nvram_match_x("", "vpn_server_c2c", "0", "checked"); %>><#274#>
</td>
</tr>
<tr id="server_ccd_excl">
<th><a class="hintstyle" href="javascript:void(0);" onClick="openHint(32,21);"><#3746#></a></th>
<td>
<input type="radio" name="vpn_server_ccd_excl" class="input" value="1" onclick="update_visibility();" <% nvram_match_x("", "vpn_server_ccd_excl", "1", "checked"); %>><#275#>
<input type="radio" name="vpn_server_ccd_excl" class="input" value="0" onclick="update_visibility();" <% nvram_match_x("", "vpn_server_ccd_excl", "0", "checked"); %>><#274#>
</td>
</tr>
</table>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable_table" id="openvpn_client_table">
<thead>
<tr>
<td colspan="5">Allowed Clients</td>
</tr>
</thead>
<tr>
<th width="36%"><a id="allowed_client_name" class="hintstyle" href="javascript:void(0);" onClick="openHint(32,22);">Common Name(CN)</a></th> <!-- #Username# -->
<th width="20%"><a id="allowed_client_name" class="hintstyle" href="javascript:void(0);" onClick="openHint(32,23);"><#3422#></a></th>
<th width="20%"><a id="allowed_client_name" class="hintstyle" href="javascript:void(0);" onClick="openHint(32,24);">Mask</a></th>
<th width="12%"><a id="allowed_client_name" class="hintstyle" href="javascript:void(0);" onClick="openHint(32,25);"><#3162#></a></th>
<th width="12%"><#2767#></th>
</tr>
<tr>
<div id="VPNClientList_Block_PC" class="VPNClientList_Block_PC"></div>
<td width="36%">
<input type="text" class="input_25_table" maxlength="25" name="vpn_clientlist_commonname_0" autocorrect="off" autocapitalize="off">
</td>
<td width="20%">
<input type="text" class="input_15_table" maxlength="15" name="vpn_clientlist_subnet_0" onkeypress="return validator.isIPAddr(this, event);" autocorrect="off" autocapitalize="off">
</td>
<td width="20%">
<input type="text" class="input_15_table" maxlength="15" name="vpn_clientlist_netmask_0" onkeypress="return validator.isIPAddr(this, event);" autocorrect="off" autocapitalize="off">
</td>
<td width="12%">
<select name="vpn_clientlist_push_0" class="input_option">
<option value="0" selected><#274#></option>
<option value="1"><#275#></option>
</select>
</td>
<td width="12%">
<input class="add_btn" type="button" onClick="addRow_Group_Advanced(128);" name="vpn_clientlist2" value="">
</td>
</tr>
</table>
<div id="openvpn_clientlist_Block"></div>
<table width="100%" border="1" align="center" cellpadding="4" cellspacing="0" class="FormTable_table">
<thead>
<tr>
<td><#3749#></td>
</tr>
</thead>
<tr>
<td>
<textarea rows="8" class="textarea_ssh_table" name="vpn_server_custom" cols="55" maxlength="15000"><% nvram_clean_get("vpn_server_custom"); %></textarea>
</td>
</tr>
</table>
</div>
<div id="divApply" class="apply_gen" style="display:none;">
<input class="button_gen" onclick="applyRule()" type="button" value="<#284#>"/>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</form>
<div id="mailSendPanelContainer" class="hiddenPanelContainer">
<div class="hiddenPanel">
<form method="post" name="mailSendForm" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="restart_sendmail">
<input type="hidden" name="action_wait" value="5">
<input type="hidden" name="flag" value="background">
<input type="hidden" name="PM_MAIL_SUBJECT" value="My ovpn file">
<input type="hidden" name="PM_MAIL_FILE" value="/www/client.ovpn">
<input type="hidden" name="PM_LETTER_CONTENT" value="Here is the ovpn file.">
<div class="panelTableTitle">
<div>Send</div>
<div style="margin:10px 0 10px 5px;height: 2px;width: 100%;padding:0;" class="splitLine"></div>
</div>
<table border=0 align="center" cellpadding="5" cellspacing="0" class="FormTable panelTable">
<tr>
<th>PM_MAIL_TARGET</th>
<td valign="top">
<input type="text" class="input_32_table" name="PM_MAIL_TARGET" value="" autocorrect="off" autocapitalize="off">
</td>
</tr>
</table>
<div class="panelSubmiter">
<input id="mailSendPannelCancel" class="button_gen" type="button" value="<#287#>">
<input id="mailSendPannelSubmiter" class="button_gen" type="button" value="Send">
<img id="mailSendLoadingIcon" style="margin-left:5px;display:none;" src="/images/InternetScan.gif">
<script>
document.getElementById("mailSendPannelCancel").onclick = function(){
$("#mailSendPanelContainer").fadeOut(300);
}
document.getElementById("mailSendPannelSubmiter").onclick = function(){
$("#mailSendLoadingIcon").fadeIn(200);
document.mailSendForm.submit();
setTimeout(function(){
document.mailSendForm.PM_MAIL_TARGET.value = "";
$("#mailSendLoadingIcon").fadeOut(200);
$("#mailSendPanelContainer").fadeOut(300);
}, document.mailSendForm.action_wait.value*1000);
}
</script>
</div>
</form>
</div>
</div>
<div id="mailConfigPanelContainer" class="hiddenPanelContainer">
<div class="hiddenPanel">
<form method="post" name="mailConfigForm" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="saveNvram">
<input type="hidden" name="action_wait" value="3">
<input type="hidden" name="PM_SMTP_SERVER" value="<% nvram_get("PM_SMTP_SERVER"); %>">
<input type="hidden" name="PM_SMTP_PORT" value="<% nvram_get("PM_SMTP_PORT"); %>">
<input type="hidden" name="PM_SMTP_AUTH_USER" value="<% nvram_get("PM_SMTP_AUTH_USER"); %>">
<input type="hidden" name="PM_SMTP_AUTH_PASS" value="<% nvram_get("PM_SMTP_AUTH_PASS"); %>">
<input type="hidden" name="PM_MY_NAME" value="<% nvram_get("PM_MY_NAME"); %>">
<input type="hidden" name="PM_MY_EMAIL" value="<% nvram_get("PM_MY_EMAIL"); %>">
<div class="panelTableTitle">
<div>Setup mail server</div>
<div style="margin:10px 0 10px 5px;height: 2px;width: 100%;padding:0;" class="splitLine"></div>
</div>
<table border=0 align="center" cellpadding="5" cellspacing="0" class="FormTable panelTable">
<tr>
<th>PM_SMTP_SERVER</th>
<td valign="top">
<select style="width:350px;" name="PM_SMTP_SERVER_TMP" class="input_option">
<option value="smtp.gmail.com" <% nvram_match( "PM_SMTP_SERVER", "smtp.gmail.com", "selected"); %>>Google Gmail</option>
</select>
<script>
var smtpList = new Array()
smtpList = [
{smtpServer: "smtp.gmail.com", smtpPort: "587", smtpDomain: "gmail.com"},
{end: 0}
];
document.mailConfigForm.PM_SMTP_SERVER_TMP.onchange = function(){
document.mailConfigForm.PM_SMTP_PORT_TMP.value = smtpList[this.selectedIndex].smtpPort;
document.mailConfigForm.PM_SMTP_AUTH_USER_TMP.value = "";
document.mailConfigForm.PM_SMTP_AUTH_PASS_TMP.value = "";
document.mailConfigForm.PM_MY_NAME_TMP.value = "";
document.mailConfigForm.PM_MY_EMAIL_TMP.value = "";
}
</script>
</td>
</tr>
<input type="hidden" name="PM_SMTP_PORT_TMP" value="<% nvram_get("PM_SMTP_PORT"); %>">
<tr>
<th>PM_SMTP_AUTH_USER</th>
<td valign="top">
<input type="text" class="input_32_table" name="PM_SMTP_AUTH_USER_TMP" value="<% nvram_get("PM_SMTP_AUTH_USER"); %>" autocorrect="off" autocapitalize="off">
<script>
document.mailConfigForm.PM_SMTP_AUTH_USER_TMP.onkeyup = function(){
document.mailConfigForm.PM_MY_NAME_TMP.value = this.value;
document.mailConfigForm.PM_MY_EMAIL_TMP.value = this.value + "@" + smtpList[document.mailConfigForm.PM_SMTP_SERVER_TMP.selectedIndex].smtpDomain;
}
</script>
</td>
</tr>
<tr>
<th>PM_SMTP_AUTH_PASS</th>
<td valign="top">
<input type="password" class="input_32_table" name="PM_SMTP_AUTH_PASS_TMP" maxlength="100" value="" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr>
<th>PM_MY_NAME (Optional)</th>
<td valign="top">
<input type="text" class="input_32_table" name="PM_MY_NAME_TMP" value="<% nvram_get("PM_MY_NAME"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
<tr>
<th>PM_MY_EMAIL (Optional)</th>
<td valign="top">
<input type="text" class="input_32_table" name="PM_MY_EMAIL_TMP" value="<% nvram_get("PM_MY_EMAIL"); %>" autocorrect="off" autocapitalize="off">
</td>
</tr>
</table>
<div class="panelSubmiter">
<input id="mailConfigPannelCancel" class="button_gen" type="button" value="<#287#>">
<input id="mailConfigPannelSubmiter" class="button_gen" type="button" value="<#1780#>">
<img id="mailConfigLoadingIcon" style="margin-left:5px;display:none;" src="/images/InternetScan.gif">
<script>
document.getElementById("mailConfigPannelCancel").onclick = function(){
$("#mailConfigPanelContainer").fadeOut(300);
}
document.getElementById("mailConfigPannelSubmiter").onclick = function(){
document.mailConfigForm.PM_SMTP_SERVER.value = document.mailConfigForm.PM_SMTP_SERVER_TMP.value;
if (document.mailConfigForm.PM_SMTP_PORT_TMP.value == "")
document.mailConfigForm.PM_SMTP_PORT.value = smtpList[0].smtpPort;
else
document.mailConfigForm.PM_SMTP_PORT.value = document.mailConfigForm.PM_SMTP_PORT_TMP.value;
document.mailConfigForm.PM_SMTP_AUTH_USER.value = document.mailConfigForm.PM_SMTP_AUTH_USER_TMP.value;
document.mailConfigForm.PM_SMTP_AUTH_PASS.value = document.mailConfigForm.PM_SMTP_AUTH_PASS_TMP.value;
document.mailConfigForm.PM_MY_NAME.value = document.mailConfigForm.PM_MY_NAME_TMP.value;
document.mailConfigForm.PM_MY_EMAIL.value = document.mailConfigForm.PM_MY_EMAIL_TMP.value;
$("#mailConfigLoadingIcon").fadeIn(200);
document.mailConfigForm.submit();
setTimeout(function(){
$("#mailConfigLoadingIcon").fadeOut(200);
showMailPanel();
}, document.mailConfigForm.action_wait.value*1000);
}
</script>
</div>
</form>
</div>
</div>
<iframe name="hidden_import_cert_frame" id="hidden_import_cert_frame" src="" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="import_cert_form" action="upload_server_ovpn_cert.cgi" target="hidden_import_cert_frame" enctype="multipart/form-data">
<input type="file" name="import_cert_file" style="display:none;" onchange="importCert();"/>
</form>
<div id="footer"></div>
</body>
</html>

