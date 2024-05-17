<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=<% getCharset(); %>">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var path_count = 0;
var any_en = '<% getCfgZero(1, "FtpAnonymous"); %>';
var all_str = "<% getCfgGeneral(1, "AdmUsers"); %>";
var ftp_str = "<% getCfgGeneral(1, "FtpUsers"); %>";

function CheckAlreadyConfig()
{
	var user_count = 0;
	var p = all_str.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		if(q[2] == 1)
			user_count++;
	}

	if(user_count == 1)
	{
		var curUser;
		var p = ftp_str.split(";");
		for(i=0; i<p.length;i++){
			var q=p[i].split(",");
			
			if(any_en == 0)
				curUser = document.ftp_adddir.allow_user.value
			else
				curUser = document.ftp_adddir.allow_user[0].value
				
			if(q[0] == curUser){
				alert(JS_msg161);
				return false;
			}
		}
	}
	else{
		for(i=0;i<user_count;i++)
		{
			if (document.ftp_adddir.allow_user[i].checked == true){
				var p = ftp_str.split(";");
				for(j=0; j<p.length;j++){
					var q=p[j].split(",");
					if(q[0] == document.ftp_adddir.allow_user[i].value){
						alert(JS_msg161);
						return false;
					}
				}
			}
		}
	}		

	return true;
}

function formCheck()
{	
	if(path_count <= 0)	
	{
		alert(JS_msg36);
		return false;
	}

	if(any_en == 0){	//disalbe any

		var user_count = 0;
		var p = all_str.split(";");
		for(i=0; i<p.length;i++){
			var q=p[i].split(",");
			if(q[2] == 1)
				user_count++;
		}
		
		var j=0;
		if(user_count == 1)
		{
			if (document.ftp_adddir.allow_user.checked == true)
				j =1;
		}
		else{
			for(i=0;i<user_count;i++)
			{
				if (document.ftp_adddir.allow_user[i].checked == true){
					j=1;
					break;
				}
			}
		}
		
		if (!j)
		{
			alert(JS_msg160);
			return false;
		}
	}

       var h = 0;
       if(path_count == 1){
       	if (document.ftp_adddir.dir_path.checked == true)
       		h=1;
       }
       else{
       	for(i=0;i<path_count;i++)
		{
			if (document.ftp_adddir.dir_path[i].checked == true){
				h = 1;
				break;
			}
		}
       }

	if (!h)
	{
		alert(JS_msg159);
		return false;
	}

	if(!CheckAlreadyConfig())
		return false;
		
	return true;
}

function submit_apply()
{	
	if (formCheck() == true){
		document.ftp_adddir.submit();
		opener.location.reload();
		setTimeout("window.close()",300);
		//window.close();
	}
}

function addDirClose()
{
	opener.location.reload();
}
</script>
</head>
<body onUnload="addDirClose()">
<table width=600><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_add_smb_settings)</script></td></tr>
<!--<tr><td><script>dw(JS_msg_samba)</script></td></tr>-->
<tr><td><hr></td></tr>
</table>

<form method=post name="ftp_adddir" action="/goform/Ftp_Add">
<input type="hidden" name="submit-url" value="/usb/ftp_srv.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_access_user)</script>:</td>
<td>
<% FtpGetUser(); %>
<script language="javascript">
if(any_en == 1)
{
	document.write("<input type=\"radio\" checked name=\"allow_user\" value=\"anonymous\">");
	document.write("anonymous");
	document.write("<br />");
}
</script>
</td>
</tr>
</table>

<br>
<p><b><script>dw(MM_access_path)</script></b></p>
<table width=100% border=1 cellpadding=3 style="border-collapse: collapse" bordercolor="#C8C8C8">
  <tr bgcolor=#f2f2f2 align="center">
    <td></td>
    <td><b><script>dw(MM_dir_path)</script></b></td>
    <td><b><script>dw(MM_partition)</script></b></td>
  </tr>
  <% ShowAllDir(); %>
<script language="javascript">
path_count = parseInt('<% getCount(1, "AllDir"); %>');
</script>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
  <tr>
    <td>
      <script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()"> &nbsp; &nbsp;\
      <input type=button class=button value="'+BT_close+'" onClick="window.close()">')</script>
    </td>
  </tr>
</table>
</form>

</td></tr></table>
</body></html>
