<html>
<head>
<title><% getTitle(); %></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="<% getFavicon(); %>">
<link href="<% getStyle(); %>" rel="stylesheet" type="text/css">
<script language="javascript" src="js/language_<% getCfgGeneral(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="js/common.js"></script>
<script language="javascript">


function Load_Setting()
{
	document.getElementById("Logoutall").submit();
}
</script>
</head>
<body onLoad="Load_Setting()">

<form method=post name="Logoutall" id="Logoutall" action="/goform/formLogoutAll">
<input type="hidden" name="submit-url" value="/login.asp">
<table align="center" width="330" border="0" cellspacing="0" cellpadding="0" class="login_table">
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
</form>
</body></html>
