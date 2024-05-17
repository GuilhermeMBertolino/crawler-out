<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function trim(str)
{ 
     return str.replace(/(^\s*)|(\s*$)/g, "");
}

function select_SSID()
{
	var h,k;
	var tmpi,tmpj;
	var auth_str;
	var sele_flag =0;
	
	if (i!=1)
	{
		for(h=0;h<i;h++)
		{
			if(document.sta_site_survey.selectap[h].checked == true)
			{
				tmpi=h;
				tmpj=document.sta_site_survey.selectap[h].value;
				sele_flag = 1;
				break;
			}
		}
	}
	else 
	{
		if(document.sta_site_survey.selectap.checked == true)
		{
			tmpi=0;
			tmpj=document.sta_site_survey.selectap.value;
			sele_flag = 1;
		}
	}
	
	if(sele_flag == 0) 
		return;
	window.opener.document.getElementById("div_apcli_key1").style.display="none";
	window.opener.document.getElementById("div_aplci_enc").style.display="none";
	window.opener.document.getElementById("div_apcli_wpapsk").style.display="none";
		
	//window.opener.document.
	window.opener.document.apcli_form.apcli_ssid.value=str.split("#")[tmpi].split(";")[1];
	window.opener.document.apcli_form.apcli_bssid.value=tmpj;
	window.opener.document.apcli_form.apcli_channel.value=str.split("#")[tmpi].split(";")[0];

	auth_str=str.split("#")[tmpi].split(";")[3];
	if (trim(auth_str)=="NONE") {
		window.opener.document.apcli_form.apcli_mode.options.selectedIndex=0;
	} 
	else if (trim(auth_str)=="WEP") {
		window.opener.document.apcli_form.apcli_mode.options.selectedIndex=1;
		window.opener.document.getElementById("div_apcli_key1").style.display="";
		window.opener.document.apcli_form.apcli_key1.value="";
	}
	else if (auth_str.search("WPA") != -1) {
		window.opener.document.getElementById("div_aplci_enc").style.display="";
		window.opener.document.getElementById("div_apcli_wpapsk").style.display="";
		if (auth_str.split("/")[0] =="WPAPSK" || auth_str.split("/")[0] =="WPA1PSK"){
			window.opener.document.apcli_form.apcli_mode.options.selectedIndex=2;
			if (auth_str.split("/")[1] == "AES" || auth_str.split("/")[1] == "TKIPAES")
				window.opener.document.apcli_form.apcli_enc.options.selectedIndex=1;
			else if(auth_str.split("/")[1] == "TKIP")
				window.opener.document.apcli_form.apcli_enc.options.selectedIndex=0;
		}
		else if (auth_str.split("/")[0] =="WPA2PSK" || auth_str.split("/")[0] =="WPA1PSKWPA2PSK"){
			window.opener.document.apcli_form.apcli_mode.options.selectedIndex=3;			
			if (auth_str.split("/")[1] == "AES" || auth_str.split("/")[1] == "TKIPAES")
				window.opener.document.apcli_form.apcli_enc.options.selectedIndex=1;
			else if (auth_str.split("/")[1] == "TKIP")
				window.opener.document.apcli_form.apcli_enc.options.selectedIndex=0;
		}
		window.opener.document.apcli_form.apcli_wpapsk.value="";
	}
				
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
while(str.split("#")[i]!='' && typeof(str.split(";")[i])!= "undefined" && str.split("#")[i]!=' ' && (i < 15)) {
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
