﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
<meta HTTP-EQUIV="Expires" CONTENT="-1">
<link rel="shortcut icon" href="images/favicon.png">
<link rel="icon" href="images/favicon.png">
<title>Untitled Document</title>
<link rel="stylesheet" type="text/css" href="../NM_style.css">
<link rel="stylesheet" type="text/css" href="../form_style.css">
<script type="text/javascript" src="/general.js"></script>
<script type="text/javascript" src="/state.js"></script>
<script>
if(parent.location.pathname.search("index") === -1) top.location.href = "../"+'<% networkmap_page(); %>';
var remoteIP = '<% nvram_get("lan_gateway_now"); %>';
remoteIP = (remoteIP == '')?'<% nvram_get("lan_gateway_now"); %>';
var re_status = parent.getConnectingStatus();
function initial(){
if(re_status == -1){
showtext(document.getElementById("Connstatus"), "<#558#>");
document.getElementById("remoteIP_tr").style.display = "none";
setTimeout("set_re_status();",6000);
}
else
set_re_status();
document.getElementById("remoteIP_span").innerHTML = (remoteIP == "")?"<#1510#>":remoteIP;
}
function set_re_status(){
re_status = parent.getConnectingStatus();
if(re_status == 2){
showtext(document.getElementById("Connstatus"), "<#279#>");
document.getElementById("remoteIP_tr").style.display = "";
}
else{
showtext(document.getElementById("Connstatus"), "<#1772#>");
document.getElementById("remoteIP_tr").style.display = "none";
}
}
</script>
</head>
<body class="statusbody" onload="initial();">
<table width="95%" border="1" align="center" cellpadding="4" cellspacing="0" bordercolor="#6b8fa3" class="table1px">
<tr>
<th width="120"><#589#></th>
<td width="150"><span id="Connstatus"></span></td>
</tr>
<tr id="remoteIP_tr">
<th><#1511#></th>
<td><span id="remoteIP_span"></span></td>
</tr>
<tr>
<th><#1512#></th>
<td><input type="button" class="button_gen" value="<#1633#>" onclick="javascript:parent.location.href='../survey.htm';"></td>
</tr>
</table>
</body>
</html>

