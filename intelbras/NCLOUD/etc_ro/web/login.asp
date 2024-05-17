<html>
<head>
<title><% getTitle(); %></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="<% getFavicon(); %>">
<link href="<% getStyle(); %>" rel="stylesheet" type="text/css">
<script language="javascript" src="js/language_<% getCfgGeneral(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="js/common.js"></script>
<script language="javascript">
var longinStatus='<% getLoginStatus(); %>';
if(top!=self)top.location.href = self.location.href;
function formCheck()
{
	if (!blankCheck(document.Login.username.value, "", JS_msg165))
		return false;
	
	if (!blankCheck(document.Login.password.value, "", JS_msg166)) 
		return false;
		
	return true;
}

function Load_Setting()
{
	if (longinStatus == 1) document.getElementById("login_err").innerHTML = JS_msg193;
	else if (longinStatus == 2) document.getElementById("login_err").innerHTML = JS_msg194;
	else if (longinStatus == 3) document.getElementById("login_err").innerHTML = JS_msg195;
	else if (longinStatus == 4) document.getElementById("login_err").innerHTML = JS_msg196;
	else document.getElementById("login_err").innerHTML = "";

	var login_err_flag = 1*'<% getInfo(1, "login_flag"); %>';
	
	if (login_err_flag == 1)
		alert(JS_msg143);
}
</script>
</head>
<body onLoad="Load_Setting()">
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<form method=post name="Login" action="/goform/formLogin">
<table align="center" width="330" border="0" cellspacing="0" cellpadding="0" class="login_table">
  <tr>
    <td><img src="nbox/logo.png" width="330"></td>
  </tr>
  <tr>
    <td><table width="100%" border="0" cellspacing="5" cellpadding="0">
      <tr>
        <td colspan="3">&nbsp;</td>
      </tr>
      <tr>
        <td width="60">&nbsp;</td>
        <td class="login_label"><script>dw(MM_username)</script>:</td>
        <td><input type="text" name="username" class="login_input" maxlength="16"></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class="login_label"><script>dw(MM_password)</script>:</td>
        <td><input type="password" name="password" class="login_input" maxlength="16"></td>
      </tr>
	  <tr>
		<td colspan="3" height="5"></td>
	  </tr>
	  <tr>
		<td colspan="3" align="center" class="login_label"><span id="login_err"></span></td>
	  </tr>
	  <tr>
		<td colspan="3" height="5"></td>
	  </tr>
      <tr>
        <td colspan="3" align="center"><script>dw('<input type="submit" name="button" class="login_button" value="'+BT_login+'" onClick="return formCheck()">&nbsp;&nbsp;\
		<input type="reset" id="reset" class="login_button" value="'+BT_reset+'">')</script></td>
      </tr>
      <tr>
        <td colspan="3" height="15"></td>
      </tr>
    </table></td>
  </tr>
</table>
<script>document.Login.username.focus();</script>
</form>
</body></html>
