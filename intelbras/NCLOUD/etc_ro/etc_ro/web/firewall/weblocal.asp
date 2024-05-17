<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function Load_Setting()
{
	var limit = "<% getCfgGeneral(1, "WebLocalLimit"); %>";
	if (limit == "1")
		document.weblocal.weblocalEnabled.options.selectedIndex = 1;
	else {
		document.weblocal.weblocalEnabled.options.selectedIndex = 0;
		disableTextField(document.weblocal.weblocalPolicy);
		disableTextField(document.weblocal.macscan1);
		disableTextField(document.weblocal.mac_address1);
		disableTextField(document.weblocal.macscan2);
		disableTextField(document.weblocal.mac_address2);
		disableTextField(document.weblocal.macscan3);
		disableTextField(document.weblocal.mac_address3);
		disableTextField(document.weblocal.macscan4);
		disableTextField(document.weblocal.mac_address4);
	}

	var p = "<% getCfgGeneral(1, "WebLocalPolicy"); %>";
	if (p == "0")
		document.weblocal.weblocalPolicy.options.selectedIndex = 0;
	else 
		document.weblocal.weblocalPolicy.options.selectedIndex = 1;
}

function formCheck()
{
	var curmac = "<% webLocalGetCurMac(); %>";
	var ret = 0;
	var i;
	
	for(i=1; i<=4; i++)
	{
		if (eval("document.weblocal.mac_address"+i).value != "")	
			if (!macCheck(eval("document.weblocal.mac_address"+i).value, MM_macaddr)) 
				return false;
	}

	//if get mac error, direct return 
	if (curmac == "")
		return true;
		
	if(document.weblocal.weblocalEnabled.options.selectedIndex == 1)
	{
		if(document.weblocal.weblocalPolicy.options.selectedIndex == 0)
		{
			for(i=1; i<=4; i++)
			{
				if (eval("document.weblocal.mac_address"+i).value.toLowerCase() == trim(curmac))
					ret = 1;
			}

			if(!ret){
				if ( !confirm(JS_msg120) )
					return false;
				else
					return true;
			}
		}
		else
		{
			for(i=1; i<=4; i++)
			{
				if (eval("document.weblocal.mac_address"+i).value.toLowerCase() == trim(curmac))
					ret = 1;
			}
			
			if(ret){
				if ( !confirm(JS_msg120) )
					return false;
				else
					return true;
			}	
		}		
	}
	
	return true;
}

function fillMac()
{
	if(document.weblocal.weblocalEnabled.options.selectedIndex == 0) {
		disableTextField(document.weblocal.weblocalPolicy);
		disableTextField(document.weblocal.macscan1);
		disableTextField(document.weblocal.mac_address1);
		disableTextField(document.weblocal.macscan2);
		disableTextField(document.weblocal.mac_address2);
		disableTextField(document.weblocal.macscan3);
		disableTextField(document.weblocal.mac_address3);
		disableTextField(document.weblocal.macscan4);
		disableTextField(document.weblocal.mac_address4);
	} else {
		enableTextField(document.weblocal.weblocalPolicy);
		enableTextField(document.weblocal.macscan1);
		enableTextField(document.weblocal.mac_address1);
		enableTextField(document.weblocal.macscan2);
		enableTextField(document.weblocal.mac_address2);
		enableTextField(document.weblocal.macscan3);
		enableTextField(document.weblocal.mac_address3);
		enableTextField(document.weblocal.macscan4);
		enableTextField(document.weblocal.mac_address4);		
	}
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="weblocal" action=/goform/weblocal>
<input type="hidden" name="submit-url" value="/firewall/weblocal.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_weblocal_set)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_weblocal)</script>:</td>
<td><select name="weblocalEnabled" onChange="fillMac()">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr>
<td class="title2" colspan="2"><script>dw(MM_Policy)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_weblocalPolicy)</script>:</td>
<td><select name="weblocalPolicy">
<option value=0><script>dw(MM_PolicyAllow)</script></option>
<option value=1><script>dw(MM_PolicyDeny)</script></option>
</select></td>
</tr>
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" maxlength="17" name="mac_address1" value="<% getCfgGeneral(1, "WebLocalRules1"); %>"> <script>dw('<input name="macscan1" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"Mac_scan.asp#flag=1\")>')</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" maxlength="17" name="mac_address2" value="<% getCfgGeneral(1, "WebLocalRules2"); %>"> <script>dw('<input name="macscan2" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"Mac_scan.asp#flag=2\")>')</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" maxlength="17" name="mac_address3" value="<% getCfgGeneral(1, "WebLocalRules3"); %>"> <script>dw('<input name="macscan3" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"Mac_scan.asp#flag=3\")>')</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input type="text" maxlength="17" name="mac_address4" value="<% getCfgGeneral(1, "WebLocalRules4"); %>"> <script>dw('<input name="macscan4" type="button" class="button" value="'+BT_scan+'" onClick=arpTblClick(\"Mac_scan.asp#flag=4\")>')</script></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" name=apply onClick="return formCheck()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
