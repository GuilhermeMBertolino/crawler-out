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
<title><#867#> - <#3809#></title>
<link rel="stylesheet" type="text/css" href="/index_style.css">
<link rel="stylesheet" type="text/css" href="/form_style.css">
<script type="text/javascript" src="/state.js"></script>
<script type="text/javascript" src="/popup.js"></script>
<script type="text/javascript" src="/validator.js"></script>
<script type="text/javascript" src="/general.js"></script>
<script type="text/javascript" src="/help.js"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
<style>
.rwd_iframe {
width: 100%;
}
</style>
<script>
function initial(){
show_menu();
setTimeout(function(){
var getUrlParameter = function getUrlParameter(param){
var url_parm = window.location.search.substring(1);
var parm_array = url_parm.split("&");
var key_value;
for(var i = 0; i < parm_array.length; i += 1){
key_value = parm_array[i].split("=");
if (key_value[0] == param) {
return typeof key_value[1] == "undefined" ? "" : decodeURIComponent(key_value[1]);
}
}
return "";
};
var referer = getUrlParameter("referer").toLocaleLowerCase();
var curTheme = (parent.businessWrapper) ? "?current_theme=white" : "";
var vpnc_iframe_src = "/VPN/vpnc.html" + curTheme;
if(referer != "")
vpnc_iframe_src += "?referer=" + referer + "";
document.getElementById("vpnc_iframe").setAttribute("src", vpnc_iframe_src);
},((window.location.protocol == "https:") ? 1000 : 50));
}
</script>
</head>
<body onload="initial();" onunLoad="return unload_body();" class="bg">
<div id="TopBanner"></div>
<div id="Loading" class="popup_bg"></div>
<iframe name="hidden_frame" id="hidden_frame" src="" width="0" height="0" frameborder="0"></iframe>
<form method="post" name="form" id="ruleForm" action="/start_apply.htm" target="hidden_frame" autocomplete="off">
<input type="hidden" name="productid" value="<% nvram_get("productid"); %>">
<input type="hidden" name="current_page" value="vpnc.asp">
<input type="hidden" name="next_page" value="vpnc.asp">
<input type="hidden" name="modified" value="0">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="">
<input type="hidden" name="action_wait" value="5">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
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
<table width="760px" border="0" cellpadding="5" cellspacing="0" class="FormTitle" id="FormTitle" style="border-radius:3px;">
<tbody>
<tr>
<td bgcolor="#4D595D" valign="top">
<iframe id="vpnc_iframe" class="rwd_iframe" frameborder="0"></iframe>
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
</form>
<div id="footer"></div>
</body>
</html>

