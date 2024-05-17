<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
</head>
<body>
<table width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_client_list)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr class="title4" align=center>
<td><b><script>dw(MM_hostname)</script></b></td>
<td><b><script>dw(MM_macaddr)</script></b></td>
<td><b><script>dw(MM_ipaddr)</script></b></td>
<td><b><script>dw(MM_expired_time)</script></b></td>
</tr>
<% getDhcpCliList(); %>
</table>

</td></tr></table>
</body></html>
