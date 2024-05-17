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
<title><#944#> - AiCloud 2.0</title>
<link rel="stylesheet" type="text/css" href="index_style.css">
<link rel="stylesheet" type="text/css" href="form_style.css">
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/state.js"></script>
<script type="text/javascript" src="/general.js"></script>
<script type="text/javascript" src="/popup.js"></script>
<script type="text/javascript" src="/help.js"></script>
<script>
function initial(){
show_menu();
if(!rrsut_support)
document.getElementById("rrsLink").style.display = "none";
}
</script>
</head>
<body onload="initial();" onunload="return unload_body();" class="bg">
<div id="TopBanner"></div>
<div id="Loading" class="popup_bg"></div>
<iframe name="hidden_frame" id="hidden_frame" width="0" height="0" frameborder="0" scrolling="no"></iframe>
<form method="post" name="form" action="/start_apply.htm" target="hidden_frame">
<input type="hidden" name="preferred_lang" id="preferred_lang" value="<% nvram_get("preferred_lang"); %>">
<input type="hidden" name="firmver" value="<% nvram_get("firmver"); %>">
<input type="hidden" name="current_page" value="cloud_syslog.asp">
<input type="hidden" name="next_page" value="cloud_syslog.asp">
<input type="hidden" name="action_mode" value="apply">
<input type="hidden" name="action_script" value="restart_webdav">
<input type="hidden" name="action_wait" value="3">
<table border="0" align="center" cellpadding="0" cellspacing="0" class="content">
<tr>
<td valign="top" width="17">&nbsp;</td>
<td valign="top" width="202">
<div id="mainMenu"></div>
<div id="subMenu"></div>
</td>
<td valign="top">
<div id="tabMenu" class="submenuBlock"></div>
<table width="98%" border="0" align="left" cellpadding="0" cellspacing="0">
<tr>
<td align="left" valign="top">
<table width="100%" border="0" cellpadding="5" cellspacing="0" class="FormTitle" id="FormTitle">
<tbody>
<tr>
<td bgcolor="#4D595D" valign="top">
<div>&nbsp;</div>
<div class="formfonttitle">AiCloud 2.0 - <#2775#></div>
<div style="margin:10px 0 10px 5px;" class="splitLine"></div>
<div class="formfontdesc" style="font-style: italic;font-size: 14px;"><#1050#></div>
<table width="100%" style="border-collapse:collapse;">
<tr>
<td>
<div style="margin-top:8px">
<textarea cols="63" rows="27" wrap="off" readonly="readonly" id="textarea" class="content_bg" style="width:99%; font-family:'Courier New', Courier, mono; font-size:11px;color:#FFFFFF;"><% nvram_dump("clouddisk.log",""); %></textarea>
</div>
</td>
</tr>
</table>
<div>
<table class="apply_gen">
<tr class="apply_gen" valign="top">
<td width="40%" align="center" >
<form method="post" name="form3" action="apply.cgi">
<input type="button" onClick="location.reload();" value="<#1782#>" class="button_gen">
</form>
</td>
</tr>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</td>
<td width="20"></td>
</tr>
</table>
<div id="footer"></div>
</form>
</body>
</html>

