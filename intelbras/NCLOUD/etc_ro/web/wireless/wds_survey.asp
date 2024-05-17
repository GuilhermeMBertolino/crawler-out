<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var flag = eval(location.href.split("#")[1]);

function trim(str)
{ 
     return str.replace(/(^\s*)|(\s*$)/g, "");
}

function select_SSID()
{
	var h,k;
	var tmpi,tmpj;
	
	for(h=0;h<i;h++){
		if(document.sta_site_survey.selectap[h].checked == true){
			tmpi=h;
			tmpj=document.sta_site_survey.selectap[h].value;
			break;
		}
	}
	
	//window.opener.document.
	if (flag == 1)
		window.opener.document.wds_form.wds_1.value=tmpj;
	else if (flag == 2)
		window.opener.document.wds_form.wds_2.value=tmpj;
	else if (flag == 3)
		window.opener.document.wds_form.wds_3.value=tmpj;
	else if (flag == 4)
		window.opener.document.wds_form.wds_4.value=tmpj;
	
	window.close(); 
}
</script>
</head>
<body>
<table width=640><tr><td>
<form method=post name="sta_site_survey">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_sitesurvey_list)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr class="title4" align=center>
    <td><b><script>dw(MM_channel)</script></b></td>
    <td><b><script>dw(MM_ssid)</script></b></td>
    <td><b>BSSID</b></td>
    <td><b><script>dw(MM_encryp_type)</script></b></td>
    <td><b><script>dw(MM_signal)</script></b></td>
    <td><b><script>dw(MM_network_mode)</script></b></td>
    <td>&nbsp;</td>
</tr>
<script>
var str= "<% ApcliScan(); %>";
var i=0,j=0;
var str1;
while(str.split("#")[i]!='' && typeof(str.split(";")[i])!= "undefined" && str.split("#")[i]!=' ') {
    document.write("<tr align=center>");
    str1=str.split("#")[i];
    j=0;
   
    for(j=0;j<6;j++) {
        document.write("<td>");
        if(j==4)
            document.write(str1.split(";")[j]+"%");
        else
            document.write(str1.split(";")[j]);
        document.write("</td>");
    }
    document.write("<td><input type=radio name=selectap value="+str1.split(";")[2]+" onclick=\"select_SSID()\"></td>");
    document.write("</tr>");
    i++;
}
</script>
<tr><td colspan="7"><hr></td></tr>
<tr><td colspan="7" align="center"><script>dw('<input type=button class=button value='+BT_search_ap+' name=refresh onClick="window.location.reload()">')</script></td></tr>
</table>
</form>

</td></tr></table>
</body></html>
