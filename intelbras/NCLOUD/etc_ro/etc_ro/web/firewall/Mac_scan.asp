<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var flag=eval(location.href.split("#")[1]);
function selectArpTbl(mac)
{
	if(flag==1)
		window.opener.document.weblocal.mac_address1.value = trim(eval('document.formArpTbl.'+mac+'.value'));
	if(flag==2)
		window.opener.document.weblocal.mac_address2.value = trim(eval('document.formArpTbl.'+mac+'.value'));
	if(flag==3)
		window.opener.document.weblocal.mac_address3.value = trim(eval('document.formArpTbl.'+mac+'.value'));
	if(flag==4)
		window.opener.document.weblocal.mac_address4.value = trim(eval('document.formArpTbl.'+mac+'.value'));

	if(flag==5) {
		window.opener.document.staticDhcp.mac_address.focus();
		window.opener.document.staticDhcp.mac_address.value = trim(eval('document.formArpTbl.'+mac+'.value'));	
	}
	if(flag==6) {
		window.opener.document.macFilter.mac_address.focus();
		window.opener.document.macFilter.mac_address.value = trim(eval('document.formArpTbl.'+mac+'.value'));	
	}
	if(flag==7)
		window.opener.document.wirelessMacfilter.mac_address.value = trim(eval('document.formArpTbl.'+mac+'.value'));

	window.close();
}
</script>
</head>
<body oncontextmenu="self.event.returnValue=false">
<table width=600><tr><td>
<form method=POST name="formArpTbl">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_client_list)</script></td></tr>
<tr><td>&nbsp;</td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr class="title4" align=center>
<td><b><script>dw(MM_ipaddr)</script></b></td>
<td><b><script>dw(MM_macaddr)</script></b></td>
</tr>
<% getArpTableForWebLocal(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_refresh+'" onClick="window.location.reload()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_close+'" onClick="window.close();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
