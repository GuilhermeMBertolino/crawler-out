<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function submit_apply()
{
	document.wapi_cert_user_upload.submit();
	opener.UserCertUpdate();
	window.close();
}

function resetForm()
{
	location=location; 
}
</script>
</head>
<body>
<form method="post" name="wapi_cert_user_upload" action="/cgi-bin/upload_wapi_user_cert.cgi" enctype="multipart/form-data">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
  <tr>
    <td class="title" colspan="2">Upload Certificate</td>
  </tr>
  <tr>
    <td class="thead">WAPI User Certificate</td>
    <td><input type="file" name="wapi_user_cert_file" maxlength="256"></td>
  </tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
  <tr>
    <td>
      <input type="button" class=button value="Apply" onClick="submit_apply()"> &nbsp; &nbsp;
      <input type="button" class=button value="Reset" onClick="resetForm();">
    </td>
  </tr>
</table>
</form>

</body></html>
